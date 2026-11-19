import React from 'react';

export default function LandingPage({ setActivePage, setFormSubmitted, setFormStep }) {
  return (
    <main className="flex-1">
      {/* HERO SECTION */}
      <section id="beranda" className="relative min-h-screen flex items-center justify-center bg-[#21416e] text-white pt-20">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80')` }}
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
              onClick={() => { setActivePage('oprec'); setFormSubmitted(false); setFormStep(1); }}
              className="w-full sm:w-auto bg-[#F1C40F] hover:bg-yellow-500 text-[#21416e] font-bold px-8 py-3.5 rounded-lg shadow-lg transition transform hover:-translate-y-0.5"
            >
              Daftar Kepengurusan
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

      {/* TENTANG KAMI */}
      <section id="profil" className="py-20 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Pengurus" className="rounded-2xl shadow-2xl" />
          </div>
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[#F1C40F] font-bold text-sm tracking-wider uppercase">Tentang Kami</span>
            <h2 className="text-3xl font-bold text-[#21416e]">Visi & Misi HMIF UBL</h2>
            <p className="text-gray-600">Mewujudkan Himpunan Mahasiswa Informatika UBL sebagai wadah pengembangan potensi mahasiswa yang unggul dan berdaya saing.</p>
          </div>
        </div>
      </section>
    </main>
  );
}