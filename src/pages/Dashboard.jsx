import { useState, useEffect, useRef } from 'react';

function compressImageFile(file, maxWidth = 1200, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('File yang dipilih harus berupa gambar (JPG, PNG, WEBP).'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Gagal memproses file gambar.'));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file dari perangkat.'));
    reader.readAsDataURL(file);
  });
}

function getTodayFormatted() {
  return new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function getMenusByRole(roleStr) {
  const role = (roleStr || '').toUpperCase();

  // Departemen SDM: 3 menu utama SDM
  if (role.includes('SDM')) {
    return [
      { id: 'pendaftar', label: 'Data Pendaftar' },
      { id: 'anggota', label: 'Database Anggota' },
      { id: 'aspirasi', label: 'Aspirasi & Sistem' },
    ];
  }

  // Departemen KOMINFO: khusus pengelolaan konten web
  if (role.includes('KOMINFO')) {
    return [{ id: 'konten', label: 'Konten Web (Galeri & Berita)' }];
  }

  // Departemen LITBANG & Admin Utama: memiliki seluruh fitur
  return [
    { id: 'pendaftar', label: 'Data Pendaftar' },
    { id: 'anggota', label: 'Database Anggota' },
    { id: 'aspirasi', label: 'Aspirasi & Sistem' },
    { id: 'konten', label: 'Konten Web (Galeri & Berita)' },
  ];
}

export default function Dashboard({
  adminUser,
  handleLogout,
  applicants = [],
  members = [],
  accounts = [],
  aspirasi = [],
  galeri = [],
  berita = [],
  handleUpdateStatus,
  handleExportCSV,
  handleMarkAspirasiRead,
  handleExportAspirasiCSV,
  handleAddAccount,
  handleDeleteAccount,
  handleAddGaleri,
  handleUpdateGaleri,
  handleDeleteGaleri,
  handleAddBerita,
  handleDeleteBerita,
}) {
  const roleUpper = (adminUser?.role || '').toUpperCase();
  const sidebarMenus = getMenusByRole(roleUpper);

  const [activeTab, setActiveTab] = useState(() => sidebarMenus[0]?.id || 'pendaftar');

  useEffect(() => {
    const allowedIds = sidebarMenus.map((m) => m.id);
    if (!allowedIds.includes(activeTab) && allowedIds.length > 0) {
      setActiveTab(allowedIds[0]);
    }
  }, [roleUpper]);

  // ==================== STATE GALERI ====================
  const [galeriJudul, setGaleriJudul] = useState('');
  const [galeriTanggal, setGaleriTanggal] = useState(getTodayFormatted());
  const [galeriKategori, setGaleriKategori] = useState('SDM');
  const [galeriGambar, setGaleriGambar] = useState('');
  const [galeriFileName, setGaleriFileName] = useState('');
  const [galeriDeskripsi, setGaleriDeskripsi] = useState('');
  const [editingGaleriId, setEditingGaleriId] = useState(null);
  const [isProcessingGaleriImg, setIsProcessingGaleriImg] = useState(false);
  const galeriFileInputRef = useRef(null);

  // ==================== STATE BERITA ====================
  const [beritaJudul, setBeritaJudul] = useState('');
  const [beritaTanggal, setBeritaTanggal] = useState(getTodayFormatted());
  const [beritaKategori, setBeritaKategori] = useState(
    roleUpper.includes('LITBANG') ? 'Kajian Litbang' : 'Berita Kegiatan'
  );
  const [beritaGambar, setBeritaGambar] = useState('');
  const [beritaFileName, setBeritaFileName] = useState('');
  const [beritaRingkasan, setBeritaRingkasan] = useState('');
  const [isProcessingBeritaImg, setIsProcessingBeritaImg] = useState(false);
  const beritaFileInputRef = useRef(null);

  // ==================== STATE AKUN SISTEM ====================
  const [newAccNama, setNewAccNama] = useState('');
  const [newAccUsername, setNewAccUsername] = useState('');
  const [newAccPassword, setNewAccPassword] = useState('');
  const [newAccRole, setNewAccRole] = useState('SDM');

  const handleSelectGaleriFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingGaleriImg(true);
      const dataUrl = await compressImageFile(file);
      setGaleriGambar(dataUrl);
      setGaleriFileName(file.name);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsProcessingGaleriImg(false);
    }
  };

  const handleSelectBeritaFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingBeritaImg(true);
      const dataUrl = await compressImageFile(file);
      setBeritaGambar(dataUrl);
      setBeritaFileName(file.name);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsProcessingBeritaImg(false);
    }
  };

  const resetGaleriForm = () => {
    setGaleriJudul('');
    setGaleriTanggal(getTodayFormatted());
    setGaleriKategori('SDM');
    setGaleriGambar('');
    setGaleriFileName('');
    setGaleriDeskripsi('');
    setEditingGaleriId(null);
    if (galeriFileInputRef.current) galeriFileInputRef.current.value = '';
  };

  const handleSubmitGaleri = async (e) => {
    e.preventDefault();
    if (!galeriJudul.trim() || !galeriGambar) {
      alert('Judul kegiatan dan foto dari perangkat wajib diisi!');
      return;
    }

    const payload = {
      judul: galeriJudul.trim(),
      tanggal: galeriTanggal.trim() || getTodayFormatted(),
      kategori: galeriKategori,
      gambar: galeriGambar,
      deskripsi:
        galeriDeskripsi.trim() ||
        'Dokumentasi kegiatan resmi Himpunan Mahasiswa Informatika Universitas Bandar Lampung.',
    };

    if (editingGaleriId) {
      await handleUpdateGaleri(editingGaleriId, payload);
    } else {
      await handleAddGaleri(payload);
    }
    resetGaleriForm();
  };

  const startEditGaleri = (item) => {
    setEditingGaleriId(item.id);
    setGaleriJudul(item.judul || '');
    setGaleriTanggal(item.tanggal || getTodayFormatted());
    setGaleriKategori(item.kategori || 'SDM');
    setGaleriGambar(item.gambar || item.foto || '');
    setGaleriFileName('Foto tersimpan (pilih file baru jika ingin mengganti)');
    setGaleriDeskripsi(item.deskripsi || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitBerita = async (e) => {
    e.preventDefault();
    if (!beritaJudul.trim() || !beritaGambar || !beritaRingkasan.trim()) {
      alert('Judul berita, foto dari perangkat, dan isi ringkasan wajib diisi!');
      return;
    }

    await handleAddBerita({
      judul: beritaJudul.trim(),
      tanggal: beritaTanggal.trim() || getTodayFormatted(),
      kategori: beritaKategori,
      gambar: beritaGambar,
      ringkasan: beritaRingkasan.trim(),
    });

    setBeritaJudul('');
    setBeritaTanggal(getTodayFormatted());
    setBeritaKategori(
      roleUpper.includes('LITBANG') ? 'Kajian Litbang' : 'Berita Kegiatan'
    );
    setBeritaGambar('');
    setBeritaFileName('');
    setBeritaRingkasan('');
    if (beritaFileInputRef.current) beritaFileInputRef.current.value = '';
  };

  const handleSubmitAccount = async (e) => {
    e.preventDefault();
    if (!newAccNama.trim() || !newAccUsername.trim() || !newAccPassword.trim()) {
      alert('Lengkapi semua kolom akun baru!');
      return;
    }
    await handleAddAccount({
      nama: newAccNama.trim(),
      username: newAccUsername.trim(),
      password: newAccPassword.trim(),
      role: newAccRole,
    });
    setNewAccNama('');
    setNewAccUsername('');
    setNewAccPassword('');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* ==================== SIDEBAR KIRI ==================== */}
      <aside className="w-full md:w-64 bg-[#21416e] text-white flex flex-col justify-between p-5 shrink-0">
        <div>
          <div className="mb-7">
            <h1 className="text-base font-extrabold tracking-wide uppercase">
              HMIF ADMIN PANEL
            </h1>
            <p className="text-xs text-blue-200 mt-0.5">
              {adminUser?.nama || 'Pengurus'} ({roleUpper || 'ADMIN'})
            </p>
          </div>

          <nav className="space-y-2">
            {sidebarMenus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => setActiveTab(menu.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === menu.id
                    ? 'bg-[#F1C40F] text-[#21416e] shadow'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {menu.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6 mt-6">
          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ==================== KONTEN UTAMA ==================== */}
      <main className="flex-1 p-5 sm:p-8 space-y-8 overflow-y-auto">
        {/* TAB 1: DATA PENDAFTAR */}
        {activeTab === 'pendaftar' && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <h2 className="text-base sm:text-lg font-extrabold text-[#21416e]">
                Data Pendaftar Open Recruitment
              </h2>
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
              >
                Export Data Pendaftar ke CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#21416e] text-white uppercase">
                    <th className="p-3.5">Nama</th>
                    <th className="p-3.5">NPM</th>
                    <th className="p-3.5">Sem</th>
                    <th className="p-3.5">Pilihan 1 &amp; 2</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((app) => {
                    const statusLower = (app.status || '').toLowerCase();
                    const isLolos =
                      statusLower === 'lolos' || statusLower === 'diterima';
                    const isGagal =
                      statusLower === 'gagal' || statusLower === 'ditolak';

                    return (
                      <tr
                        key={app.id}
                        className="border-b border-gray-200 hover:bg-gray-50/70"
                      >
                        <td className="p-3.5 font-semibold text-gray-800">
                          {app.nama}
                        </td>
                        <td className="p-3.5 text-gray-700">{app.npm}</td>
                        <td className="p-3.5 text-gray-700">{app.sem}</td>
                        <td className="p-3.5 text-gray-700">
                          1: <strong className="text-gray-900">{app.pil1}</strong> | 2:{' '}
                          {app.pil2}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                              isLolos
                                ? 'bg-emerald-100 text-emerald-700'
                                : isGagal
                                ? 'bg-red-100 text-red-600'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {app.status || 'Menunggu'}
                          </span>
                        </td>
                        <td className="p-3.5 flex gap-1.5">
                          <button
                            onClick={() => handleUpdateStatus(app.id, 'Lolos')}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold cursor-pointer"
                          >
                            Lolos
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(app.id, 'Gagal')}
                            className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold cursor-pointer"
                          >
                            Tolak
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 2: DATABASE ANGGOTA */}
        {activeTab === 'anggota' && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-base sm:text-lg font-extrabold text-[#21416e] mb-5">
              Database Pengurus &amp; Anggota Aktif
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#21416e] text-white uppercase">
                    <th className="p-3.5">Nama</th>
                    <th className="p-3.5">Departemen</th>
                    <th className="p-3.5">Jabatan</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b border-gray-200 hover:bg-gray-50/70"
                    >
                      <td className="p-3.5 font-semibold text-gray-800">
                        {m.nama}
                      </td>
                      <td className="p-3.5 text-gray-700">{m.departemen}</td>
                      <td className="p-3.5 text-gray-700">{m.jabatan}</td>
                      <td className="p-3.5">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                          {m.status || 'Aktif'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 3: ASPIRASI & SISTEM */}
        {activeTab === 'aspirasi' && (
          <div className="space-y-8">
            {/* Tabel Aspirasi Mahasiswa Masuk */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <h2 className="text-base sm:text-lg font-extrabold text-[#21416e]">
                  Tabel Aspirasi Mahasiswa Masuk
                </h2>
                <button
                  onClick={handleExportAspirasiCSV}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
                >
                  Export Data Aspirasi ke CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#21416e] text-white uppercase">
                      <th className="p-3.5">Tanggal</th>
                      <th className="p-3.5">Pengirim</th>
                      <th className="p-3.5">Isi Aspirasi</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aspirasi.map((asp) => {
                      const isRead = asp.status === 'Sudah Dibaca';
                      return (
                        <tr
                          key={asp.id}
                          className="border-b border-gray-200 hover:bg-gray-50/70"
                        >
                          <td className="p-3.5 text-gray-600 whitespace-nowrap">
                            {asp.tanggal}
                          </td>
                          <td className="p-3.5 font-bold text-gray-800 whitespace-nowrap">
                            {asp.pengirim}
                          </td>
                          <td className="p-3.5 text-gray-700">{asp.isi}</td>
                          <td className="p-3.5 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                                isRead
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {asp.status || 'Belum Dibaca'}
                            </span>
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            {isRead ? (
                              <span className="text-gray-400 font-semibold">
                                Selesai
                              </span>
                            ) : (
                              <button
                                onClick={() => handleMarkAspirasiRead(asp.id)}
                                className="px-3 py-1 rounded bg-[#21416e] hover:bg-[#162d4d] text-white text-[11px] font-bold cursor-pointer"
                              >
                                Tandai Dibaca
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Pengaturan Sistem & Akun Stakeholder */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-[#21416e]">
                  Manajemen Akun Sistem Stakeholder
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Tambahkan atau kelola akun akses pengurus departemen ke panel admin.
                </p>
              </div>

              <form
                onSubmit={handleSubmitAccount}
                className="grid grid-cols-1 md:grid-cols-4 gap-3"
              >
                <input
                  type="text"
                  placeholder="Nama Lengkap / Jabatan"
                  value={newAccNama}
                  onChange={(e) => setNewAccNama(e.target.value)}
                  className="px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#21416e]"
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={newAccUsername}
                  onChange={(e) => setNewAccUsername(e.target.value)}
                  className="px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#21416e]"
                />
                <input
                  type="text"
                  placeholder="Password"
                  value={newAccPassword}
                  onChange={(e) => setNewAccPassword(e.target.value)}
                  className="px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#21416e]"
                />
                <div className="flex gap-2">
                  <select
                    value={newAccRole}
                    onChange={(e) => setNewAccRole(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-xs flex-1 focus:outline-none focus:ring-2 focus:ring-[#21416e]"
                  >
                    <option value="SDM">SDM</option>
                    <option value="KOMINFO">KOMINFO</option>
                    <option value="LITBANG">LITBANG</option>
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#21416e] hover:bg-[#162d4d] text-white text-xs font-bold cursor-pointer"
                  >
                    Tambah
                  </button>
                </div>
              </form>

              <div className="space-y-2">
                {accounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-3 rounded-lg border border-gray-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#21416e]">{acc.nama}</span>{' '}
                      <span className="text-gray-500">
                        ({acc.username} • {acc.role})
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteAccount(acc.id)}
                      className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 4: KONTEN WEB (GALERI & BERITA) */}
        {activeTab === 'konten' && (
          <>
            {/* KELOLA GALERI */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="mb-5">
                <h2 className="text-lg font-extrabold text-[#21416e]">
                  {editingGaleriId
                    ? 'Edit Galeri Kegiatan HMIF'
                    : 'Kelola Galeri Kegiatan HMIF'}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Pilih foto langsung dari perangkat Anda serta tambahkan deskripsi kegiatan.
                </p>
              </div>

              <form
                onSubmit={handleSubmitGaleri}
                className="border border-gray-200 rounded-xl p-5 space-y-4 bg-gray-50/40"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6">
                    <label className="block text-xs font-bold text-[#21416e] mb-1">
                      Judul Kegiatan
                    </label>
                    <input
                      type="text"
                      value={galeriJudul}
                      onChange={(e) => setGaleriJudul(e.target.value)}
                      placeholder="Contoh: Seminar Nasional AI 2026"
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#21416e]"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-[#21416e] mb-1">
                      Tanggal
                    </label>
                    <input
                      type="text"
                      value={galeriTanggal}
                      onChange={(e) => setGaleriTanggal(e.target.value)}
                      placeholder="27 Nov 2026"
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#21416e]"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-[#21416e] mb-1">
                      Kategori Prokja
                    </label>
                    <select
                      value={galeriKategori}
                      onChange={(e) => setGaleriKategori(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#21416e]"
                    >
                      <option value="SDM">Prokja SDM</option>
                      <option value="Kominfo">Prokja Kominfo</option>
                      <option value="Litbang">Prokja Litbang</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#21416e] mb-1.5">
                    Pilih Foto Kegiatan (Dari Perangkat)
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 bg-white">
                    <input
                      ref={galeriFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleSelectGaleriFile}
                      className="text-xs text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#21416e] file:text-[#F1C40F] hover:file:bg-[#162d4d] file:cursor-pointer cursor-pointer"
                    />
                    {isProcessingGaleriImg && (
                      <span className="text-xs text-blue-600 font-semibold">
                        Memproses gambar...
                      </span>
                    )}
                    {galeriFileName && !isProcessingGaleriImg && (
                      <span className="text-xs text-gray-500 truncate">
                        {galeriFileName}
                      </span>
                    )}
                  </div>

                  {galeriGambar && (
                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src={galeriGambar}
                        alt="Preview Galeri"
                        className="w-28 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                      <span className="text-xs text-emerald-600 font-semibold">
                        ✓ Foto siap dipublikasikan
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#21416e] mb-1">
                    Deskripsi Galeri (Tampil di Card Galeri)
                  </label>
                  <textarea
                    rows={3}
                    value={galeriDeskripsi}
                    onChange={(e) => setGaleriDeskripsi(e.target.value)}
                    placeholder="Tuliskan deskripsi singkat mengenai kegiatan ini..."
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#21416e]"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  {editingGaleriId && (
                    <button
                      type="button"
                      onClick={resetGaleriForm}
                      className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold transition cursor-pointer"
                    >
                      Batal Edit
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isProcessingGaleriImg}
                    className="px-5 py-2.5 rounded-lg bg-[#21416e] hover:bg-[#162d4d] text-white text-xs font-bold shadow transition cursor-pointer disabled:opacity-50"
                  >
                    {editingGaleriId
                      ? 'Simpan Perubahan Galeri'
                      : '+ Publikasikan ke Galeri'}
                  </button>
                </div>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {galeri.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <img
                        src={item.gambar || item.foto}
                        alt={item.judul}
                        className="w-full h-40 object-cover bg-gray-100"
                      />
                      <div className="p-4">
                        <span className="inline-block text-[10px] font-bold bg-blue-50 text-[#21416e] px-2.5 py-0.5 rounded-full">
                          Prokja {item.kategori} • {item.tanggal}
                        </span>
                        <h3 className="font-bold text-sm text-gray-900 mt-1.5">
                          {item.judul}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {item.deskripsi}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => startEditGaleri(item)}
                        className="px-3 py-1 rounded bg-[#F1C40F] hover:bg-yellow-400 text-[#21416e] text-xs font-bold transition cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteGaleri(item.id)}
                        className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* KELOLA BERITA & KAJIAN */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="mb-5">
                <h2 className="text-lg font-extrabold text-[#21416e]">
                  Kelola Berita &amp; Kajian Terbaru
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Publikasikan artikel berita organisasi maupun hasil kajian ilmiah terbaru dengan foto dari perangkat.
                </p>
              </div>

              <form
                onSubmit={handleSubmitBerita}
                className="border border-gray-200 rounded-xl p-5 space-y-4 bg-gray-50/40"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6">
                    <label className="block text-xs font-bold text-[#21416e] mb-1">
                      Judul Berita / Kajian
                    </label>
                    <input
                      type="text"
                      value={beritaJudul}
                      onChange={(e) => setBeritaJudul(e.target.value)}
                      placeholder="Contoh: Pelatihan Web Development HMIF 2026"
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#21416e]"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-[#21416e] mb-1">
                      Tanggal
                    </label>
                    <input
                      type="text"
                      value={beritaTanggal}
                      onChange={(e) => setBeritaTanggal(e.target.value)}
                      placeholder="27 Nov 2026"
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#21416e]"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-[#21416e] mb-1">
                      Kategori
                    </label>
                    <select
                      value={beritaKategori}
                      onChange={(e) => setBeritaKategori(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#21416e]"
                    >
                      <option value="Berita Kegiatan">Berita Kegiatan</option>
                      <option value="Kajian Litbang">Kajian Litbang</option>
                      <option value="Pengumuman">Pengumuman</option>
                      <option value="Prestasi">Prestasi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#21416e] mb-1.5">
                    Pilih Foto Berita / Kajian (Dari Perangkat)
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 bg-white">
                    <input
                      ref={beritaFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleSelectBeritaFile}
                      className="text-xs text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#21416e] file:text-[#F1C40F] hover:file:bg-[#162d4d] file:cursor-pointer cursor-pointer"
                    />
                    {isProcessingBeritaImg && (
                      <span className="text-xs text-blue-600 font-semibold">
                        Memproses gambar...
                      </span>
                    )}
                    {beritaFileName && !isProcessingBeritaImg && (
                      <span className="text-xs text-gray-500 truncate">
                        {beritaFileName}
                      </span>
                    )}
                  </div>

                  {beritaGambar && (
                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src={beritaGambar}
                        alt="Preview Berita"
                        className="w-28 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                      <span className="text-xs text-emerald-600 font-semibold">
                        ✓ Foto siap dipublikasikan
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#21416e] mb-1">
                    Ringkasan / Isi Berita
                  </label>
                  <textarea
                    rows={4}
                    value={beritaRingkasan}
                    onChange={(e) => setBeritaRingkasan(e.target.value)}
                    placeholder="Tuliskan isi berita atau ringkasan kajian di sini..."
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#21416e]"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isProcessingBeritaImg}
                    className="px-5 py-2.5 rounded-lg bg-[#21416e] hover:bg-[#162d4d] text-white text-xs font-bold shadow transition cursor-pointer disabled:opacity-50"
                  >
                    + Publikasikan Berita
                  </button>
                </div>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {berita.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <img
                        src={item.gambar}
                        alt={item.judul}
                        className="w-full h-40 object-cover bg-gray-100"
                      />
                      <div className="p-4">
                        <span className="inline-block text-[10px] font-bold bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full">
                          {item.kategori} • {item.tanggal}
                        </span>
                        <h3 className="font-bold text-sm text-gray-900 mt-1.5">
                          {item.judul}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-3">
                          {item.ringkasan}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteBerita(item.id)}
                        className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}