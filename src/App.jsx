import React, { useState, useEffect } from 'react';

import { INITIAL_APPLICANTS, INITIAL_MEMBERS, INITIAL_ACCOUNTS, INITIAL_ASPIRASI } from './data/dummyData.js';

import Header from './components/Header';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [activePage, setActivePage] = useState('landing');
  const [isScrolled, setIsScrolled] = useState(false);

  const [applicants, setApplicants] = useState(INITIAL_APPLICANTS);
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [aspirasi, setAspirasi] = useState(INITIAL_ASPIRASI);

  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (userObject) => {
    setAdminUser(userObject);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setAdminUser(null);
    setActivePage('landing');
  };

  const handleUpdateStatus = (id, newStatus) => {
    setApplicants(applicants.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
  };

  const handleMarkAspirasiRead = (id) => {
    setAspirasi(aspirasi.map((asp) => (asp.id === id ? { ...asp, status: 'Sudah Dibaca' } : asp)));
  };

  const handleAddAccount = (newAccount) => {
    setAccounts([...accounts, { id: Date.now(), ...newAccount }]);
  };

  const handleDeleteAccount = (id) => {
    setAccounts(accounts.filter((acc) => acc.id !== id));
  };

  const handleExportCSV = () => {
    alert('Export CSV Pendaftar Berhasil!');
  };

  const handleExportAspirasiCSV = () => {
    const headers = ['Tanggal,Pengirim,Isi Aspirasi,Status\n'];
    const rows = aspirasi.map((a) => `"${a.tanggal}","${a.pengirim}","${a.isi}","${a.status}"`);
    const blob = new Blob([...headers, rows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Data_Aspirasi_Mahasiswa_HMIF.csv';
    link.click();
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen flex flex-col justify-between">
      {activePage !== 'dashboard' && <Header isScrolled={isScrolled} activePage={activePage} setActivePage={setActivePage} />}

      {activePage === 'landing' && <LandingPage setActivePage={setActivePage} />}
      {activePage === 'login' && <LoginPage accounts={accounts} handleLogin={handleLogin} setActivePage={setActivePage} />}
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

      {activePage !== 'dashboard' && <Footer />}
    </div>
  );
}