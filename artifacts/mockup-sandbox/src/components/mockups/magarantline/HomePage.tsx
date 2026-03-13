import React, { useState } from 'react';
import { Mic, Play, Pause, Phone, Trophy, Flame, Share2, MessageCircle, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function MagaRantLineHome() {
  const [isPlayingFeatured, setIsPlayingFeatured] = useState(false);
  const [playingRantId, setPlayingRantId] = useState<number | null>(null);

  const togglePlayFeatured = () => setIsPlayingFeatured(!isPlayingFeatured);
  
  const togglePlayRant = (id: number) => {
    if (playingRantId === id) {
      setPlayingRantId(null);
    } else {
      setPlayingRantId(id);
    }
  };

  const categories = [
    "Inflation", "War Concerns", "Politics", "Work Frustrations", "Dating Stories", "Everyday Life"
  ];

  const recentRants = [
    {
      id: 1,
      title: "Gas Prices Are Destroying My Family Budget",
      category: "Inflation",
      duration: "2:34",
      votes: "2,847",
    },
    {
      id: 2,
      title: "The Government Doesn't Hear Us Anymore",
      category: "Politics",
      duration: "4:12",
      votes: "1,923",
    },
    {
      id: 3,
      title: "My Boss Gave My Raise to His Nephew",
      category: "Work Frustrations",
      duration: "2:18",
      votes: "987",
    },
    {
      id: 4,
      title: "Dating Apps Are Built to Keep You Single",
      category: "Dating Stories",
      duration: "3:07",
      votes: "654",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B1E3A] text-white font-sans selection:bg-[#D61F1F] selection:text-white pb-0">
      {/* LOGO/NAVBAR */}
      <nav className="bg-[#D61F1F] sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-6 h-6 text-white" />
            <span className="font-['Bebas_Neue'] text-white text-3xl tracking-widest pt-1">MAGARANTLINE</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-widest uppercase text-white/90">
            <a href="#" className="hover:text-white transition-colors border-b-2 border-transparent hover:border-white pb-1">Home</a>
            <a href="#" className="hover:text-white transition-colors border-b-2 border-transparent hover:border-white pb-1">Rant Wall</a>
            <a href="#" className="hover:text-white transition-colors border-b-2 border-transparent hover:border-white pb-1">Leaderboard</a>
          </div>

          <div className="flex items-center">
            <button className="bg-[#F59E0B] hover:bg-amber-400 text-black font-bold px-5 py-2.5 rounded shadow-sm transition-colors text-sm uppercase tracking-wide">
              LEAVE A RANT
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 px-4 text-center overflow-hidden bg-gradient-to-br from-[#0B1E3A] to-[#D61F1F] min-h-[85vh] flex flex-col justify-center border-b border-[#D61F1F]/30">
        {/* Subtle star pattern overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {[...Array(30)].map((_, i) => (
            <span 
              key={i} 
              className="absolute text-2xl text-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `scale(${0.5 + Math.random() * 1})`,
              }}
            >
              ★
            </span>
          ))}
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center w-full">
          
          {/* Headlines */}
          <h1 className="font-['Bebas_Neue'] text-white text-6xl md:text-9xl tracking-wider leading-[0.85] mb-2 drop-shadow-lg">
            GOT SOMETHING <br/>TO SAY?
          </h1>
          <h2 className="font-['Bebas_Neue'] text-[#F59E0B] text-5xl md:text-8xl tracking-wider leading-none mb-8 drop-shadow-md">
            LEAVE YOUR RANT.
          </h2>

          {/* Live Banner */}
          <div className="inline-flex items-center gap-2.5 bg-black/40 backdrop-blur border border-white/10 px-5 py-2 rounded-full mb-10 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D61F1F] animate-pulse shadow-[0_0_8px_#D61F1F]"></span>
            <span className="text-white text-sm font-bold uppercase tracking-widest">LIVE HOTLINE — Calls are being recorded</span>
          </div>

          {/* Featured rant audio player card */}
          <div className="w-full bg-black/50 backdrop-blur-md border border-[#D61F1F]/50 rounded-xl p-5 mb-10 shadow-2xl text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D61F1F]/10 rounded-bl-full pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-4">
              <Badge className="bg-[#D61F1F] text-white hover:bg-[#D61F1F] border-none font-bold uppercase tracking-wide px-3">
                Inflation
              </Badge>
              <div className="flex items-center text-[#F59E0B] font-bold text-sm bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/20">
                <Flame className="w-3.5 h-3.5 mr-1.5 fill-[#F59E0B]" />
                Trending
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-white mb-5 pr-12 leading-tight">
              "Rent just went up $600"
            </h3>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={togglePlayFeatured}
                className="w-14 h-14 rounded-full bg-[#F59E0B] flex items-center justify-center text-black hover:scale-105 transition-transform flex-shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
              >
                {isPlayingFeatured ? (
                  <Pause className="w-6 h-6 fill-black" />
                ) : (
                  <Play className="w-6 h-6 fill-black ml-1" />
                )}
              </button>
              
              <div className="flex-1">
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden mb-2 relative">
                  <div className="absolute top-0 left-0 h-full bg-[#F59E0B] w-[40%] rounded-full shadow-[0_0_10px_#F59E0B]"></div>
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span className="text-[#F59E0B]">1:06</span>
                  <span>2:47</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full mb-6">
            <button className="w-full md:w-auto bg-[#D61F1F] hover:bg-red-700 text-white font-bold text-lg h-14 px-8 rounded flex items-center justify-center gap-2 shadow-lg transition-colors">
              <Phone className="w-5 h-5 fill-white" />
              CALL THE HOTLINE
            </button>
            
            <button className="w-full md:w-auto bg-[#0B1E3A] hover:bg-[#0f284c] text-white border border-white/30 font-bold text-lg h-14 px-8 rounded flex items-center justify-center gap-2 shadow-lg transition-colors">
              <Trophy className="w-5 h-5" />
              VIEW LEADERBOARD
            </button>
          </div>
          
          <div className="text-white/70 text-sm font-bold uppercase tracking-widest">
            1,284 RANTS AND COUNTING
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="bg-[#0B1E3A] py-16 px-4 border-b border-white/5 relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-['Bebas_Neue'] text-white text-4xl text-center mb-8 tracking-wide">
            WHAT PEOPLE ARE TALKING ABOUT
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, idx) => (
              <button 
                key={idx}
                className="border border-white/30 text-white rounded-full px-5 py-2.5 hover:bg-[#D61F1F] hover:border-[#D61F1F] transition-all font-semibold text-sm shadow-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST RANTS SECTION */}
      <section className="py-20 px-4 bg-[#061121]">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-wide">LATEST RANTS</h2>
            <div className="h-[1px] flex-1 bg-white/10 mx-6 hidden sm:block"></div>
            <button className="text-[#F59E0B] font-bold text-sm uppercase tracking-wider hover:underline hidden sm:block">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentRants.map((rant) => (
              <div key={rant.id} className="bg-[#0B1E3A] border border-[#D61F1F]/60 hover:border-[#D61F1F] rounded-xl p-5 space-y-4 transition-all shadow-lg hover:shadow-[#D61F1F]/10 group">
                <div className="flex justify-between items-start">
                  <Badge className="bg-[#D61F1F] text-white hover:bg-[#D61F1F] border-none font-bold uppercase tracking-wider text-[10px] px-2.5 py-0.5">
                    {rant.category}
                  </Badge>
                  <span className="text-gray-400 text-xs font-bold bg-white/5 px-2 py-1 rounded">
                    {rant.duration}
                  </span>
                </div>
                
                <div className="flex gap-4 items-start pt-1">
                  <button 
                    onClick={() => togglePlayRant(rant.id)}
                    className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center text-black flex-shrink-0 hover:scale-105 transition-transform shadow-md"
                  >
                    {playingRantId === rant.id ? (
                      <Pause className="w-5 h-5 fill-black" />
                    ) : (
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    )}
                  </button>
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#F59E0B] transition-colors">
                    "{rant.title}"
                  </h3>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-white/5">
                  <div className="flex items-center text-[#D61F1F] text-sm font-bold">
                    <Flame className="w-4 h-4 mr-1.5 fill-[#D61F1F]" />
                    {rant.votes} votes
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-8 border border-white/20 text-white font-bold py-3 rounded hover:bg-white/5 transition-colors sm:hidden">
            VIEW ALL RANTS
          </button>
        </div>
      </section>

      {/* WEEKLY CHALLENGE BANNER */}
      <section className="bg-[#F59E0B] py-12 px-4 border-y-4 border-[#D61F1F]">
        <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
          <h2 className="font-['Bebas_Neue'] text-black text-4xl md:text-5xl tracking-wide mb-6">
            TOP RANT OF THE WEEK WINS $100
          </h2>
          <button className="bg-black text-[#F59E0B] hover:bg-gray-900 font-black text-lg px-8 py-4 rounded shadow-xl uppercase tracking-widest transition-transform hover:scale-105">
            ENTER THE CHALLENGE
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B1E3A] py-12 px-4 text-center md:text-left">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <Mic className="w-6 h-6 text-[#D61F1F]" />
              <span className="font-['Bebas_Neue'] text-white text-3xl tracking-widest pt-1">MAGARANTLINE</span>
            </div>
            <p className="text-gray-400 font-medium text-sm">
              The people's hotline. Unfiltered. Unscripted.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="text-gray-400 font-medium text-sm mb-1 uppercase tracking-widest">Call to vent</div>
            <div className="text-[#D61F1F] font-black text-2xl tracking-wider">
              1-800-RANT-NOW
            </div>
          </div>
        </div>
        
        <div className="container mx-auto max-w-5xl mt-12 pt-6 border-t border-white/10 text-center text-sm text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} MagaRantLine. All rights reserved. Standard rates may apply.</p>
        </div>
      </footer>
    </div>
  );
}
