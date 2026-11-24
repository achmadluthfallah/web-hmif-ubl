import { useState, useEffect, lazy, Suspense } from 'react';
import { supabase } from './supabaseClient';

import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const Dashboard = lazy(() => import('./pages/dashboard'));

export default function App() {
  const [adminUser, setAdminUser] = useState(() => {
    const savedUser = localStorage.getItem('hmif_admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activePage, setActivePage] = useState(() => {
    const savedUser = localStorage.getItem('hmif_admin_user');
    return savedUser ? 'dashboard' : 'landing';
  });

  const [isScrolled, setIsScrolled] = useState(false);

  const [applicants, setApplicants] = useState([]);
  const [members, setMembers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [aspirasi, setAspirasi] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const [resAcc, resAsp, resApp, resMem] = await Promise.all([
        supabase.from('accounts').select('*').order('id', { ascending: true }),
        supabase.from('aspirasi').select('*').order('id', { ascending: false }),
        supabase.from('applicants').select('*').order('id', { ascending: true }),
        supabase.from('members').select('*').order('id', { ascending: true }),
      ]);

      if (resAcc.data) setAccounts(resAcc.data);
      if (resAsp.data) setAspirasi(resAsp.data);
      if (resApp.data) setApplicants(resApp.data);
      if (resMem.data) setMembers(resMem.data);
    };

    fetchAllData();

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleFocus = () => fetchAllData();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleLogin = (userObject) => {
    setAdminUser(userObject);
    localStorage.setItem('hmif_admin_user', JSON.stringify(userObject));
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('hmif_admin_user');
    setActivePage('landing');
  };

  const handleUpdateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('applicants')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setApplicants((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
    } else {
      alert('Gagal memperbarui status: ' + error.message);
    }
  };

  const handleMarkAspirasiRead = async (id) => {
    const { error } = await supabase
      .from('aspirasi')
      .update({ status: 'Sudah Dibaca' })
      .eq('id', id);

    if (!error) {
      setAspirasi((prev) =>
        prev.map((asp) => (asp.id === id ? { ...asp, status: 'Sudah Dibaca' } : asp))
      );
    } else {
      alert('Gagal memperbarui aspirasi: ' + error.message);
    }
  };

  const handleAddAccount = async (newAccount) => {
    const { data, error } = await supabase
      .from('accounts')
      .insert([newAccount])
      .select();

    if (!error && data) {
      setAccounts((prev) => [...prev, data[0]]);
      alert('Akun admin baru berhasil disimpan permanen!');
    } else {
      alert('Gagal menambah akun: ' + error.message);
    }
  };

  const handleDeleteAccount = async (id) => {
    const { error } = await supabase
      .from('accounts')
      .delete()
      .eq('id', id);

    if (!error) {
      setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    } else {
      alert('Gagal menghapus akun: ' + error.message);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Nama,NPM,Semester,WhatsApp,Pilihan 1,Pilihan 2,Status\n'];
    const rows = applicants.map(
      (a) => `"${a.nama}","${a.npm}","${a.sem}","${a.wa}","${a.pil1}","${a.pil2}","${a.status}"`
    );
    const blob = new Blob([...headers, rows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Data_Pendaftar_Oprec_HMIF.csv';
    link.click();
  };

  const handleExportAspirasiCSV = () => {
    const headers = ['Tanggal,Pengirim,Isi Aspirasi,Status\n'];
    const rows = aspirasi.map(
      (a) => `"${a.tanggal}","${a.pengirim}","${a.isi}","${a.status}"`
    );
    const blob = new Blob([...headers, rows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Data_Aspirasi_Mahasiswa_HMIF.csv';
    link.click();
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen flex flex-col justify-between">
      {activePage !== 'dashboard' && (
        <Header isScrolled={isScrolled} activePage={activePage} setActivePage={setActivePage} />
      )}

      {activePage === 'landing' && <LandingPage setActivePage={setActivePage} />}

      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center min-h-screen text-[#21416e] font-bold">
            Memuat halaman...
          </div>
        }
      >
        {activePage === 'login' && (
          <LoginPage accounts={accounts} handleLogin={handleLogin} setActivePage={setActivePage} />
        )}
        {activePage === 'dashboard' && adminUser && (
          <Dashboard
            adminUser={adminUser}
            handleLogout={handleLogout}
            applicants={applicants}
            members={members}
            accounts={accounts}
            aspirasi={aspirasi}
            handleUpdateStatus={handleUpdateStatus}
            handleExportCSV={handleExportCSV}
            handleMarkAspirasiRead={handleMarkAspirasiRead}
            handleExportAspirasiCSV={handleExportAspirasiCSV}
            handleAddAccount={handleAddAccount}
            handleDeleteAccount={handleDeleteAccount}
          />
        )}
      </Suspense>

      {activePage !== 'dashboard' && <Footer />}
    </div>
  );
}