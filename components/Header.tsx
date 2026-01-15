
import React, { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  activeTab: 'home' | 'sosmed';
  setActiveTab: (tab: 'home' | 'sosmed') => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme, activeTab, setActiveTab }) => {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleManageKey = async () => {
    // @ts-ignore - aistudio is injected by the environment
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      try {
        // @ts-ignore
        await window.aistudio.openSelectKey();
        setShowSettings(false);
      } catch (error) {
        console.error("Gagal membuka dialog API Key:", error);
      }
    } else {
      // Memberikan instruksi jika di luar lingkungan AI Studio (Misal di Vercel Production)
      window.open('https://ai.google.dev/gemini-api/docs/api-key', '_blank');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-gray-200 dark:border-slate-800 transition-colors">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-lg font-black tracking-tight hidden sm:inline-block">
            <span className="text-blue-600 dark:text-blue-400">Viral Script</span> <span className="text-slate-900 dark:text-white">Generator</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => setActiveTab('home')}
            className={`text-sm font-black transition-all px-4 py-2 rounded-xl ${activeTab === 'home' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-sm' : 'text-slate-500 hover:text-blue-500'}`}
          >
            Beranda
          </button>
          <button 
            onClick={() => setActiveTab('sosmed')}
            className={`text-sm font-black transition-all px-4 py-2 rounded-xl ${activeTab === 'sosmed' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-sm' : 'text-slate-500 hover:text-blue-500'}`}
          >
            Sosmed
          </button>
        </nav>

        <div className="flex items-center gap-3 relative" ref={settingsRef}>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2.5 rounded-xl transition-all shadow-sm border ${showSettings ? 'bg-blue-600 text-white border-blue-600 ring-4 ring-blue-500/20' : 'bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:border-blue-500'}`}
            aria-label="Settings"
          >
            <svg className={`w-5 h-5 transition-transform duration-500 ${showSettings ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {showSettings && (
            <div className="absolute right-0 top-14 w-64 bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 p-2 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
              <div className="p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-2">Aplikasi Settings</p>
                
                <button 
                  onClick={() => { toggleTheme(); }}
                  className="w-full flex items-center justify-between p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors group text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      {isDark ? (
                        <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                      ) : (
                        <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                      )}
                    </div>
                    <span>{isDark ? 'Mode Terang' : 'Mode Gelap'}</span>
                  </div>
                  <div className={`w-10 h-6 rounded-full relative transition-colors ${isDark ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDark ? 'left-5' : 'left-1'}`}></div>
                  </div>
                </button>

                <div className="my-2 border-t border-gray-100 dark:border-slate-800"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-2">Konfigurasi AI</p>
                
                <button 
                  onClick={handleManageKey}
                  className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors text-sm font-bold text-blue-600 dark:text-blue-400"
                >
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  Kelola API Key
                </button>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 mt-1">
                 <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Viral Script Generator v1.2</p>
                 <p className="text-[9px] text-slate-400 dark:text-slate-600 mt-1">Deploy Ready for Vercel</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
