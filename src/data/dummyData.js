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
  { id: 1, nama: 'Rian Hidayat', npm: '19312005', departemen: 'SDM', jabatan: 'Ketua Departemen', status: 'Aktif' },
  { id: 2, nama: 'Nadia Putri', npm: '20312012', departemen: 'Kominfo', jabatan: 'Ketua Departemen', status: 'Aktif' },
  { id: 3, nama: 'Fajar Nugraha', npm: '19312030', departemen: 'Litbang', jabatan: 'Ketua Departemen', status: 'Aktif' },
];