import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Chip, Icon, LogoMark, Micro } from "./components/ui";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import MateriPage from "./pages/Materi";
import SimulasiPage from "./pages/Simulasi";
import QuizPage, { type Result } from "./pages/Quiz";
import HasilPage from "./pages/Hasil";
import GuruPage from "./pages/Guru";
import type { View } from "./lib/nav";
import {
  MATERI_PENCERNAAN,
  MATERI_PERNAPASAN,
  PETUNJUK,
} from "./data/materi";
import { DEFAULT_BANK, type Question } from "./data/questions";
import {
  addAttempt,
  evaluateBadges,
  loadOverride,
  loadProgress,
  saveProgress,
  type Progress as P,
} from "./lib/storage";

const NAV: { view: View; label: string; icon: string }[] = [
  { view: "dashboard", label: "Beranda", icon: "home" },
  { view: "materi", label: "Materi", icon: "book" },
  { view: "quiz", label: "Latihan A-STS", icon: "quiz" },
  { view: "simulasi", label: "Simulasi", icon: "flask" },
  { view: "hasil", label: "Hasil Saya", icon: "chart" },
  { view: "petunjuk", label: "Petunjuk", icon: "help" },
];

const ALL_READ_IDS = [...MATERI_PENCERNAAN, ...MATERI_PERNAPASAN].map((s) => s.id);

const TITLES: Record<View, string> = {
  landing: "Beranda",
  dashboard: "Dasbor Siswa",
  materi: "Materi Pembelajaran",
  simulasi: "Simulasi Interaktif",
  quiz: "Latihan A-STS",
  hasil: "Hasil Belajar",
  guru: "Mode Guru",
  petunjuk: "Petunjuk Aplikasi",
};

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [payload, setPayload] = useState<any>(null);
  const [progress, setProgressState] = useState<P>(() => loadProgress());
  const [bank, setBank] = useState<Question[]>(() => loadOverride<Question[]>() ?? DEFAULT_BANK);
  const [drawer, setDrawer] = useState(false);
  const firstRun = useRef(true);

  const totalRead = MATERI_PENCERNAAN.length + MATERI_PERNAPASAN.length;

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    saveProgress(progress);
  }, [progress]);

  const setProgress = (p: P) => setProgressState(p);

  const go = (v: View, p?: any) => {
    // rekam hasil ketika berpindah ke halaman hasil
    if (v === "hasil" && p?.result) {
      const res: Result = p.result;
      let next: P = addAttempt(progress, {
        id: `${Date.now()}`,
        date: res.date,
        mode: res.mode,
        category: res.categoryLabel,
        total: res.items.length,
        correct: res.correct,
        wrong: res.wrong,
        blank: res.blank,
        score: res.score,
        duration: res.duration,
        wrongIds: res.wrongIds,
        weak: res.weak,
      });
      next = { ...next, badges: evaluateBadges(next, ALL_READ_IDS) };
      setProgressState(next);
    }
    setPayload(p ?? null);
    setView(v);
    setDrawer(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
  };

  const toggleSound = () => setProgressState({ ...progress, sound: !progress.sound });

  const toggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    } catch {
      /* browser menolak layar penuh */
    }
  };

  const activeBank = useMemo(() => bank.filter((q) => q.active), [bank]);

  if (view === "landing") {
    return <Landing go={go} />;
  }

  const sideProps = { go };

  return (
    <div className="min-h-screen bg-wash">
      {/* ============ SIDEBAR ============ */}
      <aside
        className={`no-print fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col bg-ink transition-transform duration-300 lg:translate-x-0 ${
          drawer ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-5">
          <LogoMark size={36} />
          <div className="leading-none">
            <div className="display text-[13.5px] font-extrabold text-white">MEDICAL SCIENCE</div>
            <div className="display text-[13.5px] font-extrabold text-white">QUIZ</div>
            <div className="mt-1.5 text-[9.5px] font-bold tracking-[0.16em] text-toska">WAH OFFICIAL</div>
          </div>
          <button className="ml-auto text-white/60 lg:hidden" onClick={() => setDrawer(false)} aria-label="Tutup menu">
            <Icon name="x" size={20} />
          </button>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3" aria-label="Navigasi aplikasi">
          {NAV.map((n) => {
            const on = view === n.view || (n.view === "materi" && view === "materi");
            return (
              <button
                key={n.view}
                onClick={() => go(n.view)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[14.5px] font-bold transition-all duration-200 ${
                  on ? "bg-toska text-white shadow-[0_5px_0_0_#0b807e]" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                aria-current={on ? "page" : undefined}
              >
                <Icon name={n.icon} size={19} />
                {n.label}
              </button>
            );
          })}
        </nav>

        <div className="px-3 pb-3">
          <button
            onClick={() => go("guru")}
            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-[14px] font-bold transition-all duration-200 ${
              view === "guru" ? "border-toska bg-toska text-white" : "border-white/20 text-white/75 hover:border-toska hover:text-white"
            }`}
          >
            <Icon name="teacher" size={18} />
            Mode Guru
          </button>
        </div>
        <div className="border-t border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white">
              <Icon name="user" size={17} />
            </div>
            <div className="min-w-0">
              <div className="truncate text-[13px] font-extrabold text-white">{progress.name}</div>
              <div className="text-[10.5px] font-semibold text-white/50">Kelas VI SD · Fase C</div>
            </div>
          </div>
        </div>
      </aside>

      {drawer && <div className="fixed inset-0 z-40 bg-ink/50 lg:hidden" onClick={() => setDrawer(false)} aria-hidden />}

      {/* ============ KONTEN ============ */}
      <div className="print:pl-0 lg:pl-[248px]">
        <header className="no-print sticky top-0 z-30 border-b border-lightblue bg-white/92 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button className="grid h-10 w-10 place-items-center rounded-xl border-2 border-lightblue text-ink lg:hidden" onClick={() => setDrawer(true)} aria-label="Buka menu">
              <Icon name="menu" size={20} />
            </button>
            <div className="min-w-0">
              <Micro className="text-toska-deep">MEDICAL SCIENCE QUIZ</Micro>
              <div className="truncate text-[15px] font-extrabold text-ink">{TITLES[view]}</div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Chip tone="mint" >
                <span className="hidden sm:inline">SDIT Insantama</span>
                <span className="sm:hidden">SDIT</span>
              </Chip>
              <button
                onClick={toggleSound}
                className={`grid h-10 w-10 place-items-center rounded-xl border-2 transition-colors duration-200 ${
                  progress.sound ? "border-toska bg-mint text-toska-deep" : "border-lightblue text-slate-tint"
                }`}
                aria-pressed={progress.sound}
                aria-label={progress.sound ? "Matikan suara" : "Nyalakan suara"}
                title={progress.sound ? "Suara aktif" : "Suara nonaktif"}
              >
                <Icon name={progress.sound ? "sound" : "mute"} size={19} />
              </button>
              <button
                onClick={toggleFullscreen}
                className="hidden h-10 w-10 place-items-center rounded-xl border-2 border-lightblue text-slate-tint transition-colors duration-200 hover:border-med sm:grid"
                aria-label="Layar penuh"
                title="Layar penuh"
              >
                <Icon name="full" size={19} />
              </button>
              <Button size="sm" variant="ghost" icon="home" onClick={() => go("landing")} className="hidden sm:inline-flex">
                Beranda
              </Button>
            </div>
          </div>
        </header>

        <main className="print-full px-4 py-6 sm:px-6 lg:px-8">
          <div key={view + String(payload?.key ?? "")} className="anim-in mx-auto max-w-[1240px]">
            {view === "dashboard" && (
              <Dashboard {...sideProps} progress={progress} setProgress={setProgress} totalRead={totalRead} bankSize={activeBank.length} />
            )}
            {view === "materi" && <MateriPage {...sideProps} payload={payload} progress={progress} setProgress={setProgress} />}
            {view === "simulasi" && <SimulasiPage {...sideProps} payload={payload} />}
            {view === "quiz" && <QuizPage {...sideProps} payload={payload} bank={activeBank} progress={progress} sound={progress.sound} />}
            {view === "hasil" && <HasilPage {...sideProps} payload={payload} progress={progress} />}
            {view === "guru" && <GuruPage {...sideProps} bank={bank} setBank={setBank} progress={progress} />}
            {view === "petunjuk" && <Petunjuk {...sideProps} />}
          </div>
        </main>

        <footer className="no-print border-t border-lightblue bg-white px-4 py-6 text-center text-[12.5px] font-semibold text-slate-tint sm:px-6">
          MEDICAL SCIENCE QUIZ · Latihan A-STS IPAS Kelas VI SD — WAH Official · Kreator: Wiyanto Abu Hanif · SDIT Insantama
        </footer>
      </div>
    </div>
  );
}

/* ============ Halaman petunjuk ============ */
function Petunjuk({ go }: { go: (v: View, p?: any) => void }) {
  return (
    <div className="space-y-6">
      <div className="paper-grid rounded-3xl border border-lightblue bg-white px-5 py-6 sm:px-7">
        <Micro className="text-toska-deep">Petunjuk penggunaan</Micro>
        <h2 className="display mt-1.5 text-[clamp(1.5rem,3.2vw,2.2rem)] font-extrabold text-ink">
          Cara memakai aplikasi ini dengan baik
        </h2>
        <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-slate-tint">
          Bacalah petunjuk berikut sebelum mulai latihan agar belajarmu lebih terarah dan hasilnya tersimpan dengan baik.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {PETUNJUK.map((sec, i) => (
          <section key={sec.title} className="rounded-2xl border border-lightblue bg-white p-5 shadow-[0_10px_30px_-24px_rgba(11,74,143,.55)]">
            <div className="flex items-center gap-3">
              <span className="display tnum text-3xl font-extrabold text-lightblue">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display text-lg font-extrabold text-ink">{sec.title}</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {sec.items.map((it) => (
                <li key={it} className="flex gap-2.5 text-[14.5px] leading-relaxed text-slate-tint">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-toska" />
                  {it}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="rounded-2xl bg-ink px-5 py-5 sm:px-6">
        <Micro className="text-toska">Nilai yang diingatkan</Micro>
        <p className="mt-2 max-w-3xl text-[15px] font-semibold leading-relaxed text-white/80">
          Bersyukur kepada Allah atas nikmat tubuh, menjaga kesehatan sebagai bentuk tanggung jawab, disiplin menjaga pola
          makan, menghindari asap rokok, menjaga kebersihan lingkungan, bersungguh-sungguh belajar, tidak mudah menyerah, dan
          jujur saat mengerjakan kuis.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" icon="book" onClick={() => go("materi")}>
            Mulai dari materi
          </Button>
          <Button size="sm" variant="outline" icon="quiz" onClick={() => go("quiz")}>
            Langsung latihan
          </Button>
        </div>
      </div>
    </div>
  );
}
