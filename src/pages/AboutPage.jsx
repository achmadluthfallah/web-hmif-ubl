import Reveal from '../components/Reveal.jsx';

export default function AboutPage({ setActivePage }) {
  return (
    <main className="flex-1 pt-20 bg-white text-gray-800 animate-page-in">
      {/* Header Banner Halaman Tentang Kami */}
      <section className="bg-[#21416e] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <Reveal delay={50}>
            <span className="text-[#F1C40F] font-bold text-xs tracking-widest uppercase">
              Profil Organisasi
            </span>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Tentang Kami (About Us)
            </h1>
          </Reveal>
          <Reveal delay={250}>
            <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto">
              Mengenal lebih dekat Himpunan Mahasiswa Informatika Universitas Bandar Lampung.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Konten Utama Tentang Kami */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Reveal direction="left">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#F3F4F6] group">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Pengurus HMIF UBL"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <Reveal direction="right" delay={100}>
              <div>
                <span className="text-[#F1C40F] font-bold text-sm tracking-wider uppercase">
                  Tentang Kami
                </span>
                <h2 className="text-3xl font-bold text-[#21416e] mt-1">Visi & Misi HMIF UBL</h2>
              </div>
            </Reveal>

            <Reveal direction="right" delay={200}>
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
            </Reveal>

            <Reveal direction="right" delay={300}>
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-xl font-semibold text-[#21416e] mb-2">Sejarah Singkat</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  HMIF UBL didirikan sebagai organisasi kemahasiswaan independen di lingkungan Program
                  Studi Informatika Universitas Bandar Lampung untuk memfasilitasi aspirasi, minat,
                  dan bakat mahasiswa dalam bidang akademik maupun non-akademik.
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={400}>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setActivePage('landing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#21416e] hover:bg-blue-900 text-[#F1C40F] font-bold px-6 py-3 rounded-lg text-sm transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow"
                >
                  ← Kembali ke Beranda
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}