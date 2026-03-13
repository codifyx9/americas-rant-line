import React, { useState } from 'react';
import { Play, Share2, Flame, Clock } from 'lucide-react';

export default function RantsFeed() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    'All',
    'Inflation',
    'Politics',
    'War Concerns',
    'Work Frustrations',
    'Dating Stories',
    'Everyday Life',
  ];

  const rants = [
    {
      id: 1,
      title: 'Gas Prices Are Destroying My Family Budget',
      category: 'Inflation',
      categoryColor: 'bg-red-600',
      duration: '2:34',
      votes: '2,847',
      caller: 'Anonymous from Texas',
      progress: 30,
    },
    {
      id: 2,
      title: "The Government Doesn't Care About Us Anymore",
      category: 'Politics',
      categoryColor: 'bg-blue-600',
      duration: '4:12',
      votes: '1,923',
      caller: 'Anonymous from Ohio',
      progress: 60,
    },
    {
      id: 3,
      title: 'My Son Came Home from Overseas — CHANGED FOREVER',
      category: 'War Concerns',
      categoryColor: 'bg-green-600',
      duration: '3:45',
      votes: '1,456',
      caller: 'Anonymous from Georgia',
      progress: 15,
    },
    {
      id: 4,
      title: 'My Boss Gave My Raise to His Nephew',
      category: 'Work Frustrations',
      categoryColor: 'bg-orange-600',
      duration: '2:18',
      votes: '987',
      caller: 'Anonymous from Florida',
      progress: 80,
    },
    {
      id: 5,
      title: 'Why Do Women Only Date Rich Guys Now?',
      category: 'Dating Stories',
      categoryColor: 'bg-pink-600',
      duration: '5:02',
      votes: '876',
      caller: 'Anonymous from Michigan',
      progress: 45,
    },
    {
      id: 6,
      title: 'Grocery Store Checkout Lines Are Getting Out of Hand',
      category: 'Everyday Life',
      categoryColor: 'bg-purple-600',
      duration: '1:57',
      votes: '654',
      caller: 'Anonymous from Arizona',
      progress: 10,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans selection:bg-[#FFFFFF] selection:text-black">
      {/* Navigation Bar */}
      <nav className="bg-[#cc0000] sticky top-0 z-50 shadow-lg border-b border-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tight flex items-center gap-2">
                📻 MagaRantLine
              </span>
            </div>
            <div className="hidden md:flex space-x-1">
              {['Home', 'Rants', 'Leaderboard', 'Leave a Rant'].map((item) => (
                <button
                  key={item}
                  className={`px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors ${
                    item === 'Rants'
                      ? 'bg-[#FFFFFF] text-[#cc0000] shadow-[0_0_10px_rgba(255,215,0,0.5)]'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            {/* Mobile menu button placeholder */}
            <div className="md:hidden flex items-center">
              <button className="text-white hover:text-[#FFFFFF]">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black mb-3 text-white uppercase tracking-tight flex items-center justify-center md:justify-start gap-3">
            <Flame className="w-10 h-10 text-[#FFFFFF]" />
            Latest Rants
          </h1>
          <p className="text-xl text-gray-300 font-medium">
            Fresh off the hotline — unfiltered, uncensored
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex space-x-2 w-max">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 border-2 ${
                  activeFilter === filter
                    ? 'bg-[#FFFFFF] border-[#FFFFFF] text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                    : 'bg-transparent border-[#cc0000]/50 text-gray-300 hover:border-[#FFFFFF] hover:text-[#FFFFFF]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Rants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rants.map((rant) => (
            <div
              key={rant.id}
              className="bg-[#111827] rounded-xl border border-[#cc0000]/40 p-5 hover:border-[#cc0000]/70 transition-all duration-300 shadow-lg group relative overflow-hidden flex flex-col h-full"
            >
              {/* Top Row: Play & Title & Duration */}
              <div className="flex items-start gap-4 mb-4">
                <button className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-[#FFFFFF] flex items-center justify-center bg-transparent hover:bg-[#FFFFFF]/10 transition-colors group-hover:scale-105 duration-300">
                  <Play className="w-5 h-5 text-[#FFFFFF] ml-1" fill="currentColor" />
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-[#FFFFFF] transition-colors line-clamp-2">
                    {rant.title}
                  </h3>
                  <div className="flex items-center flex-wrap gap-2">
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${rant.categoryColor} text-white`}>
                      {rant.category}
                    </span>
                    <span className="flex items-center text-xs text-gray-400 font-medium bg-black/30 px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3 mr-1" />
                      {rant.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Caller Info */}
              <div className="mb-4">
                <p className="text-sm text-gray-400 italic font-medium">
                  {rant.caller}
                </p>
              </div>

              {/* Audio Progress Bar */}
              <div className="mt-auto mb-5">
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="h-full bg-[#FFFFFF] relative transition-all duration-300 ease-linear"
                    style={{ width: `${rant.progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1.5 font-mono">
                  <span>0:{(rant.progress / 100 * 200).toFixed(0).padStart(2, '0')}</span>
                  <span>{rant.duration}</span>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between pt-4 border-t border-[#cc0000]/40/80">
                <div className="flex items-center text-[#FFFFFF] font-bold">
                  <Flame className="w-5 h-5 mr-1.5" fill="currentColor" />
                  <span className="text-lg">{rant.votes}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 rounded-full border-2 border-[#FFFFFF] text-[#FFFFFF] font-bold uppercase tracking-widest hover:bg-[#FFFFFF] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]">
            Load More Rants
          </button>
        </div>
      </main>
    </div>
  );
}
