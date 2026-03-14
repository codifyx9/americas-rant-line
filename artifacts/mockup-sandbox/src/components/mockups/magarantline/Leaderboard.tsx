import React, { useState } from "react";
import { Radio, Menu, Play, Share2, Flame, Clock, Trophy, Volume2, ThumbsUp, ThumbsDown, TrendingUp, Star, Award, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TIME_TABS = ['Today', 'This Week', 'This Month', 'All Time'];

const PODIUM = [
  { rank: 1, title: "Gas Prices Are Destroying My Family Budget", category: "Inflation", caller: "Anonymous from Texas", votes: "2,847", downvotes: "412", duration: "2:45", plays: "14.2k" },
  { rank: 2, title: "The Government Doesn't Care About Us Anymore", category: "Politics", caller: "Mike in Ohio", votes: "1,923", downvotes: "287", duration: "1:30", plays: "9.8k" },
  { rank: 3, title: "My Son Came Home from Overseas — CHANGED FOREVER", category: "War Concerns", caller: "Sarah from Florida", votes: "1,456", downvotes: "198", duration: "3:12", plays: "7.3k" },
];

const REST = [
  { rank: 4, title: "They're Teaching WHAT in Our Schools?!", category: "Education", caller: "Concerned Mom", votes: "1,204", downvotes: "174", duration: "2:10", trend: '+12' },
  { rank: 5, title: "Small Businesses Are Getting CRUSHED", category: "Economy", caller: "Dave the Builder", votes: "982", downvotes: "142", duration: "1:45", trend: '+8' },
  { rank: 6, title: "I Can't Recognize My Own Country Anymore", category: "Culture", caller: "Patriot Bill", votes: "845", downvotes: "122", duration: "4:00", trend: '+3' },
  { rank: 7, title: "The Mainstream Media is Lying to You", category: "Media", caller: "Truth Seeker", votes: "756", downvotes: "109", duration: "2:20", trend: '-2' },
  { rank: 8, title: "Border Crisis is Out of Control", category: "Border Security", caller: "Rancher Jim", votes: "690", downvotes: "99", duration: "3:30", trend: '+5' },
  { rank: 9, title: "We Need to Stop These Endless Wars", category: "Foreign Policy", caller: "Vet from VA", votes: "488", downvotes: "71", duration: "2:40", trend: 'new' },
  { rank: 10, title: "Healthcare Costs Are Destroying My Family", category: "Economy", caller: "NursePatty_OH", votes: "401", downvotes: "58", duration: "3:05", trend: '-1' },
];

const TOP_RANTERS = [
  { name: 'PatriotPete', state: 'Texas', rants: 34, votes: '18.2k', badge: '👑', streak: 12 },
  { name: 'TiredInTampa', state: 'Florida', rants: 28, votes: '12.4k', badge: '🔥', streak: 7 },
  { name: 'RanchManTX', state: 'Texas', rants: 22, votes: '9.1k', badge: '⭐', streak: 5 },
  { name: 'MadDadOhio', state: 'Ohio', rants: 19, votes: '7.8k', badge: '🎖️', streak: 4 },
  { name: 'FuriousFrank', state: 'Georgia', rants: 15, votes: '5.9k', badge: '💪', streak: 3 },
];

const CATEGORIES_BREAKDOWN = [
  { name: 'Inflation', pct: 28, color: 'bg-red-600' },
  { name: 'Politics', pct: 22, color: 'bg-blue-600' },
  { name: 'Work', pct: 15, color: 'bg-orange-600' },
  { name: 'War & Military', pct: 12, color: 'bg-green-600' },
  { name: 'Dating', pct: 9, color: 'bg-pink-600' },
  { name: 'Other', pct: 14, color: 'bg-gray-600' },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('Today');

  return (
    <div className="min-h-screen font-sans text-white bg-[#0a0e1a]">
      {/* NAV */}
      <nav className="bg-[#cc0000] border-b border-red-900 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-tight text-white">MAGA <span className="font-light">RantLine</span></span>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" className="text-white hover:bg-red-800 hover:text-white font-medium">Home</Button>
            <Button variant="ghost" className="text-white hover:bg-red-800 hover:text-white font-medium">Rants</Button>
            <Button variant="ghost" className="bg-red-900 text-white hover:bg-red-950 font-bold shadow-inner">Leaderboard</Button>
            <Button className="ml-4 bg-white text-black hover:bg-white/90 font-bold uppercase tracking-wide">Leave a Rant</Button>
          </div>
          <div className="md:hidden"><Button variant="ghost" size="icon" className="text-white"><Menu className="h-6 w-6" /></Button></div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-3 flex items-center justify-center gap-3">
            <Trophy className="h-12 w-12 text-white" /> Top Rants
          </h1>
          <p className="text-xl text-gray-300 font-medium mb-5">The most voted rants from the hotline — updated live</p>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a2235] text-green-400 text-sm border border-green-800/50 font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Last updated: 2 minutes ago · 847 rants today
          </div>
        </div>

        {/* TIME TABS */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-[#111827] border border-[#cc0000]/30 rounded-full p-1 gap-1">
            {TIME_TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === tab ? 'bg-[#cc0000] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}>{tab}</button>
            ))}
          </div>
        </div>

        {/* PODIUM */}
        <div className="flex flex-col lg:flex-row items-end justify-center gap-6 mb-16 relative pt-10">
          {/* 2nd */}
          <div className="w-full lg:w-[30%] order-2 lg:order-1">
            <Card className="bg-[#111827] border-2 border-slate-600 relative overflow-visible shadow-lg">
              <div className="absolute -top-7 left-4 w-14 h-14 rounded-full bg-slate-300 flex items-center justify-center text-3xl shadow-lg border-4 border-[#0a0e1a] z-10">🥈</div>
              <CardHeader className="pt-10 pb-2">
                <Badge className="bg-slate-700 text-slate-200 border-none font-bold uppercase text-xs tracking-wider w-fit mb-2">{PODIUM[1].category}</Badge>
                <h3 className="text-lg font-bold leading-tight text-white line-clamp-2">"{PODIUM[1].title}"</h3>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-slate-400 italic mb-3">— {PODIUM[1].caller}</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1.5 text-slate-300 font-black text-xl">
                    <ThumbsUp className="h-5 w-5" />{PODIUM[1].votes}
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 text-sm font-bold">
                    <ThumbsDown className="h-3.5 w-3.5" />{PODIUM[1].downvotes}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-3">{PODIUM[1].plays} plays · {PODIUM[1].duration}</div>
                <div className="bg-[#0a0e1a] rounded-lg p-3 flex items-center gap-3 border border-slate-700">
                  <Button size="icon" className="h-8 w-8 rounded-full bg-slate-500 hover:bg-slate-400 text-white shrink-0"><Play className="h-4 w-4 ml-0.5" /></Button>
                  <div className="flex-1"><div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-slate-400 w-1/3 rounded-full"></div></div></div>
                  <span className="text-xs text-slate-400 font-mono">{PODIUM[1].duration}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 1st */}
          <div className="w-full lg:w-[38%] order-1 lg:order-2 z-10">
            <div className="text-center mb-3">
              <Badge className="bg-[#cc0000] text-white border-none font-black uppercase tracking-widest px-4 py-1">#1 THIS {activeTab.toUpperCase()}</Badge>
            </div>
            <Card className="bg-[#1a0808] border-4 border-white shadow-[0_0_50px_rgba(255,255,255,0.15)] relative overflow-visible">
              <div className="absolute -top-8 left-4 w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(255,255,255,0.4)] border-4 border-[#0a0e1a] z-10">🥇</div>
              <CardHeader className="pt-12 pb-4">
                <div className="flex justify-between items-start mb-3">
                  <Badge className="bg-[#cc0000] text-white border-none font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(204,0,0,0.5)]">{PODIUM[0].category}</Badge>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white -mt-2 -mr-2"><Share2 className="h-4 w-4" /></Button>
                </div>
                <h2 className="text-2xl font-black leading-tight text-white uppercase tracking-tight">"{PODIUM[0].title}"</h2>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-base text-gray-400 italic mb-4 border-l-2 border-white pl-3">— {PODIUM[0].caller}</p>
                <div className="flex items-center justify-center gap-4 py-4 bg-white/5 border-y border-white/10 mb-5 rounded-lg">
                  <div className="flex items-center gap-2 text-white font-black text-4xl">
                    <Flame className="h-9 w-9 fill-red-500 text-red-500 animate-pulse" />{PODIUM[0].votes}
                    <span className="text-sm font-bold text-gray-500 self-end mb-1">up</span>
                  </div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div className="flex items-center gap-1.5 text-gray-500 font-black text-xl">
                    <ThumbsDown className="h-5 w-5" />{PODIUM[0].downvotes}
                    <span className="text-xs font-bold text-gray-600 self-end mb-0.5">down</span>
                  </div>
                </div>
                <div className="text-center text-gray-500 text-sm mb-4">{PODIUM[0].plays} plays · {PODIUM[0].duration}</div>
                <div className="bg-[#0a0e1a] rounded-xl p-4 flex items-center gap-4 border border-red-900/40">
                  <Button size="icon" className="h-14 w-14 rounded-full bg-[#cc0000] hover:bg-red-600 text-white shrink-0 shadow-[0_0_20px_rgba(204,0,0,0.4)] hover:scale-105 transition-all">
                    <Play className="h-6 w-6 ml-1" />
                  </Button>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-gray-500"><span>0:00</span><span>{PODIUM[0].duration}</span></div>
                    <div className="h-2 bg-gray-800 rounded-full cursor-pointer"><div className="h-full bg-white w-0 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]"></div></div>
                  </div>
                  <Volume2 className="h-4 w-4 text-gray-500 hover:text-white cursor-pointer" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 3rd */}
          <div className="w-full lg:w-[30%] order-3 lg:translate-y-6">
            <Card className="bg-[#111827] border-2 border-orange-900/60 relative overflow-visible shadow-lg">
              <div className="absolute -top-7 left-4 w-12 h-12 rounded-full bg-orange-300 flex items-center justify-center text-2xl shadow-lg border-4 border-[#0a0e1a] z-10">🥉</div>
              <CardHeader className="pt-9 pb-2">
                <Badge className="bg-orange-900/50 text-orange-300 border-none font-bold uppercase text-xs tracking-wider w-fit mb-2">{PODIUM[2].category}</Badge>
                <h3 className="text-lg font-bold leading-tight text-white line-clamp-2">"{PODIUM[2].title}"</h3>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-slate-400 italic mb-3">— {PODIUM[2].caller}</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1.5 text-orange-300 font-black text-xl">
                    <ThumbsUp className="h-5 w-5" />{PODIUM[2].votes}
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 text-sm font-bold">
                    <ThumbsDown className="h-3.5 w-3.5" />{PODIUM[2].downvotes}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-3">{PODIUM[2].plays} plays · {PODIUM[2].duration}</div>
                <div className="bg-[#0a0e1a] rounded-lg p-3 flex items-center gap-3 border border-orange-900/30">
                  <Button size="icon" className="h-8 w-8 rounded-full bg-orange-800 hover:bg-orange-700 text-white shrink-0"><Play className="h-4 w-4 ml-0.5" /></Button>
                  <div className="flex-1"><div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-orange-500 w-1/4 rounded-full"></div></div></div>
                  <span className="text-xs text-slate-400 font-mono">{PODIUM[2].duration}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-[#111827] rounded-xl border border-[#cc0000]/40 shadow-xl overflow-hidden mb-10">
          <div className="p-5 border-b border-[#cc0000]/40 bg-[#162032] flex justify-between items-center">
            <h3 className="text-lg font-black uppercase tracking-wide flex items-center gap-2"><Award className="w-5 h-5 text-white" /> The Rest of the Best</h3>
            <Badge className="bg-[#cc0000]/20 text-red-300 border-[#cc0000]/30 font-bold">Ranks 4–10</Badge>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#0a0e1a]">
                <TableRow className="border-[#cc0000]/30 hover:bg-transparent">
                  <TableHead className="w-14 text-center text-gray-500 font-bold uppercase text-xs">Rank</TableHead>
                  <TableHead className="text-gray-500 font-bold uppercase text-xs">Rant Title</TableHead>
                  <TableHead className="hidden md:table-cell text-gray-500 font-bold uppercase text-xs">Category</TableHead>
                  <TableHead className="hidden lg:table-cell text-gray-500 font-bold uppercase text-xs">Caller</TableHead>
                  <TableHead className="text-right text-gray-500 font-bold uppercase text-xs">Votes / Down</TableHead>
                  <TableHead className="hidden sm:table-cell text-center text-gray-500 font-bold uppercase text-xs">Trend</TableHead>
                  <TableHead className="w-16 text-center text-gray-500 font-bold uppercase text-xs">Play</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {REST.map((item, i) => (
                  <TableRow key={item.rank} className={`border-[#cc0000]/20 transition-colors hover:bg-gray-800/50 ${i%2===0?'bg-[#151e2e]':'bg-[#111827]'}`}>
                    <TableCell className="text-center font-mono font-black text-gray-300 text-lg">#{item.rank}</TableCell>
                    <TableCell className="font-semibold text-white max-w-xs truncate">"{item.title}"</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="border-[#cc0000]/40 text-gray-400 bg-gray-800/50 font-medium text-xs">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-gray-400 italic text-sm">{item.caller}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-black text-white text-sm">{item.votes}</span>
                        <span className="text-[10px] text-gray-600 flex items-center gap-0.5"><ThumbsDown className="w-2.5 h-2.5" />{item.downvotes}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-center">
                      <span className={`text-xs font-bold ${item.trend.startsWith('+') ? 'text-green-400' : item.trend === 'new' ? 'text-blue-400' : 'text-red-400'}`}>
                        {item.trend === 'new' ? '🆕' : item.trend.startsWith('+') ? `↑${item.trend}` : `↓${item.trend.slice(1)}`}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-[#cc0000] hover:text-white text-gray-400 transition-colors">
                        <Play className="h-4 w-4 ml-0.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 bg-[#0a0e1a] border-t border-[#cc0000]/30 text-center">
            <Button variant="outline" className="border-[#cc0000]/40 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full px-8">Load More</Button>
          </div>
        </div>

        {/* TOP RANTERS */}
        <div className="mb-10">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-5 flex items-center gap-3"><Mic className="w-7 h-7 text-red-400" /> Top Ranters This Week</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TOP_RANTERS.map((r, i) => (
              <div key={r.name} className={`bg-[#111827] border rounded-xl p-4 text-center relative ${i===0 ? 'border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.08)]' : 'border-[#cc0000]/25'}`}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">{r.badge}</div>
                <div className="mt-4 w-12 h-12 rounded-full bg-[#cc0000]/20 border border-[#cc0000]/40 flex items-center justify-center text-xl font-black text-white mx-auto mb-2">{i+1}</div>
                <div className="font-black text-white text-sm mb-0.5">{r.name}</div>
                <div className="text-gray-500 text-xs mb-3">{r.state}</div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">{r.rants} rants</span>
                  <span className="text-red-400 font-bold">{r.votes} votes</span>
                </div>
                <div className="mt-2 text-xs text-orange-400 font-bold">🔥 {r.streak}-day streak</div>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY BREAKDOWN */}
        <div className="bg-[#111827] rounded-xl border border-[#cc0000]/30 p-6 mb-8">
          <h3 className="text-lg font-black uppercase tracking-wide mb-5 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-red-400" /> Rant Categories Today</h3>
          <div className="space-y-3">
            {CATEGORIES_BREAKDOWN.map((c) => (
              <div key={c.name} className="flex items-center gap-4">
                <div className="w-28 text-sm font-bold text-gray-300 text-right shrink-0">{c.name}</div>
                <div className="flex-1 h-5 bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full ${c.color} rounded-full flex items-center justify-end pr-2`} style={{width:`${c.pct}%`}}>
                    <span className="text-white text-xs font-black">{c.pct}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COUNTDOWN */}
        <div className="bg-[#1a1100] border border-[#cc0000]/50 rounded-lg p-4 flex items-center justify-center gap-3">
          <Clock className="h-5 w-5 text-white" />
          <span className="text-white font-bold tracking-wide uppercase text-sm">
            Leaderboard resets at midnight EST · <span className="text-red-400">06h 42m 18s remaining</span>
          </span>
        </div>
      </main>
    </div>
  );
}
