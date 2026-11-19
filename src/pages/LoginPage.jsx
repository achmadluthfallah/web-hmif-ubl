import React, { useState } from 'react';

export default function LoginPage({ accounts, handleLogin, setActivePage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const foundUser = accounts.find(
      (acc) => acc.username === username && acc.password === password
    );

    if (foundUser) {
      setErrorMsg('');
      handleLogin(foundUser);
    } else {
      setErrorMsg('Username atau password salah!');
    }
  };

  const quickFill = (acc) => {
    setUsername(acc.username);
    setPassword(acc.password);
  };

  return (
    <main className="flex-1 flex items-center justify-center bg-[#21416e] min-h-screen p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-[#21416e] text-[#F1C40F] rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            IF
          </div>
          <h2 className="text-2xl font-bold text-[#21416e]">Login Portal Admin HMIF</h2>
          <p className="text-xs text-gray-500">Masukkan username dan password akun stakeholder Anda</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-semibold text-center border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">USERNAME</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-[#21416e] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">PASSWORD</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-[#21416e] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#21416e] hover:bg-[#162c4b] text-white font-bold py-3 rounded-lg text-sm shadow-md transition"
          >
            Masuk Ke Dashboard
          </button>
        </form>

        {/* Tombol Pintas Demo Login */}
        <div className="pt-4 border-t space-y-2">
          <p className="text-[11px] text-gray-400 font-semibold text-center">AKUN DEMO (KLIK UNTUK OTOMATIS MENGISI):</p>
          <div className="grid grid-cols-3 gap-2">
            {accounts.map((acc) => (
              <button
                key={acc.id}
                type="button"
                onClick={() => quickFill(acc)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-2 rounded text-[11px] font-medium transition text-center"
              >
                {acc.role.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setActivePage('landing')}
          className="text-xs text-gray-500 hover:underline block mx-auto pt-2"
        >
          ← Kembali ke Landing Page
        </button>
      </div>
    </main>
  );
}