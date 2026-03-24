import { useQuery } from "@tanstack/react-query";
import { Flame, Play, Pause, Swords, TrendingUp } from "lucide-react";
import { api, type Rant } from "@/lib/api";
import { useState, useRef } from "react";

function LineCard({ rant, side }: { rant: Rant | null; side: "red" | "blue" }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!rant) {
    return (
      <div className={`flex-1 rounded-xl border p-8 text-center ${
        side === "red" ? "border-red-600/30 bg-red-600/5" : "border-blue-600/30 bg-blue-600/5"
      }`}>
        <p className="text-gray-500">No rant yet</p>
      </div>
    );
  }

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

  const color = side === "red" ? "#cc0000" : "#1e40af";

  return (
    <div className={`flex-1 rounded-xl border p-6 ${
      side === "red" ? "border-red-600/30 bg-gradient-to-b from-red-600/10 to-transparent" : "border-blue-600/30 bg-gradient-to-b from-blue-600/10 to-transparent"
    }`}>
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{side === "red" ? "🟥" : "🟦"}</div>
        <h3 className="font-black text-xl text-white">{side === "red" ? "MAGA LINE" : "BLUE LINE"}</h3>
        <p className="text-gray-500 text-xs">{side === "red" ? "Conservative / Republican" : "Democrat / Progressive"}</p>
      </div>
      <div className="bg-black/20 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3">
          <button onClick={togglePlay} className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity" style={{ backgroundColor: color }}>
            {playing ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-black text-white text-sm truncate">
              {rant.title ? `"${rant.title}"` : `RANT #${String(rant.rantNumber).padStart(3, "0")}`}
            </p>
            <p className="text-gray-500 text-xs">{rant.callerNickname || "Anonymous"}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 text-lg font-black" style={{ color }}>
        <Flame className="w-5 h-5" /> {rant.votes.toLocaleString()} votes
      </div>
    </div>
  );
}

function RantRow({ rant, side }: { rant: Rant; side: "red" | "blue" }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(rant.audioUrl);
      audioRef.current.onended = () => setPlaying(false);
    }
    if (playing) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setPlaying(!playing);
  };

  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
      <button onClick={togglePlay} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 hover:bg-white/20">
        {playing ? <Pause className="w-3 h-3 text-white" /> : <Play className="w-3 h-3 text-white ml-0.5" />}
      </button>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-white text-sm truncate">
          {rant.title ? `"${rant.title}"` : `RANT #${String(rant.rantNumber).padStart(3, "0")}`}
        </p>
        <p className="text-gray-500 text-xs">{rant.callerNickname || "Anonymous"}</p>
      </div>
      <div className="flex items-center gap-1 text-sm font-bold" style={{ color: side === "red" ? "#cc0000" : "#1e40af" }}>
        <Flame className="w-3 h-3" /> {rant.votes}
      </div>
    </div>
  );
}

export default function RedVsBlue() {
  const callsQ = useQuery({ queryKey: ["calls"], queryFn: api.stats.calls });
  const topByLineQ = useQuery({ queryKey: ["topByLine"], queryFn: api.rants.topByLine });
  const byLineQ = useQuery({ queryKey: ["byLine"], queryFn: api.rants.byLine });

  const calls = callsQ.data;
  const topByLine = topByLineQ.data || {};
  const byLine = byLineQ.data || {};

  const redTotal = calls?.maga_calls ?? 0;
  const blueTotal = calls?.blue_calls ?? 0;
  const total = redTotal + blueTotal;
  const redPct = total === 0 ? 50 : Math.round((redTotal / total) * 100);
  const bluePct = 100 - redPct;

  return (
    <div className="bg-[#0a0e1a] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-4xl">{"🟥"}</span>
            <Swords className="w-8 h-8 text-gray-500" />
            <span className="text-4xl">{"🟦"}</span>
          </div>
          <h1 className="font-black text-3xl text-white mb-2">RED VS BLUE</h1>
          <p className="text-gray-500 text-sm">The battle for {"America's"} voice</p>
        </div>

        <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-red-500 font-black text-sm">MAGA {redPct}%</span>
            <span className="text-blue-500 font-black text-sm">BLUE {bluePct}%</span>
          </div>
          <div className="h-4 rounded-full overflow-hidden flex bg-gray-800">
            <div className="bg-gradient-to-r from-red-700 to-red-500 transition-all duration-500" style={{ width: `${redPct}%` }} />
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500" style={{ width: `${bluePct}%` }} />
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-gray-500 text-xs">{redTotal.toLocaleString()} calls</span>
            <span className="text-gray-500 text-xs">{blueTotal.toLocaleString()} calls</span>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="font-black text-sm text-gray-400 mb-4 uppercase tracking-wider text-center">
            <TrendingUp className="w-4 h-4 inline mr-1" /> TOP RANT FROM EACH SIDE
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <LineCard rant={(topByLine as any)?.maga || null} side="red" />
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <span className="font-black text-gray-500 text-sm">VS</span>
              </div>
            </div>
            <LineCard rant={(topByLine as any)?.blue || null} side="blue" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#111827] border border-red-600/20 rounded-xl p-5">
            <h3 className="font-black text-sm text-red-500 mb-4">{"🟥"} LATEST MAGA RANTS</h3>
            {((byLine as any)?.maga || []).length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No MAGA rants yet</p>
            ) : (
              ((byLine as any)?.maga || []).slice(0, 5).map((r: Rant) => (
                <RantRow key={r.id} rant={r} side="red" />
              ))
            )}
          </div>
          <div className="bg-[#111827] border border-blue-600/20 rounded-xl p-5">
            <h3 className="font-black text-sm text-blue-500 mb-4">{"🟦"} LATEST BLUE RANTS</h3>
            {((byLine as any)?.blue || []).length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No Blue rants yet</p>
            ) : (
              ((byLine as any)?.blue || []).slice(0, 5).map((r: Rant) => (
                <RantRow key={r.id} rant={r} side="blue" />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
