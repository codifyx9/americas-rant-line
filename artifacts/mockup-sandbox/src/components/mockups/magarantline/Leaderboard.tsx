import React from "react";
import { 
  Radio, 
  Menu, 
  Play, 
  Share2, 
  Flame, 
  Clock, 
  Trophy,
  Volume2,
  ThumbsUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
    duration: "2:45",
  },
  {
    rank: 2,
    title: "The Government Doesn't Care About Us Anymore",
    category: "Politics",
    caller: "Mike in Ohio",
    votes: "1,923",
    duration: "1:30",
  },
  {
    rank: 3,
    title: "My Son Came Home from Overseas — CHANGED FOREVER",
    category: "War Concerns",
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
    <div className="min-h-screen font-sans text-white bg-[#0a0e1a]">
      {/* 1. RED NAVIGATION BAR */}
      <nav className="bg-[#cc0000] border-b border-red-900 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="h-6 w-6 text-white" />
            <span className="font-bold text-xl tracking-tight uppercase">MagaRantLine</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" className="text-white hover:bg-red-800 hover:text-white font-medium">Home</Button>
            <Button variant="ghost" className="text-white hover:bg-red-800 hover:text-white font-medium">Rants</Button>
            <Button variant="ghost" className="bg-red-900 text-[#FFD700] hover:bg-red-950 hover:text-[#FFD700] font-bold shadow-inner">Leaderboard</Button>
            <Button variant="outline" className="ml-4 border-white text-black hover:bg-gray-100 font-bold uppercase tracking-wide border-2">Leave a Rant</Button>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 2. PAGE HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-4 flex items-center justify-center gap-3">
            <Trophy className="h-10 w-10 md:h-14 md:w-14 text-[#FFD700]" />
            Top Rants Today
            <Trophy className="h-10 w-10 md:h-14 md:w-14 text-[#FFD700]" />
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-medium mb-3">
            The most voted rants from the hotline — updated live
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a2235] text-[#FFD700] text-sm border border-[#FFD700]/30 font-medium tracking-wide">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Last updated: 2 minutes ago
          </div>
        </div>

        {/* 3. TOP 3 PODIUM */}
        <div className="flex flex-col lg:flex-row items-end justify-center gap-6 mb-16 relative pt-10">
          
          {/* 🥈 2nd Place */}
          <div className="w-full lg:w-1/3 order-2 lg:order-1 transform lg:-translate-y-8">
            <Card className="bg-[#111827] border-[3px] border-slate-300 shadow-[0_0_20px_rgba(203,213,225,0.15)] relative overflow-visible">
              <div className="absolute -top-6 -left-4 w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-3xl shadow-lg border-[3px] border-slate-400 z-10 font-bold text-slate-800">
                🥈
              </div>
              <CardHeader className="pt-8 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-slate-700 text-slate-200 hover:bg-slate-600 border-none font-bold uppercase text-xs tracking-wider">
                    {PODIUM_DATA[1].category}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold leading-tight text-white line-clamp-2">"{PODIUM_DATA[1].title}"</h3>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-slate-400 italic mb-4">— {PODIUM_DATA[1].caller}</p>
                <div className="flex items-center gap-2 text-slate-300 font-bold text-lg mb-4">
                  <ThumbsUp className="h-5 w-5 text-slate-300" />
                  {PODIUM_DATA[1].votes} VOTES
                </div>
                
                {/* Compact Player */}
                <div className="bg-[#0a0e1a] rounded-lg p-3 flex items-center gap-3 border border-slate-800">
                  <Button size="icon" className="h-8 w-8 rounded-full bg-slate-300 hover:bg-slate-200 text-slate-900 shrink-0">
                    <Play className="h-4 w-4 ml-0.5" />
                  </Button>
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400 w-1/3 rounded-full"></div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{PODIUM_DATA[1].duration}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 🥇 1st Place */}
          <div className="w-full lg:w-[40%] order-1 lg:order-2 z-10">
            <Card className="bg-[#1a0f0f] border-4 border-[#FFD700] shadow-[0_0_40px_rgba(255,215,0,0.3)] relative overflow-visible transform hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -top-8 -left-6 w-20 h-20 rounded-full bg-[#FFD700] flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(255,215,0,0.5)] border-4 border-[#fff] z-10 font-black text-amber-900">
                🥇
              </div>
              <CardHeader className="pt-10 pb-4">
                <div className="flex justify-between items-start mb-3">
                  <Badge className="bg-[#cc0000] text-white hover:bg-red-700 border-none font-bold uppercase px-3 py-1 text-sm tracking-wider shadow-[0_0_10px_rgba(204,0,0,0.5)]">
                    {PODIUM_DATA[0].category}
                  </Badge>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white -mt-2 -mr-2">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-white uppercase tracking-tight">"{PODIUM_DATA[0].title}"</h2>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-base text-gray-400 italic mb-6 border-l-2 border-[#FFD700] pl-3">— {PODIUM_DATA[0].caller}</p>
                <div className="flex items-center justify-center py-4 bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent border-y border-[#FFD700]/20 mb-6">
                  <div className="flex items-center gap-2 text-[#FFD700] font-black text-3xl tracking-tight text-shadow-sm">
                    <Flame className="h-8 w-8 text-[#FFD700] animate-pulse" fill="#FFD700" />
                    {PODIUM_DATA[0].votes} VOTES
                  </div>
                </div>
                
                {/* Full Player */}
                <div className="bg-[#0a0e1a] rounded-xl p-4 flex flex-col gap-3 border border-red-900/50 shadow-inner">
                  <div className="flex items-center gap-4">
                    <Button size="icon" className="h-14 w-14 rounded-full bg-[#cc0000] hover:bg-red-600 text-white shrink-0 shadow-[0_0_15px_rgba(204,0,0,0.4)] transition-all hover:scale-105">
                      <Play className="h-6 w-6 ml-1" />
                    </Button>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between text-xs font-mono text-gray-400">
                        <span>0:00</span>
                        <span>{PODIUM_DATA[0].duration}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden relative group cursor-pointer">
                        <div className="h-full bg-[#FFD700] w-0 relative rounded-full shadow-[0_0_10px_rgba(255,215,0,0.8)]">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 text-gray-500">
                    <Volume2 className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 🥉 3rd Place */}
          <div className="w-full lg:w-1/3 order-3 transform lg:-translate-y-12">
            <Card className="bg-[#111827] border-[3px] border-amber-700 shadow-[0_0_20px_rgba(180,83,9,0.15)] relative overflow-visible">
              <div className="absolute -top-6 -left-4 w-14 h-14 rounded-full bg-amber-600 flex items-center justify-center text-2xl shadow-lg border-[3px] border-amber-800 z-10 font-bold text-amber-100">
                🥉
              </div>
              <CardHeader className="pt-8 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-amber-900/50 text-amber-500 hover:bg-amber-900 border-none font-bold uppercase text-xs tracking-wider">
                    {PODIUM_DATA[2].category}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold leading-tight text-white line-clamp-2">"{PODIUM_DATA[2].title}"</h3>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-slate-400 italic mb-4">— {PODIUM_DATA[2].caller}</p>
                <div className="flex items-center gap-2 text-amber-500 font-bold text-lg mb-4">
                  <ThumbsUp className="h-5 w-5" />
                  {PODIUM_DATA[2].votes} VOTES
                </div>
                
                {/* Compact Player */}
                <div className="bg-[#0a0e1a] rounded-lg p-3 flex items-center gap-3 border border-amber-900/30">
                  <Button size="icon" className="h-8 w-8 rounded-full bg-amber-700 hover:bg-amber-600 text-white shrink-0">
                    <Play className="h-4 w-4 ml-0.5" />
                  </Button>
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-1/4 rounded-full"></div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{PODIUM_DATA[2].duration}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 4. LEADERBOARD TABLE */}
        <div className="bg-[#111827] rounded-xl border border-gray-800 shadow-xl overflow-hidden mb-16">
          <div className="p-6 border-b border-gray-800 bg-[#162032] flex justify-between items-center">
            <h3 className="text-xl font-bold uppercase tracking-wide">The Rest of the Best</h3>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#0a0e1a] hover:bg-[#0a0e1a]">
                <TableRow className="border-gray-800 hover:bg-transparent">
                  <TableHead className="w-16 text-center text-gray-400 font-bold uppercase">Rank</TableHead>
                  <TableHead className="text-gray-400 font-bold uppercase">Rant Title</TableHead>
                  <TableHead className="hidden md:table-cell text-gray-400 font-bold uppercase">Category</TableHead>
                  <TableHead className="hidden lg:table-cell text-gray-400 font-bold uppercase">Caller</TableHead>
                  <TableHead className="text-right text-gray-400 font-bold uppercase">Votes</TableHead>
                  <TableHead className="w-20 text-center text-gray-400 font-bold uppercase">Play</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LEADERBOARD_DATA.map((item, index) => (
                  <TableRow 
                    key={item.rank} 
                    className={`border-gray-800 transition-colors hover:bg-gray-800/50 ${index % 2 === 0 ? 'bg-[#151e2e]' : 'bg-[#111827]'}`}
                  >
                    <TableCell className="text-center font-mono font-bold text-gray-400 text-lg">
                      #{item.rank}
                    </TableCell>
                    <TableCell className="font-semibold text-white max-w-[200px] md:max-w-md truncate">
                      "{item.title}"
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="border-gray-700 text-gray-300 bg-gray-800/50 font-medium">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-gray-400 italic text-sm">
                      {item.caller}
                    </TableCell>
                    <TableCell className="text-right font-bold text-[#FFD700]">
                      {item.votes}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-[#cc0000] hover:text-white text-gray-400">
                        <Play className="h-4 w-4 ml-0.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 bg-[#0a0e1a] border-t border-gray-800 text-center">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800">
              Load More Rants
            </Button>
          </div>
        </div>

        {/* 5. DAILY RESET BANNER */}
        <div className="bg-[#1a1100] border border-[#FFD700]/30 rounded-lg p-4 flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
          <Clock className="h-5 w-5 text-[#FFD700]" />
          <span className="text-[#FFD700] font-bold tracking-wide uppercase text-sm md:text-base">
            Leaderboard resets at midnight EST
          </span>
        </div>

      </main>
    </div>
  );
}
