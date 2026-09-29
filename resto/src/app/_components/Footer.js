import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-900/80 backdrop-blur-md py-6 text-center text-sm text-slate-400">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span className="font-semibold text-slate-200 tracking-wide">Resto Food App</span>
        </div>
        <p className="text-xs text-slate-400">All rights reserved by Resto app</p>
      </div>
    </footer>
  );
};

export default Footer;