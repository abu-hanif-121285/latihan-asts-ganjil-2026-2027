import { Button, Chip, Icon, LogoMark, Micro } from "../components/ui";
import type { NavProps } from "../lib/nav";

const FEATURES = [
  { icon: "quiz", title: "Latihan Kuis", desc: "45 soal pilihan ganda lengkap dengan pembahasan.", go: "quiz" },
  { icon: "book", title: "Materi", desc: "Sistem pencernaan & sistem pernapasan manusia.", go: "materi" },
  { icon: "flask", title: "Simulasi", desc: "Perjalanan makanan, jalur udara, dan diafragma.", go: "simulasi" },
  { icon: "teacher", title: "Mode Guru", desc: "Kelola bank soal, filter, impor & ekspor JSON.", go: "guru" },
] as const;

const TOPIC_P = [
  "Organ dan fungsi pencernaan",
  "Perjalanan makanan mulut sampai anus",
  "Pencernaan mekanik dan kimiawi",
  "Penyerapan sari-sari makanan",
  "Cara menjaga kesehatan pencernaan",
];
const TOPIC_R = [
  "Organ dan fungsi pernapasan",
  "Alur udara dari hidung ke alveolus",
  "Inspirasi dan ekspirasi",
  "Pernapasan dada dan pernapasan perut",
  "Cara menjaga kesehatan pernapasan",
];

export default function Landing({ go }: NavProps & { stats?: any }) {
  return (
    <div className="min-h-screen bg-wash">
      {/* ---------- NAV ---------- */}
      <header className="sticky top-0 z-40 border-b border-lightblue bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <LogoMark size={36} />
            <div className="leading-none">
              <div className="display text-[15px] font-extrabold text-ink">WAH OFFICIAL</div>
              <div className="mt-1 text-[10px] font-bold tracking-[0.18em] text-med">MEDICAL SCIENCE QUIZ</div>
            </div>
          </div>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
            {[
              ["Beranda", "landing"],
              ["Materi", "materi"],
              ["Latihan", "quiz"],
              ["Simulasi", "simulasi"],
              ["Petunjuk", "petunjuk"],
            ].map(([label, v]) => (
              <button
                key={v}
                onClick={() => go(v as any)}
                className="rounded-lg px-3.5 py-2 text-sm font-bold text-slate-tint transition-colors duration-200 hover:bg-lightblue hover:text-med-deep"
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" icon="teacher" onClick={() => go("guru")}>
              Mode Guru
            </Button>
            <button
              className="grid h-9 w-9 place-items-center rounded-lg border-2 border-lightblue text-ink md:hidden"
              onClick={() => go("dashboard")}
              aria-label="Buka dasbor siswa"
            >
              <Icon name="menu" size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-white">
        <div className="paper-grid absolute inset-0 opacity-70" aria-hidden />
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-mint/70 blur-3xl" aria-hidden />
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-8 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:pb-24 lg:pt-16">
          <div className="anim-up lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="navy">WAH Official</Chip>
              <Chip tone="blue">SDIT Insantama</Chip>
              <Chip tone="mint">Kelas VI SD · Fase C</Chip>
            </div>

            <h1 className="display mt-6 text-[clamp(2.6rem,7vw,5.2rem)] font-extrabold text-ink">
              MEDICAL
              <br />
              <span className="text-med">SCIENCE</span> QUIZ
            </h1>

            <div className="mt-5 inline-block rounded-r-xl rounded-l-sm bg-ink px-5 py-3 text-[clamp(1rem,2.4vw,1.35rem)] font-extrabold text-white">
              Latihan A-STS IPAS Kelas VI SD
            </div>

            <div className="mt-5 max-w-xl rounded-2xl border-2 border-lightblue bg-white px-5 py-4">
              <Micro className="text-toska-deep">Materi yang dipelajari</Micro>
              <p className="mt-1.5 text-[15px] font-bold leading-snug text-ink">
                Sistem Pencernaan Manusia <span className="text-toska">dan</span> Sistem Pernapasan Manusia
              </p>
            </div>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-tint">
              Aplikasi belajar dan latihan soal IPAS kelas VI SD. Kenali organ tubuhmu, ikuti simulasi interaktif, kerjakan 45 soal
              lengkap dengan pembahasan, lalu pantau progres belajarmu.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" icon="arrowR" onClick={() => go("dashboard")}>
                Mulai Belajar
              </Button>
              <Button size="lg" variant="outline" icon="book" onClick={() => go("materi")}>
                Lihat Materi
              </Button>
              <Button size="lg" variant="navy" icon="quiz" onClick={() => go("quiz")}>
                Mulai Kuis
              </Button>
            </div>

            <p className="mt-6 border-l-4 border-accent pl-4 text-[15px] font-semibold italic text-ink">
              “Kenali tubuhmu, pahami ilmunya, dan siapkan dirimu menghadapi A-STS!”
            </p>
          </div>

          {/* ilustrasi */}
          <div className="relative lg:col-span-5">
            <div className="anim-up relative overflow-hidden rounded-[28px] border-4 border-white shadow-[0_30px_60px_-30px_rgba(11,74,143,.6)]" style={{ animationDelay: ".1s" }}>
              <img
                src="images/hero-lab.jpg"
                alt="Dua siswa SD mengenakan jas laboratorium sedang belajar di meja sains dengan mikroskop, buku, dan stetoskop."
                className="aspect-[3/2] w-full object-cover"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
            </div>

            <div className="anim-up absolute -bottom-6 -left-2 hidden rounded-2xl border-2 border-lightblue bg-white px-4 py-3 shadow-xl sm:block" style={{ animationDelay: ".25s" }}>
              <Micro className="text-med">Jumlah soal</Micro>
              <div className="display tnum text-3xl font-extrabold text-ink">45</div>
              <div className="text-[11px] font-bold text-slate-tint">30 dasar + 15 HOTS</div>
            </div>
            <div className="anim-up absolute -right-1 top-4 hidden rounded-2xl border-2 border-lightblue bg-white px-4 py-3 shadow-xl sm:block" style={{ animationDelay: ".35s" }}>
              <Micro className="text-toska-deep">Simulasi</Micro>
              <div className="display tnum text-3xl font-extrabold text-ink">4</div>
              <div className="text-[11px] font-bold text-slate-tint">interaktif</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- STRIP INFO ---------- */}
      <section className="border-y border-lightblue bg-ink">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 divide-x divide-white/10 px-4 sm:px-6 md:grid-cols-4">
          {[
            ["45", "Soal latihan", "30 dasar + 15 HOTS"],
            ["2", "Materi utama", "Pencernaan & pernapasan"],
            ["4", "Simulasi", "Organ, udara, diafragma"],
            ["4", "Lencana", "Pencapaian belajarmu"],
          ].map(([n, t, d], i) => (
            <div key={t} className={`px-3 py-6 text-center ${i > 1 ? "border-t border-white/10 md:border-t-0" : ""}`}>
              <div className="display tnum text-4xl font-extrabold text-white">{n}</div>
              <div className="mt-1 text-sm font-extrabold text-toska">{t}</div>
              <div className="text-[12px] text-white/75">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- MATERI ---------- */}
      <section className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Micro className="text-toska-deep">Materi pembelajaran</Micro>
            <h2 className="display mt-2 text-[clamp(1.7rem,3.6vw,2.6rem)] font-extrabold text-ink">
              Pahami konsepnya, lalu uji pemahamanmu.
            </h2>
          </div>
          <Button variant="outline" icon="book" onClick={() => go("materi")}>
            Lihat semua materi
          </Button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {[
            { key: "pencernaan", img: "images/pencernaan.jpg", alt: "Ilustrasi sistem pencernaan manusia: mulut, kerongkongan, lambung, usus halus, dan usus besar.", title: "Sistem Pencernaan Manusia", color: "#f5921e", topics: TOPIC_P },
            { key: "pernapasan", img: "images/pernapasan.jpg", alt: "Ilustrasi sistem pernapasan manusia: hidung, trakea, paru-paru, dan diafragma.", title: "Sistem Pernapasan Manusia", color: "#0fa3a0", topics: TOPIC_R },
          ].map((m, idx) => (
            <article
              key={m.key}
              className="anim-up group grid overflow-hidden rounded-3xl border border-lightblue bg-white shadow-[0_18px_40px_-32px_rgba(11,74,143,.7)] sm:grid-cols-[150px_1fr]"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="relative hidden sm:block">
                <img src={m.img} alt={m.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${m.color}22, ${m.color}66)` }} />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: m.color }} />
                  <h3 className="display text-xl font-extrabold text-ink">{m.title}</h3>
                </div>
                <ul className="mt-4 space-y-1">
                  {m.topics.map((t, i) => (
                    <li key={t} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-200 hover:bg-wash">
                      <span className="tnum text-[11px] font-extrabold" style={{ color: m.color }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-4 bg-lightblue" />
                      <span className="text-sm font-semibold text-slate-tint">{t}</span>
                    </li>
                  ))}
                </ul>
                <Button size="sm" className="mt-4" icon="arrowR" onClick={() => go("materi", { key: m.key })}>
                  Lanjutkan belajar
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- FITUR ---------- */}
      <section className="border-t border-lightblue bg-white">
        <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6">
          <Micro className="text-toska-deep">Fitur aplikasi</Micro>
          <h2 className="display mt-2 max-w-2xl text-[clamp(1.7rem,3.6vw,2.4rem)] font-extrabold text-ink">
            Belajar, berlatih, dan pantau progres dalam satu tempat.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <button
                key={f.title}
                onClick={() => go(f.go as any)}
                className="anim-up group rounded-2xl border-2 border-lightblue bg-white p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-toska"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-lightblue text-med transition-colors duration-200 group-hover:bg-toska group-hover:text-white">
                  <Icon name={f.icon} size={22} />
                </div>
                <div className="mt-4 font-extrabold text-ink">{f.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-slate-tint">{f.desc}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-[13px] font-extrabold text-toska-deep">
                  Buka <Icon name="arrowR" size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="bg-ink">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark size={40} />
              <div>
                <div className="display text-base font-extrabold text-white">MEDICAL SCIENCE QUIZ</div>
                <div className="text-[11px] font-bold tracking-[0.16em] text-toska">WAH OFFICIAL</div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
              Latihan A-STS IPAS Kelas VI SD materi sistem pencernaan dan sistem pernapasan manusia. Dibuat untuk membantu siswa
              belajar mandiri dengan bahasa yang mudah dipahami.
            </p>
          </div>
          <div>
            <div className="micro text-toska">Kreator</div>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li className="font-bold text-white">Wiyanto Abu Hanif</li>
              <li>WAH Official</li>
              <li>SDIT Insantama</li>
            </ul>
          </div>
          <div>
            <div className="micro text-toska">Jenjang</div>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li>Kelas VI SD</li>
              <li>Fase C</li>
              <li>Kurikulum Merdeka</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-[12px] text-white/70">
          © {new Date().getFullYear()} WAH Official · Aplikasi latihan belajar, bukan alat diagnosis medis.
        </div>
      </footer>
    </div>
  );
}
