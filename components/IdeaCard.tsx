import React from 'react';
import { BusinessIdea } from '../types';

interface IdeaCardProps {
  idea: BusinessIdea;
  onClick: () => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/60 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/50">
            {idea.icon}
          </div>
          <span className="px-2 py-1 text-[10px] uppercase tracking-widest font-bold rounded border border-purple-500/30 bg-purple-500/10 text-purple-400">
            {idea.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors font-display">
          {idea.title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed flex-grow">
          {idea.shortDescription}
        </p>
        
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
           <span className="text-xs text-slate-500 font-mono group-hover:text-cyan-300 transition-colors">
             ID: {idea.id.padStart(4, '0')}
           </span>
           <div className="flex items-center gap-2 text-sm text-cyan-500 font-bold opacity-80 group-hover:opacity-100 transition-opacity">
             INITIALIZE <span className="text-lg leading-none">→</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;