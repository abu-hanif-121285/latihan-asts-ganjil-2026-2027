import type { DiagramKey } from "../data/questions";

/* Diagram anatomi bergaya papan ilmu sekolah: garis tipis, label bernomor.
   Digambar sebagai SVG agar label dan arah panah selalu benar. */

const INK = "#0e2a47";
const BLUE = "#1976d2";
const DEEP = "#0b4a8f";
const TOSKA = "#0fa3a0";
const CORAL = "#f2807d";
const ROSE = "#f6a6a1";
const MINT = "#d7f2ea";
const LIGHT = "#dcebf7";

function Leader({ n, x, y, tx, ty, color = DEEP }: { n: string; x: number; y: number; tx: number; ty: number; color?: string }) {
  return (
    <g>
      <line x1={x} y1={y} x2={tx} y2={ty} stroke={color} strokeWidth="1.6" strokeDasharray="4 3" />
      <circle cx={x} cy={y} r="4" fill={color} />
      <circle cx={tx} cy={ty} r="12" fill={color} />
      <text x={tx} y={ty + 4.6} textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff" fontFamily="Plus Jakarta Sans, sans-serif">
        {n}
      </text>
    </g>
  );
}

/* ---------- 1. Sistem pencernaan bernomor ---------- */
export function DiagramPencernaan() {
  return (
    <svg viewBox="0 0 340 420" className="h-full w-full" role="img" aria-label="Diagram sistem pencernaan manusia dengan lima organ bernomor">
      <rect width="340" height="420" rx="18" fill="#f7fbfe" />
      <g opacity=".55" stroke={LIGHT}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={i} x1="0" y1={i * 52 + 12} x2="340" y2={i * 52 + 12} />
        ))}
      </g>
      {/* siluet tubuh */}
      <path
        d="M170 34c26 0 42 17 42 40 0 15-7 25-15 32 22 7 38 22 42 46l14 92c3 20-9 34-27 36-16 2-29-9-32-26l-8-46c-2-12-4-22-16-22s-14 10-16 22l-8 46c-3 17-16 28-32 26-18-2-30-16-27-36l14-92c4-24 20-39 42-46-8-7-15-17-15-32 0-23 16-40 42-40Z"
        fill={MINT}
        stroke={INK}
        strokeWidth="2.4"
      />
      {/* mulut */}
      <path d="M160 74c6 6 14 6 20 0" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* kerongkongan */}
      <path d="M170 86v78" stroke={CORAL} strokeWidth="13" strokeLinecap="round" />
      {/* lambung */}
      <path
        d="M170 164c14 0 26 10 26 26 0 20-14 30-28 34-16 5-30-4-32-20-3-20 12-34 26-36 4-1 6-4 8-4Z"
        fill={ROSE}
        stroke={INK}
        strokeWidth="2.4"
      />
      {/* usus halus (lipatan) */}
      <path
        d="M150 232c-22 4-30 20-16 30 12 9 34 2 36 14 2 12-24 14-30 26-6 13 10 22 26 18 16-4 30-14 44-8 14 6 26-4 22-18-4-13-24-12-28-24-4-11 14-18 10-30-4-11-24-12-34-8"
        fill="none"
        stroke={CORAL}
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* usus besar (bingkai) */}
      <path
        d="M124 224c-16 4-22 22-22 46v40c0 18 12 30 30 30h76c18 0 30-12 30-30v-40c0-24-6-42-22-46"
        fill="none"
        stroke="#e06666"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path d="M186 340v26" stroke="#e06666" strokeWidth="11" strokeLinecap="round" />
      <Leader n="1" x={172} y={74} tx={278} ty={62} />
      <Leader n="2" x={170} y={122} tx={286} ty={124} />
      <Leader n="3" x={176} y={190} tx={288} ty={196} />
      <Leader n="4" x={166} y={264} tx={62} ty={268} />
      <Leader n="5" x={112} y={300} tx={44} ty={196} />
      <g fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12.5" fontWeight="700" fill={INK}>
        <text x="296" y="66" textAnchor="start">Mulut</text>
        <text x="296" y="128" textAnchor="start">Kerongkongan</text>
        <text x="296" y="200" textAnchor="start">Lambung</text>
        <text x="8" y="272" textAnchor="start">Usus halus</text>
        <text x="8" y="200" textAnchor="start">Usus besar</text>
      </g>
    </svg>
  );
}

/* ---------- 2. Jalur pernapasan berlabel A–D ---------- */
export function DiagramJalurUdara() {
  return (
    <svg viewBox="0 0 360 400" className="h-full w-full" role="img" aria-label="Diagram jalur pernapasan: A hidung, B trakea, C bronkus, D alveolus">
      <rect width="360" height="400" rx="18" fill="#f7fbfe" />
      <g opacity=".55" stroke={LIGHT}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={i} x1="0" y1={i * 50 + 14} x2="360" y2={i * 50 + 14} />
        ))}
      </g>
      {/* kepala profil */}
      <path d="M148 30c30 0 52 20 52 48 0 16-8 27-16 34l-10 8v18h-56V44c0-8 12-14 30-14Z" fill={MINT} stroke={INK} strokeWidth="2.4" />
      {/* hidung */}
      <path d="M196 66c10 6 14 14 8 20-5 5-14 6-22 4" fill="none" stroke={TOSKA} strokeWidth="5" strokeLinecap="round" />
      {/* faring-laring-trakea */}
      <path d="M170 106v42" stroke={TOSKA} strokeWidth="14" strokeLinecap="round" />
      <path d="M170 148v34" stroke={BLUE} strokeWidth="16" strokeLinecap="round" />
      {/* cincin trakea */}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="162" y1={156 + i * 9} x2="178" y2={156 + i * 9} stroke="#ffffff" strokeWidth="2.4" />
      ))}
      {/* bronkus */}
      <path d="M170 182c-14 8-24 20-30 34" stroke={BLUE} strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M170 182c14 8 24 20 30 34" stroke={BLUE} strokeWidth="12" fill="none" strokeLinecap="round" />
      {/* bronkiolus */}
      <path d="M140 216c-8 8-12 18-14 26M200 216c8 8 12 18 14 26M140 216c2 10 8 16 14 20M200 216c-2 10-8 16-14 20" stroke={BLUE} strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* paru-paru */}
      <path d="M146 200c-30 6-52 34-58 76-4 30 6 52 30 54 22 2 36-16 40-46 4-30 2-62-12-84Z" fill={ROSE} stroke={INK} strokeWidth="2.4" />
      <path d="M194 200c30 6 52 34 58 76 4 30-6 52-30 54-22 2-36-16-40-46-4-30-2-62 12-84Z" fill={ROSE} stroke={INK} strokeWidth="2.4" />
      {/* alveolus detail */}
      <g>
        <circle cx="232" cy="300" r="9" fill={TOSKA} stroke={INK} strokeWidth="2" />
        <circle cx="248" cy="288" r="7" fill={TOSKA} stroke={INK} strokeWidth="2" />
        <circle cx="246" cy="310" r="7.5" fill={TOSKA} stroke={INK} strokeWidth="2" />
        <circle cx="120" cy="300" r="8" fill={TOSKA} stroke={INK} strokeWidth="2" />
        <circle cx="106" cy="288" r="6.5" fill={TOSKA} stroke={INK} strokeWidth="2" />
      </g>
      {/* diafragma */}
      <path d="M64 342c30-22 76-30 116-30s86 8 116 30" fill="none" stroke={DEEP} strokeWidth="7" strokeLinecap="round" />
      <Leader n="A" x={200} y={70} tx={310} ty={54} color={TOSKA} />
      <Leader n="B" x={178} y={168} tx={312} ty={150} color={DEEP} />
      <Leader n="C" x={204} y={222} tx={316} ty={238} color={BLUE} />
      <Leader n="D" x={246} y={310} tx={320} ty={330} color={TOSKA} />
      <g fontFamily="Plus Jakarta Sans, sans-serif" fontSize="13" fontWeight="800" fill={INK}>
        <text x="272" y="58">Hidung</text>
        <text x="274" y="154">Trakea</text>
        <text x="278" y="242">Bronkus</text>
        <text x="282" y="334">Alveolus</text>
      </g>
      <text x="24" y="382" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12" fontWeight="700" fill={DEEP}>
        Hidung → Faring → Laring → Trakea → Bronkus → Bronkiolus → Alveolus
      </text>
    </svg>
  );
}

/* ---------- 3. Inspirasi vs Ekspirasi (dua panel) ---------- */
function ChestPanel({ mode, title, id }: { mode: "in" | "out"; title: string; id: string }) {
  const inS = mode === "in";
  const chest = inS ? 78 : 64;
  const diaY = inS ? 214 : 196;
  const lungScale = inS ? 1 : 0.84;
  const stroke = inS ? TOSKA : "#f5921e";
  return (
    <g>
      <rect x="6" y="6" width="164" height="300" rx="16" fill="#f7fbfe" stroke={LIGHT} strokeWidth="2" />
      <text x="88" y="34" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize="17" fontWeight="800" fill={INK}>
        {title}
      </text>
      {/* panah udara */}
      {inS ? (
        <g>
          <path d="M88 46v34" stroke={stroke} strokeWidth="6" strokeLinecap="round" markerEnd="" />
          <path d="M80 74l8 12 8-12" fill={stroke} />
        </g>
      ) : (
        <g>
          <path d="M88 82V48" stroke={stroke} strokeWidth="6" strokeLinecap="round" />
          <path d="M80 56l8-12 8 12" fill={stroke} />
        </g>
      )}
      {/* rongga dada */}
      <path
        d={`M${88 - chest / 2} 196c0-${chest / 1.6} ${chest / 3}-${chest} ${chest / 2}-${chest}s${chest / 2} ${chest / 3.2} ${chest / 2} ${chest}Z`}
        transform={`translate(0,0)`}
        fill={LIGHT}
        stroke={INK}
        strokeWidth="2.4"
        style={{ transition: "all .5s ease" }}
      />
      {/* paru-paru */}
      <g style={{ transition: "transform .5s ease", transformOrigin: "88px 170px", transform: `scale(${lungScale})` }}>
        <path d="M80 132c-16 4-26 22-28 44-2 16 4 26 16 26 11 0 17-10 19-24 2-16 1-36-7-46Z" fill={ROSE} stroke={INK} strokeWidth="2" />
        <path d="M96 132c16 4 26 22 28 44 2 16-4 26-16 26-11 0-17-10-19-24-2-16-1-36 7-46Z" fill={ROSE} stroke={INK} strokeWidth="2" />
      </g>
      <path d="M88 112v22" stroke={BLUE} strokeWidth="9" strokeLinecap="round" />
      {/* diafragma */}
      <path
        d={`M26 ${diaY}c22 ${inS ? 4 : -26} 114 ${inS ? 4 : -26} 136 0`}
        fill="none"
        stroke={stroke}
        strokeWidth="8"
        strokeLinecap="round"
        style={{ transition: "all .5s ease" }}
      />
      <text x="88" y="248" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12.5" fontWeight="700" fill={INK}>
        {inS ? "Diafragma mendatar" : "Diafragma melengkung"}
      </text>
      <text x="88" y="270" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12.5" fontWeight="700" fill={inS ? TOSKA : "#b96a05"}>
        {inS ? "Rongga dada membesar" : "Rongga dada mengecil"}
      </text>
      <text x="88" y="292" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12.5" fontWeight="700" fill={INK}>
        {inS ? "Udara MASUK" : "Udara KELUAR"}
      </text>
      <title>{id}</title>
    </g>
  );
}

export function DiagramInspExp() {
  return (
    <svg viewBox="0 0 340 312" className="h-full w-full" role="img" aria-label="Panel A inspirasi dan panel B ekspirasi">
      <title>Perbandingan inspirasi dan ekspirasi</title>
      <g transform="translate(6,0)">
        <ChestPanel mode="in" title="Gambar A" id="Inspirasi" />
      </g>
      <g transform="translate(172,0)">
        <ChestPanel mode="out" title="Gambar B" id="Ekspirasi" />
      </g>
    </svg>
  );
}

/* ---------- 4. Kondisi diafragma X dan Y ---------- */
export function DiagramDiafragma() {
  return (
    <svg viewBox="0 0 340 300" className="h-full w-full" role="img" aria-label="Kondisi X diafragma mendatar dan kondisi Y diafragma melengkung ke atas">
      <title>Perbandingan kondisi diafragma</title>
      {[
        { label: "Kondisi X", flat: true, x: 6 },
        { label: "Kondisi Y", flat: false, x: 172 },
      ].map((p) => (
        <g key={p.label} transform={`translate(${p.x},0)`}>
          <rect x="0" y="4" width="162" height="292" rx="16" fill="#f7fbfe" stroke={LIGHT} strokeWidth="2" />
          <text x="81" y="34" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize="17" fontWeight="800" fill={INK}>
            {p.label}
          </text>
          {/* rongga dada */}
          <path
            d={`M${p.flat ? 14 : 26} 190C${p.flat ? 14 : 26} ${p.flat ? 110 : 126} ${p.flat ? 46 : 54} 82 81 82s${p.flat ? 67 : 55} ${p.flat ? 28 : 44} ${p.flat ? 67 : 55} ${p.flat ? 108 : 108}Z`}
            transform={`translate(${p.flat ? 0 : 0},0)`}
            fill={LIGHT}
            stroke={INK}
            strokeWidth="2.4"
          />
          <g transform={`translate(${p.flat ? 0 : 0},0) scale(${p.flat ? 1 : 0.86}) translate(${p.flat ? 0 : 12},${p.flat ? 0 : 26})`}>
            <path d="M73 120c-16 4-26 22-28 44-2 16 4 26 16 26 11 0 17-10 19-24 2-16 1-36-7-46Z" fill={ROSE} stroke={INK} strokeWidth="2" />
            <path d="M89 120c16 4 26 22 28 44 2 16-4 26-16 26-11 0-17-10-19-24-2-16-1-36 7-46Z" fill={ROSE} stroke={INK} strokeWidth="2" />
          </g>
          {/* diafragma */}
          <path
            d={p.flat ? "M18 200c22 6 104 6 126 0" : "M18 206c22-30 104-30 126 0"}
            fill="none"
            stroke={p.flat ? TOSKA : "#f5921e"}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <g fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12.5" fontWeight="700" fill={INK}>
            <text x="81" y="234" textAnchor="middle">{p.flat ? "Diafragma mendatar" : "Diafragma ke atas"}</text>
            <text x="81" y="256" textAnchor="middle">{p.flat ? "Rongga dada lebih besar" : "Rongga dada lebih kecil"}</text>
            <text x="81" y="278" textAnchor="middle">{p.flat ? "Paru-paru mengembang" : "Paru-paru mengempis"}</text>
          </g>
        </g>
      ))}
    </svg>
  );
}

export function Diagram({ k }: { k: DiagramKey }) {
  if (k === "pencernaan") return <DiagramPencernaan />;
  if (k === "jalur-udara") return <DiagramJalurUdara />;
  if (k === "insp-exp") return <DiagramInspExp />;
  return <DiagramDiafragma />;
}

/* ============ Dada bergerak untuk simulasi inspirasi/ekspirasi ============ */
export function ChestBreath({ phase }: { phase: "in" | "out" }) {
  const isIn = phase === "in";
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full" role="img" aria-label={isIn ? "Dada membesar, diafragma ke bawah, udara masuk" : "Dada mengecil, diafragma ke atas, udara keluar"}>
      <rect width="300" height="300" rx="20" fill="#f7fbfe" />
      {/* siluet tubuh */}
      <path d="M150 24c26 0 44 16 44 40v10h-88v-10c0-24 18-40 44-40Z" fill={MINT} stroke={INK} strokeWidth="2.4" />
      {/* rongga dada berubah ukuran */}
      <path
        d={`M${isIn ? 46 : 66} 208c0-${isIn ? 118 : 100} ${isIn ? 40 : 32}-${isIn ? 156 : 140} ${isIn ? 104 : 84}-${isIn ? 156 : 140}s${isIn ? 104 : 84} ${isIn ? 38 : 40} ${isIn ? 104 : 84} ${isIn ? 156 : 140}Z`}
        transform="translate(0,30)"
        fill={LIGHT}
        stroke={INK}
        strokeWidth="2.6"
        style={{ transition: "all .6s cubic-bezier(.4,0,.2,1)" }}
      />
      {/* trakea */}
      <path d="M150 74v34" stroke={BLUE} strokeWidth="11" strokeLinecap="round" />
      <path d="M150 108c-16 8-26 20-32 34M150 108c16 8 26 20 32 34" stroke={BLUE} strokeWidth="9" fill="none" strokeLinecap="round" />
      {/* paru-paru */}
      <g
        style={{
          transition: "transform .6s cubic-bezier(.4,0,.2,1)",
          transformOrigin: "150px 170px",
          transform: `scale(${isIn ? 1.08 : 0.82})`,
        }}
      >
        <path d="M140 138c-30 6-52 34-56 74-3 28 8 46 30 46 20 0 32-16 36-44 4-28 2-58-10-76Z" fill={ROSE} stroke={INK} strokeWidth="2.4" />
        <path d="M160 138c30 6 52 34 56 74 3 28-8 46-30 46-20 0-32-16-36-44-4-28-2-58 10-76Z" fill={ROSE} stroke={INK} strokeWidth="2.4" />
        <g fill="#ffffff" opacity=".85">
          <circle cx="112" cy="222" r="7" />
          <circle cx="126" cy="234" r="6" />
          <circle cx="188" cy="222" r="7" />
          <circle cx="174" cy="234" r="6" />
        </g>
      </g>
      {/* diafragma */}
      <path
        d={isIn ? "M50 246c30 12 170 12 200 0" : "M50 250c30-42 170-42 200 0"}
        fill="none"
        stroke={isIn ? TOSKA : "#f5921e"}
        strokeWidth="9"
        strokeLinecap="round"
        style={{ transition: "d .6s cubic-bezier(.4,0,.2,1)" }}
      />
      {/* panah udara */}
      <g style={{ transition: "opacity .4s" }}>
        {isIn ? (
          <>
            <path d="M150 8v26" stroke={TOSKA} strokeWidth="6" strokeLinecap="round" />
            <path d="M142 28l8 12 8-12" fill={TOSKA} />
          </>
        ) : (
          <>
            <path d="M150 34V8" stroke="#f5921e" strokeWidth="6" strokeLinecap="round" />
            <path d="M142 16l8-12 8 12" fill="#f5921e" />
          </>
        )}
      </g>
      <text x="150" y="286" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="14" fontWeight="800" fill={INK}>
        {isIn ? "INSPIRASI — udara masuk" : "EKSPIRASI — udara keluar"}
      </text>
    </svg>
  );
}

/* ============ Alur udara beranimasi (simulasi 2) ============ */
export function AirwayFlow({ stage }: { stage: number }) {
  const nodes = [
    { x: 60, y: 44 },
    { x: 60, y: 96 },
    { x: 60, y: 142 },
    { x: 60, y: 200 },
    { x: 60, y: 254 },
    { x: 60, y: 302 },
    { x: 60, y: 352 },
  ];
  const names = ["Hidung", "Faring", "Laring", "Trakea", "Bronkus", "Bronkiolus", "Alveolus"];
  return (
    <svg viewBox="0 0 420 400" className="h-full w-full" role="img" aria-label="Animasi perjalanan udara dari hidung sampai alveolus">
      <rect width="420" height="400" rx="20" fill="#f7fbfe" />
      {/* paru-paru sebagai latar */}
      <path d="M230 150c-46 12-80 56-86 122-4 44 12 74 48 74 32 0 52-26 58-70 8-52 4-100-20-126Z" fill={ROSE} opacity=".5" stroke={INK} strokeWidth="2.4" />
      <path d="M270 150c46 12 80 56 86 122 4 44-12 74-48 74-32 0-52-26-58-70-8-52-4-100 20-126Z" fill={ROSE} opacity=".5" stroke={INK} strokeWidth="2.4" />
      {/* jalur */}
      <path d="M60 44v308" stroke={LIGHT} strokeWidth="14" strokeLinecap="round" />
      <path d="M60 254c0 30 40 46 100 56" stroke={LIGHT} strokeWidth="12" fill="none" strokeLinecap="round" />
      <path
        d="M60 44v308"
        stroke={TOSKA}
        strokeWidth="6"
        strokeLinecap="round"
        className="dash-flow"
        opacity=".65"
      />
      {nodes.map((n, i) => {
        const on = i <= stage;
        return (
          <g key={names[i]}>
            <circle cx={n.x} cy={n.y} r="13" fill={on ? TOSKA : "#ffffff"} stroke={on ? TOSKA : LIGHT} strokeWidth="3" style={{ transition: "all .3s" }} />
            <text x={n.x} y={n.y + 4.6} textAnchor="middle" fontSize="12" fontWeight="800" fill={on ? "#fff" : "#33506b"} fontFamily="Plus Jakarta Sans, sans-serif">
              {i + 1}
            </text>
            <text x={n.x + 26} y={n.y + 5} fontFamily="Plus Jakarta Sans, sans-serif" fontSize="16" fontWeight={on ? 800 : 600} fill={on ? INK : "#8aa4bd"}>
              {names[i]}
            </text>
          </g>
        );
      })}
      {/* titik udara bergerak */}
      <circle
        cx={nodes[Math.max(0, stage)].x}
        cy={nodes[Math.max(0, stage)].y}
        r="20"
        fill={TOSKA}
        opacity=".22"
        style={{ transition: "cx .55s linear, cy .55s linear" }}
      />
      <circle
        cx={nodes[Math.max(0, stage)].x}
        cy={nodes[Math.max(0, stage)].y}
        r="7"
        fill="#ffffff"
        stroke={TOSKA}
        strokeWidth="3"
        style={{ transition: "cx .55s linear, cy .55s linear" }}
      />
      <text x="240" y="374" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="13" fontWeight="800" fill={DEEP}>
        Oksigen → darah → seluruh tubuh
      </text>
    </svg>
  );
}
