// Penyimpanan progres siswa (localStorage) + util lain.
// Aplikasi berjalan tanpa backend; semua data disimpan di perangkat siswa.

export type Attempt = {
  id: string;
  date: string;
  mode: "latihan" | "sts";
  category: string;
  total: number;
  correct: number;
  wrong: number;
  blank: number;
  score: number;
  duration: number, // detik
  wrongIds: (string | number)[];
  weak: string[];
};

export type Progress = {
  name: string;
  read: string[]; // id pokok materi yang sudah dibaca
  attempts: Attempt[];
  badges: string[];
  sound: boolean;
  lastScore: number | null;
};

const KEY = "msq_progress_v1";
const BANK_KEY = "msq_bank_override_v1";
const SESSION_KEY = "msq_session_v1";

export const emptyProgress: Progress = {
  name: "Siswa",
  read: [],
  attempts: [],
  badges: [],
  sound: true,
  lastScore: null,
};

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...emptyProgress };
    const p = JSON.parse(raw) as Progress;
    return { ...emptyProgress, ...p, read: p.read ?? [], attempts: p.attempts ?? [], badges: p.badges ?? [] };
  } catch {
    return { ...emptyProgress };
  }
}

export function saveProgress(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* penyimpanan tidak tersedia — aplikasi tetap berjalan */
  }
}

export function loadOverride<T>(): T | null {
  try {
    const raw = localStorage.getItem(BANK_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function saveOverride<T>(data: T | null) {
  try {
    if (data === null) localStorage.removeItem(BANK_KEY);
    else localStorage.setItem(BANK_KEY, JSON.stringify(data));
  } catch {
    /* abaikan */
  }
}

export function saveSession(s: unknown) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
  } catch {
    /* abaikan */
  }
}
export function loadSession<T>(): T | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
export function clearSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* abaikan */
  }
}

export const BADGES: { id: string; name: string; desc: string; color: string }[] = [
  { id: "penjelajah", name: "Penjelajah Pencernaan", desc: "Membaca seluruh materi sistem pencernaan", color: "#f5921e" },
  { id: "ahli", name: "Ahli Pernapasan", desc: "Nilai kuis sistem pernapasan minimal 80", color: "#0fa3a0" },
  { id: "pejuang", name: "Pejuang A-STS", desc: "Menyelesaikan 5 kali latihan", color: "#1976d2" },
  { id: "dokter", name: "Dokter Cilik", desc: "Mendapat nilai sempurna pada satu latihan", color: "#0b4a8f" },
];

export function evaluateBadges(p: Progress, allRead: string[]): string[] {
  const got = new Set(p.badges);
  if (allRead.length > 0 && allRead.every((id) => p.read.includes(id))) got.add("penjelajah");
  const ok = p.attempts.some((a) => a.category.includes("Pernapasan") && a.score >= 80);
  if (ok) got.add("ahli");
  if (p.attempts.length >= 5) got.add("pejuang");
  if (p.attempts.some((a) => a.score === 100)) got.add("dokter");
  return [...got];
}

export function addAttempt(p: Progress, a: Attempt): Progress {
  const next: Progress = { ...p, attempts: [a, ...p.attempts].slice(0, 40), lastScore: a.score };
  return next;
}

/* ---------- suara efek (Web Audio, tanpa file) ---------- */
let ctx: AudioContext | null = null;
function tone(freq: number, dur: number, type: OscillatorType = "sine", delay = 0, gain = 0.05) {
  try {
    if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  } catch {
    /* audio tidak tersedia */
  }
}
export function playCorrect() {
  tone(660, 0.14, "sine");
  tone(880, 0.2, "sine", 0.1);
}
export function playWrong() {
  tone(320, 0.16, "triangle");
  tone(240, 0.22, "triangle", 0.1);
}
export function playTap() {
  tone(520, 0.06, "sine", 0, 0.03);
}
export function playDone() {
  [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.2, "sine", i * 0.11, 0.045));
}

/* ---------- passcode guru (disimpan sebagai ringkasan, bukan teks polos) ---------- */
export function hashPass(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
  return "wah" + (h >>> 0).toString(36);
}
export const TEACHER_PASS_HASH = hashPass("wahipas");
export const TEACHER_PASS_HINT = "Passcode demo bawaan: wahipas (ganti pada pengaturan).";

/* ---------- format ---------- */
export const fmtTime = (s: number) => {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
};

export const categoryOf = (score: number) =>
  score >= 90
    ? { label: "Sangat Baik", color: "#0b4a8f", msg: "Hebat! Terus pertahankan semangat belajarmu." }
    : score >= 80
      ? { label: "Baik", color: "#0fa3a0", msg: "Bagus! Pelajari kembali beberapa materi agar semakin memahami." }
      : score >= 70
        ? { label: "Cukup", color: "#f5921e", msg: "Ayo ulangi latihan dan tingkatkan hasil belajarmu." }
        : { label: "Perlu Latihan Kembali", color: "#d93b3b", msg: "Jangan menyerah. Kesalahan adalah kesempatan untuk belajar." };
