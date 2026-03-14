import React, { useState } from 'react';
import { Play, Pause, Flame, Share2, Trophy, Mic, ChevronRight, TrendingUp, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const RED_RANTS = [
  { id: 1, title: "They're Destroying This Country From the Inside Out", caller: "PatriotPete, TX", votes: "2,847", duration: "2:34", ago: "4m", hot: true },
  { id: 2, title: "Open Borders Is an Attack on American Workers", caller: "RanchManTX, TX", votes: "1,923", duration: "3:12", ago: "18m", hot: true },
  { id: 3, title: "Gas Was $1.89 When Trump Was in Office — FACT", caller: "FuriousFrank, GA", votes: "1,241", duration: "1:58", ago: "31m", hot: false },
  { id: 4, title: "The Media Won't Tell You What's Really Going On", caller: "TruthSeeker, OH", votes: "987", duration: "4:05", ago: "47m", hot: false },
  { id: 5, title: "My Second Amendment Rights Are Non-Negotiable", caller: "GunOwnerBill, VA", votes: "756", duration: "2:20", ago: "1h", hot: false },
];

const BLUE_RANTS = [
  { id: 1, title: "Healthcare Is a Right, Not a Luxury — Period.", caller: "NursePatty, IL", votes: "2,412", duration: "3:01", ago: "7m", hot: true },
  { id: 2, title: "Climate Change Is Here and Nobody Wants to Listen", caller: "GreenMike, CA", votes: "1,654", duration: "2:45", ago: "22m", hot: true },
  { id: 3, title: "Why Are We Cutting School Budgets to Fund Tax Cuts?", caller: "TeacherSue, NY", votes: "1,102", duration: "3:30", ago: "38m", hot: false },
  { id: 4, title: "Women's Rights Are Under Attack — We Won't Be Quiet", caller: "VoiceForAll, CO", votes: "893", duration: "2:15", ago: "52m", hot: false },
  { id: 5, title: "The Supreme Court Has Lost Its Credibility", caller: "LegalMind, DC", votes: "688", duration: "3:45", ago: "1h 5m", hot: false },
];

const RED_TOTAL = 6842;
const BLUE_TOTAL = 5931;
const GRAND_TOTAL = RED_TOTAL + BLUE_TOTAL;
const RED_PCT = Math.round((RED_TOTAL / GRAND_TOTAL) * 100);
const BLUE_PCT = 100 - RED_PCT;

function RantCard({ rant, side }: { rant: typeof RED_RANTS[0]; side: 'red' | 'blue' }) {
  const [playing, setPlaying] = useState(false);
  const accent = side === 'red' ? '#cc0000' : '#1e40af';
  const accentLight = side === 'red' ? 'border-red-700/50 bg-[#1a0808]' : 'border-blue-700/50 bg-[#080d1a]';
  const badgeBg = side === 'red' ? 'bg-[#cc0000]' : 'bg-blue-700';
  const playBg = side === 'red' ? 'bg-[#cc0000] hover:bg-red-700' : 'bg-blue-700 hover:bg-blue-600';
  const progressBg = side === 'red' ? 'bg-[#cc0000]' : 'bg-blue-600';
  const flameBg = side === 'red' ? 'text-red-400 fill-red-400' : 'text-blue-400 fill-blue-400';

  return (
    <div className={`rounded-xl border ${accentLight} p-4 group hover:opacity-90 transition-opacity`}>
      {rant.hot && (
        <div className={`inline-flex items-center gap-1 ${badgeBg} text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-2`}>
          🔥 Hot Right Now
        </div>
      )}
      <h3 className="font-bold text-white text-sm leading-snug mb-2 line-clamp-2">"{rant.title}"</h3>
      <p className="text-gray-500 text-xs italic mb-3">{rant.caller} · {rant.ago} ago</p>

      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => setPlaying(!playing)}
          className={`w-9 h-9 rounded-full ${playBg} flex items-center justify-center text-white shrink-0 transition-all`}
        >
          {playing ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
        </button>
        <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div className={`h-full ${progressBg} rounded-full`} style={{ width: playing ? '35%' : '0%', transition: 'width 0.3s' }}></div>
        </div>
        <span className="text-gray-500 text-xs font-mono">{rant.duration}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1 font-black text-sm ${side === 'red' ? 'text-red-400' : 'text-blue-400'}`}>
          <Flame className={`w-4 h-4 ${flameBg}`} />
          {rant.votes}
        </div>
        <button className="w-7 h-7 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <Share2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export default function RedVsBlue() {
  const [activeTab, setActiveTab] = useState<'all' | 'red' | 'blue'>('all');

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans">

      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-white/10" style={{ background: 'linear-gradient(90deg, #8b0000 0%, #1e0a0a 49%, #050a1a 51%, #0d1a5c 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-black text-2xl tracking-tight text-white">MAGA <span className="font-light">RantLine</span></span>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a href="#" className="text-white/70 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">All Rants</a>
            <a href="#" className="text-white border-b-2 border-white pb-0.5">🔴🔵 Red vs Blue</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Leaderboard</a>
          </div>
          <div className="flex gap-2">
            <Button className="bg-[#cc0000] hover:bg-red-700 text-white font-black text-xs px-4 h-9 rounded-full">🔴 Red Line</Button>
            <Button className="bg-blue-700 hover:bg-blue-600 text-white font-black text-xs px-4 h-9 rounded-full">🔵 Blue Line</Button>
          </div>
        </div>
      </nav>

      {/* SPLIT HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-gradient-to-br from-red-950 via-[#1a0505] to-transparent"></div>
          <div className="w-1/2 bg-gradient-to-bl from-blue-950 via-[#05081a] to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 px-4 py-1.5 rounded-full text-xs font-bold mb-8 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
            LIVE · Updated every 5 minutes
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-6">
            <span className="text-red-500">America</span><br />
            <span className="text-white">is Arguing.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 font-medium">Pick a side. Leave your rant. Let the people vote.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-[#cc0000] hover:bg-red-700 text-white font-black text-lg h-14 px-10 rounded-full shadow-[0_0_30px_rgba(204,0,0,0.4)] w-full sm:w-auto">
              🔴 Call the Red Line
            </Button>
            <div className="text-gray-600 font-black text-lg hidden sm:block">VS</div>
            <Button size="lg" className="bg-blue-700 hover:bg-blue-600 text-white font-black text-lg h-14 px-10 rounded-full shadow-[0_0_30px_rgba(30,64,175,0.4)] w-full sm:w-auto">
              🔵 Call the Blue Line
            </Button>
          </div>
          <p className="text-gray-600 text-sm mt-5">Red Line: $1.99 · Blue Line: $1.99 · Skip the Line: $5 · Featured: $25</p>
        </div>
      </div>

      {/* LIVE SCOREBOARD */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black uppercase tracking-tight">Today's Battle</h2>
          <p className="text-gray-500 text-sm mt-1">Total calls today — which side is louder?</p>
        </div>

        <div className="bg-[#0f1423] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Score row */}
          <div className="grid grid-cols-3 divide-x divide-white/10">
            <div className="p-6 text-center bg-gradient-to-br from-red-950/60 to-transparent">
              <div className="text-5xl font-black text-red-400 mb-1">{RED_TOTAL.toLocaleString()}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">🔴 Red Line Calls</div>
            </div>
            <div className="p-6 text-center flex flex-col items-center justify-center">
              <div className="text-2xl font-black text-gray-600 mb-1">VS</div>
              <div className="text-xs text-gray-600 font-bold uppercase tracking-widest">Today</div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-green-400 font-bold">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Live
              </div>
            </div>
            <div className="p-6 text-center bg-gradient-to-bl from-blue-950/60 to-transparent">
              <div className="text-5xl font-black text-blue-400 mb-1">{BLUE_TOTAL.toLocaleString()}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">🔵 Blue Line Calls</div>
            </div>
          </div>

          {/* Battle bar */}
          <div className="px-6 pb-6">
            <div className="h-6 rounded-full overflow-hidden flex">
              <div
                className="bg-gradient-to-r from-red-900 to-[#cc0000] flex items-center justify-end pr-3 transition-all duration-1000"
                style={{ width: `${RED_PCT}%` }}
              >
                <span className="text-white text-xs font-black">{RED_PCT}%</span>
              </div>
              <div
                className="bg-gradient-to-l from-blue-900 to-blue-600 flex items-center justify-start pl-3 transition-all duration-1000"
                style={{ width: `${BLUE_PCT}%` }}
              >
                <span className="text-white text-xs font-black">{BLUE_PCT}%</span>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600 font-bold uppercase tracking-widest">
              <span>🔴 Red is leading</span>
              <span>Resets midnight EST</span>
            </div>
          </div>
        </div>
      </div>

      {/* TOP RANT FROM EACH SIDE */}
      <div className="max-w-5xl mx-auto px-4 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-white" />
          <h2 className="text-2xl font-black uppercase tracking-tight">Top Rant of the Day</h2>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Red */}
          <div className="bg-gradient-to-br from-red-950/80 to-[#0f1423] border-2 border-red-700/60 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900 via-red-500 to-red-900"></div>
            <Badge className="bg-[#cc0000] text-white border-none font-black uppercase tracking-widest text-xs mb-3">🔴 Top Red Rant</Badge>
            <h3 className="text-xl font-black text-white leading-tight mb-2">"{RED_RANTS[0].title}"</h3>
            <p className="text-gray-400 italic text-sm mb-4">— {RED_RANTS[0].caller}</p>
            <div className="bg-black/40 rounded-xl p-4 flex items-center gap-4 mb-4 border border-red-900/40">
              <button className="w-12 h-12 rounded-full bg-[#cc0000] hover:bg-red-700 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(204,0,0,0.4)] transition-all hover:scale-105">
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </button>
              <div className="flex-1">
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-[#cc0000] w-0 rounded-full"></div></div>
                <div className="flex justify-between text-xs text-gray-600 mt-1 font-mono"><span>0:00</span><span>{RED_RANTS[0].duration}</span></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-red-400 font-black text-2xl">
                <Flame className="w-6 h-6 fill-red-400" />{RED_RANTS[0].votes}
                <span className="text-sm font-bold text-gray-500 ml-1">votes</span>
              </div>
              <Button variant="outline" className="border-red-700/50 text-red-400 hover:bg-red-900/30 text-xs rounded-full px-4">
                <Share2 className="w-3 h-3 mr-1" /> Share
              </Button>
            </div>
          </div>

          {/* Top Blue */}
          <div className="bg-gradient-to-br from-blue-950/80 to-[#0f1423] border-2 border-blue-700/60 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-blue-400 to-blue-900"></div>
            <Badge className="bg-blue-700 text-white border-none font-black uppercase tracking-widest text-xs mb-3">🔵 Top Blue Rant</Badge>
            <h3 className="text-xl font-black text-white leading-tight mb-2">"{BLUE_RANTS[0].title}"</h3>
            <p className="text-gray-400 italic text-sm mb-4">— {BLUE_RANTS[0].caller}</p>
            <div className="bg-black/40 rounded-xl p-4 flex items-center gap-4 mb-4 border border-blue-900/40">
              <button className="w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(30,64,175,0.4)] transition-all hover:scale-105">
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </button>
              <div className="flex-1">
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-blue-600 w-0 rounded-full"></div></div>
                <div className="flex justify-between text-xs text-gray-600 mt-1 font-mono"><span>0:00</span><span>{BLUE_RANTS[0].duration}</span></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-blue-400 font-black text-2xl">
                <Flame className="w-6 h-6 fill-blue-400" />{BLUE_RANTS[0].votes}
                <span className="text-sm font-bold text-gray-500 ml-1">votes</span>
              </div>
              <Button variant="outline" className="border-blue-700/50 text-blue-400 hover:bg-blue-900/30 text-xs rounded-full px-4">
                <Share2 className="w-3 h-3 mr-1" /> Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* SPLIT FEED */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-5 h-5 text-gray-400" />
          <h2 className="text-2xl font-black uppercase tracking-tight">Latest Rants</h2>
          <div className="flex-1 h-px bg-white/10"></div>
          {/* Filter tabs */}
          <div className="flex gap-1 bg-gray-900 border border-white/10 rounded-full p-1">
            {(['all','red','blue'] as const).map((t) => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === t
                    ? t === 'red' ? 'bg-[#cc0000] text-white' : t === 'blue' ? 'bg-blue-700 text-white' : 'bg-white text-black'
                    : 'text-gray-500 hover:text-white'
                }`}>
                {t === 'all' ? 'All' : t === 'red' ? '🔴 Red' : '🔵 Blue'}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'all' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-[#cc0000]"></div>
                <span className="text-xs font-black text-red-400 uppercase tracking-widest">Red Line Feed</span>
              </div>
              {RED_RANTS.map(r => <RantCard key={r.id} rant={r} side="red" />)}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Blue Line Feed</span>
              </div>
              {BLUE_RANTS.map(r => <RantCard key={r.id} rant={r} side="blue" />)}
            </div>
          </div>
        ) : activeTab === 'red' ? (
          <div className="space-y-3 max-w-2xl">
            {RED_RANTS.map(r => <RantCard key={r.id} rant={r} side="red" />)}
          </div>
        ) : (
          <div className="space-y-3 max-w-2xl">
            {BLUE_RANTS.map(r => <RantCard key={r.id} rant={r} side="blue" />)}
          </div>
        )}

        <div className="text-center mt-8">
          <button className="px-10 py-3 rounded-full border-2 border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all text-sm">
            Load More Rants
          </button>
        </div>
      </div>

      {/* BOTTOM CTA STRIP */}
      <div className="border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="bg-gradient-to-r from-red-950/60 to-transparent p-8 text-center">
            <Mic className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="font-black text-white text-xl mb-2">Call the Red Line</h3>
            <p className="text-gray-400 text-sm mb-5">Conservative callers. Say what the mainstream won't air.</p>
            <Button className="bg-[#cc0000] hover:bg-red-700 text-white font-black rounded-full px-8 h-12">
              🔴 Call Now — $1.99
            </Button>
          </div>
          <div className="bg-gradient-to-l from-blue-950/60 to-transparent p-8 text-center">
            <Mic className="w-10 h-10 text-blue-400 mx-auto mb-3" />
            <h3 className="font-black text-white text-xl mb-2">Call the Blue Line</h3>
            <p className="text-gray-400 text-sm mb-5">Progressive callers. Make your voice heard loud and clear.</p>
            <Button className="bg-blue-700 hover:bg-blue-600 text-white font-black rounded-full px-8 h-12">
              🔵 Call Now — $1.99
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
