import React, { useState } from 'react';
import { Play, Pause, Share2, Flame, Clock, Search, Filter, ChevronDown, TrendingUp, Star, Mic, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FILTERS = ['All', 'Inflation', 'Politics', 'War Concerns', 'Work', 'Dating', 'Everyday Life', 'Border', 'Education', 'Economy'];
const SORT_OPTIONS = ['🔥 Hottest', '🆕 Newest', '👍 Most Voted', '🕐 Longest'];

const RANTS = [
  { id: 1, title: 'Gas Prices Are Destroying My Family Budget', category: 'Inflation', catColor: 'bg-red-700', duration: '2:34', votes: '2,847', caller: 'Anonymous from Texas', ago: '4m', progress: 30, plays: '14.2k', isHot: true },
  { id: 2, title: "The Government Doesn't Care About Us Anymore", category: 'Politics', catColor: 'bg-blue-700', duration: '4:12', votes: '1,923', caller: 'Anonymous from Ohio', ago: '12m', progress: 60, plays: '9.8k', isHot: true },
  { id: 3, title: 'My Son Came Home from Overseas — CHANGED FOREVER', category: 'War Concerns', catColor: 'bg-green-700', duration: '3:45', votes: '1,456', caller: 'Anonymous from Georgia', ago: '19m', progress: 15, plays: '7.3k', isHot: false },
  { id: 4, title: 'My Boss Gave My Raise to His Nephew — I Quit On The Spot', category: 'Work', catColor: 'bg-orange-700', duration: '2:18', votes: '987', caller: 'Anonymous from Florida', ago: '27m', progress: 80, plays: '5.1k', isHot: false },
  { id: 5, title: 'Why Do Women Only Date Rich Guys Now?', category: 'Dating', catColor: 'bg-pink-700', duration: '5:02', votes: '876', caller: 'Anonymous from Michigan', ago: '35m', progress: 45, plays: '4.4k', isHot: false },
  { id: 6, title: 'Grocery Store Checkout Lines Are Getting Out of Hand', category: 'Everyday Life', catColor: 'bg-purple-700', duration: '1:57', votes: '654', caller: 'Anonymous from Arizona', ago: '41m', progress: 10, plays: '3.3k', isHot: false },
  { id: 7, title: 'They Are Teaching WHAT in Our Schools?!', category: 'Education', catColor: 'bg-teal-700', duration: '3:22', votes: '592', caller: 'Concerned Mom in Virginia', ago: '55m', progress: 25, plays: '3.0k', isHot: false },
  { id: 8, title: 'Small Business Owner — I Cannot Keep Up With These Costs', category: 'Economy', catColor: 'bg-yellow-700', duration: '4:44', votes: '441', caller: 'Dave the Builder, NC', ago: '1h', progress: 55, plays: '2.2k', isHot: false },
  { id: 9, title: 'Our Veterans Are Being Completely Ignored By DC', category: 'War Concerns', catColor: 'bg-green-700', duration: '2:50', votes: '388', caller: 'Vet from Virginia', ago: '1h 10m', progress: 70, plays: '1.9k', isHot: false },
  { id: 10, title: 'The Border Is Wide Open and Nobody Will Talk About It', category: 'Border', catColor: 'bg-red-900', duration: '3:15', votes: '311', caller: 'Rancher Jim, TX', ago: '1h 20m', progress: 35, plays: '1.6k', isHot: false },
];

const TRENDING_TOPICS = [
  { tag: '#GasPrices', count: '3.2k rants' },
  { tag: '#BorderCrisis', count: '1.8k rants' },
  { tag: '#WorkplaceHell', count: '1.1k rants' },
  { tag: '#SchoolBoard', count: '890 rants' },
  { tag: '#VeteranRights', count: '744 rants' },
];

const TOP_RANTERS = [
  { name: 'PatriotPete', state: 'TX', rants: 34, badge: '🔥' },
  { name: 'TiredInTampa', state: 'FL', rants: 28, badge: '⭐' },
  { name: 'RanchManTX', state: 'TX', rants: 22, badge: '🎖️' },
  { name: 'MadDadOhio', state: 'OH', rants: 19, badge: '💪' },
];

export default function RantsFeed() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSort, setActiveSort] = useState('🔥 Hottest');
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans">
      {/* NAV */}
      <nav className="bg-[#cc0000] sticky top-0 z-50 shadow-lg border-b border-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-xl font-black tracking-tight flex items-center gap-2">
              <img src="/__mockup/images/hat.jpg" alt="hat" className="h-10 w-auto object-contain" style={{mixBlendMode:'multiply'}} />
              MagaRantLine
            </span>
            <div className="hidden md:flex space-x-1">
              {['Home', 'Rants', 'Leaderboard', 'Leave a Rant'].map((item) => (
                <button key={item} className={`px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors ${item === 'Rants' ? 'bg-white text-[#cc0000]' : 'text-white hover:bg-white/10'}`}>{item}</button>
              ))}
            </div>
            <button className="md:hidden text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-5xl font-black uppercase tracking-tight flex items-center gap-3 mb-2">
            <Flame className="w-10 h-10 text-red-500 fill-red-500" /> Latest Rants
          </h1>
          <p className="text-gray-400 font-medium">Fresh off the hotline — unfiltered, uncensored, updated live</p>
        </div>

        {/* SEARCH + SORT BAR */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input placeholder="Search rants by topic, caller, or keyword..." className="pl-10 bg-[#111827] border-[#cc0000]/30 text-white placeholder:text-gray-600 focus:border-[#cc0000] h-11 rounded-xl" />
          </div>
          <div className="flex gap-2">
            {SORT_OPTIONS.map((s) => (
              <button key={s} onClick={() => setActiveSort(s)} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all whitespace-nowrap ${activeSort === s ? 'bg-[#cc0000] border-[#cc0000] text-white' : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30'}`}>{s}</button>
            ))}
          </div>
        </div>

        {/* FILTER CHIPS */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 w-max">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border-2 transition-all ${activeFilter === f ? 'bg-white border-white text-black' : 'bg-transparent border-[#cc0000]/40 text-gray-400 hover:border-white/40 hover:text-white'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          {/* MAIN RANTS GRID */}
          <div className="flex-1 min-w-0">
            <div className="space-y-4">
              {RANTS.map((rant) => (
                <div key={rant.id} className="bg-[#111827] rounded-xl border border-[#cc0000]/30 p-5 hover:border-[#cc0000]/70 transition-all group relative overflow-hidden">
                  {rant.isHot && (
                    <div className="absolute top-0 right-0 bg-[#cc0000] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl">🔥 HOT</div>
                  )}
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => setPlaying(playing === rant.id ? null : rant.id)}
                      className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all text-white group-hover:border-white/50"
                    >
                      {playing === rant.id ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-1 fill-current" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded ${rant.catColor} text-white`}>{rant.category}</span>
                        <span className="flex items-center text-xs text-gray-500 font-medium"><Clock className="w-3 h-3 mr-1" />{rant.duration}</span>
                        <span className="text-xs text-gray-600">{rant.ago} ago · {rant.plays} plays</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-white/90 line-clamp-1">"{rant.title}"</h3>
                      <p className="text-sm text-gray-500 italic">{rant.caller}</p>

                      {/* Progress bar */}
                      <div className="mt-3 h-1.5 w-full bg-gray-800 rounded-full overflow-hidden cursor-pointer">
                        <div className="h-full bg-white rounded-full relative transition-all" style={{width: playing === rant.id ? `${rant.progress}%` : '0%'}}>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm" />
                        </div>
                      </div>
                      {playing === rant.id && (
                        <div className="flex justify-between text-xs text-gray-600 mt-1 font-mono">
                          <span>0:{String(Math.round(rant.progress/100*parseInt(rant.duration)*60)).padStart(2,'0')}</span>
                          <span>{rant.duration}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <div className="flex items-center text-red-400 font-black text-lg gap-1">
                        <Flame className="w-5 h-5 fill-red-400" />{rant.votes}
                      </div>
                      <div className="flex gap-1.5">
                        <button className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                          <Heart className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* LOAD MORE */}
            <div className="mt-10 text-center">
              <button className="px-10 py-3 rounded-full border-2 border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all hover:border-white">
                Load More Rants
              </button>
              <p className="text-gray-600 text-xs mt-3">Showing 10 of 12,459 rants</p>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="hidden lg:flex flex-col gap-6 w-72 flex-shrink-0">
            {/* CALL TO ACTION */}
            <div className="bg-[#cc0000] rounded-xl p-5 text-center">
              <Mic className="w-10 h-10 text-white mx-auto mb-3" />
              <h3 className="font-black text-white text-lg mb-1">Got Something To Say?</h3>
              <p className="text-red-200 text-xs mb-4 leading-relaxed">Call the hotline and join 12,000+ ranters who've been heard.</p>
              <Button className="w-full bg-white text-black font-black hover:bg-white/90 rounded-full">Leave a Rant — $1.99</Button>
            </div>

            {/* TRENDING TOPICS */}
            <div className="bg-[#111827] border border-[#cc0000]/30 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-red-400" />
                <h3 className="font-black text-white text-sm uppercase tracking-widest">Trending Topics</h3>
              </div>
              <div className="space-y-3">
                {TRENDING_TOPICS.map((t, i) => (
                  <div key={t.tag} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 text-xs font-mono w-4">{i+1}</span>
                      <span className="text-white font-bold text-sm group-hover:text-red-400 transition-colors">{t.tag}</span>
                    </div>
                    <span className="text-gray-500 text-xs">{t.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TOP RANTERS */}
            <div className="bg-[#111827] border border-[#cc0000]/30 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-white fill-white" />
                <h3 className="font-black text-white text-sm uppercase tracking-widest">Top Ranters This Week</h3>
              </div>
              <div className="space-y-3">
                {TOP_RANTERS.map((r, i) => (
                  <div key={r.name} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#cc0000]/30 border border-[#cc0000]/40 flex items-center justify-center text-xs font-black text-white">{i+1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-sm">{r.name} {r.badge}</div>
                      <div className="text-gray-500 text-xs">{r.state} · {r.rants} rants</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WEEKLY CHALLENGE */}
            <div className="bg-[#0f1423] border border-white/10 rounded-xl p-5">
              <Badge className="bg-white/10 text-white border-none text-xs uppercase tracking-widest mb-3">Weekly Challenge</Badge>
              <h3 className="font-black text-white text-base mb-2">Best Rant Wins $100</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">342 entries · Resets Sunday midnight</p>
              <Button className="w-full bg-[#cc0000] hover:bg-red-700 text-white font-bold rounded-full text-sm">Enter Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
