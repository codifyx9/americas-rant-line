import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Phone, Zap, Star, Play, Pause, Flame, Share2,
  TrendingUp, Mic, Trophy, ChevronRight, Users, ArrowUpRight, ThumbsDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

const CATEGORIES_ICONS: Record<string, string> = {
  Inflation: "\uD83D\uDCB8", Politics: "\uD83C\uDFDB\uFE0F", "War & Military": "\uD83C\uDF96\uFE0F",
  Work: "\uD83D\uDCBC", Dating: "\u2764\uFE0F", "Everyday Life": "\uD83C\uDFE0",
  Economy: "\uD83D\uDCCA", Education: "\uD83D\uDCDA", Border: "\uD83C\uDDFA\uD83C\uDDF8", Healthcare: "\uD83C\uDFE5",
};
const CAT_COLORS: Record<string, string> = {
  Inflation: "bg-red-900/40 border-red-700/50", Politics: "bg-blue-900/40 border-blue-700/50",
  "War & Military": "bg-green-900/40 border-green-700/50", Work: "bg-orange-900/40 border-orange-700/50",
  Dating: "bg-pink-900/40 border-pink-700/50", "Everyday Life": "bg-purple-900/40 border-purple-700/50",
  Economy: "bg-yellow-900/40 border-yellow-700/50", Education: "bg-teal-900/40 border-teal-700/50",
};

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function Home() {
  const [isPlayingFeatured, setIsPlayingFeatured] = useState(false);
  const [isPlayingTrending, setIsPlayingTrending] = useState(false);
  const [playingLeaderboardId, setPlayingLeaderboardId] = useState<string | null>(null);
  const featuredAudioRef = useRef<HTMLAudioElement | null>(null);
  const trendingAudioRef = useRef<HTMLAudioElement | null>(null);
  const leaderboardAudioRef = useRef<HTMLAudioElement | null>(null);
  const queryClient = useQueryClient();

  const { data: callStats } = useQuery({ queryKey: ["callsToday"], queryFn: api.stats.callsToday });
  const { data: globalStats } = useQuery({ queryKey: ["globalStats"], queryFn: api.stats.global });
  const { data: featured } = useQuery({ queryKey: ["featured"], queryFn: api.rants.featured });
  const { data: trending } = useQuery({ queryKey: ["trending"], queryFn: api.rants.trending });
  const { data: leaderboard } = useQuery({ queryKey: ["leaderboard", "today"], queryFn: () => api.rants.leaderboard("today", 3) });
  const { data: topics } = useQuery({ queryKey: ["topics"], queryFn: api.stats.topics });

  const voteMut = useMutation({
    mutationFn: (id: string) => api.rants.vote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["featured"] }),
  });

  const redCalls = callStats?.maga_calls ?? 0;
  const blueCalls = callStats?.blue_calls ?? 0;
  const neutralCalls = callStats?.neutral_calls ?? 0;
  const totalCalls = redCalls + blueCalls + neutralCalls || 1;
  const redPct = Math.round((redCalls / totalCalls) * 100);
  const bluePct = Math.round((blueCalls / totalCalls) * 100);
  const openPct = 100 - redPct - bluePct;
  const medals = ["\uD83E\uDD47", "\uD83E\uDD48", "\uD83E\uDD49"];
  const trendingRant = trending?.[0];
  const topCategories = (topics ?? []).slice(0, 6);

  const toggleFeatured = () => {
    if (!featured) return;
    if (!featuredAudioRef.current) {
      featuredAudioRef.current = new Audio(featured.audioUrl);
      featuredAudioRef.current.onended = () => setIsPlayingFeatured(false);
    }
    if (isPlayingFeatured) {
      featuredAudioRef.current.pause();
    } else {
      featuredAudioRef.current.play().catch(console.error);
      if (isPlayingTrending && trendingAudioRef.current) {
        trendingAudioRef.current.pause();
        setIsPlayingTrending(false);
      }
    }
    setIsPlayingFeatured(!isPlayingFeatured);
  };

  const toggleTrending = () => {
    if (!trendingRant) return;
    if (!trendingAudioRef.current) {
      trendingAudioRef.current = new Audio(trendingRant.audioUrl);
      trendingAudioRef.current.onended = () => setIsPlayingTrending(false);
    }
    if (isPlayingTrending) {
      trendingAudioRef.current.pause();
    } else {
      trendingAudioRef.current.play().catch(console.error);
      if (isPlayingFeatured && featuredAudioRef.current) {
        featuredAudioRef.current.pause();
        setIsPlayingFeatured(false);
      }
    }
    setIsPlayingTrending(!isPlayingTrending);
  };

  const toggleLeaderboard = (rant: any) => {
    if (playingLeaderboardId === rant.id) {
      leaderboardAudioRef.current?.pause();
      setPlayingLeaderboardId(null);
    } else {
      leaderboardAudioRef.current?.pause();
      leaderboardAudioRef.current = new Audio(rant.audioUrl);
      leaderboardAudioRef.current.onended = () => setPlayingLeaderboardId(null);
      leaderboardAudioRef.current.play().catch(console.error);
      setPlayingLeaderboardId(rant.id);
      
      // Stop others
      featuredAudioRef.current?.pause();
      setIsPlayingFeatured(false);
      trendingAudioRef.current?.pause();
      setIsPlayingTrending(false);
    }
  };

  useEffect(() => {
    return () => {
      featuredAudioRef.current?.pause();
      trendingAudioRef.current?.pause();
      leaderboardAudioRef.current?.pause();
    };
  }, []);

  return (
    <div className="bg-[#0a0e1a] text-white font-sans selection:bg-[#cc0000] selection:text-white">
      <div className="bg-[#07090f] border-b border-[#cc0000]/20 py-2.5 overflow-hidden">
        <div className="flex gap-16 ticker-scroll whitespace-nowrap w-max">
          {(trending ?? []).concat(trending ?? []).map((r, i) => (
            <span key={i} className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] inline-block shrink-0"></span>
              {"\uD83D\uDD25"} RANT #{r.rantNumber} &mdash; &ldquo;{r.title || r.topic || "Untitled"}&rdquo;
            </span>
          ))}
        </div>
      </div>

      <section className="relative pt-16 pb-14 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="w-1/2 bg-gradient-to-br from-red-950/25 to-transparent"></div>
          <div className="w-1/2 bg-gradient-to-bl from-blue-950/25 to-transparent"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/[0.08] rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2.5 bg-black border border-white/15 px-5 py-2 rounded-full">
              <Phone className="w-4 h-4 text-[#cc0000]" />
              <span className="font-black text-white text-base tracking-widest">1-888-460-RANT</span>
              <span className="text-gray-600 text-xs">&middot;</span>
              <span className="text-gray-500 text-xs font-medium">Lines open 24/7</span>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-red-950/50 border border-red-800/60 text-red-400 px-4 py-1.5 rounded-full text-[11px] font-bold mb-6 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            LIVE NOW &middot; {totalCalls.toLocaleString()} Calls Today
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-4 tracking-tighter uppercase leading-[0.85]">
            America<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-gray-200 to-blue-500">Is Arguing.</span>
          </h1>
          <p className="text-xl font-medium text-gray-400 mb-2 max-w-xl mx-auto">Pick a line. Leave your rant. Let America vote.</p>
          <p className="text-xs text-gray-600 mb-10 uppercase tracking-widest font-semibold">Unfiltered &middot; Uncensored &middot; Unafraid</p>

          <p className="text-[11px] text-gray-500 uppercase tracking-[0.2em] font-bold mb-4">&mdash; Choose a Line &mdash;</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-5">
            <div className="flex flex-col items-center gap-1">
              <Link href="/leave-a-rant"><Button size="lg" className="w-full bg-[#cc0000] hover:bg-red-700 text-white font-black text-base h-13 px-8 shadow-[0_0_25px_rgba(204,0,0,0.35)] rounded-full">{"\uD83D\uDD34"} MAGA Line &mdash; $2.99</Button></Link>
              <span className="text-[11px] text-red-400 font-black uppercase tracking-wide mt-1">Right / Conservative / Republican</span>
            </div>
            <div className="text-gray-700 font-black text-xl hidden sm:block">VS</div>
            <div className="flex flex-col items-center gap-1">
              <Link href="/leave-a-rant"><Button size="lg" className="w-full bg-blue-700 hover:bg-blue-600 text-white font-black text-base h-13 px-8 shadow-[0_0_25px_rgba(30,64,175,0.35)] rounded-full">{"\uD83D\uDD35"} Blue Line &mdash; $2.99</Button></Link>
              <span className="text-[11px] text-blue-400 font-black uppercase tracking-wide mt-1">Left / Democrat / Progressive</span>
            </div>
            <div className="text-gray-700 font-black text-xl hidden sm:block">VS</div>
            <div className="flex flex-col items-center gap-1">
              <Link href="/leave-a-rant"><Button size="lg" className="w-full bg-gray-700 hover:bg-gray-600 text-white font-black text-base h-13 px-8 rounded-full">{"\u26AA"} Neutral Line &mdash; $2.99</Button></Link>
              <span className="text-[11px] text-gray-400 font-black uppercase tracking-wide mt-1">Independent / Open Rant</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/leave-a-rant"><Button variant="outline" className="bg-transparent hover:bg-white/5 text-white border border-white/20 font-bold text-sm h-10 px-5 rounded-full"><Zap className="w-3.5 h-3.5 mr-1.5 fill-white" /> Skip the Line &mdash; $12.99</Button></Link>
            <Link href="/leave-a-rant"><Button variant="outline" className="bg-transparent hover:bg-white/5 text-white border border-white/20 font-bold text-sm h-10 px-5 rounded-full"><Star className="w-3.5 h-3.5 mr-1.5" /> Featured Rant &mdash; $39.99</Button></Link>
          </div>
          <p className="mt-5 text-gray-600 text-xs">{(globalStats?.totalRants ?? 0).toLocaleString()} total rants &middot; {(globalStats?.totalPlays ?? 0).toLocaleString()} listeners &middot; No censorship</p>
        </div>
      </section>

      <section className="py-6 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Calls Today</h2>
            <div className="flex items-center gap-1.5 text-xs text-green-400 font-bold bg-green-900/20 border border-green-800/40 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse inline-block"></span> Live
            </div>
          </div>
          <div className="bg-[#0d1120] border border-white/[0.08] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-white/[0.08]">
              <div className="p-5 text-center">
                <div className="text-3xl font-black text-red-400 mb-1">{redCalls.toLocaleString()}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{"\uD83D\uDD34"} MAGA</div>
              </div>
              <div className="p-5 text-center">
                <div className="text-3xl font-black text-blue-400 mb-1">{blueCalls.toLocaleString()}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{"\uD83D\uDD35"} Blue</div>
              </div>
              <div className="p-5 text-center">
                <div className="text-3xl font-black text-gray-300 mb-1">{neutralCalls.toLocaleString()}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{"\u26AA"} Neutral</div>
              </div>
            </div>
            <div className="px-4 pb-4">
              <div className="h-4 rounded-full overflow-hidden flex">
                <div className="bg-gradient-to-r from-red-900 to-[#cc0000]" style={{ width: `${redPct}%` }}></div>
                <div className="bg-gradient-to-r from-blue-800 to-blue-600" style={{ width: `${bluePct}%` }}></div>
                <div className="bg-gradient-to-r from-gray-700 to-gray-500" style={{ width: `${openPct}%` }}></div>
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-gray-600 font-bold">
                <span>{"\uD83D\uDD34"} {redPct}% &middot; {"\uD83D\uDD35"} {bluePct}% &middot; {"\u26AA"} {openPct}%</span>
                <Link href="/arena" className="hover:text-white transition-colors flex items-center gap-1 no-underline text-gray-600">Full Scoreboard <ChevronRight className="w-3 h-3" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featured && (
        <section className="py-6 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-4 h-4 text-white fill-white" />
              <h2 className="text-sm font-black uppercase tracking-widest text-white">Featured Rant</h2>
              <div className="flex-1 h-px bg-white/[0.08]"></div>
              <Badge variant="outline" className="border-white/15 text-gray-500 text-[10px]">Sponsored &middot; 24h</Badge>
            </div>
            <Card className="bg-[#0f1423] border-[#cc0000]/50 border-2 overflow-hidden shadow-[0_8px_30px_-8px_rgba(204,0,0,0.2)] relative">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#cc0000] via-red-400 to-[#cc0000]"></div>
              <CardHeader className="pb-3 border-b border-white/5">
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-[#cc0000] text-white border-none font-bold uppercase tracking-wider text-[10px]">{featured.category || "Featured"} &middot; Rant #{featured.rantNumber}</Badge>
                  <div className="flex items-center text-white font-bold bg-white/[0.08] px-2.5 py-1 rounded-full text-xs"><Flame className="w-3.5 h-3.5 mr-1 fill-white" /> {featured.votes.toLocaleString()} votes</div>
                </div>
                <CardTitle className="text-2xl font-black text-white leading-tight">&ldquo;{featured.title || featured.topic || "Untitled"}&rdquo;</CardTitle>
                <p className="text-gray-500 text-xs mt-1">{featured.callerNickname || "Anonymous"} &middot; {featured.callerState || "US"} &middot; {timeAgo(featured.createdAt)}</p>
              </CardHeader>
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-5">
                  <button onClick={toggleFeatured} className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.25)] flex-shrink-0">
                    {isPlayingFeatured ? <Pause className="w-7 h-7 fill-black" /> : <Play className="w-7 h-7 fill-black ml-1" />}
                  </button>
                  <div className="flex-1">
                    <div className="h-10 flex items-center justify-between gap-0.5 mb-2">
                      {[...Array(50)].map((_, i) => {
                        const h = [20,40,60,80,55,70,35,90,45,65,30,75,50,85,40,95,60,25,70,45,80,35,90,55,40,70,30,85,50,65,75,40,55,90,35,80,60,45,70,30,95,50,65,40,85,55,70,35,80,45];
                        return <div key={i} className={`w-full rounded-full ${i < 18 ? "bg-white" : "bg-white/15"}`} style={{ height: `${h[i] || 40}%` }}></div>;
                      })}
                    </div>
                    <div className="flex justify-between text-xs font-bold text-gray-500"><span className="text-white">0:00</span><span>{formatDuration(featured.duration)}</span></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-black/15 border-t border-white/5 py-2.5 px-5 flex justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-white/[0.08] h-8 text-xs" onClick={() => voteMut.mutate(featured.id)}><Flame className="w-3.5 h-3.5 mr-1.5 fill-current" />{featured.votes.toLocaleString()}</Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-400 hover:bg-white/[0.08] h-8 text-xs"><ThumbsDown className="w-3.5 h-3.5 mr-1.5" />{featured.downvotes}</Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-white hover:bg-white/[0.08] h-8 text-xs"><Share2 className="w-3.5 h-3.5 mr-1.5" />Share</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </section>
      )}

      {trendingRant && (
        <section className="py-6 px-4 bg-[#07090f]">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <ArrowUpRight className="w-4 h-4 text-orange-400" />
              <h2 className="text-sm font-black uppercase tracking-widest text-white">Trending Rant</h2>
              <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-black uppercase tracking-widest">Going Viral</Badge>
              <div className="flex-1 h-px bg-white/[0.08]"></div>
            </div>
            <div className="bg-gradient-to-r from-orange-950/40 via-[#0f1423] to-[#0f1423] border border-orange-700/30 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-600/30 flex items-center justify-center text-2xl shrink-0">{"\u26AA"}</div>
                <div className="flex-1">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{trendingRant.category} &middot; Rant #{trendingRant.rantNumber}</div>
                  <h3 className="text-xl font-black text-white leading-tight mb-2">&ldquo;{trendingRant.title || trendingRant.topic || "Untitled"}&rdquo;</h3>
                  <p className="text-gray-500 italic text-sm mb-3">&mdash; {trendingRant.callerNickname || "Anonymous"}, {trendingRant.callerState || "US"} &middot; {timeAgo(trendingRant.createdAt)} &middot; {formatDuration(trendingRant.duration)}</p>
                  <div className="flex items-center gap-4">
                    <button onClick={toggleTrending} className="w-10 h-10 rounded-full bg-orange-600 hover:bg-orange-500 flex items-center justify-center shrink-0 transition-all hover:scale-105">
                      {isPlayingTrending ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                    </button>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-orange-400 font-black flex items-center gap-1"><Flame className="w-4 h-4 fill-orange-400" />{trendingRant.votes.toLocaleString()} votes</span>
                      <span className="text-gray-600">&middot;</span>
                      <span className="text-green-400 font-bold text-xs flex items-center gap-1"><ArrowUpRight className="w-3 h-3" />{trendingRant.plays.toLocaleString()} plays</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#cc0000] py-8 border-y-2 border-red-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y-2 md:divide-y-0 md:divide-x divide-red-800">
            {[
              { val: (globalStats?.totalRants ?? 0).toLocaleString(), label: "Total Rants", icon: <Mic className="w-4 h-4" /> },
              { val: (globalStats?.totalPlays ?? 0).toLocaleString(), label: "Listeners", icon: <Users className="w-4 h-4" /> },
              { val: (globalStats?.totalVotes ?? 0).toLocaleString(), label: "Total Votes", icon: <TrendingUp className="w-4 h-4" /> },
              { val: (globalStats?.totalCallers ?? 0).toLocaleString(), label: "Callers", icon: <Trophy className="w-4 h-4" /> },
            ].map((s) => (
              <div key={s.label} className="text-center pt-3 md:pt-0">
                <div className="flex items-center justify-center gap-2 text-white/70 mb-2">{s.icon}<span className="text-[10px] uppercase tracking-widest font-bold">{s.label}</span></div>
                <div className="text-4xl font-black text-white tracking-tight">{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-[#070a14]">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <Trophy className="w-5 h-5 text-yellow-400 fill-yellow-400/20" />
            <h2 className="text-2xl font-black uppercase tracking-tight">Top Rants Today</h2>
            <div className="flex-1 h-px bg-white/[0.08]"></div>
            <Link href="/leaderboard" className="text-gray-500 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors no-underline">Full Board <ChevronRight className="w-3 h-3" /></Link>
          </div>
          <div className="space-y-3">
            {(leaderboard ?? []).map((r, i) => (
              <div key={r.id} className="bg-[#0f1423] border border-gray-700/50 rounded-xl p-4 flex items-center gap-4 group hover:opacity-90 transition-opacity cursor-pointer">
                <div className="text-3xl w-10 text-center shrink-0">{medals[i] || `#${i + 1}`}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">{r.category} &middot; Rant #{r.rantNumber}</div>
                  <h3 className="font-bold text-white text-sm truncate">&ldquo;{r.title || r.topic || "Untitled"}&rdquo;</h3>
                  <p className="text-gray-600 text-xs mt-0.5">&mdash; {r.callerNickname || "Anonymous"}</p>
                </div>
                <div className="flex items-center gap-1 font-black text-sm shrink-0 text-red-400"><Flame className="w-4 h-4 fill-current" />{r.votes.toLocaleString()}</div>
                <button 
                  onClick={() => toggleLeaderboard(r)} 
                  className={`w-9 h-9 rounded-full border border-gray-700/50 flex items-center justify-center text-white transition-all ${playingLeaderboardId === r.id ? "bg-[#cc0000] border-[#cc0000]" : "hover:bg-[#cc0000] hover:border-[#cc0000]"}`}
                >
                  {playingLeaderboardId === r.id ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {topCategories.length > 0 && (
        <section className="py-12 px-4 bg-[#0a0e1a]">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight mb-1">Browse by Category</h2>
                <p className="text-gray-500 text-sm">Find the rants that matter to you</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {topCategories.map((cat) => (
                <Link key={cat.topic} href={`/rants?category=${encodeURIComponent(cat.topic)}`} className="no-underline">
                  <div className={`border rounded-xl p-4 text-center cursor-pointer hover:border-white/20 transition-all group ${CAT_COLORS[cat.topic] || "bg-gray-900/40 border-gray-700/50"}`}>
                    <div className="text-3xl mb-2">{CATEGORIES_ICONS[cat.topic] || "\uD83D\uDCE2"}</div>
                    <div className="font-bold text-white text-sm mb-1 group-hover:text-white">{cat.topic}</div>
                    <div className="text-gray-500 text-xs font-medium">{cat.total.toLocaleString()} rants</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-10 px-4 bg-[#0a0e1a]">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-[#cc0000] rounded-2xl p-8 text-center relative overflow-hidden shadow-[0_0_40px_rgba(204,0,0,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Got Something To Say?</h2>
              <p className="text-red-200 text-sm mb-6 max-w-md mx-auto">Call the hotline, say your piece, and join thousands of Americans who are being heard.</p>
              <Link href="/leave-a-rant"><Button size="lg" className="bg-white hover:bg-white/90 text-black font-black rounded-full px-10 text-lg shadow-md">Leave a Rant &mdash; $2.99</Button></Link>
              <p className="text-red-200/50 text-xs mt-4">1-888-460-RANT &middot; Available 24/7</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
