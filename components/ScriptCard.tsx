
import React, { useState } from 'react';
import { GeneratedScript } from '../types';

interface ScriptCardProps {
  script: GeneratedScript;
  onProcessBundle?: (script: GeneratedScript) => void;
}

export const ScriptCard: React.FC<ScriptCardProps> = ({ script, onProcessBundle }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const fullText = `${script.title}\n\n${script.content}\n\n${script.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportToWord = () => {
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>${script.title}</title></head><body>`;
    const footer = "</body></html>";
    const sourceHTML = header + `<h1>${script.title}</h1><div style="white-space: pre-wrap;">${script.content.replace(/\n/g, '<br>')}</div><p><strong>Hashtags:</strong><br>${script.hashtags.join(' ')}</p>` + footer;
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `${script.title.replace(/\s+/g, '_')}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  // Parser Markdown Sederhana untuk UI
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) return <div key={index} className="h-4" />;

      // Header H3 (Misal: ### HOOK)
      if (trimmedLine.startsWith('###')) {
        const title = trimmedLine.replace('###', '').trim();
        let borderClass = "border-amber-400";
        let textClass = "text-amber-600 dark:text-amber-400";
        
        if (title.toLowerCase().includes('dialog')) {
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

      // Blockquote (Misal: > VISUAL)
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

      // Strong / Bold text handling (Sederhana)
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
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-7 border border-gray-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all flex flex-col h-full overflow-hidden relative group">
      {/* Decorative Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="flex justify-between items-start mb-6 mt-2">
        <div className="flex-1">
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1 block">Variasi Konten</span>
          <h3 className="font-black text-xl dark:text-white leading-tight">{script.title}</h3>
        </div>
        <div className="flex gap-2 shrink-0">
          <button 
            onClick={copyToClipboard}
            className={`p-3 rounded-2xl transition-all shadow-sm ${copied ? 'bg-green-500 text-white scale-110' : 'bg-gray-50 text-gray-400 hover:text-blue-500 hover:bg-white hover:shadow-md dark:bg-slate-800 dark:hover:bg-slate-700'}`}
            title="Salin Skrip"
          >
            {copied ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>}
          </button>
          <button 
            onClick={exportToWord}
            className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:text-indigo-500 hover:bg-white hover:shadow-md dark:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-sm"
            title="Download .doc"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </button>
        </div>
      </div>
      
      <div className="flex-grow bg-slate-50/50 dark:bg-slate-950/30 p-6 rounded-3xl border border-gray-100 dark:border-slate-800/50 overflow-y-auto max-h-[300px] custom-scrollbar mb-4">
        {renderMarkdown(script.content)}
      </div>

      {/* Grounding Sources Display */}
      {script.sources && script.sources.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20 text-[10px]">
          <p className="font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            Referensi Pencarian:
          </p>
          <div className="flex flex-col gap-1.5">
            {script.sources.map((source, i) => (
              <a 
                key={i} 
                href={source.uri} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors truncate underline"
              >
                {source.title || source.uri}
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => onProcessBundle?.(script)}
        className="w-full py-4 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mb-4 group shadow-lg shadow-blue-500/20"
      >
        <span>Proses Lanjut</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
      </button>

      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
        {script.hashtags.map((tag, i) => (
          <span key={i} className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-xl border border-blue-100 dark:border-blue-900/50 hover:scale-105 transition-transform cursor-default">
            {tag.startsWith('#') ? tag : `#${tag}`}
          </span>
        ))}
      </div>
    </div>
  );
};
