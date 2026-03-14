import React, { useState } from 'react';
import { Radio, Phone, Zap, Star, Play, Pause, Flame, Heart, Share2, MessageCircle, TrendingUp, Mic, Trophy, ChevronRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CATEGORIES = [
  { name: 'Inflation', count: 3241, icon: '💸', color: 'bg-red-900/40 border-red-700/50' },
  { name: 'Politics', count: 2890, icon: '🏛️', color: 'bg-blue-900/40 border-blue-700/50' },
  { name: 'War & Military', count: 1654, icon: '🎖️', color: 'bg-green-900/40 border-green-700/50' },
  { name: 'Work', count: 1422, icon: '💼', color: 'bg-orange-900/40 border-orange-700/50' },
  { name: 'Dating', count: 987, icon: '❤️', color: 'bg-pink-900/40 border-pink-700/50' },
  { name: 'Everyday Life', count: 876, icon: '🏠', color: 'bg-purple-900/40 border-purple-700/50' },
];

const RECENT_RANTS = [
  { id: 1, title: "Biden Can't Find His Way Out of the Oval Office", category: 'Politics', duration: '2:34', votes: '1,203', caller: 'PatriotPete', ago: '4m ago' },
  { id: 2, title: 'My Boss Made Me Work on My Day Off AGAIN', category: 'Work', duration: '1:47', votes: '876', caller: 'TiredInTampa', ago: '12m ago' },
  { id: 3, title: 'Dating Apps Are a Total Scam Now', category: 'Dating', duration: '3:12', votes: '654', caller: 'SingleInSeattle', ago: '19m ago' },
  { id: 4, title: 'Gas Up $0.40 Overnight — How Is This Allowed?', category: 'Inflation', duration: '2:01', votes: '541', caller: 'FuriousFrank', ago: '27m ago' },
  { id: 5, title: 'The Border Is WIDE Open and Nobody Cares', category: 'Politics', duration: '4:15', votes: '498', caller: 'RanchManTX', ago: '35m ago' },
  { id: 6, title: 'My Kid Got Suspended for Saying "Boys are Boys"', category: 'Everyday Life', duration: '2:58', votes: '412', caller: 'MadDadOhio', ago: '41m ago' },
];

const TICKER_ITEMS = [
  'PatriotPete from Texas just left a rant',
  'TiredInTampa just went viral with 1,200 votes',
  'LIVE: 847 rants received today',
  'RanchManTX just unlocked "Top Ranter" badge',
  'New category added: Border Security',
  'FuriousFrank just hit 500 votes',
  'WeeklyChallenge winner announced — MadDadOhio',
];

export default function MagaRantLineHome() {
  const [isPlayingFeatured, setIsPlayingFeatured] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans selection:bg-[#cc0000] selection:text-white">

      {/* NAV */}
      <nav className="bg-[#cc0000] sticky top-0 z-50 shadow-lg shadow-red-900/20 border-b border-red-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/__mockup/images/wordmark.png" alt="MAGA★RANTLINE" className="h-10 w-auto object-contain" style={{mixBlendMode:'multiply'}} />
          </div>
          <div className="hidden md:flex items-center gap-6 font-semibold text-sm tracking-wide">
            <a href="#" className="text-white border-b-2 border-white pb-0.5">HOME</a>
            <a href="#" className="hover:text-white/80 transition-colors">RANTS</a>
            <a href="#" className="hover:text-white/80 transition-colors">LEADERBOARD</a>
            <a href="#" className="hover:text-white/80 transition-colors">HOW IT WORKS</a>
          </div>
          <Button className="bg-white hover:bg-white/90 text-black font-bold rounded-full px-6 shadow-md">
            LEAVE A RANT
          </Button>
        </div>
      </nav>

      {/* TICKER TAPE */}
      <div className="bg-[#0d1120] border-b border-[#cc0000]/30 py-2 overflow-hidden">
        <div className="flex gap-12 animate-[ticker_30s_linear_infinite] whitespace-nowrap w-max">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative pt-20 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-900/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 40px,#cc000030 40px,#cc000030 41px)'}}></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-800 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold mb-8 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            LIVE HOTLINE OPEN · 1-800-RANT-NOW
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter uppercase leading-[0.85]">
            Got Something<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">To Say?</span>
          </h1>
          <p className="text-2xl font-medium text-gray-300 mb-4 max-w-2xl mx-auto">
            Leave your rant on the hotline. America is listening.
          </p>
          <p className="text-sm text-gray-500 mb-12 uppercase tracking-widest font-semibold">Unfiltered · Uncensored · Unafraid</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto bg-white hover:bg-white/90 text-black font-black text-lg h-14 px-10 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-all rounded-full">
              <Phone className="w-5 h-5 mr-2" /> Leave a Rant — $1.99
            </Button>
            <Button size="lg" className="w-full sm:w-auto bg-[#cc0000] hover:bg-red-700 text-white font-bold text-lg h-14 px-10 shadow-[0_0_25px_rgba(204,0,0,0.35)] rounded-full">
              <Zap className="w-5 h-5 mr-2 fill-white" /> Skip the Line — $5
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-white border-2 border-white/40 font-bold text-lg h-14 px-10 rounded-full">
              <Star className="w-5 h-5 mr-2" /> Featured Rant — $25
            </Button>
          </div>
          <p className="mt-6 text-gray-600 text-sm">847 rants recorded today · 89,234 listeners · No censorship</p>
        </div>
      </section>

      {/* FEATURED RANT PLAYER */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <Star className="w-5 h-5 text-white fill-white" />
            <h2 className="text-lg font-black uppercase tracking-widest text-white">Featured Rant</h2>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>
          <Card className="bg-[#0f1423] border-[#cc0000]/60 border-2 overflow-hidden shadow-[0_10px_40px_-10px_rgba(204,0,0,0.25)] relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#cc0000] via-red-400 to-[#cc0000]"></div>
            <CardHeader className="pb-4 border-b border-white/5">
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-[#cc0000] text-white hover:bg-red-700 border-none font-bold uppercase tracking-wider">Inflation</Badge>
                <div className="flex items-center text-white font-bold bg-white/10 px-3 py-1 rounded-full text-sm">
                  <Flame className="w-4 h-4 mr-1.5 fill-white" /> 2,847 votes
                </div>
              </div>
              <CardTitle className="text-3xl font-black text-white leading-tight">The Gas Prices Are Killing Me!</CardTitle>
              <p className="text-gray-400 font-medium mt-1 text-sm">By Anonymous from Texas · Today at 2:30 PM · Sponsored placement</p>
            </CardHeader>
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsPlayingFeatured(!isPlayingFeatured)}
                  className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform shadow-[0_0_25px_rgba(255,255,255,0.3)] flex-shrink-0"
                >
                  {isPlayingFeatured ? <Pause className="w-8 h-8 fill-black" /> : <Play className="w-8 h-8 fill-black ml-2" />}
                </button>
                <div className="flex-1 space-y-3">
                  <div className="h-12 flex items-center justify-between gap-0.5">
                    {[...Array(50)].map((_, i) => {
                      const heights = [20,40,60,80,55,70,35,90,45,65,30,75,50,85,40,95,60,25,70,45,80,35,90,55,40,70,30,85,50,65,75,40,55,90,35,80,60,45,70,30,95,50,65,40,85,55,70,35,80,45];
                      return (
                        <div key={i} className={`w-full rounded-full transition-all ${i < 18 ? 'bg-white' : 'bg-white/20'}`} style={{height:`${heights[i] || 40}%`}}></div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-xs font-bold text-gray-400">
                    <span className="text-white">0:45</span><span>3:12</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-black/20 border-t border-white/5 py-3 px-6 flex justify-between">
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10"><Heart className="w-4 h-4 mr-2" /> 2,847</Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10"><MessageCircle className="w-4 h-4 mr-2" /> 142</Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10"><Share2 className="w-4 h-4 mr-2" /> Share</Button>
              </div>
              <Badge variant="outline" className="border-white/20 text-gray-400 text-xs">Featured · 24h</Badge>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#cc0000] py-10 border-y-2 border-red-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y-2 md:divide-y-0 md:divide-x divide-red-800">
            {[
              { val: '12,459', label: 'Total Rants', icon: <Mic className="w-5 h-5" /> },
              { val: '89,234', label: 'Listeners', icon: <Users className="w-5 h-5" /> },
              { val: '847', label: 'Rants Today', icon: <TrendingUp className="w-5 h-5" /> },
              { val: '$24,912', label: 'Paid Out', icon: <Trophy className="w-5 h-5" /> },
            ].map((s) => (
              <div key={s.label} className="text-center pt-4 md:pt-0">
                <div className="flex items-center justify-center gap-2 text-white/70 mb-2">{s.icon}<span className="text-xs uppercase tracking-widest font-bold">{s.label}</span></div>
                <div className="text-5xl font-black text-white tracking-tight">{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 px-4 bg-[#070a14]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-1">Browse by Category</h2>
              <p className="text-gray-500 font-medium text-sm">Find the rants that matter to you</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <button key={cat.name} className={`${cat.color} border rounded-xl p-4 text-left hover:scale-105 transition-transform group`}>
                <div className="text-3xl mb-3">{cat.icon}</div>
                <div className="font-bold text-white text-sm mb-1">{cat.name}</div>
                <div className="text-gray-500 text-xs font-medium">{cat.count.toLocaleString()} rants</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT RANTS */}
      <section className="py-16 px-4 bg-[#0a0e1a]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-1">Latest Rants</h2>
              <p className="text-gray-500 font-medium text-sm">Fresh off the hotline — updated live</p>
            </div>
            <Button variant="link" className="text-white hidden sm:flex items-center gap-1 font-bold">View All <ChevronRight className="w-4 h-4" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RECENT_RANTS.map((rant) => (
              <Card key={rant.id} className="bg-[#0f1423] border-[#cc0000]/15 hover:border-[#cc0000]/60 transition-all duration-200 group cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className="text-gray-400 border-[#cc0000]/40 font-semibold text-xs">{rant.category}</Badge>
                    <span className="text-gray-600 text-xs">{rant.ago}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1 line-clamp-2 leading-snug group-hover:text-white/90">"{rant.title}"</h3>
                  <p className="text-xs text-gray-500 mb-4 font-medium">By {rant.caller}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="w-10 h-10 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors group-hover:border-white/30">
                        <Play className="w-4 h-4 ml-0.5 fill-current" />
                      </button>
                      <span className="text-xs font-bold text-gray-500">{rant.duration}</span>
                    </div>
                    <div className="flex items-center text-red-400 text-sm font-bold gap-1">
                      <Flame className="w-3.5 h-3.5 fill-red-400" />{rant.votes}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-full px-8 font-bold">
              Load More Rants
            </Button>
          </div>
        </div>
      </section>

      {/* WEEKLY CHALLENGE BANNER */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-r from-[#1a0505] via-[#200808] to-[#1a0505] border-2 border-[#cc0000]/60 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-[0_0_50px_rgba(204,0,0,0.15)]">
            <div className="absolute -right-10 -top-10 text-[160px] opacity-10 select-none">🏆</div>
            <div className="relative z-10">
              <Badge className="bg-[#cc0000] text-white font-bold uppercase tracking-widest mb-4">Weekly Challenge</Badge>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">Best Rant Wins $100</h2>
              <p className="text-gray-400 font-medium max-w-md">Leave the most-voted rant this week on any topic and take home cold hard cash. No filter. No rules. Just speak.</p>
              <div className="mt-4 flex items-center gap-4 text-sm">
                <span className="text-gray-500 font-medium flex items-center gap-1"><Flame className="w-4 h-4 text-red-500" /> 342 entries so far</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-500 font-medium">Resets Sunday midnight</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0 relative z-10">
              <Button className="bg-white text-black font-black px-8 h-12 hover:bg-white/90 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] text-base">
                Enter Challenge
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/5 rounded-full px-8 h-12 font-bold">
                See Current Entries
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-4 bg-[#070a14]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-black uppercase tracking-tight text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: '💳', title: 'Choose Your Plan', desc: 'Pick Standard, Skip the Line, or Featured. Pay securely with Stripe.' },
              { step: '02', icon: '📞', title: 'Get Your Code', desc: 'You receive a unique call code and the hotline number instantly.' },
              { step: '03', icon: '🎙️', title: 'Call & Record', desc: 'Dial 1-800-RANT-NOW, enter your code, and speak your mind for up to 5 minutes.' },
              { step: '04', icon: '🔥', title: 'Go Live & Vote', desc: 'Your rant is published to the feed. Listeners vote and share your voice.' },
            ].map((s) => (
              <div key={s.step} className="bg-[#0f1423] border border-[#cc0000]/20 rounded-xl p-6 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#cc0000] flex items-center justify-center text-xs font-black text-white">{s.step}</div>
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-black text-white text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 border-t border-[#cc0000]/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Radio className="w-7 h-7 text-red-600" />
                <span className="font-extrabold text-xl text-white">MagaRantLine</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-sm">The uncensored hotline for real Americans. Say what you mean. Be heard. Earn your place on the leaderboard.</p>
              <p className="text-red-500 font-black text-lg">1-800-RANT-NOW</p>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-4">Navigate</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                {['Home','Latest Rants','Leaderboard','Leave a Rant','How It Works'].map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                {['Terms of Service','Privacy Policy','Refund Policy','Content Guidelines','Contact Us'].map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} MagaRantLine. All rights reserved. Rates may apply. Not affiliated with any political party.</p>
            <div className="flex gap-3">
              {['Twitter','Facebook','Rumble','Truth Social'].map(s => (
                <a key={s} href="#" className="hover:text-gray-400 transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
