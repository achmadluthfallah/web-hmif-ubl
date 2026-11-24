import { useState } from 'react';
import { supabase } from '../supabaseClient';
import heroImg from '../assets/hero.png';

export default function LandingPage({ setActivePage, galeri = [], berita = [] }) {
  const [selectedBerita, setSelectedBerita] = useState(null);

  // State Form Open Recruitment
  const [oprecForm, setOprecForm] = useState({
    nama: '',
    npm: '',
    sem: '3',
    wa: '',
    pil1: 'Kominfo',
    pil2: 'SDM',
    alasan: '',
    berkas: '',
  });
  const [loadingOprec, setLoadingOprec] = useState(false);

  // State Form Aspirasi Mahasiswa
  const [aspirasiForm, setAspirasiForm] = useState({
    pengirim: '',
    isi: '',
  });
  const [loadingAspirasi, setLoadingAspirasi] = useState(false);

  const pengurusInti = [
    { nama: 'Ramadhan Triansyah', jabatan: 'Ketua Umum', departemen: 'BPH' },
    { nama: 'Muhammad Rafli', jabatan: 'Wakil Ketua', departemen: 'BPH' },
    { nama: 'Aura Feronica', jabatan: 'Kepala Departemen', departemen: 'SDM' },
    { nama: 'Naila Aprilia', jabatan: 'Kepala Departemen', departemen: 'Kominfo' },
    { nama: 'Zdahra Zaqya Al Husna', jabatan: 'Kepala Departemen', departemen: 'Litbang' },
  ];

  const handleOprecSubmit = async (e) => {
    e.preventDefault();
    setLoadingOprec(true);

    const payload = {
      nama: oprecForm.nama,
      npm: oprecForm.npm,
      sem: parseInt(oprecForm.sem, 10),
      wa: oprecForm.wa,
      pil1: oprecForm.pil1,
      pil2: oprecForm.pil2,
      alasan: oprecForm.alasan,
      berkas: oprecForm.berkas || '-',
      status: 'Baru',
    };

    const { error } = await supabase.from('applicants').insert([payload]);
    setLoadingOprec(false);

    if (!error) {
      alert('Pendaftaran Open Recruitment berhasil dikirim! Pantau informasi seleksi melalui WhatsApp.');
      setOprecForm({
        nama: '',
        npm: '',
        sem: '3',
        wa: '',
        pil1: 'Kominfo',
        pil2: 'SDM',
        alasan: '',
        berkas: '',
      });
    } else {
      alert('Gagal mengirim pendaftaran: ' + error.message);
    }
  };

  const handleAspirasiSubmit = async (e) => {
    e.preventDefault();
    setLoadingAspirasi(true);

    const tanggalSekarang = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const payload = {
      tanggal: tanggalSekarang,
      pengirim: aspirasiForm.pengirim.trim() || 'Anonim',
      isi: aspirasiForm.isi,
      status: 'Belum Dibaca',
    };

    const { error } = await supabase.from('aspirasi').insert([payload]);
    setLoadingAspirasi(false);

    if (!error) {
      alert('Terima kasih! Aspirasi Anda telah masuk ke sistem pengurus HMIF UBL.');
      setAspirasiForm({ pengirim: '', isi: '' });
    } else {
      alert('Gagal mengirim aspirasi: ' + error.message);
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO / BERANDA */}
      <section
        id="beranda"
        className="bg-gradient-to-br from-[#21416e] via-[#1a3459] to-[#122540] text-white pt-28 pb-20 px-5"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="inline-block px-3.5 py-1 bg-yellow-400 text-[#21416e] font-extrabold text-xs rounded-full uppercase tracking-wider">
              Universitas Bandar Lampung
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Himpunan Mahasiswa Informatika <span className="text-yellow-400">(HMIF UBL)</span>
            </h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Wadah kolaborasi, pengembangan riset teknologi, dan pengabdian mahasiswa Program Studi Teknik Informatika Universitas Bandar Lampung.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#oprec"
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-[#21416e] font-bold rounded-lg text-sm transition"
              >
                Daftar Open Recruitment
              </a>
              <a
                href="#aspirasi"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold rounded-lg text-sm transition"
              >
                Sampaikan Aspirasi
              </a>
              <button
                type="button"
                onClick={() => setActivePage('login')}
                className="px-5 py-3 text-blue-200 hover:text-yellow-400 text-sm font-semibold transition"
              >
                Login Pengurus →
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={heroImg}
              alt="HMIF Universitas Bandar Lampung"
              className="w-full max-w-md rounded-2xl shadow-2xl border-4 border-white/10 object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. PROFIL & VISI MISI */}
      <section id="profil" className="max-w-6xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#21416e]">Profil Organisasi</h2>
          <p className="text-gray-600 text-sm mt-2">
            Membangun ekosistem mahasiswa Informatika yang unggul, inovatif, dan berdaya saing di era digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-[#21416e] mb-2">Visi HMIF UBL</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Menjadikan HMIF Universitas Bandar Lampung sebagai organisasi kemahasiswaan yang aktif, responsif, dan profesional dalam mengembangkan potensi akademik maupun non-akademik mahasiswa Teknik Informatika.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-[#21416e] mb-2">Misi Utama</h3>
            <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside">
              <li>Menyelenggarakan pelatihan teknologi, seminar, dan kajian ilmiah berkala.</li>
              <li>Menjadi jembatan aspirasi antara mahasiswa Informatika dengan pihak program studi.</li>
              <li>Mempererat solidaritas antarangkatan melalui kegiatan kolaboratif.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. STRUKTUR ORGANISASI */}
      <section id="struktur" className="max-w-6xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#21416e]">Struktur Kepengurusan</h2>
          <p className="text-gray-600 text-sm mt-2">
            Badan Pengurus Harian dan Kepala Departemen HMIF UBL.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pengurusInti.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#21416e] text-yellow-400 font-extrabold flex items-center justify-center text-lg shrink-0">
                {p.nama.charAt(0)}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase px-2 py-0.5 bg-blue-50 text-[#21416e] rounded">
                  {p.departemen}
                </span>
                <h3 className="font-bold text-gray-800 text-base mt-1">{p.nama}</h3>
                <p className="text-xs text-gray-500">{p.jabatan}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BERITA & KAJIAN TERBARU (DINAMIS DARI SUPABASE) */}
      <section id="berita" className="max-w-6xl mx-auto px-5">
        <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#21416e]">
              Berita & Kajian Terbaru
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Publikasi informasi kegiatan dan kajian ilmiah dari Departemen Kominfo & Litbang.
            </p>
          </div>
        </div>

        {berita.length === 0 ? (
          <p className="text-sm text-gray-500 bg-white p-6 rounded-xl border text-center">
            Belum ada berita atau kajian yang dipublikasikan.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {berita.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-48 object-cover bg-gray-200"
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs mb-2">
                      <span className="px-2.5 py-0.5 bg-blue-100 text-[#21416e] font-bold rounded">
                        {item.kategori}
                      </span>
                      <span className="text-gray-400">{item.tanggal}</span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-base line-clamp-2">{item.judul}</h3>
                    <p className="text-gray-600 text-xs mt-2 line-clamp-3 leading-relaxed">
                      {item.ringkasan}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <button
                    type="button"
                    onClick={() => setSelectedBerita(item)}
                    className="text-xs font-bold text-[#21416e] hover:underline"
                  >
                    Baca Selengkapnya →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 5. GALERI KEGIATAN (DINAMIS DARI SUPABASE) */}
      <section id="galeri" className="max-w-6xl mx-auto px-5">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#21416e]">Galeri Kegiatan</h2>
          <p className="text-gray-600 text-sm mt-1">
            Dokumentasi program kerja dan aktivitas mahasiswa Informatika UBL.
          </p>
        </div>

        {galeri.length === 0 ? (
          <p className="text-sm text-gray-500 bg-white p-6 rounded-xl border text-center">
            Belum ada dokumentasi kegiatan di galeri.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galeri.map((foto) => (
              <div
                key={foto.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
              >
                <div className="overflow-hidden">
                  <img
                    src={foto.gambar}
                    alt={foto.judul}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-52 object-cover bg-gray-200 group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-bold text-[#21416e] bg-yellow-400/30 px-2 py-0.5 rounded">
                    {foto.kategori} • {foto.tanggal}
                  </span>
                  <h3 className="font-bold text-gray-800 text-sm mt-1.5">{foto.judul}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. OPEN RECRUITMENT & KOTAK ASPIRASI */}
      <section className="max-w-6xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Open Recruitment */}
        <div id="oprec" className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-extrabold text-[#21416e]">Open Recruitment Pengurus</h2>
          <p className="text-xs text-gray-500 mt-1 mb-5">
            Bergabunglah menjadi bagian dari pengurus HMIF UBL periode aktif.
          </p>

          <form onSubmit={handleOprecSubmit} className="space-y-3.5 text-sm">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                value={oprecForm.nama}
                onChange={(e) => setOprecForm({ ...oprecForm, nama: e.target.value })}
                placeholder="Masukkan nama lengkap"
                className="w-full px-3.5 py-2 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">NPM</label>
                <input
                  type="text"
                  required
                  value={oprecForm.npm}
                  onChange={(e) => setOprecForm({ ...oprecForm, npm: e.target.value })}
                  placeholder="Contoh: 23312001"
                  className="w-full px-3.5 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Semester</label>
                <select
                  value={oprecForm.sem}
                  onChange={(e) => setOprecForm({ ...oprecForm, sem: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-lg bg-white"
                >
                  <option value="1">Semester 1</option>
                  <option value="3">Semester 3</option>
                  <option value="5">Semester 5</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nomor WhatsApp</label>
              <input
                type="tel"
                required
                value={oprecForm.wa}
                onChange={(e) => setOprecForm({ ...oprecForm, wa: e.target.value })}
                placeholder="08xxxxxxxxxx"
                className="w-full px-3.5 py-2 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Pilihan Departemen 1</label>
                <select
                  value={oprecForm.pil1}
                  onChange={(e) => setOprecForm({ ...oprecForm, pil1: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-lg bg-white"
                >
                  <option value="Kominfo">Kominfo</option>
                  <option value="SDM">SDM</option>
                  <option value="Litbang">Litbang</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Pilihan Departemen 2</label>
                <select
                  value={oprecForm.pil2}
                  onChange={(e) => setOprecForm({ ...oprecForm, pil2: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-lg bg-white"
                >
                  <option value="SDM">SDM</option>
                  <option value="Kominfo">Kominfo</option>
                  <option value="Litbang">Litbang</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Link Berkas (Google Drive KTM / CV)
              </label>
              <input
                type="text"
                value={oprecForm.berkas}
                onChange={(e) => setOprecForm({ ...oprecForm, berkas: e.target.value })}
                placeholder="https://drive.google.com/..."
                className="w-full px-3.5 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Alasan Bergabung</label>
              <textarea
                rows="3"
                required
                value={oprecForm.alasan}
                onChange={(e) => setOprecForm({ ...oprecForm, alasan: e.target.value })}
                placeholder="Ceritakan motivasi Anda bergabung dengan HMIF UBL..."
                className="w-full px-3.5 py-2 border rounded-lg"
              />
            </div>

            <button
              type="submit"
              disabled={loadingOprec}
              className="w-full py-2.5 bg-[#21416e] hover:bg-blue-900 text-white font-bold rounded-lg transition disabled:opacity-50"
            >
              {loadingOprec ? 'Mengirim Data...' : 'Kirim Pendaftaran'}
            </button>
          </form>
        </div>

        {/* Form Kotak Aspirasi Mahasiswa */}
        <div id="aspirasi" className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#21416e]">Kotak Aspirasi Mahasiswa</h2>
            <p className="text-xs text-gray-500 mt-1 mb-5">
              Sampaikan saran, kritik, maupun masukan untuk kemajuan Program Studi Teknik Informatika UBL.
            </p>

            <form onSubmit={handleAspirasiSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nama / NPM (Opsional — kosongkan jika ingin Anonim)
                </label>
                <input
                  type="text"
                  value={aspirasiForm.pengirim}
                  onChange={(e) => setAspirasiForm({ ...aspirasiForm, pengirim: e.target.value })}
                  placeholder="Anonim"
                  className="w-full px-3.5 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Isi Aspirasi</label>
                <textarea
                  rows="6"
                  required
                  value={aspirasiForm.isi}
                  onChange={(e) => setAspirasiForm({ ...aspirasiForm, isi: e.target.value })}
                  placeholder="Tuliskan aspirasi atau masukan Anda secara jelas..."
                  className="w-full px-3.5 py-2 border rounded-lg"
                />
              </div>

              <button
                type="submit"
                disabled={loadingAspirasi}
                className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-500 text-[#21416e] font-bold rounded-lg transition disabled:opacity-50"
              >
                {loadingAspirasi ? 'Mengirim Aspirasi...' : 'Kirim Aspirasi'}
              </button>
            </form>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-xs text-[#21416e]">
            <b>Catatan:</b> Setiap aspirasi yang masuk akan ditinjau langsung oleh pengurus HMIF UBL dan dapat dipantau tindak lanjutnya pada rapat evaluasi berkala.
          </div>
        </div>
      </section>

      {/* Modal Detail Berita / Kajian */}
      {selectedBerita && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-xl">
            <img
              src={selectedBerita.gambar}
              alt={selectedBerita.judul}
              className="w-full h-56 object-cover bg-gray-200"
            />
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 bg-blue-100 text-[#21416e] font-bold rounded">
                  {selectedBerita.kategori}
                </span>
                <span className="text-gray-400">{selectedBerita.tanggal}</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#21416e]">{selectedBerita.judul}</h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedBerita.ringkasan}
              </p>
              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedBerita(null)}
                  className="px-5 py-2 bg-[#21416e] text-white text-xs font-bold rounded-lg"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}