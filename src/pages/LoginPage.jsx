import { useState } from 'react';

export default function LoginPage({
  accounts = [],
  handleLogin,
  setActivePage,
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanUsername || !cleanPassword) {
      setErrorMsg('Username dan password wajib diisi.');
      return;
    }

    const validUser = Array.isArray(accounts)
      ? accounts.find(
          (acc) =>
            (acc.username || '').trim().toLowerCase() === cleanUsername &&
            String(acc.password || '').trim() === cleanPassword
        )
      : null;

    if (validUser) {
      handleLogin(validUser);
    } else {
      setErrorMsg('Username atau password salah. Silakan periksa kembali.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b365d] px-4 pt-24 pb-12">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-9 animate-modal-in">
        {/* Badge Logo IF */}
        <div className="w-14 h-14 rounded-full bg-[#21416e] text-[#F1C40F] font-extrabold text-lg flex items-center justify-center mx-auto shadow-md">
          IF
        </div>

        <div className="text-center mt-4 mb-7">
          <h1 className="text-2xl font-extrabold text-[#21416e]">
            Login Portal Admin HMIF
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Masukkan username dan password akun stakeholder Anda
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#21416e] mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#21416e] focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#21416e] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full px-4 py-2.5 pr-16 rounded-xl border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#21416e] focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-[#21416e] cursor-pointer"
              >
                {showPassword ? 'Sembunyi' : 'Lihat'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#21416e] hover:bg-[#162d4d] text-white font-bold py-3 rounded-xl shadow-md transition duration-200 cursor-pointer mt-2"
          >
            Masuk Ke Dashboard
          </button>
        </form>

        <div className="mt-7 pt-5 border-t border-gray-100 text-center">
          <button
            type="button"
            onClick={() => setActivePage('landing')}
            className="text-xs font-semibold text-gray-500 hover:text-[#21416e] transition cursor-pointer"
          >
            ← Kembali ke Landing Page
          </button>
        </div>
      </div>
    </div>
  );
}