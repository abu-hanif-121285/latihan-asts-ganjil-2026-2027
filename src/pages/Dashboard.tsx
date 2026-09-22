import { useState } from "react";
import { Button, Card, Chip, Icon, Micro, Progress } from "../components/ui";
import type { NavProps } from "../lib/nav";
import { BADGES, fmtTime, type Progress as P } from "../lib/storage";

export default function Dashboard({
  go,
  progress,
  setProgress,
  totalRead,
  bankSize,
}: NavProps & { progress: P; setProgress: (p: P) => void; totalRead: number; bankSize: number }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(progress.name);

  const attempts = progress.attempts;
  const attemptedQ = attempts.reduce((s, a) => s + a.total, 0);
  const totalCorrect = attempts.reduce((s, a) => s + a.correct, 0);
  const pct = attemptedQ ? Math.round((totalCorrect / attemptedQ) * 100) : 0;
  const best = attempts.length ? Math.max(...attempts.map((a) => a.score)) : null;
  const readP = progress.read.filter((id) => id.startsWith("p-")).length;
  const readR = progress.read.filter((id) => id.startsWith("r-")).length;
  const progressPct = Math.round((progress.read.length / Math.max(1, totalRead)) * 100);

  const saveName = () => {
    const clean = name.trim().slice(0, 24) || "Siswa";
    setProgress({ ...progress, name: clean });
    setEditing(false);
  };

  const MENUS: { icon: string; title: string; desc: string; view: any; payload?: any; tone: string }[] = [
    { icon: "stomach", title: "Materi Sistem Pencernaan", desc: `${readP} dari 20 pokok dibaca`, view: "materi", payload: { key: "pencernaan" }, tone: "#f5921e" },
    { icon: "lungs", title: "Materi Sistem Pernapasan", desc: `${readR} dari 20 pokok dibaca`, view: "materi", payload: { key: "pernapasan" }, tone: "#0fa3a0" },
    { icon: "quiz", title: "Latihan Soal", desc: `${bankSize} soal siap dikerjakan`, view: "quiz", tone: "#1976d2" },
    { icon: "flask", title: "Simulasi", desc: "4 simulasi interaktif", view: "simulasi", tone: "#0b4a8f" },
    { icon: "chart", title: "Hasil Belajar", desc: `${attempts.length} riwayat nilai`, view: "hasil", tone: "#33506b" },
    { icon: "trophy", title: "Tantangan A-STS", desc: "Mode simulasi tanpa kunci langsung", view: "quiz", payload: { mode: "sts" }, tone: "#d93b3b" },
  ];

  return (
    <div className="space-y-6">
      {/* sapaan */}
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-center">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-ink text-white">
            <Icon name="user" size={30} />
          </div>
          <div className="min-w-0 flex-1">
            {editing ? (
              <div className="flex flex-wrap items-center gap-2">
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveName()}
                  className="rounded-lg border-2 border-lightblue px-3 py-2 text-lg font-extrabold text-ink outline-none focus:border-toska"
                  aria-label="Nama siswa"
                />
                <Button size="sm" onClick={saveName} icon="check">
                  Simpan
                </Button>
              </div>
            ) : (
              <button onClick={() => setEditing(true)} className="group text-left" title="Ubah nama">
                <h2 className="display text-[clamp(1.5rem,3vw,2.1rem)] font-extrabold text-ink">
                  Halo, {progress.name}!
                  <span className="ml-2 align-middle text-[11px] font-bold tracking-wide text-med opacity-0 transition-opacity group-hover:opacity-100">
                    ubah nama
                  </span>
                </h2>
              </button>
            )}
            <p className="mt-1 text-sm font-semibold text-slate-tint">Semangat terus belajar dan jaga kesehatanmu!</p>
            <div className="mt-4 flex items-center gap-3">
              <Progress value={progressPct} />
              <span className="tnum shrink-0 text-sm font-extrabold text-ink">{progressPct}%</span>
            </div>
            <div className="mt-1.5 text-[12px] font-semibold text-slate-tint">Progress belajar materi</div>
          </div>
          <div className="flex gap-2 md:flex-col">
            <Button size="sm" icon="arrowR" onClick={() => go("materi")}>
              Lanjut belajar
            </Button>
            <Button size="sm" variant="outline" icon="refresh" onClick={() => go("quiz")}>
              Ulangi kuis
            </Button>
          </div>
        </div>

        {/* strip statistik */}
        <div className="grid grid-cols-2 divide-x divide-y divide-lightblue border-t border-lightblue md:grid-cols-4 md:divide-y-0">
          {[
            { label: "Materi dipelajari", value: `${progress.read.length}`, sub: `dari ${totalRead} pokok`, icon: "book" },
            { label: "Soal dikerjakan", value: `${attemptedQ}`, sub: `dari ${bankSize} soal`, icon: "quiz" },
            { label: "Nilai terakhir", value: progress.lastScore !== null ? `${progress.lastScore}` : "—", sub: "skor 0–100", icon: "star" },
            { label: "Nilai tertinggi", value: best !== null ? `${best}` : "—", sub: `${pct}% jawaban benar`, icon: "trophy" },
          ].map((s) => (
            <div key={s.label} className="px-4 py-5">
              <div className="flex items-center gap-2 text-med">
                <Icon name={s.icon} size={16} />
                <Micro className="text-slate-tint">{s.label}</Micro>
              </div>
              <div className="display tnum mt-1.5 text-3xl font-extrabold text-ink">{s.value}</div>
              <div className="text-[12px] font-semibold text-slate-tint">{s.sub}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* menu utama */}
      <section>
        <div className="mb-3 flex items-end justify-between">
          <h3 className="display text-xl font-extrabold text-ink">Mau belajar yang mana?</h3>
          <Chip tone="mint">{MENUS.length} menu</Chip>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {MENUS.map((m, i) => (
            <button
              key={m.title}
              onClick={() => go(m.view, m.payload)}
              className="anim-up group flex items-start gap-4 rounded-2xl border-2 border-lightblue bg-white p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-toska"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white" style={{ background: m.tone }}>
                <Icon name={m.icon} size={24} />
              </div>
              <div className="min-w-0">
                <div className="font-extrabold leading-tight text-ink">{m.title}</div>
                <div className="mt-1 text-[13px] font-semibold text-slate-tint">{m.desc}</div>
              </div>
              <span className="ml-auto self-center text-lightblue transition-all duration-200 group-hover:translate-x-1 group-hover:text-toska">
                <Icon name="arrowR" size={20} />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* lencana */}
      <Card className="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="display text-xl font-extrabold text-ink">Pencapaian</h3>
          <Chip tone="orange">{progress.badges.length} / {BADGES.length} lencana</Chip>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {BADGES.map((b) => {
            const owned = progress.badges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`rounded-2xl border-2 p-4 text-center transition-all duration-200 ${owned ? "border-transparent bg-white shadow-lg" : "border-dashed border-lightblue bg-wash/60"}`}
                style={owned ? { borderColor: b.color } : undefined}
              >
                <div
                  className={`mx-auto grid h-12 w-12 place-items-center rounded-full ${owned ? "text-white" : "bg-wash-2 text-slate-tint"}`}
                  style={owned ? { background: b.color } : undefined}
                >
                  <Icon name={owned ? "trophy" : "star"} size={22} />
                </div>
                <div className="mt-2 text-[13px] font-extrabold text-ink">{b.name}</div>
                <div className="mt-1 text-[11px] leading-snug text-slate-tint">{b.desc}</div>
                <div className="mt-2 text-[10px] font-extrabold tracking-widest" style={{ color: owned ? b.color : "#8aa4bd" }}>
                  {owned ? "DIDAPAT" : "TERKUNCI"}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* riwayat */}
      <Card className="p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="display text-xl font-extrabold text-ink">Riwayat nilai terakhir</h3>
          <Button size="sm" variant="outline" icon="chart" onClick={() => go("hasil")}>
            Lihat semua
          </Button>
        </div>
        {attempts.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-lightblue px-4 py-8 text-center text-sm font-semibold text-slate-tint">
            Belum ada nilai. Kerjakan latihan pertamamu, nilai akan tersimpan di sini.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-lightblue text-[11px] uppercase tracking-[0.12em] text-slate-tint">
                  <th className="py-2 pr-3 font-extrabold">Tanggal</th>
                  <th className="py-2 pr-3 font-extrabold">Materi</th>
                  <th className="py-2 pr-3 font-extrabold">Mode</th>
                  <th className="py-2 pr-3 font-extrabold">Benar</th>
                  <th className="py-2 pr-3 font-extrabold">Waktu</th>
                  <th className="py-2 text-right font-extrabold">Nilai</th>
                </tr>
              </thead>
              <tbody>
                {attempts.slice(0, 6).map((a) => (
                  <tr key={a.id} className="border-b border-lightblue/60">
                    <td className="py-2.5 pr-3 font-semibold text-slate-tint">
                      {new Date(a.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="py-2.5 pr-3 font-bold text-ink">{a.category}</td>
                    <td className="py-2.5 pr-3">
                      <Chip tone={a.mode === "sts" ? "navy" : "blue"}>{a.mode === "sts" ? "Simulasi A-STS" : "Latihan"}</Chip>
                    </td>
                    <td className="tnum py-2.5 pr-3 font-bold text-ink">
                      {a.correct}/{a.total}
                    </td>
                    <td className="tnum py-2.5 pr-3 text-slate-tint">{fmtTime(a.duration)}</td>
                    <td className="tnum py-2.5 text-right">
                      <span
                        className="rounded-lg px-2 py-1 text-sm font-extrabold"
                        style={{
                          background: a.score >= 80 ? "#d7f2ea" : a.score >= 70 ? "#fdead6" : "#fde3e3",
                          color: a.score >= 80 ? "#0b807e" : a.score >= 70 ? "#b96a05" : "#a72b2b",
                        }}
                      >
                        {a.score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
