import React, { useState } from 'react';
import { Phone, Zap, Star, Play, Pause, Flame, Share2, MessageCircle, TrendingUp, Mic, Trophy, ChevronRight, Users, ArrowUpRight, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const RED_TODAY  = 6842;
const BLUE_TODAY = 5931;
const OPEN_TODAY = 8214;
const GRAND      = RED_TODAY + BLUE_TODAY + OPEN_TODAY;
const RED_PCT    = Math.round((RED_TODAY  / GRAND) * 100);
const BLUE_PCT   = Math.round((BLUE_TODAY / GRAND) * 100);
const OPEN_PCT   = 100 - RED_PCT - BLUE_PCT;

const CATEGORIES = [
  { name: 'Inflation',      count: 3241, icon: '💸', color: 'bg-red-900/40 border-red-700/50' },
  { name: 'Politics',       count: 2890, icon: '🏛️', color: 'bg-blue-900/40 border-blue-700/50' },
  { name: 'War & Military', count: 1654, icon: '🎖️', color: 'bg-green-900/40 border-green-700/50' },
  { name: 'Work',           count: 1422, icon: '💼', color: 'bg-orange-900/40 border-orange-700/50' },
  { name: 'Dating',         count: 987,  icon: '❤️', color: 'bg-pink-900/40 border-pink-700/50' },
  { name: 'Everyday Life',  count: 876,  icon: '🏠', color: 'bg-purple-900/40 border-purple-700/50' },
];

type SortKey = 'latest' | 'votes' | 'trending';

const ALL_RANTS = [
  { id: 214, title: 'Gas prices are out of control', category: 'Inflation', duration: '1:48', votes: 2847, caller: 'PatriotPete', location: 'TX', ago: '4m',  side: 'red',  trending: true  },
  { id: 215, title: 'Stop blaming immigrants for everything', category: 'Politics', duration: '2:12', votes: 2201, caller: 'NursePatty', location: 'IL', ago: '8m',  side: 'blue', trending: true  },
  { id: 216, title: 'Both parties are failing small businesses', category: 'Economy', duration: '3:05', votes: 1988, caller: 'ShopOwnerRay', location: 'OH', ago: '12m', side: 'open', trending: true  },
  { id: 217, title: 'Bring manufacturing back to America', category: 'Economy', duration: '2:34', votes: 1654, caller: 'FactoryMike', location: 'MI', ago: '19m', side: 'red',  trending: false },
  { id: 218, title: 'Rent just went up $600 this year', category: 'Housing', duration: '1:55', votes: 1423, caller: 'TiredTenant', location: 'NY', ago: '31m', side: 'open', trending: false },
  { id: 219, title: "My grocery bill was $380 — four bags", category: 'Inflation', duration: '1:12', votes: 1201, caller: 'FrustratedFran', location: 'GA', ago: '41m', side: 'open', trending: false },
  { id: 220, title: "Healthcare costs are absolutely ridiculous", category: 'Healthcare', duration: '2:55', votes: 987,  caller: 'DrDave', location: 'CA', ago: '55m', side: 'blue', trending: false },
  { id: 221, title: "The Border Is WIDE Open and Nobody Cares", category: 'Politics', duration: '4:15', votes: 856,  caller: 'RanchManTX', location: 'TX', ago: '1h',  side: 'red',  trending: false },
  { id: 222, title: "Climate Change Is Already Here — Wake Up", category: 'Environment', duration: '3:20', votes: 721,  caller: 'GreenMike', location: 'CA', ago: '1h 10m', side: 'blue', trending: false },
];

const TICKER_ITEMS = [
  '🔥 MAGA LINE RANT #214 — "Gas Prices Are Destroying My Family Budget"',
  '🔥 BLUE LINE RANT #215 — "Stop Blaming Immigrants for Everything"',
  '🔥 NEUTRAL LINE RANT #216 — "Both Parties Are Failing Small Businesses"',
  '🔥 MAGA LINE RANT #217 — "Bring Manufacturing Back to America"',
  '🔥 NEUTRAL LINE RANT #218 — "Rent Just Went Up $600 — Where Do We Go?"',
  '🔥 NEUTRAL LINE RANT #219 — "My Grocery Bill Was $380 — Four Bags"',
  '🔥 BLUE LINE RANT #220 — "Healthcare Costs Are Absolutely Ridiculous"',
  '🏆 Weekly Challenge: Top Rant Wins $100 — 342 entries so far',
];

const DAILY_LEADERBOARD = [
  { rank: 1, medal: '🥇', title: 'Gas prices are killing us', line: 'MAGA Line',    votes: 2847, caller: 'PatriotPete', rantNo: 214, side: 'red'  },
  { rank: 2, medal: '🥈', title: 'Rent is insane right now',  line: 'Neutral Line', votes: 1988, caller: 'TiredTenant', rantNo: 218, side: 'open' },
  { rank: 3, medal: '🥉', title: 'Healthcare costs are ridiculous', line: 'Blue Line', votes: 1423, caller: 'DrDave', rantNo: 220, side: 'blue' },
];

function sideLabel(side: string) {
  if (side === 'red')  return { label: '🔴 MAGA Line',    bg: 'bg-red-900/50',   text: 'text-red-400',   border: 'border-red-700/50',  play: 'hover:bg-[#cc0000] hover:border-[#cc0000]',  flame: 'text-red-400'  };
  if (side === 'blue') return { label: '🔵 Blue Line',    bg: 'bg-blue-900/50',  text: 'text-blue-400',  border: 'border-blue-700/50', play: 'hover:bg-blue-700 hover:border-blue-700',    flame: 'text-blue-400' };
  return                      { label: '⚪ Neutral Line', bg: 'bg-gray-800/60',  text: 'text-gray-300',  border: 'border-gray-600/50', play: 'hover:bg-gray-600 hover:border-gray-600',    flame: 'text-gray-300' };
}

export default function MagaRantLineHome() {
  const [isPlayingFeatured, setIsPlayingFeatured] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>('latest');

  const sorted = [...ALL_RANTS].sort((a, b) => {
    if (sortBy === 'votes')    return b.votes - a.votes;
    if (sortBy === 'trending') return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
    return a.ago.localeCompare(b.ago);
  }).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans selection:bg-[#cc0000] selection:text-white">

      {/* NAV */}
      <nav className="bg-[#cc0000] sticky top-0 z-50 shadow-lg shadow-red-900/20 border-b border-red-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-black text-2xl tracking-tight text-white">America's <span className="font-light">Rant Line</span></span>
          <div className="hidden md:flex items-center gap-6 font-semibold text-sm tracking-wide">
            <a href="#" className="text-white border-b-2 border-white pb-0.5">HOME</a>
            <a href="#" className="hover:text-white/80 transition-colors">RANTS</a>
            <a href="#" className="hover:text-white/80 transition-colors">LEADERBOARD</a>
            <a href="#" className="text-yellow-200 font-black hover:text-yellow-100 transition-colors">🔴🔵 RED VS BLUE</a>
          </div>
          <Button className="bg-white hover:bg-white/90 text-black font-bold rounded-full px-6 shadow-md">LEAVE A RANT</Button>
        </div>
      </nav>

      {/* TICKER TAPE */}
      <div className="bg-[#07090f] border-b border-[#cc0000]/20 py-2.5 overflow-hidden">
        <div className="flex gap-16 animate-[ticker_40s_linear_infinite] whitespace-nowrap w-max">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] inline-block shrink-0"></span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative pt-16 pb-14 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="w-1/2 bg-gradient-to-br from-red-950/25 to-transparent"></div>
          <div className="w-1/2 bg-gradient-to-bl from-blue-950/25 to-transparent"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/8 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Phone number — above the fold */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2.5 bg-black border border-white/15 px-5 py-2 rounded-full">
              <Phone className="w-4 h-4 text-[#cc0000]" />
              <span className="font-black text-white text-base tracking-widest">(877) RANT-NOW</span>
              <span className="text-gray-600 text-xs">·</span>
              <span className="text-gray-500 text-xs font-medium">Lines open 24/7</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-red-950/50 border border-red-800/60 text-red-400 px-4 py-1.5 rounded-full text-[11px] font-bold mb-6 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            LIVE NOW · {(RED_TODAY + BLUE_TODAY + OPEN_TODAY).toLocaleString()} Calls Today
          </div>

          <h1 className="text-7xl md:text-9xl font-black mb-4 tracking-tighter uppercase leading-[0.85]">
            America<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-gray-200 to-blue-500">Is Arguing.</span>
          </h1>
          <p className="text-xl font-medium text-gray-400 mb-2 max-w-xl mx-auto">Pick a line. Leave your rant. Let America vote.</p>
          <p className="text-xs text-gray-600 mb-10 uppercase tracking-widest font-semibold">Unfiltered · Uncensored · Unafraid</p>

          {/* Three line CTAs */}
          <p className="text-[11px] text-gray-500 uppercase tracking-[0.2em] font-bold mb-4">— Choose a Line —</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-5">
            <div className="flex flex-col items-center gap-1">
              <Button size="lg" className="w-full bg-[#cc0000] hover:bg-red-700 text-white font-black text-base h-13 px-8 shadow-[0_0_25px_rgba(204,0,0,0.35)] rounded-full">
                🔴 MAGA Line — $2.99
              </Button>
              <span className="text-[11px] text-red-400 font-black uppercase tracking-wide mt-1">Right / Conservative / Republican</span>
            </div>
            <div className="text-gray-700 font-black text-xl hidden sm:block">VS</div>
            <div className="flex flex-col items-center gap-1">
              <Button size="lg" className="w-full bg-blue-700 hover:bg-blue-600 text-white font-black text-base h-13 px-8 shadow-[0_0_25px_rgba(30,64,175,0.35)] rounded-full">
                🔵 Blue Line — $2.99
              </Button>
              <span className="text-[11px] text-blue-400 font-black uppercase tracking-wide mt-1">Left / Democrat / Progressive</span>
            </div>
            <div className="text-gray-700 font-black text-xl hidden sm:block">VS</div>
            <div className="flex flex-col items-center gap-1">
              <Button size="lg" className="w-full bg-gray-700 hover:bg-gray-600 text-white font-black text-base h-13 px-8 rounded-full">
                ⚪ Neutral Line — $2.99
              </Button>
              <span className="text-[11px] text-gray-400 font-black uppercase tracking-wide mt-1">Independent / Open Rant</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" className="bg-transparent hover:bg-white/5 text-white border border-white/20 font-bold text-sm h-10 px-5 rounded-full">
              <Zap className="w-3.5 h-3.5 mr-1.5 fill-white" /> Skip the Line — $5
            </Button>
            <Button variant="outline" className="bg-transparent hover:bg-white/5 text-white border border-white/20 font-bold text-sm h-10 px-5 rounded-full">
              <Star className="w-3.5 h-3.5 mr-1.5" /> Featured Rant — $25
            </Button>
          </div>
          <p className="mt-5 text-gray-600 text-xs">12,773 total rants · 89,234 listeners · No censorship</p>
        </div>
      </section>

      {/* LIVE CALL COUNTER — 3 LINES */}
      <section className="py-6 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Calls Today</h2>
            <div className="flex items-center gap-1.5 text-xs text-green-400 font-bold bg-green-900/20 border border-green-800/40 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse inline-block"></span> Live
            </div>
          </div>
          <div className="bg-[#0d1120] border border-white/8 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-white/8">
              <div className="p-5 text-center">
                <div className="text-3xl font-black text-red-400 mb-1">{RED_TODAY.toLocaleString()}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">🔴 MAGA Calls Today</div>
                <div className="text-[10px] text-red-400/50 mt-1">+124 last hr</div>
              </div>
              <div className="p-5 text-center">
                <div className="text-3xl font-black text-blue-400 mb-1">{BLUE_TODAY.toLocaleString()}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">🔵 Blue Calls Today</div>
                <div className="text-[10px] text-blue-400/50 mt-1">+97 last hr</div>
              </div>
              <div className="p-5 text-center">
                <div className="text-3xl font-black text-gray-300 mb-1">{OPEN_TODAY.toLocaleString()}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">⚪ Open Calls Today</div>
                <div className="text-[10px] text-gray-500/50 mt-1">+211 last hr</div>
              </div>
            </div>
            {/* 3-segment bar */}
            <div className="px-4 pb-4">
              <div className="h-4 rounded-full overflow-hidden flex">
                <div className="bg-gradient-to-r from-red-900 to-[#cc0000]" style={{ width: `${RED_PCT}%` }}></div>
                <div className="bg-gradient-to-r from-blue-800 to-blue-600" style={{ width: `${BLUE_PCT}%` }}></div>
                <div className="bg-gradient-to-r from-gray-700 to-gray-500" style={{ width: `${OPEN_PCT}%` }}></div>
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-gray-600 font-bold">
                <span>🔴 {RED_PCT}% · 🔵 {BLUE_PCT}% · ⚪ {OPEN_PCT}%</span>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1">Full Scoreboard <ChevronRight className="w-3 h-3" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED RANT */}
      <section className="py-6 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-4 h-4 text-white fill-white" />
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Featured Rant</h2>
            <div className="flex-1 h-px bg-white/8"></div>
            <Badge variant="outline" className="border-white/15 text-gray-500 text-[10px]">Sponsored · 24h</Badge>
          </div>
          <Card className="bg-[#0f1423] border-[#cc0000]/50 border-2 overflow-hidden shadow-[0_8px_30px_-8px_rgba(204,0,0,0.2)] relative">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#cc0000] via-red-400 to-[#cc0000]"></div>
            <CardHeader className="pb-3 border-b border-white/5">
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-[#cc0000] text-white border-none font-bold uppercase tracking-wider text-[10px]">🔴 MAGA Line · Inflation · Rant #214</Badge>
                <div className="flex items-center text-white font-bold bg-white/8 px-2.5 py-1 rounded-full text-xs">
                  <Flame className="w-3.5 h-3.5 mr-1 fill-white" /> 2,847 votes
                </div>
              </div>
              <CardTitle className="text-2xl font-black text-white leading-tight">The Gas Prices Are Killing Me!</CardTitle>
              <p className="text-gray-500 text-xs mt-1">PatriotPete · Texas · Today 2:30 PM</p>
            </CardHeader>
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center gap-5">
                <button onClick={() => setIsPlayingFeatured(!isPlayingFeatured)}
                  className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.25)] flex-shrink-0">
                  {isPlayingFeatured ? <Pause className="w-7 h-7 fill-black" /> : <Play className="w-7 h-7 fill-black ml-1" />}
                </button>
                <div className="flex-1">
                  <div className="h-10 flex items-center justify-between gap-0.5 mb-2">
                    {[...Array(50)].map((_, i) => {
                      const h = [20,40,60,80,55,70,35,90,45,65,30,75,50,85,40,95,60,25,70,45,80,35,90,55,40,70,30,85,50,65,75,40,55,90,35,80,60,45,70,30,95,50,65,40,85,55,70,35,80,45];
                      return <div key={i} className={`w-full rounded-full ${i < 18 ? 'bg-white' : 'bg-white/15'}`} style={{ height: `${h[i] || 40}%` }}></div>;
                    })}
                  </div>
                  <div className="flex justify-between text-xs font-bold text-gray-500"><span className="text-white">0:45</span><span>3:12</span></div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-black/15 border-t border-white/5 py-2.5 px-5 flex justify-between">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-white/8 h-8 text-xs"><Flame className="w-3.5 h-3.5 mr-1.5 fill-current" />2,847</Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-400 hover:bg-white/8 h-8 text-xs"><ThumbsDown className="w-3.5 h-3.5 mr-1.5" />412</Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-white hover:bg-white/8 h-8 text-xs"><MessageCircle className="w-3.5 h-3.5 mr-1.5" />142</Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-white hover:bg-white/8 h-8 text-xs"><Share2 className="w-3.5 h-3.5 mr-1.5" />Share</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* TRENDING VIRAL RANT SPOTLIGHT */}
      <section className="py-6 px-4 bg-[#07090f]">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <ArrowUpRight className="w-4 h-4 text-orange-400" />
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Trending Rant</h2>
            <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-black uppercase tracking-widest">Going Viral</Badge>
            <div className="flex-1 h-px bg-white/8"></div>
          </div>
          <div className="bg-gradient-to-r from-orange-950/40 via-[#0f1423] to-[#0f1423] border border-orange-700/30 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-600/30 flex items-center justify-center text-2xl shrink-0">⚪</div>
              <div className="flex-1">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Neutral Line · Rant #219 · Inflation</div>
                <h3 className="text-xl font-black text-white leading-tight mb-2">
                  "I spent $187 on groceries and got four bags."
                </h3>
                <p className="text-gray-500 italic text-sm mb-3">— FrustratedFran, GA · 41m ago · 1:12</p>
                <div className="flex items-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-orange-600 hover:bg-orange-500 flex items-center justify-center shrink-0 transition-all hover:scale-105">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </button>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-orange-400 font-black flex items-center gap-1"><Flame className="w-4 h-4 fill-orange-400" />1,201 votes</span>
                    <span className="text-gray-600">·</span>
                    <span className="text-green-400 font-bold text-xs flex items-center gap-1"><ArrowUpRight className="w-3 h-3" />2k plays in 1 hour</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-white ml-auto h-8 text-xs"><Share2 className="w-3.5 h-3.5 mr-1" />Share</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#cc0000] py-8 border-y-2 border-red-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y-2 md:divide-y-0 md:divide-x divide-red-800">
            {[
              { val: '12,773', label: 'Total Rants', icon: <Mic className="w-4 h-4" /> },
              { val: '89,234', label: 'Listeners',   icon: <Users className="w-4 h-4" /> },
              { val: '847',    label: 'Rants Today', icon: <TrendingUp className="w-4 h-4" /> },
              { val: '$24,912',label: 'Paid Out',    icon: <Trophy className="w-4 h-4" /> },
            ].map((s) => (
              <div key={s.label} className="text-center pt-3 md:pt-0">
                <div className="flex items-center justify-center gap-2 text-white/70 mb-2">{s.icon}<span className="text-[10px] uppercase tracking-widest font-bold">{s.label}</span></div>
                <div className="text-4xl font-black text-white tracking-tight">{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAILY LEADERBOARD */}
      <section className="py-12 px-4 bg-[#070a14]">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <Trophy className="w-5 h-5 text-yellow-400 fill-yellow-400/20" />
            <h2 className="text-2xl font-black uppercase tracking-tight">Top Rants Today</h2>
            <div className="flex-1 h-px bg-white/8"></div>
            <a href="#" className="text-gray-500 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors">Full Board <ChevronRight className="w-3 h-3" /></a>
          </div>
          <div className="space-y-3">
            {DAILY_LEADERBOARD.map((r) => {
              const s = sideLabel(r.side);
              return (
                <div key={r.rank} className={`bg-[#0f1423] border ${s.border} rounded-xl p-4 flex items-center gap-4 group hover:opacity-90 transition-opacity cursor-pointer`}>
                  <div className="text-3xl w-10 text-center shrink-0">{r.medal}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">{r.line} · Rant #{r.rantNo}</div>
                    <h3 className="font-bold text-white text-sm truncate">"{r.title}"</h3>
                    <p className="text-gray-600 text-xs mt-0.5">— {r.caller}</p>
                  </div>
                  <div className={`flex items-center gap-1 font-black text-sm shrink-0 ${s.flame}`}>
                    <Flame className="w-4 h-4 fill-current" />{r.votes.toLocaleString()}
                  </div>
                  <button className={`w-9 h-9 rounded-full border ${s.border} flex items-center justify-center text-white ${s.play} transition-all`}>
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-12 px-4 bg-[#0a0e1a]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight mb-1">Browse by Category</h2>
              <p className="text-gray-500 text-sm">Find the rants that matter to you</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <button key={cat.name} className={`${cat.color} border rounded-xl p-4 text-left hover:scale-105 transition-transform`}>
                <div className="text-3xl mb-3">{cat.icon}</div>
                <div className="font-bold text-white text-sm mb-1">{cat.name}</div>
                <div className="text-gray-500 text-xs">{cat.count.toLocaleString()} rants</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST RANTS FEED — SORTABLE */}
      <section className="py-12 px-4 bg-[#07090f]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight mb-1">Latest Rants</h2>
              <p className="text-gray-500 text-sm">MAGA, Blue & Neutral — all three lines</p>
            </div>
            {/* Sort tabs */}
            <div className="flex gap-1 bg-[#0f1423] border border-white/8 rounded-full p-1">
              {(['latest', 'votes', 'trending'] as SortKey[]).map((tab) => (
                <button key={tab} onClick={() => setSortBy(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${sortBy === tab ? 'bg-[#cc0000] text-white' : 'text-gray-500 hover:text-white'}`}>
                  {tab === 'latest' ? 'Latest' : tab === 'votes' ? 'Most Votes' : '🔥 Trending'}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((rant) => {
              const s = sideLabel(rant.side);
              return (
                <Card key={rant.id} className={`bg-[#0f1423] border transition-all duration-200 cursor-pointer ${s.border} hover:brightness-110`}>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>{s.label}</span>
                        <Badge variant="outline" className="text-gray-600 border-white/8 text-[10px]">{rant.category}</Badge>
                      </div>
                      <span className="text-gray-600 text-[10px]">{rant.ago}</span>
                    </div>
                    <div className="text-[10px] text-gray-600 font-bold mb-1">RANT #{rant.id}</div>
                    <h3 className="text-sm font-bold text-white mb-1 line-clamp-2 leading-snug">"{rant.title}"</h3>
                    <p className="text-xs text-gray-600 mb-4">— {rant.caller}, {rant.location}</p>
                    {rant.trending && (
                      <div className="mb-3 text-[10px] text-orange-400 font-black flex items-center gap-1"><ArrowUpRight className="w-3 h-3" />Trending</div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <button className={`w-9 h-9 rounded-full border ${s.border} flex items-center justify-center text-white ${s.play} transition-colors`}>
                          <Play className="w-3.5 h-3.5 ml-0.5 fill-white" />
                        </button>
                        <span className="text-xs text-gray-600 font-bold">{rant.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center text-xs font-black gap-1 ${s.flame}`}>
                          <Flame className="w-3.5 h-3.5 fill-current" />{rant.votes.toLocaleString()}
                        </div>
                        <button className="flex items-center gap-0.5 px-2 h-6 rounded-full bg-gray-800 border border-gray-700 text-gray-500 hover:border-red-800 hover:text-red-500 text-[10px] font-bold transition-all">
                          <ThumbsDown className="w-2.5 h-2.5" />{Math.round(rant.votes * 0.15).toLocaleString()}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <Button variant="outline" className="border-white/15 text-white hover:bg-white/5 rounded-full px-8 font-bold">Load More Rants</Button>
          </div>
        </div>
      </section>

      {/* TOP RANT OF THE DAY — RED / BLUE / OPEN */}
      <section className="py-12 px-4 bg-[#0a0e1a]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-1">Top Rant of the Day</h2>
            <p className="text-gray-500 text-sm">One from each line — you decide who made the better point</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { side: 'red',  badge: '🔴 Top MAGA Rant',    title: "They're Destroying This Country From the Inside Out", caller: 'PatriotPete, TX', dur: '2:34', votes: '2,847', bg: 'from-red-950/60', border: 'border-red-700/50', btn: 'bg-[#cc0000] hover:bg-red-700' },
              { side: 'blue', badge: '🔵 Top Blue Rant',    title: 'Healthcare Is a Right, Not a Luxury — Period.', caller: 'NursePatty, IL', dur: '3:01', votes: '2,412', bg: 'from-blue-950/60', border: 'border-blue-700/50', btn: 'bg-blue-700 hover:bg-blue-600' },
              { side: 'open', badge: '⚪ Top Neutral Rant', title: 'Both parties are failing small businesses', caller: 'ShopOwnerRay, OH', dur: '3:05', votes: '1,988', bg: 'from-gray-800/50', border: 'border-gray-600/50', btn: 'bg-gray-700 hover:bg-gray-600' },
            ].map((r) => (
              <div key={r.side} className={`bg-gradient-to-br ${r.bg} to-[#0f1423] border-2 ${r.border} rounded-2xl p-5`}>
                <Badge className={`${r.btn.split(' ')[0]} text-white border-none font-black uppercase tracking-widest text-[10px] mb-3`}>{r.badge}</Badge>
                <h3 className="text-base font-black text-white mb-2 leading-tight">"{r.title}"</h3>
                <p className="text-gray-500 italic text-xs mb-4">— {r.caller} · {r.dur}</p>
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-1 font-black text-base ${r.side === 'red' ? 'text-red-400' : r.side === 'blue' ? 'text-blue-400' : 'text-gray-300'}`}>
                    <Flame className="w-4 h-4 fill-current" />{r.votes}
                  </div>
                  <Button className={`${r.btn} text-white font-bold rounded-full px-4 h-8 text-xs`}>
                    <Play className="w-3 h-3 mr-1 fill-white" />Play
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <a href="#" className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-xs font-bold transition-colors">
              See Full Red vs Blue Arena <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* RANT OF THE WEEK CHALLENGE */}
      <section className="py-10 px-4 bg-[#07090f]">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-r from-[#180404] via-[#1e0707] to-[#180404] border-2 border-[#cc0000]/50 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-[0_0_40px_rgba(204,0,0,0.1)]">
            <div className="absolute -right-8 -top-8 text-[140px] opacity-8 select-none pointer-events-none">🏆</div>
            <div className="relative z-10">
              <Badge className="bg-[#cc0000] text-white font-bold uppercase tracking-widest mb-4 text-xs">Rant of the Week Challenge</Badge>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">Top Rant Wins $100</h2>
              <p className="text-gray-400 text-sm max-w-md">Leave the most-voted rant this week — any line, any topic — and take home cash. MAGA, Blue, or Neutral Line.</p>
              <div className="mt-3 flex items-center gap-4 text-xs">
                <span className="text-gray-500 flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-red-500" />342 entries so far</span>
                <span className="text-gray-600">·</span>
                <span className="text-gray-500">Resets Sunday midnight</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0 relative z-10">
              <Button className="bg-white text-black font-black px-8 h-11 hover:bg-white/90 rounded-full text-sm">Enter Challenge</Button>
              <Button variant="outline" className="border-white/25 text-white hover:bg-white/5 rounded-full px-8 h-11 font-bold text-sm">See Current Entries</Button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 px-4 bg-[#0a0e1a]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-black uppercase tracking-tight text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { step: '01', icon: '💳', title: 'Choose Your Plan', desc: 'Pick Standard, Skip the Line, or Featured. Pay securely.' },
              { step: '02', icon: '📞', title: 'Get Your Code',    desc: 'Receive a unique call code and the hotline number instantly.' },
              { step: '03', icon: '🎙️', title: 'Call & Record',   desc: 'Dial (877) RANT-NOW, enter your code, speak your mind.' },
              { step: '04', icon: '🔥', title: 'Go Live & Vote',  desc: 'Your rant is published. Listeners vote and share your voice.' },
            ].map((s) => (
              <div key={s.step} className="bg-[#0f1423] border border-[#cc0000]/15 rounded-xl p-5 relative">
                <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-[#cc0000] flex items-center justify-center text-[10px] font-black text-white">{s.step}</div>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-black text-white text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-10 border-t border-[#cc0000]/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <span className="font-black text-2xl text-white mb-3 block">America's <span className="font-light">Rant Line</span></span>
              <p className="text-gray-500 text-sm leading-relaxed mb-3 max-w-sm">The uncensored hotline for real Americans — MAGA, Blue, or Neutral. Say what you mean. Be heard.</p>
              <p className="text-[#cc0000] font-black text-lg">(877) RANT-NOW</p>
            </div>
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-3">Navigate</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                {['Home','Latest Rants','Red vs Blue','Leaderboard','Leave a Rant'].map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-3">Legal</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                {['Terms of Service','Privacy Policy','Refund Policy','Content Guidelines','Contact Us'].map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} America's Rant Line. Not affiliated with any political party. Rates may apply.</p>
            <div className="flex gap-3">
              {['Twitter','Rumble','Truth Social','TikTok'].map(s => <a key={s} href="#" className="hover:text-gray-400 transition-colors">{s}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
