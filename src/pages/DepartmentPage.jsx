import { INITIAL_STRUCTURE, INITIAL_GALLERY } from '../data/dummyData.js';
import Reveal from '../components/Reveal.jsx';

const DEPARTMENT_DETAILS = {
  sdm: {
    kode: 'SDM',
    nama: 'DEPARTEMEN SDM',
    subjudul: 'Sumber Daya Manusia • Kaderisasi & Pengembangan Anggota',
    deskripsi:
      'Departemen Sumber Daya Manusia (SDM) berperan sebagai garda terdepan dalam proses kaderisasi, pengelolaan penerimaan pengurus baru (Open Recruitment), menjaga keharmonisan internal, serta meningkatkan soft-skill dan kapasitas kepemimpinan seluruh anggota HMIF UBL.',
    fokusProkja: [
      'Open Recruitment & Kaderisasi Pengurus Baru HMIF UBL',
      'Latihan Dasar Kepemimpinan Mahasiswa (LDKM)',
      'Upgrading & Malam Keakraban Internal Pengurus',
      'Monitoring Keaktifan & Apresiasi Kinerja Anggota',
    ],
  },
  kominfo: {
    kode: 'INF',
    nama: 'DEPARTEMEN KOMINFO',
    subjudul: 'Komunikasi & Informasi • Publikasi, Media & Branding Organisasi',
    deskripsi:
      'Departemen Komunikasi dan Informasi (Kominfo) bertanggung jawab mengelola arus informasi publik, membangun identitas visual (branding) organisasi, mengelola media sosial serta website resmi HMIF UBL, dan mendokumentasikan seluruh kegiatan himpunan.',
    fokusProkja: [
      'Pengelolaan Website & Kanal Media Sosial Resmi HMIF UBL',
      'Publikasi Informasi Akademik, Prestasi & Agenda Kegiatan',
      'Desain Grafis, Produksi Konten Kreatif & Company Profile',
      'Dokumentasi & Liputan Seluruh Program Kerja Himpunan',
    ],
  },
  litbang: {
    kode: 'LTB',
    nama: 'DEPARTEMEN LITBANG',
    subjudul: 'Penelitian & Pengembangan • Riset Teknologi & Evaluasi Organisasi',
    deskripsi:
      'Departemen Penelitian dan Pengembangan (Litbang) berfokus pada pengembangan keilmuan di bidang teknologi informasi, menyelenggarakan pelatihan teknis dan kajian ilmiah, serta melakukan riset evaluasi demi peningkatan mutu program kerja HMIF UBL.',
    fokusProkja: [
      'Pelatihan & Workshop Pemrograman (Web, Mobile, UI/UX, AI)',
      'Kajian Ilmiah & Diskusi Tren Teknologi Informasi Terkini',
      'Bank Soal, Persiapan Lomba IT & Pembinaan Kompetisi Mahasiswa',
      'Riset Survei Kebutuhan Mahasiswa & Evaluasi Program Kerja',
    ],
  },
};

export default function DepartmentPage({
  selectedDept,
  setSelectedDept,
  setActivePage,
  galeri = [],
}) {
  const deptKey = (selectedDept || 'sdm').toLowerCase();
  const detail = DEPARTMENT_DETAILS[deptKey] || DEPARTMENT_DETAILS.sdm;

  const strukturDept = INITIAL_STRUCTURE?.departemen?.find((d) =>
    d.namaDepartemen?.toLowerCase().includes(deptKey)
  );

  const allGallery =
    galeri && galeri.length > 0
      ? galeri.map((item) => ({
          ...item,
          foto: item.gambar || item.foto,
          deskripsi:
            item.deskripsi ||
            'Dokumentasi kegiatan resmi Himpunan Mahasiswa Informatika Universitas Bandar Lampung.',
        }))
      : INITIAL_GALLERY;

  const deptGallery = allGallery.filter(
    (item) => item.kategori?.toLowerCase() === deptKey
  );

  return (
    <main key={deptKey} className="flex-1 pt-20 bg-gray-50 text-gray-800 animate-page-in">
      {/* Header Banner Departemen */}
      <section className="bg-[#21416e] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => {
              setActivePage('landing');
              setTimeout(() => {
                const el = document.getElementById('departemen');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#F1C40F] hover:underline mb-6 transition-transform hover:-translate-x-1"
          >
            ← Kembali ke Pilar Organisasi
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <span className="inline-block bg-[#F1C40F] text-[#21416e] font-extrabold text-xs px-3 py-1 rounded-full tracking-wider uppercase">
                Pilar Organisasi HMIF UBL
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{detail.nama}</h1>
              <p className="text-blue-100 text-sm sm:text-base">{detail.subjudul}</p>
            </div>

            {/* Navigasi Cepat Antar Departemen */}
            <div className="flex flex-wrap gap-2">
              {['sdm', 'kominfo', 'litbang'].map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedDept(key);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all duration-200 active:scale-95 ${
                    deptKey === key
                      ? 'bg-[#F1C40F] text-[#21416e] shadow scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Konten Deskripsi & Fokus Program Kerja */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <Reveal direction="left">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
                <h2 className="text-2xl font-bold text-[#21416e]">Tentang {detail.nama}</h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {detail.deskripsi}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="right" delay={120}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
                <h3 className="text-lg font-bold text-[#21416e]">Fokus Program Kerja</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  {detail.fokusProkja.map((prokja, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#21416e] text-[#F1C40F] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{prokja}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Susunan Pengurus Departemen */}
        {strukturDept && (
          <Reveal>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-[#21416e]">
                  Pengurus {strukturDept.namaDepartemen}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Periode Kepengurusan {INITIAL_STRUCTURE.periode}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                <div className="bg-[#21416e] text-white rounded-xl p-4 text-center shadow transition-transform duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden border-2 border-[#F1C40F] bg-[#162c4b] flex items-center justify-center">
                    {strukturDept.kadep.foto ? (
                      <img
                        src={strukturDept.kadep.foto}
                        alt={strukturDept.kadep.nama}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <span className="text-[#F1C40F] font-extrabold text-sm">KADEP</span>
                    )}
                  </div>
                  <p className="font-bold text-xs uppercase text-[#F1C40F]">
                    {strukturDept.kadep.nama}
                  </p>
                  <p className="text-[11px] text-blue-100 mt-1">{strukturDept.kadep.jabatan}</p>
                </div>

                {strukturDept.anggota.map((anggota, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1"
                  >
                    <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden border-2 border-[#21416e]/20 bg-[#21416e] flex items-center justify-center">
                      {anggota.foto ? (
                        <img
                          src={anggota.foto}
                          alt={anggota.nama}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <span className="text-white font-bold text-xs">{detail.kode}</span>
                      )}
                    </div>
                    <p className="font-bold text-xs uppercase text-[#21416e]">{anggota.nama}</p>
                    <p className="text-[11px] text-gray-500 mt-1">{anggota.jabatan}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Dokumentasi Kegiatan Departemen */}
        <div className="space-y-6">
          <Reveal>
            <div>
              <h2 className="text-2xl font-bold text-[#21416e]">
                Dokumentasi Program Kerja {detail.nama}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Kegiatan yang telah dilaksanakan oleh {detail.nama}.
              </p>
            </div>
          </Reveal>

          {deptGallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deptGallery.map((item, idx) => (
                <Reveal key={item.id} delay={(idx % 3) * 120} className="h-full">
                  <div className="group h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 border border-gray-100 flex flex-col justify-between">
                    <div>
                      <div className="overflow-hidden">
                        <img
                          src={item.foto}
                          alt={item.judul}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-xs text-gray-400 font-semibold">{item.tanggal}</p>
                        <h3 className="text-base font-bold text-[#21416e] mt-1">{item.judul}</h3>
                        <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                          {item.deskripsi}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 text-sm text-gray-500">
                Belum ada dokumentasi kegiatan yang dipublikasikan untuk {detail.nama}.
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </main>
  );
}