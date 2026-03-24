import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Shield, Lock, Search, CheckCircle, XCircle, Star, Trash2, Play, Pause, BarChart3 } from "lucide-react";
import { api, type Rant } from "@/lib/api";

export default function AdminDashboard() {
  const [apiKey, setApiKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [keyInput, setKeyInput] = useState("");

  if (!authenticated) {
    return (
      <div className="bg-[#0a0e1a] min-h-screen flex items-center justify-center">
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-10 max-w-sm w-full text-center">
          <Lock className="w-12 h-12 text-[#cc0000] mx-auto mb-4" />
          <h1 className="font-black text-xl text-white mb-2">ADMIN ACCESS</h1>
          <p className="text-gray-500 text-sm mb-6">Enter your admin API key to continue</p>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Admin API Key"
            className="w-full bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#cc0000]/50 mb-4"
          />
          <button
            onClick={() => { setApiKey(keyInput); setAuthenticated(true); }}
            disabled={!keyInput}
            className="w-full bg-[#cc0000] hover:bg-[#aa0000] disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
          >
            ACCESS DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  return <AdminPanel apiKey={apiKey} />;
}

function AdminPanel({ apiKey }: { apiKey: string }) {
  const [tab, setTab] = useState<"pending" | "approved" | "stats">("pending");
  const queryClient = useQueryClient();
  const headers = { "x-admin-key": apiKey };

  const pendingQ = useQuery({
    queryKey: ["admin-pending"],
    queryFn: async () => {
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${base}/api/admin/rants?status=pending`, { headers });
      if (!res.ok) throw new Error("Unauthorized");
      return res.json() as Promise<{ rants: Rant[] }>;
    },
  });

  const approvedQ = useQuery({
    queryKey: ["admin-approved"],
    queryFn: async () => {
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${base}/api/admin/rants?status=approved`, { headers });
      if (!res.ok) throw new Error("Unauthorized");
      return res.json() as Promise<{ rants: Rant[] }>;
    },
  });

  const statsQ = useQuery({ queryKey: ["stats"], queryFn: api.stats.global });
  const callsQ = useQuery({ queryKey: ["calls"], queryFn: api.stats.calls });

  const moderateMutation = useMutation({
    mutationFn: async ({ id, action }: { id: string; action: string }) => {
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${base}/api/admin/rants/${id}/${action}`, {
        method: "POST",
        headers,
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pending"] });
      queryClient.invalidateQueries({ queryKey: ["admin-approved"] });
    },
  });

  const pending = pendingQ.data?.rants || [];
  const approved = approvedQ.data?.rants || [];
  const stats = statsQ.data;
  const calls = callsQ.data;

  return (
    <div className="bg-[#0a0e1a] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-6 h-6 text-[#cc0000]" />
          <h1 className="font-black text-2xl text-white">ADMIN DASHBOARD</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Rants", value: stats?.totalRants ?? 0 },
            { label: "Approved", value: stats?.approvedRants ?? 0 },
            { label: "Pending", value: pending.length },
            { label: "Total Callers", value: stats?.totalCallers ?? 0 },
          ].map((s) => (
            <div key={s.label} className="bg-[#111827] border border-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-white">{s.value.toLocaleString()}</div>
              <div className="text-gray-500 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {calls && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-red-600/10 border border-red-600/20 rounded-xl p-4 text-center">
              <div className="text-xl font-black text-red-400">{calls.maga_calls}</div>
              <div className="text-gray-500 text-xs">MAGA Calls</div>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-xl p-4 text-center">
              <div className="text-xl font-black text-blue-400">{calls.blue_calls}</div>
              <div className="text-gray-500 text-xs">Blue Calls</div>
            </div>
            <div className="bg-gray-600/10 border border-gray-600/20 rounded-xl p-4 text-center">
              <div className="text-xl font-black text-gray-400">{calls.neutral_calls}</div>
              <div className="text-gray-500 text-xs">Neutral Calls</div>
            </div>
          </div>
        )}

        <div className="flex gap-1 bg-[#111827] rounded-lg p-1 mb-6 w-fit">
          {(["pending", "approved", "stats"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-colors capitalize ${
                tab === t ? "bg-[#cc0000] text-white" : "text-gray-500 hover:text-white"
              }`}
            >
              {t === "pending" ? `Pending (${pending.length})` : t === "approved" ? `Approved (${approved.length})` : "Stats"}
            </button>
          ))}
        </div>

        {tab === "stats" ? (
          <div className="bg-[#111827] border border-white/5 rounded-xl p-6">
            <h3 className="font-black text-white text-sm mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#cc0000]" /> PLATFORM STATISTICS
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0a0e1a] rounded-lg p-4">
                <div className="text-gray-500 text-xs mb-1">Total Plays</div>
                <div className="text-xl font-black text-white">{(stats?.totalPlays ?? 0).toLocaleString()}</div>
              </div>
              <div className="bg-[#0a0e1a] rounded-lg p-4">
                <div className="text-gray-500 text-xs mb-1">Total Votes</div>
                <div className="text-xl font-black text-white">{(stats?.totalVotes ?? 0).toLocaleString()}</div>
              </div>
              <div className="bg-[#0a0e1a] rounded-lg p-4">
                <div className="text-gray-500 text-xs mb-1">Featured Rants</div>
                <div className="text-xl font-black text-white">{stats?.featuredRants ?? 0}</div>
              </div>
              <div className="bg-[#0a0e1a] rounded-lg p-4">
                <div className="text-gray-500 text-xs mb-1">Total Calls</div>
                <div className="text-xl font-black text-white">{(calls?.total_calls ?? 0).toLocaleString()}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {(tab === "pending" ? pending : approved).length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500">No {tab} rants</p>
              </div>
            ) : (
              (tab === "pending" ? pending : approved).map((rant) => (
                <AdminRantRow
                  key={rant.id}
                  rant={rant}
                  isPending={tab === "pending"}
                  onAction={(action) => moderateMutation.mutate({ id: rant.id, action })}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminRantRow({
  rant,
  isPending,
  onAction,
}: {
  rant: Rant;
  isPending: boolean;
  onAction: (action: string) => void;
}) {
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

  const catColor = rant.category === "maga" ? "bg-red-600" : rant.category === "blue" ? "bg-blue-600" : "bg-gray-600";

  return (
    <div className="bg-[#111827] border border-white/5 rounded-xl p-4 flex items-center gap-4">
      <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 hover:bg-white/20">
        {playing ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`${catColor} text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded`}>{rant.category}</span>
          <span className="text-gray-600 text-xs">#{String(rant.rantNumber).padStart(3, "0")}</span>
        </div>
        <p className="font-bold text-white text-sm truncate">
          {rant.title || `Rant #${rant.rantNumber}`}
        </p>
        <p className="text-gray-500 text-xs">{rant.callerNickname || "Anonymous"}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {isPending ? (
          <>
            <button onClick={() => onAction("approve")} className="p-2 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 transition-colors" title="Approve">
              <CheckCircle className="w-4 h-4" />
            </button>
            <button onClick={() => onAction("reject")} className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors" title="Reject">
              <XCircle className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => onAction("feature")} className="p-2 rounded-lg bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 transition-colors" title="Feature">
              <Star className="w-4 h-4" />
            </button>
            <button onClick={() => onAction("reject")} className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors" title="Remove">
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
