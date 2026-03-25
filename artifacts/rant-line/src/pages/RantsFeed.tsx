import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Play, Pause, Share2, Flame, Clock, Search, TrendingUp, Star, Mic, ThumbsDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api, type Rant } from "@/lib/api";

const FILTERS = ["All", "Inflation", "Politics", "War Concerns", "Work", "Dating", "Everyday Life", "Border", "Education", "Economy"];
const SORT_OPTIONS = ["\uD83D\uDD25 Hottest", "\uD83C\uDD95 Newest", "\uD83D\uDC4D Most Voted", "\uD83D\uDD50 Longest"];

const CAT_COLORS: Record<string, string> = {
  Inflation: "bg-red-700", Politics: "bg-blue-700", "War Concerns": "bg-green-700",
  Work: "bg-orange-700", Dating: "bg-pink-700", "Everyday Life": "bg-purple-700",
  Border: "bg-red-900", Education: "bg-teal-700", Economy: "bg-yellow-700",
};

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

export default function RantsFeed() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSort, setActiveSort] = useState("\uD83D\uDD25 Hottest");
  const [playing, setPlaying] = useState<string | null>(null);
  const [downvotedIds, setDownvotedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const sortParam = activeSort.includes("Newest") ? "newest" : activeSort.includes("Voted") ? "votes" : activeSort.includes("Longest") ? "longest" : "trending";
  const params: Record<string, string> = { page: String(page), limit: "10", sort: sortParam };
  if (activeFilter !== "All") params.category = activeFilter;
  if (searchTerm) params.search = searchTerm;

  const { data } = useQuery({ queryKey: ["rants", params], queryFn: () => api.rants.latest(params) });
  const { data: topRanters } = useQuery({ queryKey: ["topRanters"], queryFn: () => api.stats.topRanters(4) });
  const { data: topics } = useQuery({ queryKey: ["topics"], queryFn: api.stats.topics });

  const voteMut = useMutation({
    mutationFn: (id: string) => api.rants.vote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rants"] }),
  });
  const downvoteMut = useMutation({
    mutationFn: (id: string) => api.rants.downvote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rants"] }),
  });

  const rants = data?.rants ?? [];
  const pagination = data?.pagination;

  const toggleDownvote = (id: string) => {
    downvoteMut.mutate(id);
    setDownvotedIds((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  };

  return (
    <div className="bg-[#0a0e1a] text-white font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-black uppercase tracking-tight flex items-center gap-3 mb-2">
            <Flame className="w-10 h-10 text-red-500 fill-red-500" /> Latest Rants
          </h1>
          <p className="text-gray-400 font-medium">Fresh off the hotline &mdash; unfiltered, uncensored, updated live</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              placeholder="Search rants by topic, caller, or keyword..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-3 bg-[#111827] border border-[#cc0000]/30 text-white placeholder:text-gray-600 focus:border-[#cc0000] focus:outline-none h-11 rounded-xl text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {SORT_OPTIONS.map((s) => (
              <button key={s} onClick={() => { setActiveSort(s); setPage(1); }} className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all whitespace-nowrap ${activeSort === s ? "bg-[#cc0000] border-[#cc0000] text-white" : "bg-transparent border-white/10 text-gray-400 hover:border-white/30"}`}>{s}</button>
            ))}
          </div>
        </div>

        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 w-max">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => { setActiveFilter(f); setPage(1); }} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border-2 transition-all ${activeFilter === f ? "bg-white border-white text-black" : "bg-transparent border-[#cc0000]/40 text-gray-400 hover:border-white/40 hover:text-white"}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <div className="space-y-4">
              {rants.map((rant) => {
                const isHot = rant.votes > 500;
                return (
                  <div key={rant.id} className="bg-[#111827] rounded-xl border border-[#cc0000]/30 p-5 hover:border-[#cc0000]/70 transition-all group relative overflow-hidden">
                    {isHot && (
                      <div className="absolute top-0 right-0 bg-[#cc0000] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl">{"\uD83D\uDD25"} HOT</div>
                    )}
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => setPlaying(playing === rant.id ? null : rant.id)}
                        className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all text-white group-hover:border-white/50"
                      >
                        {playing === rant.id ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-1 fill-current" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded ${CAT_COLORS[rant.category] || "bg-gray-700"} text-white`}>{rant.category || "General"}</span>
                          <span className="flex items-center text-xs text-gray-500 font-medium"><Clock className="w-3 h-3 mr-1" />{formatDuration(rant.duration)}</span>
                          <span className="text-xs text-gray-600">{timeAgo(rant.createdAt)} ago &middot; {rant.plays.toLocaleString()} plays</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-white/90 line-clamp-1">&ldquo;{rant.title || rant.topic || "Untitled"}&rdquo;</h3>
                        <p className="text-sm text-gray-500 italic">{rant.callerNickname || "Anonymous"}{rant.callerState ? ` from ${rant.callerState}` : ""}</p>
                        <div className="mt-3 h-1.5 w-full bg-gray-800 rounded-full overflow-hidden cursor-pointer">
                          <div className="h-full bg-white rounded-full relative transition-all" style={{ width: playing === rant.id ? "35%" : "0%" }}>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <button onClick={() => voteMut.mutate(rant.id)} className="flex items-center text-red-400 font-black text-lg gap-1 hover:text-red-300 transition-colors">
                          <Flame className="w-5 h-5 fill-red-400" />{rant.votes.toLocaleString()}
                        </button>
                        <button
                          onClick={() => toggleDownvote(rant.id)}
                          className={`flex items-center gap-1.5 px-2.5 h-7 rounded-full text-xs font-bold transition-all border ${downvotedIds.has(rant.id) ? "bg-red-900/30 border-red-700 text-red-400" : "bg-gray-800 border-gray-700 text-gray-500 hover:border-red-800 hover:text-red-500"}`}
                        >
                          <ThumbsDown className="w-3 h-3" />{rant.downvotes}
                        </button>
                        <button className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {rants.length === 0 && (
                <div className="text-center py-20 text-gray-500">No rants found. Be the first to leave one!</div>
              )}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
                  disabled={page >= pagination.totalPages}
                  className="px-10 py-3 rounded-full border-2 border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all hover:border-white disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Load More Rants
                </button>
                <p className="text-gray-600 text-xs mt-3">Showing page {page} of {pagination.totalPages} &middot; {pagination.total.toLocaleString()} rants</p>
              </div>
            )}
          </div>

          <div className="hidden lg:flex flex-col gap-6 w-72 flex-shrink-0">
            <div className="bg-[#cc0000] rounded-xl p-5 text-center">
              <Mic className="w-10 h-10 text-white mx-auto mb-3" />
              <h3 className="font-black text-white text-lg mb-1">Got Something To Say?</h3>
              <p className="text-red-200 text-xs mb-4 leading-relaxed">Call the hotline and join thousands of ranters who have been heard.</p>
              <Link href="/leave-a-rant"><Button className="w-full bg-white text-black font-black hover:bg-white/90 rounded-full">Leave a Rant &mdash; $1.99</Button></Link>
            </div>

            <div className="bg-[#111827] border border-[#cc0000]/30 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-red-400" />
                <h3 className="font-black text-white text-sm uppercase tracking-widest">Trending Topics</h3>
              </div>
              <div className="space-y-3">
                {(topics ?? []).slice(0, 5).map((t, i) => (
                  <div key={t.topic} className="flex items-center justify-between group cursor-pointer" onClick={() => { setActiveFilter(t.topic); setPage(1); }}>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 text-xs font-mono w-4">{i + 1}</span>
                      <span className="text-white font-bold text-sm group-hover:text-red-400 transition-colors">#{t.topic.replace(/\s/g, "")}</span>
                    </div>
                    <span className="text-gray-500 text-xs">{t.total.toLocaleString()} rants</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111827] border border-[#cc0000]/30 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-white fill-white" />
                <h3 className="font-black text-white text-sm uppercase tracking-widest">Top Ranters</h3>
              </div>
              <div className="space-y-3">
                {(topRanters ?? []).map((r, i) => (
                  <div key={r.callerId} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#cc0000]/30 border border-[#cc0000]/40 flex items-center justify-center text-xs font-black text-white">{i + 1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-sm">{r.nickname || "Anonymous"}</div>
                      <div className="text-gray-500 text-xs">{r.state || "US"} &middot; {r.totalRants} rants</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f1423] border border-white/10 rounded-xl p-5">
              <Badge className="bg-white/10 text-white border-none text-xs uppercase tracking-widest mb-3">Weekly Challenge</Badge>
              <h3 className="font-black text-white text-base mb-2">Best Rant Wins $100</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">342 entries &middot; Resets Sunday midnight</p>
              <Link href="/leave-a-rant"><Button className="w-full bg-[#cc0000] hover:bg-red-700 text-white font-bold rounded-full text-sm">Enter Now</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
