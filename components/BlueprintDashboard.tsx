import React, { useMemo } from 'react';
import { BusinessIdea } from '../types';

interface BlueprintDashboardProps {
  idea: BusinessIdea;
}

// Helper to generate stable pseudo-random numbers for consistency
const getSeededRandom = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const x = Math.sin(hash) * 10000;
  return x - Math.floor(x);
};

export const BlueprintDashboard: React.FC<BlueprintDashboardProps> = ({ idea }) => {
  
  const metrics = useMemo(() => {
    const r1 = getSeededRandom(idea.id + '1');
    const r2 = getSeededRandom(idea.id + '2');
    const r3 = getSeededRandom(idea.id + '3');

    return {
      cagr: Math.floor(12 + r1 * 35), // 12-47%
      marketSize: (2.5 + r2 * 8).toFixed(1), // 2.5B - 10.5B
      riskScore: Math.floor(30 + r3 * 40), // 30-70
      timeToProfit: Math.floor(6 + r1 * 12) // 6-18 months
    };
  }, [idea.id]);

  // Generate Trend Line Data
  const trendPoints = useMemo(() => {
    const points = [];
    let value = 20;
    for (let i = 0; i < 7; i++) {
      const growth = getSeededRandom(idea.id + i) * 15 + 5;
      value += growth;
      points.push(value);
    }
    const max = Math.max(...points);
    return points.map(p => (p / max) * 100); // Normalize to 0-100
  }, [idea.id]);

  // SVG Path Generator for Trend Line
  const getPath = () => {
    return trendPoints.map((y, i) => {
      const x = (i / (trendPoints.length - 1)) * 100;
      return `${i === 0 ? 'M' : 'L'} ${x} ${100 - y}`;
    }).join(' ');
  };

  // Area Gradient Path
  const getAreaPath = () => {
    return `${getPath()} L 100 100 L 0 100 Z`;
  };

  return (
    <div className="mb-8 space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MAIN CHART: Market Trajectory */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-xl p-6 relative overflow-hidden group">
           {/* Background Grid */}
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           
           <div className="relative z-10 flex justify-between items-end mb-6">
             <div>
               <h3 className="text-cyan-400 font-display text-sm tracking-widest flex items-center gap-2">
                 <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                 MARKET VELOCITY (2024-2030)
               </h3>
               <p className="text-slate-500 text-xs mt-1 font-mono">PROJECTED ADOPTION CURVE // SERIES A PREDICTION</p>
             </div>
             <div className="text-right">
                <div className="text-2xl font-bold text-white font-display">+{metrics.cagr}%</div>
                <div className="text-xs text-emerald-500 font-mono">CAGR (Estimated)</div>
             </div>
           </div>

           {/* Chart Container */}
           <div className="h-48 w-full relative">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                {/* Defs for Gradients */}
                <defs>
                  <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* X-Axis Lines */}
                {[0, 25, 50, 75, 100].map(y => (
                  <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
                ))}

                {/* The Area Fill */}
                <path d={getAreaPath()} fill="url(#trendGradient)" />
                
                {/* The Line */}
                <path d={getPath()} fill="none" stroke="#22d3ee" strokeWidth="2" vectorEffect="non-scaling-stroke" className="drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                
                {/* Data Points */}
                {trendPoints.map((y, i) => (
                   <circle 
                     key={i} 
                     cx={(i / (trendPoints.length - 1)) * 100} 
                     cy={100 - y} 
                     r="1.5" 
                     fill="#fff" 
                     className="group-hover:r-2 transition-all duration-300"
                   />
                ))}
              </svg>
              
              {/* X-Axis Labels */}
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2">
                <span>2024</span>
                <span>2025</span>
                <span>2026</span>
                <span>2027</span>
                <span>2028</span>
                <span>2029</span>
                <span>2030</span>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: Metrics & Radar */}
        <div className="space-y-4 flex flex-col">
          
          {/* Metric Cards Row */}
          <div className="grid grid-cols-2 gap-4 flex-grow">
             <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex flex-col justify-between hover:border-purple-500/50 transition-colors">
               <div className="text-purple-400 text-xs font-mono uppercase">Market Cap</div>
               <div>
                 <div className="text-xl font-bold text-white">${metrics.marketSize}B</div>
                 <div className="text-[10px] text-slate-500">Total Addressable Market</div>
               </div>
             </div>
             
             <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
               <div className="text-emerald-400 text-xs font-mono uppercase">Time-to-Market</div>
               <div>
                 <div className="text-xl font-bold text-white">{metrics.timeToProfit}mo</div>
                 <div className="text-[10px] text-slate-500">MVP Deployment</div>
               </div>
             </div>
          </div>

          {/* "Analysis" Bar Block */}
          <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl flex-grow">
             <h4 className="text-xs text-slate-400 font-mono uppercase mb-4 border-b border-slate-800 pb-2">Feasibility Analysis</h4>
             
             <div className="space-y-3">
               <div>
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-slate-300">Scalability</span>
                   <span className="text-cyan-400">92%</span>
                 </div>
                 <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-500 w-[92%] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                 </div>
               </div>

               <div>
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-slate-300">Tech Maturity</span>
                   <span className="text-fuchsia-400">78%</span>
                 </div>
                 <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-fuchsia-500 w-[78%] shadow-[0_0_10px_rgba(217,70,239,0.5)]"></div>
                 </div>
               </div>

               <div>
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-slate-300">Reg. Risk</span>
                   <span className={metrics.riskScore > 50 ? "text-orange-400" : "text-emerald-400"}>{metrics.riskScore}%</span>
                 </div>
                 <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                   <div 
                     className={`h-full w-[${metrics.riskScore}%] ${metrics.riskScore > 50 ? 'bg-orange-500' : 'bg-emerald-500'}`} 
                     style={{ width: `${metrics.riskScore}%` }}
                   ></div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
