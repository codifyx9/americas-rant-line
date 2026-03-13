import React, { useState } from 'react';
import { Mic, Play, Pause, Phone, Trophy, Flame, Share2, MessageCircle, Heart, Star, Home, Radio, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function MagaRantLineHome() {
  const [playingRantId, setPlayingRantId] = useState<number | null>(null);

  const togglePlayRant = (id: number) => {
    if (playingRantId === id) {
      setPlayingRantId(null);
    } else {
      setPlayingRantId(id);
    }
  };

  const categories = [
    { name: "ALL", icon: null, active: true },
    { name: "INFLATION", icon: "📈", active: false },
    { name: "POLITICS", icon: "🏛", active: false },
    { name: "WAR", icon: "⚔️", active: false },
    { name: "WORK", icon: "💼", active: false },
    { name: "EVERYDAY LIFE", icon: "❤️", active: false }
  ];

  const sidebarRants = [
    { id: 101, title: "Rent just went up $600", votes: "1,247" },
    { id: 102, title: "Politicians don't get it", votes: "1,982" },
    { id: 103, title: "Groceries are insane", votes: "823" }
  ];

  const gridRants = [
    {
      id: 1,
      title: "Gas Prices Are Destroying My Family Budget",
      category: "Inflation",
      caller: "Patriot_TX",
      duration: "2:34",
      votes: "2,847",
    },
    {
      id: 2,
      title: "The Government Doesn't Hear Us Anymore",
      category: "Politics",
      caller: "FreedomEagle",
      duration: "4:12",
      votes: "1,923",
    },
    {
      id: 3,
      title: "My Boss Gave My Raise to His Nephew",
      category: "Work",
      caller: "WorkingMan99",
      duration: "2:18",
      votes: "987",
    },
    {
      id: 4,
      title: "Why Are We Sending Money Overseas?",
      category: "War",
      caller: "AmericaFirst1",
      duration: "3:07",
      votes: "3,456",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B1E3A] text-white font-sans selection:bg-[#D61F1F] selection:text-white pb-0 flex flex-col">
      
      {/* 1. HERO BANNER */}
      <div className="relative bg-[#0B1E3A] bg-gradient-to-br from-[#0B1E3A] to-[#061121] py-8 px-6 overflow-hidden">
        {/* Flag accent top-right */}
        <div 
          className="absolute top-0 right-0 w-48 h-full opacity-50 pointer-events-none z-0"
          style={{
            background: 'repeating-linear-gradient(0deg, #B22234 0px, #B22234 20px, white 20px, white 40px)',
          }}
        >
          {/* Canton (blue square with stars) */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-[#0B1E3A] flex flex-wrap content-start p-1 gap-1 overflow-hidden">
             {[...Array(9)].map((_, i) => (
                <span key={i} className="text-white text-xs leading-none">★</span>
             ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col items-start">
            <div className="relative group flex items-center mb-2">
              <img 
                src="/__mockup/images/logo-reference.png" 
                className="h-16 md:h-24 object-contain relative z-10" 
                alt="MAGA RANT LINE"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute top-0 left-0 h-16 md:h-24 flex items-center bg-[#D61F1F] px-4 rounded border-2 border-[#0B1E3A]">
                 <span className="font-['Black_Ops_One'] text-white text-3xl md:text-5xl">MAGA★RANTLINE</span>
              </div>
            </div>
            
            <div className="text-sm tracking-[0.2em] font-bold uppercase mt-2 drop-shadow-md">
              <span className="text-white">★ AMERICA'S VOICE. </span>
              <span className="text-[#D61F1F]">UNFILTERED.</span>
              <span className="text-white"> REAL. ★</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NAVBAR */}
      <nav className="bg-[#D61F1F] sticky top-0 z-50 h-14 shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <Mic className="w-5 h-5 text-white fill-white" />
            <span className="font-['Black_Ops_One'] text-white text-xl tracking-wide pt-1">MAGARANTLINE</span>
          </div>
          
          <div className="hidden md:flex items-center gap-3 justify-center flex-1">
            <button className="bg-[#0B1E3A] hover:bg-[#061121] rounded-full px-4 py-1.5 text-white text-sm font-semibold flex items-center gap-1.5 transition-colors">
              <Home className="w-4 h-4" /> HOME
            </button>
            <button className="bg-[#0B1E3A] hover:bg-[#061121] rounded-full px-4 py-1.5 text-white text-sm font-semibold flex items-center gap-1.5 transition-colors">
              <Radio className="w-4 h-4" /> RANT WALL
            </button>
            <button className="bg-[#0B1E3A] hover:bg-[#061121] rounded-full px-4 py-1.5 text-white text-sm font-semibold flex items-center gap-1.5 transition-colors">
              <Award className="w-4 h-4" /> LEADERBOARD
            </button>
          </div>

          <div className="flex items-center flex-shrink-0">
            <button className="bg-[#F59E0B] hover:bg-[#e69500] text-black font-bold rounded-full px-5 py-2 text-sm uppercase tracking-wide transition-colors shadow-sm whitespace-nowrap">
              LEAVE A RANT →
            </button>
          </div>
        </div>
      </nav>

      {/* 3. MAIN CONTENT AREA */}
      <main className="flex-grow bg-[#0B1E3A] py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-white font-black text-3xl md:text-5xl uppercase leading-tight mb-2 tracking-tight">
                GOT SOMETHING TO SAY?
              </h1>
              <h2 
                className="text-[#D61F1F] font-['Black_Ops_One'] text-4xl md:text-6xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                style={{ fontStyle: 'italic' }}
              >
                LEAVE YOUR RANT.
              </h2>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <button className="bg-[#D61F1F] hover:bg-red-700 text-white font-bold rounded px-6 py-3 text-lg flex items-center gap-2 shadow-lg transition-transform hover:scale-[1.02]">
                <Phone className="w-5 h-5 fill-white" /> CALL THE HOTLINE
              </button>
              <button className="bg-[#0B1E3A] hover:bg-[#0f284c] text-white border border-white/40 font-bold rounded px-6 py-3 text-lg flex items-center gap-2 shadow-lg transition-transform hover:scale-[1.02]">
                <Trophy className="w-5 h-5" /> VIEW LEADERBOARD
              </button>
            </div>

            <div className="text-[#F59E0B] font-bold uppercase tracking-wider text-sm mt-4 flex items-center gap-1.5">
              <span>⏱</span> 1,284 RANTS AND COUNTING
            </div>

            <div className="mt-10">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, idx) => (
                  <button 
                    key={idx}
                    className={`rounded-lg px-4 py-2 font-bold text-sm uppercase flex items-center gap-2 transition-colors ${
                      cat.active 
                        ? 'bg-[#D61F1F] text-white' 
                        : 'bg-[#1a1a2e] text-white border border-white/20 hover:bg-white/10'
                    }`}
                  >
                    {cat.icon && <span>{cat.icon}</span>}
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-1">
            <div className="bg-[#0d1530] border border-[#D61F1F]/40 rounded-xl overflow-hidden shadow-2xl flex flex-col h-full">
              
              <div className="bg-[#D61F1F] px-4 py-3 flex justify-between items-center border-b border-[#D61F1F]">
                <h3 className="font-['Black_Ops_One'] text-white text-lg pt-1">LATEST RANTS</h3>
                <div className="opacity-70 text-lg">🇺🇸</div>
              </div>
              
              <div className="flex-1 divide-y divide-white/10">
                {sidebarRants.map((rant) => (
                  <div key={rant.id} className="flex items-center gap-3 px-4 py-4 hover:bg-white/5 transition-colors cursor-pointer group">
                    <button 
                      onClick={() => togglePlayRant(rant.id)}
                      className="w-10 h-10 rounded-full bg-[#D61F1F] flex items-center justify-center text-white text-sm flex-shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(214,31,31,0.5)]"
                    >
                      {playingRantId === rant.id ? (
                         <Pause className="w-4 h-4 fill-white" />
                      ) : (
                         <Play className="w-4 h-4 fill-white ml-0.5" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                       <h4 className="text-white font-semibold text-sm truncate group-hover:text-gray-200">
                         "{rant.title}"
                       </h4>
                    </div>
                    <div className="flex items-center gap-1 text-[#F59E0B] text-xs font-bold whitespace-nowrap bg-[#F59E0B]/10 px-2 py-1 rounded">
                       <Flame className="w-3 h-3 fill-[#F59E0B]" />
                       {rant.votes}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* 4. WEEKLY CHALLENGE BANNER */}
      <section className="bg-[#F59E0B] py-8 px-6 w-full border-y-4 border-[#D61F1F]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <h2 className="font-['Black_Ops_One'] text-black text-3xl md:text-4xl uppercase tracking-wide drop-shadow-sm pt-1">
            TOP RANT OF THE WEEK WINS $100
          </h2>
          <button className="bg-black hover:bg-gray-900 text-white font-bold px-8 py-3 rounded text-lg uppercase tracking-wider shadow-lg transition-transform hover:scale-105 flex-shrink-0 border-2 border-black hover:border-white/20">
            ENTER THE CHALLENGE
          </button>
        </div>
      </section>

      {/* 5. LATEST RANTS GRID */}
      <section className="bg-[#080e1f] py-12 px-6 flex-grow">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-['Black_Ops_One'] text-white text-4xl mb-8 tracking-wide drop-shadow-md flex items-center gap-3">
             <Flame className="w-8 h-8 text-[#D61F1F] fill-[#D61F1F]" />
             LATEST RANTS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gridRants.map((rant) => (
              <div key={rant.id} className="bg-[#0d1530] border border-[#D61F1F]/40 hover:border-[#D61F1F] rounded-xl p-5 transition-all shadow-lg group flex flex-col gap-4 relative overflow-hidden">
                {/* Subtle gradient behind */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D61F1F]/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex gap-4 items-start relative z-10">
                  <button 
                    onClick={() => togglePlayRant(rant.id + 1000)}
                    className="w-12 h-12 rounded-full bg-[#D61F1F] flex items-center justify-center text-white flex-shrink-0 shadow-[0_0_15px_rgba(214,31,31,0.4)] group-hover:scale-105 transition-transform"
                  >
                    {playingRantId === (rant.id + 1000) ? (
                      <Pause className="w-5 h-5 fill-white" />
                    ) : (
                      <Play className="w-5 h-5 fill-white ml-1" />
                    )}
                  </button>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-bold text-white leading-snug group-hover:text-gray-200 transition-colors line-clamp-2">
                      "{rant.title}"
                    </h3>
                  </div>
                  <div className="text-gray-400 font-mono text-sm font-bold bg-black/30 px-2 py-1 rounded">
                    {rant.duration}
                  </div>
                </div>

                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-2">
                     <Badge className="bg-transparent border border-[#D61F1F] text-[#D61F1F] hover:bg-[#D61F1F] hover:text-white font-bold uppercase tracking-wider text-[10px] px-2 py-0.5">
                       {rant.category}
                     </Badge>
                     <span className="text-gray-400 text-xs font-semibold">by @{rant.caller}</span>
                  </div>
                </div>

                {/* Progress bar simulation */}
                <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden relative z-10">
                  <div className="bg-[#F59E0B] h-full rounded-full w-[0%] group-hover:w-[30%] transition-all duration-1000 ease-out"></div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 relative z-10">
                  <div className="flex items-center text-[#F59E0B] text-sm font-bold bg-[#F59E0B]/10 px-3 py-1.5 rounded-full">
                    <Flame className="w-4 h-4 mr-1.5 fill-[#F59E0B]" />
                    {rant.votes} votes
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded transition-colors">
                      <Share2 className="w-3.5 h-3.5" /> SHARE
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-bold text-green-400 hover:text-green-300 bg-green-400/10 hover:bg-green-400/20 px-3 py-1.5 rounded transition-colors">
                      <span className="text-base leading-none mb-0.5">$</span> TIP
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
             <button className="bg-transparent border border-white/20 text-white font-bold py-3 px-8 rounded hover:bg-white/5 hover:border-white/40 transition-colors uppercase tracking-wider text-sm">
               Load More Rants ↓
             </button>
          </div>
        </div>
      </section>

    </div>
  );
}
