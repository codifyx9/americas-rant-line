import React, { useState } from 'react';
import { Mic, Play, Share2, DollarSign, Flame, Menu } from 'lucide-react';

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
      duration: '2:34',
      votes: '2,847',
      caller: 'Anonymous from Texas',
      progress: 35,
    },
    {
      id: 2,
      title: "The Government Doesn't Hear Us Anymore",
      category: 'Politics',
      duration: '4:12',
      votes: '1,923',
      caller: 'Anonymous from Ohio',
      progress: 35,
    },
    {
      id: 3,
      title: 'My Son Came Home from Overseas Changed',
      category: 'War Concerns',
      duration: '3:45',
      votes: '1,456',
      caller: 'Anonymous from Georgia',
      progress: 35,
    },
    {
      id: 4,
      title: 'My Boss Gave My Raise to His Nephew',
      category: 'Work Frustrations',
      duration: '2:18',
      votes: '987',
      caller: 'Anonymous from Florida',
      progress: 35,
    },
    {
      id: 5,
      title: 'Dating Apps Are Built to Keep You Single',
      category: 'Dating Stories',
      duration: '5:02',
      votes: '876',
      caller: 'Anonymous from Michigan',
      progress: 35,
    },
    {
      id: 6,
      title: 'Grocery Store Lines Are Getting Ridiculous',
      category: 'Everyday Life',
      duration: '1:57',
      votes: '654',
      caller: 'Anonymous from Arizona',
      progress: 35,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B1E3A] text-white font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#D61F1F] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left */}
            <div className="flex items-center gap-2">
              <Mic className="w-6 h-6 text-white" />
              <span className="font-['Bebas_Neue'] text-white text-2xl tracking-widest mt-1">
                MAGARANTLINE
              </span>
            </div>

            {/* Center (Desktop) */}
            <div className="hidden md:flex items-center space-x-8">
              <button className="text-white hover:text-white/80 font-bold text-sm uppercase tracking-wider transition-colors">
                Home
              </button>
              <button className="text-white font-bold text-sm uppercase tracking-wider underline underline-offset-8 decoration-2 decoration-white">
                Rant Wall
              </button>
              <button className="text-white hover:text-white/80 font-bold text-sm uppercase tracking-wider transition-colors">
                Leaderboard
              </button>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <button className="hidden md:block bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-colors shadow-md">
                LEAVE A RANT
              </button>
              <button className="md:hidden text-white">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="relative bg-[#0B1E3A] overflow-hidden">
        {/* Subtle Star Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden flex flex-wrap content-start">
          {Array.from({ length: 150 }).map((_, i) => (
            <span
              key={i}
              className="text-white text-xs p-4"
              style={{
                transform: `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`,
              }}
            >
              ★
            </span>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
          <h1 className="font-['Bebas_Neue'] text-white text-6xl text-center mb-1 tracking-wide">
            RANT WALL
          </h1>
          <p className="text-[#F59E0B] text-center italic text-lg mb-8">
            Unfiltered. Unscripted. Uncensored.
          </p>

          {/* Filters */}
          <div className="flex overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center gap-2 pb-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#D61F1F] text-white'
                    : 'border border-white/30 text-white hover:bg-white/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Rants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {rants.map((rant) => (
            <div
              key={rant.id}
              className="bg-[#0B1E3A] border border-[#D61F1F]/50 rounded-2xl p-5 hover:border-[#D61F1F] transition-colors flex flex-col group"
            >
              {/* TOP: Play & Title & Duration */}
              <div className="flex items-start gap-4 mb-3">
                <button className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-[#F59E0B] flex items-center justify-center bg-transparent group-hover:bg-[#F59E0B]/10 transition-colors">
                  <Play className="w-4 h-4 text-[#F59E0B] ml-1" fill="currentColor" />
                </button>
                <h3 className="text-lg font-bold text-white leading-snug flex-1">
                  {rant.title}
                </h3>
                <span className="flex-shrink-0 bg-black/40 text-gray-300 text-xs px-2 py-1 rounded-md">
                  {rant.duration}
                </span>
              </div>

              {/* Row 2: Category badge + caller */}
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#D61F1F] text-white text-xs rounded-full px-2 py-0.5 whitespace-nowrap">
                  {rant.category}
                </span>
                <span className="text-sm text-gray-400">
                  {rant.caller}
                </span>
              </div>

              {/* Row 3: Progress Bar */}
              <div className="mb-4">
                <div className="h-1 w-full bg-white/10 rounded overflow-hidden">
                  <div
                    className="h-full bg-[#F59E0B] rounded-full"
                    style={{ width: `${rant.progress}%` }}
                  />
                </div>
              </div>

              {/* Row 4: Votes & Actions */}
              <div className="flex items-center mt-auto">
                <div className="flex items-center gap-1.5 text-[#F59E0B]">
                  <Flame className="w-5 h-5" fill="currentColor" />
                  <span className="font-bold">{rant.votes} votes</span>
                </div>
                
                <div className="flex-1"></div>

                <div className="flex items-center gap-3 text-gray-400">
                  <button className="hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="hover:text-[#4ADE80] transition-colors p-1.5 rounded-full hover:bg-white/10">
                    <DollarSign className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <button className="border border-[#D61F1F] text-[#D61F1F] hover:bg-[#D61F1F] hover:text-white px-8 py-3 rounded-full font-bold transition-colors">
            Load More
          </button>
        </div>
      </main>
      
      {/* Mobile Sticky Action */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button className="bg-[#F59E0B] text-black w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
          <Mic className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
