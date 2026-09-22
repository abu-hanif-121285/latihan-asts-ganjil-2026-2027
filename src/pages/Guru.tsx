import { useMemo, useState } from "react";
import { Button, Card, Chip, Icon, Micro } from "../components/ui";
import type { NavProps } from "../lib/nav";
import {
  DEFAULT_BANK,
  LABEL,
  validateBank,
  type Issue,
  type Question,
} from "../data/questions";
import { TEACHER_PASS_HASH, TEACHER_PASS_HINT, hashPass, saveOverride, type Progress as P } from "../lib/storage";

type Filter = {
  q: string;
  type: "all" | "dasar" | "HOTS";
  stim: "all" | "image" | "table" | "case" | "none";
  level: "all" | "C4" | "C5" | "C6";
  cat: "all" | "Sistem Pencernaan" | "Sistem Pernapasan";
  diff: "all" | "Mudah" | "Sedang" | "Sulit";
  status: "all" | "active" | "off";
};

const blankForm = (): Question => ({
  id: "",
  category: "Sistem Pencernaan",
  questionType: "dasar",
  question: "",
  options: ["", "", "", ""],
  correctAnswer: 0,
  explanation: "",
  materi: "",
  indicator: "",
  cognitiveLevel: undefined,
  difficulty: "Mudah",
  active: true,
});

export default function Guru({
  go,
  bank,
  setBank,
  progress,
}: NavProps & { bank: Question[]; setBank: (b: Question[]) => void; progress: P }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("msq_teacher") === "1");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<"bank" | "recap" | "validasi">("bank");
  const [form, setForm] = useState<Question | null>(null);
  const [importText, setImportText] = useState("");
  const [msg, setMsg] = useState("");

  const [f, setF] = useState<Filter>({ q: "", type: "all", stim: "all", level: "all", cat: "all", diff: "all", status: "all" });

  const issues: Issue[] = useMemo(() => validateBank(bank), [bank]);

  const filtered = useMemo(
    () =>
      bank.filter((q) => {
        if (f.q && !(`${q.question} ${q.materi} ${q.category}`.toLowerCase().includes(f.q.toLowerCase()))) return false;
        if (f.type !== "all" && q.questionType !== f.type) return false;
        if (f.stim === "none" && q.stimulus) return false;
        if (f.stim !== "all" && f.stim !== "none" && q.stimulusType !== f.stim) return false;
        if (f.level !== "all" && q.cognitiveLevel !== f.level) return false;
        if (f.cat !== "all" && q.category !== f.cat) return false;
        if (f.diff !== "all" && q.difficulty !== f.diff) return false;
        if (f.status === "active" && !q.active) return false;
        if (f.status === "off" && q.active) return false;
        return true;
      }),
    [bank, f]
  );

  if (!authed) {
    return (
      <div className="mx-auto max-w-md py-10">
        <Card className="overflow-hidden">
          <div className="bg-ink px-6 py-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-toska text-white">
              <Icon name="teacher" size={26} />
            </div>
            <h2 className="display mt-4 text-2xl font-extrabold text-white">Mode Guru</h2>
            <p className="mt-1 text-sm text-white/70">Kelola bank soal MEDICAL SCIENCE QUIZ</p>
          </div>
          <div className="p-6">
            <label className="micro text-slate-tint" htmlFor="pass">
              Passcode guru
            </label>
            <input
              id="pass"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkPass()}
              className="mt-2 w-full rounded-xl border-2 border-lightblue px-4 py-3 font-bold text-ink outline-none focus:border-toska"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {err && <p className="mt-2 text-sm font-bold text-danger">{err}</p>}
            <Button className="mt-4 w-full" icon="shield" onClick={checkPass}>
              Masuk mode guru
            </Button>
            <p className="mt-3 text-center text-[12px] leading-relaxed text-slate-tint">{TEACHER_PASS_HINT}</p>
            <Button variant="ghost" size="sm" className="mt-2 w-full" onClick={() => go("landing")}>
              Kembali ke beranda
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  function checkPass() {
    if (hashPass(pass) === TEACHER_PASS_HASH) {
      sessionStorage.setItem("msq_teacher", "1");
      setAuthed(true);
      setErr("");
    } else {
      setErr("Passcode salah. Silakan coba lagi.");
    }
  }

  const persist = (next: Question[]) => {
    setBank(next);
    saveOverride(next);
  };

  const saveForm = () => {
    if (!form) return;
    const q: Question = { ...form, id: form.id === "" ? `GURU-${Date.now().toString().slice(-6)}` : form.id };
    if (!q.question.trim() || q.options.some((o) => !o.trim()) || !q.explanation.trim()) {
      setMsg("Soal belum lengkap: teks soal, 4 pilihan, dan pembahasan wajib diisi.");
      return;
    }
    const exists = bank.some((x) => String(x.id) === String(q.id));
    persist(exists ? bank.map((x) => (String(x.id) === String(q.id) ? q : x)) : [q, ...bank]);
    setForm(null);
    setMsg(exists ? `Soal ${q.id} diperbarui.` : `Soal ${q.id} ditambahkan.`);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(bank, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `bank-soal-medical-science-quiz.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    setMsg("Bank soal diekspor sebagai berkas JSON.");
  };

  const importJSON = () => {
    try {
      const data = JSON.parse(importText);
      if (!Array.isArray(data)) throw new Error("bukan array");
      const ok = data.filter((q: Question) => q && q.question && Array.isArray(q.options) && q.options.length === 4);
      if (!ok.length) throw new Error("tidak ada soal valid");
      persist([...ok, ...bank]);
      setImportText("");
      setMsg(`${ok.length} soal berhasil diimpor.`);
    } catch {
      setMsg("Impor gagal: pastikan format JSON berupa daftar soal.");
    }
  };

  const stats = {
    dasar: bank.filter((q) => q.questionType === "dasar").length,
    hots: bank.filter((q) => q.questionType === "HOTS").length,
    image: bank.filter((q) => q.stimulusType === "image").length,
    table: bank.filter((q) => q.stimulusType === "table").length,
    case: bank.filter((q) => q.stimulusType === "case").length,
    c4: bank.filter((q) => q.cognitiveLevel === "C4").length,
    c5: bank.filter((q) => q.cognitiveLevel === "C5").length,
    c6: bank.filter((q) => q.cognitiveLevel === "C6").length,
    explained: Math.round((bank.filter((q) => q.explanation?.trim()).length / Math.max(1, bank.length)) * 100),
    active: bank.filter((q) => q.active).length,
  };

  const selects: [keyof Filter, string, string[]][] = [
    ["type", "Jenis soal", ["all", "dasar", "HOTS"]],
    ["stim", "Stimulus", ["all", "image", "table", "case", "none"]],
    ["level", "Level kognitif", ["all", "C4", "C5", "C6"]],
    ["cat", "Materi", ["all", "Sistem Pencernaan", "Sistem Pernapasan"]],
    ["diff", "Tingkat kesulitan", ["all", "Mudah", "Sedang", "Sulit"]],
    ["status", "Status", ["all", "active", "off"]],
  ];

  return (
    <div className="space-y-6">
      {/* header */}
      <Card className="flex flex-wrap items-center gap-4 p-5">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-white">
          <Icon name="teacher" size={24} />
        </div>
        <div className="min-w-0 flex-1">
          <Micro className="text-toska-deep">Mode Guru / Admin</Micro>
          <h2 className="display text-2xl font-extrabold text-ink">Bank Soal & Rekap</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" icon="plus" onClick={() => { setForm(blankForm()); setMsg(""); }}>
            Tambah soal
          </Button>
          <Button size="sm" variant="outline" icon="up" onClick={exportJSON}>
            Ekspor JSON
          </Button>
          <Button
            size="sm"
            variant="ghost"
            icon="refresh"
            onClick={() => {
              if (confirm("Kembalikan bank soal ke bawaan aplikasi? Perubahanmu akan dihapus.")) {
                persist(DEFAULT_BANK);
                setMsg("Bank soal dikembalikan ke bawaan.");
              }
            }}
          >
            Reset bank
          </Button>
          <Button
            size="sm"
            variant="navy"
            icon="x"
            onClick={() => {
              sessionStorage.removeItem("msq_teacher");
              setAuthed(false);
              go("landing");
            }}
          >
            Keluar
          </Button>
        </div>
      </Card>

      {/* tab */}
      <div className="flex flex-wrap gap-2">
        {([
          ["bank", "Semua Soal", "book"],
          ["recap", "Rekap", "chart"],
          ["validasi", `Validasi Soal (${issues.filter((i) => i.level === "error").length} error)`, "shield"],
        ] as const).map(([id, label, icon]) => (
          <button
            key={id}
            onClick={() => setTab(id as any)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold transition-all duration-200 ${
              tab === id ? "bg-ink text-white" : "border-2 border-lightblue bg-white text-slate-tint hover:border-med"
            }`}
          >
            <Icon name={icon} size={16} />
            {label}
          </button>
        ))}
      </div>

      {msg && (
        <div className="anim-in flex items-center gap-2 rounded-xl bg-mint px-4 py-3 text-sm font-bold text-toska-deep">
          <Icon name="check" size={17} /> {msg}
        </div>
      )}

      {/* ============ BANK SOAL ============ */}
      {tab === "bank" && (
        <>
          <Card className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[220px] flex-1">
                <Icon name="search" size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-tint" />
                <input
                  value={f.q}
                  onChange={(e) => setF({ ...f, q: e.target.value })}
                  placeholder="Cari soal atau pokok materi..."
                  className="w-full rounded-xl border-2 border-lightblue py-2.5 pl-10 pr-3 text-sm font-semibold text-ink outline-none focus:border-toska"
                  aria-label="Cari soal"
                />
              </div>
              {selects.map(([key, label, opts]) => (
                <select
                  key={key}
                  value={f[key] as string}
                  onChange={(e) => setF({ ...f, [key]: e.target.value })}
                  className="rounded-xl border-2 border-lightblue bg-white px-3 py-2.5 text-[13px] font-bold text-ink outline-none focus:border-toska"
                  aria-label={label}
                >
                  {opts.map((o) => (
                    <option key={o} value={o}>
                      {o === "all" ? `Semua ${label}` : o === "none" ? "Tanpa stimulus" : o === "active" ? "Aktif" : o === "off" ? "Nonaktif" : o}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-ink text-white">
                  <tr>
                    {["No", "Soal", "Materi", "Jenis", "Tingkat", "Status", "Aksi"].map((h) => (
                      <th key={h} className="px-4 py-3 text-[11px] uppercase tracking-[0.1em]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((q, i) => (
                    <tr key={String(q.id)} className={`border-t border-lightblue ${q.active ? "" : "opacity-55"}`}>
                      <td className="tnum px-4 py-3 font-extrabold text-slate-tint">{i + 1}</td>
                      <td className="max-w-[340px] px-4 py-3">
                        <div className="line-clamp-2 font-bold text-ink">{q.question}</div>
                        <div className="mt-1 text-[11px] font-semibold text-slate-tint">
                          Kunci: {LABEL(q.correctAnswer)} · {q.options[q.correctAnswer]}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Chip tone="blue">{q.category.replace("Sistem ", "")}</Chip>
                      </td>
                      <td className="px-4 py-3">
                        <Chip tone={q.questionType === "HOTS" ? "red" : "grey"}>
                          {q.questionType === "HOTS" ? `HOTS · ${q.stimulusType}` : "Dasar"}
                        </Chip>
                      </td>
                      <td className="px-4 py-3">
                        <Chip tone={q.difficulty === "Mudah" ? "mint" : q.difficulty === "Sedang" ? "orange" : "red"}>{q.difficulty}</Chip>
                      </td>
                      <td className="px-4 py-3">
                        <Chip tone={q.active ? "mint" : "grey"}>{q.active ? "Aktif" : "Nonaktif"}</Chip>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => setForm({ ...q })}
                            className="grid h-8 w-8 place-items-center rounded-lg bg-lightblue text-med-deep transition-colors hover:bg-med hover:text-white"
                            aria-label={`Edit soal ${q.id}`}
                            title="Edit"
                          >
                            <Icon name="edit" size={15} />
                          </button>
                          <button
                            onClick={() => persist(bank.map((x) => (String(x.id) === String(q.id) ? { ...x, active: !x.active } : x)))}
                            className="grid h-8 w-8 place-items-center rounded-lg bg-wash-2 text-slate-tint transition-colors hover:bg-ink hover:text-white"
                            aria-label={`Ubah status soal ${q.id}`}
                            title="Aktif/nonaktif"
                          >
                            <Icon name={q.active ? "x" : "check"} size={15} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus soal ${q.id}?`)) persist(bank.filter((x) => String(x.id) !== String(q.id)));
                            }}
                            className="grid h-8 w-8 place-items-center rounded-lg bg-[#fde3e3] text-danger transition-colors hover:bg-danger hover:text-white"
                            aria-label={`Hapus soal ${q.id}`}
                            title="Hapus"
                          >
                            <Icon name="trash" size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-sm font-bold text-slate-tint">
                        Tidak ada soal yang cocok dengan filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="border-t border-lightblue bg-wash px-4 py-3 text-[12.5px] font-bold text-slate-tint">
              Menampilkan {filtered.length} dari {bank.length} soal
            </div>
          </Card>

          {/* impor */}
          <Card className="p-5">
            <Micro className="text-med">Impor soal (JSON)</Micro>
            <p className="mt-1.5 text-[13px] text-slate-tint">
              Tempel daftar soal berformat JSON. Setiap soal memerlukan <code>question</code>, <code>options[4]</code>,{" "}
              <code>correctAnswer</code>, dan <code>explanation</code>.
            </p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={5}
              placeholder='[{"id":"X-1","category":"Sistem Pencernaan","question":"...","options":["a","b","c","d"],"correctAnswer":0,"explanation":"...","difficulty":"Mudah","active":true}]'
              className="mt-3 w-full rounded-xl border-2 border-lightblue p-3 font-mono text-[12.5px] outline-none focus:border-toska"
            />
            <div className="mt-3 flex gap-2">
              <Button size="sm" icon="down" onClick={importJSON} disabled={!importText.trim()}>
                Impor soal
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setImportText("")}>
                Bersihkan
              </Button>
            </div>
          </Card>
        </>
      )}

      {/* ============ REKAP ============ */}
      {tab === "recap" && (
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <Card className="p-5">
            <Micro className="text-med">Rekap bank soal</Micro>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                ["Soal dasar", stats.dasar, "#1976d2"],
                ["Soal HOTS", stats.hots, "#d93b3b"],
                ["Stimulus gambar", stats.image, "#0fa3a0"],
                ["Stimulus tabel", stats.table, "#f5921e"],
                ["Stimulus kasus", stats.case, "#0b4a8f"],
                ["Level C4", stats.c4, "#1976d2"],
                ["Level C5", stats.c5, "#0fa3a0"],
                ["Level C6", stats.c6, "#f5921e"],
                ["Soal aktif", stats.active, "#0b4a8f"],
                ["Pembahasan tersedia", `${stats.explained}%`, "#33506b"],
              ].map(([l, v, c]) => (
                <div key={String(l)} className="rounded-2xl border-2 border-lightblue px-4 py-3">
                  <Micro className="text-slate-tint">{String(l)}</Micro>
                  <div className="display tnum mt-1 text-3xl font-extrabold" style={{ color: c as string }}>
                    {v as any}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-5">
            <Card className="p-5">
              <Micro className="text-med">Distribusi materi & kesulitan</Micro>
              <div className="mt-4 space-y-3 text-sm">
                {[
                  ["Sistem Pencernaan", bank.filter((q) => q.category === "Sistem Pencernaan").length, "#f5921e"],
                  ["Sistem Pernapasan", bank.filter((q) => q.category === "Sistem Pernapasan").length, "#0fa3a0"],
                ].map(([l, v, c]) => (
                  <div key={String(l)}>
                    <div className="mb-1 flex justify-between font-bold">
                      <span className="text-ink">{String(l)}</span>
                      <span className="tnum text-slate-tint">{v as number} soal</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-wash-2">
                      <div className="h-full rounded-full" style={{ width: `${((v as number) / Math.max(1, bank.length)) * 100}%`, background: c as string }} />
                    </div>
                  </div>
                ))}
                {["Mudah", "Sedang", "Sulit"].map((d, i) => {
                  const n = bank.filter((q) => q.difficulty === d).length;
                  const c = ["#0fa3a0", "#f5921e", "#d93b3b"][i];
                  return (
                    <div key={d}>
                      <div className="mb-1 flex justify-between font-bold">
                        <span className="text-ink">Kesulitan {d}</span>
                        <span className="tnum text-slate-tint">{n} soal</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-wash-2">
                        <div className="h-full rounded-full" style={{ width: `${(n / Math.max(1, bank.length)) * 100}%`, background: c }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-5">
              <Micro className="text-med">Rekap hasil latihan siswa</Micro>
              {progress.attempts.length === 0 ? (
                <p className="mt-3 text-sm font-semibold text-slate-tint">
                  Belum ada hasil latihan yang tersimpan di perangkat ini. Rekap otomatis tersedia ketika ada backend/pencvlian
                  data siswa.
                </p>
              ) : (
                <div className="mt-3 space-y-2 text-sm">
                  {progress.attempts.slice(0, 8).map((a) => (
                    <div key={a.id} className="flex items-center justify-between gap-3 border-b border-lightblue pb-2">
                      <span className="font-bold text-ink">
                        {a.category} · {a.total} soal
                      </span>
                      <span className="tnum font-extrabold" style={{ color: a.score >= 80 ? "#0fa3a0" : a.score >= 70 ? "#f5921e" : "#d93b3b" }}>
                        {a.score}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* ============ VALIDASI ============ */}
      {tab === "validasi" && (
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Micro className="text-med">Pemeriksaan kualitas otomatis</Micro>
              <h3 className="display mt-1 text-xl font-extrabold text-ink">
                {issues.filter((i) => i.level === "error").length} error · {issues.filter((i) => i.level === "warn").length} peringatan
              </h3>
            </div>
            <Chip tone={issues.some((i) => i.level === "error") ? "red" : "mint"}>
              {issues.some((i) => i.level === "error") ? "Perlu perbaikan" : "Bank soal lolos validasi"}
            </Chip>
          </div>

          <ul className="mt-4 space-y-2">
            {issues.length === 0 && (
              <li className="rounded-xl bg-mint px-4 py-3 text-sm font-bold text-toska-deep">
                Seluruh pemeriksaan lulus: jumlah soal, kelengkapan pilihan, kunci jawaban, pembahasan, dan stimulus HOTS.
              </li>
            )}
            {issues.map((is, i) => (
              <li
                key={i}
                className={`flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold ${is.level === "error" ? "bg-[#fde3e3] text-[#a72b2b]" : "bg-[#fdead6] text-[#b96a05]"}`}
              >
                <Icon name={is.level === "error" ? "x" : "help"} size={17} className="mt-0.5 shrink-0" />
                {is.msg}
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-xl bg-wash px-4 py-4 text-[13.5px] leading-relaxed text-slate-tint">
            <strong className="text-ink">Pemeriksaan manual yang disarankan:</strong> ejaan dan tata bahasa Indonesia, kesesuaian
            urutan organ pencernaan dan pernapasan, ketepatan istilah inspirasi dan ekspirasi, ketiadaan referensi resmi yang
            dibuat-buat, serta kesesuaian soal dengan tingkat kelas VI SD.
          </div>
        </Card>
      )}

      {/* ============ FORM SOAL ============ */}
      {form && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/60 p-4">
          <Card className="anim-pop mx-auto my-8 max-w-3xl">
            <div className="flex items-center justify-between border-b border-lightblue px-5 py-4">
              <div>
                <Micro className="text-toska-deep">{bank.some((x) => String(x.id) === String(form.id)) ? "Edit soal" : "Tambah soal baru"}</Micro>
                <h3 className="display text-xl font-extrabold text-ink">{form.id || "ID baru"}</h3>
              </div>
              <button onClick={() => setForm(null)} className="grid h-9 w-9 place-items-center rounded-lg bg-wash text-slate-tint hover:bg-lightblue" aria-label="Tutup">
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="text-sm font-bold text-ink">
                  Materi
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as Question["category"] })}
                    className="mt-1.5 w-full rounded-xl border-2 border-lightblue px-3 py-2.5 text-sm outline-none focus:border-toska"
                  >
                    <option>Sistem Pencernaan</option>
                    <option>Sistem Pernapasan</option>
                  </select>
                </label>
                <label className="text-sm font-bold text-ink">
                  Jenis soal
                  <select
                    value={form.questionType}
                    onChange={(e) => setForm({ ...form, questionType: e.target.value as Question["questionType"] })}
                    className="mt-1.5 w-full rounded-xl border-2 border-lightblue px-3 py-2.5 text-sm outline-none focus:border-toska"
                  >
                    <option value="dasar">Dasar</option>
                    <option value="HOTS">HOTS</option>
                  </select>
                </label>
                <label className="text-sm font-bold text-ink">
                  Tingkat kesulitan
                  <select
                    value={form.difficulty}
                    onChange={(e) => setForm({ ...form, difficulty: e.target.value as Question["difficulty"] })}
                    className="mt-1.5 w-full rounded-xl border-2 border-lightblue px-3 py-2.5 text-sm outline-none focus:border-toska"
                  >
                    <option>Mudah</option>
                    <option>Sedang</option>
                    <option>Sulit</option>
                  </select>
                </label>
              </div>

              <label className="block text-sm font-bold text-ink">
                Pokok materi
                <input
                  value={form.materi}
                  onChange={(e) => setForm({ ...form, materi: e.target.value })}
                  placeholder="mis. Fungsi lambung"
                  className="mt-1.5 w-full rounded-xl border-2 border-lightblue px-3 py-2.5 text-sm outline-none focus:border-toska"
                />
              </label>

              <label className="block text-sm font-bold text-ink">
                Teks soal
                <textarea
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  rows={3}
                  className="mt-1.5 w-full rounded-xl border-2 border-lightblue px-3 py-2.5 text-sm outline-none focus:border-toska"
                />
              </label>

              <div className="space-y-2">
                <div className="micro text-slate-tint">Pilihan jawaban (tandai kunci)</div>
                {form.options.map((o, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <button
                      onClick={() => setForm({ ...form, correctAnswer: i })}
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg text-sm font-extrabold transition-colors ${
                        form.correctAnswer === i ? "bg-toska text-white" : "bg-wash-2 text-slate-tint hover:bg-lightblue"
                      }`}
                      aria-label={`Jadikan ${LABEL(i)} sebagai kunci jawaban`}
                      aria-pressed={form.correctAnswer === i}
                    >
                      {LABEL(i)}
                    </button>
                    <input
                      value={o}
                      onChange={(e) => {
                        const options = [...form.options];
                        options[i] = e.target.value;
                        setForm({ ...form, options });
                      }}
                      className="w-full rounded-xl border-2 border-lightblue px-3 py-2.5 text-sm outline-none focus:border-toska"
                      placeholder={`Pilihan ${LABEL(i)}`}
                    />
                  </div>
                ))}
              </div>

              <label className="block text-sm font-bold text-ink">
                Pembahasan
                <textarea
                  value={form.explanation}
                  onChange={(e) => setForm({ ...form, explanation: e.target.value })}
                  rows={3}
                  className="mt-1.5 w-full rounded-xl border-2 border-lightblue px-3 py-2.5 text-sm outline-none focus:border-toska"
                />
              </label>

              {form.questionType === "HOTS" && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-sm font-bold text-ink">
                    Indikator
                    <input
                      value={form.indicator ?? ""}
                      onChange={(e) => setForm({ ...form, indicator: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border-2 border-lightblue px-3 py-2.5 text-sm outline-none focus:border-toska"
                    />
                  </label>
                  <label className="text-sm font-bold text-ink">
                    Level kognitif
                    <select
                      value={form.cognitiveLevel ?? "C4"}
                      onChange={(e) => setForm({ ...form, cognitiveLevel: e.target.value as Question["cognitiveLevel"] })}
                      className="mt-1.5 w-full rounded-xl border-2 border-lightblue px-3 py-2.5 text-sm outline-none focus:border-toska"
                    >
                      <option>C4</option>
                      <option>C5</option>
                      <option>C6</option>
                    </select>
                  </label>
                  <p className="text-[12.5px] font-semibold text-slate-tint sm:col-span-2">
                    Stimulus HOTS dikelola melalui berkas <code>src/data/questions.ts</code>; soal buatan guru ditampilkan tanpa
                    stimulus tambahan.
                  </p>
                </div>
              )}

              <label className="flex items-center gap-3 rounded-xl border-2 border-lightblue px-4 py-3">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="h-5 w-5 accent-[#0fa3a0]" />
                <span className="text-sm font-bold text-ink">Soal aktif (tampil pada kuis)</span>
              </label>
            </div>

            <div className="flex flex-wrap justify-end gap-2 border-t border-lightblue bg-wash/60 px-5 py-4">
              <Button variant="ghost" onClick={() => setForm(null)}>
                Batal
              </Button>
              <Button icon="check" onClick={saveForm}>
                Simpan soal
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
