import React from 'react';

export default function Header({ isScrolled, activePage, setActivePage, setFormSubmitted, setFormStep }) {
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || activePage !== 'landing' 
          ? 'bg-white shadow-md py-3 text-gray-800' 
          : 'bg-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setActivePage('landing')}
        >
          <div className="w-10 h-10 rounded-full bg-[#21416e] flex items-center justify-center font-bold text-[#F1C40F] border border-white/20 shadow-sm">
            IF
          </div>
          <span className={`font-bold text-lg tracking-wider ${isScrolled || activePage !== 'landing' ? 'text-[#21416e]' : 'text-white'}`}>
            HMIF UBL
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button onClick={() => setActivePage('landing')} className="hover:text-[#F1C40F] transition">Beranda</button>
          <a href="#profil" onClick={() => activePage !== 'landing' && setActivePage('landing')} className="hover:text-[#F1C40F] transition">Profil</a>
          <a href="#departemen" onClick={() => activePage !== 'landing' && setActivePage('landing')} className="hover:text-[#F1C40F] transition">Departemen</a>
          <a href="#berita" onClick={() => activePage !== 'landing' && setActivePage('landing')} className="hover:text-[#F1C40F] transition">Berita</a>
          <button onClick={() => { setActivePage('oprec'); setFormSubmitted(false); setFormStep(1); }} className="hover:text-[#F1C40F] transition font-semibold text-[#F1C40F]">Oprec</button>
        </nav>

        <button 
          onClick={() => setActivePage('login')}
          className="bg-[#21416e] hover:bg-[#162c4b] text-white px-5 py-2 rounded-lg text-sm font-semibold transition shadow-md border border-white/10 flex items-center gap-2"
        >
          Login Admin
        </button>
      </div>
    </header>
  );
}