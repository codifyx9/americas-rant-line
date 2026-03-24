import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Play, Pause, Flame, Share2, Trophy, Mic, TrendingUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api, type Rant } from "@/lib/api";

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

type Side = "maga" | "blue" | "neutral";

function sideStyles(side: Side) {
  if (side === "maga") return { cardBg: "border-red-700/50 bg-[#150606]", badgeBg: "bg-[#cc0000]", playBg: "bg-[#cc0000] hover:bg-red-700", progressBg: "bg-[#cc0000]", flameClass: "text-red-400 fill-red-400" };
  if (side === "blue") return { cardBg: "border-blue-700/50 bg-[#060d1a]", badgeBg: "bg-blue-700", playBg: "bg-blue-700 hover:bg-blue-600", progressBg: "bg-blue-600", flameClass: "text-blue-400 fill-blue-400" };
  return { cardBg: "border-gray-600/40 bg-[#0e0e10]", badgeBg: "bg-gray-700", playBg: "bg-gray-700 hover:bg-gray-600", progressBg: "bg-gray-500", flameClass: "text-gray-300 fill-gray-300" };
}

function RantCard({ rant, side }: { rant: Rant; side: Side }) {
  const [playing, setPlaying] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const s = sideStyles(side);
  const isHot = rant.votes > 500;
  const queryClient = useQueryClient();
  const downvoteMut = useMutation({
    mutationFn: () => api.rants.downvote(rant.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rantsByLine"] }),
  });

  return (
    <div className={`rounded-xl border ${s.cardBg} p-4 hover:brightness-110 transition-all`}>
      {isHot && (
        <div className={`inline-flex items-center gap-1 ${s.badgeBg} text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-2`}>
          {"\uD83D\uDD25"} Hot Right Now
        </div>
      )}
      <h3 className="font-bold text-white text-sm leading-snug mb-2 line-clamp-2">&ldquo;{rant.title || rant.topic || "Untitled"}&rdquo;</h3>
      <p className="text-gray-500 text-xs italic mb-3">{rant.callerNickname || "Anonymous"}{rant.callerState ? `, ${rant.callerState}` : ""} &middot; {timeAgo(rant.createdAt)} ago</p>
      <div className="flex items-center gap-3 mb-3">
        <button onClick={() => setPlaying(!playing)} className={`w-9 h-9 rounded-full ${s.playBg} flex items-center justify-center text-white shrink-0 transition-all`}>
          {playing ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
        </button>
        <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div className={`h-full ${s.progressBg} rounded-full transition-all duration-300`} style={{ width: playing ? "35%" : "0%" }}></div>
        </div>
        <span className="text-gray-500 text-xs font-mono">{formatDuration(rant.duration)}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1 font-black text-sm ${s.flameClass.split(" ")[0]}`}>
          <Flame className={`w-4 h-4 ${s.flameClass.split(" ")[1]}`} />{rant.votes.toLocaleString()}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { setDownvoted(!downvoted); downvoteMut.mutate(); }}
            className={`flex items-center gap-1 px-2 h-6 rounded-full text-[10px] font-bold transition-all border ${downvoted ? "bg-red-900/30 border-red-700 text-red-400" : "bg-gray-800 border-gray-700 text-gray-500 hover:border-red-800 hover:text-red-500"}`}
          >
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
  const [activeTab, setActiveTab] = useState<"all" | "maga" | "blue" | "neutral">("all");

  const { data: callStats } = useQuery({ queryKey: ["callsToday"], queryFn: api.stats.callsToday });
  const { data: rantsByLine } = useQuery({ queryKey: ["rantsByLine"], queryFn: api.rants.byLine });
  const { data: topByLine } = useQuery({ queryKey: ["topByLine"], queryFn: api.rants.topByLine });

  const magaRants = rantsByLine?.maga ?? [];
  const blueRants = rantsByLine?.blue ?? [];
  const neutralRants = rantsByLine?.neutral ?? [];

  const magaTotal = callStats?.maga_calls ?? 0;
  const blueTotal = callStats?.blue_calls ?? 0;
  const neutralTotal = callStats?.neutral_calls ?? 0;
  const grandTotal = magaTotal + blueTotal + neutralTotal || 1;
  const magaPct = Math.round((magaTotal / grandTotal) * 100);
  const bluePct = Math.round((blueTotal / grandTotal) * 100);
  const neutralPct = 100 - magaPct - bluePct;

  const topMaga = topByLine?.maga;
  const topBlue = topByLine?.blue;
  const topNeutral = topByLine?.neutral;

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="w-1/3 bg-gradient-to-br from-red-950 via-[#1a0505] to-transparent"></div>
          <div className="w-1/3 bg-gradient-to-b from-gray-900/60 to-transparent"></div>
          <div className="w-1/3 bg-gradient-to-bl from-blue-950 via-[#05081a] to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 px-4 py-1.5 rounded-full text-xs font-bold mb-8 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
            LIVE &middot; Updated every 5 minutes
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-6">
            <span className="text-red-500">America</span><br />
            <span className="text-white">is Arguing.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 font-medium">Pick a side. Leave your rant. Let the people vote.</p>
          <div className="flex flex-col sm:flex-row items-start justify-center gap-4 mb-4">
            <div className="flex flex-col items-center gap-1.5 w-full sm:w-auto">
              <Link href="/leave-a-rant"><Button size="lg" className="bg-[#cc0000] hover:bg-red-700 text-white font-black text-base h-13 px-8 rounded-full shadow-[0_0_25px_rgba(204,0,0,0.4)] w-full">{"\uD83D\uDD34"} MAGA Line &mdash; $2.99</Button></Link>
              <span className="text-[11px] text-red-400/70 font-semibold">Right (Conservative / Republican)</span>
            </div>
            <div className="text-gray-700 font-black text-lg hidden sm:block self-start mt-3">VS</div>
            <div className="flex flex-col items-center gap-1.5 w-full sm:w-auto">
              <Link href="/leave-a-rant"><Button size="lg" className="bg-gray-700 hover:bg-gray-600 text-white font-black text-base h-13 px-8 rounded-full w-full">{"\u26AA"} Neutral Line &mdash; $2.99</Button></Link>
              <span className="text-[11px] text-gray-400/70 font-semibold">Independent / Open Rant</span>
            </div>
            <div className="text-gray-700 font-black text-lg hidden sm:block self-start mt-3">VS</div>
            <div className="flex flex-col items-center gap-1.5 w-full sm:w-auto">
              <Link href="/leave-a-rant"><Button size="lg" className="bg-blue-700 hover:bg-blue-600 text-white font-black text-base h-13 px-8 rounded-full shadow-[0_0_25px_rgba(30,64,175,0.4)] w-full">{"\uD83D\uDD35"} Blue Line &mdash; $2.99</Button></Link>
              <span className="text-[11px] text-blue-400/70 font-semibold">Left (Democrat / Progressive)</span>
            </div>
          </div>
          <p className="text-gray-600 text-xs mt-2">Skip the Line: $5 &middot; Featured: $25 &middot; 1-888-460-RANT</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black uppercase tracking-tight">{"Today's"} Battle</h2>
          <p className="text-gray-500 text-sm mt-1">Total calls today &mdash; which line is loudest?</p>
        </div>
        <div className="bg-[#0f1423] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            <div className="p-5 text-center bg-gradient-to-br from-red-950/60 to-transparent">
              <div className="text-4xl font-black text-red-400 mb-1">{magaTotal.toLocaleString()}</div>
              <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">{"\uD83D\uDD34"} MAGA Line</div>
            </div>
            <div className="p-5 text-center bg-gradient-to-b from-gray-800/30 to-transparent">
              <div className="text-4xl font-black text-gray-300 mb-1">{neutralTotal.toLocaleString()}</div>
              <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">{"\u26AA"} Neutral Line</div>
            </div>
            <div className="p-5 text-center bg-gradient-to-bl from-blue-950/60 to-transparent">
              <div className="text-4xl font-black text-blue-400 mb-1">{blueTotal.toLocaleString()}</div>
              <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">{"\uD83D\uDD35"} Blue Line</div>
            </div>
          </div>
          <div className="px-6 pb-5 pt-2">
            <div className="h-5 rounded-full overflow-hidden flex">
              <div className="bg-gradient-to-r from-red-900 to-[#cc0000] flex items-center justify-end pr-2 transition-all" style={{ width: `${magaPct}%` }}>
                <span className="text-white text-[10px] font-black">{magaPct}%</span>
              </div>
              <div className="bg-gradient-to-r from-gray-700 to-gray-500 flex items-center justify-center transition-all" style={{ width: `${neutralPct}%` }}>
                <span className="text-white text-[10px] font-black">{neutralPct}%</span>
              </div>
              <div className="bg-gradient-to-l from-blue-900 to-blue-600 flex items-center justify-start pl-2 transition-all" style={{ width: `${bluePct}%` }}>
                <span className="text-white text-[10px] font-black">{bluePct}%</span>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              <span>Resets midnight EST</span>
            </div>
          </div>
        </div>
      </div>

      {(topMaga || topBlue || topNeutral) && (
        <div className="max-w-5xl mx-auto px-4 pb-10">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-black uppercase tracking-tight">Top Rant of the Day</h2>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { side: "maga" as Side, badge: "\uD83D\uDD34 Top MAGA Rant", rant: topMaga, topColor: "from-red-900 via-red-500 to-red-900", border: "border-red-700/60", bg: "from-red-950/80", playBg: "bg-[#cc0000] hover:bg-red-700", playGlow: "shadow-[0_0_15px_rgba(204,0,0,0.4)]", badgeBg: "bg-[#cc0000]", flameColor: "text-red-400", progressBg: "bg-[#cc0000]", btnBorder: "border-red-700/50 text-red-400 hover:bg-red-900/30" },
              { side: "neutral" as Side, badge: "\u26AA Top Neutral Rant", rant: topNeutral, topColor: "from-gray-700 via-gray-400 to-gray-700", border: "border-gray-600/60", bg: "from-gray-800/60", playBg: "bg-gray-700 hover:bg-gray-600", playGlow: "shadow-[0_0_15px_rgba(120,120,120,0.3)]", badgeBg: "bg-gray-700", flameColor: "text-gray-300", progressBg: "bg-gray-500", btnBorder: "border-gray-600/50 text-gray-300 hover:bg-gray-800/50" },
              { side: "blue" as Side, badge: "\uD83D\uDD35 Top Blue Rant", rant: topBlue, topColor: "from-blue-900 via-blue-400 to-blue-900", border: "border-blue-700/60", bg: "from-blue-950/80", playBg: "bg-blue-700 hover:bg-blue-600", playGlow: "shadow-[0_0_15px_rgba(30,64,175,0.4)]", badgeBg: "bg-blue-700", flameColor: "text-blue-400", progressBg: "bg-blue-600", btnBorder: "border-blue-700/50 text-blue-400 hover:bg-blue-900/30" },
            ].filter((r) => r.rant).map((r) => (
              <div key={r.side} className={`bg-gradient-to-br ${r.bg} to-[#0f1423] border-2 ${r.border} rounded-2xl p-5 relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${r.topColor}`}></div>
                <Badge className={`${r.badgeBg} text-white border-none font-black uppercase tracking-widest text-[10px] mb-3`}>{r.badge}</Badge>
                <h3 className="text-base font-black text-white leading-tight mb-2">&ldquo;{r.rant!.title || r.rant!.topic || "Untitled"}&rdquo;</h3>
                <p className="text-gray-400 italic text-xs mb-4">&mdash; {r.rant!.callerNickname || "Anonymous"}{r.rant!.callerState ? `, ${r.rant!.callerState}` : ""}</p>
                <div className="bg-black/40 rounded-xl p-3 flex items-center gap-3 mb-4 border border-white/5">
                  <button className={`w-10 h-10 rounded-full ${r.playBg} flex items-center justify-center shrink-0 ${r.playGlow} transition-all hover:scale-105`}><Play className="w-4 h-4 fill-white ml-0.5" /></button>
                  <div className="flex-1">
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden"><div className={`h-full ${r.progressBg} w-0 rounded-full`}></div></div>
                    <div className="flex justify-between text-[10px] text-gray-600 mt-1 font-mono"><span>0:00</span><span>{formatDuration(r.rant!.duration)}</span></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-1 ${r.flameColor} font-black text-lg`}>
                    <Flame className={`w-5 h-5 fill-current`} />{r.rant!.votes.toLocaleString()}
                    <span className="text-xs font-bold text-gray-600 ml-0.5">votes</span>
                  </div>
                  <Button variant="outline" className={`${r.btnBorder} text-xs rounded-full px-3 h-8`}><Share2 className="w-3 h-3 mr-1" /> Share</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-5 h-5 text-gray-400" />
          <h2 className="text-2xl font-black uppercase tracking-tight">Latest Rants</h2>
          <div className="flex-1 h-px bg-white/10"></div>
          <div className="flex gap-1 bg-[#0d1120] border border-white/10 rounded-full p-1">
            {(["all", "maga", "neutral", "blue"] as const).map((t) => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === t
                    ? t === "maga" ? "bg-[#cc0000] text-white" : t === "blue" ? "bg-blue-700 text-white" : t === "neutral" ? "bg-gray-700 text-white" : "bg-white text-black"
                    : "text-gray-500 hover:text-white"
                }`}>
                {t === "all" ? "All" : t === "maga" ? "\uD83D\uDD34 MAGA" : t === "neutral" ? "\u26AA Neutral" : "\uD83D\uDD35 Blue"}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "all" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#cc0000]"></div>
                <span className="text-xs font-black text-red-400 uppercase tracking-widest">MAGA Line</span>
                <span className="text-gray-600 text-[10px] font-bold ml-auto">Right</span>
              </div>
              {magaRants.slice(0, 5).map((r) => <RantCard key={r.id} rant={r} side="maga" />)}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-500"></div>
                <span className="text-xs font-black text-gray-300 uppercase tracking-widest">Neutral Line</span>
                <span className="text-gray-600 text-[10px] font-bold ml-auto">Independent</span>
              </div>
              {neutralRants.slice(0, 5).map((r) => <RantCard key={r.id} rant={r} side="neutral" />)}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Blue Line</span>
                <span className="text-gray-600 text-[10px] font-bold ml-auto">Left</span>
              </div>
              {blueRants.slice(0, 5).map((r) => <RantCard key={r.id} rant={r} side="blue" />)}
            </div>
          </div>
        ) : (
          <div className="space-y-3 max-w-xl">
            {(activeTab === "maga" ? magaRants : activeTab === "neutral" ? neutralRants : blueRants).slice(0, 5).map((r) => (
              <RantCard key={r.id} rant={r} side={activeTab} />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link href="/rants">
            <button className="px-10 py-3 rounded-full border-2 border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all text-sm">
              Load More Rants
            </button>
          </Link>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="bg-gradient-to-r from-red-950/60 to-transparent p-8 text-center">
            <Mic className="w-9 h-9 text-red-400 mx-auto mb-3" />
            <h3 className="font-black text-white text-lg mb-1">{"\uD83D\uDD34"} MAGA Line</h3>
            <p className="text-red-400/60 text-xs font-semibold mb-2">Right (Conservative / Republican)</p>
            <p className="text-gray-500 text-sm mb-5">Say what the mainstream media will not air.</p>
            <Link href="/leave-a-rant"><Button className="bg-[#cc0000] hover:bg-red-700 text-white font-black rounded-full px-7 h-11">Call Now &mdash; $2.99</Button></Link>
          </div>
          <div className="bg-gradient-to-b from-gray-800/30 to-transparent p-8 text-center">
            <Mic className="w-9 h-9 text-gray-400 mx-auto mb-3" />
            <h3 className="font-black text-white text-lg mb-1">{"\u26AA"} Neutral Line</h3>
            <p className="text-gray-400/60 text-xs font-semibold mb-2">Independent / Open Rant</p>
            <p className="text-gray-500 text-sm mb-5">No side required. Just your honest voice.</p>
            <Link href="/leave-a-rant"><Button className="bg-gray-700 hover:bg-gray-600 text-white font-black rounded-full px-7 h-11">Call Now &mdash; $2.99</Button></Link>
          </div>
          <div className="bg-gradient-to-l from-blue-950/60 to-transparent p-8 text-center">
            <Mic className="w-9 h-9 text-blue-400 mx-auto mb-3" />
            <h3 className="font-black text-white text-lg mb-1">{"\uD83D\uDD35"} Blue Line</h3>
            <p className="text-blue-400/60 text-xs font-semibold mb-2">Left (Democrat / Progressive)</p>
            <p className="text-gray-500 text-sm mb-5">Make your voice heard loud and clear.</p>
            <Link href="/leave-a-rant"><Button className="bg-blue-700 hover:bg-blue-600 text-white font-black rounded-full px-7 h-11">Call Now &mdash; $2.99</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
