import React, { useState } from 'react';
import { Mic, Play, Share2, DollarSign, Flame } from 'lucide-react';

export default function RantsFeed() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filters = [
    { label: 'ALL', icon: '' },
    { label: 'INFLATION', icon: '📈' },
    { label: 'POLITICS', icon: '🏛' },
    { label: 'WAR CONCERNS', icon: '⚔️' },
    { label: 'WORK FRUSTRATIONS', icon: '💼' },
    { label: 'DATING STORIES', icon: '❤️' },
    { label: 'EVERYDAY LIFE', icon: '🌱' },
  ];

  const rants = [
    {
      id: 1,
      title: 'Gas Prices Are Destroying My Family Budget',
      category: 'Inflation',
      duration: '2:34',
      votes: '2,847',
      state: 'Texas',
      progress: 38,
    },
    {
      id: 2,
      title: "The Government Doesn't Hear Us Anymore",
      category: 'Politics',
      duration: '4:12',
      votes: '1,923',
      state: 'Ohio',
      progress: 38,
    },
    {
      id: 3,
      title: 'My Son Came Home from Overseas Changed Forever',
      category: 'War Concerns',
      duration: '3:45',
      votes: '1,456',
      state: 'Georgia',
      progress: 38,
    },
    {
      id: 4,
      title: 'My Boss Gave My Raise to His Nephew',
      category: 'Work Frustrations',
      duration: '2:18',
      votes: '987',
      state: 'Florida',
      progress: 38,
    },
    {
      id: 5,
      title: 'Dating Apps Are Built to Keep You Single',
      category: 'Dating Stories',
      duration: '5:02',
      votes: '876',
      state: 'Michigan',
      progress: 38,
    },
    {
      id: 6,
      title: 'Grocery Store Lines Are Completely Out of Control',
      category: 'Everyday Life',
      duration: '1:57',
      votes: '654',
      state: 'Arizona',
      progress: 38,
    },
  ];

  return (
    <div className="min-h-screen bg-[#080e1f] font-sans text-white">
      {/* HERO BANNER */}
      <div className="bg-[#0B1E3A] relative overflow-hidden py-5 px-6 flex items-center justify-between">
        <div className="z-10 flex flex-col items-start">
          <img
            src="/__mockup/images/logo-reference.png"
            className="h-14 object-contain"
            alt="MAGA RANT LINE"
          />
          <div className="text-white text-xs uppercase tracking-widest mt-1 font-bold">
            ★ AMERICA'S VOICE. <span style={{ color: '#D61F1F' }}>UNFILTERED.</span> REAL. ★
          </div>
        </div>

        {/* RIGHT (flag corner) */}
        <div className="absolute top-0 right-0 w-40 h-full pointer-events-none overflow-hidden opacity-50">
          <div
            className="absolute inset-0"
            style={{
              background: 'repeating-linear-gradient(0deg, #B22234 0px, #B22234 18px, #FFFFFF 18px, #FFFFFF 36px)',
              transform: 'rotate(-10deg) scale(1.5)',
              transformOrigin: 'top right'
            }}
          ></div>
          <div className="absolute top-0 left-0 w-20 h-24 bg-[#0B1E3A] flex flex-wrap content-start p-1" style={{ transform: 'rotate(-10deg) scale(1.5)', transformOrigin: 'top right' }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="text-white text-[8px] mx-0.5">★</span>
            ))}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#D61F1F] h-14 flex items-center px-4 gap-3 shadow-lg">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <Mic className="w-5 h-5 text-white" />
          <span className="font-['Black_Ops_One'] text-white text-xl tracking-wide mt-1">
            MAGARANTLINE
          </span>
        </div>

        {/* CENTER */}
        <div className="hidden md:flex items-center gap-3 ml-8">
          <button className="bg-[#0B1E3A] hover:bg-[#0B1E3A]/80 transition-colors rounded-full px-4 py-1 text-white text-sm font-semibold flex items-center gap-2">
            <span>🏠</span> HOME
          </button>
          <button className="bg-[#0B1E3A] hover:bg-[#0B1E3A]/80 transition-colors rounded-full px-4 py-1 text-white text-sm font-semibold flex items-center gap-2 border border-white/20">
            <span>📻</span> RANT WALL
          </button>
          <button className="bg-[#0B1E3A] hover:bg-[#0B1E3A]/80 transition-colors rounded-full px-4 py-1 text-white text-sm font-semibold flex items-center gap-2">
            <span>🏆</span> LEADERBOARD
          </button>
        </div>

        {/* RIGHT */}
        <button className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 transition-colors text-black font-bold rounded-full px-5 py-2 text-sm ml-auto flex items-center gap-1">
          LEAVE A RANT <span className="ml-1">→</span>
        </button>
      </nav>

      {/* RANT WALL PAGE CONTENT */}
      
      {/* PAGE HEADER SECTION */}
      <section className="bg-[#0B1E3A] py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-['Black_Ops_One'] text-white text-6xl text-center mb-2">
            RANT WALL
          </h1>
          <p className="text-[#F59E0B] italic text-center text-sm mb-6">
            Unfiltered. Unscripted. Uncensored.
          </p>
          
          {/* CATEGORY FILTER PILLS */}
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.label;
              return (
                <button
                  key={filter.label}
                  onClick={() => setActiveFilter(filter.label)}
                  className={`rounded-full px-4 py-2 text-sm font-bold uppercase transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#D61F1F] text-white'
                      : 'bg-[#1a1a2e] text-white border border-white/20 hover:bg-[#1a1a2e]/80'
                  }`}
                >
                  {filter.icon && <span>{filter.icon}</span>}
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* RANT CARDS GRID */}
      <section className="px-6 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rants.map((rant) => (
            <div
              key={rant.id}
              className="bg-[#0d1530] border border-[#D61F1F]/40 rounded-2xl p-5 hover:border-[#D61F1F]/80 transition-colors flex flex-col"
            >
              {/* TOP ROW */}
              <div className="flex gap-3 items-start">
                <button className="w-11 h-11 min-w-[44px] rounded-full bg-[#D61F1F] flex items-center justify-center text-white hover:bg-[#D61F1F]/90 transition-colors flex-shrink-0">
                  <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                </button>
                <h3 className="text-white font-bold flex-1 leading-tight text-lg mt-0.5">
                  {rant.title}
                </h3>
                <span className="bg-black/40 text-gray-300 text-xs px-2 py-1 rounded flex-shrink-0 font-medium whitespace-nowrap">
                  {rant.duration}
                </span>
              </div>

              {/* ROW 2 */}
              <div className="flex gap-2 items-center mt-3">
                <span className="bg-[#D61F1F]/20 text-[#D61F1F] border border-[#D61F1F]/40 rounded-full px-3 py-0.5 text-xs font-bold whitespace-nowrap">
                  {rant.category}
                </span>
                <span className="text-gray-400 text-sm truncate">
                  Anonymous from {rant.state}
                </span>
              </div>

              {/* PROGRESS BAR */}
              <div className="h-1 bg-white/10 rounded-full mt-4 w-full overflow-hidden">
                <div
                  className="bg-[#F59E0B] rounded-full h-full"
                  style={{ width: `${rant.progress}%` }}
                />
              </div>

              {/* BOTTOM ROW */}
              <div className="flex items-center mt-4">
                <div className="flex items-center gap-1.5 text-[#F59E0B]">
                  <Flame className="w-4 h-4" fill="currentColor" />
                  <span className="font-bold text-sm">{rant.votes}</span>
                </div>
                
                <div className="flex-1"></div>

                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 border border-white/10 text-gray-400 rounded-lg px-3 py-1.5 text-xs hover:bg-white/10 hover:text-white transition-colors font-medium">
                    <Share2 className="w-3.5 h-3.5" />
                    SHARE
                  </button>
                  <button className="flex items-center gap-1.5 bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30 rounded-lg px-3 py-1.5 text-xs hover:bg-[#F59E0B]/20 transition-colors font-bold">
                    <DollarSign className="w-3.5 h-3.5" />
                    TIP
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        <div className="flex justify-center mt-8">
          <button className="border-2 border-[#D61F1F] text-[#D61F1F] font-bold rounded-full px-10 py-3 hover:bg-[#D61F1F] hover:text-white transition-colors tracking-wide">
            LOAD MORE
          </button>
        </div>
      </section>

    </div>
  );
}
