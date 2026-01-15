
import React from 'react';

interface ApiKeyOverlayProps {
  onProceed: () => void;
}

export const ApiKeyOverlay: React.FC<ApiKeyOverlayProps> = ({ onProceed }) => {
  const handleOpenKeyDialog = async () => {
    try {
      if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
        await window.aistudio.openSelectKey();
        // As per instructions: assume success after triggering and proceed
        onProceed();
      } else {
        console.error("AI Studio environment not detected.");
      }
    } catch (error) {
      console.error("Failed to open key selection dialog:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-2xl px-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3rem] shadow-2xl border border-white/20 overflow-hidden relative animate-in fade-in zoom-in-95 duration-500">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="p-8 md:p-12 text-center relative z-10">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner rotate-3 transition-transform hover:rotate-0">
            <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>

          <h2 className="text-3xl font-black mb-4 dark:text-white leading-tight">
            Konfigurasi API Key
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Selamat datang di <span className="font-bold text-blue-600">Viral Script Generator</span>. 
            Untuk menggunakan fitur AI Gemini, Anda perlu memilih API Key dari project Google Cloud Anda.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleOpenKeyDialog}
              className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Pilih API Key Sekarang
            </button>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
              <p className="text-xs text-slate-400 mb-2">Penting: Gunakan API Key dari project dengan penagihan aktif.</p>
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-500 hover:underline inline-flex items-center gap-1"
              >
                Pelajari tentang Penagihan API
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
