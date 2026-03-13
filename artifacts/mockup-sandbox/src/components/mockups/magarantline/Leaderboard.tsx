import React from "react";
import { Mic, Play, Menu, Clock, Share2, Trophy, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const PODIUM_DATA = [
  {
    rank: 1,
    title: "Gas Prices Are Destroying My Family Budget",
    category: "Inflation",
    caller: "Anonymous from Texas",
    votes: "2,847",
    duration: "2:34",
  },
  {
    rank: 2,
    title: "The Government Doesn't Hear Us",
    category: "Politics",
    caller: "Mike in Ohio",
    votes: "1,923",
    duration: "1:30",
  },
  {
    rank: 3,
    title: "My Son Came Home Changed Forever",
    category: "Veterans",
    caller: "Sarah from Florida",
    votes: "1,456",
    duration: "3:12",
  }
];

const LEADERBOARD_DATA = [
  { rank: 4, title: "They're Teaching WHAT in Our Schools?!", category: "Education", caller: "Concerned Mom", votes: "1,204", duration: "2:10" },
  { rank: 5, title: "Small Businesses Are Getting CRUSHED", category: "Economy", caller: "Dave the Builder", votes: "982", duration: "1:45" },
  { rank: 6, title: "I Can't Recognize My Own Country Anymore", category: "Culture", caller: "Patriot Bill", votes: "845", duration: "4:00" },
  { rank: 7, title: "The Mainstream Media is Lying to You", category: "Media", caller: "Truth Seeker", votes: "756", duration: "2:20" },
  { rank: 8, title: "Border Crisis is Out of Control", category: "Border Security", caller: "Rancher Jim", votes: "690", duration: "3:30" },
  { rank: 9, title: "We Need to Defund These Crazy Alphabet Agencies", category: "Government", caller: "Liberty Lover", votes: "540", duration: "1:55" },
  { rank: 10, title: "Stop the Endless Wars Immediately", category: "Foreign Policy", caller: "Vet from VA", votes: "488", duration: "2:40" },
];

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-[#080e1f] font-sans text-white pb-10">
      {/* 1. HERO BANNER */}
      <div className="bg-[#0B1E3A] relative overflow-hidden py-5 px-6 flex items-center justify-between">
        <div className="relative z-10 flex flex-col">
          <img src="/__mockup/images/logo-reference.png" className="h-14 object-contain self-start" alt="MAGA RANT LINE" />
          <div className="text-white text-xs uppercase tracking-widest mt-1 font-bold">
            ★ AMERICA'S VOICE. <span style={{ color: "#D61F1F" }}>UNFILTERED.</span> REAL. ★
          </div>
        </div>
        
        {/* Right Flag Corner */}
        <div className="absolute top-0 right-0 w-40 h-full pointer-events-none overflow-hidden opacity-50 flex">
          <div className="w-12 h-full bg-[#0B1E3A] flex flex-wrap content-start p-1 gap-1 border-r border-white/20 z-10">
            <span className="text-white text-[10px] leading-none">★</span>
            <span className="text-white text-[10px] leading-none">★</span>
            <span className="text-white text-[10px] leading-none">★</span>
            <span className="text-white text-[10px] leading-none">★</span>
            <span className="text-white text-[10px] leading-none">★</span>
            <span className="text-white text-[10px] leading-none">★</span>
          </div>
          <div 
            className="flex-1 h-full" 
            style={{ background: "repeating-linear-gradient(0deg, #B22234 0px, #B22234 18px, #FFFFFF 18px, #FFFFFF 36px)" }}
          />
        </div>
      </div>

      {/* 2. NAVBAR */}
      <nav className="bg-[#D61F1F] sticky top-0 z-50 shadow-md">
        <div className="h-14 flex items-center px-4 gap-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Mic className="h-6 w-6 text-white" />
            <span className="font-['Black_Ops_One'] text-white text-xl tracking-wide mt-1">
              MAGARANTLINE
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 mx-auto">
            <button className="bg-[#0B1E3A] hover:bg-[#0B1E3A]/80 transition-colors rounded-full px-4 py-1 text-white text-sm font-semibold flex items-center gap-2">
              <span>🏠</span> HOME
            </button>
            <button className="bg-[#0B1E3A] hover:bg-[#0B1E3A]/80 transition-colors rounded-full px-4 py-1 text-white text-sm font-semibold flex items-center gap-2">
              <span>📻</span> RANT WALL
            </button>
            <button className="bg-[#0B1E3A] ring-2 ring-white transition-colors rounded-full px-4 py-1 text-white text-sm font-semibold flex items-center gap-2">
              <span>🏆</span> LEADERBOARD
            </button>
          </div>
          
          <Button className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-black font-bold rounded-full px-5 py-2 text-sm ml-auto h-auto">
            LEAVE A RANT →
          </Button>
          
          <div className="md:hidden ml-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full h-10 w-10">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex flex-col max-w-6xl mx-auto">
        {/* 3. PAGE HEADER */}
        <div className="bg-gradient-to-b from-[#0B1E3A] to-black py-8 px-6 text-center">
          <h1 className="font-['Black_Ops_One'] text-white text-4xl md:text-6xl tracking-wide drop-shadow-lg uppercase">
            TOP RANTS TODAY
          </h1>
          <p className="text-[#F59E0B] text-sm mt-2 font-bold tracking-wider uppercase">
            Updated live — 847 rants today
          </p>
        </div>

        {/* 4. TOP 3 PODIUM */}
        <div className="px-6 py-8 flex flex-col md:flex-row items-center md:items-end justify-center gap-6 md:gap-4 lg:gap-8">
          
          {/* 🥈 2nd Place */}
          <div className="w-full md:w-1/3 order-2 md:order-1 transform md:-translate-y-6">
            <div className="border border-gray-500/60 bg-[#0d1530] rounded-2xl p-5 shadow-lg shadow-gray-500/10 relative">
              <div className="absolute -top-6 -left-4 text-5xl drop-shadow-md z-10">🥈</div>
              <div className="pt-4">
                <h3 className="text-xl font-bold leading-tight text-white line-clamp-2 mt-2">"{PODIUM_DATA[1].title}"</h3>
                <div className="font-['Black_Ops_One'] text-gray-300 text-3xl mt-3 tracking-wide flex items-center gap-2">
                  <Flame className="h-6 w-6 text-gray-400" />
                  {PODIUM_DATA[1].votes} VOTES
                </div>
                
                {/* Compact Player */}
                <div className="bg-black/50 rounded-lg p-3 flex items-center gap-3 border border-gray-700 mt-4">
                  <Button size="icon" className="h-10 w-10 rounded-full bg-gray-600 hover:bg-gray-500 text-white shrink-0 shadow-md">
                    <Play className="h-4 w-4 ml-0.5" />
                  </Button>
                  <div className="flex-1">
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-400 w-1/3 rounded-full"></div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-400">{PODIUM_DATA[1].duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 🥇 1st Place */}
          <div className="w-full md:w-[40%] order-1 md:order-2 z-10">
            <div className="bg-gradient-to-b from-[#1a1200] to-[#0d0b00] border-2 border-[#F59E0B] rounded-2xl p-6 shadow-xl shadow-yellow-500/20 relative">
              <div className="absolute -top-8 -left-5 text-6xl drop-shadow-xl z-10">🥇</div>
              <div className="absolute top-4 right-4 text-[#F59E0B] text-xs font-black uppercase tracking-widest bg-yellow-900/30 px-3 py-1 rounded-full border border-yellow-700/50">
                MOST VOTED
              </div>
              <div className="pt-6">
                <Badge className="bg-[#D61F1F] text-white hover:bg-red-700 border-none font-bold uppercase px-3 py-1 text-xs tracking-wider mb-3">
                  {PODIUM_DATA[0].category}
                </Badge>
                <h2 className="text-2xl font-bold leading-tight text-white mb-2">"{PODIUM_DATA[0].title}"</h2>
                <p className="text-sm text-gray-400 italic mb-4">— {PODIUM_DATA[0].caller}</p>
                
                <div className="font-['Black_Ops_One'] text-[#F59E0B] text-4xl mt-3 tracking-wide flex items-center gap-2 drop-shadow-md">
                  <Flame className="h-8 w-8 text-[#F59E0B]" />
                  {PODIUM_DATA[0].votes} VOTES
                </div>
                
                {/* Full Player */}
                <div className="flex gap-3 items-center mt-6 bg-black/40 p-4 rounded-xl border border-yellow-900/30">
                  <Button size="icon" className="h-14 w-14 rounded-full bg-[#D61F1F] hover:bg-red-700 text-white shrink-0 shadow-lg shadow-red-900/50">
                    <Play className="h-6 w-6 ml-1" />
                  </Button>
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden relative cursor-pointer shadow-inner">
                      <div className="h-full bg-[#F59E0B] w-1/3 relative rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
                    </div>
                    <div className="flex justify-between text-xs font-mono text-gray-400 font-medium">
                      <span>1:04</span>
                      <span>{PODIUM_DATA[0].duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10 text-xs uppercase font-bold tracking-wider h-8">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Rant
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 🥉 3rd Place */}
          <div className="w-full md:w-1/3 order-3 transform md:-translate-y-6">
            <div className="border border-amber-700/50 bg-[#0d1530] rounded-2xl p-5 shadow-lg shadow-amber-700/10 relative">
              <div className="absolute -top-6 -left-4 text-5xl drop-shadow-md z-10">🥉</div>
              <div className="pt-4">
                <h3 className="text-xl font-bold leading-tight text-white line-clamp-2 mt-2">"{PODIUM_DATA[2].title}"</h3>
                <div className="font-['Black_Ops_One'] text-amber-700 text-3xl mt-3 tracking-wide flex items-center gap-2">
                  <Flame className="h-6 w-6 text-amber-700" />
                  {PODIUM_DATA[2].votes} VOTES
                </div>
                
                {/* Compact Player */}
                <div className="bg-black/50 rounded-lg p-3 flex items-center gap-3 border border-amber-900/30 mt-4">
                  <Button size="icon" className="h-10 w-10 rounded-full bg-amber-800 hover:bg-amber-700 text-white shrink-0 shadow-md">
                    <Play className="h-4 w-4 ml-0.5" />
                  </Button>
                  <div className="flex-1">
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-600 w-1/4 rounded-full"></div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-400">{PODIUM_DATA[2].duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. RANKS 4-10 TABLE */}
        <div className="mx-6 mt-8 mb-12">
          <div className="bg-[#0d1530] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-[#0B1E3A] hover:bg-[#0B1E3A]">
                  <TableRow className="border-b-0 hover:bg-transparent">
                    <TableHead className="w-16 text-center text-gray-400 font-bold uppercase text-xs tracking-wider py-3">#</TableHead>
                    <TableHead className="w-16 text-center text-gray-400 font-bold uppercase text-xs tracking-wider py-3">▶</TableHead>
                    <TableHead className="text-gray-400 font-bold uppercase text-xs tracking-wider py-3">Title</TableHead>
                    <TableHead className="hidden md:table-cell text-gray-400 font-bold uppercase text-xs tracking-wider py-3">Category</TableHead>
                    <TableHead className="text-right text-gray-400 font-bold uppercase text-xs tracking-wider py-3 pr-6">🔥 Votes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {LEADERBOARD_DATA.map((item, index) => (
                    <TableRow 
                      key={item.rank} 
                      className={`border-white/5 transition-colors hover:bg-white/5 ${index % 2 === 0 ? 'bg-transparent' : 'bg-black/20'}`}
                    >
                      <TableCell className="text-center font-black text-gray-500 text-lg">
                        {item.rank}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full bg-white/5 hover:bg-[#D61F1F] hover:text-white text-gray-400 transition-colors border border-white/10">
                          <Play className="h-4 w-4 ml-0.5" />
                        </Button>
                      </TableCell>
                      <TableCell className="font-semibold text-white max-w-[200px] md:max-w-md">
                        <div className="truncate text-base leading-tight">"{item.title}"</div>
                        <div className="text-xs text-gray-400 mt-1 font-normal flex items-center gap-2">
                          <span className="italic">— {item.caller}</span>
                          <span className="md:hidden inline-block px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-bold uppercase text-gray-300">
                            {item.category}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="border-gray-600 text-gray-300 bg-black/40 font-bold text-[10px] tracking-wider uppercase px-2 py-0.5">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-['Black_Ops_One'] text-[#F59E0B] text-xl pr-6 tracking-wide">
                        {item.votes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 bg-black/40 border-t border-white/5 text-center">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:bg-white/10 uppercase text-xs font-bold tracking-wider rounded-full px-6">
                Load More Rants
              </Button>
            </div>
          </div>
        </div>

        {/* 6. DAILY RESET BANNER */}
        <div className="w-full text-center py-6 mb-8 mt-auto px-6">
          <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400 text-sm font-semibold tracking-wide uppercase">
              Leaderboard resets midnight EST
            </span>
          </div>
        </div>

      </main>
    </div>
  );
}
