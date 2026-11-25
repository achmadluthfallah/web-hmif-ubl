import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

import Header from './components/Header.jsx';
import * as FooterModule from './components/Footer.jsx';
import LandingPage from './pages/LandingPage.jsx';
import * as AboutModule from './pages/AboutPage.jsx';
import * as StrukturModule from './pages/StrukturPage.jsx';
import * as DepartmentModule from './pages/DepartmentPage.jsx';
import * as LoginModule from './pages/LoginPage.jsx';
import * as DashboardModule from './pages/Dashboard.jsx';

const Footer =
  FooterModule.default || FooterModule.Footer || Object.values(FooterModule)[0];
const AboutPage =
  AboutModule.default || AboutModule.AboutPage || Object.values(AboutModule)[0];
const StrukturPage =
  StrukturModule.default ||
  StrukturModule.StrukturPage ||
  Object.values(StrukturModule)[0];
const DepartmentPage =
  DepartmentModule.default ||
  DepartmentModule.DepartmentPage ||
  Object.values(DepartmentModule)[0];
const LoginPage =
  LoginModule.default || LoginModule.LoginPage || Object.values(LoginModule)[0];
const Dashboard =
  DashboardModule.default ||
  DashboardModule.Dashboard ||
  Object.values(DashboardModule)[0];

const isAdminRoute = () => {
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  return (
    hash === '#admin' ||
    hash === '#login' ||
    path.endsWith('/admin') ||
    path.endsWith('/login')
  );
};

export default function App() {
  const [adminUser, setAdminUser] = useState(() => {
    const savedUser = localStorage.getItem('hmif_admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activePage, setActivePage] = useState(() => {
    const savedUser = localStorage.getItem('hmif_admin_user');
    if (savedUser) return 'dashboard';
    if (isAdminRoute()) return 'login';
    return 'landing';
  });

  const [selectedDept, setSelectedDept] = useState('sdm');
  const [isScrolled, setIsScrolled] = useState(false);

  const [applicants, setApplicants] = useState([]);
  const [members, setMembers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [aspirasi, setAspirasi] = useState([]);
  const [galeri, setGaleri] = useState([]);
  const [berita, setBerita] = useState([]);

  // Ambil data dari Supabase + listener scroll
  useEffect(() => {
    const fetchAllData = async () => {
      const [resAcc, resAsp, resApp, resMem, resGal, resBer] = await Promise.all([
        supabase.from('accounts').select('*').order('id', { ascending: true }),
        supabase.from('aspirasi').select('*').order('id', { ascending: false }),
        supabase.from('applicants').select('*').order('id', { ascending: true }),
        supabase.from('members').select('*').order('id', { ascending: true }),
        supabase.from('galeri').select('*').order('id', { ascending: false }),
        supabase.from('berita').select('*').order('id', { ascending: false }),
      ]);

      if (resAcc.data) setAccounts(resAcc.data);
      if (resAsp.data) setAspirasi(resAsp.data);
      if (resApp.data) setApplicants(resApp.data);
      if (resMem.data) setMembers(resMem.data);
      if (resGal.data) setGaleri(resGal.data);
      if (resBer.data) setBerita(resBer.data);
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

  // Akses tersembunyi ke Login Admin via #admin / #login atau Ctrl + Shift + L
  useEffect(() => {
    const checkAdminAccess = () => {
      if (isAdminRoute()) {
        setActivePage(adminUser ? 'dashboard' : 'login');
      }
    };

    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setActivePage(adminUser ? 'dashboard' : 'login');
      }
    };

    window.addEventListener('hashchange', checkAdminAccess);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', checkAdminAccess);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [adminUser]);

  const handleNavigate = (page) => {
    if (page !== 'login' && page !== 'dashboard' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    setActivePage(page);
  };

  const handleLogin = (userObject) => {
    setAdminUser(userObject);
    localStorage.setItem('hmif_admin_user', JSON.stringify(userObject));
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('hmif_admin_user');
    handleNavigate('landing');
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
        prev.map((asp) =>
          asp.id === id ? { ...asp, status: 'Sudah Dibaca' } : asp
        )
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
    const { error } = await supabase.from('accounts').delete().eq('id', id);
    if (!error) {
      setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    } else {
      alert('Gagal menghapus akun: ' + error.message);
    }
  };

  const handleAddGaleri = async (newGaleri) => {
    const { data, error } = await supabase
      .from('galeri')
      .insert([newGaleri])
      .select();

    if (!error && data) {
      setGaleri((prev) => [data[0], ...prev]);
      alert('Foto & deskripsi galeri kegiatan berhasil dipublikasikan!');
    } else {
      alert('Gagal menambah galeri: ' + error.message);
    }
  };

  const handleUpdateGaleri = async (id, updatedGaleri) => {
    const { data, error } = await supabase
      .from('galeri')
      .update(updatedGaleri)
      .eq('id', id)
      .select();

    if (!error && data) {
      setGaleri((prev) =>
        prev.map((item) => (item.id === id ? data[0] : item))
      );
      alert('Galeri & deskripsi berhasil diperbarui!');
    } else {
      alert('Gagal memperbarui galeri: ' + error.message);
    }
  };

  const handleDeleteGaleri = async (id) => {
    const { error } = await supabase.from('galeri').delete().eq('id', id);
    if (!error) {
      setGaleri((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert('Gagal menghapus galeri: ' + error.message);
    }
  };

  const handleAddBerita = async (newBerita) => {
    const { data, error } = await supabase
      .from('berita')
      .insert([newBerita])
      .select();

    if (!error && data) {
      setBerita((prev) => [data[0], ...prev]);
      alert('Berita/Kajian terbaru berhasil dipublikasikan!');
    } else {
      alert('Gagal menambah berita: ' + error.message);
    }
  };

  const handleDeleteBerita = async (id) => {
    const { error } = await supabase.from('berita').delete().eq('id', id);
    if (!error) {
      setBerita((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert('Gagal menghapus berita: ' + error.message);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Nama,NPM,Semester,WhatsApp,Pilihan 1,Pilihan 2,Status\n'];
    const rows = applicants.map(
      (a) =>
        `"${a.nama}","${a.npm}","${a.sem}","${a.wa}","${a.pil1}","${a.pil2}","${a.status}"`
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
        <Header
          isScrolled={isScrolled}
          activePage={activePage}
          setActivePage={handleNavigate}
        />
      )}

      {activePage === 'landing' && (
        <LandingPage
          setActivePage={handleNavigate}
          setSelectedDept={setSelectedDept}
          galeri={galeri}
          berita={berita}
        />
      )}

      {activePage === 'about' && AboutPage && (
        <AboutPage setActivePage={handleNavigate} />
      )}

      {activePage === 'struktur' && StrukturPage && (
        <StrukturPage setActivePage={handleNavigate} />
      )}

      {activePage === 'departemen' && DepartmentPage && (
        <DepartmentPage
          selectedDept={selectedDept}
          setSelectedDept={setSelectedDept}
          setActivePage={handleNavigate}
          galeri={galeri}
        />
      )}

      {activePage === 'login' && LoginPage && (
        <LoginPage
          accounts={accounts}
          handleLogin={handleLogin}
          setActivePage={handleNavigate}
        />
      )}

      {activePage === 'dashboard' && adminUser && Dashboard && (
        <Dashboard
          adminUser={adminUser}
          handleLogout={handleLogout}
          applicants={applicants}
          members={members}
          accounts={accounts}
          aspirasi={aspirasi}
          galeri={galeri}
          berita={berita}
          handleUpdateStatus={handleUpdateStatus}
          handleExportCSV={handleExportCSV}
          handleMarkAspirasiRead={handleMarkAspirasiRead}
          handleExportAspirasiCSV={handleExportAspirasiCSV}
          handleAddAccount={handleAddAccount}
          handleDeleteAccount={handleDeleteAccount}
          handleAddGaleri={handleAddGaleri}
          handleUpdateGaleri={handleUpdateGaleri}
          handleDeleteGaleri={handleDeleteGaleri}
          handleAddBerita={handleAddBerita}
          handleDeleteBerita={handleDeleteBerita}
        />
      )}

      {activePage !== 'dashboard' && Footer && <Footer />}
    </div>
  );
}