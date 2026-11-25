import { INITIAL_STRUCTURE } from '../data/dummyData.js';
import Reveal from '../components/Reveal.jsx';

function MemberCard({ nama, jabatan, foto, size = 'md' }) {
  const avatarSize =
    size === 'lg'
      ? 'w-24 h-24'
      : size === 'sm'
      ? 'w-14 h-14'
      : 'w-20 h-20';

  return (
    <div className="flex flex-col items-center text-center group">
      <div
        className={`${avatarSize} rounded-full overflow-hidden bg-[#162c4b] border-2 border-[#F1C40F] shadow-md flex items-center justify-center mb-2 group-hover:scale-105 group-hover:shadow-yellow-400/20 group-hover:shadow-lg transition-all duration-300`}
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

      <div className="w-full max-w-[175px] shadow-md rounded overflow-hidden transition-transform duration-300 group-hover:-translate-y-0.5">
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

export default function StrukturPage({ setActivePage }) {
  return (
    <main className="flex-1 pt-20 bg-gradient-to-b from-[#1a3459] via-[#21416e] to-[#162c4b] text-white animate-page-in">
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Judul Bagan */}
          <Reveal>
            <div className="text-center mb-12 space-y-2">
              <p className="text-[#F1C40F] font-extrabold tracking-widest text-sm sm:text-base uppercase">
                STRUKTUR KEPENGURUSAN
              </p>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                Himpunan Mahasiswa Informatika
                <span className="block text-xl sm:text-3xl mt-1">Universitas Bandar Lampung</span>
              </h1>
              <div className="pt-2">
                <span className="inline-block bg-white text-[#F1C40F] drop-shadow font-extrabold text-sm sm:text-lg px-6 py-1.5 rounded-lg tracking-wider">
                  PERIODE {INITIAL_STRUCTURE.periode}
                </span>
              </div>
            </div>
          </Reveal>

          {/* LEVEL 1: MUBES -> PEMBINA -> DPH & KETUA UMUM */}
          <div className="flex flex-col items-center">
            <Reveal direction="zoom" delay={100}>
              <div className="bg-white text-[#21416e] font-extrabold text-xs sm:text-sm px-6 py-1.5 rounded shadow">
                MUBES
              </div>
            </Reveal>

            <div className="relative flex items-center justify-center w-full max-w-md h-12">
              <div className="w-0.5 h-full bg-white/80"></div>
              <div className="absolute left-1/2 flex items-center">
                <div className="w-8 sm:w-14 border-t-2 border-dashed border-white/80"></div>
                <div className="bg-white text-[#21416e] font-extrabold text-xs px-4 py-1 rounded shadow whitespace-nowrap">
                  PEMBINA
                </div>
              </div>
            </div>

            <Reveal direction="zoom" delay={200}>
              <div className="relative flex items-center justify-center w-full max-w-xl">
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
            </Reveal>

            <div className="sm:hidden mt-3">
              <span className="bg-white text-[#21416e] font-extrabold text-xs px-4 py-1 rounded shadow">
                Garis Koordinasi: DPH
              </span>
            </div>

            <div className="w-0.5 h-8 bg-white/80"></div>

            {/* LEVEL 2: SEKRETARIS --- WAKIL KETUA --- BENDAHARA */}
            <Reveal className="w-full max-w-6xl">
              <div className="w-full bg-white/5 border border-white/15 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                  {INITIAL_STRUCTURE.sekretaris.map((item) => (
                    <div key={item.id} className="relative flex justify-center">
                      <MemberCard nama={item.nama} jabatan={item.jabatan} foto={item.foto} />
                    </div>
                  ))}

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

                  {INITIAL_STRUCTURE.bendahara.map((item) => (
                    <div key={item.id} className="relative flex justify-center">
                      <MemberCard nama={item.nama} jabatan={item.jabatan} foto={item.foto} />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="w-0.5 h-8 bg-white/80"></div>
            <div className="hidden lg:block w-2/3 border-t-2 border-white/80"></div>

            {/* LEVEL 3: 3 DEPARTEMEN (KOMINFO, SDM, LITBANG) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full mt-4 lg:mt-0">
              {INITIAL_STRUCTURE.departemen.map((dept, index) => (
                <Reveal key={dept.id} delay={index * 150} className="h-full">
                  <div className="flex flex-col items-center h-full">
                    <div className="hidden lg:block w-0.5 h-6 bg-white/80"></div>

                    <div className="w-full bg-white/5 border border-white/15 rounded-2xl p-5 flex flex-col items-center space-y-6 h-full">
                      <span className="bg-[#F1C40F] text-[#21416e] font-extrabold text-xs px-4 py-1 rounded-full tracking-wider uppercase shadow">
                        {dept.namaDepartemen}
                      </span>

                      <MemberCard
                        nama={dept.kadep.nama}
                        jabatan={dept.kadep.jabatan}
                        foto={dept.kadep.foto}
                        size="md"
                      />

                      <div className="w-full border-t border-dashed border-white/25 pt-5">
                        <p className="text-center text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-4">
                          Anggota Departemen ({dept.anggota.length})
                        </p>

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
                </Reveal>
              ))}
            </div>

            <div className="w-0.5 h-8 bg-white/80"></div>

            <Reveal direction="zoom">
              <div className="bg-white text-[#21416e] font-extrabold text-sm px-10 py-2 rounded-lg shadow-lg tracking-widest uppercase">
                ANGGOTA
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="pt-12">
                <button
                  onClick={() => {
                    setActivePage('landing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#F1C40F] hover:bg-yellow-500 text-[#21416e] font-bold px-6 py-3 rounded-lg text-sm transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-lg"
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