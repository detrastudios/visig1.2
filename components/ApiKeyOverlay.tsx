
import React, { useState } from 'react';

interface ApiKeyOverlayProps {
  onProceed: () => void;
}

export const ApiKeyOverlay: React.FC<ApiKeyOverlayProps> = ({ onProceed }) => {
  const [keyInput, setKeyInput] = useState('');
  const [error, setError] = useState('');

  const handleSaveKey = () => {
    if (!keyInput.trim() || keyInput.length < 20) {
      setError('Masukkan API Key yang valid (biasanya dimulai dengan AIza).');
      return;
    }
    localStorage.setItem('USER_PROVIDED_API_KEY', keyInput.trim());
    onProceed();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-2xl px-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3.5rem] shadow-2xl border border-white/20 overflow-hidden relative animate-in fade-in zoom-in-95 duration-500">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
        
        <div className="p-10 md:p-14 text-center">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>

          <h2 className="text-3xl font-black mb-4 dark:text-white">Tempel API Key</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">
            Tempel API Key dari Google AI Studio di bawah ini untuk mengaktifkan fitur AI. Key Anda aman dan hanya disimpan di browser Anda.
          </p>

          <div className="space-y-4">
            <div className="text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Gemini API Key</label>
              <input 
                type="password"
                value={keyInput}
                onChange={(e) => { setKeyInput(e.target.value); setError(''); }}
                placeholder="AIzaSyB-..."
                className="w-full px-6 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
              />
              {error && <p className="text-red-500 text-[10px] font-bold mt-2 ml-4">{error}</p>}
            </div>

            <button
              onClick={handleSaveKey}
              className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
            >
              Simpan & Mulai Membuat Skrip
            </button>

            <div className="pt-4">
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-500 hover:underline"
              >
                Belum punya key? Dapatkan di sini (Gratis/Berbayar)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
