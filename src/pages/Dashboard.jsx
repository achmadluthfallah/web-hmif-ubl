import React, { useState } from 'react';

export default function Dashboard({
  adminUser,
  handleLogout,
  applicants,
  members,
  accounts,
  aspirasi,
  handleUpdateStatus,
  handleExportCSV,
  handleMarkAspirasiRead,
  handleExportAspirasiCSV,
  handleAddAccount,
  handleDeleteAccount,
}) {
  const [adminTab, setAdminTab] = useState(adminUser.role === 'litbang' ? 'litbang' : 'ringkasan');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAcc, setNewAcc] = useState({ nama: '', username: '', password: '', role: 'sdm' });

  const onAddAccSubmit = (e) => {
    e.preventDefault();
    handleAddAccount(newAcc);
    setNewAcc({ nama: '', username: '', password: '', role: 'sdm' });
    setShowAddModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#21416e] text-white flex flex-col justify-between p-6 shadow-xl">
        <div className="space-y-8">
          <div className="flex items-center gap-3 border-b border-white/10 pb-6">
            <div className="w-10 h-10 rounded-full bg-white text-[#21416e] flex items-center justify-center font-bold">IF</div>
            <div>
              <h1 className="font-bold text-sm tracking-wide">HMIF UBL ADMIN</h1>
              <p className="text-xs text-amber-300 capitalize">{adminUser.role}</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setAdminTab('ringkasan')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${adminTab === 'ringkasan' ? 'bg-[#F1C40F] text-[#21416e] font-bold' : 'hover:bg-white/10'}`}
            >
              📊 Ringkasan
            </button>

            {(adminUser.role === 'sdm' || adminUser.role === 'litbang') && (
              <>
                <button
                  onClick={() => setAdminTab('sdm-pendaftar')}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${adminTab === 'sdm-pendaftar' ? 'bg-[#F1C40F] text-[#21416e] font-bold' : 'hover:bg-white/10'}`}
                >
                  👥 Data Pendaftar
                </button>
                <button
                  onClick={() => setAdminTab('sdm-anggota')}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${adminTab === 'sdm-anggota' ? 'bg-[#F1C40F] text-[#21416e] font-bold' : 'hover:bg-white/10'}`}
                >
                  📁 Database Anggota
                </button>
              </>
            )}

            {adminUser.role === 'litbang' && (
              <button
                onClick={() => setAdminTab('litbang')}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${adminTab === 'litbang' ? 'bg-[#F1C40F] text-[#21416e] font-bold' : 'hover:bg-white/10'}`}
              >
                📈 Aspirasi & Sistem
              </button>
            )}
          </nav>
        </div>

        <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-sm font-semibold transition">
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-8 space-y-6 overflow-y-auto">
        <header className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-[#21416e]">Dashboard Stakeholder: {adminUser.nama}</h2>
            <p className="text-xs text-gray-500">Username: @{adminUser.username}</p>
          </div>
          <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold uppercase">{adminUser.role}</span>
        </header>

        {/* TAB RINGKASAN */}
        {adminTab === 'ringkasan' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <p className="text-xs text-gray-500 font-semibold">TOTAL PENDAFTAR</p>
              <h3 className="text-3xl font-bold text-[#21416e] mt-2">{applicants.length}</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <p className="text-xs text-gray-500 font-semibold">LOLOS WAWANCARA</p>
              <h3 className="text-3xl font-bold text-green-600 mt-2">{applicants.filter(a => a.status === 'Lolos').length}</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <p className="text-xs text-gray-500 font-semibold">TOTAL ANGGOTA</p>
              <h3 className="text-3xl font-bold text-amber-500 mt-2">{members.length}</h3>
            </div>
          </div>
        )}

        {/* TAB LITBANG: ASPIRASI MAHASISWA & PENGATURAN SISTEM */}
        {adminTab === 'litbang' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#21416e]">Data Aspirasi Mahasiswa & Pengaturan Sistem</h2>

            {/* GRAFIK LALU LINTAS */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#21416e]">Grafik Lalu Lintas Kunjungan Website (2026)</h3>
                <span className="text-xs text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-full">+24% Kenaikan</span>
              </div>
              <div className="h-44 w-full bg-gradient-to-b from-[#21416e]/10 to-transparent rounded-xl flex items-end justify-between px-6 pb-2 pt-8 border">
                {[
                  { m: 'Mei', v: 40 },
                  { m: 'Jun', v: 65 },
                  { m: 'Jul', v: 50 },
                  { m: 'Agt', v: 85 },
                  { m: 'Sep', v: 120 },
                  { m: 'Okt', v: 160 },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 h-full justify-end w-12">
                    <span className="text-[10px] text-gray-500 font-bold">{item.v}</span>
                    <div className="w-full bg-[#21416e] rounded-t-md transition-all duration-500" style={{ height: `${item.v}%` }}></div>
                    <span className="text-xs text-gray-600 font-medium">{item.m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TABEL ASPIRASI MAHASISWA */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="font-bold text-[#21416e]">Tabel Aspirasi Mahasiswa Masuk</h3>
                <button
                  onClick={handleExportAspirasiCSV}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow"
                >
                  Export Data Aspirasi ke CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#21416e] text-white text-xs uppercase">
                    <tr>
                      <th className="p-3">Tanggal</th>
                      <th className="p-3">Pengirim</th>
                      <th className="p-3">Isi Aspirasi</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-gray-700">
                    {aspirasi.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="p-3 whitespace-nowrap text-xs">{item.tanggal}</td>
                        <td className="p-3 font-semibold text-xs whitespace-nowrap">{item.pengirim}</td>
                        <td className="p-3 text-xs">{item.isi}</td>
                        <td className="p-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              item.status === 'Sudah Dibaca' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                          {item.status === 'Belum Dibaca' ? (
                            <button
                              onClick={() => handleMarkAspirasiRead(item.id)}
                              className="bg-[#21416e] text-white text-xs px-3 py-1 rounded hover:bg-[#162c4b] transition"
                            >
                              Tandai Dibaca
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

            {/* PENGATURAN AKUN ADMIN (SUPER ADMIN ONLY) */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#21416e]">Pengaturan Akun Admin (Super Admin)</h3>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#F1C40F] hover:bg-yellow-500 text-[#21416e] text-xs font-bold px-4 py-2 rounded-lg transition shadow"
                >
                  + Tambah Akun Admin
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#21416e] text-white text-xs uppercase">
                    <tr>
                      <th className="p-3">Nama Akun</th>
                      <th className="p-3">Username</th>
                      <th className="p-3">Role</th>
                      <th className="p-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-gray-700">
                    {accounts.map((acc) => (
                      <tr key={acc.id} className="hover:bg-gray-50">
                        <td className="p-3 font-semibold">{acc.nama}</td>
                        <td className="p-3 text-xs text-gray-500">@{acc.username}</td>
                        <td className="p-3">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded font-bold uppercase">{acc.role}</span>
                        </td>
                        <td className="p-3 text-center space-x-2">
                          <button
                            onClick={() => alert(`Password akun ${acc.nama} berhasil direset!`)}
                            className="bg-gray-200 text-gray-700 text-xs px-2.5 py-1 rounded hover:bg-gray-300"
                          >
                            Reset Password
                          </button>
                          <button
                            onClick={() => handleDeleteAccount(acc.id)}
                            className="bg-red-600 text-white text-xs px-2.5 py-1 rounded hover:bg-red-700"
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

        {/* TAB SDM PENDAFTAR */}
        {adminTab === 'sdm-pendaftar' && (
          <div className="bg-white p-6 rounded-xl border space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[#21416e]">Tabel Data Pendaftar Oprec</h3>
              <button onClick={handleExportCSV} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-semibold">
                Export CSV
              </button>
            </div>
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-[#21416e] text-white">
                <tr>
                  <th className="p-3">Nama</th>
                  <th className="p-3">NPM</th>
                  <th className="p-3">Pilihan 1</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {applicants.map((a) => (
                  <tr key={a.id}>
                    <td className="p-3 font-semibold">{a.nama}</td>
                    <td className="p-3">{a.npm}</td>
                    <td className="p-3">{a.pil1}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded text-xs font-bold bg-amber-100 text-amber-800">{a.status}</span>
                    </td>
                    <td className="p-3 space-x-2">
                      <button onClick={() => handleUpdateStatus(a.id, 'Lolos')} className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                        Terima
                      </button>
                      <button onClick={() => handleUpdateStatus(a.id, 'Ditolak')} className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                        Tolak
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL TAMBAH ADMIN */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="font-bold text-[#21416e] border-b pb-2">Tambah Akun Admin Baru</h3>
            <form onSubmit={onAddAccSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nama Akun</label>
                <input
                  type="text"
                  required
                  value={newAcc.nama}
                  onChange={(e) => setNewAcc({ ...newAcc, nama: e.target.value })}
                  placeholder="Contoh: Staff SDM 1"
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
                  placeholder="Contoh: sdm_staff1"
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
                <label className="block text-xs font-bold text-gray-700 mb-1">Role (Hak Akses)</label>
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
                <button type="submit" className="px-4 py-2 bg-[#21416e] text-white rounded text-xs font-semibold">
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