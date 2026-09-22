// Materi IPAS Fase C — Sistem Pencernaan & Sistem Pernapasan Manusia
// Disusun ringkas dan ramah anak untuk siswa kelas VI SD.

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "flow"; items: string[] }
  | { type: "note"; text: string };

export type Section = {
  id: string;
  no: number;
  title: string;
  lead: string;
  blocks: Block[];
  reflect?: string;
};

export type OrganSim = {
  id: string;
  name: string;
  step: number;
  fun: string;
  process: string;
  quiz: { q: string; options: string[]; answer: number; why: string };
};

export const MATERI_PENCERNAAN: Section[] = [
  {
    id: "p-1",
    no: 1,
    title: "Pengertian sistem pencernaan",
    lead: "Apa itu sistem pencernaan?",
    blocks: [
      { type: "p", text: "Sistem pencernaan adalah kumpulan organ yang bekerja sama untuk mengolah makanan menjadi sari-sari makanan yang bisa diserap tubuh, lalu membuang sisa makanan yang tidak terpakai." },
      { type: "p", text: "Makanan yang kita makan belum bisa langsung dipakai tubuh. Makanan harus dipecah dahulu menjadi bagian yang sangat kecil, baru bisa diserap dan memberi energi." },
      { type: "note", text: "Bersyukurlah atas nikmat tubuh yang bekerja tanpa kita perintahkan setiap hari." },
    ],
  },
  {
    id: "p-2",
    no: 2,
    title: "Fungsi sistem pencernaan",
    lead: "Untuk apa sistem pencernaan bekerja?",
    blocks: [
      { type: "list", items: [
        "Memperlakukan makanan secara mekanik, misalnya mengunyah dan mengaduk.",
        "Menguraikan makanan secara kimiawi dengan bantuan enzim.",
        "Menyerap sari-sari makanan ke dalam darah.",
        "Mengangkut sisa makanan dan mengeluarkannya dari tubuh.",
      ] },
    ],
  },
  {
    id: "p-3",
    no: 3,
    title: "Organ-organ pencernaan",
    lead: "Siapa saja anggotanya?",
    blocks: [
      { type: "p", text: "Saluran pencernaan adalah jalan tempat makanan lewat: mulut, faring, kerongkongan, lambung, usus halus, usus besar, rektum, dan anus." },
      { type: "p", text: "Organ bantu adalah organ yang membantu pencernaan walaupun makanan tidak melewati organ tersebut, yaitu kelenjar ludah, hati, dan pankreas." },
    ],
  },
  {
    id: "p-4",
    no: 4,
    title: "Mulut",
    lead: "Gerbang pertama makanan",
    blocks: [
      { type: "p", text: "Di mulut, gigi mengunyah dan menghancurkan makanan. Lidah mengaduk makanan dan membantu menelannya." },
      { type: "list", items: [
        "Gigi seruigi memotong dan merobek makanan.",
        "Gigi geraham menghaluskan makanan.",
        "Air liur membasahi makanan dan memulai pencernaan zat tepung.",
      ] },
    ],
    reflect: "Kunyah makanan perlahan sampai halus. Kebiasaan baik dimulai dari hal kecil.",
  },
  {
    id: "p-5",
    no: 5,
    title: "Faring dan kerongkongan",
    lead: "Jalan menuju lambung",
    blocks: [
      { type: "p", text: "Faring adalah persimpangan antara jalur makanan dan jalur udara. Ketika menelan, napas ditahan agar makanan tidak masuk ke tenggorokan udara." },
      { type: "p", text: "Kerongkongan (esofagus) adalah saluran yang menghubungkan faring dengan lambung. Dinding kerongkongan bergerak meremas dan mendorong makanan ke bawah. Gerakan ini disebut gerakan peristaltik." },
    ],
  },
  {
    id: "p-6",
    no: 6,
    title: "Lambung",
    lead: "Wadah pengaduk makanan",
    blocks: [
      { type: "p", text: "Lambung mengaduk makanan dan mencampurnya dengan cairan lambung. Makanan tinggal beberapa jam di lambung sehingga menjadi bubur halus." },
      { type: "p", text: "Cairan lambung membantu menguraikan makanan, terutama protein. Dinding lambung yang kuat melindungi lambung dari cairannya sendiri." },
    ],
  },
  {
    id: "p-7",
    no: 7,
    title: "Usus halus",
    lead: "Tempat utama penyerapan",
    blocks: [
      { type: "p", text: "Usus halus adalah saluran terpanjang di tubuh. Di sinilah makanan diuraikan menjadi sari-sari makanan, lalu diserap ke dalam darah." },
      { type: "list", items: [
        "Usus halus memiliki dinding berlipat-lipat agar permukaan penyerapan lebih luas.",
        "Hasil penyerapan diangkut oleh darah ke seluruh tubuh.",
        "Cairan dari hati dan pankreas masuk ke usus halus untuk membantu pencernaan.",
      ] },
    ],
  },
  {
    id: "p-8",
    no: 8,
    title: "Usus besar",
    lead: "Pengambil air dan pembentuk feses",
    blocks: [
      { type: "p", text: "Usus besar mengelilingi usus halus. Fungsinya menyerap sebagian air dari sisa makanan sehingga sisa makanan menjadi lebih padat." },
      { type: "p", text: "Di sinilah sisa makanan dibentuk menjadi feses dan ditampung sebelum dikeluarkan." },
    ],
  },
  {
    id: "p-9",
    no: 9,
    title: "Rektum dan anus",
    lead: "Pengeluaran sisa makanan",
    blocks: [
      { type: "p", text: "Rektum adalah tempat penampungan feses sementara. Ketika sudah penuh, feses dikeluarkan melalui anus." },
      { type: "p", text: "Buang air besar secara teratur membantu tubuh membuang sisa yang tidak dibutuhkan." },
      { type: "note", text: "Jangan menunda buang air besar. Disiplin menjaga pola makan dan buang air adalah bagian dari tanggung jawab diri." },
    ],
  },
  {
    id: "p-10",
    no: 10,
    title: "Hati",
    lead: "Penghasil empedu",
    blocks: [
      { type: "p", text: "Hati menghasilkan cairan empedu yang membantu menguraikan lemak. Empedu disimpan di kantong empedu lalu dilepas ke usus halus." },
      { type: "p", text: "Hati juga membantu memproses zat-zat yang diserap usus. Makanan berlemak berlebihan membuat hati bekerja lebih berat." },
    ],
  },
  {
    id: "p-11",
    no: 11,
    title: "Pankreas",
    lead: "Pemasok enzim pencernaan",
    blocks: [
      { type: "p", text: "Pankreas menghasilkan cairan kaya enzim yang dialirkan ke usus halus. Enzim inilah yang menyelesaikan penguraian makanan menjadi sari makanan." },
    ],
  },
  {
    id: "p-12",
    no: 12,
    title: "Kelenjar ludah",
    lead: "Pembuat air liur",
    blocks: [
      { type: "p", text: "Kelenjar ludah menghasilkan air liur sekitar satu sampai satu setengah liter setiap hari. Air liur membasahi makanan dan mengandung enzim pencerna zat tepung." },
      { type: "p", text: "Air liur juga membantu menjaga mulut tetap bersih dan nyaman." },
    ],
  },
  {
    id: "p-13",
    no: 13,
    title: "Pencernaan mekanik",
    lead: "Dihancurkan dengan gerakan",
    blocks: [
      { type: "p", text: "Pencernaan mekanik adalah penghancuran makanan secara fisik tanpa mengubah zatnya menjadi zat lain." },
      { type: "list", items: [
        "Mengunyah dengan gigi.",
        "Mengaduk makanan di lambung.",
        "Gerakan dinding saluran pencernaan (peristaltik).",
      ] },
    ],
  },
  {
    id: "p-14",
    no: 14,
    title: "Pencernaan kimiawi",
    lead: "Diubah dengan enzim",
    blocks: [
      { type: "p", text: "Pencernaan kimiawi adalah penguraian makanan menjadi zat yang lebih sederhana dengan bantuan enzim dan cairan pencernaan." },
      { type: "list", items: [
        "Air liur menguraikan zat tepung di mulut.",
        "Cairan lambung membantu menguraikan protein.",
        "Enzim dari pankreas menyelesaikan pencernaan di usus halus.",
      ] },
    ],
  },
  {
    id: "p-15",
    no: 15,
    title: "Fungsi enzim dengan sederhana",
    lead: "Kecil-kecil berkhasiat",
    blocks: [
      { type: "p", text: "Enzim adalah zat yang mempercepat penguraian makanan. Satu enzim bekerja pada satu jenis makanan saja, seperti kunci yang hanya cocok dengan satu pintu." },
      { type: "p", text: "Karena enzim bekerja sangat cepat, makanan yang sudah dihancurkan di mulut bisa selesai dicerna dalam waktu beberapa jam." },
    ],
  },
  {
    id: "p-16",
    no: 16,
    title: "Penyerapan sari-sari makanan",
    lead: "Makanan menjadi energi",
    blocks: [
      { type: "p", text: "Sari-sari makanan berupa glukosa, asam amino, lemak, vitamin, dan mineral diserap di usus halus lalu diangkut oleh darah ke seluruh tubuh." },
      { type: "p", text: "Glukosa dipakai tubuh untuk bergerak, berpikir, dan tumbuh. Sisanya disimpan sebagai cadangan energi." },
    ],
  },
  {
    id: "p-17",
    no: 17,
    title: "Pembentukan dan pengeluaran feses",
    lead: "Sisa yang dibuang",
    blocks: [
      { type: "p", text: "Sisa makanan yang tidak dicerna bergerak ke usus besar. Air diserap, lalu sisa menjadi feses yang ditampung di rektum dan dikeluarkan lewat anus." },
      { type: "p", text: "Feses yang keluar seharusnya tidak terlalu keras. Kekurangan air dan serat membuat feses keras dan sulit dikeluarkan." },
    ],
  },
  {
    id: "p-18",
    no: 18,
    title: "Gangguan sistem pencernaan",
    lead: "Apa yang bisa terjadi?",
    blocks: [
      { type: "list", items: [
        "Sembelit: feses keras dan sulit buang air besar, biasanya karena kurang serat dan air.",
        "Diare: feses lebih cair dan sering, sering karena makanan atau minuman tidak bersih.",
        "Maag atau perih di lambung: sering terjadi karena telat makan atau makanan terlalu pedas.",
        "Kerusakan gigi: akibat sering makanan manis dan jarang menyikat gigi.",
      ] },
      { type: "note", text: "Jika keluhan berlanjut atau berat, sampaikan kepada orang tua dan tenaga kesehatan. Aplikasi ini bukan alat diagnosis." },
    ],
  },
  {
    id: "p-19",
    no: 19,
    title: "Menjaga kesehatan pencernaan",
    lead: "Kebiasaan sehari-hari",
    blocks: [
      { type: "list", items: [
        "Makan makanan berserat seperti sayur dan buah.",
        "Minum air putih yang cukup setiap hari.",
        "Mengunyah makanan sampai halus dan makan tidak terburu-buru.",
        "Berolahraga secara teratur.",
        "Menjaga kebersihan makanan dan mencuci tangan sebelum makan.",
        "Tidak menunda buang air besar.",
      ] },
    ],
    reflect: "Menjaga kesehatan adalah bentuk tanggung jawab kita atas nikmat tubuh yang Allah berikan.",
  },
  {
    id: "p-20",
    no: 20,
    title: "Rangkuman perjalanan makanan",
    lead: "Urutan yang harus dihafal",
    blocks: [
      { type: "flow", items: ["Mulut", "Faring", "Kerongkongan", "Lambung", "Usus Halus", "Usus Besar", "Rektum", "Anus"] },
      { type: "p", text: "Ingat: usus halus adalah tempat utama penyerapan, usus besar menyerap air, sedangkan hati, pankreas, dan kelenjar ludah adalah organ bantu yang tidak dilalui makanan." },
    ],
  },
];

export const MATERI_PERNAPASAN: Section[] = [
  {
    id: "r-1",
    no: 1,
    title: "Pengertian sistem pernapasan",
    lead: "Apa itu sistem pernapasan?",
    blocks: [
      { type: "p", text: "Sistem pernapasan adalah kumpulan organ yang mengambil oksigen dari udara dan mengeluarkan karbon dioksida hasil kerja tubuh." },
      { type: "p", text: "Kita bernapas sekitar 16–20 kali per menit tanpa menyadari, dan jumlahnya bertambah ketika kita berlari atau bermain." },
    ],
  },
  {
    id: "r-2",
    no: 2,
    title: "Fungsi sistem pernapasan",
    lead: "Untuk apa kita bernapas?",
    blocks: [
      { type: "list", items: [
        "Mengambil oksigen dari udara.",
        "Mengedarkan oksigen ke seluruh tubuh melalui darah.",
        "Mengeluarkan karbon dioksida dari tubuh.",
        "Membantu mengatur suhu tubuh melalui keluarnya uap air.",
      ] },
      { type: "note", text: "Oksigen dibutuhkan setiap sel tubuh agar kita bisa bergerak, belajar, dan bermain." },
    ],
  },
  {
    id: "r-3",
    no: 3,
    title: "Hidung",
    lead: "Pintu masuk udara",
    blocks: [
      { type: "p", text: "Udara masuk pertama kali melalui lubang hidung. Di dalam hidung, udara disaring, dihangatkan, dan dilembapkan sebelum masuk ke paru-paru." },
      { type: "list", items: [
        "Rambut hidung menangkap debu dan kotoran.",
        "Lendir menempelkan partikel asing yang ikut masuk.",
        "Selaput lendir menghangatkan udara yang lewat.",
      ] },
    ],
  },
  {
    id: "r-4",
    no: 4,
    title: "Faring",
    lead: "Persimpangan dua jalur",
    blocks: [
      { type: "p", text: "Faring berada di belakang rongga mulut. Faring adalah jalur bersama untuk udara dan makanan." },
      { type: "p", text: "Ketika kita menelan, katup di depan kerongkongan menutup agar makanan tidak masuk ke jalur pernapasan." },
    ],
  },
  {
    id: "r-5",
    no: 5,
    title: "Laring",
    lead: "Pangkal tenggorokan",
    blocks: [
      { type: "p", text: "Laring berada di bawah faring dan menghubungkan faring dengan trakea. Pita suara berada di dalam laring sehingga laring berkaitan dengan suara yang kita keluarkan." },
      { type: "p", text: "Saat menelan, laring tertutup oleh tutup panggilan (epiglotis) supaya makanan tidak masuk ke trakea." },
    ],
  },
  {
    id: "r-6",
    no: 6,
    title: "Trakea",
    lead: "Batang tenggorok",
    blocks: [
      { type: "p", text: "Trakea atau batang tenggorok adalah saluran udara yang menghubungkan laring dengan bronkus. Dindingnya berupa cincin tulang rawan agar tetap terbuka." },
      { type: "p", text: "Bagian dalam trakea berambut halus dan berlendir untuk menangkap kotoran yang terbawa udara." },
    ],
  },
  {
    id: "r-7",
    no: 7,
    title: "Bronkus",
    lead: "Cabang ke paru-paru",
    blocks: [
      { type: "p", text: "Di bagian bawah trakea, saluran bercabang dua. Setiap cabang disebut bronkus dan masuk ke paru-paru kanan dan paru-paru kiri." },
      { type: "p", text: "Paru-paru kanan umumnya lebih besar dan terbagi menjadi tiga gelambir, sedangkan paru-paru kiri terbagi menjadi dua gelambir karena ada ruang untuk jantung." },
    ],
  },
  {
    id: "r-8",
    no: 8,
    title: "Bronkiolus",
    lead: "Cabang yang makin kecil",
    blocks: [
      { type: "p", text: "Bronkus bercabang lagi menjadi saluran yang lebih kecil bernama bronkiolus. Semakin kecil cabangnya, semakin halus dindingnya." },
      { type: "p", text: "Bronkiolus masih meneruskan udara menuju kelompok kantong udara di ujungnya." },
    ],
  },
  {
    id: "r-9",
    no: 9,
    title: "Alveolus",
    lead: "Tempat bertemunya udara dan darah",
    blocks: [
      { type: "p", text: "Alveolus adalah kantong udara berukuran sangat kecil berjumlah jutaan di dalam paru-paru. Dindingnya sangat tipis dan dikelilingi pembuluh darah halus." },
      { type: "p", text: "Di alveoluslah oksigen berpindah ke darah dan karbon dioksida berpindah dari darah ke udara. Proses ini disebut pertukaran gas." },
    ],
  },
  {
    id: "r-10",
    no: 10,
    title: "Paru-paru",
    lead: "Organ utama pernapasan",
    blocks: [
      { type: "p", text: "Paru-paru berjumlah dua buah, berwarna merah muda, dan sangat lentur. Paru-paru mengembang saat udara masuk dan mengempis saat udara keluar." },
      { type: "p", text: "Paru-paru dilindungi oleh rongga dada, tulang rusuk, dan otot penutup." },
    ],
  },
  {
    id: "r-11",
    no: 11,
    title: "Diafragma",
    lead: "Pompa utama pernapasan",
    blocks: [
      { type: "p", text: "Diafragma adalah otot melengkung yang memisahkan rongga dada dengan rongga perut." },
      { type: "list", items: [
        "Saat berkontraksi, diafragma mendatar dan bergerak ke bawah → rongga dada membesar.",
        "Saat berrelaksasi, diafragma melengkung ke atas → rongga dada mengecil.",
      ] },
    ],
  },
  {
    id: "r-12",
    no: 12,
    title: "Jalur masuk udara",
    lead: "Urutan yang harus dihafal",
    blocks: [
      { type: "flow", items: ["Hidung", "Faring", "Laring", "Trakea", "Bronkus", "Bronkiolus", "Alveolus"] },
      { type: "p", text: "Setelah dari alveolus, oksigen diteruskan ke seluruh tubuh melalui darah." },
    ],
  },
  {
    id: "r-13",
    no: 13,
    title: "Jalur keluarnya udara",
    lead: "Kembali ke luar",
    blocks: [
      { type: "flow", items: ["Alveolus", "Bronkiolus", "Bronkus", "Trakea", "Laring", "Faring", "Hidung"] },
      { type: "p", text: "Udara keluar membawa karbon dioksida dan uap air hasil kerja sel tubuh." },
    ],
  },
  {
    id: "r-14",
    no: 14,
    title: "Inspirasi",
    lead: "Menarik napas",
    blocks: [
      { type: "p", text: "Inspirasi adalah proses masuknya udara ke dalam paru-paru. Pernapasan ini terjadi secara aktif karena ada otot yang bekerja." },
      { type: "list", items: [
        "Otot antartulang rusuk berkontraksi → tulang rusuk naik.",
        "Diafragma berkontraksi dan bergerak ke bawah (mendatar).",
        "Rongga dada membesar dan tekanannya mengecil.",
        "Paru-paru mengembang → udara masuk.",
      ] },
    ],
  },
  {
    id: "r-15",
    no: 15,
    title: "Ekspirasi",
    lead: "Mengembuskan napas",
    blocks: [
      { type: "p", text: "Ekspirasi adalah proses keluarnya udara dari paru-paru. Pada pernapasan normal, ekspirasi berlangsung pasif." },
      { type: "list", items: [
        "Otot antartulang rusuk relaksasi → tulang rusuk turun.",
        "Diafragma relaksasi dan kembali melengkung ke atas.",
        "Rongga dada mengecil dan tekanannya membesar.",
        "Paru-paru mengempis → udara terdorong keluar.",
      ] },
    ],
    reflect: "Jangan tertukar: inspirasi = udara MASUK, ekspirasi = udara KELUAR.",
  },
  {
    id: "r-16",
    no: 16,
    title: "Pernapasan dada",
    lead: "Dada yang naik turun",
    blocks: [
      { type: "p", text: "Pernapasan dada terutama melibatkan otot antartulang rusuk. Pada waktu kita berbaring, pernapasan ini yang paling terlihat karena dada ikut naik dan turun." },
      { type: "list", items: [
        "Inspirasi: otot antartulang rusuk berkontraksi, dada membesar.",
        "Ekspirasi: otot antartulang rusuk relaksasi, dada mengecil.",
      ] },
    ],
  },
  {
    id: "r-17",
    no: 17,
    title: "Pernapasan perut (diafragma)",
    lead: "Perut yang naik turun",
    blocks: [
      { type: "p", text: "Pernapasan perut terutama melibatkan diafragma. Ketika kita berdiri, pernapasan ini lebih banyak terlihat karena perut ikut naik dan turun." },
      { type: "list", items: [
        "Inspirasi: diafragma berkontraksi, mendatar, perut terdorong ke depan.",
        "Ekspirasi: diafragma relaksasi, melengkung ke atas, perut mengecil.",
      ] },
    ],
  },
  {
    id: "r-18",
    no: 18,
    title: "Pertukaran oksigen dan karbon dioksida",
    lead: "Di dalam alveolus",
    blocks: [
      { type: "p", text: "Ketika udara sampai di alveolus, oksigen berpindah ke pembuluh darah karena tekanannya lebih tinggi di udara daripada di darah." },
      { type: "p", text: "Sebaliknya, karbon dioksida berpindah dari darah ke alveolus, lalu dikeluarkan ketika kita mengembuskan napas." },
      { type: "note", text: "Darah membawa oksigen ke seluruh tubuh, sehingga sistem pernapasan dan sistem peredaran darah bekerja bersama-sama." },
    ],
  },
  {
    id: "r-19",
    no: 19,
    title: "Gangguan sistem pernapasan",
    lead: "Yang sering kita dengar",
    blocks: [
      { type: "list", items: [
        "Batuk dan pilek: saluran pernapasan meradang karena kuman atau iritasi.",
        "Asma: saluran udara mengecil sehingga napas terasa sesak, pemicunya bisa debu atau udara dingin.",
        "TBC: penyakit yang menyerang jaringan paru-paru dan bisa dicegah dengan pola hidup bersih.",
        "ISPA: infeksi saluran pernapasan atas yang sering menyerang anak.",
      ] },
      { type: "note", text: "Aplikasi ini tidak untuk diagnosis. Bila sesak berat atau berlanjut, bawa ke tenaga kesehatan." },
    ],
  },
  {
    id: "r-20",
    no: 20,
    title: "Menjaga kesehatan pernapasan",
    lead: "Kebiasaan yang bermanfaat",
    blocks: [
      { type: "list", items: [
        "Berolahraga secara teratur agar paru-paru kuat.",
        "Menghindari asap rokok dan asap kendaraan.",
        "Membakar sampah di tempatnya, tidak membakar sampah sembarangan.",
        "Menjaga kebersihan kamar dan kelas serta membuka jendela agar udara berganti.",
        "Menutup hidung dan mulut dengan siku ketika batuk.",
        "Mencuci tangan untuk mencegah kuman masuk.",
      ] },
      { type: "flow", items: ["Hidung", "Faring", "Laring", "Trakea", "Bronkus", "Bronkiolus", "Alveolus"] },
    ],
    reflect: "Udara bersih dan tubuh aktif adalah amanah yang harus kita jaga bersama.",
  },
];

// ---- Simulasi 1: perjalanan makanan ----
export const SIM_MAKANAN: OrganSim[] = [
  {
    id: "s-mulut",
    name: "Mulut",
    step: 1,
    fun: "Mengunyah dan mencampur makanan dengan air liur.",
    process: "Gigi menghaluskan makanan, lidah mengaduknya, air liur mulai menguraikan zat tepung.",
    quiz: { q: "Apa yang dilakukan gigi pada makanan?", options: ["Menghancurkannya", "Menyerapnya", "Membekukannya", "Membuangnya"], answer: 0, why: "Gigi mengunyah dan menghancurkan makanan agar mudah ditelan." },
  },
  {
    id: "s-faring",
    name: "Faring",
    step: 2,
    fun: "Persimpangan jalur makanan dan jalur udara.",
    process: "Makanan ditelan dan diarahkan ke kerongkongan, sementara jalur udara ditutup.",
    quiz: { q: "Ke mana makanan diarahkan saat menelan?", options: ["Ke trakea", "Ke kerongkongan", "Ke paru-paru", "Ke hidung"], answer: 1, why: "Makanan harus masuk ke kerongkongan, bukan ke jalur pernapasan." },
  },
  {
    id: "s-esofagus",
    name: "Kerongkongan",
    step: 3,
    fun: "Mendorong makanan menuju lambung.",
    process: "Dinding kerongkongan bergerak meremas secara berirama. Ini disebut gerakan peristaltik.",
    quiz: { q: "Dorongan berirama di kerongkongan disebut ...", options: ["Gerakan inspirasi", "Gerakan peristaltik", "Gerakan difusi", "Gerakan refleks"], answer: 1, why: "Gerakan peristaltik mendorong makanan hingga sampai ke lambung." },
  },
  {
    id: "s-lambung",
    name: "Lambung",
    step: 4,
    fun: "Mengaduk makanan dengan cairan lambung.",
    process: "Makanan diaduk dan diuraikan menjadi bubur halus selama beberapa jam.",
    quiz: { q: "Makanan di lambung menjadi ...", options: ["Bubur halus", "Sisa yang keras", "Air", "Udara"], answer: 0, why: "Lambung mengaduk makanan bersama cairan lambung sehingga menjadi bubur halus." },
  },
  {
    id: "s-usushal",
    name: "Usus Halus",
    step: 5,
    fun: "Menguraikan dan menyerap sari-sari makanan.",
    process: "Enzim dari pankreas dan empedu dari hati menyelesaikan pencernaan, lalu sari makanan diserap ke darah.",
    quiz: { q: "Tempat utama penyerapan sari makanan adalah ...", options: ["Usus besar", "Usus halus", "Lambung", "Kerongkongan"], answer: 1, why: "Dinding usus halus berlipat sehingga penyerapan sangat efisien." },
  },
  {
    id: "s-ususbesar",
    name: "Usus Besar",
    step: 6,
    fun: "Menyerap air dan membentuk feses.",
    process: "Sisa makanan kehilangan air sehingga menjadi lebih padat.",
    quiz: { q: "Yang diserap usus besar adalah ...", options: ["Oksigen", "Air", "Cahaya", "Suara"], answer: 1, why: "Usus besar menyerap sebagian air dari sisa makanan." },
  },
  {
    id: "s-rektum",
    name: "Rektum",
    step: 7,
    fun: "Menampung feses sementara.",
    process: "Feses disimpan di rektum sampai tubuh siap mengeluarkannya.",
    quiz: { q: "Rektum berfungsi untuk ...", options: ["Menampung feses", "Mengunyah makanan", "Menghasilkan empedu", "Menyaring udara"], answer: 0, why: "Rektum adalah tempat penampungan feses sebelum dikeluarkan." },
  },
  {
    id: "s-anus",
    name: "Anus",
    step: 8,
    fun: "Mengeluarkan feses dari tubuh.",
    process: "Feses dikeluarkan melalui anus. Buang air besar yang teratur menjaga pencernaan tetap sehat.",
    quiz: { q: "Kapan sebaiknya kita buang air besar?", options: ["Saat ingin, tidak ditunda", "Hanya sekali seminggu", "Setiap malam", "Tidak perlu"], answer: 0, why: "Menunda buang air besar membuat feses menumpuk dan menjadi keras." },
  },
];

// ---- Simulasi 2: jalur pernapasan ----
export const JALUR_UDARA = [
  { name: "Hidung", desc: "Menyaring, menghangatkan, dan melembapkan udara." },
  { name: "Faring", desc: "Jalur bersama makanan dan udara di belakang rongga mulut." },
  { name: "Laring", desc: "Pangkal tenggorok yang berisi pita suara." },
  { name: "Trakea", desc: "Batang tenggorok bercincin tulang rawan." },
  { name: "Bronkus", desc: "Dua cabang utama menuju paru-paru kanan dan kiri." },
  { name: "Bronkiolus", desc: "Saluran kecil cabang bronkus." },
  { name: "Alveolus", desc: "Kantong tempat pertukaran oksigen dan karbon dioksida." },
];

export const INSPIRASI = {
  title: "Inspirasi (menarik napas)",
  air: "Udara masuk ke paru-paru",
  chest: "Rongga dada membesar",
  diaphragm: "Diafragma berkontraksi dan bergerak ke bawah (mendatar)",
  lungs: "Paru-paru mengembang",
};

export const EKSPIRASI = {
  title: "Ekspirasi (mengembuskan napas)",
  air: "Udara keluar dari paru-paru",
  chest: "Rongga dada mengecil",
  diaphragm: "Diafragma relaksasi dan kembali melengkung ke atas",
  lungs: "Paru-paru mengempis secara normal",
};

export const BANDING_DADA_PERUT = [
  { label: "Otot yang utama bekerja", dada: "Otot antartulang rusuk", perut: "Diafragma (otot pernapasan perut)" },
  { label: "Perubahan rongga dada", dada: "Bergantung pada gerak tulang rusuk", perut: "Bergantung pada gerak diafragma" },
  { label: "Saat inspirasi", dada: "Tulang rusuk terangkat, dada membesar", perut: "Diafragma mendatar, perut terdorong ke depan" },
  { label: "Saat ekspirasi", dada: "Tulang rusuk turun, dada mengecil", perut: "Diafragma melengkung ke atas, perut mengecil" },
  { label: "Gerakan yang terlihat", dada: "Dada naik dan turun (jelas saat berbaring)", perut: "Perut naik dan turun (jelas saat berdiri)" },
];

export const PETUNJUK: { title: string; items: string[] }[] = [
  {
    title: "Cara belajar di aplikasi ini",
    items: [
      "Mulai dari menu Materi, lalu baca materi sistem pencernaan dan sistem pernapasan sampai selesai.",
      "Buka menu Simulasi untuk mengikuti perjalanan makanan, jalur udara, serta gerakan diafragma.",
      "Kerjakan Latihan A-STS dengan mode Latihan untuk langsung mengetahui pembahasan.",
      "Gunakan mode Simulasi A-STS untuk latihan tanpa jawaban yang langsung terbuka, seperti tes sesungguhnya.",
      "Periksa halaman Hasil Saya untuk melihat nilai, riwayat, dan lencana yang didapat.",
    ],
  },
  {
    title: "Aturan penggunaan yang baik",
    items: [
      "Jawablah dengan jujur. Hasil yang jujur membantu kita tahu materi yang perlu dipelajari lagi.",
      "Gunakan hasil latihan sebagai umpan balik belajar, bukan untuk menilai kemampuan teman.",
      "Bila ada jawaban yang keliru, baca pembahasan sebelum mencoba lagi.",
      "Progres tersimpan di perangkat ini memakai penyimpanan browser. Gunakan perangkat yang sama agar riwayat tidak hilang.",
    ],
  },
  {
    title: "Catatan",
    items: [
      "Materi dan soal disusun untuk latihan IPAS kelas VI SD dengan topik sistem tubuh manusia.",
      "Aplikasi ini bukan alat diagnosis medis. Untuk keluhan kesehatan, sampaikan kepada orang tua atau tenaga kesehatan.",
      "Informasi tingkat kognitif (C4, C5, C6) pada soal HOTS ditampilkan untuk keperluan mode guru dan halaman pembahasan.",
    ],
  },
];
