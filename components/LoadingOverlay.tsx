
import React from 'react';

interface LoadingOverlayProps {
  scriptCount?: number;
  title?: string;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  scriptCount = 6, 
  title = "Menganalisa Produk...",
  message
}) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl flex flex-col items-center max-w-sm text-center border border-white/20">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-10 h-10 bg-blue-500 rounded-xl animate-pulse shadow-lg shadow-blue-500/50"></div>
          </div>
        </div>
        <h3 className="text-2xl font-black mb-3">{title}</h3>
        <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
          {message || (
            <>Gemini AI sedang meracik <span className="font-bold text-blue-500">{scriptCount} variasi skrip viral</span> untuk Anda. Mohon tunggu sebentar.</>
          )}
        </p>
        <div className="mt-8 flex gap-2 justify-center">
          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};
