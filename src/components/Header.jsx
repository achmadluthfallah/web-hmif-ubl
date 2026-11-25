import { useState, useEffect } from 'react';
import logoHmif from '../assets/logo-hmif.png';

const NAV_ITEMS = [
  { id: 'landing', label: 'Beranda', type: 'page' },
  { id: 'about', label: 'Tentang Kami', type: 'page' },
  { id: 'struktur', label: 'Struktur', type: 'page' },
  { id: 'departemen', label: 'Departemen', type: 'section' },
  { id: 'galeri', label: 'Galeri', type: 'section' },
  { id: 'berita', label: 'Berita', type: 'section' },
];

export function Header({ activePage, setActivePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSection = (sectionId) => {
    setMenuOpen(false);
    if (activePage !== 'landing') {
      setActivePage('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToPage = (page) => {
    setMenuOpen(false);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (item) => {
    if (item.type === 'page') {
      goToPage(item.id);
    } else {
      goToSection(item.id);
    }
  };

  const headerSurface = scrolled
    ? 'bg-white/95 backdrop-blur-md shadow-md h-16 border-b border-gray-200/70'
    : activePage === 'landing'
    ? 'bg-transparent h-20'
    : 'bg-[#21416e] h-[81px]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-300 ease-in-out ${headerSurface}`}
    >
      <style>{`
        @keyframes navLogoEnter {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes navItemEnter {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-logo-enter {
          animation: navLogoEnter 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards;
        }
        .nav-item-enter {
          animation: navItemEnter 0.45s cubic-bezier(0.22, 1, 0.36, 1) backwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        {/* Kiri: Logo & Nama HMIF */}
        <button
          onClick={() => goToPage('landing')}
          className="nav-logo-enter flex items-center gap-3 text-left group cursor-pointer"
        >
          <img
            src={logoHmif}
            alt="Logo HMIF UBL"
            className={`object-contain transition-all duration-300 group-hover:scale-105 ${
              scrolled ? 'w-10 h-10' : 'w-11 h-11'
            }`}
          />
          <div className="leading-tight">
            <span
              className={`block text-base sm:text-lg font-extrabold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-[#21416e]' : 'text-white'
              }`}
            >
              HMIF{' '}
              <span className={scrolled ? 'text-[#d4a500]' : 'text-[#F1C40F]'}>
                UBL
              </span>
            </span>
            <span
              className={`block text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                scrolled ? 'text-gray-500' : 'text-blue-100/85'
              }`}
            >
              Universitas Bandar Lampung
            </span>
          </div>
        </button>

        {/* Kanan: Menu Desktop */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
          {NAV_ITEMS.map((item, idx) => {
            const isActive =
              (item.type === 'page' && activePage === item.id) ||
              (item.id === 'departemen' && activePage === 'departemen');

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                style={{ animationDelay: `${idx * 65}ms` }}
                className={`nav-item-enter relative py-1.5 cursor-pointer transition-colors duration-300 group ${
                  scrolled
                    ? isActive
                      ? 'text-[#21416e] font-bold'
                      : 'text-gray-700 hover:text-[#21416e]'
                    : isActive
                    ? 'text-[#F1C40F] font-bold'
                    : 'text-white/95 hover:text-[#F1C40F]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 rounded-full transition-all duration-300 ${
                    scrolled ? 'bg-[#d4a500]' : 'bg-[#F1C40F]'
                  } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </button>
            );
          })}
        </nav>

        {/* Tombol Hamburger Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors duration-300 cursor-pointer ${
            scrolled
              ? 'text-[#21416e] hover:bg-gray-100'
              : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Dropdown Mobile */}
      {menuOpen && (
        <div
          className={`md:hidden absolute top-full left-0 right-0 px-6 py-4 flex flex-col gap-2 text-sm font-semibold shadow-lg border-t transition-colors duration-300 ${
            scrolled
              ? 'bg-white text-gray-700 border-gray-100'
              : 'bg-[#1a3459] text-white border-white/10'
          }`}
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              (item.type === 'page' && activePage === item.id) ||
              (item.id === 'departemen' && activePage === 'departemen');

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`text-left py-2 px-2 rounded-lg transition ${
                  scrolled
                    ? isActive
                      ? 'text-[#21416e] bg-blue-50 font-bold'
                      : 'hover:text-[#21416e] hover:bg-gray-50'
                    : isActive
                    ? 'text-[#F1C40F] bg-white/10 font-bold'
                    : 'hover:text-[#F1C40F] hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}

export default Header;