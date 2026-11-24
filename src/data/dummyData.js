export const INITIAL_ACCOUNTS = [
  { id: 1, nama: 'Ketua SDM', username: 'sdm_hmif', password: '123', role: 'sdm' },
  { id: 2, nama: 'Ketua Kominfo', username: 'kominfo_hmif', password: '123', role: 'kominfo' },
  { id: 3, nama: 'Ketua Litbang', username: 'litbang_hmif', password: '123', role: 'litbang' },
];

export const INITIAL_ASPIRASI = [
  { id: 1, tanggal: '10 Okt 2026', pengirim: 'Anonim', isi: 'Mohon kajian tentang parkiran Gedung F yang selalu penuh saat jam kuliah.', status: 'Belum Dibaca' },
  { id: 2, tanggal: '09 Okt 2026', pengirim: 'Doni (NPM 21312011)', isi: 'Lomba e-sport HMIF kapan dilaksanakan ya kak?', status: 'Sudah Dibaca' },
  { id: 3, tanggal: '05 Okt 2026', pengirim: 'Anonim', isi: 'Fasilitas stopkontak di ruang sekretariat mohon diperbanyak.', status: 'Belum Dibaca' },
];

export const INITIAL_APPLICANTS = [
  { id: 1, nama: 'Budi Santoso', npm: '21312001', sem: 3, wa: '081234567890', pil1: 'Kominfo', pil2: 'SDM', alasan: 'Ingin mengasah skill desain grafis.', status: 'Baru', berkas: 'KTM_Budi.pdf' },
  { id: 2, nama: 'Siti Rahmawati', npm: '20312015', sem: 5, wa: '082198765432', pil1: 'Litbang', pil2: 'Kominfo', alasan: 'Tertarik bidang riset AI.', status: 'Lolos', berkas: 'KTM_Siti.pdf' },
];

export const INITIAL_MEMBERS = [
  { id: 1, nama: 'Ramadhan Triansyah', npm: '-', departemen: 'BPH', jabatan: 'Ketua Umum', status: 'Aktif' },
  { id: 2, nama: 'Muhammad Rafli', npm: '-', departemen: 'BPH', jabatan: 'Wakil Ketua', status: 'Aktif' },
  { id: 3, nama: 'Ainy Dwi Mukhty', npm: '-', departemen: 'BPH', jabatan: 'Sekretaris Umum', status: 'Aktif' },
  { id: 4, nama: 'Nadiara Fana Puspita', npm: '-', departemen: 'BPH', jabatan: 'Bendahara Umum', status: 'Aktif' },
  { id: 5, nama: 'Aura Feronica', npm: '-', departemen: 'SDM', jabatan: 'Kepala Departemen', status: 'Aktif' },
  { id: 6, nama: 'Naila Aprilia', npm: '-', departemen: 'Kominfo', jabatan: 'Kepala Departemen', status: 'Aktif' },
  { id: 7, nama: 'Zdahra Zaqya Al Husna', npm: '-', departemen: 'Litbang', jabatan: 'Kepala Departemen', status: 'Aktif' },
];

// --- DATA STRUKTUR KEPENGURUSAN PERIODE 2026/2027 ---
export const INITIAL_STRUCTURE = {
  periode: '2026/2027',
  ketuaUmum: {
    nama: 'RAMADHAN TRIANSYAH',
    jabatan: 'KETUA UMUM',
    foto: '', // Isi dengan './images/pengurus/ramadhan.png' jika foto sudah disiapkan
  },
  wakilKetua: {
    nama: 'MUHAMMAD RAFLI',
    jabatan: 'WAKIL KETUA',
    foto: '',
  },
  sekretaris: [
    {
      id: 'waksek',
      nama: 'SAFIRA TRIHAP SARI',
      jabatan: 'WAKIL SEKRETARIS',
      foto: '',
    },
    {
      id: 'sekum',
      nama: 'AINY DWI MUKHTY',
      jabatan: 'SEKRETARIS UMUM',
      foto: '',
    },
  ],
  bendahara: [
    {
      id: 'bendum',
      nama: 'NADIARA FANA PUSPITA',
      jabatan: 'BENDAHARA UMUM',
      foto: '',
    },
    {
      id: 'wakben',
      nama: 'LARAS NATA NEGARA',
      jabatan: 'WAKIL BENDAHARA',
      foto: '',
    },
  ],
  departemen: [
    {
      id: 'kominfo',
      namaDepartemen: 'DEPARTEMEN KOMINFO',
      kadep: {
        nama: 'NAILA APRILIA',
        jabatan: 'KEPALA DEPARTEMEN KOMINFO',
        foto: '',
      },
      anggota: [
        { nama: 'FAIZ AJI SAPTA WIJAYA', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'ARHOF DWI FERDIZA', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'NAJWAN ARGYA ZILGWIN', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'ALLISYA AUREL PUTRI', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'TIRGIAN PRANATA', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'ALYCYA STAHIRA HANAN', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
      ],
    },
    {
      id: 'sdm',
      namaDepartemen: 'DEPARTEMEN SDM',
      kadep: {
        nama: 'AURA FERONICA',
        jabatan: 'KEPALA DEPARTEMEN SDM',
        foto: '',
      },
      anggota: [
        { nama: 'M. EFFINO AL HADID', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'M. JASON ARYA PAMUNGKAS', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'M. FAJAR RAMADHAN ALISYAD', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'AHBID OKTAVIAN WILDANI', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'EKA SETIAWATI', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'CANDRA LUKITA', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'LUCIANA GABRIELA DESTARI', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'SEPTIRA ASYFA MAHARANI', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
      ],
    },
    {
      id: 'litbang',
      namaDepartemen: 'DEPARTEMEN LITBANG',
      kadep: {
        nama: 'ZDAHRA ZAQYA AL HUSNA',
        jabatan: 'KEPALA DEPARTEMEN LITBANG',
        foto: '',
      },
      anggota: [
        { nama: 'DIDI MALIK SAPUTRA', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'MASKUR AFFANDI', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'M. JOHAN SASKIA PERKASA', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'CALYSTA ZAHRA ELYSIA', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'ACHMAD LUTHFALLAH', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'M. RAEHAN AL FAZRI YASIN', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
        { nama: 'ZAHRA BINTANG DEWI S.', jabatan: 'ANGGOTA DEPARTEMEN', foto: '' },
      ],
    },
  ],
};

// --- DATA GALERI FOTO KEGIATAN ---
export const INITIAL_GALLERY = [
  {
    id: 1,
    judul: 'Workshop Web Development React & Tailwind',
    kategori: 'Litbang',
    tanggal: '14 Oktober 2026',
    deskripsi: 'Pelatihan pembuatan website modern bagi mahasiswa baru Program Studi Informatika Universitas Bandar Lampung.',
    foto: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    judul: 'Latihan Dasar Kepemimpinan Mahasiswa (LDKM)',
    kategori: 'SDM',
    tanggal: '28 September 2026',
    deskripsi: 'Kegiatan kaderisasi tahunan untuk membentuk karakter kepemimpinan, kedisiplinan, dan solidaritas pengurus baru.',
    foto: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    judul: 'Seminar Nasional Teknologi & AI',
    kategori: 'Kominfo',
    tanggal: '15 September 2026',
    deskripsi: 'Publikasi dan dokumentasi seminar nasional bersama praktisi industri teknologi informasi.',
    foto: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    judul: 'Malam Keakraban & Gathering Informatika',
    kategori: 'SDM',
    tanggal: '02 September 2026',
    deskripsi: 'Mempererat tali silaturahmi antar angkatan mahasiswa Informatika UBL melalui kegiatan diskusi santai dan games.',
    foto: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    judul: 'Kunjungan Industri & Study Banding',
    kategori: 'Litbang',
    tanggal: '20 Agustus 2026',
    deskripsi: 'Observasi langsung budaya kerja perusahaan teknologi serta bertukar wawasan program kerja antar himpunan.',
    foto: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    judul: 'Produksi Konten Kreatif & Media HMIF',
    kategori: 'Kominfo',
    tanggal: '10 Agustus 2026',
    deskripsi: 'Sesi produksi media informasi, dokumentasi kegiatan, dan pengelolaan branding digital HMIF UBL.',
    foto: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
];