import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#21416e] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-[#21416e]">
              IF
            </div>
            <span className="font-bold text-lg tracking-wider">HMIF UBL</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Himpunan Mahasiswa Informatika Universitas Bandar Lampung.
          </p>
        </div>

        <div>
          <h4 className="text-[#F1C40F] font-bold mb-4">Kontak Kami</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>WhatsApp: +62 812-3456-7890</li>
            <li>Email: hmif@ubl.ac.id</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#F1C40F] font-bold mb-4">Sosial Media</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-[#F1C40F] transition">Instagram (@hmif_ubl)</a></li>
            <li><a href="#" className="hover:text-[#F1C40F] transition">YouTube (HMIF UBL Official)</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#F1C40F] font-bold mb-4">Alamat Sekretariat</h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            Gedung Student Center Lt. 2, Universitas Bandar Lampung.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-white/10 text-center text-xs text-gray-400">
        © 2026 HMIF UBL. All rights reserved.
      </div>
    </footer>
  );
}