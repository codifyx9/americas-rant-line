import React from "react";
import { 
  Mic, 
  Play, 
  Menu, 
  Clock,
  ThumbsUp,
  Volume2,
  Share2
} from "lucide-react";
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
    duration: "2:45",
  },
  {
    rank: 2,
    title: "The Government Doesn't Hear Us Anymore",
    category: "Politics",
    caller: "Mike in Ohio",
    votes: "1,923",
    duration: "1:30",
  },
  {
    rank: 3,
    title: "My Son Came Home from Overseas Changed",
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
    <div className="min-h-screen bg-black font-sans text-white">
      {/* 1. RED NAVIGATION BAR */}
      <nav className="bg-[#D61F1F] sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="h-6 w-6 text-white" />
            <span className="font-['Bebas_Neue'] text-2xl tracking-wider text-white mt-1">MAGARANTLINE</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white hover:text-white/80 font-bold uppercase text-sm tracking-wider">Home</a>
            <a href="#" className="text-white hover:text-white/80 font-bold uppercase text-sm tracking-wider">Rant Wall</a>
            <a href="#" className="text-white border-b-2 border-white pb-1 font-bold uppercase text-sm tracking-wider">Leaderboard</a>
            <Button className="bg-[#F59E0B] text-black hover:bg-[#F59E0B]/90 font-bold uppercase tracking-wide">Leave a Rant</Button>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex flex-col">
        {/* 2. PAGE HEADER */}
        <div className="bg-gradient-to-br from-[#0B1E3A] to-black pt-12 pb-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="font-['Bebas_Neue'] text-white text-5xl md:text-7xl text-center tracking-wide mb-2 drop-shadow-lg">
              TOP RANTS TODAY
            </h1>
            <p className="text-[#F59E0B] text-center text-sm font-medium tracking-wide flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse"></div>
              Last updated 2 minutes ago
            </p>
          </div>
        </div>

        {/* 3. TOP 3 PODIUM */}
        <div className="container mx-auto px-4 max-w-6xl -mt-16 mb-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-6">
            
            {/* 🥈 2nd Place */}
            <div className="w-full md:w-1/3 order-2 md:order-1 transform md:-translate-y-8">
              <Card className="bg-[#0B1E3A] border border-gray-400 shadow-md shadow-gray-400/20 relative overflow-visible">
                <div className="absolute -top-6 -left-4 w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-3xl shadow-lg border-2 border-gray-400 z-10 font-bold text-white">
                  🥈
                </div>
                <CardHeader className="pt-10 pb-2">
                  <div className="mb-2">
                    <Badge className="bg-gray-600 text-white hover:bg-gray-500 border-none font-bold uppercase text-xs">
                      {PODIUM_DATA[1].category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold leading-tight text-white line-clamp-2">"{PODIUM_DATA[1].title}"</h3>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm text-gray-400 italic mb-4">— {PODIUM_DATA[1].caller}</p>
                  <div className="flex items-center gap-2 text-gray-300 font-bold mb-4">
                    <ThumbsUp className="h-4 w-4" />
                    {PODIUM_DATA[1].votes} VOTES
                  </div>
                  
                  {/* Compact Player */}
                  <div className="bg-black/50 rounded p-2 flex items-center gap-3 border border-gray-700">
                    <Button size="icon" className="h-8 w-8 rounded-full bg-gray-600 hover:bg-gray-500 text-white shrink-0">
                      <Play className="h-4 w-4 ml-0.5" />
                    </Button>
                    <div className="flex-1">
                      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-400 w-1/3 rounded-full"></div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{PODIUM_DATA[1].duration}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 🥇 1st Place */}
            <div className="w-full md:w-[40%] order-1 md:order-2 z-10">
              <Card className="bg-[#0B1E3A] border-2 border-[#F59E0B] shadow-lg shadow-yellow-500/20 relative overflow-visible">
                <div className="absolute -top-8 -left-6 w-20 h-20 rounded-full bg-[#F59E0B] flex items-center justify-center text-5xl shadow-[0_0_20px_rgba(245,158,11,0.5)] border-4 border-[#0B1E3A] z-10 font-black">
                  🥇
                </div>
                <CardHeader className="pt-12 pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className="bg-[#D61F1F] text-white hover:bg-red-700 border-none font-bold uppercase px-3 py-1 text-sm tracking-wider">
                      {PODIUM_DATA[0].category}
                    </Badge>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white -mt-2 -mr-2">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-white uppercase tracking-tight">"{PODIUM_DATA[0].title}"</h2>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-base text-gray-400 italic mb-6 border-l-2 border-[#F59E0B] pl-3">— {PODIUM_DATA[0].caller}</p>
                  <div className="mb-6">
                    <div className="font-['Bebas_Neue'] text-[#F59E0B] text-4xl tracking-wide flex items-center gap-2">
                      {PODIUM_DATA[0].votes} VOTES
                    </div>
                  </div>
                  
                  {/* Full Player */}
                  <div className="bg-black/50 rounded-lg p-4 flex flex-col gap-3 border border-[#F59E0B]/30">
                    <div className="flex items-center gap-4">
                      <Button size="icon" className="h-12 w-12 rounded-full bg-[#D61F1F] hover:bg-red-700 text-white shrink-0 shadow-lg">
                        <Play className="h-5 w-5 ml-1" />
                      </Button>
                      <div className="flex-1 space-y-2">
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden relative cursor-pointer">
                          <div className="h-full bg-[#F59E0B] w-0 relative rounded-full"></div>
                        </div>
                        <div className="flex justify-between text-xs font-mono text-gray-400">
                          <span>0:00</span>
                          <span>{PODIUM_DATA[0].duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 🥉 3rd Place */}
            <div className="w-full md:w-1/3 order-3 transform md:-translate-y-12">
              <Card className="bg-[#0B1E3A] border border-amber-700 shadow-md shadow-amber-700/20 relative overflow-visible">
                <div className="absolute -top-6 -left-4 w-14 h-14 rounded-full bg-[#8b4513] flex items-center justify-center text-3xl shadow-lg border-2 border-amber-700 z-10 font-bold text-white">
                  🥉
                </div>
                <CardHeader className="pt-10 pb-2">
                  <div className="mb-2">
                    <Badge className="bg-amber-900 text-amber-100 hover:bg-amber-800 border-none font-bold uppercase text-xs">
                      {PODIUM_DATA[2].category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold leading-tight text-white line-clamp-2">"{PODIUM_DATA[2].title}"</h3>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm text-gray-400 italic mb-4">— {PODIUM_DATA[2].caller}</p>
                  <div className="flex items-center gap-2 text-amber-700 font-bold mb-4">
                    <ThumbsUp className="h-4 w-4" />
                    {PODIUM_DATA[2].votes} VOTES
                  </div>
                  
                  {/* Compact Player */}
                  <div className="bg-black/50 rounded p-2 flex items-center gap-3 border border-amber-900/50">
                    <Button size="icon" className="h-8 w-8 rounded-full bg-amber-700 hover:bg-amber-600 text-white shrink-0">
                      <Play className="h-4 w-4 ml-0.5" />
                    </Button>
                    <div className="flex-1">
                      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-600 w-1/4 rounded-full"></div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{PODIUM_DATA[2].duration}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* 4. LEADERBOARD TABLE */}
        <div className="container mx-auto px-4 max-w-5xl mb-16">
          <div className="bg-[#0B1E3A] rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-black/40 hover:bg-black/40 border-b border-gray-800">
                  <TableRow className="border-gray-800 hover:bg-transparent">
                    <TableHead className="w-16 text-center text-gray-400 font-bold uppercase tracking-wider">Rank</TableHead>
                    <TableHead className="w-16 text-center text-gray-400 font-bold uppercase tracking-wider">Play</TableHead>
                    <TableHead className="text-gray-400 font-bold uppercase tracking-wider">Title</TableHead>
                    <TableHead className="hidden md:table-cell text-gray-400 font-bold uppercase tracking-wider">Category</TableHead>
                    <TableHead className="text-right text-gray-400 font-bold uppercase tracking-wider">Votes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {LEADERBOARD_DATA.map((item, index) => (
                    <TableRow 
                      key={item.rank} 
                      className={`border-gray-800 transition-colors hover:bg-white/5 ${index % 2 === 0 ? 'bg-[#0B1E3A]' : 'bg-black/30'}`}
                    >
                      <TableCell className="text-center font-bold text-gray-400 text-lg">
                        {item.rank}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-[#D61F1F] hover:text-white text-gray-400">
                          <Play className="h-4 w-4 ml-0.5" />
                        </Button>
                      </TableCell>
                      <TableCell className="font-semibold text-white max-w-[200px] md:max-w-md truncate">
                        "{item.title}"
                        <div className="md:hidden text-xs text-gray-400 mt-1">{item.category}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="border-gray-700 text-gray-300 bg-black/40 font-medium">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold text-[#F59E0B]">
                        {item.votes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 bg-black/40 border-t border-gray-800 text-center">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800">
                Load More
              </Button>
            </div>
          </div>
        </div>

        {/* 5. DAILY RESET BANNER */}
        <div className="w-full bg-[#D61F1F]/10 border-t border-[#D61F1F]/30 text-center py-4 mt-auto">
          <p className="text-white text-sm flex items-center justify-center gap-2 font-medium tracking-wide">
            <Clock className="h-4 w-4 text-[#F59E0B]" />
            Leaderboard resets at midnight EST
          </p>
        </div>

      </main>
    </div>
  );
}
