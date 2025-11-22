import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center border-b border-slate-800 pb-6">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 bg-slate-900 border border-cyan-500/50 rounded-lg neon-shadow overflow-hidden">
           <div className="absolute inset-0 bg-cyan-500/20 animate-pulse"></div>
           <span className="relative text-xl">👁️</span>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wider text-white">
            BIZ<span className="text-cyan-400">VISION</span>
            <span className="text-fuchsia-500 ml-1 text-lg align-top">2026</span>
          </h1>
          <p className="text-xs text-slate-500 tracking-[0.2em] uppercase">Future Venture Architect</p>
        </div>
      </div>
      <div className="hidden sm:block text-right">
        <div className="text-xs text-emerald-400 font-mono flex items-center justify-end gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          SYSTEM ONLINE
        </div>
        <div className="text-[10px] text-slate-600 font-mono mt-1">v2.6.0-alpha</div>
      </div>
    </header>
  );
};