
import React, { useState } from 'react';
import { SocialMediaBundle } from '../types';

interface SocialMediaBundleViewProps {
  bundle: SocialMediaBundle;
  onBack: () => void;
}

export const SocialMediaBundleView: React.FC<SocialMediaBundleViewProps> = ({ bundle, onBack }) => {
  const [activeTab, setActiveTab] = useState<'reels' | 'feed' | 'carousel' | 'threads'>('reels');

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Teks berhasil disalin!');
  };

  const tabs = [
    { id: 'reels', name: 'Skrip VO Iklan', icon: '🎙️' },
    { id: 'feed', name: 'Instagram Feed', icon: '🖼️' },
    { id: 'carousel', name: 'Carousel Post', icon: '🎠' },
    { id: 'threads', name: 'Threads Utas', icon: '💬' },
  ];

  // Parser Markdown Sederhana (sama dengan ScriptCard)
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <div key={index} className="h-4" />;

      if (trimmedLine.startsWith('###')) {
        const title = trimmedLine.replace('###', '').trim();
        let borderClass = "border-amber-400";
        let textClass = "text-amber-600 dark:text-amber-400";
        
        if (title.toLowerCase().includes('dialog') || title.toLowerCase().includes('script')) {
           borderClass = "border-blue-400";
           textClass = "text-blue-600 dark:text-blue-400";
        } else if (title.toLowerCase().includes('cta')) {
           borderClass = "border-emerald-400";
           textClass = "text-emerald-600 dark:text-emerald-400";
        }

        return (
          <h4 key={index} className={`text-xs font-black uppercase tracking-widest mt-6 mb-2 pb-1 border-b-2 ${borderClass} ${textClass} inline-block`}>
            {title}
          </h4>
        );
      }

      if (trimmedLine.startsWith('>')) {
        const content = trimmedLine.replace('>', '').trim();
        return (
          <div key={index} className="bg-gray-100 dark:bg-slate-800/80 p-3 rounded-xl border-l-4 border-gray-400 dark:border-slate-600 my-4 shadow-inner">
            <p className="text-xs text-gray-500 dark:text-slate-400 italic leading-relaxed">
              {content.replace(/\*\*/g, '')}
            </p>
          </div>
        );
      }

      const formattedLine = trimmedLine.split(/(\*\*.*?\*\*)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-gray-900 dark:text-white font-bold">{part.replace(/\*\*/g, '')}</strong>;
        }
        return part;
      });

      return (
        <p key={index} className="text-[15px] text-gray-700 dark:text-slate-300 mb-2 leading-relaxed">
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Back Button Only */}
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 text-gray-500 hover:text-blue-600 rounded-2xl transition-all shadow-sm border border-gray-100 dark:border-slate-800 font-bold text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali ke Beranda
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto gap-4 p-2 no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 min-w-[160px] px-6 py-5 rounded-[2rem] font-black text-sm transition-all flex flex-col items-center justify-center gap-2 border-2 ${activeTab === tab.id ? 'bg-white dark:bg-slate-900 text-blue-600 border-blue-600 shadow-xl' : 'bg-white/50 dark:bg-slate-900/50 border-transparent text-gray-400 hover:bg-white dark:hover:bg-slate-900'}`}
          >
            <span className="text-3xl">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Main Display Area */}
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-slate-800 min-h-[500px]">
        
        {activeTab === 'reels' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black">🎙️ Skrip Voice-over Iklan</h3>
              <button onClick={() => copyText(bundle.reels)} className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">Salin Skrip</button>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 leading-relaxed relative">
               <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-[2.5rem]"></div>
               {renderMarkdown(bundle.reels)}
            </div>
          </div>
        )}

        {activeTab === 'feed' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-12">
            <div className="space-y-4 text-center">
               <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]">Power Hook Title</span>
               <h3 className="text-4xl font-black gradient-text uppercase tracking-tight">{bundle.feed.title}</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] flex items-center gap-3">
                  <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">👁️</span>
                  Konsep Visual
                </h4>
                <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-slate-800 text-xl italic text-gray-600 dark:text-slate-300 leading-relaxed">
                  "{bundle.feed.visual}"
                </div>
              </div>
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h4 className="text-sm font-black text-blue-500 uppercase tracking-[0.2em] flex items-center gap-3">
                      <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">📝</span>
                      Caption Detail
                    </h4>
                    <button onClick={() => copyText(bundle.feed.caption)} className="px-4 py-2 bg-gray-100 dark:bg-slate-800 text-xs font-bold rounded-xl hover:text-blue-500 transition-colors">Salin Caption</button>
                 </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 text-[16px] leading-relaxed">
                  {renderMarkdown(bundle.feed.caption)}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'carousel' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-3xl font-black mb-10">Carousel Slide Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {bundle.carousel.slides.map((slide, i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-950 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 hover:border-blue-300 transition-all group flex flex-col relative overflow-hidden">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-lg mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">S{i+1}</div>
                  <h4 className="font-black text-xl mb-4 dark:text-white leading-tight">{slide.title}</h4>
                  <p className="text-gray-500 dark:text-slate-400 leading-relaxed mb-8 flex-grow">{slide.content}</p>
                  
                  <button 
                    onClick={() => copyText(`${slide.title}\n${slide.content}`)}
                    className="w-full py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    Salin Teks Slide
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'threads' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 max-w-3xl mx-auto space-y-10">
            <h3 className="text-3xl font-black mb-4 text-center">Threads Structure</h3>
            {bundle.threads.map((post, i) => (
              <div key={i} className="relative pl-16">
                 {i < bundle.threads.length - 1 && <div className="absolute left-[2.25rem] top-12 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-transparent opacity-20"></div>}
                <div className="absolute left-4 top-0 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-4 border-blue-500 flex items-center justify-center text-xs font-black text-blue-600 shadow-md">{i+1}</div>
                <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm text-[16px] leading-relaxed relative group">
                  <div className="mb-6">{post}</div>
                  
                  <button 
                    onClick={() => copyText(post)} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    Salin Utas {i+1}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
