import React, { useState } from 'react';
import { Radio, Phone, Zap, Star, Play, Pause, Flame, Heart, Share2, MessageCircle, MoreVertical, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

export default function MagaRantLineHome() {
  const [isPlayingFeatured, setIsPlayingFeatured] = useState(false);

  const togglePlayFeatured = () => setIsPlayingFeatured(!isPlayingFeatured);

  const recentRants = [
    {
      id: 1,
      title: "Biden Can't Find His Way Out of the Oval Office",
      category: "Politics",
      duration: "2:34",
      votes: "1,203",
      caller: "PatriotPete",
    },
    {
      id: 2,
      title: "My Boss Made Me Work on My Day Off AGAIN",
      category: "Work Frustrations",
      duration: "1:47",
      votes: "876",
      caller: "TiredInTampa",
    },
    {
      id: 3,
      title: "Dating Apps Are a Total Scam",
      category: "Dating Stories",
      duration: "3:12",
      votes: "654",
      caller: "SingleInSeattle",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans selection:bg-[#cc0000] selection:text-white">
      {/* 1. RED NAVIGATION BAR */}
      <nav className="bg-[#cc0000] sticky top-0 z-50 shadow-lg shadow-red-900/20 border-b border-red-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-white" />
            <span className="font-extrabold text-xl tracking-tight">MagaRantLine</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 font-semibold text-sm tracking-wide">
            <a href="#" className="hover:text-[#FFFFFF] transition-colors">HOME</a>
            <a href="#" className="hover:text-[#FFFFFF] transition-colors">RANTS</a>
            <a href="#" className="hover:text-[#FFFFFF] transition-colors">LEADERBOARD</a>
          </div>

          <div className="flex items-center">
            <Button className="bg-[#FFFFFF] hover:bg-white text-black font-bold rounded-full px-6">
              LEAVE A RANT
            </Button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-20 pb-16 px-4 text-center overflow-hidden">
        {/* Abstract background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Live Banner */}
          <div className="inline-flex items-center gap-2 bg-red-950/50 border border-red-900 text-red-400 px-4 py-1.5 rounded-full text-sm font-bold mb-8 uppercase tracking-widest">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            Live Hotline: 1-800-RANT-NOW
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-[0.9]">
            Got Something <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">To Say?</span>
          </h1>
          
          <p className="text-2xl md:text-3xl font-medium text-[#FFFFFF] mb-12 drop-shadow-sm">
            Leave your rant. The world is listening.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto bg-[#FFFFFF] hover:bg-white text-black font-black text-lg h-14 px-8 border-2 border-[#FFFFFF] shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all">
              <Phone className="w-5 h-5 mr-2" />
              Leave a Rant — $1.99
            </Button>
            
            <Button size="lg" className="w-full sm:w-auto bg-[#cc0000] hover:bg-red-700 text-white font-bold text-lg h-14 px-8 border-2 border-[#cc0000] shadow-[0_0_20px_rgba(204,0,0,0.3)]">
              <Zap className="w-5 h-5 mr-2 fill-white" />
              Skip the Line — $5
            </Button>
            
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent hover:bg-[#FFFFFF]/10 text-[#FFFFFF] border-2 border-[#FFFFFF] font-bold text-lg h-14 px-8">
              <Star className="w-5 h-5 mr-2" />
              Featured Rant — $25
            </Button>
          </div>
        </div>
      </section>

      {/* 3. FEATURED RANT AUDIO PLAYER */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="bg-[#0f1423] border-[#FFFFFF]/30 border-2 overflow-hidden shadow-[0_10px_40px_-10px_rgba(255,215,0,0.15)] relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFFFFF]/5 rounded-bl-full pointer-events-none"></div>
            
            <CardHeader className="pb-4 border-b border-white/5">
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-[#cc0000] text-white hover:bg-red-700 border-none font-bold uppercase tracking-wider">
                  Inflation
                </Badge>
                <div className="flex items-center text-[#FFFFFF] font-bold bg-[#FFFFFF]/10 px-3 py-1 rounded-full">
                  <Flame className="w-4 h-4 mr-1.5 fill-[#FFFFFF]" />
                  2,847 votes
                </div>
              </div>
              <CardTitle className="text-3xl font-black text-white leading-tight">
                FEATURED RANT: The Gas Prices Are Killing Me!
              </CardTitle>
              <p className="text-gray-400 font-medium mt-1 text-sm">
                By Anonymous from Texas • Today at 2:30 PM
              </p>
            </CardHeader>
            
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center gap-6">
                <button 
                  onClick={togglePlayFeatured}
                  className="w-20 h-20 rounded-full bg-[#FFFFFF] flex items-center justify-center text-black hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,215,0,0.4)] flex-shrink-0"
                >
                  {isPlayingFeatured ? (
                    <Pause className="w-8 h-8 fill-black" />
                  ) : (
                    <Play className="w-8 h-8 fill-black ml-2" />
                  )}
                </button>
                
                <div className="flex-1 space-y-3">
                  {/* Waveform visual mockup */}
                  <div className="h-12 flex items-center justify-between gap-1">
                    {[...Array(40)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-full rounded-full transition-all duration-300 ${i < 15 ? 'bg-[#FFFFFF]' : 'bg-white/20'}`}
                        style={{ height: `${Math.max(10, Math.random() * 100)}%` }}
                      ></div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between text-xs font-bold text-gray-400">
                    <span className="text-[#FFFFFF]">0:45</span>
                    <span>3:12</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-black/20 border-t border-white/5 py-3 px-6 flex justify-between">
              <div className="flex gap-4">
                 <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                   <Heart className="w-4 h-4 mr-2" /> Like
                 </Button>
                 <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                   <MessageCircle className="w-4 h-4 mr-2" /> 142
                 </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-[#FFFFFF] hover:text-white hover:bg-[#FFFFFF]/10 font-bold">
                <Zap className="w-4 h-4 mr-2" /> Tip $1
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* 4. STATS BAR */}
      <section className="bg-[#cc0000] py-8 border-y-2 border-red-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-red-800">
            <div className="text-center pt-4 md:pt-0">
              <div className="text-4xl md:text-5xl font-black text-[#FFFFFF] tracking-tight mb-1">12,459</div>
              <div className="text-white/90 font-bold tracking-widest uppercase text-sm">Total Rants</div>
            </div>
            <div className="text-center pt-8 md:pt-0">
              <div className="text-4xl md:text-5xl font-black text-[#FFFFFF] tracking-tight mb-1">89,234</div>
              <div className="text-white/90 font-bold tracking-widest uppercase text-sm">Listeners</div>
            </div>
            <div className="text-center pt-8 md:pt-0">
              <div className="text-4xl md:text-5xl font-black text-[#FFFFFF] tracking-tight mb-1">847</div>
              <div className="text-white/90 font-bold tracking-widest uppercase text-sm">Rants Today</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RECENT RANTS PREVIEW */}
      <section className="py-20 px-4 bg-[#070a14]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-2">Recent Rants</h2>
              <p className="text-gray-400 font-medium">The latest raw opinions from around the country.</p>
            </div>
            <Button variant="link" className="text-[#FFFFFF] hidden sm:flex items-center">
              View All <span className="ml-1">→</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentRants.map((rant) => (
              <Card key={rant.id} className="bg-[#0f1423] border-white/10 hover:border-[#FFFFFF]/50 transition-colors group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="text-gray-300 border-gray-600 font-semibold">
                      {rant.category}
                    </Badge>
                    <button className="text-gray-500 hover:text-white">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-[#FFFFFF] transition-colors">
                    "{rant.title}"
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-6 font-medium">
                    By {rant.caller}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FFFFFF] hover:text-black transition-colors">
                        <Play className="w-5 h-5 ml-1 fill-current" />
                      </button>
                      <span className="text-sm font-bold text-gray-400">{rant.duration}</span>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center text-red-400 text-sm font-bold">
                        <Flame className="w-3.5 h-3.5 mr-1 fill-red-400" />
                        {rant.votes}
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-[#FFFFFF] hover:bg-[#FFFFFF]/10 px-2">
                        Tip
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-8 border-white/20 text-white hover:bg-white/5 sm:hidden">
            View All Rants
          </Button>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Radio className="w-8 h-8 text-red-600" />
            <span className="font-extrabold text-2xl tracking-tight text-white">MagaRantLine</span>
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-gray-500 font-medium mb-1">The world is listening. Are you speaking?</p>
            <p className="text-red-500 font-bold text-lg">Call 1-800-RANT-NOW</p>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
        <div className="container mx-auto px-4 max-w-6xl mt-8 pt-8 border-t border-white/5 text-center md:text-left text-sm text-gray-600">
          <p>© {new Date().getFullYear()} MagaRantLine. All rights reserved. Rates may apply.</p>
        </div>
      </footer>
    </div>
  );
}
