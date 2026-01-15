
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-10 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-lg tracking-tight">
              <span className="text-blue-600">Viral Script</span> Generator
            </span>
            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-black rounded-md border border-blue-200 dark:border-blue-800">
              v 1.2
            </span>
          </div>
          
          <p className="text-gray-500 dark:text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Viral Script Generator. Solusi cerdas untuk konten kreator & marketer.
          </p>

          <div className="flex flex-col items-center gap-2 mt-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Created with ❤️ by</span>
            <a 
              href="https://instagram.com/detrastudios" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-2.5 bg-gray-50 dark:bg-slate-900 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-gray-200 dark:border-slate-800 hover:border-blue-200"
            >
              <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-500 transition-colors">Detra Studioos</span>
              <div className="h-4 w-px bg-gray-300 dark:bg-slate-700"></div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                <span className="text-xs font-semibold text-gray-600 dark:text-slate-400">@detrastudios</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
