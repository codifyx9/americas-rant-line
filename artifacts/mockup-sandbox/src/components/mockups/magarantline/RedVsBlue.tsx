import React, { useState } from 'react';
import { Play, Pause, Flame, Share2, Trophy, Mic, TrendingUp, ThumbsDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const MAGA_RANTS = [
  { id: 1, title: "They're Destroying This Country From the Inside Out", caller: "PatriotPete, TX",  votes: "2,847", downvotes: "412", duration: "2:34", ago: "4m",    hot: true  },
  { id: 2, title: "Open Borders Is an Attack on American Workers",       caller: "RanchManTX, TX",   votes: "1,923", downvotes: "287", duration: "3:12", ago: "18m",   hot: true  },
  { id: 3, title: "Gas Was $1.89 When Trump Was in Office — FACT",       caller: "FuriousFrank, GA", votes: "1,241", downvotes: "180", duration: "1:58", ago: "31m",   hot: false },
  { id: 4, title: "The Media Won't Tell You What's Really Going On",     caller: "TruthSeeker, OH",  votes: "987",   downvotes: "142", duration: "4:05", ago: "47m",   hot: false },
  { id: 5, title: "My Second Amendment Rights Are Non-Negotiable",       caller: "GunOwnerBill, VA", votes: "756",   downvotes: "109", duration: "2:20", ago: "1h",    hot: false },
];

const BLUE_RANTS = [
  { id: 1, title: "Healthcare Is a Right, Not a Luxury — Period.",       caller: "NursePatty, IL",  votes: "2,412", downvotes: "349", duration: "3:01", ago: "7m",    hot: true  },
  { id: 2, title: "Climate Change Is Here and Nobody Wants to Listen",   caller: "GreenMike, CA",   votes: "1,654", downvotes: "239", duration: "2:45", ago: "22m",   hot: true  },
  { id: 3, title: "Why Are We Cutting School Budgets to Fund Tax Cuts?", caller: "TeacherSue, NY",  votes: "1,102", downvotes: "159", duration: "3:30", ago: "38m",   hot: false },
  { id: 4, title: "Women's Rights Are Under Attack — We Won't Be Quiet", caller: "VoiceForAll, CO", votes: "893",   downvotes: "129", duration: "2:15", ago: "52m",   hot: false },
  { id: 5, title: "The Supreme Court Has Lost Its Credibility",          caller: "LegalMind, DC",   votes: "688",   downvotes: "99",  duration: "3:45", ago: "1h 5m", hot: false },
];

const NEUTRAL_RANTS = [
  { id: 1, title: "Both Parties Are Failing Small Businesses — Period.",    caller: "ShopOwnerRay, OH",   votes: "1,988", downvotes: "288", duration: "3:05", ago: "9m",     hot: true  },
  { id: 2, title: "I Spent $187 on Groceries and Got Four Bags",            caller: "FrustratedFran, GA", votes: "1,423", downvotes: "206", duration: "1:12", ago: "21m",    hot: true  },
  { id: 3, title: "Rent Just Went Up $600 — Where Are We Supposed to Go?", caller: "TiredTenant, NY",    votes: "1,102", downvotes: "159", duration: "1:55", ago: "37m",    hot: false },
  { id: 4, title: "Nobody in Washington Cares About the Middle Class",      caller: "MiddleAmerica, KS",  votes: "876",   downvotes: "127", duration: "2:40", ago: "54m",    hot: false },
  { id: 5, title: "We're All Being Played — Red and Blue Both",             caller: "IndieVoter, CO",     votes: "641",   downvotes: "93",  duration: "3:10", ago: "1h 12m", hot: false },
];

const MAGA_TOTAL    = 6842;
const BLUE_TOTAL    = 5931;
const NEUTRAL_TOTAL = 8214;
const GRAND_TOTAL   = MAGA_TOTAL + BLUE_TOTAL + NEUTRAL_TOTAL;
const MAGA_PCT      = Math.round((MAGA_TOTAL    / GRAND_TOTAL) * 100);
const BLUE_PCT      = Math.round((BLUE_TOTAL    / GRAND_TOTAL) * 100);
const NEUTRAL_PCT   = 100 - MAGA_PCT - BLUE_PCT;

type Side = 'maga' | 'blue' | 'neutral';

function sideStyles(side: Side) {
  if (side === 'maga')    return { cardBg: 'border-red-700/50 bg-[#150606]',    badgeBg: 'bg-[#cc0000]',  playBg: 'bg-[#cc0000] hover:bg-red-700',   progressBg: 'bg-[#cc0000]',   flameClass: 'text-red-400 fill-red-400'  };
  if (side === 'blue')    return { cardBg: 'border-blue-700/50 bg-[#060d1a]',   badgeBg: 'bg-blue-700',   playBg: 'bg-blue-700 hover:bg-blue-600',    progressBg: 'bg-blue-600',    flameClass: 'text-blue-400 fill-blue-400' };
  return                         { cardBg: 'border-gray-600/40 bg-[#0e0e10]',   badgeBg: 'bg-gray-700',   playBg: 'bg-gray-700 hover:bg-gray-600',    progressBg: 'bg-gray-500',    flameClass: 'text-gray-300 fill-gray-300' };
}

function RantCard({ rant, side }: { rant: typeof MAGA_RANTS[0]; side: Side }) {
  const [playing, setPlaying] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const s = sideStyles(side);

  return (
    <div className={`rounded-xl border ${s.cardBg} p-4 hover:brightness-110 transition-all`}>
      {rant.hot && (
        <div className={`inline-flex items-center gap-1 ${s.badgeBg} text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-2`}>
          🔥 Hot Right Now
        </div>
      )}
      <h3 className="font-bold text-white text-sm leading-snug mb-2 line-clamp-2">"{rant.title}"</h3>
      <p className="text-gray-500 text-xs italic mb-3">{rant.caller} · {rant.ago} ago</p>
      <div className="flex items-center gap-3 mb-3">
        <button onClick={() => setPlaying(!playing)}
          className={`w-9 h-9 rounded-full ${s.playBg} flex items-center justify-center text-white shrink-0 transition-all`}>
          {playing ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
        </button>
        <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div className={`h-full ${s.progressBg} rounded-full transition-all duration-300`} style={{ width: playing ? '35%' : '0%' }}></div>
        </div>
        <span className="text-gray-500 text-xs font-mono">{rant.duration}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1 font-black text-sm ${s.flameClass.split(' ')[0]}`}>
          <Flame className={`w-4 h-4 ${s.flameClass.split(' ')[1]}`} />
          {rant.votes}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setDownvoted(!downvoted)}
            className={`flex items-center gap-1 px-2 h-6 rounded-full text-[10px] font-bold transition-all border ${
              downvoted ? 'bg-red-900/30 border-red-700 text-red-400' : 'bg-gray-800 border-gray-700 text-gray-500 hover:border-red-800 hover:text-red-500'
            }`}>
            <ThumbsDown className="w-2.5 h-2.5" />{rant.downvotes}
          </button>
          <button className="w-7 h-7 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <Share2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RedVsBlue() {
  const [activeTab, setActiveTab] = useState<'all' | 'maga' | 'blue' | 'neutral'>('all');

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans">

      {/* NAV — three-tone gradient */}
      <nav className="sticky top-0 z-50 border-b border-white/10"
        style={{ background: 'linear-gradient(90deg, #7a0000 0%, #1c0808 30%, #0a0d14 50%, #07091a 70%, #0c1a5a 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-black text-2xl tracking-tight text-white">America's <span className="font-light">Rant Line</span></span>
          <div className="hidden md:flex items-center gap-5 text-sm font-semibold">
            <a href="#" className="text-white/60 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">All Rants</a>
            <a href="#" className="text-white border-b-2 border-white pb-0.5">🔴⚪🔵 Arena</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">Leaderboard</a>
          </div>
          <div className="flex gap-2">
            <Button className="bg-[#cc0000] hover:bg-red-700 text-white font-black text-xs px-3 h-9 rounded-full">🔴 MAGA</Button>
            <Button className="bg-gray-700 hover:bg-gray-600 text-white font-black text-xs px-3 h-9 rounded-full">⚪ Neutral</Button>
            <Button className="bg-blue-700 hover:bg-blue-600 text-white font-black text-xs px-3 h-9 rounded-full">🔵 Blue</Button>
          </div>
        </div>
      </nav>

      {/* HERO — three-way split */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="w-1/3 bg-gradient-to-br from-red-950 via-[#1a0505] to-transparent"></div>
          <div className="w-1/3 bg-gradient-to-b from-gray-900/60 to-transparent"></div>
          <div className="w-1/3 bg-gradient-to-bl from-blue-950 via-[#05081a] to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 px-4 py-1.5 rounded-full text-xs font-bold mb-8 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
            LIVE · Updated every 5 minutes
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-6">
            <span className="text-red-500">America</span><br />
            <span className="text-white">is Arguing.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 font-medium">Pick a side. Leave your rant. Let the people vote.</p>

          {/* Three CTAs */}
          <div className="flex flex-col sm:flex-row items-start justify-center gap-4 mb-4">
            <div className="flex flex-col items-center gap-1.5 w-full sm:w-auto">
              <Button size="lg" className="bg-[#cc0000] hover:bg-red-700 text-white font-black text-base h-13 px-8 rounded-full shadow-[0_0_25px_rgba(204,0,0,0.4)] w-full">
                🔴 MAGA Line — $2.99
              </Button>
              <span className="text-[11px] text-red-400/70 font-semibold">Right (Conservative / Republican)</span>
              <span className="text-[10px] text-gray-600 uppercase tracking-widest">Leave your rant.</span>
            </div>
            <div className="text-gray-700 font-black text-lg hidden sm:block self-start mt-3">VS</div>
            <div className="flex flex-col items-center gap-1.5 w-full sm:w-auto">
              <Button size="lg" className="bg-gray-700 hover:bg-gray-600 text-white font-black text-base h-13 px-8 rounded-full w-full">
                ⚪ Neutral Line — $2.99
              </Button>
              <span className="text-[11px] text-gray-400/70 font-semibold">Independent / Open Rant</span>
              <span className="text-[10px] text-gray-600 uppercase tracking-widest">Leave your rant.</span>
            </div>
            <div className="text-gray-700 font-black text-lg hidden sm:block self-start mt-3">VS</div>
            <div className="flex flex-col items-center gap-1.5 w-full sm:w-auto">
              <Button size="lg" className="bg-blue-700 hover:bg-blue-600 text-white font-black text-base h-13 px-8 rounded-full shadow-[0_0_25px_rgba(30,64,175,0.4)] w-full">
                🔵 Blue Line — $2.99
              </Button>
              <span className="text-[11px] text-blue-400/70 font-semibold">Left (Democrat / Progressive)</span>
              <span className="text-[10px] text-gray-600 uppercase tracking-widest">Leave your rant.</span>
            </div>
          </div>
          <p className="text-gray-600 text-xs mt-2">Skip the Line: $5 · Featured: $25 · (877) RANT-NOW</p>
        </div>
      </div>

      {/* LIVE SCOREBOARD — 3 LINES */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black uppercase tracking-tight">Today's Battle</h2>
          <p className="text-gray-500 text-sm mt-1">Total calls today — which line is loudest?</p>
        </div>
        <div className="bg-[#0f1423] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            <div className="p-5 text-center bg-gradient-to-br from-red-950/60 to-transparent">
              <div className="text-4xl font-black text-red-400 mb-1">{MAGA_TOTAL.toLocaleString()}</div>
              <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">🔴 MAGA Line</div>
              <div className="text-[10px] text-red-400/50 mt-1">+124 last hr</div>
            </div>
            <div className="p-5 text-center bg-gradient-to-b from-gray-800/30 to-transparent">
              <div className="text-4xl font-black text-gray-300 mb-1">{NEUTRAL_TOTAL.toLocaleString()}</div>
              <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">⚪ Neutral Line</div>
              <div className="text-[10px] text-gray-500/50 mt-1">+211 last hr · <span className="text-green-400">Leading</span></div>
            </div>
            <div className="p-5 text-center bg-gradient-to-bl from-blue-950/60 to-transparent">
              <div className="text-4xl font-black text-blue-400 mb-1">{BLUE_TOTAL.toLocaleString()}</div>
              <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">🔵 Blue Line</div>
              <div className="text-[10px] text-blue-400/50 mt-1">+97 last hr</div>
            </div>
          </div>
          {/* 3-segment battle bar */}
          <div className="px-6 pb-5 pt-2">
            <div className="h-5 rounded-full overflow-hidden flex">
              <div className="bg-gradient-to-r from-red-900 to-[#cc0000] flex items-center justify-end pr-2 transition-all"
                style={{ width: `${MAGA_PCT}%` }}>
                <span className="text-white text-[10px] font-black">{MAGA_PCT}%</span>
              </div>
              <div className="bg-gradient-to-r from-gray-700 to-gray-500 flex items-center justify-center transition-all"
                style={{ width: `${NEUTRAL_PCT}%` }}>
                <span className="text-white text-[10px] font-black">{NEUTRAL_PCT}%</span>
              </div>
              <div className="bg-gradient-to-l from-blue-900 to-blue-600 flex items-center justify-start pl-2 transition-all"
                style={{ width: `${BLUE_PCT}%` }}>
                <span className="text-white text-[10px] font-black">{BLUE_PCT}%</span>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              <span>⚪ Neutral Line is leading today</span>
              <span>Resets midnight EST</span>
            </div>
          </div>
        </div>
      </div>

      {/* TOP RANT FROM EACH LINE */}
      <div className="max-w-5xl mx-auto px-4 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-black uppercase tracking-tight">Top Rant of the Day</h2>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Top MAGA */}
          {[
            { side: 'maga' as Side, badge: '🔴 Top MAGA Rant', rant: MAGA_RANTS[0], topColor: 'from-red-900 via-red-500 to-red-900', border: 'border-red-700/60', bg: 'from-red-950/80', playBg: 'bg-[#cc0000] hover:bg-red-700', playGlow: 'shadow-[0_0_15px_rgba(204,0,0,0.4)]', badgeBg: 'bg-[#cc0000]', flameColor: 'text-red-400', flameFill: 'fill-red-400', btnBorder: 'border-red-700/50 text-red-400 hover:bg-red-900/30', progressBg: 'bg-[#cc0000]' },
            { side: 'neutral' as Side, badge: '⚪ Top Neutral Rant', rant: NEUTRAL_RANTS[0], topColor: 'from-gray-700 via-gray-400 to-gray-700', border: 'border-gray-600/60', bg: 'from-gray-800/60', playBg: 'bg-gray-700 hover:bg-gray-600', playGlow: 'shadow-[0_0_15px_rgba(120,120,120,0.3)]', badgeBg: 'bg-gray-700', flameColor: 'text-gray-300', flameFill: 'fill-gray-300', btnBorder: 'border-gray-600/50 text-gray-300 hover:bg-gray-800/50', progressBg: 'bg-gray-500' },
            { side: 'blue' as Side, badge: '🔵 Top Blue Rant', rant: BLUE_RANTS[0], topColor: 'from-blue-900 via-blue-400 to-blue-900', border: 'border-blue-700/60', bg: 'from-blue-950/80', playBg: 'bg-blue-700 hover:bg-blue-600', playGlow: 'shadow-[0_0_15px_rgba(30,64,175,0.4)]', badgeBg: 'bg-blue-700', flameColor: 'text-blue-400', flameFill: 'fill-blue-400', btnBorder: 'border-blue-700/50 text-blue-400 hover:bg-blue-900/30', progressBg: 'bg-blue-600' },
          ].map((r) => (
            <div key={r.side} className={`bg-gradient-to-br ${r.bg} to-[#0f1423] border-2 ${r.border} rounded-2xl p-5 relative overflow-hidden`}>
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${r.topColor}`}></div>
              <Badge className={`${r.badgeBg} text-white border-none font-black uppercase tracking-widest text-[10px] mb-3`}>{r.badge}</Badge>
              <h3 className="text-base font-black text-white leading-tight mb-2">"{r.rant.title}"</h3>
              <p className="text-gray-400 italic text-xs mb-4">— {r.rant.caller}</p>
              <div className="bg-black/40 rounded-xl p-3 flex items-center gap-3 mb-4 border border-white/5">
                <button className={`w-10 h-10 rounded-full ${r.playBg} flex items-center justify-center shrink-0 ${r.playGlow} transition-all hover:scale-105`}>
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </button>
                <div className="flex-1">
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full ${r.progressBg} w-0 rounded-full`}></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-600 mt-1 font-mono">
                    <span>0:00</span><span>{r.rant.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-1 ${r.flameColor} font-black text-lg`}>
                  <Flame className={`w-5 h-5 ${r.flameFill}`} />{r.rant.votes}
                  <span className="text-xs font-bold text-gray-600 ml-0.5">votes</span>
                </div>
                <Button variant="outline" className={`${r.btnBorder} text-xs rounded-full px-3 h-8`}>
                  <Share2 className="w-3 h-3 mr-1" /> Share
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SPLIT FEED */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-5 h-5 text-gray-400" />
          <h2 className="text-2xl font-black uppercase tracking-tight">Latest Rants</h2>
          <div className="flex-1 h-px bg-white/10"></div>
          {/* Filter tabs */}
          <div className="flex gap-1 bg-[#0d1120] border border-white/10 rounded-full p-1">
            {(['all', 'maga', 'neutral', 'blue'] as const).map((t) => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === t
                    ? t === 'maga' ? 'bg-[#cc0000] text-white' : t === 'blue' ? 'bg-blue-700 text-white' : t === 'neutral' ? 'bg-gray-700 text-white' : 'bg-white text-black'
                    : 'text-gray-500 hover:text-white'
                }`}>
                {t === 'all' ? 'All' : t === 'maga' ? '🔴 MAGA' : t === 'neutral' ? '⚪ Neutral' : '🔵 Blue'}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'all' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#cc0000]"></div>
                <span className="text-xs font-black text-red-400 uppercase tracking-widest">MAGA Line</span>
                <span className="text-gray-600 text-[10px] font-bold ml-auto">Right</span>
              </div>
              {MAGA_RANTS.map(r => <RantCard key={r.id} rant={r} side="maga" />)}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-500"></div>
                <span className="text-xs font-black text-gray-300 uppercase tracking-widest">Neutral Line</span>
                <span className="text-gray-600 text-[10px] font-bold ml-auto">Independent</span>
              </div>
              {NEUTRAL_RANTS.map(r => <RantCard key={r.id} rant={r} side="neutral" />)}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Blue Line</span>
                <span className="text-gray-600 text-[10px] font-bold ml-auto">Left</span>
              </div>
              {BLUE_RANTS.map(r => <RantCard key={r.id} rant={r} side="blue" />)}
            </div>
          </div>
        ) : activeTab === 'maga' ? (
          <div className="space-y-3 max-w-xl">
            {MAGA_RANTS.map(r => <RantCard key={r.id} rant={r} side="maga" />)}
          </div>
        ) : activeTab === 'neutral' ? (
          <div className="space-y-3 max-w-xl">
            {NEUTRAL_RANTS.map(r => <RantCard key={r.id} rant={r} side="neutral" />)}
          </div>
        ) : (
          <div className="space-y-3 max-w-xl">
            {BLUE_RANTS.map(r => <RantCard key={r.id} rant={r} side="blue" />)}
          </div>
        )}

        <div className="text-center mt-8">
          <button className="px-10 py-3 rounded-full border-2 border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all text-sm">
            Load More Rants
          </button>
        </div>
      </div>

      {/* BOTTOM CTA STRIP — 3 columns */}
      <div className="border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="bg-gradient-to-r from-red-950/60 to-transparent p-8 text-center">
            <Mic className="w-9 h-9 text-red-400 mx-auto mb-3" />
            <h3 className="font-black text-white text-lg mb-1">🔴 MAGA Line</h3>
            <p className="text-red-400/60 text-xs font-semibold mb-2">Right (Conservative / Republican)</p>
            <p className="text-gray-500 text-sm mb-5">Say what the mainstream media won't air.</p>
            <Button className="bg-[#cc0000] hover:bg-red-700 text-white font-black rounded-full px-7 h-11">
              Call Now — $2.99
            </Button>
          </div>
          <div className="bg-gradient-to-b from-gray-800/30 to-transparent p-8 text-center">
            <Mic className="w-9 h-9 text-gray-400 mx-auto mb-3" />
            <h3 className="font-black text-white text-lg mb-1">⚪ Neutral Line</h3>
            <p className="text-gray-400/60 text-xs font-semibold mb-2">Independent / Open Rant</p>
            <p className="text-gray-500 text-sm mb-5">No side required. Just your honest voice.</p>
            <Button className="bg-gray-700 hover:bg-gray-600 text-white font-black rounded-full px-7 h-11">
              Call Now — $2.99
            </Button>
          </div>
          <div className="bg-gradient-to-l from-blue-950/60 to-transparent p-8 text-center">
            <Mic className="w-9 h-9 text-blue-400 mx-auto mb-3" />
            <h3 className="font-black text-white text-lg mb-1">🔵 Blue Line</h3>
            <p className="text-blue-400/60 text-xs font-semibold mb-2">Left (Democrat / Progressive)</p>
            <p className="text-gray-500 text-sm mb-5">Make your voice heard loud and clear.</p>
            <Button className="bg-blue-700 hover:bg-blue-600 text-white font-black rounded-full px-7 h-11">
              Call Now — $2.99
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
