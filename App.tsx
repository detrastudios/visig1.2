
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InputForm } from './components/InputForm';
import { ScriptCard } from './components/ScriptCard';
import { LoadingOverlay } from './components/LoadingOverlay';
import { SocialMediaBundleView } from './components/SocialMediaBundleView';
import { MobileNav } from './components/MobileNav';
import { ApiKeyOverlay } from './components/ApiKeyOverlay';
import { GeneratedScript, ScriptFormValues, SocialMediaBundle } from './types';
import { generateViralScripts, generateSocialMediaBundle } from './services/geminiService';

// Removed redundant declare global for aistudio as it conflicts with environment-provided types.

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  const [activeTab, setActiveTab] = useState<'home' | 'sosmed'>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingBundle, setIsProcessingBundle] = useState(false);
  const [scripts, setScripts] = useState<GeneratedScript[]>([]);
  const [bundle, setBundle] = useState<SocialMediaBundle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [requestedCount, setRequestedCount] = useState(6);
  const [showKeyOverlay, setShowKeyOverlay] = useState(false);

  // Initial check for API Key using pre-configured window.aistudio
  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore - aistudio is injected by the environment as AIStudio
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        // @ts-ignore
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          setShowKeyOverlay(true);
        }
      }
    };
    checkKey();
  }, []);

  // Sync theme with document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleGenerate = async (values: ScriptFormValues) => {
    setIsLoading(true);
    setError(null);
    setScripts([]);
    setBundle(null);
    setRequestedCount(values.scriptCount);
    try {
      const results = await generateViralScripts(values);
      setScripts(results);
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      // If the request fails with "Requested entity was not found", reset key selection as per instructions
      if (err.message?.includes("Requested entity was not found")) {
        setShowKeyOverlay(true);
        setError("Silakan pilih ulang API Key yang valid.");
      } else {
        setError(err.message || 'Terjadi kesalahan saat membuat skrip.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleProcessBundle = async (script: GeneratedScript) => {
    setIsProcessingBundle(true);
    setError(null);
    try {
      const result = await generateSocialMediaBundle(script);
      setBundle(result);
      setActiveTab('sosmed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) {
        setShowKeyOverlay(true);
        setError("Silakan pilih ulang API Key yang valid.");
      } else {
        setError(err.message || 'Gagal memproses bundle sosial media.');
      }
    } finally {
      setIsProcessingBundle(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {showKeyOverlay && <ApiKeyOverlay onProceed={() => setShowKeyOverlay(false)} />}
      
      <Header 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl pb-24 md:pb-8">
        {activeTab === 'home' ? (
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4 bg-white dark:bg-slate-900 px-4 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-slate-800">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">AI Version 1.2 is Live</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6">
                <span className="gradient-text">Viral Script</span> Generator
              </h1>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed px-4">
                Buat skrip video viral & paket konten sosial media lengkap dalam hitungan detik menggunakan Gemini AI.
              </p>
            </div>

            <div className="w-full mb-12">
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl border border-gray-100 dark:border-slate-800 relative overflow-hidden transition-all hover:shadow-blue-500/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full -ml-16 -mb-16 blur-3xl"></div>
                
                <h2 className="text-2xl md:text-3xl font-black mb-10 flex items-center gap-4 justify-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Atur Strategi Konten
                </h2>
                <InputForm onGenerate={handleGenerate} />
              </div>
            </div>

            <div id="results-section" className="w-full min-h-[400px]">
              {error && (
                <div className="w-full bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 p-8 rounded-[3rem] mb-8 flex items-center gap-4 animate-shake shadow-lg">
                  <svg className="w-8 h-8 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  <div>
                    <p className="font-black text-xl">Terjadi Kendala</p>
                    <p className="opacity-80 leading-relaxed">{error}</p>
                  </div>
                </div>
              )}

              {scripts.length > 0 ? (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-200 dark:border-slate-800 pb-8 px-4">
                    <div className="text-center md:text-left">
                      <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">🚀 Skrip Siap Viral</h2>
                      <p className="text-gray-500 dark:text-slate-400 text-base md:text-lg">Pilih variasi untuk diproses menjadi paket konten lengkap.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 px-6 py-3 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-blue-${i*100+300} flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}>AI</div>
                        ))}
                      </div>
                      <span className="text-sm font-black text-blue-700 dark:text-blue-300">{scripts.length} Variasi Kreatif</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {scripts.map((script) => (
                      <ScriptCard 
                        key={script.id} 
                        script={script} 
                        onProcessBundle={handleProcessBundle}
                      />
                    ))}
                  </div>
                </div>
              ) : !isLoading && (
                <div className="w-full flex flex-col items-center justify-center p-8 md:p-24 bg-white/40 dark:bg-slate-900/40 rounded-[2.5rem] md:rounded-[4rem] border-4 border-dashed border-gray-200 dark:border-slate-800 transition-all hover:border-blue-300 dark:hover:border-slate-600 group text-center">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-800 p-8 md:p-10 rounded-full mb-8 shadow-inner transition-transform group-hover:scale-110">
                    <svg className="w-12 h-12 md:w-20 md:h-20 text-blue-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black mb-4 text-slate-900 dark:text-white">Siap Menguasai Algoritma?</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-lg text-base md:text-lg leading-relaxed">
                    Isi form di atas dengan link produk favorit Anda, lalu saksikan bagaimana AI kami merancang skrip & konten sosial media yang siap meledak.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {bundle ? (
              <SocialMediaBundleView bundle={bundle} onBack={() => setActiveTab('home')} />
            ) : (
              <div className="flex flex-col items-center justify-center p-8 md:p-24 bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] border border-gray-200 dark:border-slate-800 shadow-xl text-center">
                 <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-8">
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 </div>
                 <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900 dark:text-white">Belum Ada Bundle Konten</h2>
                 <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8 text-sm md:text-base">Silakan generate skrip terlebih dahulu di halaman Beranda, lalu pilih "Proses Lanjut" untuk melihat detail konten sosial media lengkap.</p>
                 <button 
                  onClick={() => setActiveTab('home')}
                  className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                 >
                   Ke Halaman Beranda
                 </button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      {isLoading && <LoadingOverlay scriptCount={requestedCount} />}
      {isProcessingBundle && <LoadingOverlay title="Membuat Paket Konten..." message="Sedang merancang strategi Reels, Feed, Carousel & Threads untuk Anda." />}
    </div>
  );
};

export default App;
