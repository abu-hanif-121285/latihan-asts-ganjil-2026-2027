import { useState } from "react";
import { Button, Card, Chip, Donut, Empty, Icon, Micro, Progress } from "../components/ui";
import { Diagram } from "../components/Diagrams";
import { LABEL } from "../data/questions";
import type { NavProps } from "../lib/nav";
import { categoryOf, fmtTime, type Attempt, type Progress as P } from "../lib/storage";
import type { Result } from "./Quiz";

export default function Hasil({ go, payload, progress }: NavProps & { payload?: any; progress: P }) {
  const result: Result | undefined = payload?.result;
  const [showReview, setShowReview] = useState(false);
  const attempts: Attempt[] = progress.attempts;

  /* ---------- riwayat (tanpa hasil baru) ---------- */
  if (!result) {
    const best = attempts.length ? Math.max(...attempts.map((a) => a.score)) : null;
    const avg = attempts.length ? Math.round(attempts.reduce((s, a) => s + a.score, 0) / attempts.length) : null;
    return (
      <div className="space-y-6">
        <Card className="p-5 sm:p-6">
          <Micro className="text-toska-deep">Hasil belajar</Micro>
          <h2 className="display mt-1.5 text-[clamp(1.5rem,3.2vw,2.2rem)] font-extrabold text-ink">Riwayat & pencapaianmu</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Jumlah latihan", attempts.length],
              ["Nilai tertinggi", best ?? "—"],
              ["Rata-rata nilai", avg ?? "—"],
              ["Lencana", `${progress.badges.length}/4`],
            ].map(([l, v]) => (
              <div key={String(l)} className="rounded-2xl border-2 border-lightblue bg-wash px-4 py-4">
                <Micro className="text-slate-tint">{String(l)}</Micro>
                <div className="display tnum mt-1 text-3xl font-extrabold text-ink">{v as any}</div>
              </div>
            ))}
          </div>
        </Card>

        {attempts.length === 0 ? (
          <Empty
            icon="chart"
            title="Belum ada hasil latihan"
            text="Kerjakan latihan pertamamu, lalu nilai dan pembahasannya akan tersimpan di halaman ini."
          />
        ) : (
          <Card className="overflow-hidden">
            <div className="border-b border-lightblue px-5 py-4">
              <Micro className="text-med">Semua nilai</Micro>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-wash">
                  <tr>
                    {["Tanggal", "Materi", "Mode", "Benar", "Salah", "Kosong", "Waktu", "Nilai"].map((h) => (
                      <th key={h} className="px-4 py-3 text-[11px] uppercase tracking-[0.1em] text-slate-tint">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((a) => {
                    const c = categoryOf(a.score);
                    return (
                      <tr key={a.id} className="border-t border-lightblue">
                        <td className="px-4 py-3 font-semibold text-slate-tint">
                          {new Date(a.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-4 py-3 font-bold text-ink">{a.category}</td>
                        <td className="px-4 py-3">
                          <Chip tone={a.mode === "sts" ? "navy" : "blue"}>{a.mode === "sts" ? "Simulasi" : "Latihan"}</Chip>
                        </td>
                        <td className="tnum px-4 py-3 font-bold text-toska-deep">{a.correct}</td>
                        <td className="tnum px-4 py-3 font-bold text-danger">{a.wrong}</td>
                        <td className="tnum px-4 py-3 text-slate-tint">{a.blank}</td>
                        <td className="tnum px-4 py-3 text-slate-tint">{fmtTime(a.duration)}</td>
                        <td className="px-4 py-3">
                          <span className="tnum rounded-lg px-2.5 py-1 font-extrabold" style={{ background: `${c.color}1f`, color: c.color }}>
                            {a.score}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        <div className="flex flex-wrap gap-3">
          <Button icon="quiz" onClick={() => go("quiz")}>
            Mulai latihan baru
          </Button>
          <Button variant="outline" icon="home" onClick={() => go("dashboard")}>
            Kembali ke dashboard
          </Button>
        </div>
      </div>
    );
  }

  /* ---------- kartu hasil ---------- */
  const cat = categoryOf(result.score);
  const total = result.items.length;
  const pctSuccess = Math.round((result.correct / total) * 100);
  const masteredMateri = [...new Set(result.items.map((i) => i.q.materi))].filter((m) => !result.weak.includes(m));

  return (
    <div className="mx-auto max-w-[1080px] space-y-6">
      {/* kepala hasil */}
      <Card className="print-card overflow-hidden">
        <div className="paper-grid relative px-5 py-8 text-center sm:px-8">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl text-white shadow-lg" style={{ background: cat.color }}>
            <Icon name={result.score >= 80 ? "trophy" : result.score >= 70 ? "star" : "refresh"} size={30} />
          </div>
          <Micro className="mt-4 text-toska-deep">{result.mode === "sts" ? "Simulasi A-STS selesai" : "Latihan selesai"}</Micro>
          <h2 className="display mt-2 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-ink">
            {result.fromRemedial ? "Latihan Remedial Selesai!" : "Latihan Selesai!"}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm font-semibold leading-relaxed text-slate-tint">
            Terus berlatih dan pahami pembahasannya. Setiap kesalahan adalah kesempatan untuk belajar.
          </p>

          <div className="mt-7 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center">
            <Donut value={result.score} label="Skor akhir" />
            <div className="grid w-full max-w-sm grid-cols-2 gap-3 text-left">
              {[
                ["Kategori", cat.label, cat.color],
                ["Benar", `${result.correct}`, "#0fa3a0"],
                ["Salah", `${result.wrong}`, "#d93b3b"],
                ["Tidak dijawab", `${result.blank}`, "#f5921e"],
                ["Total soal", `${total}`, "#0e2a47"],
                ["Waktu", fmtTime(result.duration), "#1976d2"],
              ].map(([l, v, c]) => (
                <div key={String(l)} className="rounded-xl border-2 border-lightblue bg-white px-3 py-2.5">
                  <Micro className="text-slate-tint">{String(l)}</Micro>
                  <div className="tnum mt-0.5 text-lg font-extrabold" style={{ color: c as string }}>
                    {v as string}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-2xl rounded-2xl px-5 py-4 text-center" style={{ background: `${cat.color}14` }}>
            <div className="text-sm font-extrabold" style={{ color: cat.color }}>
              {cat.label} · keberhasilan {pctSuccess}%
            </div>
            <p className="mt-1 text-[15px] font-semibold text-ink">{cat.msg}</p>
            <p className="mt-1 text-[12px] text-slate-tint">
              Kategori ini hanya umpan balik belajar, bukan penilaian mutlak terhadap kemampuanmu.
            </p>
            {result.prevScore !== null && result.prevScore !== undefined && (
              <p className="mt-1 text-[12.5px] font-bold text-med">
                Nilai sebelumnya {result.prevScore} → sekarang {result.score} (naik {Math.max(0, result.score - result.prevScore)} poin).
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-lightblue bg-wash/60 px-5 py-5 sm:grid-cols-4">
          <Button variant="outline" icon="book" onClick={() => setShowReview((s) => !s)}>
            {showReview ? "Sembunyikan pembahasan" : "Lihat pembahasan"}
          </Button>
          <Button icon="refresh" onClick={() => go("quiz", { mode: result.mode, category: result.categoryLabel === "Campuran" || result.categoryLabel === "Soal Remedial" ? "Semua Materi" : result.categoryLabel })}>
            Ulangi kuis
          </Button>
          <Button
            variant="accent"
            icon="arrowR"
            disabled={result.wrongIds.length === 0}
            onClick={() =>
              go("quiz", {
                ids: result.wrongIds,
                prevScore: result.score,
                mode: "latihan",
                category: "Semua Materi",
              })
            }
          >
            Ulangi soal yang salah ({result.wrongIds.length})
          </Button>
          <Button variant="navy" icon="home" onClick={() => go("dashboard")}>
            Kembali ke dashboard
          </Button>
        </div>
      </Card>

      {/* analisis */}
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <Card className="p-5">
          <Micro className="text-med">Analisis jawaban</Micro>
          <div className="mt-4 space-y-4">
            <div>
              <div className="mb-1.5 flex justify-between text-sm font-bold">
                <span className="text-toska-deep">Jawaban benar</span>
                <span className="tnum text-ink">
                  {result.correct} ({pctSuccess}%)
                </span>
              </div>
              <Progress value={pctSuccess} tone="#0fa3a0" height={12} />
            </div>
            <div>
              <div className="mb-1.5 flex justify-between text-sm font-bold">
                <span className="text-danger">Jawaban salah</span>
                <span className="tnum text-ink">
                  {result.wrong} ({Math.round((result.wrong / total) * 100)}%)
                </span>
              </div>
              <Progress value={(result.wrong / total) * 100} tone="#d93b3b" height={12} />
            </div>
            <div>
              <div className="mb-1.5 flex justify-between text-sm font-bold">
                <span className="text-[#b96a05]">Tidak dijawab</span>
                <span className="tnum text-ink">
                  {result.blank} ({Math.round((result.blank / total) * 100)}%)
                </span>
              </div>
              <Progress value={(result.blank / total) * 100} tone="#f5921e" height={12} />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border-2 border-lightblue p-4">
            <Micro className="text-slate-tint">Materi yang perlu dipelajari kembali</Micro>
            {result.weak.length === 0 ? (
              <p className="mt-2 text-sm font-bold text-toska-deep">Semua materi pada latihan ini sudah kamu kuasai. Pertahankan!</p>
            ) : (
              <ul className="mt-2 flex flex-wrap gap-2">
                {result.weak.map((m) => (
                  <li key={m}>
                    <Chip tone="red">{m}</Chip>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              <Button size="sm" variant="outline" icon="book" onClick={() => go("materi")}>
                Buka materi
              </Button>
              <Button size="sm" variant="ghost" icon="flask" onClick={() => go("simulasi")}>
                Buka simulasi
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <Micro className="text-med">Materi yang sudah dikuasai</Micro>
          {masteredMateri.length === 0 ? (
            <p className="mt-3 text-sm font-semibold text-slate-tint">Belum ada materi yang dikuasai pada latihan ini. Coba lagi ya!</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {masteredMateri.map((m) => (
                <li key={m} className="flex items-center gap-2 rounded-lg bg-mint px-3 py-2.5 text-sm font-bold text-toska-deep">
                  <Icon name="check" size={16} /> {m}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 rounded-2xl bg-lightblue px-4 py-4">
            <Micro className="text-med-deep">Nilai setelah remedial</Micro>
            <p className="mt-1.5 text-[14px] font-semibold leading-relaxed text-med-deep">
              Kerjakan tombol <strong>“Ulangi soal yang salah”</strong> untuk mengerjakan kembali soal yang keliru, lalu lihat
              perbandingan nilaimu di kartu hasil.
            </p>
          </div>

          <div className="mt-5 rounded-2xl bg-mint px-4 py-4">
            <div className="flex items-start gap-3">
              <Icon name="leaf" size={20} className="mt-0.5 shrink-0 text-toska-deep" />
              <p className="text-[14px] font-bold leading-relaxed text-toska-deep">
                Bersyukur atas nikmat tubuh yang sehat, jujur dalam setiap jawaban, dan jangan mudah menyerah ketika menemukan
                soal yang sulit.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* pembahasan */}
      {showReview && (
        <Card className="anim-in overflow-hidden">
          <div className="border-b border-lightblue px-5 py-4">
            <Micro className="text-med">Pembahasan seluruh soal</Micro>
            <h3 className="display mt-1 text-xl font-extrabold text-ink">Periksa kembali jawabanmu</h3>
          </div>
          <div className="divide-y divide-lightblue">
            {result.items.map((it, i) => {
              const your = result.answers[i];
              const ok = your !== null && your === it.q.correctAnswer;
              const yourDisp = your === null ? null : it.optionOrder.indexOf(your);
              const correctDisp = it.optionOrder.indexOf(it.q.correctAnswer);
              return (
                <article key={String(it.q.id)} className="px-5 py-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Chip tone="navy">Soal {i + 1}</Chip>
                    <Chip tone={ok ? "mint" : your === null ? "orange" : "red"}>
                      {ok ? "Benar" : your === null ? "Tidak dijawab" : "Belum tepat"}
                    </Chip>
                    <Chip tone="grey">{it.q.materi}</Chip>
                    {it.q.questionType === "HOTS" && (
                      <Chip tone="blue">
                        HOTS · {it.q.stimulusType === "image" ? "Gambar" : it.q.stimulusType === "table" ? "Tabel" : "Kasus"}
                      </Chip>
                    )}
                    {it.q.cognitiveLevel && <Chip tone="grey">Level {it.q.cognitiveLevel}</Chip>}
                  </div>

                  {it.q.stimulus?.type === "table" && (
                    <div className="mt-3 overflow-x-auto rounded-xl border-2 border-lightblue">
                      <table className="w-full min-w-[440px] text-left text-[13px]">
                        <thead className="bg-lightblue">
                          <tr>
                            {it.q.stimulus.columns.map((c) => (
                              <th key={c} className="px-3 py-2 font-extrabold text-med-deep">
                                {c}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {it.q.stimulus.rows.map((r, k) => (
                            <tr key={k} className="border-t border-lightblue">
                              {r.map((cell, j) => (
                                <td key={j} className={`px-3 py-2 ${j === 0 ? "font-bold text-ink" : "text-slate-tint"}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {it.q.stimulus.note && (
                        <div className="border-t border-lightblue bg-wash px-3 py-1.5 text-[11.5px] italic text-slate-tint">
                          {it.q.stimulus.note}
                        </div>
                      )}
                    </div>
                  )}

                  {it.q.stimulus?.type === "image" && (
                    <div className={`mt-3 grid gap-3 ${it.q.stimulus.panels.length > 1 ? "sm:grid-cols-2" : ""}`}>
                      {it.q.stimulus.panels.map((p, pi) => (
                        <figure key={pi} className="max-w-md overflow-hidden rounded-xl border-2 border-lightblue bg-white">
                          {p.kind === "diagram" ? (
                            <div className="h-64 p-2">
                              <Diagram k={p.diagram!} />
                            </div>
                          ) : (
                            <img src={p.src} alt={p.alt} className="h-44 w-full object-cover" loading="lazy" />
                          )}
                          <figcaption className="border-t border-lightblue px-3 py-2 text-[12px] font-semibold text-slate-tint">
                            {p.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}

                  {it.q.stimulus?.type === "case" && (
                    <div className="mt-3 rounded-xl border-l-4 border-accent bg-white px-4 py-3 text-[14px] text-slate-tint">
                      {it.q.stimulus.lines.join(" ")}
                    </div>
                  )}

                  <p className="mt-3 text-[15.5px] font-semibold leading-relaxed text-ink">{it.q.question}</p>

                  <div className="mt-3 space-y-1.5 text-sm">
                    {it.q.options.map((_, d) => {
                      const orig = it.optionOrder[d];
                      const isKey = d === correctDisp;
                      const isYours = d === yourDisp;
                      return (
                        <div
                          key={d}
                          className={`flex items-center gap-2.5 rounded-lg px-3 py-2 font-semibold ${
                            isKey ? "bg-mint text-toska-deep" : isYours ? "bg-[#fde3e3] text-[#a72b2b]" : "text-slate-tint"
                          }`}
                        >
                          <span className="grid h-6 w-6 place-items-center rounded-md bg-white text-[11px] font-extrabold ring-1 ring-lightblue">
                            {LABEL(d)}
                          </span>
                          <span className="flex-1">{it.q.options[orig]}</span>
                          {isKey && <span className="text-[11px] font-extrabold">KUNCI</span>}
                          {isYours && !isKey && <span className="text-[11px] font-extrabold">JAWABANMU</span>}
                          {your === null && isKey && yourDisp === null && null}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 rounded-xl bg-wash px-4 py-3 text-[14.5px] leading-relaxed text-slate-tint">
                    <strong className="text-ink">Pembahasan:</strong> {it.q.explanation}
                  </div>
                  {it.q.indicator && (
                    <div className="mt-2 text-[12.5px] font-semibold text-slate-tint">
                      <strong className="text-ink">Indikator:</strong> {it.q.indicator} · Level kognitif {it.q.cognitiveLevel} ·
                      Kesulitan {it.q.difficulty}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </Card>
      )}

      <div className="flex flex-wrap gap-3 no-print">
        <Button variant="outline" icon="print" onClick={() => window.print()}>
          Cetak hasil belajar
        </Button>
        <Button variant="ghost" icon="chart" onClick={() => go("dashboard")}>
          Lihat riwayat lengkap
        </Button>
      </div>
    </div>
  );
}
