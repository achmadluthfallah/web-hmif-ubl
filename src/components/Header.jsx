import React, { useState } from 'react';

export default function Header({ isScrolled, activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    if (activePage !== 'landing') {
      setActivePage('landing');
    }
  };

  const isSolid = isScrolled || activePage !== 'landing' || mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid ? 'bg-white shadow-md py-3 text-gray-800' : 'bg-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            setMobileMenuOpen(false);
            setActivePage('landing');
          }}
        >
          <div className="w-10 h-10 rounded-full bg-[#21416e] flex items-center justify-center font-bold text-[#F1C40F] border border-white/20 shadow-sm shrink-0">
            IF
          </div>
          <span
            className={`font-bold text-lg tracking-wider ${
              isSolid ? 'text-[#21416e]' : 'text-white'
            }`}
          >
            HMIF UBL
          </span>
        </div>

        {/* Navigasi Desktop */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button onClick={handleNavClick} className="hover:text-[#F1C40F] transition">
            Beranda
          </button>
          <a href="#profil" onClick={handleNavClick} className="hover:text-[#F1C40F] transition">
            Profil
          </a>
          <a href="#struktur" onClick={handleNavClick} className="hover:text-[#F1C40F] transition">
            Struktur
          </a>
          <a href="#departemen" onClick={handleNavClick} className="hover:text-[#F1C40F] transition">
            Departemen
          </a>
          <a href="#galeri" onClick={handleNavClick} className="hover:text-[#F1C40F] transition">
            Galeri
          </a>
          <a href="#berita" onClick={handleNavClick} className="hover:text-[#F1C40F] transition">
            Berita
          </a>
        </nav>

        {/* Tombol Kanan (Login & Hamburger Mobile) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setActivePage('login');
            }}
            className="bg-[#21416e] hover:bg-[#162c4b] text-white px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition shadow-md border border-white/10"
          >
            Login Admin
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition ${
              isSolid ? 'text-[#21416e] hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Navigasi Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 shadow-lg text-sm font-semibold text-[#21416e]">
          <button onClick={handleNavClick} className="block w-full text-left py-1.5 hover:text-amber-500">
            Beranda
          </button>
          <a href="#profil" onClick={handleNavClick} className="block py-1.5 hover:text-amber-500">
            Profil
          </a>
          <a href="#struktur" onClick={handleNavClick} className="block py-1.5 hover:text-amber-500">
            Struktur
          </a>
          <a href="#departemen" onClick={handleNavClick} className="block py-1.5 hover:text-amber-500">
            Departemen
          </a>
          <a href="#galeri" onClick={handleNavClick} className="block py-1.5 hover:text-amber-500">
            Galeri
          </a>
          <a href="#berita" onClick={handleNavClick} className="block py-1.5 hover:text-amber-500">
            Berita
          </a>
        </div>
      )}
    </header>
  );
}