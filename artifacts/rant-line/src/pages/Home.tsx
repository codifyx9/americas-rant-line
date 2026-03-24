import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Phone, Flame, Users, Mic, TrendingUp, ChevronRight, Play, Pause, Clock } from "lucide-react";
import { api, type Rant } from "@/lib/api";
import { useState, useRef } from "react";

function FeaturedRant({ rant }: { rant: Rant }) {
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

  return (
    <div className="bg-gradient-to-r from-[#cc0000]/20 via-[#111827] to-[#1e40af]/20 border border-[#cc0000]/30 rounded-2xl p-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded uppercase tracking-wider">Featured Rant</span>
        <span className={`${catColor} text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded`}>{rant.category}</span>
      </div>
      <div className="flex items-center gap-6">
        <button onClick={togglePlay} className="w-20 h-20 rounded-full bg-[#cc0000] flex items-center justify-center flex-shrink-0 hover:bg-[#cc0000]/80 transition-colors shadow-lg shadow-red-900/30">
          {playing ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
        </button>
        <div>
          <h2 className="font-black text-2xl text-white mb-2">
            {rant.title ? `"${rant.title}"` : `RANT #${String(rant.rantNumber).padStart(3, "0")}`}
          </h2>
          <p className="text-gray-400 text-sm">
            {rant.callerNickname || "Anonymous"} &middot; {Math.floor((rant.duration || 0) / 60)}:{String((rant.duration || 0) % 60).padStart(2, "0")} &middot; {rant.votes} fires
          </p>
        </div>
      </div>
    </div>
  );
}

function MiniRantCard({ rant, rank }: { rant: Rant; rank: number }) {
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

  return (
    <div className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
      <span className="text-2xl font-black text-gray-700 w-8 text-center">{rank}</span>
      <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 hover:bg-white/20">
        {playing ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
      </button>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-white text-sm truncate">
          {rant.title ? `"${rant.title}"` : `RANT #${String(rant.rantNumber).padStart(3, "0")}`}
        </p>
        <p className="text-gray-500 text-xs">{rant.callerNickname || "Anonymous"}</p>
      </div>
      <div className="flex items-center gap-1 text-red-400 text-sm font-bold">
        <Flame className="w-3.5 h-3.5" /> {rant.votes}
      </div>
    </div>
  );
}

export default function Home() {
  const statsQ = useQuery({ queryKey: ["stats"], queryFn: api.stats.global });
  const callsQ = useQuery({ queryKey: ["calls"], queryFn: api.stats.calls });
  const trendingQ = useQuery({ queryKey: ["trending"], queryFn: api.rants.trending });
  const featuredQ = useQuery({ queryKey: ["featured"], queryFn: api.rants.featured });
  const topByLineQ = useQuery({ queryKey: ["topByLine"], queryFn: api.rants.topByLine });

  const stats = statsQ.data;
  const calls = callsQ.data;
  const trending = trendingQ.data || [];
  const featured = featuredQ.data;

  return (
    <div className="bg-[#0a0e1a] min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#cc0000]/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 pt-20 pb-16 relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#cc0000]/10 border border-[#cc0000]/20 px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#cc0000] rounded-full animate-pulse" />
              <span className="text-[#cc0000] text-xs font-bold uppercase tracking-widest">Live Now</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
              {"America's"}<br />
              <span className="text-[#cc0000]">Rant Line</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
              Call in. Sound off. Let America hear your voice. Three lines. Every opinion. No filter.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
              <Link href="/leave-a-rant" className="bg-[#cc0000] hover:bg-[#aa0000] text-white font-black text-sm px-8 py-3 rounded-full no-underline transition-colors inline-flex items-center gap-2">
                <Phone className="w-4 h-4" /> LEAVE A RANT &mdash; $2.99
              </Link>
              <Link href="/rants" className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-8 py-3 rounded-full no-underline transition-colors inline-flex items-center gap-2">
                LISTEN NOW <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <Phone className="w-4 h-4" />
              <span className="font-mono font-bold text-white">1-888-460-RANT</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-4 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Mic, label: "Total Rants", value: stats?.totalRants ?? 0 },
            { icon: Flame, label: "Total Votes", value: stats?.totalVotes ?? 0 },
            { icon: Users, label: "Callers", value: stats?.totalCallers ?? 0 },
            { icon: TrendingUp, label: "Total Plays", value: stats?.totalPlays ?? 0 },
          ].map((s) => (
            <div key={s.label} className="bg-[#111827] border border-white/5 rounded-xl p-5 text-center">
              <s.icon className="w-5 h-5 mx-auto text-[#cc0000] mb-2" />
              <div className="text-2xl font-black text-white">{s.value.toLocaleString()}</div>
              <div className="text-gray-500 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { key: "maga", label: "MAGA LINE", emoji: "🟥", color: "border-red-600/30", value: calls?.maga_calls ?? 0 },
            { key: "blue", label: "BLUE LINE", emoji: "🟦", color: "border-blue-600/30", value: calls?.blue_calls ?? 0 },
            { key: "neutral", label: "NEUTRAL LINE", emoji: "⬜", color: "border-gray-600/30", value: calls?.neutral_calls ?? 0 },
          ].map((line) => (
            <div key={line.key} className={`bg-[#111827] border ${line.color} rounded-xl p-5 text-center`}>
              <div className="text-3xl mb-2">{line.emoji}</div>
              <div className="font-black text-white text-sm">{line.label}</div>
              <div className="text-2xl font-black text-white mt-2">{line.value.toLocaleString()}</div>
              <div className="text-gray-500 text-xs">total calls</div>
            </div>
          ))}
        </div>
      </section>

      {featured && (
        <section className="max-w-7xl mx-auto px-4 mb-12">
          <FeaturedRant rant={featured} />
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-black text-xl text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#cc0000]" /> TRENDING RANTS
          </h2>
          <Link href="/rants" className="text-[#cc0000] text-xs font-bold no-underline hover:underline flex items-center gap-1">
            VIEW ALL <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="bg-[#111827] border border-white/5 rounded-xl p-5">
          {trending.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No rants yet. Be the first to call in!</p>
          ) : (
            trending.slice(0, 5).map((r, i) => <MiniRantCard key={r.id} rant={r} rank={i + 1} />)
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-[#cc0000]/10 to-[#1e40af]/10 border border-white/10 rounded-2xl p-10 text-center">
          <h2 className="font-black text-3xl text-white mb-4">Ready to Sound Off?</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Pick your line. Record your rant. Let America hear what you really think.
          </p>
          <Link href="/leave-a-rant" className="bg-[#cc0000] hover:bg-[#aa0000] text-white font-black text-sm px-10 py-4 rounded-full no-underline transition-colors inline-flex items-center gap-2">
            <Phone className="w-5 h-5" /> CALL NOW &mdash; $2.99
          </Link>
        </div>
      </section>
    </div>
  );
}
