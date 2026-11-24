import { useState } from 'react';

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
  handleDeleteGaleri,
  handleAddBerita,
  handleDeleteBerita,
}) {
  const canManageContent = adminUser?.role === 'kominfo' || adminUser?.role === 'litbang';
  const isSuperAdmin = adminUser?.role === 'litbang';

  const [activeTab, setActiveTab] = useState(() =>
    adminUser?.role === 'kominfo' ? 'konten' : 'pendaftar'
  );

  // State Modal Tambah Akun Admin
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAcc, setNewAcc] = useState({ nama: '', username: '', password: '', role: 'sdm' });

  // State Form Galeri Kegiatan (Default Prokja SDM)
  const [newGaleri, setNewGaleri] = useState({
    judul: '',
    tanggal: '',
    kategori: 'SDM',
    gambar: '',
  });

  // State Form Berita & Kajian Terbaru
  const [newBerita, setNewBerita] = useState({
    judul: '',
    tanggal: '',
    kategori: 'Berita',
    ringkasan: '',
    gambar: '',
  });

  const submitAccount = (e) => {
    e.preventDefault();
    handleAddAccount(newAcc);
    setNewAcc({ nama: '', username: '', password: '', role: 'sdm' });
    setShowAddModal(false);
  };

  const submitGaleri = (e) => {
    e.preventDefault();
    handleAddGaleri(newGaleri);
    setNewGaleri({ judul: '', tanggal: '', kategori: 'SDM', gambar: '' });
  };

  const submitBerita = (e) => {
    e.preventDefault();
    handleAddBerita(newBerita);
    setNewBerita({ judul: '', tanggal: '', kategori: 'Berita', ringkasan: '', gambar: '' });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar Navigasi */}
      <aside className="w-full md:w-64 bg-[#21416e] text-white flex flex-col justify-between p-5 shrink-0">
        <div>
          <div className="border-b border-blue-800 pb-4 mb-5">
            <h2 className="text-lg font-extrabold tracking-wide">HMIF ADMIN PANEL</h2>
            <p className="text-xs text-blue-200 mt-1">
              {adminUser?.nama} ({adminUser?.role?.toUpperCase()})
            </p>
          </div>

          <nav className="space-y-2 text-sm">
            {canManageContent && (
              <button
                onClick={() => setActiveTab('konten')}
                className={`w-full text-left px-4 py-2.5 rounded-lg font-semibold transition ${
                  activeTab === 'konten'
                    ? 'bg-yellow-400 text-[#21416e]'
                    : 'hover:bg-blue-800 text-blue-100'
                }`}
              >
                Konten Web (Galeri & Berita)
              </button>
            )}

            <button
              onClick={() => setActiveTab('pendaftar')}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-semibold transition ${
                activeTab === 'pendaftar'
                  ? 'bg-yellow-400 text-[#21416e]'
                  : 'hover:bg-blue-800 text-blue-100'
              }`}
            >
              Data Pendaftar
            </button>

            <button
              onClick={() => setActiveTab('anggota')}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-semibold transition ${
                activeTab === 'anggota'
                  ? 'bg-yellow-400 text-[#21416e]'
                  : 'hover:bg-blue-800 text-blue-100'
              }`}
            >
              Database Anggota
            </button>

            <button
              onClick={() => setActiveTab('aspirasi')}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-semibold transition ${
                activeTab === 'aspirasi'
                  ? 'bg-yellow-400 text-[#21416e]'
                  : 'hover:bg-blue-800 text-blue-100'
              }`}
            >
              Aspirasi & Sistem
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm transition"
        >
          Logout
        </button>
      </aside>

      {/* Konten Utama Dashboard */}
      <main className="flex-1 p-5 md:p-8 space-y-6 overflow-x-auto">
        {/* TAB 1: MANAJEMEN KONTEN WEB (KOMINFO & LITBANG) */}
        {activeTab === 'konten' && canManageContent && (
          <div className="space-y-8">
            {/* Bagian A: Kelola Galeri Kegiatan */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-[#21416e]">
                  Kelola Galeri Kegiatan HMIF
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Tambahkan dokumentasi foto kegiatan berdasarkan program kerja departemen.
                </p>
              </div>

              <form
                onSubmit={submitGaleri}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg border"
              >
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Judul Kegiatan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Seminar Nasional AI 2026"
                    value={newGaleri.judul}
                    onChange={(e) => setNewGaleri({ ...newGaleri, judul: e.target.value })}
                    className="w-full px-3 py-2 border rounded text-sm bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Tanggal</label>
                    <input
                      type="text"
                      required
                      placeholder="24 Nov 2026"
                      value={newGaleri.tanggal}
                      onChange={(e) => setNewGaleri({ ...newGaleri, tanggal: e.target.value })}
                      className="w-full px-3 py-2 border rounded text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Kategori Prokja
                    </label>
                    <select
                      value={newGaleri.kategori}
                      onChange={(e) => setNewGaleri({ ...newGaleri, kategori: e.target.value })}
                      className="w-full px-3 py-2 border rounded text-sm bg-white"
                    >
                      <option value="SDM">Prokja SDM</option>
                      <option value="Litbang">Prokja Litbang</option>
                      <option value="Kominfo">Prokja Kominfo</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    URL Foto Kegiatan (Link Gambar)
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://contoh.com/foto-kegiatan.jpg"
                    value={newGaleri.gambar}
                    onChange={(e) => setNewGaleri({ ...newGaleri, gambar: e.target.value })}
                    className="w-full px-3 py-2 border rounded text-sm bg-white"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#21416e] hover:bg-blue-900 text-white font-bold rounded-lg text-xs transition"
                  >
                    + Publikasikan ke Galeri
                  </button>
                </div>
              </form>

              {/* Daftar Galeri Aktif */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {galeri.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg overflow-hidden bg-white shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <img
                        src={item.gambar}
                        alt={item.judul}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-36 object-cover bg-gray-200"
                      />
                      <div className="p-3">
                        <span className="text-[11px] font-bold px-2 py-0.5 bg-blue-100 text-[#21416e] rounded">
                          Prokja {item.kategori} • {item.tanggal}
                        </span>
                        <h4 className="font-bold text-sm text-gray-800 mt-1.5">{item.judul}</h4>
                      </div>
                    </div>
                    <div className="px-3 pb-3 flex justify-end">
                      <button
                        onClick={() => handleDeleteGaleri(item.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bagian B: Kelola Berita & Kajian Terbaru */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-[#21416e]">
                  Kelola Berita & Kajian Terbaru
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Publikasikan artikel berita organisasi maupun hasil kajian ilmiah terbaru.
                </p>
              </div>

              <form
                onSubmit={submitBerita}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg border"
              >
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Judul Berita / Kajian
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kajian Keamanan Siber Mahasiswa"
                    value={newBerita.judul}
                    onChange={(e) => setNewBerita({ ...newBerita, judul: e.target.value })}
                    className="w-full px-3 py-2 border rounded text-sm bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Tanggal</label>
                    <input
                      type="text"
                      required
                      placeholder="24 Nov 2026"
                      value={newBerita.tanggal}
                      onChange={(e) => setNewBerita({ ...newBerita, tanggal: e.target.value })}
                      className="w-full px-3 py-2 border rounded text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Kategori</label>
                    <select
                      value={newBerita.kategori}
                      onChange={(e) => setNewBerita({ ...newBerita, kategori: e.target.value })}
                      className="w-full px-3 py-2 border rounded text-sm bg-white"
                    >
                      <option value="Berita">Berita</option>
                      <option value="Kajian Litbang">Kajian Litbang</option>
                      <option value="Pengumuman">Pengumuman</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    URL Gambar Cover
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://contoh.com/cover-berita.jpg"
                    value={newBerita.gambar}
                    onChange={(e) => setNewBerita({ ...newBerita, gambar: e.target.value })}
                    className="w-full px-3 py-2 border rounded text-sm bg-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Ringkasan Isi Berita / Kajian
                  </label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Tuliskan ringkasan berita atau poin utama kajian..."
                    value={newBerita.ringkasan}
                    onChange={(e) => setNewBerita({ ...newBerita, ringkasan: e.target.value })}
                    className="w-full px-3 py-2 border rounded text-sm bg-white"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#21416e] hover:bg-blue-900 text-white font-bold rounded-lg text-xs transition"
                  >
                    + Publikasikan Berita / Kajian
                  </button>
                </div>
              </form>

              {/* Tabel Berita & Kajian Aktif */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#21416e] text-white text-xs uppercase">
                      <th className="p-3">Tanggal</th>
                      <th className="p-3">Kategori</th>
                      <th className="p-3">Judul & Ringkasan</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {berita.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="p-3 whitespace-nowrap text-xs text-gray-600">
                          {item.tanggal}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-bold bg-blue-100 text-[#21416e] rounded">
                            {item.kategori}
                          </span>
                        </td>
                        <td className="p-3">
                          <p className="font-bold text-gray-800">{item.judul}</p>
                          <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                            {item.ringkasan}
                          </p>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleDeleteBerita(item.id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DATA PENDAFTAR OPREC */}
        {activeTab === 'pendaftar' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
              <h3 className="text-lg font-bold text-[#21416e]">Data Pendaftar Open Recruitment</h3>
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold"
              >
                Export Data Pendaftar ke CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#21416e] text-white text-xs uppercase">
                    <th className="p-3">Nama</th>
                    <th className="p-3">NPM</th>
                    <th className="p-3">Sem</th>
                    <th className="p-3">Pilihan 1 & 2</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {applicants.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="p-3 font-semibold">{app.nama}</td>
                      <td className="p-3">{app.npm}</td>
                      <td className="p-3">{app.sem}</td>
                      <td className="p-3 text-xs">
                        1: <b>{app.pil1}</b> | 2: {app.pil2}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            app.status === 'Lolos'
                              ? 'bg-green-100 text-green-700'
                              : app.status === 'Gagal'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3 space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Lolos')}
                          className="px-2.5 py-1 bg-green-600 text-white rounded text-xs font-semibold"
                        >
                          Lolos
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Gagal')}
                          className="px-2.5 py-1 bg-red-600 text-white rounded text-xs font-semibold"
                        >
                          Tolak
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DATABASE ANGGOTA */}
        {activeTab === 'anggota' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-[#21416e] mb-5">
              Database Pengurus & Anggota Aktif
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#21416e] text-white text-xs uppercase">
                    <th className="p-3">Nama</th>
                    <th className="p-3">Departemen</th>
                    <th className="p-3">Jabatan</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50">
                      <td className="p-3 font-semibold">{m.nama}</td>
                      <td className="p-3">{m.departemen}</td>
                      <td className="p-3">{m.jabatan}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ASPIRASI & SISTEM (TANPA GRAFIK KUNJUNGAN) */}
        {activeTab === 'aspirasi' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
                <h3 className="text-lg font-bold text-[#21416e]">Tabel Aspirasi Mahasiswa Masuk</h3>
                <button
                  onClick={handleExportAspirasiCSV}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold"
                >
                  Export Data Aspirasi ke CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#21416e] text-white text-xs uppercase">
                      <th className="p-3">Tanggal</th>
                      <th className="p-3">Pengirim</th>
                      <th className="p-3">Isi Aspirasi</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {aspirasi.map((asp) => (
                      <tr key={asp.id} className="hover:bg-gray-50">
                        <td className="p-3 whitespace-nowrap">{asp.tanggal}</td>
                        <td className="p-3 font-semibold">{asp.pengirim}</td>
                        <td className="p-3">{asp.isi}</td>
                        <td className="p-3 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              asp.status === 'Sudah Dibaca'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {asp.status}
                          </span>
                        </td>
                        <td className="p-3 text-right whitespace-nowrap">
                          {asp.status !== 'Sudah Dibaca' ? (
                            <button
                              onClick={() => handleMarkAspirasiRead(asp.id)}
                              className="px-3 py-1 bg-[#21416e] text-white rounded text-xs font-semibold"
                            >
                              Tandai Selesai
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400">Selesai</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pengaturan Akun Admin (Khusus Super Admin / Litbang) */}
            {isSuperAdmin && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
                  <h3 className="text-lg font-bold text-[#21416e]">
                    Pengaturan Akun Admin (Super Admin)
                  </h3>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-[#21416e] rounded-lg text-xs font-bold"
                  >
                    + Tambah Akun Admin
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#21416e] text-white text-xs uppercase">
                        <th className="p-3">Nama Akun</th>
                        <th className="p-3">Username</th>
                        <th className="p-3">Role</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {accounts.map((acc) => (
                        <tr key={acc.id} className="hover:bg-gray-50">
                          <td className="p-3 font-semibold">{acc.nama}</td>
                          <td className="p-3 text-gray-500">@{acc.username}</td>
                          <td className="p-3">
                            <span className="px-2.5 py-1 bg-blue-100 text-[#21416e] rounded text-xs font-bold uppercase">
                              {acc.role}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteAccount(acc.id)}
                              className="px-3 py-1 bg-red-600 text-white rounded text-xs font-semibold"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal Tambah Akun Admin */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4">
            <h4 className="text-base font-bold text-[#21416e]">Tambah Akun Pengurus Baru</h4>
            <form onSubmit={submitAccount} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nama Jabatan / Pengurus
                </label>
                <input
                  type="text"
                  required
                  value={newAcc.nama}
                  onChange={(e) => setNewAcc({ ...newAcc, nama: e.target.value })}
                  placeholder="Contoh: Staff Kominfo"
                  className="w-full px-3 py-2 border rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={newAcc.username}
                  onChange={(e) => setNewAcc({ ...newAcc, username: e.target.value })}
                  placeholder="staff_kominfo"
                  className="w-full px-3 py-2 border rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={newAcc.password}
                  onChange={(e) => setNewAcc({ ...newAcc, password: e.target.value })}
                  placeholder="Password awal"
                  className="w-full px-3 py-2 border rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Role (Hak Akses)
                </label>
                <select
                  value={newAcc.role}
                  onChange={(e) => setNewAcc({ ...newAcc, role: e.target.value })}
                  className="w-full px-3 py-2 border rounded text-sm bg-white"
                >
                  <option value="sdm">SDM</option>
                  <option value="kominfo">Kominfo</option>
                  <option value="litbang">Litbang (Super Admin)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border text-gray-600 rounded text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#21416e] text-white rounded text-xs font-semibold"
                >
                  Simpan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}