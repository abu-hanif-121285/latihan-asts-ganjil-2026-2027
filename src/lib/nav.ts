export type View = "landing" | "dashboard" | "materi" | "simulasi" | "quiz" | "hasil" | "guru" | "petunjuk";

export type MateriKey = "pencernaan" | "pernapasan";

export type NavProps = {
  go: (v: View, payload?: any) => void;
};
