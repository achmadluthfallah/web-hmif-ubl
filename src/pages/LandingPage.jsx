import { useState } from 'react';
import { INITIAL_STRUCTURE, INITIAL_GALLERY } from '../data/dummyData.js';

// Komponen Kartu Pengurus (Menyesuaikan gaya nameplate kuning-putih pada poster)
function MemberCard({ nama, jabatan, foto, size = 'md' }) {
  const avatarSize =
    size === 'lg'
      ? 'w-24 h-24'
      : size === 'sm'
      ? 'w-14 h-14'
      : 'w-20 h-20';

  return (
    <div className="flex flex-col items-center text-center group">
      {/* Bingkai Foto */}
      <div
        className={`${avatarSize} rounded-full overflow-hidden bg-[#162c4b] border-2 border-[#F1C40F] shadow-md flex items-center justify-center mb-2 group-hover:scale-105 transition`}
      >
        {foto ? (
          <img
            src={foto}
            alt={nama}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <svg
            className="w-2/3 h-2/3 text-white/70 mt-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        )}
      </div>

      {/* Nameplate Kuning & Jabatan Putih (Sesuai Poster) */}
      <div className="w-full max-w-[175px] shadow-md rounded overflow-hidden">
        <div className="bg-[#F1C40F] text-[#21416e] font-extrabold text-[10px] sm:text-[11px] px-2 py-1 leading-tight uppercase tracking-tight">
          {nama}
        </div>
        <div className="bg-white text-[#21416e] font-bold text-[8.5px] sm:text-[9px] px-1.5 py-0.5 leading-tight uppercase border-t border-[#21416e]/10">
          {jabatan}
        </div>
      </div>
    </div>
  );
}

export default function LandingPage({ setActivePage, galeri = [], berita = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeBerita, setActiveBerita] = useState(null);

  // Gunakan data Galeri dari Supabase (jika ada), fallback ke INITIAL_GALLERY
  const galleryItems =
    galeri && galeri.length > 0
      ? galeri.map((item) => ({
          ...item,
          foto: item.gambar || item.foto,
          deskripsi:
            item.deskripsi ||
            'Dokumentasi kegiatan resmi Himpunan Mahasiswa Informatika Universitas Bandar Lampung.',
        }))
      : INITIAL_GALLERY;

  // Gabungkan kategori bawaan dengan kategori baru yang diinput Kominfo/Litbang
  const categories = [
    'Semua',
    ...Array.from(
      new Set([
        'SDM',
        'Kominfo',
        'Litbang',
        ...galleryItems.map((item) => item.kategori).filter(Boolean),
      ])
    ),
  ];

  const filteredGallery =
    selectedCategory === 'Semua'
      ? galleryItems
      : galleryItems.filter((item) => item.kategori === selectedCategory);

  return (
    <main className="flex-1">
      {/* ==================== HERO SECTION ==================== */}
      <section
        id="beranda"
        className="relative min-h-screen flex items-center justify-center bg-[#21416e] text-white pt-20"
      >
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#21416e]/90 via-[#21416e]/80 to-[#21416e]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            BERSAMA MEMBANGUN INFORMATIKA
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 font-light max-w-2xl mx-auto">
            Sinergi, Inovasi, dan Dedikasi untuk HMIF UBL
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActivePage('login')}
              className="w-full sm:w-auto bg-[#F1C40F] hover:bg-yellow-500 text-[#21416e] font-bold px-8 py-3.5 rounded-lg shadow-lg transition transform hover:-translate-y-0.5"
            >
              Portal Pengurus
            </button>
            <a
              href="#profil"
              className="w-full sm:w-auto border-2 border-white hover:bg-white hover:text-[#21416e] text-white font-semibold px-8 py-3.5 rounded-lg transition"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </section>

      {/* ==================== SECTION: TENTANG KAMI ==================== */}
      <section id="profil" className="py-20 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#F3F4F6]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Pengurus HMIF UBL"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[#F1C40F] font-bold text-sm tracking-wider uppercase">
                Tentang Kami
              </span>
              <h2 className="text-3xl font-bold text-[#21416e] mt-1">Visi & Misi HMIF UBL</h2>
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong>Visi:</strong> Mewujudkan Himpunan Mahasiswa Informatika Universitas Bandar
                Lampung sebagai wadah pengembangan potensi mahasiswa yang unggul, berintegritas,
                dan berdaya saing di bidang teknologi informasi.
              </p>
              <p>
                <strong>Misi:</strong> Menyelenggarakan kegiatan kaderisasi berkelanjutan, membangun
                jejaring alumni & industri, serta aktif dalam riset dan publikasi teknologi.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-xl font-semibold text-[#21416e] mb-2">Sejarah Singkat</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                HMIF UBL didirikan sebagai organisasi kemahasiswaan independen di lingkungan Program
                Studi Informatika Universitas Bandar Lampung untuk memfasilitasi aspirasi, minat,
                dan bakat mahasiswa dalam bidang akademik maupun non-akademik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION: STRUKTUR KEPENGURUSAN (SESUAI BAGAN) ==================== */}
      <section
        id="struktur"
        className="py-20 bg-gradient-to-b from-[#1a3459] via-[#21416e] to-[#162c4b] text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Judul Bagan */}
          <div className="text-center mb-12 space-y-2">
            <p className="text-[#F1C40F] font-extrabold tracking-widest text-sm sm:text-base uppercase">
              STRUKTUR KEPENGURUSAN
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              Himpunan Mahasiswa Informatika
              <span className="block text-xl sm:text-3xl mt-1">Universitas Bandar Lampung</span>
            </h2>
            <div className="pt-2">
              <span className="inline-block bg-white text-[#F1C40F] drop-shadow font-extrabold text-sm sm:text-lg px-6 py-1.5 rounded-lg tracking-wider">
                PERIODE {INITIAL_STRUCTURE.periode}
              </span>
            </div>
          </div>

          {/* LEVEL 1: MUBES -> PEMBINA -> DPH & KETUA UMUM */}
          <div className="flex flex-col items-center">
            {/* MUBES */}
            <div className="bg-white text-[#21416e] font-extrabold text-xs sm:text-sm px-6 py-1.5 rounded shadow">
              MUBES
            </div>

            {/* Garis Vertikal & Cabang PEMBINA */}
            <div className="relative flex items-center justify-center w-full max-w-md h-12">
              <div className="w-0.5 h-full bg-white/80"></div>
              <div className="absolute left-1/2 flex items-center">
                <div className="w-8 sm:w-14 border-t-2 border-dashed border-white/80"></div>
                <div className="bg-white text-[#21416e] font-extrabold text-xs px-4 py-1 rounded shadow whitespace-nowrap">
                  PEMBINA
                </div>
              </div>
            </div>

            {/* KETUA UMUM & Cabang DPH */}
            <div className="relative flex items-center justify-center w-full max-w-xl">
              {/* DPH di Sebelah Kiri */}
              <div className="hidden sm:flex items-center mr-4">
                <div className="bg-white text-[#21416e] font-extrabold text-xs px-5 py-1 rounded shadow">
                  DPH
                </div>
                <div className="w-10 border-t-2 border-dashed border-white/80"></div>
              </div>

              <MemberCard
                nama={INITIAL_STRUCTURE.ketuaUmum.nama}
                jabatan={INITIAL_STRUCTURE.ketuaUmum.jabatan}
                foto={INITIAL_STRUCTURE.ketuaUmum.foto}
                size="lg"
              />
            </div>

            {/* DPH versi mobile */}
            <div className="sm:hidden mt-3">
              <span className="bg-white text-[#21416e] font-extrabold text-xs px-4 py-1 rounded shadow">
                Garis Koordinasi: DPH
              </span>
            </div>

            {/* Garis Vertikal ke Wakil Ketua */}
            <div className="w-0.5 h-8 bg-white/80"></div>

            {/* LEVEL 2: SEKRETARIS --- WAKIL KETUA --- BENDAHARA */}
            <div className="w-full max-w-6xl bg-white/5 border border-white/15 rounded-2xl p-6 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                {/* Wakil Sekretaris & Sekretaris Umum */}
                {INITIAL_STRUCTURE.sekretaris.map((item) => (
                  <div key={item.id} className="relative flex justify-center">
                    <MemberCard nama={item.nama} jabatan={item.jabatan} foto={item.foto} />
                  </div>
                ))}

                {/* Wakil Ketua (Tengah) */}
                <div className="relative flex justify-center order-first lg:order-none">
                  <div className="p-2 rounded-2xl bg-[#F1C40F]/10 border border-[#F1C40F]/40">
                    <MemberCard
                      nama={INITIAL_STRUCTURE.wakilKetua.nama}
                      jabatan={INITIAL_STRUCTURE.wakilKetua.jabatan}
                      foto={INITIAL_STRUCTURE.wakilKetua.foto}
                      size="lg"
                    />
                  </div>
                </div>

                {/* Bendahara Umum & Wakil Bendahara */}
                {INITIAL_STRUCTURE.bendahara.map((item) => (
                  <div key={item.id} className="relative flex justify-center">
                    <MemberCard nama={item.nama} jabatan={item.jabatan} foto={item.foto} />
                  </div>
                ))}
              </div>
            </div>

            {/* Garis Penghubung ke 3 Departemen */}
            <div className="w-0.5 h-8 bg-white/80"></div>
            <div className="hidden lg:block w-2/3 border-t-2 border-white/80"></div>

            {/* LEVEL 3: 3 DEPARTEMEN (KOMINFO, SDM, LITBANG) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full mt-4 lg:mt-0">
              {INITIAL_STRUCTURE.departemen.map((dept) => (
                <div key={dept.id} className="flex flex-col items-center">
                  {/* Garis Vertikal Atas Kolom */}
                  <div className="hidden lg:block w-0.5 h-6 bg-white/80"></div>

                  {/* Box Departemen */}
                  <div className="w-full bg-white/5 border border-white/15 rounded-2xl p-5 flex flex-col items-center space-y-6 h-full">
                    <span className="bg-[#F1C40F] text-[#21416e] font-extrabold text-xs px-4 py-1 rounded-full tracking-wider uppercase shadow">
                      {dept.namaDepartemen}
                    </span>

                    {/* Kepala Departemen */}
                    <MemberCard
                      nama={dept.kadep.nama}
                      jabatan={dept.kadep.jabatan}
                      foto={dept.kadep.foto}
                      size="md"
                    />

                    {/* Garis Pembatas ke Anggota */}
                    <div className="w-full border-t border-dashed border-white/25 pt-5">
                      <p className="text-center text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-4">
                        Anggota Departemen ({dept.anggota.length})
                      </p>

                      {/* Grid Anggota Departemen */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {dept.anggota.map((anggota, idx) => (
                          <MemberCard
                            key={idx}
                            nama={anggota.nama}
                            jabatan={anggota.jabatan}
                            foto={anggota.foto}
                            size="sm"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Garis Vertikal ke ANGGOTA */}
            <div className="w-0.5 h-8 bg-white/80"></div>

            {/* LEVEL 4: BASIS ANGGOTA */}
            <div className="bg-white text-[#21416e] font-extrabold text-sm px-10 py-2 rounded-lg shadow-lg tracking-widest uppercase">
              ANGGOTA
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION: 3 DEPARTEMEN UTAMA ==================== */}
      <section id="departemen" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#21416e]">Pilar Organisasi Kami</h2>
            <p className="text-gray-600 mt-2">
              Tiga departemen utama yang menggerakkan seluruh program kerja HMIF UBL
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F3F4F6]/60 rounded-2xl p-8 border border-gray-100 text-center">
              <div className="w-16 h-16 bg-[#21416e]/10 text-[#21416e] rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-xl">
                SDM
              </div>
              <h3 className="text-xl font-bold text-[#21416e] mb-2">DEPARTEMEN SDM</h3>
              <p className="text-gray-500 text-sm">
                Kaderisasi & Anggota. Mengelola penerimaan pengurus baru, keharmonisan internal, dan
                pengembangan kapasitas anggota.
              </p>
            </div>

            <div className="bg-[#F3F4F6]/60 rounded-2xl p-8 border border-gray-100 text-center">
              <div className="w-16 h-16 bg-[#21416e]/10 text-[#21416e] rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-xl">
                INF
              </div>
              <h3 className="text-xl font-bold text-[#21416e] mb-2">DEPARTEMEN KOMINFO</h3>
              <p className="text-gray-500 text-sm">
                Publikasi & Media. Mengelola informasi publik, branding organisasi, pengelolaan
                website, dan dokumentasi kegiatan.
              </p>
            </div>

            <div className="bg-[#F3F4F6]/60 rounded-2xl p-8 border border-gray-100 text-center">
              <div className="w-16 h-16 bg-[#21416e]/10 text-[#21416e] rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-xl">
                LTB
              </div>
              <h3 className="text-xl font-bold text-[#21416e] mb-2">DEPARTEMEN LITBANG</h3>
              <p className="text-gray-500 text-sm">
                Riset & Evaluasi. Melakukan kajian teknologi, pelatihan akademik, evaluasi program
                kerja, dan pengembangan organisasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION: GALERI FOTO KEGIATAN (DINAMIS DARI SUPABASE) ==================== */}
      <section id="galeri" className="py-20 bg-[#F3F4F6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#F1C40F] bg-[#21416e] px-3 py-1 rounded-full font-bold text-xs tracking-wider uppercase">
                Dokumentasi Program Kerja
              </span>
              <h2 className="text-3xl font-bold text-[#21416e] mt-3">Galeri Kegiatan HMIF UBL</h2>
              <p className="text-gray-600 mt-1 text-sm">
                Rekam jejak berbagai kegiatan, pelatihan, dan pengabdian yang telah dilaksanakan.
              </p>
            </div>

            {/* Filter Kategori Galeri */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                    selectedCategory === cat
                      ? 'bg-[#21416e] text-[#F1C40F] shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Foto Kegiatan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setActivePhoto(item)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer border border-gray-100 flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.foto}
                    alt={item.judul}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#21416e]/90 text-[#F1C40F] text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {item.kategori}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-semibold">{item.tanggal}</p>
                    <h3 className="text-lg font-bold text-[#21416e] mt-1 group-hover:text-blue-700 transition">
                      {item.judul}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{item.deskripsi}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#21416e]">
                    <span>Klik untuk perbesar foto</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION: BERITA & KAJIAN TERBARU (DINAMIS DARI SUPABASE) ==================== */}
      <section id="berita" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-[#F1C40F] font-bold text-sm tracking-wider uppercase">
              Informasi Terkini
            </span>
            <h2 className="text-3xl font-bold text-[#21416e] mt-1">Berita & Kajian Terbaru</h2>
          </div>

          {berita && berita.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {berita.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveBerita(item)}
                  className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={item.gambar}
                      alt={item.judul}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-48 object-cover bg-gray-100"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-semibold uppercase ${
                            item.kategori?.toLowerCase().includes('kajian')
                              ? 'text-amber-500'
                              : 'text-gray-400'
                          }`}
                        >
                          {item.kategori}
                        </span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs font-semibold text-gray-400 uppercase">
                          {item.tanggal}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#21416e] mt-1 mb-2">{item.judul}</h3>
                      <p className="text-gray-500 text-sm line-clamp-3">{item.ringkasan}</p>
                    </div>
                  </div>
                  <div className="px-6 pb-5 text-xs font-semibold text-[#21416e]">
                    Baca selengkapnya →
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
                  alt="Berita 1"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-xs font-semibold text-gray-400">14 OKTOBER 2026</span>
                  <h3 className="text-lg font-bold text-[#21416e] mt-1 mb-2">
                    Pelatihan Web Development untuk Mahasiswa Baru
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Kegiatan workshop internal HMIF UBL guna meningkatkan keterampilan pemrograman
                    React & Tailwind.
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80"
                  alt="Berita 2"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-xs font-semibold text-gray-400">02 OKTOBER 2026</span>
                  <h3 className="text-lg font-bold text-[#21416e] mt-1 mb-2">
                    Open Recruitment Pengurus HMIF UBL Periode Terbaru
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Kesempatan bagi seluruh mahasiswa aktif Informatika UBL untuk bergabung dalam
                    kepengurusan.
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
                  alt="Kajian 1"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-xs font-semibold text-amber-500 uppercase">
                    KAJIAN LITBANG
                  </span>
                  <h3 className="text-lg font-bold text-[#21416e] mt-1 mb-2">
                    Dampak Kecerdasan Buatan di Industri Software
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Kajian akademis Departemen Litbang mengenai adopsi kecerdasan buatan dalam
                    kurikulum informatika.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==================== MODAL LIGHTBOX DETAIL FOTO ==================== */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
          >
            <div className="relative">
              <img
                src={activePhoto.foto}
                alt={activePhoto.judul}
                className="w-full max-h-[60vh] object-cover"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white w-9 h-9 rounded-full flex items-center justify-center font-bold transition"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-[#21416e] text-[#F1C40F] text-xs font-bold px-3 py-1 rounded-full">
                  {activePhoto.kategori}
                </span>
                <span className="text-xs text-gray-500 font-medium">{activePhoto.tanggal}</span>
              </div>
              <h3 className="text-xl font-bold text-[#21416e]">{activePhoto.judul}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{activePhoto.deskripsi}</p>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL DETAIL BERITA / KAJIAN ==================== */}
      {activeBerita && (
        <div
          onClick={() => setActiveBerita(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
          >
            <div className="relative">
              <img
                src={activeBerita.gambar}
                alt={activeBerita.judul}
                className="w-full max-h-[55vh] object-cover"
              />
              <button
                onClick={() => setActiveBerita(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white w-9 h-9 rounded-full flex items-center justify-center font-bold transition"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-[#21416e] text-[#F1C40F] text-xs font-bold px-3 py-1 rounded-full">
                  {activeBerita.kategori}
                </span>
                <span className="text-xs text-gray-500 font-medium">{activeBerita.tanggal}</span>
              </div>
              <h3 className="text-xl font-bold text-[#21416e]">{activeBerita.judul}</h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {activeBerita.ringkasan}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}