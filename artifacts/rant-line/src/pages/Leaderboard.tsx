import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Trophy, Flame, Crown, Medal, Award, Play, Pause, Users } from "lucide-react";
import { api, type Rant } from "@/lib/api";

const PERIODS = [
  { value: "today", label: "TODAY" },
  { value: "week", label: "THIS WEEK" },
  { value: "month", label: "THIS MONTH" },
  { value: "all", label: "ALL TIME" },
];

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
  if (rank === 3) return <Award className="w-5 h-5 text-orange-400" />;
  return <span className="text-xl font-black text-gray-600 w-6 text-center">{rank}</span>;
}

function LeaderRow({ rant, rank }: { rant: Rant; rank: number }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(rant.audioUrl);
      audioRef.current.onended = () => setPlaying(false);
      api.rants.play(rant.id).catch(() => {});
    }
    if (playing) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setPlaying(!playing);
  };

  const catColor = rant.category === "maga" ? "bg-red-600" : rant.category === "blue" ? "bg-blue-600" : "bg-gray-600";
  const borderColor = rank === 1 ? "border-yellow-500/30 bg-yellow-500/5" : rank <= 3 ? "border-white/10 bg-white/[0.02]" : "border-white/5";

  return (
    <div className={`flex items-center gap-4 p-4 border ${borderColor} rounded-xl mb-2 group hover:border-[#cc0000]/30 transition-colors`}>
      <div className="w-8 flex justify-center"><RankIcon rank={rank} /></div>
      <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 hover:bg-white/20 transition-colors">
        {playing ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`${catColor} text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded`}>{rant.category}</span>
          {rant.featured && <span className="text-yellow-400 text-[9px] font-bold uppercase bg-yellow-400/10 px-1.5 py-0.5 rounded">Featured</span>}
        </div>
        <p className="font-black text-white text-sm truncate">
          {rant.title ? `"${rant.title}"` : `RANT #${String(rant.rantNumber).padStart(3, "0")}`}
        </p>
        <p className="text-gray-500 text-xs">{rant.callerNickname || "Anonymous"}</p>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <div className="flex items-center gap-1 text-red-400 font-black text-lg">
          <Flame className="w-4 h-4" /> {rant.votes.toLocaleString()}
        </div>
        <span className="text-gray-600 text-xs">{rant.plays.toLocaleString()} plays</span>
      </div>
    </div>
  );
}

export default function Leaderboard() {
  const [period, setPeriod] = useState("all");

  const { data: rants = [], isLoading } = useQuery({
    queryKey: ["leaderboard", period],
    queryFn: () => api.rants.leaderboard(period, 20),
  });

  const topRantersQ = useQuery({ queryKey: ["topRanters"], queryFn: () => api.stats.topRanters(10) });
  const topRanters = topRantersQ.data || [];

  return (
    <div className="bg-[#0a0e1a] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="font-black text-3xl text-white">LEADERBOARD</h1>
          </div>
          <p className="text-gray-500 text-sm">The most fired-up rants in America</p>
        </div>

        <div className="flex justify-center gap-1 bg-[#111827] rounded-lg p-1 mb-8 w-fit mx-auto">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-colors ${
                period === p.value ? "bg-[#cc0000] text-white" : "text-gray-500 hover:text-white"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-[#111827] border border-white/5 rounded-xl p-4 mb-2 animate-pulse h-20" />
              ))
            ) : rants.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No rants yet for this period</p>
              </div>
            ) : (
              rants.map((rant, i) => <LeaderRow key={rant.id} rant={rant} rank={i + 1} />)
            )}
          </div>

          <div>
            <div className="bg-[#111827] border border-white/5 rounded-xl p-5 sticky top-20">
              <h3 className="font-black text-sm text-white mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#cc0000]" /> TOP RANTERS
              </h3>
              {topRanters.length === 0 ? (
                <p className="text-gray-500 text-xs">No data yet</p>
              ) : (
                topRanters.map((r) => (
                  <div key={r.callerId} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                    <span className="text-sm font-black text-gray-600 w-5 text-center">{r.rank}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-sm truncate">{r.nickname}</p>
                      <p className="text-gray-600 text-xs">
                        {r.totalRants} rants &middot; {r.totalVotes} votes
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
