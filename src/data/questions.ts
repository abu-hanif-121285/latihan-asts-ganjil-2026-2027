// Bank soal MEDICAL SCIENCE QUIZ
// 30 soal dasar + 15 soal HOTS berbasis stimulus = 45 soal.

export type DiagramKey = "pencernaan" | "jalur-udara" | "insp-exp" | "diafragma";

export type StimulusPanel = {
  kind: "image" | "diagram";
  src?: string;
  diagram?: DiagramKey;
  caption: string;
  alt: string;
};

export type Stimulus =
  | { type: "image"; title: string; lead?: string; panels: StimulusPanel[] }
  | { type: "table"; title: string; lead?: string; note?: string; columns: string[]; rows: string[][] }
  | { type: "case"; title: string; lead?: string; lines: string[] };

export type Question = {
  id: string | number;
  category: "Sistem Pencernaan" | "Sistem Pernapasan";
  questionType: "dasar" | "HOTS";
  stimulusType?: "image" | "table" | "case";
  stimulusTitle?: string;
  stimulus?: Stimulus;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  materi: string;
  indicator?: string;
  cognitiveLevel?: "C4" | "C5" | "C6";
  difficulty: "Mudah" | "Sedang" | "Sulit";
  active: boolean;
};

const D = "Sistem Pencernaan";
const R = "Sistem Pernapasan";

const dasar: Question[] = [
  {
    id: 1, category: D, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Organ pencernaan",
    question: "Organ pertama yang dilalui makanan dalam sistem pencernaan manusia adalah ....",
    options: ["Lambung", "Mulut", "Usus halus", "Kerongkongan"],
    correctAnswer: 1,
    explanation: "Mulut merupakan tempat pertama masuknya makanan. Di dalam mulut, makanan dikunyah oleh gigi dan bercampur dengan air liur.",
  },
  {
    id: 2, category: D, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Pencernaan mekanik",
    question: "Fungsi utama gigi dalam proses pencernaan adalah ....",
    options: ["Menyerap sari-sari makanan", "Menghasilkan empedu", "Mengunyah dan menghancurkan makanan", "Menyerap air dari sisa makanan"],
    correctAnswer: 2,
    explanation: "Gigi melakukan pencernaan mekanik dengan memotong, merobek, dan menghaluskan makanan agar lebih mudah ditelan dan dicerna.",
  },
  {
    id: 3, category: D, questionType: "dasar", active: true, difficulty: "Sedang",
    materi: "Kelenjar ludah",
    question: "Air liur membantu proses pencernaan karena ....",
    options: [
      "Menghancurkan seluruh makanan di lambung",
      "Membasahi makanan dan membantu memulai pencernaan zat tepung",
      "Menyerap sari-sari makanan ke dalam darah",
      "Mengeluarkan sisa makanan dari tubuh",
    ],
    correctAnswer: 1,
    explanation: "Air liur membasahi makanan dan mengandung enzim yang membantu memulai pencernaan karbohidrat atau zat tepung.",
  },
  {
    id: 4, category: D, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Jalur makanan",
    question: "Makanan dari mulut menuju lambung melalui ....",
    options: ["Trakea", "Bronkus", "Kerongkongan", "Usus besar"],
    correctAnswer: 2,
    explanation: "Kerongkongan atau esofagus merupakan saluran yang menghubungkan faring dengan lambung. Makanan didorong menuju lambung melalui gerakan peristaltik.",
  },
  {
    id: 5, category: D, questionType: "dasar", active: true, difficulty: "Sedang",
    materi: "Kerongkongan",
    question: "Gerakan meremas dan mendorong makanan di dalam kerongkongan disebut ....",
    options: ["Gerakan refleks mata", "Gerakan peristaltik", "Gerakan inspirasi", "Gerakan difusi"],
    correctAnswer: 1,
    explanation: "Gerakan peristaltik adalah gerakan berirama otot dinding saluran pencernaan untuk mendorong makanan.",
  },
  {
    id: 6, category: D, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Fungsi lambung",
    question: "Organ yang berfungsi mengaduk makanan dan mencampurnya dengan cairan lambung adalah ....",
    options: ["Lambung", "Usus besar", "Anus", "Hidung"],
    correctAnswer: 0,
    explanation: "Lambung mengaduk makanan dan mencampurnya dengan cairan lambung. Proses ini membantu pencernaan makanan, terutama protein.",
  },
  {
    id: 7, category: D, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Usus halus",
    question: "Sebagian besar penyerapan sari-sari makanan terjadi di ....",
    options: ["Mulut", "Usus halus", "Kerongkongan", "Anus"],
    correctAnswer: 1,
    explanation: "Usus halus merupakan tempat utama penyerapan zat gizi hasil pencernaan ke dalam aliran darah atau sistem pengangkutan zat gizi.",
  },
  {
    id: 8, category: D, questionType: "dasar", active: true, difficulty: "Sedang",
    materi: "Usus besar",
    question: "Fungsi utama usus besar adalah ....",
    options: [
      "Mengunyah makanan",
      "Menyerap sebagian air dan membentuk sisa makanan menjadi feses",
      "Memasukkan oksigen ke dalam darah",
      "Menghasilkan air liur",
    ],
    correctAnswer: 1,
    explanation: "Usus besar menyerap sebagian air dan membantu membentuk serta menampung sisa makanan sebelum dikeluarkan sebagai feses.",
  },
  {
    id: 9, category: D, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Jalur pencernaan",
    question: "Urutan perjalanan makanan yang benar adalah ....",
    options: [
      "Mulut → Lambung → Kerongkongan → Usus halus",
      "Mulut → Kerongkongan → Lambung → Usus halus",
      "Mulut → Usus besar → Lambung → Anus",
      "Mulut → Trakea → Lambung → Usus halus",
    ],
    correctAnswer: 1,
    explanation: "Makanan melewati mulut, faring, kerongkongan, lambung, usus halus, usus besar, rektum, dan anus.",
  },
  {
    id: 10, category: D, questionType: "dasar", active: true, difficulty: "Sedang",
    materi: "Jenis pencernaan",
    question: "Pencernaan mekanik adalah proses ....",
    options: [
      "Mengubah makanan dengan bantuan gerakan fisik",
      "Mengubah oksigen menjadi karbon dioksida",
      "Menyerap air di dalam paru-paru",
      "Mengeluarkan udara dari hidung",
    ],
    correctAnswer: 0,
    explanation: "Pencernaan mekanik adalah penghancuran makanan secara fisik, misalnya melalui kegiatan mengunyah oleh gigi dan pengadukan makanan di lambung.",
  },
  {
    id: 11, category: D, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Pencernaan kimiawi",
    question: "Pencernaan kimiawi melibatkan ....",
    options: ["Gerakan kaki", "Enzim dan cairan pencernaan", "Gerakan paru-paru", "Tulang dan sendi"],
    correctAnswer: 1,
    explanation: "Pencernaan kimiawi menguraikan zat makanan menjadi bentuk yang lebih sederhana dengan bantuan enzim dan cairan pencernaan.",
  },
  {
    id: 12, category: D, questionType: "dasar", active: true, difficulty: "Sedang",
    materi: "Organ pendukung pencernaan",
    question: "Organ yang menghasilkan empedu adalah ....",
    options: ["Hati", "Lambung", "Usus besar", "Kerongkongan"],
    correctAnswer: 0,
    explanation: "Hati menghasilkan cairan empedu yang membantu proses pencernaan lemak. Empedu disimpan di kantung empedu.",
  },
  {
    id: 13, category: D, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Kesehatan pencernaan",
    question: "Kebiasaan yang dapat membantu menjaga kesehatan sistem pencernaan adalah ....",
    options: ["Jarang minum air putih", "Tidak pernah makan sayur", "Mengonsumsi makanan berserat dan cukup air", "Selalu menunda buang air besar"],
    correctAnswer: 2,
    explanation: "Makanan berserat, air yang cukup, aktivitas fisik, dan kebiasaan buang air besar yang baik dapat membantu menjaga kesehatan sistem pencernaan.",
  },
  {
    id: 14, category: D, questionType: "dasar", active: true, difficulty: "Sedang",
    materi: "Gangguan pencernaan",
    question: "Raka jarang makan sayur dan kurang minum air putih. Ia mengalami kesulitan buang air besar. Kemungkinan penyebabnya adalah ....",
    options: ["Kekurangan serat dan cairan", "Terlalu banyak oksigen", "Paru-parunya mengembang", "Darah tidak mengandung sel"],
    correctAnswer: 0,
    explanation: "Kurangnya serat dan cairan dapat menyebabkan feses menjadi lebih keras sehingga seseorang mengalami kesulitan buang air besar atau sembelit.",
  },
  {
    id: 15, category: D, questionType: "dasar", active: true, difficulty: "Sedang",
    materi: "Proses di mulut",
    question: "Mengapa makanan perlu dikunyah dengan baik sebelum ditelan?",
    options: [
      "Agar makanan langsung masuk ke paru-paru",
      "Agar makanan lebih kecil dan mudah bercampur dengan air liur",
      "Agar lambung tidak bekerja sama sekali",
      "Agar makanan tidak melewati kerongkongan",
    ],
    correctAnswer: 1,
    explanation: "Mengunyah memperkecil ukuran makanan dan mencampurnya dengan air liur sehingga makanan lebih mudah ditelan dan dicerna.",
  },
  {
    id: 16, category: R, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Fungsi pernapasan",
    question: "Fungsi utama sistem pernapasan manusia adalah ....",
    options: ["Mengolah makanan menjadi feses", "Mengambil oksigen dan mengeluarkan karbon dioksida", "Menghasilkan tulang", "Mengedarkan makanan di dalam lambung"],
    correctAnswer: 1,
    explanation: "Sistem pernapasan mengambil oksigen dari udara dan mengeluarkan karbon dioksida sebagai salah satu hasil metabolisme tubuh.",
  },
  {
    id: 17, category: R, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Hidung",
    question: "Organ yang menjadi tempat masuknya udara pertama kali pada pernapasan normal adalah ....",
    options: ["Hidung", "Lambung", "Usus halus", "Jantung"],
    correctAnswer: 0,
    explanation: "Pada pernapasan melalui hidung, udara masuk melalui lubang hidung. Hidung membantu menyaring, menghangatkan, dan melembapkan udara.",
  },
  {
    id: 18, category: R, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Fungsi hidung",
    question: "Rambut hidung dan lendir berfungsi untuk ....",
    options: ["Menyaring sebagian debu dan kotoran dari udara", "Menghancurkan makanan", "Menghasilkan empedu", "Menyerap sari makanan"],
    correctAnswer: 0,
    explanation: "Rambut hidung dan lendir membantu menangkap sebagian debu serta partikel asing yang masuk bersama udara.",
  },
  {
    id: 19, category: R, questionType: "dasar", active: true, difficulty: "Sedang",
    materi: "Jalur pernapasan",
    question: "Urutan jalur udara yang benar adalah ....",
    options: [
      "Hidung → Lambung → Usus → Paru-paru",
      "Hidung → Faring → Laring → Trakea → Bronkus → Bronkiolus → Alveolus",
      "Hidung → Kerongkongan → Lambung → Alveolus",
      "Hidung → Usus besar → Trakea → Paru-paru",
    ],
    correctAnswer: 1,
    explanation: "Udara masuk melalui hidung, kemudian melewati faring, laring, trakea, bronkus, bronkiolus, dan akhirnya mencapai alveolus.",
  },
  {
    id: 20, category: R, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Organ pernapasan",
    question: "Batang tenggorok dalam sistem pernapasan disebut ....",
    options: ["Esofagus", "Trakea", "Alveolus", "Diafragma"],
    correctAnswer: 1,
    explanation: "Trakea atau batang tenggorok merupakan saluran udara yang menghubungkan laring dengan bronkus.",
  },
  {
    id: 21, category: R, questionType: "dasar", active: true, difficulty: "Sedang",
    materi: "Alveolus",
    question: "Pertukaran oksigen dan karbon dioksida terutama terjadi di ....",
    options: ["Alveolus", "Hidung", "Laring", "Trakea"],
    correctAnswer: 0,
    explanation: "Alveolus memiliki dinding yang tipis dan dikelilingi kapiler darah sehingga menjadi tempat pertukaran gas antara udara dan darah.",
  },
  {
    id: 22, category: R, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Inspirasi",
    question: "Saat inspirasi, udara ....",
    options: ["Keluar dari paru-paru", "Masuk ke dalam paru-paru", "Masuk ke usus halus", "Tidak bergerak sama sekali"],
    correctAnswer: 1,
    explanation: "Inspirasi adalah proses masuknya udara ke dalam paru-paru. Pada pernapasan normal, volume rongga dada bertambah sehingga udara masuk.",
  },
  {
    id: 23, category: R, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Ekspirasi",
    question: "Saat ekspirasi, udara ....",
    options: ["Masuk ke paru-paru", "Keluar dari paru-paru", "Masuk ke usus halus", "Berubah menjadi makanan"],
    correctAnswer: 1,
    explanation: "Ekspirasi adalah proses keluarnya udara dari paru-paru. Pada pernapasan normal, volume rongga dada berkurang sehingga udara terdorong keluar.",
  },
  {
    id: 24, category: R, questionType: "dasar", active: true, difficulty: "Sedang",
    materi: "Pernapasan diafragma",
    question: "Pada inspirasi pernapasan perut, diafragma umumnya ....",
    options: ["Berkontraksi dan bergerak ke bawah", "Berkontraksi dan bergerak ke atas", "Tidak mengalami perubahan", "Berubah menjadi tulang"],
    correctAnswer: 0,
    explanation: "Ketika inspirasi, diafragma berkontraksi dan mendatar atau bergerak ke bawah. Volume rongga dada bertambah sehingga udara masuk ke paru-paru.",
  },
  {
    id: 25, category: R, questionType: "dasar", active: true, difficulty: "Sedang",
    materi: "Ekspirasi",
    question: "Pada ekspirasi normal, diafragma umumnya ....",
    options: ["Berkontraksi dan mendatar", "Relaksasi dan kembali melengkung ke atas", "Bergerak menuju hidung", "Tidak berhubungan dengan pernapasan"],
    correctAnswer: 1,
    explanation: "Saat ekspirasi normal, diafragma mengalami relaksasi dan kembali melengkung ke atas. Volume rongga dada berkurang dan udara keluar dari paru-paru.",
  },
  {
    id: 26, category: R, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Pernapasan dada",
    question: "Pernapasan dada terutama melibatkan kerja ....",
    options: ["Otot antartulang rusuk", "Otot lambung", "Otot usus besar", "Otot lidah saja"],
    correctAnswer: 0,
    explanation: "Pernapasan dada terutama melibatkan otot antartulang rusuk yang membantu mengubah ukuran rongga dada.",
  },
  {
    id: 27, category: R, questionType: "dasar", active: true, difficulty: "Sedang",
    materi: "Mekanisme pernapasan",
    question: "Perhatikan pernyataan berikut: (1) Udara masuk ke paru-paru. (2) Rongga dada membesar. (3) Diafragma berkontraksi dan bergerak ke bawah. Pernyataan tersebut menggambarkan proses ....",
    options: ["Ekspirasi", "Inspirasi", "Pencernaan", "Penyerapan makanan"],
    correctAnswer: 1,
    explanation: "Ketiga pernyataan tersebut merupakan ciri umum inspirasi atau proses masuknya udara ke dalam paru-paru.",
  },
  {
    id: 28, category: R, questionType: "dasar", active: true, difficulty: "Sedang",
    materi: "Pernapasan dan aktivitas",
    question: "Ketika seseorang berlari, frekuensi pernapasannya biasanya meningkat karena ....",
    options: [
      "Tubuh membutuhkan lebih banyak oksigen dan menghasilkan lebih banyak karbon dioksida",
      "Lambung berhenti bekerja",
      "Tulang berubah menjadi otot",
      "Hidung tidak lagi berfungsi",
    ],
    correctAnswer: 0,
    explanation: "Saat beraktivitas fisik, otot membutuhkan lebih banyak energi. Tubuh meningkatkan frekuensi pernapasan untuk memenuhi kebutuhan oksigen dan membantu mengeluarkan karbon dioksida.",
  },
  {
    id: 29, category: R, questionType: "dasar", active: true, difficulty: "Mudah",
    materi: "Kesehatan pernapasan",
    question: "Kebiasaan yang baik untuk menjaga kesehatan sistem pernapasan adalah ....",
    options: [
      "Menghirup asap rokok",
      "Berolahraga secara teratur dan menghindari asap rokok",
      "Membakar sampah di ruangan tertutup",
      "Tidak pernah membersihkan lingkungan",
    ],
    correctAnswer: 1,
    explanation: "Olahraga yang sesuai, menghindari asap rokok, menjaga kebersihan, dan mengurangi paparan polusi dapat membantu menjaga kesehatan sistem pernapasan.",
  },
  {
    id: 30, category: R, questionType: "dasar", active: true, difficulty: "Sedang",
    materi: "Kesehatan sistem pernapasan",
    question: "Dina berada di ruangan yang penuh asap. Ia merasa batuk dan sulit bernapas. Tindakan yang tepat adalah ....",
    options: [
      "Tetap berada di ruangan tersebut",
      "Mendekatkan wajah ke sumber asap",
      "Menjauh dari sumber asap dan mencari udara yang lebih bersih",
      "Menahan napas selama mungkin",
    ],
    correctAnswer: 2,
    explanation: "Asap dapat mengganggu sistem pernapasan. Dina sebaiknya menjauh dari sumber asap, mencari tempat dengan udara lebih bersih, dan meminta bantuan orang dewasa jika mengalami kesulitan bernapas.",
  },
];

const hots: Question[] = [
  {
    id: "HOTS-GAMBAR-001", category: D, questionType: "HOTS", stimulusType: "image", active: true,
    difficulty: "Sulit", cognitiveLevel: "C4", indicator: "Menganalisis urutan organ dan fungsi sistem pencernaan.",
    materi: "Jalur pencernaan",
    stimulusTitle: "Diagram jalur sistem pencernaan",
    stimulus: {
      type: "image",
      lead: "Amati gambar sistem pencernaan manusia berikut. Angka pada gambar menunjukkan urutan organ yang dilalui makanan.",
      title: "Diagram jalur sistem pencernaan",
      panels: [
        {
          kind: "diagram", diagram: "pencernaan",
          caption: "1 Mulut · 2 Kerongkongan · 3 Lambung · 4 Usus halus · 5 Usus besar",
          alt: "Diagram sistem pencernaan manusia dengan lima organ bernomor: 1 mulut, 2 kerongkongan, 3 lambung, 4 usus halus, 5 usus besar.",
        },
      ],
    },
    question: "Seorang siswa mengatakan bahwa makanan dari lambung langsung menuju usus besar untuk diserap sari-sari makanannya. Berdasarkan gambar dan pengetahuan tentang sistem pencernaan, penilaian yang paling tepat adalah ....",
    options: [
      "Benar, karena usus besar merupakan tempat utama penyerapan sari-sari makanan",
      "Salah, karena makanan dari lambung menuju usus halus sebelum sisa makanan masuk ke usus besar",
      "Benar, karena lambung terhubung langsung dengan usus besar",
      "Salah, karena makanan dari lambung langsung dikeluarkan melalui anus",
    ],
    correctAnswer: 1,
    explanation: "Makanan dari lambung menuju usus halus. Usus halus merupakan tempat utama penyerapan sari-sari makanan. Setelah itu, sisa makanan menuju usus besar. Oleh karena itu, pernyataan siswa tersebut tidak tepat.",
  },
  {
    id: "HOTS-GAMBAR-002", category: R, questionType: "HOTS", stimulusType: "image", active: true,
    difficulty: "Sedang", cognitiveLevel: "C4", indicator: "Menganalisis perubahan rongga dada dalam proses pernapasan.",
    materi: "Inspirasi dan ekspirasi",
    stimulusTitle: "Dua gambar pernapasan",
    stimulus: {
      type: "image",
      title: "Gambar A dan Gambar B",
      lead: "Perhatikan dua gambar pernapasan berikut.",
      panels: [
        {
          kind: "diagram", diagram: "insp-exp",
          caption: "Gambar A: rongga dada membesar, diafragma ke bawah, paru-paru mengembang, panah udara masuk. Gambar B: rongga dada mengecil, diafragma ke atas, paru-paru mengecil, panah udara keluar.",
          alt: "Dua panel: panel A menunjukkan inspirasi dengan rongga dada membesar dan udara masuk; panel B menunjukkan ekspirasi dengan rongga dada mengecil dan udara keluar.",
        },
      ],
    },
    question: "Berdasarkan kedua gambar tersebut, kesimpulan yang paling tepat adalah ....",
    options: [
      "Gambar A menunjukkan ekspirasi dan gambar B menunjukkan inspirasi",
      "Gambar A menunjukkan inspirasi dan gambar B menunjukkan ekspirasi",
      "Kedua gambar menunjukkan proses pencernaan",
      "Kedua gambar menunjukkan udara tidak bergerak",
    ],
    correctAnswer: 1,
    explanation: "Gambar A menunjukkan inspirasi karena rongga dada membesar dan udara masuk ke paru-paru. Gambar B menunjukkan ekspirasi karena rongga dada mengecil dan udara keluar dari paru-paru.",
  },
  {
    id: "HOTS-GAMBAR-003", category: R, questionType: "HOTS", stimulusType: "image", active: true,
    difficulty: "Sulit", cognitiveLevel: "C5", indicator: "Mengevaluasi kondisi lingkungan berdasarkan kaitannya dengan kesehatan pernapasan.",
    materi: "Kesehatan pernapasan",
    stimulusTitle: "Kondisi lingkungan",
    stimulus: {
      type: "image",
      title: "Gambar A dan Gambar B",
      lead: "Dua lingkungan tempat siswa beraktivitas.",
      panels: [
        {
          kind: "image", src: "images/udara-bersih.jpg",
          caption: "Gambar A: lingkungan hijau, banyak tanaman, tanpa asap, siswa berolahraga di udara terbuka.",
          alt: "Ilustrasi halaman sekolah yang bersih dan hijau dengan pohon rimbun dan siswa berlari di pagi hari.",
        },
        {
          kind: "image", src: "images/udara-berasap.jpg",
          caption: "Gambar B: asap kendaraan dan sampah yang dibakar, beberapa orang menutup hidung.",
          alt: "Ilustrasi lingkungan berkabut asap dari pembakaran sampah dan asap kendaraan, orang menutup hidung.",
        },
      ],
    },
    question: "Jika seseorang harus memilih tempat untuk melakukan aktivitas olahraga, alasan ilmiah yang paling tepat untuk memilih lingkungan pada Gambar A adalah ....",
    options: [
      "Lingkungan tersebut pasti tidak memiliki mikroorganisme",
      "Lingkungan tersebut terlihat memiliki kondisi udara yang lebih baik dan lebih sedikit sumber asap",
      "Semua kegiatan olahraga hanya boleh dilakukan di dekat tanaman",
      "Udara pada Gambar B tidak mengandung oksigen sama sekali",
    ],
    correctAnswer: 1,
    explanation: "Gambar A menunjukkan lingkungan dengan lebih sedikit sumber asap yang terlihat. Menghindari asap dan polusi dapat membantu menjaga kesehatan sistem pernapasan. Tidak tepat menyimpulkan bahwa Gambar B sama sekali tidak memiliki oksigen.",
  },
  {
    id: "HOTS-GAMBAR-004", category: R, questionType: "HOTS", stimulusType: "image", active: true,
    difficulty: "Sedang", cognitiveLevel: "C4", indicator: "Menganalisis dan memperbaiki urutan jalur udara.",
    materi: "Jalur pernapasan",
    stimulusTitle: "Diagram jalur pernapasan",
    stimulus: {
      type: "image",
      title: "Diagram jalur pernapasan",
      lead: "Diagram jalur pernapasan dengan beberapa organ diberi label A sampai D.",
      panels: [
        {
          kind: "diagram", diagram: "jalur-udara",
          caption: "A Hidung · B Trakea · C Bronkus · D Alveolus",
          alt: "Diagram jalur pernapasan: A hidung, B trakea, C bronkus, dan D alveolus di dalam paru-paru.",
        },
      ],
    },
    question: "Seorang siswa mengurutkan jalur udara sebagai berikut: Hidung → Alveolus → Trakea → Bronkus. Berdasarkan diagram, perbaikan urutan yang paling tepat adalah ....",
    options: [
      "Hidung → Trakea → Bronkus → Alveolus",
      "Hidung → Bronkus → Trakea → Alveolus",
      "Alveolus → Hidung → Trakea → Bronkus",
      "Trakea → Hidung → Bronkus → Alveolus",
    ],
    correctAnswer: 0,
    explanation: "Setelah melewati hidung dan bagian saluran pernapasan atas, udara menuju trakea, kemudian bronkus, bronkiolus, dan akhirnya alveolus. Alveolus merupakan tempat pertukaran gas.",
  },
  {
    id: "HOTS-GAMBAR-005", category: R, questionType: "HOTS", stimulusType: "image", active: true,
    difficulty: "Sulit", cognitiveLevel: "C4", indicator: "Menghubungkan posisi diafragma dengan proses inspirasi.",
    materi: "Inspirasi dan ekspirasi",
    stimulusTitle: "Gerakan diafragma",
    stimulus: {
      type: "image",
      title: "Kondisi X dan Kondisi Y",
      lead: "Perhatikan dua kondisi diafragma berikut.",
      panels: [
        {
          kind: "diagram", diagram: "diafragma",
          caption: "Kondisi X: diafragma mendatar, rongga dada lebih besar, paru-paru mengembang. Kondisi Y: diafragma melengkung ke atas, rongga dada lebih kecil, paru-paru mengempis.",
          alt: "Dua panel kondisi diafragma: X mendatar dengan rongga dada besar, Y melengkung ke atas dengan rongga dada kecil.",
        },
      ],
    },
    question: "Jika seseorang menarik napas, kondisi yang kemungkinan terjadi adalah ....",
    options: [
      "Kondisi X karena volume rongga dada bertambah",
      "Kondisi Y karena udara harus keluar dari paru-paru",
      "Kondisi Y karena diafragma selalu bergerak ke atas ketika inspirasi",
      "Kedua kondisi tidak berkaitan dengan pernapasan",
    ],
    correctAnswer: 0,
    explanation: "Saat menarik napas atau inspirasi, diafragma berkontraksi dan bergerak ke bawah atau mendatar. Volume rongga dada bertambah sehingga udara masuk ke paru-paru.",
  },
  {
    id: "HOTS-TABEL-001", category: D, questionType: "HOTS", stimulusType: "table", active: true,
    difficulty: "Sedang", cognitiveLevel: "C4", indicator: "Menganalisis hubungan kebiasaan makan dan minum dengan kesehatan pencernaan.",
    materi: "Kesehatan pencernaan",
    stimulusTitle: "Kebiasaan makan empat siswa",
    stimulus: {
      type: "table",
      title: "Kebiasaan makan empat siswa",
      columns: ["Siswa", "Sayur dan Buah", "Air Putih", "Aktivitas Fisik"],
      rows: [
        ["Andi", "Jarang", "Sedikit", "Jarang"],
        ["Bima", "Cukup", "Cukup", "Teratur"],
        ["Citra", "Jarang", "Cukup", "Teratur"],
        ["Dini", "Cukup", "Sedikit", "Jarang"],
      ],
      note: "Data simulasi untuk latihan analisis.",
    },
    question: "Berdasarkan tabel, siswa yang perlu memperhatikan kebiasaan makan dan minum agar kesehatan pencernaannya lebih terjaga adalah ....",
    options: [
      "Bima saja karena melakukan aktivitas fisik",
      "Andi karena jarang mengonsumsi sayur dan buah serta sedikit minum air putih",
      "Semua siswa pasti mengalami gangguan pencernaan",
      "Tidak ada siswa yang perlu memperhatikan kebiasaan hidupnya",
    ],
    correctAnswer: 1,
    explanation: "Andi memiliki dua kebiasaan yang perlu diperbaiki, yaitu jarang mengonsumsi sayur dan buah serta sedikit minum air putih. Serat dan cairan yang cukup dapat membantu menjaga fungsi sistem pencernaan.",
  },
  {
    id: "HOTS-TABEL-002", category: R, questionType: "HOTS", stimulusType: "table", active: true,
    difficulty: "Sedang", cognitiveLevel: "C4", indicator: "Menganalisis perubahan frekuensi pernapasan berdasarkan aktivitas.",
    materi: "Pernapasan dan aktivitas",
    stimulusTitle: "Frekuensi pernapasan pada beberapa aktivitas",
    stimulus: {
      type: "table",
      title: "Frekuensi pernapasan pada beberapa aktivitas",
      columns: ["Kondisi", "Frekuensi Pernapasan per Menit"],
      rows: [
        ["Duduk tenang", "18"],
        ["Berjalan santai", "22"],
        ["Berlari", "35"],
        ["Istirahat setelah berlari", "25"],
      ],
      note: "Data simulasi untuk latihan analisis.",
    },
    question: "Kesimpulan yang paling tepat berdasarkan tabel adalah ....",
    options: [
      "Frekuensi pernapasan selalu sama dalam semua aktivitas",
      "Frekuensi pernapasan cenderung meningkat saat aktivitas lebih berat",
      "Berlari membuat tubuh tidak membutuhkan oksigen",
      "Frekuensi pernapasan paling rendah ketika berlari",
    ],
    correctAnswer: 1,
    explanation: "Data menunjukkan bahwa frekuensi pernapasan meningkat dari duduk tenang hingga berlari. Saat beraktivitas lebih berat, tubuh membutuhkan lebih banyak oksigen dan menghasilkan lebih banyak karbon dioksida sehingga frekuensi pernapasan dapat meningkat.",
  },
  {
    id: "HOTS-TABEL-003", category: D, questionType: "HOTS", stimulusType: "table", active: true,
    difficulty: "Sedang", cognitiveLevel: "C4", indicator: "Menarik kesimpulan berdasarkan pola data sederhana.",
    materi: "Gangguan pencernaan",
    stimulusTitle: "Pola konsumsi air satu minggu",
    stimulus: {
      type: "table",
      title: "Pola konsumsi air satu minggu",
      columns: ["Hari", "Perkiraan Kebiasaan Minum", "Kondisi yang Diamati"],
      rows: [
        ["Senin", "Cukup", "Buang air besar normal"],
        ["Selasa", "Sedikit", "Feses lebih keras"],
        ["Rabu", "Sedikit", "Sulit buang air besar"],
        ["Kamis", "Cukup", "Kondisi mulai membaik"],
      ],
      note: "Data simulasi untuk latihan analisis, bukan diagnosis medis.",
    },
    question: "Berdasarkan pola data, kemungkinan hubungan yang dapat dipelajari adalah ....",
    options: [
      "Air putih selalu menyebabkan gangguan pencernaan",
      "Asupan cairan yang cukup dapat membantu menjaga kondisi feses tetap lebih lunak",
      "Semua kesulitan buang air besar hanya disebabkan oleh kurang tidur",
      "Feses tidak dipengaruhi oleh pola makan dan minum",
    ],
    correctAnswer: 1,
    explanation: "Data simulasi menunjukkan hubungan yang dapat dipelajari antara asupan cairan dan kondisi feses. Cairan yang cukup dapat membantu menjaga feses agar tidak terlalu keras. Kondisi nyata seseorang dapat dipengaruhi oleh berbagai faktor.",
  },
  {
    id: "HOTS-TABEL-004", category: D, questionType: "HOTS", stimulusType: "table", active: true,
    difficulty: "Sulit", cognitiveLevel: "C5", indicator: "Mengevaluasi informasi tabel untuk menentukan pilihan kebiasaan makan.",
    materi: "Kesehatan pencernaan",
    stimulusTitle: "Perbandingan empat menu makan",
    stimulus: {
      type: "table",
      title: "Perbandingan empat menu makan",
      columns: ["Menu", "Kandungan Serat", "Kandungan Gula Tambahan", "Keterangan"],
      rows: [
        ["Menu A", "Tinggi", "Rendah", "Sayur, buah, dan sumber protein"],
        ["Menu B", "Rendah", "Tinggi", "Minuman manis dan makanan ringan"],
        ["Menu C", "Sedang", "Sedang", "Nasi, lauk, dan sedikit sayur"],
        ["Menu D", "Rendah", "Tinggi", "Makanan ringan dan minuman manis"],
      ],
      note: "Data simulasi untuk latihan analisis.",
    },
    question: "Jika tujuan seseorang adalah memperbaiki kebiasaan makan dengan meningkatkan konsumsi serat dan mengurangi gula tambahan, menu yang paling sesuai berdasarkan tabel adalah ....",
    options: ["Menu A", "Menu B", "Menu C", "Menu D"],
    correctAnswer: 0,
    explanation: "Berdasarkan informasi tabel, Menu A memiliki kandungan serat tinggi dan gula tambahan rendah. Pilihan makanan yang sebenarnya tetap perlu disesuaikan dengan kebutuhan tubuh, variasi makanan, dan porsi yang seimbang.",
  },
  {
    id: "HOTS-TABEL-005", category: R, questionType: "HOTS", stimulusType: "table", active: true,
    difficulty: "Sedang", cognitiveLevel: "C4", indicator: "Membandingkan data frekuensi pernapasan pada beberapa kondisi.",
    materi: "Pernapasan dan aktivitas",
    stimulusTitle: "Frekuensi pernapasan tiga siswa",
    stimulus: {
      type: "table",
      title: "Frekuensi pernapasan tiga siswa",
      columns: ["Siswa", "Sebelum Aktivitas", "Setelah Berlari", "Setelah Istirahat"],
      rows: [
        ["Siswa A", "18 kali/menit", "34 kali/menit", "22 kali/menit"],
        ["Siswa B", "19 kali/menit", "36 kali/menit", "23 kali/menit"],
        ["Siswa C", "18 kali/menit", "35 kali/menit", "22 kali/menit"],
      ],
      note: "Data simulasi untuk latihan analisis.",
    },
    question: "Kesimpulan yang paling sesuai berdasarkan tabel adalah ....",
    options: [
      "Aktivitas fisik dapat meningkatkan frekuensi pernapasan, lalu frekuensi tersebut dapat menurun setelah beristirahat",
      "Aktivitas fisik selalu menghentikan proses pernapasan",
      "Frekuensi pernapasan tidak berubah setelah aktivitas",
      "Istirahat menyebabkan frekuensi pernapasan selalu lebih tinggi daripada saat berlari",
    ],
    correctAnswer: 0,
    explanation: "Ketiga siswa menunjukkan peningkatan frekuensi pernapasan setelah berlari dan penurunan setelah beristirahat. Hal ini sesuai dengan kebutuhan tubuh terhadap oksigen ketika melakukan aktivitas fisik.",
  },
  {
    id: "HOTS-KASUS-001", category: D, questionType: "HOTS", stimulusType: "case", active: true,
    difficulty: "Sedang", cognitiveLevel: "C4", indicator: "Menerapkan konsep pencernaan mekanik dalam situasi sehari-hari.",
    materi: "Proses di mulut",
    stimulusTitle: "Kasus: makan terlalu cepat",
    stimulus: {
      type: "case",
      title: "Kasus: makan terlalu cepat",
      lines: [
        "Rafi sering makan dengan sangat cepat. Ia jarang mengunyah makanan sampai halus.",
        "Setelah makan, ia terkadang merasa tidak nyaman pada perutnya.",
        "Gurunya menyarankan agar Rafi memperbaiki kebiasaan makannya.",
      ],
    },
    question: "Saran yang paling sesuai berdasarkan konsep sistem pencernaan adalah ....",
    options: [
      "Rafi sebaiknya menelan makanan tanpa mengunyah",
      "Rafi sebaiknya mengunyah makanan dengan baik dan makan secara lebih perlahan",
      "Rafi sebaiknya tidak minum air sepanjang hari",
      "Rafi sebaiknya hanya mengonsumsi makanan manis",
    ],
    correctAnswer: 1,
    explanation: "Mengunyah membantu memperkecil ukuran makanan dan mencampurnya dengan air liur. Makan secara lebih perlahan juga dapat membantu seseorang memperhatikan proses makan dan mengurangi kebiasaan menelan makanan terlalu cepat.",
  },
  {
    id: "HOTS-KASUS-002", category: D, questionType: "HOTS", stimulusType: "case", active: true,
    difficulty: "Sulit", cognitiveLevel: "C5", indicator: "Menentukan solusi berdasarkan kasus kesehatan pencernaan.",
    materi: "Kesehatan pencernaan",
    stimulusTitle: "Kasus: kurang serat",
    stimulus: {
      type: "case",
      title: "Kasus: kurang serat",
      lines: [
        "Salsa lebih sering mengonsumsi makanan ringan dan jarang makan sayur serta buah.",
        "Dalam beberapa hari terakhir, ia mengalami kesulitan buang air besar.",
        "Orang tuanya mengajaknya memperbaiki pola makan dan minum.",
      ],
    },
    question: "Tindakan yang paling sesuai untuk membantu menjaga kesehatan pencernaan adalah ....",
    options: [
      "Mengurangi konsumsi air putih",
      "Mengonsumsi makanan berserat, cukup minum, dan melakukan aktivitas fisik yang sesuai",
      "Tidak makan sepanjang hari",
      "Hanya mengonsumsi makanan yang rendah serat",
    ],
    correctAnswer: 1,
    explanation: "Makanan berserat, cairan yang cukup, dan aktivitas fisik dapat membantu menjaga kesehatan sistem pencernaan. Jika keluhan berlanjut atau berat, Salsa perlu mendapat bantuan orang tua dan tenaga kesehatan.",
  },
  {
    id: "HOTS-KASUS-003", category: R, questionType: "HOTS", stimulusType: "case", active: true,
    difficulty: "Sedang", cognitiveLevel: "C4", indicator: "Menganalisis hubungan aktivitas fisik dengan frekuensi pernapasan.",
    materi: "Pernapasan dan aktivitas",
    stimulusTitle: "Kasus: bernapas setelah berlari",
    stimulus: {
      type: "case",
      title: "Kasus: bernapas setelah berlari",
      lines: [
        "Fahmi duduk dengan tenang selama beberapa menit.",
        "Setelah itu, ia berlari mengelilingi lapangan.",
        "Fahmi menyadari bahwa napasnya menjadi lebih cepat setelah berlari.",
      ],
    },
    question: "Penjelasan yang paling tepat mengenai kondisi Fahmi adalah ....",
    options: [
      "Tubuh membutuhkan lebih banyak oksigen ketika beraktivitas dan perlu mengeluarkan karbon dioksida",
      "Paru-paru berhenti bekerja ketika tubuh bergerak",
      "Tubuh tidak membutuhkan oksigen saat berlari",
      "Frekuensi napas meningkat karena makanan sedang berada di usus besar",
    ],
    correctAnswer: 0,
    explanation: "Ketika berlari, otot membutuhkan lebih banyak energi. Sistem pernapasan membantu menyediakan oksigen dan mengeluarkan karbon dioksida sehingga frekuensi pernapasan dapat meningkat.",
  },
  {
    id: "HOTS-KASUS-004", category: R, questionType: "HOTS", stimulusType: "case", active: true,
    difficulty: "Sedang", cognitiveLevel: "C5", indicator: "Mengevaluasi tindakan yang tepat dalam menjaga kesehatan pernapasan.",
    materi: "Kesehatan sistem pernapasan",
    stimulusTitle: "Kasus: paparan asap",
    stimulus: {
      type: "case",
      title: "Kasus: paparan asap",
      lines: [
        "Di dekat rumah Nisa, seseorang membakar sampah.",
        "Asap terbawa angin ke arah rumah.",
        "Nisa mulai batuk dan merasa tidak nyaman ketika bernapas.",
      ],
    },
    question: "Tindakan yang paling tepat dilakukan Nisa adalah ....",
    options: [
      "Mendekati sumber asap untuk melihat api lebih dekat",
      "Tetap bermain di area yang penuh asap",
      "Menjauh dari asap, mencari udara yang lebih bersih, dan memberi tahu orang dewasa",
      "Menahan napas selama mungkin agar asap tidak masuk",
    ],
    correctAnswer: 2,
    explanation: "Asap dapat mengganggu sistem pernapasan. Nisa sebaiknya menjauh dari sumber asap dan memberi tahu orang dewasa. Jika mengalami kesulitan bernapas yang berat, ia perlu segera mendapatkan bantuan medis.",
  },
  {
    id: "HOTS-KASUS-005", category: R, questionType: "HOTS", stimulusType: "case", active: true,
    difficulty: "Sedang", cognitiveLevel: "C4", indicator: "Menghubungkan hasil pengamatan dengan mekanisme pernapasan.",
    materi: "Mekanisme pernapasan",
    stimulusTitle: "Kasus: pengamatan pernapasan",
    stimulus: {
      type: "case",
      title: "Kasus: pengamatan pernapasan",
      lines: [
        "Guru meminta siswa mengamati gerakan tubuh saat bernapas.",
        "Ketika menarik napas, dada seseorang tampak mengembang.",
        "Ketika mengembuskan napas, dada tampak mengecil.",
      ],
    },
    question: "Penjelasan yang paling tepat berdasarkan pengamatan tersebut adalah ....",
    options: [
      "Ketika menarik napas, volume rongga dada cenderung bertambah sehingga udara masuk",
      "Ketika menarik napas, udara selalu keluar dari paru-paru",
      "Ketika mengembuskan napas, rongga dada selalu membesar",
      "Gerakan dada tidak berkaitan dengan perubahan volume rongga dada",
    ],
    correctAnswer: 0,
    explanation: "Pada inspirasi, volume rongga dada cenderung bertambah sehingga udara masuk ke paru-paru. Pada ekspirasi normal, volume rongga dada cenderung berkurang sehingga udara keluar.",
  },
];

export const DEFAULT_BANK: Question[] = [...dasar, ...hots];

export const LABEL = (i: number) => String.fromCharCode(65 + i); // A, B, C, D

/* ---------------- Validasi kualitas soal ---------------- */
export type Issue = { level: "error" | "warn"; msg: string };

export function validateBank(bank: Question[]): Issue[] {
  const out: Issue[] = [];
  const ids = new Set<string>();
  const texts = new Set<string>();

  if (bank.length < 45) out.push({ level: "error", msg: `Jumlah soal ${bank.length}, minimal 45.` });
  const dasarCount = bank.filter((q) => q.questionType === "dasar").length;
  const hotsCount = bank.filter((q) => q.questionType === "HOTS").length;
  if (dasarCount < 30) out.push({ level: "error", msg: `Soal dasar ${dasarCount}, minimal 30.` });
  if (hotsCount < 15) out.push({ level: "error", msg: `Soal HOTS ${hotsCount}, minimal 15.` });

  bank.forEach((q) => {
    const tag = String(q.id);
    if (ids.has(tag)) out.push({ level: "error", msg: `ID duplikat: ${tag}` });
    ids.add(tag);

    if (q.options.length !== 4) out.push({ level: "error", msg: `${tag}: pilihan berjumlah ${q.options.length} (harus 4).` });
    if (q.options.some((o) => !o || !o.trim())) out.push({ level: "error", msg: `${tag}: ada pilihan kosong.` });
    if (q.correctAnswer < 0 || q.correctAnswer > 3) out.push({ level: "error", msg: `${tag}: kunci di luar indeks A–D.` });
    if (!q.explanation || q.explanation.trim().length < 15) out.push({ level: "error", msg: `${tag}: pembahasan kosong/kurang jelas.` });
    if (!q.question || q.question.trim().length < 10) out.push({ level: "error", msg: `${tag}: teks soal kosong.` });
    if (!q.category) out.push({ level: "error", msg: `${tag}: kategori materi kosong.` });
    if (!q.materi) out.push({ level: "warn", msg: `${tag}: pokok materi belum ditentukan.` });

    const key = q.question.replace(/\s+/g, " ").trim().toLowerCase();
    if (texts.has(key)) out.push({ level: "error", msg: `${tag}: soal duplikat.` });
    texts.add(key);

    if (q.questionType === "HOTS") {
      if (!q.stimulus) out.push({ level: "error", msg: `${tag}: HOTS tanpa stimulus.` });
      if (!q.indicator) out.push({ level: "warn", msg: `${tag}: HOTS tanpa indikator.` });
      if (!q.cognitiveLevel) out.push({ level: "warn", msg: `${tag}: HOTS tanpa level kognitif.` });
      if (q.stimulus?.type === "table" && !/simulasi/i.test(q.stimulus.note ?? "")) {
        out.push({ level: "warn", msg: `${tag}: tabel tanpa label data simulasi.` });
      }
    }
  });

  const gambar = bank.filter((q) => q.stimulusType === "image").length;
  const tabel = bank.filter((q) => q.stimulusType === "table").length;
  const kasus = bank.filter((q) => q.stimulusType === "case").length;
  if (gambar < 5) out.push({ level: "warn", msg: `Stimulus gambar ${gambar}, target 5.` });
  if (tabel < 5) out.push({ level: "warn", msg: `Stimulus tabel ${tabel}, target 5.` });
  if (kasus < 5) out.push({ level: "warn", msg: `Stimulus kasus ${kasus}, target 5.` });

  return out;
}
