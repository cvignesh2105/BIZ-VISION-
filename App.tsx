import React, { useState } from 'react';
import { BusinessIdea } from './types';
import { BUSINESS_IDEAS } from './constants';
import IdeaCard from './components/IdeaCard';
import BlueprintView from './components/BlueprintView';
import { Header } from './components/Header';

const App: React.FC = () => {
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);

  const handleSelectIdea = (idea: BusinessIdea) => {
    setSelectedIdea(idea);
  };

  const handleBack = () => {
    setSelectedIdea(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <Header />

        <main className="mt-8">
          {!selectedIdea ? (
            <div className="animate-fade-in">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-bold mb-2">
                  Select an Opportunity
                </h2>
                <p className="text-slate-400">
                  Explore curated high-potential ventures for the post-2025 economy.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BUSINESS_IDEAS.map((idea) => (
                  <IdeaCard 
                    key={idea.id} 
                    idea={idea} 
                    onClick={() => handleSelectIdea(idea)} 
                  />
                ))}
              </div>
            </div>
          ) : (
            <BlueprintView idea={selectedIdea} onBack={handleBack} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;