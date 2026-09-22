import { useEffect, useMemo, useState } from "react";
import { Button, Card, Chip, Icon, Micro, Progress } from "../components/ui";
import type { MateriKey, NavProps } from "../lib/nav";
import { MATERI_PENCERNAAN, MATERI_PERNAPASAN, type Section } from "../data/materi";
import type { Progress as P } from "../lib/storage";

export default function Materi({
  go,
  payload,
  progress,
  setProgress,
}: NavProps & { payload?: any; progress: P; setProgress: (p: P) => void }) {
  const [key, setKey] = useState<MateriKey>(payload?.key === "pernapasan" ? "pernapasan" : "pencernaan");
  const sections: Section[] = key === "pencernaan" ? MATERI_PENCERNAAN : MATERI_PERNAPASAN;
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    setActiveId(sections[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const idx = Math.max(0, sections.findIndex((s) => s.id === activeId));
  const active = sections[idx];
  const readHere = sections.filter((s) => progress.read.includes(s.id)).length;

  // tandai otomatis pokok yang sedang dibaca
  useEffect(() => {
    if (!progress.read.includes(active.id)) {
      setProgress({ ...progress, read: [...progress.read, active.id] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active.id]);

  const meta = useMemo(
    () =>
      key === "pencernaan"
        ? {
            title: "Sistem Pencernaan Manusia",
            sub: "Mengolah makanan menjadi sari-sari makanan dan membuang sisa makanan.",
            img: "images/pencernaan.jpg",
            alt: "Ilustrasi sistem pencernaan manusia.",
            color: "#f5921e",
            flow: ["Mulut", "Faring", "Kerongkongan", "Lambung", "Usus Halus", "Usus Besar", "Rektum", "Anus"],
          }
        : {
            title: "Sistem Pernapasan Manusia",
            sub: "Mengambil oksigen dari udara dan mengeluarkan karbon dioksida.",
            img: "images/pernapasan.jpg",
            alt: "Ilustrasi sistem pernapasan manusia.",
            color: "#0fa3a0",
            flow: ["Hidung", "Faring", "Laring", "Trakea", "Bronkus", "Bronkiolus", "Alveolus"],
          },
    [key]
  );

  const goto = (id: string) => {
    setActiveId(id);
    if (typeof window !== "undefined") document.getElementById("materi-content")?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <Card className="overflow-hidden">
        <div className="relative">
          <div className="paper-grid absolute inset-0 opacity-60" aria-hidden />
          <div className="relative flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-center">
            <img src={meta.img} alt={meta.alt} className="h-28 w-28 shrink-0 rounded-2xl border-2 border-white object-cover shadow-lg" loading="lazy" />
            <div className="min-w-0 flex-1">
              <Micro className="text-toska-deep">Materi pembelajaran</Micro>
              <h2 className="display mt-1.5 text-[clamp(1.5rem,3.2vw,2.2rem)] font-extrabold text-ink">{meta.title}</h2>
              <p className="mt-1 text-sm font-semibold text-slate-tint">{meta.sub}</p>
              <div className="mt-4 flex items-center gap-3">
                <Progress value={(readHere / sections.length) * 100} tone={meta.color} />
                <span className="tnum shrink-0 text-sm font-extrabold text-ink">
                  {readHere}/{sections.length}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {(["pencernaan", "pernapasan"] as MateriKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setKey(k)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-extrabold transition-all duration-200 ${
                    key === k ? "bg-ink text-white" : "border-2 border-lightblue bg-white text-slate-tint hover:border-med"
                  }`}
                >
                  {k === "pencernaan" ? "Pencernaan" : "Pernapasan"}
                </button>
              ))}
            </div>
          </div>

          {/* alur */}
          <div className="relative border-t border-lightblue bg-white/70 px-5 py-4 sm:px-6">
            <Micro className="mb-2 text-med">Urutan yang harus dihafal</Micro>
            <div className="flex flex-wrap items-center gap-1.5">
              {meta.flow.map((f, i) => (
                <span key={f} className="flex items-center gap-1.5">
                  <span className="rounded-lg bg-lightblue px-2.5 py-1.5 text-[12px] font-extrabold text-med-deep">{f}</span>
                  {i < meta.flow.length - 1 && <Icon name="arrowR" size={14} className="text-toska" />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* dua kolom: indeks + isi */}
      <div className="grid gap-6 lg:grid-cols-[290px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="overflow-hidden">
            <div className="border-b border-lightblue px-4 py-3">
              <Micro className="text-slate-tint">Daftar pokok materi</Micro>
            </div>
            <ol className="max-h-[62vh] overflow-y-auto p-2">
              {sections.map((s) => {
                const done = progress.read.includes(s.id);
                const on = s.id === active.id;
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => goto(s.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
                        on ? "bg-ink text-white" : "hover:bg-wash"
                      }`}
                    >
                      <span
                        className={`tnum grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[11px] font-extrabold ${
                          on ? "bg-toska text-white" : done ? "bg-mint text-toska-deep" : "bg-wash-2 text-slate-tint"
                        }`}
                      >
                        {String(s.no).padStart(2, "0")}
                      </span>
                      <span className={`min-w-0 flex-1 truncate text-[13.5px] font-bold ${on ? "text-white" : "text-ink"}`}>{s.title}</span>
                      {done && !on && <Icon name="check" size={15} className="text-toska" />}
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="border-t border-lightblue p-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                icon="flask"
                onClick={() => go("simulasi", { key: key === "pencernaan" ? "makanan" : "udara" })}
              >
                Buka simulasi terkait
              </Button>
            </div>
          </Card>
        </aside>

        <main id="materi-content" className="min-w-0">
          <Card className="anim-in overflow-hidden" key={active.id}>
            <div className="border-b border-lightblue px-5 py-5 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="display tnum text-[42px] font-extrabold leading-none" style={{ color: meta.color }}>
                  {String(active.no).padStart(2, "0")}
                </span>
                <div>
                  <Micro className="text-slate-tint">{active.lead}</Micro>
                  <h3 className="display text-[clamp(1.35rem,2.6vw,1.9rem)] font-extrabold text-ink">{active.title}</h3>
                </div>
              </div>
            </div>

            <div className="space-y-4 px-5 py-6 text-[15.5px] leading-[1.75] text-slate-tint sm:px-7">
              {active.blocks.map((b, i) => {
                if (b.type === "p") return <p key={i}>{b.text}</p>;
                if (b.type === "list")
                  return (
                    <ul key={i} className="space-y-2.5">
                      {b.items.map((it) => (
                        <li key={it} className="flex gap-3">
                          <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full" style={{ background: meta.color }} />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  );
                if (b.type === "flow")
                  return (
                    <div key={i} className="rounded-2xl border-2 border-lightblue bg-wash p-4">
                      <Micro className="mb-3 text-med">Urutan</Micro>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {b.items.map((f, j) => (
                          <span key={f} className="flex items-center gap-1.5">
                            <span className="rounded-lg bg-white px-2.5 py-1.5 text-[12.5px] font-extrabold text-ink shadow-sm">{f}</span>
                            {j < b.items.length - 1 && <Icon name="arrowR" size={14} className="text-toska" />}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                return (
                  <div key={i} className="rounded-xl border-l-4 border-accent bg-[#fff7ee] px-4 py-3 text-[15px] font-semibold text-ink">
                    {b.text}
                  </div>
                );
              })}

              {active.reflect && (
                <div className="flex items-start gap-3 rounded-xl bg-mint px-4 py-3.5">
                  <Icon name="leaf" size={20} className="mt-0.5 shrink-0 text-toska-deep" />
                  <p className="text-[14.5px] font-bold leading-relaxed text-toska-deep">{active.reflect}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-lightblue bg-wash/70 px-5 py-4 sm:px-7">
              <Button variant="outline" size="sm" icon="arrowL" disabled={idx === 0} onClick={() => goto(sections[idx - 1].id)}>
                Sebelumnya
              </Button>
              <Chip tone="mint">
                <Icon name="check" size={13} /> Sudah dibaca
              </Chip>
              <Button size="sm" icon="arrowR" disabled={idx === sections.length - 1} onClick={() => goto(sections[idx + 1].id)}>
                Pokok berikutnya
              </Button>
            </div>
          </Card>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="navy" icon="quiz" onClick={() => go("quiz", { category: key === "pencernaan" ? "Sistem Pencernaan" : "Sistem Pernapasan" })}>
              Latihan soal bab ini
            </Button>
            <Button variant="outline" icon="home" onClick={() => go("dashboard")}>
              Kembali ke dashboard
            </Button>
          </div>

          {key === "pencernaan" && (
            <Card className="mt-4 overflow-hidden">
              <div className="grid sm:grid-cols-[1fr_220px]">
                <div className="p-5">
                  <Micro className="text-toska-deep">Contoh penerapan sehari-hari</Micro>
                  <h4 className="display mt-1.5 text-lg font-extrabold text-ink">Piring serat-mu hari ini</h4>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate-tint">
                    Sayur, buah, sumber protein, dan air putih yang cukup membantu usus besar bekerja lebih ringan. Kunyah
                    makanan perlahan supaya kerja lambung tidak terlalu berat.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip tone="mint">Serat</Chip>
                    <Chip tone="blue">Air putih</Chip>
                    <Chip tone="orange">Kunyah perlahan</Chip>
                  </div>
                </div>
                <img
                  src="images/makanan-sehat.jpg"
                  alt="Aneka makanan kaya serat: nasi merah, brokoli, wortel, sayuran hijau, pisang, apel, jagung, tempe, dan segelas air."
                  className="h-44 w-full object-cover sm:h-full"
                  loading="lazy"
                />
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
