
import React from 'react';

interface MobileNavProps {
  activeTab: 'home' | 'sosmed';
  setActiveTab: (tab: 'home' | 'sosmed') => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2">
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-gray-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl flex justify-around items-center p-2 relative overflow-hidden transition-colors">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex-1 flex flex-col items-center py-3 px-2 rounded-3xl transition-all duration-300 relative z-10 ${activeTab === 'home' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}
        >
          <svg className={`w-6 h-6 mb-1 transition-transform ${activeTab === 'home' ? 'scale-110' : ''}`} fill={activeTab === 'home' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-black uppercase tracking-widest">Beranda</span>
          {activeTab === 'home' && <span className="absolute -bottom-1 w-1 h-1 bg-blue-600 rounded-full animate-pulse"></span>}
        </button>

        <button 
          onClick={() => setActiveTab('sosmed')}
          className={`flex-1 flex flex-col items-center py-3 px-2 rounded-3xl transition-all duration-300 relative z-10 ${activeTab === 'sosmed' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}
        >
          <svg className={`w-6 h-6 mb-1 transition-transform ${activeTab === 'sosmed' ? 'scale-110' : ''}`} fill={activeTab === 'sosmed' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.003 9.003 0 003.055 11H5a7.002 7.002 0 016-6V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.945 13A9.003 9.003 0 0113 20.945V19a7.002 7.002 0 006-6h1.945z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
          </svg>
          <span className="text-[10px] font-black uppercase tracking-widest">Sosmed</span>
          {activeTab === 'sosmed' && <span className="absolute -bottom-1 w-1 h-1 bg-blue-600 rounded-full animate-pulse"></span>}
        </button>

        <button 
          className="flex-1 flex flex-col items-center py-3 px-2 text-slate-300 dark:text-slate-600 cursor-not-allowed group"
        >
          <svg className="w-6 h-6 mb-1 text-amber-500/50" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-[10px] font-black uppercase tracking-widest">Premium</span>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] py-1 px-2 rounded opacity-0 group-active:opacity-100 transition-opacity">Locked</div>
        </button>
      </div>
    </nav>
  );
};
