import React, { useEffect, useState, useRef } from 'react';
import { BusinessIdea } from '../types';
import { generateBlueprint } from '../services/geminiService';
import { BlueprintDashboard } from './BlueprintDashboard';

interface BlueprintViewProps {
  idea: BusinessIdea;
  onBack: () => void;
}

// Simple Markdown formatter for specific headers and list items
const FormattedContent: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  
  return (
    <div className="space-y-4 text-slate-300 leading-relaxed">
      {lines.map((line, idx) => {
        // Headers with Emoji (The prompt asks for emojis in headers)
        if (line.match(/^#{1,3}\s/)) {
          return (
            <h3 key={idx} className="text-xl sm:text-2xl font-bold text-cyan-400 mt-8 mb-4 pb-2 border-b border-slate-800 font-display">
              {line.replace(/^#{1,3}\s/, '')}
            </h3>
          );
        }
        // List items
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          const content = line.trim().substring(2);
          // Handle bolding inside lists
          const parts = content.split(/(\*\*.*?\*\*)/g);
          return (
            <div key={idx} className="flex gap-3 ml-2">
              <span className="text-fuchsia-500 mt-1.5 text-xs">▣</span>
              <p>
                {parts.map((part, i) => 
                  part.startsWith('**') && part.endsWith('**') ? (
                    <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </p>
            </div>
          );
        }
        // Numbered lists
        if (line.match(/^\d+\./)) {
           return (
            <div key={idx} className="flex gap-3 ml-2 mb-2">
              <span className="text-cyan-500 font-mono font-bold min-w-[20px]">{line.split('.')[0]}.</span>
              <p>{line.substring(line.indexOf('.') + 1).trim()}</p>
            </div>
           );
        }
        // Standard paragraphs with bold support
        if (line.trim().length > 0) {
           const parts = line.split(/(\*\*.*?\*\*)/g);
           return (
             <p key={idx} className="mb-2">
                {parts.map((part, i) => 
                  part.startsWith('**') && part.endsWith('**') ? (
                    <strong key={i} className="text-emerald-400 font-semibold">{part.slice(2, -2)}</strong>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
             </p>
           );
        }
        return <br key={idx} />;
      })}
    </div>
  );
};

const BlueprintView: React.FC<BlueprintViewProps> = ({ idea, onBack }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isFetched = useRef(false);

  useEffect(() => {
    const fetchBlueprint = async () => {
      if (isFetched.current) return;
      isFetched.current = true;
      
      setLoading(true);
      setError(null);
      try {
        const result = await generateBlueprint(idea.title);
        setContent(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlueprint();
  }, [idea.title]);

  return (
    <div className="animate-slide-up min-h-[80vh] flex flex-col">
      {/* Nav / Title Area */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button 
          onClick={onBack}
          className="self-start px-4 py-2 text-sm font-mono text-slate-400 hover:text-white border border-slate-800 hover:border-cyan-500 rounded transition-all duration-300 flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">«</span> RETURN
        </button>
        
        <div className="flex items-center gap-3">
           <span className="text-4xl">{idea.icon}</span>
           <div>
             <h2 className="text-2xl sm:text-3xl font-bold text-white font-display uppercase tracking-wide">
               {idea.title}
             </h2>
             <div className="flex gap-2 mt-1">
               <span className={`text-xs font-mono px-2 py-0.5 rounded border transition-colors duration-500 ${loading ? 'text-cyan-500 bg-cyan-950/30 border-cyan-900 animate-pulse' : 'text-emerald-500 bg-emerald-950/30 border-emerald-900'}`}>
                 STATUS: {loading ? 'COMPUTING_BLUEPRINT...' : 'BLUEPRINT_READY'}
               </span>
             </div>
           </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow relative bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md overflow-hidden">
        
        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-50"></div>
        <div className="absolute bottom-4 right-4 text-[100px] opacity-5 pointer-events-none select-none font-display text-white">2026</div>

        {/* DASHBOARD - Always visible */}
        <BlueprintDashboard idea={idea} />

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent my-8"></div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[200px] space-y-6">
             {/* Cyberpunk Loader */}
             <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-cyan-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-cyan-500 animate-pulse">AI</div>
             </div>
             <div className="text-center space-y-2">
               <p className="text-cyan-400 font-mono text-sm animate-pulse">GENERATING STRATEGY...</p>
             </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[200px] text-center space-y-4">
            <div className="text-4xl">⚠️</div>
            <h3 className="text-xl font-bold text-red-400 font-display">SYSTEM FAILURE</h3>
            <p className="text-slate-400 max-w-md">{error}</p>
            <button 
              onClick={() => { isFetched.current = false; window.location.reload(); }} 
              className="mt-4 px-6 py-2 bg-red-900/20 border border-red-500/50 text-red-400 hover:bg-red-900/40 rounded transition-colors"
            >
              RETRY CONNECTION
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
             <FormattedContent text={content} />
             
             <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-mono">
               <div>
                 GENERATED BY GEMINI-2.5-FLASH // {new Date().toLocaleDateString()}
               </div>
               <div className="flex gap-2">
                 <button className="px-3 py-1.5 border border-slate-700 hover:bg-cyan-900/20 hover:text-cyan-400 hover:border-cyan-500/50 rounded transition-colors">
                   SAVE BLUEPRINT
                 </button>
                 <button className="px-3 py-1.5 border border-slate-700 hover:bg-purple-900/20 hover:text-purple-400 hover:border-purple-500/50 rounded transition-colors">
                   SHARE ENCRYPTED
                 </button>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlueprintView;
