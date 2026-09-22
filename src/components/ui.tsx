import React from "react";

/* ============ Logo WAH Official (vektor, digambar tangan) ============ */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Logo WAH Official">
      <defs>
        <linearGradient id="wahg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1976d2" />
          <stop offset="100%" stopColor="#0b4a8f" />
        </linearGradient>
      </defs>
      <path
        d="M32 3.5c16.2 0 28.5 10.6 28.5 27.2S48.2 60.5 32 60.5 3.5 46.8 3.5 30.8 15.8 3.5 32 3.5Z"
        fill="url(#wahg)"
      />
      <path
        d="M32 8.6c13.4 0 23.4 8.6 23.4 22.2S45.4 55.4 32 55.4 8.6 46.4 8.6 30.8 18.6 8.6 32 8.6Z"
        fill="none"
        stroke="#0fa3a0"
        strokeWidth="2.4"
        opacity=".75"
      />
      <path
        d="M14 32.5h9.2l4.1-9.8 6 19.4 4.6-13.1 2.7 6.5H50"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="35.5" r="3.6" fill="#f5921e" />
    </svg>
  );
}

export function LogoLockup({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <LogoMark size={38} />
      <div className="leading-none">
        <div className={`display text-[15px] font-extrabold ${dark ? "text-white" : "text-ink"}`}>WAH OFFICIAL</div>
        <div className={`mt-1 text-[10px] font-semibold tracking-[0.18em] ${dark ? "text-toska" : "text-med"}`}>MEDICAL SCIENCE QUIZ</div>
      </div>
    </div>
  );
}

/* ============ Ikon ============ */
const PATHS: Record<string, string> = {
  home: "M3 11.2 12 4l9 7.2M5.5 9.8V20h13V9.8",
  book: "M4 5.2A2 2 0 0 1 6 3.2h13v14.6H6a2 2 0 0 0-2 2V5.2Zm0 0v14.6a2 2 0 0 0 2 2h13",
  quiz: "M5 3.6h11l3.4 3.4v13.4H5V3.6Z M8.6 12.4l2.2 2.2 4.4-4.6",
  flask: "M9.6 3.2v6L4.4 18.4A2 2 0 0 0 6.1 21.4h11.8a2 2 0 0 0 1.7-3L14.4 9.2v-6M8 3.2h8M7.2 14.6h9.6",
  chart: "M4 20V6.5M4 20h16M8 16.5v-5M12.4 16.5v-9M16.8 16.5v-3.4",
  help: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-2.4-11.4c.3-1.4 1.4-2.2 2.7-2.2 1.5 0 2.7 1 2.7 2.4 0 2-2.6 2.1-2.7 4M12 17.4h.01",
  teacher: "M3.6 6.4h16.8v10.2H3.6V6.4Zm4.6 13.2h11.2M8.4 16.6v3",
  check: "M4.8 12.6 9.6 17.4 19.4 6.6",
  x: "M6.4 6.4l11.2 11.2M17.6 6.4 6.4 17.6",
  flag: "M6 21V4.2m0 0h11.6l-2.4 4 2.4 4H6",
  arrowR: "M4.6 12h14.8m-6-6.4 6.4 6.4-6.4 6.4",
  arrowL: "M19.4 12H4.6m6-6.4L4.2 12l6.4 6.4",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14.4V12l3.6 2.2",
  sound: "M4.8 9.4h3.4L13 5.6v12.8l-4.8-3.8H4.8V9.4ZM16.4 9.2a4 4 0 0 1 0 5.6M18.8 6.8a7.4 7.4 0 0 1 0 10.4",
  mute: "M4.8 9.4h3.4L13 5.6v12.8l-4.8-3.8H4.8V9.4Zm11.6-.6 4 5.2m0-5.2-4 5.2",
  trophy: "M7.4 4h9.2v5a4.6 4.6 0 0 1-9.2 0V4Zm-3.8 1.4h3.8v3a3 3 0 0 1-3.8 2.8M20.4 5.4h-3.8v3a3 3 0 0 0 3.8 2.8M9.6 20h4.8M12 13.6V20",
  star: "m12 3.6 2.7 5.6 6.1.8-4.5 4.3 1.2 6.1L12 17.4l-5.5 3 1.2-6.1-4.5-4.3 6.1-.8L12 3.6Z",
  plus: "M12 5v14M5 12h14",
  edit: "M4.6 19.4h4l10-10-4-4-10 10v4Zm9.6-13.6 4 4",
  trash: "M4.8 6.8h14.4M9 6.8V4.6h6v2.2m-8.4 0 1 13.2h8.8l1-13.2",
  down: "M12 4.2v11.2m0 0 4.4-4.4M12 15.4l-4.4-4.4M4.6 19.6h14.8",
  up: "M12 15.4V4.2m0 0 4.4 4.4M12 4.2 7.6 8.6M4.6 19.6h14.8",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5.2-1.8 4 4",
  lungs:
    "M12 3.2v8.4M12 11.6c-1.6-3-3-4.4-4.6-4.4-1.9 0-3 1.5-3.4 3.4L3 17.4c-.4 2 .6 3.4 2.4 3.4 1.6 0 2.8-1 3.4-2.6.6-1.8.8-3.8.8-6.2M12 11.6c1.6-3 3-4.4 4.6-4.4 1.9 0 3 1.5 3.4 3.4l1 8.8c.4 2-.6 3.4-2.4 3.4-1.6 0-2.8-1-3.4-2.6-.6-1.8-.8-3.8-.8-6.2",
  stomach:
    "M8.6 3.4v5.2c0 4.6-3.2 6-3.2 9.6 0 2.4 1.8 4 4.4 4 3.4 0 5.6-2.4 5.6-6.2 0-3-1.6-4.4-1.6-7.4 0-2 1.4-3.4 3.6-3.4 1.6 0 2.8.8 3.4 2M8.6 3.4h4.6",
  drop: "M12 3.4c3.4 4 5.6 6.8 5.6 9.6a5.6 5.6 0 1 1-11.2 0c0-2.8 2.2-5.6 5.6-9.6Z",
  leaf: "M5 19C4 12 8.6 5.4 19.6 4.6c.6 8.4-3.4 14-10.4 14.2M5 19c2.6-4.6 6-7.4 10-9.4",
  print: "M7 8.4V3.6h10v4.8M7 17.6H4.6a1 1 0 0 1-1-1V9.4a1 1 0 0 1 1-1h14.8a1 1 0 0 1 1 1v7.2a1 1 0 0 1-1 1H17M7 14.2h10v6.2H7v-6.2Z",
  full: "M4 9.4V4h5.4M20 9.4V4h-5.4M4 14.6V20h5.4M20 14.6V20h-5.4",
  user: "M12 12.2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7.6 7.4a7.6 7.6 0 0 1 15.2 0",
  menu: "M4 7h16M4 12h16M4 17h16",
  refresh: "M20 12a8 8 0 1 1-2.6-5.9M20 4.2V10h-5.6",
  shield: "M12 3.4 5 6v6c0 4.2 3 7.4 7 8.6 4-1.2 7-4.4 7-8.6V6l-7-2.6Z",
};

export function Icon({ name, size = 20, className = "" }: { name: keyof typeof PATHS | string; size?: number; className?: string }) {
  const d = PATHS[name] ?? PATHS.help;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/* ============ Tombol ============ */
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline" | "navy" | "danger" | "accent";
  size?: "sm" | "md" | "lg";
  icon?: string;
};
export function Button({ variant = "primary", size = "md", icon, children, className = "", ...rest }: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 active:translate-y-px disabled:opacity-45 disabled:pointer-events-none select-none";
  const sizes = { sm: "px-3.5 py-2 text-[13px]", md: "px-5 py-3 text-sm", lg: "px-6 py-3.5 text-[15px]" }[size];
  const variants = {
    primary: "bg-toska text-white shadow-[0_6px_0_0_#0b807e] hover:brightness-110 hover:-translate-y-0.5 active:shadow-[0_2px_0_0_#0b807e]",
    navy: "bg-ink text-white shadow-[0_6px_0_0_#061a2e] hover:brightness-110 hover:-translate-y-0.5 active:shadow-[0_2px_0_0_#061a2e]",
    accent: "bg-accent text-ink shadow-[0_6px_0_0_#c96f0a] hover:brightness-105 hover:-translate-y-0.5",
    outline: "bg-white text-ink border-2 border-lightblue hover:border-med hover:text-med",
    ghost: "bg-transparent text-slate-tint hover:bg-lightblue",
    danger: "bg-danger text-white hover:brightness-110",
  }[variant];
  return (
    <button className={`${base} ${sizes} ${variants} ${className}`} {...rest}>
      {icon && <Icon name={icon} size={size === "sm" ? 15 : 17} />}
      {children}
    </button>
  );
}

/* ============ Komponen kecil ============ */
export function Chip({ tone = "blue", children }: { tone?: "blue" | "mint" | "orange" | "red" | "navy" | "grey"; children: React.ReactNode }) {
  const tones = {
    blue: "bg-lightblue text-med-deep",
    mint: "bg-mint text-toska-deep",
    orange: "bg-[#fdead6] text-[#b96a05]",
    red: "bg-[#fde3e3] text-[#a72b2b]",
    navy: "bg-ink text-white",
    grey: "bg-wash-2 text-slate-tint",
  }[tone];
  return <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold ${tones}`}>{children}</span>;
}

export function Card({ children, className = "", as: As = "div" }: { children: React.ReactNode; className?: string; as?: any }) {
  return <As className={`rounded-2xl border border-lightblue bg-white shadow-[0_10px_30px_-24px_rgba(11,74,143,.55)] ${className}`}>{children}</As>;
}

export function Micro({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`micro ${className}`} style={style}>
      {children}
    </div>
  );
}

export function Progress({ value, tone = "#0fa3a0", height = 10 }: { value: number; tone?: string; height?: number }) {
  return (
    <div className="w-full overflow-hidden rounded-full bg-wash-2" style={{ height }} role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}>
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out"
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: `linear-gradient(90deg, ${tone}, ${tone}cc)` }}
      />
    </div>
  );
}

export function Donut({ value, size = 168, stroke = 16, label }: { value: number; size?: number; stroke?: number; label?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (Math.max(0, Math.min(100, value)) / 100) * c;
  const color = value >= 90 ? "#0b4a8f" : value >= 80 ? "#0fa3a0" : value >= 70 ? "#f5921e" : "#d93b3b";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2f0f9" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(.22,.75,.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="display tnum text-[38px] font-extrabold text-ink">{Math.round(value)}</div>
        {label && <div className="micro mt-1 text-slate-tint">{label}</div>}
      </div>
    </div>
  );
}

export function Empty({ icon = "book", title, text }: { icon?: string; title: string; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-lightblue bg-white/70 px-6 py-14 text-center">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-lightblue text-med">
        <Icon name={icon} size={26} />
      </div>
      <div className="display text-lg font-extrabold text-ink">{title}</div>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-tint">{text}</p>
    </div>
  );
}
