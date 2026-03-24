import { useState, useRef } from "react";
import { Play, Pause, Flame, ThumbsDown, Clock, Share2 } from "lucide-react";
import { api, type Rant } from "@/lib/api";

function timeAgo(dateStr: string) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function categoryColor(cat: string) {
  if (cat === "maga") return "bg-red-600";
  if (cat === "blue") return "bg-blue-600";
  return "bg-gray-600";
}

export default function RantCard({ rant, showCategory = true }: { rant: Rant; showCategory?: boolean }) {
  const [votes, setVotes] = useState(rant.votes);
  const [downvotes, setDownvotes] = useState(rant.downvotes);
  const [voted, setVoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(rant.audioUrl);
      audioRef.current.onended = () => setPlaying(false);
      api.rants.play(rant.id).catch(() => {});
    }
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  const handleVote = async () => {
    if (voted) return;
    try {
      const res = await api.rants.vote(rant.id);
      setVotes(res.votes);
      setVoted(true);
    } catch {}
  };

  const handleDownvote = async () => {
    if (downvoted) return;
    try {
      const res = await api.rants.downvote(rant.id);
      setDownvotes(res.downvotes);
      setDownvoted(true);
    } catch {}
  };

  const location = [rant.callerCity, rant.callerState].filter(Boolean).join(", ");

  return (
    <div className="bg-[#111827] border border-white/5 rounded-xl p-5 hover:border-[#cc0000]/30 transition-colors">
      <div className="flex items-start gap-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 hover:bg-white/20 transition-colors"
        >
          {playing ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {showCategory && (
              <span className={`${categoryColor(rant.category)} text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded`}>
                {rant.category}
              </span>
            )}
            {rant.topic && (
              <span className="bg-white/10 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                {rant.topic}
              </span>
            )}
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {Math.floor((rant.duration || 0) / 60)}:{String((rant.duration || 0) % 60).padStart(2, "0")}
            </span>
            <span className="text-gray-600 text-xs">{timeAgo(rant.createdAt)}</span>
            {rant.plays > 0 && <span className="text-gray-600 text-xs">{rant.plays.toLocaleString()} plays</span>}
          </div>
          <h3 className="font-black text-white text-base mb-1 leading-tight">
            {rant.title ? `"${rant.title}"` : `RANT #${String(rant.rantNumber).padStart(3, "0")}`}
          </h3>
          <p className="text-gray-500 text-xs italic">
            {rant.callerNickname || "Anonymous"}{location ? ` from ${location}` : ""}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <button
            onClick={handleVote}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-colors ${
              voted
                ? "bg-red-600 text-white"
                : "bg-white/5 text-gray-400 hover:bg-red-600/20 hover:text-red-400"
            }`}
          >
            <Flame className="w-4 h-4" />
            {votes.toLocaleString()}
          </button>
          <button
            onClick={handleDownvote}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-colors ${
              downvoted
                ? "bg-gray-600 text-white"
                : "bg-white/5 text-gray-500 hover:bg-gray-600/20"
            }`}
          >
            <ThumbsDown className="w-3 h-3" />
            {downvotes}
          </button>
        </div>
      </div>
    </div>
  );
}
