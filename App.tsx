
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

  useEffect(() => {
    const savedKey = localStorage.getItem('USER_PROVIDED_API_KEY');
    const envKey = process.env.API_KEY;
    if (!savedKey && !envKey) {
      setShowKeyOverlay(true);
    }
  }, []);

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
      if (err.message?.includes("not found") || err.message?.includes("key")) {
        setShowKeyOverlay(true);
      }
      setError(err.message || 'Terjadi kesalahan.');
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
      setError(err.message || 'Gagal memproses bundle.');
    } finally {
      setIsProcessingBundle(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {showKeyOverlay && <ApiKeyOverlay onProceed={() => setShowKeyOverlay(false)} />}
      
      <Header isDark={isDark} toggleTheme={toggleTheme} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl pb-24 md:pb-8">
        {activeTab === 'home' ? (
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-black mb-6">
                <span className="gradient-text">Viral Script</span> Generator
              </h1>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                Buat konten viral secara otomatis. Cukup tempel link produk Anda.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-12 shadow-2xl border border-gray-100 dark:border-slate-800 mb-12">
              <InputForm onGenerate={handleGenerate} />
            </div>

            <div id="results-section">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 p-8 rounded-[3rem] mb-8 flex justify-between items-center shadow-lg">
                  <p className="font-bold">{error}</p>
                  <button onClick={() => setShowKeyOverlay(true)} className="text-xs font-black underline">Update Key</button>
                </div>
              )}

              {scripts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {scripts.map((script) => (
                    <ScriptCard key={script.id} script={script} onProcessBundle={handleProcessBundle} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {bundle ? (
              <SocialMediaBundleView bundle={bundle} onBack={() => setActiveTab('home')} />
            ) : (
              <div className="text-center p-24 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-gray-100 dark:border-slate-800">
                 <h2 className="text-2xl font-black mb-4">Belum Ada Konten Diproses</h2>
                 <button onClick={() => setActiveTab('home')} className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl">Ke Beranda</button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      {isLoading && <LoadingOverlay scriptCount={requestedCount} />}
      {isProcessingBundle && <LoadingOverlay title="Membuat Paket Konten..." message="Sedang merancang strategi sosmed untuk Anda." />}
    </div>
  );
};

export default App;
