import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { INITIAL_GALLERY } from '../data/dummyData.js';
import logoHmif from '../assets/logo-hmif.png';

function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const initialTransform =
    direction === 'left'
      ? '-translate-x-7'
      : direction === 'right'
      ? 'translate-x-7'
      : direction === 'zoom'
      ? 'scale-95'
      : 'translate-y-7';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
          : `opacity-0 ${initialTransform}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function LandingPage({
  setActivePage,
  setSelectedDept,
  galeri = [],
  berita = [],
}) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeBerita, setActiveBerita] = useState(null);

  useEffect(() => {
    const isModalOpen = Boolean(activePhoto || activeBerita);
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
        setActiveBerita(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhoto, activeBerita]);

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

  const categories = ['Semua', 'SDM', 'Kominfo', 'Litbang'];

  const filteredGallery =
    selectedCategory === 'Semua'
      ? galleryItems
      : galleryItems.filter(
          (item) => item.kategori?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const pilarDepartemen = [
    {
      key: 'sdm',
      kode: 'SDM',
      nama: 'DEPARTEMEN SDM',
      deskripsi:
        'Kaderisasi & Anggota. Mengelola penerimaan pengurus baru, keharmonisan internal, dan pengembangan kapasitas anggota.',
    },
    {
      key: 'kominfo',
      kode: 'INF',
      nama: 'DEPARTEMEN KOMINFO',
      deskripsi:
        'Publikasi & Media. Mengelola informasi publik, branding organisasi, pengelolaan website, dan dokumentasi kegiatan.',
    },
    {
      key: 'litbang',
      kode: 'LTB',
      nama: 'DEPARTEMEN LITBANG',
      deskripsi:
        'Riset & Evaluasi. Melakukan kajian teknologi, pelatihan akademik, evaluasi program kerja, dan pengembangan organisasi.',
    },
  ];

  const handleOpenDepartemen = (deptKey) => {
    if (setSelectedDept) setSelectedDept(deptKey);
    setActivePage('departemen');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="flex-1 animate-page-in">
      {/* ==================== HERO SECTION ==================== */}
      <section
        id="beranda"
        className="relative min-h-screen flex items-center bg-[#162d4d] text-white pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f223d]/95 via-[#21416e]/90 to-[#162d4d]/95"></div>
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#F1C40F]/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-blue-400/15 blur-3xl pointer-events-none"></div>
        <div
          className="hidden lg:block absolute inset-y-0 right-0 w-[44%] bg-white/[0.04] border-l border-white/10 pointer-events-none"
          style={{ clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 0% 100%)' }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* KOLOM TEKS & CTA */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-5 lg:space-y-6">
              <Reveal delay={60}>
                <div className="hidden lg:inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#F1C40F] animate-pulse"></span>
                  <span className="text-xs font-bold tracking-widest uppercase text-blue-100">
                    Situs Resmi • HMIF Universitas Bandar Lampung
                  </span>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] lg:leading-[1.1]">
                  BERSAMA MEMBANGUN{' '}
                  <span className="text-[#F1C40F]">INFORMATIKA</span>
                </h1>
              </Reveal>

              <Reveal delay={240}>
                <p className="text-sm sm:text-base lg:text-lg text-blue-100/90 font-light max-w-md sm:max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Sinergi, Inovasi, dan Dedikasi untuk Himpunan Mahasiswa Informatika Universitas
                  Bandar Lampung yang unggul dan berdaya saing.
                </p>
              </Reveal>

              <Reveal delay={340}>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-3 max-w-sm sm:max-w-none mx-auto lg:mx-0">
                  <button
                    onClick={() => {
                      const el = document.getElementById('departemen');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto bg-[#F1C40F] hover:bg-yellow-400 text-[#21416e] font-bold px-8 py-3.5 rounded-full shadow-lg shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer"
                  >
                    Pelajari Lebih Lanjut
                  </button>
                  <button
                    onClick={() => {
                      setActivePage('struktur');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto border border-white/40 hover:border-white hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 transform hover:-translate-y-1 active:scale-95 backdrop-blur-sm cursor-pointer"
                  >
                    Struktur Pengurus
                  </button>
                </div>
              </Reveal>
            </div>

            {/* KOLOM KANAN: Logo HMIF Tanpa Lingkaran (Hanya tampil di PC/Laptop) */}
            <div className="hidden lg:flex lg:col-span-5 justify-end">
              <Reveal direction="zoom" delay={200}>
                <div className="flex items-center justify-center animate-hero-float">
                  <img
                    src={logoHmif}
                    alt="Logo Resmi HMIF UBL"
                    className="w-72 h-72 xl:w-80 xl:h-80 object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,0.45)]"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById('departemen');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="Scroll ke bawah"
          className="hidden lg:block absolute bottom-7 left-1/2 -translate-x-1/2 text-white/70 hover:text-[#F1C40F] transition animate-bounce cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </section>

      {/* ==================== SECTION: 3 PILAR ORGANISASI ==================== */}
      <section id="departemen" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#21416e]">Pilar Organisasi Kami</h2>
              <p className="text-gray-600 mt-2">
                Tiga departemen utama yang menggerakkan seluruh program kerja HMIF UBL
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pilarDepartemen.map((dept, index) => (
              <Reveal key={dept.key} delay={index * 130} className="h-full">
                <div
                  onClick={() => handleOpenDepartemen(dept.key)}
                  className="group h-full bg-[#F3F4F6]/60 hover:bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#21416e]/10 group-hover:bg-[#21416e] text-[#21416e] group-hover:text-[#F1C40F] rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      {dept.kode}
                    </div>
                    <h3 className="text-xl font-bold text-[#21416e] group-hover:text-blue-700 mb-2 transition">
                      {dept.nama}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{dept.deskripsi}</p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-gray-200/80 flex items-center justify-between text-xs font-semibold text-[#21416e]">
                    <span>Klik untuk melihat detail</span>
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION: GALERI FOTO KEGIATAN ==================== */}
      <section id="galeri" className="py-20 bg-[#F3F4F6] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
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

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#21416e] text-[#F1C40F] shadow-md scale-105'
                        : 'bg-white text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map((item, index) => (
              <Reveal key={item.id} delay={(index % 3) * 120} className="h-full">
                <div
                  onClick={() => setActivePhoto(item)}
                  className="group h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer border border-gray-100 flex flex-col justify-between"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.foto}
                      alt={item.judul}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#21416e]/90 text-[#F1C40F] text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                      Prokja {item.kategori}
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
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION: BERITA & KAJIAN TERBARU ==================== */}
      <section id="berita" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="mb-12">
              <span className="text-[#F1C40F] font-bold text-sm tracking-wider uppercase">
                Informasi Terkini
              </span>
              <h2 className="text-3xl font-bold text-[#21416e] mt-1">Berita &amp; Kajian Terbaru</h2>
            </div>
          </Reveal>

          {berita && berita.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {berita.map((item, index) => (
                <Reveal key={item.id} delay={(index % 3) * 120} className="h-full">
                  <div
                    onClick={() => setActiveBerita(item)}
                    className="group h-full rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between bg-white"
                  >
                    <div>
                      <div className="overflow-hidden">
                        <img
                          src={item.gambar}
                          alt={item.judul}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-48 object-cover bg-gray-100 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
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
                        <h3 className="text-lg font-bold text-[#21416e] group-hover:text-blue-700 transition mt-1 mb-2">
                          {item.judul}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-3">{item.ringkasan}</p>
                      </div>
                    </div>
                    <div className="px-6 pb-5 flex items-center justify-between text-xs font-semibold text-[#21416e]">
                      <span>Baca selengkapnya</span>
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Reveal delay={0}>
                <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1.5">
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
                      Pelatihan Pengembangan Web untuk Mahasiswa Baru
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Kegiatan pelatihan internal HMIF UBL guna meningkatkan keterampilan pemrograman
                      React &amp; Tailwind.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1.5">
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
              </Reveal>

              <Reveal delay={240}>
                <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1.5">
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
                      Dampak Kecerdasan Buatan di Industri Perangkat Lunak
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Kajian akademis Departemen Litbang mengenai adopsi kecerdasan buatan dalam
                      kurikulum informatika.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* ==================== MODAL LIGHTBOX DETAIL FOTO (PORTAL DI TENGAH LAYAR) ==================== */}
      {activePhoto &&
        createPortal(
          <div
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl overflow-hidden max-w-xl w-full my-auto shadow-2xl animate-modal-in"
            >
              <div className="relative bg-gray-100">
                <img
                  src={activePhoto.foto}
                  alt={activePhoto.judul}
                  className="w-full max-h-[52vh] object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  aria-label="Tutup"
                  className="absolute top-3 right-3 bg-black/65 hover:bg-black text-white w-9 h-9 rounded-full flex items-center justify-center font-bold transition cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-2.5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-[#21416e] text-[#F1C40F] text-xs font-bold px-3 py-1 rounded-full">
                    Prokja {activePhoto.kategori}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {activePhoto.tanggal}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#21416e]">
                  {activePhoto.judul}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {activePhoto.deskripsi}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ==================== MODAL DETAIL BERITA / KAJIAN (PORTAL DI TENGAH LAYAR) ==================== */}
      {activeBerita &&
        createPortal(
          <div
            onClick={() => setActiveBerita(null)}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl overflow-hidden max-w-xl w-full my-auto shadow-2xl animate-modal-in"
            >
              <div className="relative bg-gray-100">
                <img
                  src={activeBerita.gambar}
                  alt={activeBerita.judul}
                  className="w-full max-h-[50vh] object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActiveBerita(null)}
                  aria-label="Tutup"
                  className="absolute top-3 right-3 bg-black/65 hover:bg-black text-white w-9 h-9 rounded-full flex items-center justify-center font-bold transition cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-2.5 max-h-[40vh] overflow-y-auto">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-[#21416e] text-[#F1C40F] text-xs font-bold px-3 py-1 rounded-full">
                    {activeBerita.kategori}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {activeBerita.tanggal}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#21416e]">
                  {activeBerita.judul}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {activeBerita.ringkasan}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}