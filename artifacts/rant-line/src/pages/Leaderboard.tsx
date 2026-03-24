import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Play, Flame, Clock, Trophy, ThumbsUp, ThumbsDown,
  TrendingUp, Award, Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api, type Rant } from "@/lib/api";

const TIME_TABS = ["Today", "This Week", "This Month", "All Time"];

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("Today");

  const period = activeTab === "Today" ? "today" : activeTab === "This Week" ? "week" : activeTab === "This Month" ? "month" : "all";
  const { data: leaderboard } = useQuery({ queryKey: ["leaderboard", period], queryFn: () => api.rants.leaderboard(period, 10) });
  const { data: topRanters } = useQuery({ queryKey: ["topRanters"], queryFn: () => api.stats.topRanters(5) });
  const { data: categories } = useQuery({ queryKey: ["categoryBreakdown"], queryFn: api.stats.categoryBreakdown });

  const rants = leaderboard ?? [];
  const podium = rants.slice(0, 3);
  const rest = rants.slice(3);

  const catColors = ["bg-red-600", "bg-blue-600", "bg-orange-600", "bg-green-600", "bg-pink-600", "bg-gray-600"];

  return (
    <div className="bg-[#0a0e1a] text-white font-sans min-h-screen">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-3 flex items-center justify-center gap-3">
            <Trophy className="h-12 w-12 text-white" /> Top Rants
          </h1>
          <p className="text-xl text-gray-300 font-medium mb-5">The most voted rants from the hotline &mdash; updated live</p>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a2235] text-green-400 text-sm border border-green-800/50 font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Last updated: just now &middot; {rants.length} rants ranked
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex bg-[#111827] border border-[#cc0000]/30 rounded-full p-1 gap-1">
            {TIME_TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === tab ? "bg-[#cc0000] text-white shadow-sm" : "text-gray-400 hover:text-white"}`}>{tab}</button>
            ))}
          </div>
        </div>

        {podium.length >= 3 && (
          <div className="flex flex-col lg:flex-row items-end justify-center gap-6 mb-16 relative pt-10">
            <div className="w-full lg:w-[30%] order-2 lg:order-1">
              <Card className="bg-[#111827] border-2 border-slate-600 relative overflow-visible shadow-lg">
                <div className="absolute -top-7 left-4 w-14 h-14 rounded-full bg-slate-300 flex items-center justify-center text-3xl shadow-lg border-4 border-[#0a0e1a] z-10">{"\uD83E\uDD48"}</div>
                <CardHeader className="pt-10 pb-2">
                  <Badge className="bg-slate-700 text-slate-200 border-none font-bold uppercase text-xs tracking-wider w-fit mb-2">{podium[1].category}</Badge>
                  <h3 className="text-lg font-bold leading-tight text-white line-clamp-2">&ldquo;{podium[1].title || podium[1].topic || "Untitled"}&rdquo;</h3>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm text-slate-400 italic mb-3">&mdash; {podium[1].callerNickname || "Anonymous"}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5 text-slate-300 font-black text-xl"><ThumbsUp className="h-5 w-5" />{podium[1].votes.toLocaleString()}</div>
                    <div className="flex items-center gap-1 text-gray-600 text-sm font-bold"><ThumbsDown className="h-3.5 w-3.5" />{podium[1].downvotes}</div>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">{podium[1].plays.toLocaleString()} plays &middot; {formatDuration(podium[1].duration)}</div>
                  <div className="bg-[#0a0e1a] rounded-lg p-3 flex items-center gap-3 border border-slate-700">
                    <Button size="icon" className="h-8 w-8 rounded-full bg-slate-500 hover:bg-slate-400 text-white shrink-0"><Play className="h-4 w-4 ml-0.5" /></Button>
                    <div className="flex-1"><div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-slate-400 w-1/3 rounded-full"></div></div></div>
                    <span className="text-xs text-slate-400 font-mono">{formatDuration(podium[1].duration)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="w-full lg:w-[38%] order-1 lg:order-2 z-10">
              <div className="text-center mb-3">
                <Badge className="bg-[#cc0000] text-white border-none font-black uppercase tracking-widest px-4 py-1">#{1} THIS {activeTab.toUpperCase()}</Badge>
              </div>
              <Card className="bg-[#1a0808] border-4 border-white shadow-[0_0_50px_rgba(255,255,255,0.15)] relative overflow-visible">
                <div className="absolute -top-8 left-4 w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(255,255,255,0.4)] border-4 border-[#0a0e1a] z-10">{"\uD83E\uDD47"}</div>
                <CardHeader className="pt-12 pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className="bg-[#cc0000] text-white border-none font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(204,0,0,0.5)]">{podium[0].category}</Badge>
                  </div>
                  <h2 className="text-2xl font-black leading-tight text-white uppercase tracking-tight">&ldquo;{podium[0].title || podium[0].topic || "Untitled"}&rdquo;</h2>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-base text-gray-400 italic mb-4 border-l-2 border-white pl-3">&mdash; {podium[0].callerNickname || "Anonymous"}</p>
                  <div className="flex items-center justify-center gap-4 py-4 bg-white/5 border-y border-white/10 mb-5 rounded-lg">
                    <div className="flex items-center gap-2 text-white font-black text-4xl">
                      <Flame className="h-9 w-9 fill-red-500 text-red-500 animate-pulse" />{podium[0].votes.toLocaleString()}
                      <span className="text-sm font-bold text-gray-500 self-end mb-1">up</span>
                    </div>
                    <div className="w-px h-8 bg-white/10"></div>
                    <div className="flex items-center gap-1.5 text-gray-500 font-black text-xl">
                      <ThumbsDown className="h-5 w-5" />{podium[0].downvotes}
                      <span className="text-xs font-bold text-gray-600 self-end mb-0.5">down</span>
                    </div>
                  </div>
                  <div className="text-center text-gray-500 text-sm mb-4">{podium[0].plays.toLocaleString()} plays &middot; {formatDuration(podium[0].duration)}</div>
                  <div className="bg-[#0a0e1a] rounded-xl p-4 flex items-center gap-4 border border-red-900/40">
                    <Button size="icon" className="h-14 w-14 rounded-full bg-[#cc0000] hover:bg-red-600 text-white shrink-0 shadow-[0_0_20px_rgba(204,0,0,0.4)] hover:scale-105 transition-all"><Play className="h-6 w-6 ml-1" /></Button>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex justify-between text-xs font-mono text-gray-500"><span>0:00</span><span>{formatDuration(podium[0].duration)}</span></div>
                      <div className="h-2 bg-gray-800 rounded-full cursor-pointer"><div className="h-full bg-white w-0 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]"></div></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="w-full lg:w-[30%] order-3 lg:translate-y-6">
              <Card className="bg-[#111827] border-2 border-orange-900/60 relative overflow-visible shadow-lg">
                <div className="absolute -top-7 left-4 w-12 h-12 rounded-full bg-orange-300 flex items-center justify-center text-2xl shadow-lg border-4 border-[#0a0e1a] z-10">{"\uD83E\uDD49"}</div>
                <CardHeader className="pt-9 pb-2">
                  <Badge className="bg-orange-900/50 text-orange-300 border-none font-bold uppercase text-xs tracking-wider w-fit mb-2">{podium[2].category}</Badge>
                  <h3 className="text-lg font-bold leading-tight text-white line-clamp-2">&ldquo;{podium[2].title || podium[2].topic || "Untitled"}&rdquo;</h3>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm text-slate-400 italic mb-3">&mdash; {podium[2].callerNickname || "Anonymous"}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5 text-orange-300 font-black text-xl"><ThumbsUp className="h-5 w-5" />{podium[2].votes.toLocaleString()}</div>
                    <div className="flex items-center gap-1 text-gray-600 text-sm font-bold"><ThumbsDown className="h-3.5 w-3.5" />{podium[2].downvotes}</div>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">{podium[2].plays.toLocaleString()} plays &middot; {formatDuration(podium[2].duration)}</div>
                  <div className="bg-[#0a0e1a] rounded-lg p-3 flex items-center gap-3 border border-orange-900/30">
                    <Button size="icon" className="h-8 w-8 rounded-full bg-orange-800 hover:bg-orange-700 text-white shrink-0"><Play className="h-4 w-4 ml-0.5" /></Button>
                    <div className="flex-1"><div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-orange-500 w-1/4 rounded-full"></div></div></div>
                    <span className="text-xs text-slate-400 font-mono">{formatDuration(podium[2].duration)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div className="bg-[#111827] rounded-xl border border-[#cc0000]/40 shadow-xl overflow-hidden mb-10">
            <div className="p-5 border-b border-[#cc0000]/40 bg-[#162032] flex justify-between items-center">
              <h3 className="text-lg font-black uppercase tracking-wide flex items-center gap-2"><Award className="w-5 h-5 text-white" /> The Rest of the Best</h3>
              <Badge className="bg-[#cc0000]/20 text-red-300 border-[#cc0000]/30 font-bold">Ranks 4&ndash;{rest.length + 3}</Badge>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-[#0a0e1a]">
                  <TableRow className="border-[#cc0000]/30 hover:bg-transparent">
                    <TableHead className="w-14 text-center text-gray-500 font-bold uppercase text-xs">Rank</TableHead>
                    <TableHead className="text-gray-500 font-bold uppercase text-xs">Rant Title</TableHead>
                    <TableHead className="hidden md:table-cell text-gray-500 font-bold uppercase text-xs">Category</TableHead>
                    <TableHead className="hidden lg:table-cell text-gray-500 font-bold uppercase text-xs">Caller</TableHead>
                    <TableHead className="text-right text-gray-500 font-bold uppercase text-xs">Votes</TableHead>
                    <TableHead className="w-16 text-center text-gray-500 font-bold uppercase text-xs">Play</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rest.map((item, i) => (
                    <TableRow key={item.id} className={`border-[#cc0000]/20 transition-colors hover:bg-gray-800/50 ${i % 2 === 0 ? "bg-[#151e2e]" : "bg-[#111827]"}`}>
                      <TableCell className="text-center font-mono font-black text-gray-300 text-lg">#{i + 4}</TableCell>
                      <TableCell className="font-semibold text-white max-w-xs truncate">&ldquo;{item.title || item.topic || "Untitled"}&rdquo;</TableCell>
                      <TableCell className="hidden md:table-cell"><Badge variant="outline" className="border-[#cc0000]/40 text-gray-400 bg-gray-800/50 font-medium text-xs">{item.category}</Badge></TableCell>
                      <TableCell className="hidden lg:table-cell text-gray-400 italic text-sm">{item.callerNickname || "Anonymous"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-black text-white text-sm">{item.votes.toLocaleString()}</span>
                          <span className="text-[10px] text-gray-600 flex items-center gap-0.5"><ThumbsDown className="w-2.5 h-2.5" />{item.downvotes}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center"><Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-[#cc0000] hover:text-white text-gray-400 transition-colors"><Play className="h-4 w-4 ml-0.5" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {(topRanters ?? []).length > 0 && (
          <div className="mb-10">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-5 flex items-center gap-3"><Mic className="w-7 h-7 text-red-400" /> Top Ranters This Week</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {(topRanters ?? []).map((r, i) => {
                const badges = ["\uD83D\uDC51", "\uD83D\uDD25", "\u2B50", "\uD83C\uDF96\uFE0F", "\uD83D\uDCAA"];
                return (
                  <div key={r.callerId} className={`bg-[#111827] border rounded-xl p-4 text-center relative ${i === 0 ? "border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.08)]" : "border-[#cc0000]/25"}`}>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">{badges[i] || "\u2B50"}</div>
                    <div className="mt-4 w-12 h-12 rounded-full bg-[#cc0000]/20 border border-[#cc0000]/40 flex items-center justify-center text-xl font-black text-white mx-auto mb-2">{i + 1}</div>
                    <div className="font-black text-white text-sm mb-0.5">{r.nickname || "Anonymous"}</div>
                    <div className="text-gray-500 text-xs mb-3">{r.state || "US"}</div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">{r.totalRants} rants</span>
                      <span className="text-red-400 font-bold">{r.totalVotes.toLocaleString()} votes</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {(categories ?? []).length > 0 && (
          <div className="bg-[#111827] rounded-xl border border-[#cc0000]/30 p-6 mb-8">
            <h3 className="text-lg font-black uppercase tracking-wide mb-5 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-red-400" /> Rant Categories</h3>
            <div className="space-y-3">
              {(categories ?? []).slice(0, 6).map((c, i) => (
                <div key={c.topic} className="flex items-center gap-4">
                  <div className="w-28 text-sm font-bold text-gray-300 text-right shrink-0">{c.topic}</div>
                  <div className="flex-1 h-5 bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full ${catColors[i] || "bg-gray-600"} rounded-full flex items-center justify-end pr-2`} style={{ width: `${c.percentage}%` }}>
                      {c.percentage > 5 && <span className="text-white text-xs font-black">{c.percentage}%</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-[#1a1100] border border-[#cc0000]/50 rounded-lg p-4 flex items-center justify-center gap-3">
          <Clock className="h-5 w-5 text-white" />
          <span className="text-white font-bold tracking-wide uppercase text-sm">
            Leaderboard resets at midnight EST
          </span>
        </div>
      </main>
    </div>
  );
}
