import { useEffect, useMemo, useState } from "react";
import { Button, Card, Chip, Icon, Micro, Progress } from "../components/ui";
import { Diagram } from "../components/Diagrams";
import { LABEL, type Question } from "../data/questions";
import type { NavProps } from "../lib/nav";
import { fmtTime, playCorrect, playDone, playTap, playWrong, type Progress as P } from "../lib/storage";

export type SessionItem = { q: Question; optionOrder: number[] };
export type Result = {
  items: SessionItem[];
  answers: (number | null)[];
  mode: "latihan" | "sts";
  categoryLabel: string;
  score: number;
  correct: number;
  wrong: number;
  blank: number;
  duration: number;
  weak: string[];
  wrongIds: (string | number)[];
  fromRemedial?: boolean;
  prevScore?: number | null;
  date: string;
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function Quiz({
  go,
  payload,
  bank,
  sound,
}: NavProps & { payload?: any; bank: Question[]; progress: P; sound: boolean }) {
  const [session, setSession] = useState<null | {
    items: SessionItem[];
    answers: (number | null)[];
    marked: number[];
    index: number;
    mode: "latihan" | "sts";
    categoryLabel: string;
    startedAt: number;
    limit: number; // detik, 0 = tanpa batas
    fromRemedial?: boolean;
    prevScore?: number | null;
  }>(null);

  const [showConfirm, setShowConfirm] = useState(false);

  /* ---------- opsi awal ---------- */
  const [mode, setMode] = useState<"latihan" | "sts">(payload?.mode === "sts" ? "sts" : "latihan");
  const [category, setCategory] = useState<string>(payload?.category ?? "Semua Materi");
  const [count, setCount] = useState<number>(payload?.ids ? payload.ids.length : 10);
  const [limit, setLimit] = useState<number>(0);
  const [shufQ, setShufQ] = useState(true);
  const [shufO, setShufO] = useState(false);
  const [includeHots, setIncludeHots] = useState(payload?.ids ? true : true);

  const pool = useMemo(() => {
    let p = bank.filter((q) => q.active);
    if (payload?.ids) p = p.filter((q) => payload.ids.map(String).includes(String(q.id)));
    else {
      if (category !== "Semua Materi") p = p.filter((q) => q.category === category);
      if (!includeHots) p = p.filter((q) => q.questionType === "dasar");
      if (payload?.hotsOnly) p = p.filter((q) => q.questionType === "HOTS");
    }
    return p;
  }, [bank, category, includeHots, payload]);

  const start = () => {
    const picked = (shufQ ? shuffle(pool) : pool).slice(0, Math.min(count, pool.length));
    if (picked.length === 0) return;
    const items: SessionItem[] = picked.map((q) => ({
      q,
      optionOrder: shufO ? shuffle(q.options.map((_, i) => i)) : q.options.map((_, i) => i),
    }));
    playTap();
    setSession({
      items,
      answers: items.map(() => null),
      marked: [],
      index: 0,
      mode,
      categoryLabel: category === "Semua Materi" ? (payload?.ids ? "Soal Remedial" : "Campuran") : category,
      startedAt: Date.now(),
      limit: limit * 60,
      fromRemedial: !!payload?.ids,
      prevScore: payload?.prevScore ?? null,
    });
  };

  /* ---------- timer ---------- */
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!session) return;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [session]);

  const elapsed = session ? Math.floor((now - session.startedAt) / 1000) : 0;
  const remaining = session && session.limit > 0 ? session.limit - elapsed : 0;

  const finish = (s: NonNullable<typeof session>) => {
    const correct: number = s.answers.reduce<number>((n, a, i) => n + (a !== null && a === correctIndexOf(s.items[i]) ? 1 : 0), 0);
    const blank: number = s.answers.filter((a) => a === null).length;
    const wrong: number = s.answers.length - correct - blank;
    const score = Math.round((correct / s.items.length) * 100);
    const weakMap = new Map<string, number>();
    s.items.forEach((it, i) => {
      if (s.answers[i] !== correctIndexOf(it)) weakMap.set(it.q.materi, (weakMap.get(it.q.materi) ?? 0) + 1);
    });
    const weak = [...weakMap.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k);
    const wrongIds = s.items.filter((it, i) => s.answers[i] !== correctIndexOf(it)).map((it) => it.q.id);
    playDone();
    const res: Result = {
      items: s.items,
      answers: s.answers,
      mode: s.mode,
      categoryLabel: s.categoryLabel,
      score,
      correct,
      wrong,
      blank,
      duration: elapsed,
      weak,
      wrongIds,
      fromRemedial: s.fromRemedial,
      prevScore: s.prevScore,
      date: new Date().toISOString(),
    };
    setSession(null);
    go("hasil", { result: res });
  };

  // waktu habis otomatis selesai
  useEffect(() => {
    if (session && session.limit > 0 && remaining <= 0) finish(session);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining, session]);

  // papan ketik — dipasang sebelum cabuk kondisional agar urutan hook tetap sama
  useEffect(() => {
    if (!session) return;
    const h = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const k = e.key.toLowerCase();
      if (["a", "b", "c", "d"].includes(k)) {
        const i = "abcd".indexOf(k);
        const q = session.items[session.index];
        if (i < q.q.options.length) pick(q.optionOrder.indexOf(i));
      } else if (e.key === "ArrowRight") goIdx(session.index + 1);
      else if (e.key === "ArrowLeft") goIdx(session.index - 1);
      else if (k === "m") toggleMark();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (!session) {
    return (
      <SetupScreen
        pool={pool}
        mode={mode}
        setMode={setMode}
        category={category}
        setCategory={setCategory}
        count={count}
        setCount={setCount}
        limit={limit}
        setLimit={setLimit}
        shufQ={shufQ}
        setShufQ={setShufQ}
        shufO={shufO}
        setShufO={setShufO}
        includeHots={includeHots}
        setIncludeHots={setIncludeHots}
        start={start}
        fromRemedial={!!payload?.ids}
        prevScore={payload?.prevScore ?? null}
        go={go}
      />
    );
  }

  /* ---------- layar kuis ---------- */
  const it = session.items[session.index];
  const answered = session.answers[session.index];
  const chosen = answered !== null ? it.optionOrder.indexOf(answered) : null; // index tampilan
  const correctDisp = it.optionOrder.indexOf(it.q.correctAnswer);
  const showFeedback = session.mode === "latihan" && answered !== null;
  const isLast = session.index === session.items.length - 1;
  const answeredCount = session.answers.filter((a) => a !== null).length;
  const pct = (answeredCount / session.items.length) * 100;

  const pick = (dispIdx: number) => {
    if (session.mode === "latihan" && session.answers[session.index] !== null) return;
    const orig = it.optionOrder[dispIdx];
    const next = [...session.answers];
    next[session.index] = orig;
    setSession({ ...session, answers: next });
    const ok = orig === it.q.correctAnswer;
    if (sound) (ok ? playCorrect : playWrong)();
  };

  const goIdx = (i: number) => setSession({ ...session, index: Math.max(0, Math.min(session.items.length - 1, i)) });

  const toggleMark = () =>
    setSession({
      ...session,
      marked: session.marked.includes(session.index) ? session.marked.filter((m) => m !== session.index) : [...session.marked, session.index],
    });

  return (
    <div className="mx-auto max-w-[1080px]">
      {/* header kuis */}
      <Card className="mb-5 overflow-hidden">
        <div className="flex flex-wrap items-center gap-4 px-5 py-4">
          <div className="min-w-0">
            <Micro className="text-toska-deep">{session.mode === "sts" ? "Simulasi A-STS" : "Mode Latihan"}</Micro>
            <div className="mt-1 truncate text-sm font-extrabold text-ink">
              Latihan A-STS <span className="text-toska">›</span> {session.categoryLabel}
            </div>
          </div>
          <div className="ml-auto flex items-center gap-4">
            {session.limit > 0 && (
              <div className={`flex items-center gap-2 rounded-xl px-3 py-2 ${remaining < 60 ? "bg-[#fde3e3] text-[#a72b2b]" : "bg-lightblue text-med-deep"}`}>
                <Icon name="clock" size={16} />
                <span className="tnum text-sm font-extrabold">{fmtTime(Math.max(0, remaining))}</span>
              </div>
            )}
            <div className="flex items-center gap-2 rounded-xl bg-wash px-3 py-2">
              <span className="tnum text-sm font-extrabold text-ink">
                {session.index + 1} / {session.items.length}
              </span>
            </div>
            <div className="hidden w-32 sm:block">
              <Progress value={pct} tone="#0fa3a0" />
            </div>
            <Button size="sm" variant="navy" onClick={() => setShowConfirm(true)}>
              Selesai
            </Button>
          </div>
        </div>
        <div className="border-t border-lightblue bg-wash/60 px-5 py-3">
          <div className="flex flex-wrap gap-1.5">
            {session.items.map((_, i) => {
              const ans = session.answers[i];
              const state = session.marked.includes(i) ? "mark" : ans !== null ? "done" : "todo";
              return (
                <button
                  key={i}
                  onClick={() => goIdx(i)}
                  className={`tnum h-7 min-w-7 rounded-md px-1.5 text-[11px] font-extrabold transition-all duration-200 ${
                    i === session.index
                      ? "bg-ink text-white ring-2 ring-toska"
                      : state === "done"
                        ? "bg-mint text-toska-deep"
                        : state === "mark"
                          ? "bg-[#fdead6] text-[#b96a05]"
                          : "bg-white text-slate-tint ring-1 ring-lightblue"
                  }`}
                  aria-label={`Loncat ke soal ${i + 1}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
        {/* soal */}
        <Card className="anim-in overflow-hidden" key={session.index}>
          <div className="flex flex-wrap items-center gap-2 border-b border-lightblue px-5 py-3.5">
            <Chip tone="navy">Soal {session.index + 1}</Chip>
            <Chip tone="blue">{it.q.category}</Chip>
            <Chip tone={it.q.difficulty === "Mudah" ? "mint" : it.q.difficulty === "Sedang" ? "orange" : "red"}>{it.q.difficulty}</Chip>
            {session.marked.includes(session.index) && <Chip tone="orange">⚑ Ragu-ragu</Chip>}
            {it.q.questionType === "HOTS" && <Chip tone="red">SOAL HOTS</Chip>}
          </div>

          {/* stimulus */}
          {it.q.stimulus && <StimulusCard q={it.q} />}

          <div className="px-5 py-5">
            <p className="text-[16.5px] font-semibold leading-[1.7] text-ink">{it.q.question}</p>

            <div className="mt-5 space-y-2.5" role="radiogroup" aria-label="Pilihan jawaban">
              {it.q.options.map((_, dispIdx) => {
                const orig = it.optionOrder[dispIdx];
                const selected = chosen === dispIdx;
                const isCorrect = dispIdx === correctDisp;
                const state =
                  showFeedback && isCorrect
                    ? "correct"
                    : showFeedback && selected && !isCorrect
                      ? "wrong"
                      : selected
                        ? "selected"
                        : "idle";
                const cls = {
                  correct: "border-toska bg-mint text-toska-deep",
                  wrong: "border-danger bg-[#fde3e3] text-[#a72b2b]",
                  selected: "border-med bg-lightblue text-med-deep",
                  idle: "border-lightblue bg-white text-ink hover:border-med hover:bg-wash",
                }[state];
                return (
                  <button
                    key={dispIdx}
                    onClick={() => pick(dispIdx)}
                    disabled={showFeedback}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-[15px] font-bold transition-all duration-200 ${cls}`}
                    role="radio"
                    aria-checked={selected}
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-[12.5px] font-extrabold ring-1 ring-lightblue">
                      {LABEL(dispIdx)}
                    </span>
                    <span className="flex-1">{it.q.options[orig]}</span>
                    {state === "correct" && <Icon name="check" size={18} />}
                    {state === "wrong" && <Icon name="x" size={18} />}
                  </button>
                );
              })}
            </div>

            {/* umpan balik mode latihan */}
            {showFeedback && (
              <div className="anim-in mt-5 overflow-hidden rounded-2xl border-2 border-lightblue">
                <div className={`flex items-center gap-2 px-4 py-3 ${answered === it.q.correctAnswer ? "bg-mint" : "bg-[#fde3e3]"}`}>
                  <Icon name={answered === it.q.correctAnswer ? "check" : "x"} size={18} className={answered === it.q.correctAnswer ? "text-toska-deep" : "text-danger"} />
                  <span className={`text-sm font-extrabold ${answered === it.q.correctAnswer ? "text-toska-deep" : "text-[#a72b2b]"}`}>
                    {answered === it.q.correctAnswer
                      ? "Jawabanmu benar!"
                      : `Belum tepat. Jawaban benar: ${LABEL(correctDisp)}. ${it.q.options[it.q.correctAnswer]}`}
                  </span>
                </div>
                <div className="bg-white px-4 py-4">
                  <Micro className="text-med">Pembahasan</Micro>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-slate-tint">{it.q.explanation}</p>
                  {it.q.indicator && (
                    <p className="mt-3 rounded-lg bg-wash px-3 py-2 text-[12.5px] font-semibold text-slate-tint">
                      <strong className="text-ink">Indikator:</strong> {it.q.indicator} · Level {it.q.cognitiveLevel}
                    </p>
                  )}
                </div>
              </div>
            )}

            {session.mode === "sts" && answered === null && (
              <p className="mt-4 rounded-lg bg-lightblue px-3 py-2.5 text-[13px] font-semibold text-med-deep">
                Mode simulasi A-STS: jawaban akan diperiksa setelah seluruh soal selesai dikerjakan.
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-lightblue bg-wash/60 px-5 py-4">
            <Button variant="outline" size="sm" icon="arrowL" onClick={() => goIdx(session.index - 1)} disabled={session.index === 0}>
              Sebelumnya
            </Button>
            <Button variant={session.marked.includes(session.index) ? "accent" : "ghost"} size="sm" icon="flag" onClick={toggleMark}>
              {session.marked.includes(session.index) ? "Ditandai" : "Ragu-ragu"}
            </Button>
            {showFeedback && isLast ? (
              <Button size="sm" variant="navy" icon="trophy" className="ml-auto" onClick={() => setShowConfirm(true)}>
                Selesai & lihat hasil
              </Button>
            ) : (
              <Button size="sm" className="ml-auto" icon="arrowR" onClick={() => goIdx(session.index + 1)} disabled={isLast}>
                Berikutnya
              </Button>
            )}
          </div>
        </Card>

        {/* panel samping */}
        <aside className="space-y-4">
          <Card className="p-5">
            <Micro className="text-med">Panduan singkat</Micro>
            <ul className="mt-3 space-y-2 text-[13.5px] leading-relaxed text-slate-tint">
              <li className="flex gap-2"><Icon name="check" size={16} className="mt-0.5 shrink-0 text-toska" /> Tekan tombol A–D untuk menjawab cepat.</li>
              <li className="flex gap-2"><Icon name="check" size={16} className="mt-0.5 shrink-0 text-toska" /> Tombol ← → berpindah soal, M untuk menandai.</li>
              <li className="flex gap-2"><Icon name="check" size={16} className="mt-0.5 shrink-0 text-toska" /> Tombol ⚑ menandai soal yang ingin diperiksa lagi.</li>
            </ul>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <Micro className="text-med">Status pengerjaan</Micro>
              <span className="tnum text-sm font-extrabold text-ink">{answeredCount}/{session.items.length}</span>
            </div>
            <div className="mt-3"><Progress value={pct} /></div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                ["Terjawab", answeredCount, "#0fa3a0"],
                ["Kosong", session.items.length - answeredCount, "#f5921e"],
                ["Ditandai", session.marked.length, "#1976d2"],
              ].map(([l, v, c]) => (
                <div key={String(l)} className="rounded-xl bg-wash py-3">
                  <div className="display tnum text-2xl font-extrabold" style={{ color: c as string }}>
                    {v as number}
                  </div>
                  <div className="text-[11px] font-bold text-slate-tint">{l as string}</div>
                </div>
              ))}
            </div>
            <Button variant="navy" className="mt-4 w-full" icon="trophy" onClick={() => setShowConfirm(true)}>
              Selesaikan kuis
            </Button>
          </Card>

          <Card className="p-5">
            <Micro className="text-med">Waktu berjalan</Micro>
            <div className="display tnum mt-1 text-4xl font-extrabold text-ink">{fmtTime(elapsed)}</div>
            <div className="text-[12px] font-semibold text-slate-tint">
              {session.limit > 0 ? `Batas waktu ${fmtTime(session.limit)}` : "Tanpa batas waktu"}
            </div>
          </Card>
        </aside>
      </div>

      {/* konfirmasi selesai */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4" role="dialog" aria-modal="true">
          <Card className="anim-pop w-full max-w-md p-6">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-lightblue text-med">
              <Icon name="help" size={24} />
            </div>
            <h3 className="display mt-4 text-2xl font-extrabold text-ink">Akhiri latihan sekarang?</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-tint">
              Sudah menjawab <strong className="text-ink">{answeredCount}</strong> dari{" "}
              <strong className="text-ink">{session.items.length}</strong> soal. Jawaban yang kosong dihitung belum benar.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setShowConfirm(false)} className="flex-1">
                Lanjut mengerjakan
              </Button>
              <Button variant="navy" className="flex-1" icon="check" onClick={() => finish(session)}>
                Ya, selesai
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

/* kunci jawaban berdasarkan indeks asli, bukan urutan tampilan */
export const correctIndexOf = (it: SessionItem) => it.q.correctAnswer;

/* ============ kartu stimulus ============ */
function StimulusCard({ q }: { q: Question }) {
  const s = q.stimulus!;
  const kindLabel = s.type === "image" ? "Gambar" : s.type === "table" ? "Tabel" : "Kasus";
  return (
    <div className="border-b border-lightblue bg-wash/60 px-5 py-4">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Chip tone="red">SOAL HOTS</Chip>
        <Chip tone="blue">Stimulus: {kindLabel}</Chip>
        <Chip tone="grey">{q.materi}</Chip>
      </div>
      <h4 className="display text-lg font-extrabold text-ink">{s.title}</h4>
      {"lead" in s && s.lead && <p className="mt-1 text-[14px] leading-relaxed text-slate-tint">{s.lead}</p>}

      {s.type === "image" && (
        <div className={`mt-3 grid gap-3 ${s.panels.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {s.panels.map((p, i) => (
            <figure key={i} className="overflow-hidden rounded-2xl border-2 border-lightblue bg-white">
              <div className="mx-auto max-h-[340px] w-full overflow-hidden p-2">
                {p.kind === "diagram" ? (
                  <div className="h-[330px]">
                    <Diagram k={p.diagram!} />
                  </div>
                ) : (
                  <img src={p.src} alt={p.alt} className="h-[230px] w-full rounded-xl object-cover" loading="lazy" />
                )}
              </div>
              <figcaption className="border-t border-lightblue px-3 py-2 text-[12.5px] font-semibold leading-snug text-slate-tint">
                <strong className="text-ink">{s.panels.length > 1 ? `Gambar ${String.fromCharCode(65 + i)}. ` : ""}</strong>
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {s.type === "table" && (
        <div className="mt-3 overflow-hidden rounded-2xl border-2 border-lightblue bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-lightblue">
                <tr>
                  {s.columns.map((c) => (
                    <th key={c} className="px-4 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-med-deep">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.rows.map((r, i) => (
                  <tr key={i} className="border-t border-lightblue">
                    {r.map((cell, j) => (
                      <td key={j} className={`px-4 py-2.5 ${j === 0 ? "font-extrabold text-ink" : "text-slate-tint"} ${/^\d+$/.test(cell) ? "tnum" : ""}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {s.note && <div className="border-t border-lightblue bg-wash px-4 py-2 text-[12px] font-bold italic text-slate-tint">{s.note}</div>}
        </div>
      )}

      {s.type === "case" && (
        <div className="mt-3 space-y-2 rounded-2xl border-l-4 border-accent bg-white px-4 py-4">
          {s.lines.map((l, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-slate-tint">
              {l}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============ layar pengaturan ============ */
function SetupScreen(props: any) {
  const { pool, mode, setMode, category, setCategory, count, setCount, limit, setLimit, shufQ, setShufQ, shufO, setShufO, includeHots, setIncludeHots, start, fromRemedial, prevScore, go } = props;
  const available = pool.length;

  return (
    <div className="mx-auto max-w-[980px] space-y-6">
      <Card className="overflow-hidden">
        <div className="paper-grid relative px-5 py-6 sm:px-7">
          <Micro className="text-toska-deep">Latihan A-STS IPAS Kelas VI SD</Micro>
          <h2 className="display mt-1.5 text-[clamp(1.6rem,3.4vw,2.4rem)] font-extrabold text-ink">
            {fromRemedial ? "Latihan Remedial" : "Siap berlatih soal?"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold text-slate-tint">
            {fromRemedial
              ? "Soal berikut diambil dari materi yang belum kamu kuasai. Baca pembahasan dengan tenang, lalu jawab kembali."
              : "Atur jumlah soal, materi, dan mode sesuai kebutuhanmu. Semua jawaban akan disimpan ke halaman hasil."}
            {prevScore !== null && prevScore !== undefined && ` Nilai sebelumnya: ${prevScore}.`}
          </p>
          {available === 0 && (
            <div className="mt-4 rounded-xl bg-[#fde3e3] px-4 py-3 text-sm font-bold text-[#a72b2b]">
              Tidak ada soal yang cocok dengan pilihanmu. Ubah materi atau aktifkan kembali soal di Mode Guru.
            </div>
          )}
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5">
          <Card className="p-5">
            <Micro className="text-med">Mode pengerjaan</Micro>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                { id: "latihan", title: "Mode Latihan", desc: "Langsung tahu benar atau salah beserta pembahasan.", icon: "book" },
                { id: "sts", title: "Mode Simulasi A-STS", desc: "Kunci jawaban dibuka setelah seluruh soal selesai.", icon: "shield" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                    mode === m.id ? "border-toska bg-mint" : "border-lightblue bg-white hover:border-med"
                  }`}
                  aria-pressed={mode === m.id}
                >
                  <div className="flex items-center gap-2">
                    <Icon name={m.icon} size={18} className={mode === m.id ? "text-toska-deep" : "text-med"} />
                    <span className="font-extrabold text-ink">{m.title}</span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-snug text-slate-tint">{m.desc}</p>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <Micro className="text-med">Materi yang diujikan</Micro>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Semua Materi", "Sistem Pencernaan", "Sistem Pernapasan"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-extrabold transition-all duration-200 ${
                    category === c ? "bg-ink text-white" : "border-2 border-lightblue bg-white text-slate-tint hover:border-med"
                  }`}
                  aria-pressed={category === c}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-5"><Micro className="text-med">Jumlah soal</Micro></div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[10, 20, 30, 45].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  disabled={n > available && !fromRemedial}
                  className={`tnum rounded-xl px-4 py-2.5 text-sm font-extrabold transition-all duration-200 disabled:opacity-35 ${
                    count === n ? "bg-toska text-white" : "border-2 border-lightblue bg-white text-slate-tint hover:border-med"
                  }`}
                >
                  {n === 45 ? "Semua (45)" : `${n} soal`}
                </button>
              ))}
            </div>
            <div className="mt-3 text-[12.5px] font-semibold text-slate-tint">Tersedia {available} soal untuk pilihan ini.</div>
          </Card>

          <Card className="p-5">
            <Micro className="text-med">Opsi tambahan</Micro>
            <div className="mt-3 space-y-2.5">
              {[
                { label: "Acak urutan soal", v: shufQ, set: setShufQ },
                { label: "Acak urutan pilihan jawaban", v: shufO, set: setShufO },
                { label: "Sertakan soal HOTS berbasis stimulus", v: includeHots, set: setIncludeHots },
              ].map((o) => (
                <label key={o.label} className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-lightblue px-4 py-3 transition-colors duration-200 hover:border-med">
                  <input type="checkbox" checked={o.v} onChange={(e) => o.set(e.target.checked)} className="h-5 w-5 accent-[#0fa3a0]" />
                  <span className="text-sm font-bold text-ink">{o.label}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>

        <aside className="space-y-5">
          <Card className="p-5">
            <Micro className="text-med">Waktu pengerjaan</Micro>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                [0, "Tanpa batas"],
                [10, "10 menit"],
                [15, "15 menit"],
                [20, "20 menit"],
                [30, "30 menit"],
                [45, "45 menit"],
              ].map(([v, l]) => (
                <button
                  key={String(v)}
                  onClick={() => setLimit(v as number)}
                  className={`rounded-xl px-2 py-2.5 text-[13px] font-extrabold transition-all duration-200 ${
                    limit === v ? "bg-med text-white" : "border-2 border-lightblue bg-white text-slate-tint hover:border-med"
                  }`}
                >
                  {l as string}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[12.5px] font-semibold text-slate-tint">
              Jika waktu habis, kuis otomatis selesai dan hasil langsung dihitung.
            </p>
          </Card>

          <Card className="overflow-hidden">
            <div className="bg-ink px-5 py-4">
              <Micro className="text-toska">Ringkasan</Micro>
              <div className="mt-1 text-lg font-extrabold text-white">
                {Math.min(count, available)} soal · {mode === "sts" ? "Simulasi A-STS" : "Latihan"}
              </div>
            </div>
            <div className="space-y-2 px-5 py-4 text-sm">
              {[
                ["Materi", category],
                ["Waktu", limit ? `${limit} menit` : "Tanpa batas"],
                ["Acak soal", shufQ ? "Ya" : "Tidak"],
                ["Acak opsi", shufO ? "Ya" : "Tidak"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-lightblue pb-2 last:border-0">
                  <span className="font-semibold text-slate-tint">{k}</span>
                  <span className="font-extrabold text-ink">{v}</span>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5">
              <Button size="lg" className="w-full" icon="arrowR" onClick={start} disabled={available === 0}>
                Mulai kuis
              </Button>
              <Button variant="ghost" size="sm" className="mt-2 w-full" onClick={() => go("dashboard")}>
                Kembali ke dashboard
              </Button>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
