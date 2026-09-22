import { useEffect, useRef, useState } from "react";
import { Button, Card, Chip, Icon, Micro } from "../components/ui";
import { AirwayFlow, ChestBreath, DiagramPencernaan } from "../components/Diagrams";
import type { NavProps } from "../lib/nav";
import { BANDING_DADA_PERUT, EKSPIRASI, INSPIRASI, JALUR_UDARA, SIM_MAKANAN } from "../data/materi";

type Tab = "makanan" | "udara" | "napas" | "dada-perut";

export default function Simulasi({ payload }: NavProps & { payload?: any }) {
  const [tab, setTab] = useState<Tab>(payload?.key === "udara" ? "udara" : payload?.key === "napas" ? "napas" : payload?.key === "dada-perut" ? "dada-perut" : "makanan");

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: "makanan", label: "Perjalanan Makanan", icon: "stomach" },
    { id: "udara", label: "Jalur Pernapasan", icon: "lungs" },
    { id: "napas", label: "Inspirasi & Ekspirasi", icon: "refresh" },
    { id: "dada-perut", label: "Dada & Perut", icon: "user" },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-5 sm:p-6">
        <Micro className="text-toska-deep">Simulasi interaktif</Micro>
        <h2 className="display mt-1.5 text-[clamp(1.5rem,3.2vw,2.2rem)] font-extrabold text-ink">Belajar sambil mengamati organ tubuh</h2>
        <p className="mt-1.5 max-w-2xl text-sm font-semibold text-slate-tint">
          Pilih simulasi, ikuti setiap langkahnya, lalu jawab pertanyaan singkat untuk menguji pemahamanmu.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold transition-all duration-200 ${
                tab === t.id ? "bg-ink text-white shadow-[0_5px_0_0_#061a2e]" : "border-2 border-lightblue bg-white text-slate-tint hover:border-med"
              }`}
            >
              <Icon name={t.icon} size={17} />
              {t.label}
            </button>
          ))}
        </div>
      </Card>

      {tab === "makanan" && <SimMakanan />}
      {tab === "udara" && <SimUdara />}
      {tab === "napas" && <SimNapas />}
      {tab === "dada-perut" && <SimDadaPerut />}
    </div>
  );
}

/* ---------------- Simulasi 1: perjalanan makanan ---------------- */
function SimMakanan() {
  const [i, setI] = useState(0);
  const org = SIM_MAKANAN[i];
  const [choice, setChoice] = useState<number | null>(null);

  useEffect(() => setChoice(null), [i]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
      <Card className="overflow-hidden">
        <div className="border-b border-lightblue px-5 py-4">
          <Micro className="text-med">Ilustrasi sistem pencernaan</Micro>
        </div>
        <div className="mx-auto max-w-[360px] p-4">
          <DiagramPencernaan />
        </div>
        <div className="border-t border-lightblue px-5 py-4">
          <p className="text-[13px] font-semibold leading-relaxed text-slate-tint">
            Tekan organ secara berurutan untuk mengikuti perjalanan makanan dari mulut sampai anus.
          </p>
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="p-5">
          <Micro className="text-toska-deep">Langkah {org.step} dari {SIM_MAKANAN.length}</Micro>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {SIM_MAKANAN.map((o, k) => (
              <button
                key={o.id}
                onClick={() => setI(k)}
                className={`rounded-lg px-3 py-2 text-[13px] font-extrabold transition-all duration-200 ${
                  k === i ? "bg-toska text-white" : k < i ? "bg-mint text-toska-deep" : "bg-wash-2 text-slate-tint hover:bg-lightblue"
                }`}
                aria-pressed={k === i}
              >
                {o.step}. {o.name}
              </button>
            ))}
          </div>

          <div className="anim-in mt-5 rounded-2xl border-2 border-lightblue bg-wash p-5" key={org.id}>
            <div className="flex items-center gap-3">
              <span className="display tnum text-[40px] font-extrabold leading-none text-toska">{org.step}</span>
              <h3 className="display text-2xl font-extrabold text-ink">{org.name}</h3>
            </div>
            <dl className="mt-4 space-y-3 text-[15px] leading-relaxed">
              <div>
                <dt className="micro text-med">Fungsi organ</dt>
                <dd className="mt-1 text-slate-tint">{org.fun}</dd>
              </div>
              <div>
                <dt className="micro text-med">Proses yang terjadi</dt>
                <dd className="mt-1 text-slate-tint">{org.process}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-5 rounded-2xl border-2 border-lightblue p-5">
            <div className="flex items-center gap-2">
              <Chip tone="orange">Pertanyaan singkat</Chip>
            </div>
            <p className="mt-3 font-bold text-ink">{org.quiz.q}</p>
            <div className="mt-3 space-y-2">
              {org.quiz.options.map((op, k) => {
                const picked = choice === k;
                const right = k === org.quiz.answer;
                const show = choice !== null;
                return (
                  <button
                    key={op}
                    disabled={show}
                    onClick={() => setChoice(k)}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-bold transition-all duration-200 ${
                      show && right
                        ? "border-toska bg-mint text-toska-deep"
                        : show && picked
                          ? "border-danger bg-[#fde3e3] text-[#a72b2b]"
                          : picked
                            ? "border-med bg-lightblue text-med-deep"
                            : "border-lightblue bg-white text-ink hover:border-med"
                    }`}
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white text-[12px] font-extrabold ring-1 ring-lightblue">
                      {String.fromCharCode(65 + k)}
                    </span>
                    {op}
                    {show && right && <Icon name="check" size={17} className="ml-auto" />}
                    {show && picked && !right && <Icon name="x" size={17} className="ml-auto" />}
                  </button>
                );
              })}
            </div>
            {choice !== null && (
              <div className={`anim-in mt-3 rounded-xl px-4 py-3 text-sm font-semibold ${choice === org.quiz.answer ? "bg-mint text-toska-deep" : "bg-[#fde3e3] text-[#a72b2b]"}`}>
                <strong>{choice === org.quiz.answer ? "Tepat sekali!" : "Belum tepat."}</strong> {org.quiz.why}
              </div>
            )}
          </div>

          <div className="mt-5 flex justify-between">
            <Button variant="outline" size="sm" icon="arrowL" disabled={i === 0} onClick={() => setI(i - 1)}>
              Sebelumnya
            </Button>
            <Button size="sm" icon="arrowR" disabled={i === SIM_MAKANAN.length - 1} onClick={() => setI(i + 1)}>
              Organ berikutnya
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- Simulasi 2: jalur pernapasan ---------------- */
function SimUdara() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (playing) {
      timer.current = window.setInterval(() => {
        setStage((s) => {
          if (s >= JALUR_UDARA.length - 1) {
            setPlaying(false);
            return s;
          }
          return s + 1;
        });
      }, 1100);
    }
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [playing]);

  const cur = JALUR_UDARA[stage];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <Card className="p-4 sm:p-5">
        <div className="mx-auto max-w-[430px]">
          <AirwayFlow stage={stage} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            size="sm"
            icon={playing ? "x" : "arrowR"}
            onClick={() => {
              if (stage >= JALUR_UDARA.length - 1) setStage(0);
              setPlaying(!playing);
            }}
          >
            {playing ? "Jeda" : "Mulai"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            icon="refresh"
            onClick={() => {
              setPlaying(false);
              setStage(0);
            }}
          >
            Ulang dari awal
          </Button>
          <Button size="sm" variant="ghost" icon="arrowL" disabled={stage === 0} onClick={() => setStage(stage - 1)}>
            Mundur
          </Button>
          <Button size="sm" variant="ghost" icon="arrowR" disabled={stage === JALUR_UDARA.length - 1} onClick={() => setStage(stage + 1)}>
            Maju
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <Micro className="text-toska-deep">Organ ke-{stage + 1}</Micro>
            <Chip tone="mint">{stage + 1} / {JALUR_UDARA.length}</Chip>
          </div>
          <div className="anim-in mt-3" key={stage}>
            <h3 className="display text-3xl font-extrabold text-ink">{cur.name}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-tint">{cur.desc}</p>
          </div>
          <div className="mt-5 rounded-xl bg-lightblue px-4 py-3 text-[13.5px] font-bold leading-relaxed text-med-deep">
            Jalur masuk udara: Hidung → Faring → Laring → Trakea → Bronkus → Bronkiolus → Alveolus
          </div>
        </Card>

        <Card className="p-5">
          <Micro className="text-med">Catatan penting</Micro>
          <ul className="mt-3 space-y-2.5 text-[14.5px] leading-relaxed text-slate-tint">
            <li className="flex gap-2.5">
              <Icon name="check" size={17} className="mt-1 shrink-0 text-toska" />
              Alveolus adalah tempat pertukaran oksigen dan karbon dioksida.
            </li>
            <li className="flex gap-2.5">
              <Icon name="check" size={17} className="mt-1 shrink-0 text-toska" />
              Jalur keluarnya udara berbalik arah: alveolus → bronkiolus → bronkus → trakea → laring → faring → hidung.
            </li>
            <li className="flex gap-2.5">
              <Icon name="check" size={17} className="mt-1 shrink-0 text-toska" />
              Hidung menyaring, menghangatkan, dan melembapkan udara sebelum masuk ke paru-paru.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- Simulasi 3: inspirasi & ekspirasi ---------------- */
function SimNapas() {
  const [phase, setPhase] = useState<"in" | "out">("in");
  const info = phase === "in" ? INSPIRASI : EKSPIRASI;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <Card className="p-5">
        <div className="flex gap-2">
          {(["in", "out"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPhase(p)}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-extrabold transition-all duration-200 ${
                phase === p ? (p === "in" ? "bg-toska text-white shadow-[0_5px_0_0_#0b807e]" : "bg-accent text-ink shadow-[0_5px_0_0_#c96f0a]") : "border-2 border-lightblue bg-white text-slate-tint hover:border-med"
              }`}
              aria-pressed={phase === p}
            >
              {p === "in" ? "Inspirasi (tarik napas)" : "Ekspirasi (hembuskan napas)"}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-5 max-w-[340px]">
          <ChestBreath phase={phase} />
        </div>

        <div className="mt-4 rounded-xl bg-wash px-4 py-3 text-center text-[13.5px] font-bold text-slate-tint">
          Perhatikan gerak paru-paru dan diafragma saat tombol diganti.
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="overflow-hidden">
          <div className="px-5 py-4" style={{ background: phase === "in" ? "#d7f2ea" : "#fdead6" }}>
            <Micro style={{ color: phase === "in" ? "#0b807e" : "#b96a05" }}>Proses</Micro>
            <h3 className="display mt-1 text-2xl font-extrabold text-ink">{info.title}</h3>
          </div>
          <dl className="divide-y divide-lightblue">
            {[
              ["Arah udara", info.air, "arrowR"],
              ["Rongga dada", info.chest, "shield"],
              ["Diafragma", info.diaphragm, "menu"],
              ["Paru-paru", info.lungs, "lungs"],
            ].map(([label, value, icon]) => (
              <div key={label} className="flex gap-3 px-5 py-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-lightblue text-med">
                  <Icon name={icon} size={18} />
                </div>
                <div>
                  <dt className="micro text-slate-tint">{label}</dt>
                  <dd className="mt-1 text-[15px] font-bold leading-snug text-ink">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Card>

        <div className={`rounded-2xl px-5 py-4 text-[14.5px] font-bold leading-relaxed ${phase === "in" ? "bg-mint text-toska-deep" : "bg-[#fdead6] text-[#b96a05]"}`}>
          {phase === "in"
            ? "Ingat: INSPIRASI = udara MASUK, diafragma berkontraksi dan bergerak ke bawah, rongga dada membesar."
            : "Ingat: EKSPIRASI = udara KELUAR, diafragma relaksasi dan melengkung ke atas, rongga dada mengecil."}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Simulasi 4: pernapasan dada vs perut ---------------- */
function SimDadaPerut() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {[
          { title: "Pernapasan Dada", color: "#1976d2", light: "#dcebf7", focus: "Otot antartulang rusuk", desc: "Dada yang naik dan turun. Lebih terlihat ketika kita berbaring." },
          { title: "Pernapasan Perut", color: "#0fa3a0", light: "#d7f2ea", focus: "Diafragma", desc: "Perut yang naik dan turun. Lebih terlihat ketika kita berdiri." },
        ].map((c, k) => (
          <Card key={c.title} className="overflow-hidden">
            <div className="px-5 py-4" style={{ background: c.light }}>
              <Micro style={{ color: c.color }}>{c.focus}</Micro>
              <h3 className="display mt-1 text-2xl font-extrabold text-ink">{c.title}</h3>
            </div>
            <div className="p-5">
              <svg viewBox="0 0 240 220" className="mx-auto h-52 w-full" role="img" aria-label={`${c.title}: ${c.desc}`}>
                <rect width="240" height="220" rx="16" fill="#f7fbfe" />
                <path d="M120 18c18 0 30 12 30 28v8H90v-8c0-16 12-28 30-28Z" fill="#d7f2ea" stroke="#0e2a47" strokeWidth="2.2" />
                {k === 0 ? (
                  <g style={{ transformOrigin: "120px 110px", animation: "bob 3s ease-in-out infinite" }}>
                    <path d="M66 152c0-46 24-78 54-78s54 32 54 78Z" fill={c.light} stroke="#0e2a47" strokeWidth="2.4" />
                    {[0, 1, 2, 3].map((r) => (
                      <path key={r} d={`M78 ${92 + r * 16}c26-8 58-8 84 0`} stroke={c.color} strokeWidth="5" fill="none" strokeLinecap="round" />
                    ))}
                    <text x="120" y="186" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="13" fontWeight="800" fill="#0e2a47">
                      Dada naik turun
                    </text>
                  </g>
                ) : (
                  <g>
                    <path d="M70 120c0-34 22-56 50-56s50 22 50 56Z" fill={c.light} stroke="#0e2a47" strokeWidth="2.4" />
                    <g style={{ transformOrigin: "120px 160px", animation: "bob 3s ease-in-out infinite" }}>
                      <ellipse cx="120" cy="158" rx="46" ry="30" fill={c.color} opacity=".35" stroke={c.color} strokeWidth="3" />
                      <path d="M76 132c26-14 62-14 88 0" stroke={c.color} strokeWidth="6" fill="none" strokeLinecap="round" />
                    </g>
                    <text x="120" y="204" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="13" fontWeight="800" fill="#0e2a47">
                      Perut naik turun
                    </text>
                  </g>
                )}
              </svg>
              <p className="mt-3 text-center text-[14.5px] font-semibold text-slate-tint">{c.desc}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-lightblue px-5 py-4">
          <Micro className="text-med">Tabel perbandingan</Micro>
          <h3 className="display mt-1 text-xl font-extrabold text-ink">Pernapasan dada vs pernapasan perut</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-wash">
              <tr>
                <th className="px-5 py-3 text-[11px] uppercase tracking-[0.12em] text-slate-tint">Perbandingan</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-[0.12em] text-med">Pernapasan dada</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-[0.12em] text-toska-deep">Pernapasan perut</th>
              </tr>
            </thead>
            <tbody>
              {BANDING_DADA_PERUT.map((r) => (
                <tr key={r.label} className="border-t border-lightblue align-top">
                  <td className="px-5 py-3.5 font-extrabold text-ink">{r.label}</td>
                  <td className="px-5 py-3.5 text-slate-tint">{r.dada}</td>
                  <td className="px-5 py-3.5 text-slate-tint">{r.perut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
