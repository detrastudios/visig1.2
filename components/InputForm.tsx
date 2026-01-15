
import React, { useState } from 'react';
import { LanguageStyle, ContentLength, HookType, ScriptFormValues } from '../types';

interface InputFormProps {
  onGenerate: (values: ScriptFormValues) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ onGenerate }) => {
  const [productUrl, setProductUrl] = useState('');
  const [style, setStyle] = useState<LanguageStyle>(LanguageStyle.PERSUASIVE);
  const [length, setLength] = useState<ContentLength>(ContentLength.MEDIUM);
  const [hook, setHook] = useState<HookType>(HookType.SOLUTIONS);
  const [scriptCount, setScriptCount] = useState(6);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productUrl) return;
    onGenerate({ productUrl, style, length, hook, scriptCount });
  };

  const countOptions = Array.from({ length: 21 }, (_, i) => i + 1);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product URL - Full Width */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Link Produk (Shopee/Tokopedia/TikTok/etc)</label>
        <div className="relative group">
          <input
            type="url"
            required
            placeholder="Tempel link produk Anda di sini..."
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[1.25rem] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
          />
          <div className="absolute right-4 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </div>
      </div>

      {/* Row 1: Gaya Bahasa & Panjang Konten */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Gaya Bahasa</label>
          <div className="relative">
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as LanguageStyle)}
              className="w-full appearance-none px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[1.25rem] focus:ring-2 focus:ring-blue-500 outline-none shadow-sm cursor-pointer"
            >
              {Object.values(LanguageStyle).map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Durasi Konten</label>
          <div className="relative">
            <select
              value={length}
              onChange={(e) => setLength(e.target.value as ContentLength)}
              className="w-full appearance-none px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[1.25rem] focus:ring-2 focus:ring-blue-500 outline-none shadow-sm cursor-pointer"
            >
              {Object.values(ContentLength).map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Jenis Hook & Jumlah Generate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Jenis Hook</label>
          <div className="relative">
            <select
              value={hook}
              onChange={(e) => setHook(e.target.value as HookType)}
              className="w-full appearance-none px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[1.25rem] focus:ring-2 focus:ring-blue-500 outline-none shadow-sm cursor-pointer"
            >
              {Object.values(HookType).map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Jumlah Generate</label>
          <div className="relative">
            <select
              value={scriptCount}
              onChange={(e) => setScriptCount(parseInt(e.target.value))}
              className="w-full appearance-none px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[1.25rem] focus:ring-2 focus:ring-blue-500 outline-none shadow-sm cursor-pointer"
            >
              {countOptions.map((n) => <option key={n} value={n}>{n} Variasi Skrip</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-black rounded-[1.5rem] shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 active:scale-95"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Generate Viral Scripts Now
      </button>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/20">
        <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-3 leading-relaxed">
          <svg className="w-5 h-5 flex-shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          AI akan membedah link produk Anda & merancang skrip copywriting yang siap meledak di media sosial.
        </p>
      </div>
    </form>
  );
};
