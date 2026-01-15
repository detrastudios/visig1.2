
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

  const handleUpdateKey = () => {
    if (confirm("Reset API Key yang tersimpan?")) {
      localStorage.removeItem('USER_PROVIDED_API_KEY');
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-gray-200 dark:border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          </div>
          <span className="text-lg font-black tracking-tight hidden sm:inline-block">Viral Script Generator</span>
        </div>

        <nav className="hidden md:flex gap-4">
          <button onClick={() => setActiveTab('home')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'home' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 'text-slate-500'}`}>Beranda</button>
          <button onClick={() => setActiveTab('sosmed')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'sosmed' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 'text-slate-500'}`}>Sosmed</button>
        </nav>

        <div className="relative" ref={settingsRef}>
          <button onClick={() => setShowSettings(!showSettings)} className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
          {showSettings && (
            <div className="absolute right-0 top-14 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 p-2">
              <button onClick={toggleTheme} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-sm font-bold">
                <span>{isDark ? 'Mode Terang' : 'Mode Gelap'}</span>
                <div className={`w-8 h-4 rounded-full relative ${isDark ? 'bg-blue-600' : 'bg-slate-200'}`}><div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isDark ? 'left-4.5' : 'left-0.5'}`}></div></div>
              </button>
              <button onClick={handleUpdateKey} className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl text-sm font-bold text-blue-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                Update API Key
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
