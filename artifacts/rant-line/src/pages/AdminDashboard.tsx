import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Play, Check, X, Star, RefreshCw, Users, Mic, Settings, List,
  BarChart2, Trophy, LogOut, Clock, AlertCircle,
  DollarSign, TrendingUp, Search, Bell, Activity, Pause,
  Phone, Mail, MapPin, Calendar, Hash, ThumbsUp, ThumbsDown,
  Eye, CheckCircle, XCircle, Zap, Award, Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api, type Rant, type AdminCaller, type RevenueData } from "@/lib/api";

type Page = "overview" | "rants" | "featured" | "leaderboard" | "analytics" | "callers" | "revenue";

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
function timeAgo(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return d.toLocaleDateString();
}
function maskPhone(p: string | null) {
  if (!p) return "N/A";
  return p.length > 6 ? p.slice(0, 3) + "***" + p.slice(-4) : "***";
}

const Waveform = ({ active = false }: { active?: boolean }) => (
  <div className="flex items-center gap-0.5 h-5 mx-2">
    {[40, 70, 40, 100, 60, 30, 80, 50, 90, 40].map((h, i) => (
      <div key={i} className={`w-0.5 ${active ? "bg-white/60" : "bg-gray-500"} rounded-full`} style={{ height: `${h}%` }} />
    ))}
  </div>
);

const lineColor = (cat: string) => {
  if (cat === "maga") return "text-red-400 bg-red-500/10 border-red-500/30";
  if (cat === "blue") return "text-blue-400 bg-blue-500/10 border-blue-500/30";
  return "text-gray-400 bg-gray-500/10 border-gray-500/30";
};
const lineBg = (cat: string) => {
  if (cat === "maga") return "bg-red-500";
  if (cat === "blue") return "bg-blue-500";
  return "bg-gray-500";
};

export default function AdminDashboard() {
  const [page, setPage] = useState<Page>("overview");
  const [activeTab, setActiveTab] = useState("pending");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [revPeriod, setRevPeriod] = useState<"week" | "month" | "year">("week");
  const queryClient = useQueryClient();
  const [audio] = useState(new Audio());

  // Setup audio event listeners
  useState(() => {
    audio.onended = () => setPlayingId(null);
  });

  const togglePlay = (rant: Rant) => {
    if (playingId === rant.id) {
      audio.pause();
      setPlayingId(null);
    } else {
      audio.src = rant.audioUrl;
      audio.play().catch(e => console.error("Playback failed:", e));
      setPlayingId(rant.id);
    }
  };

  const { data: globalStats } = useQuery({ queryKey: ["globalStats"], queryFn: api.stats.global, enabled: authenticated });
  const { data: callStats } = useQuery({ queryKey: ["callStats"], queryFn: api.stats.calls, enabled: authenticated });
  const { data: callsToday } = useQuery({ queryKey: ["callsToday"], queryFn: api.stats.callsToday, enabled: authenticated });
  const { data: topRanters } = useQuery({ queryKey: ["topRanters"], queryFn: () => api.stats.topRanters(20), enabled: authenticated });
  const { data: catBreakdown } = useQuery({ queryKey: ["catBreakdown"], queryFn: api.stats.categoryBreakdown, enabled: authenticated });
  const { data: topics } = useQuery({ queryKey: ["topics"], queryFn: api.stats.topics, enabled: authenticated });

  const { data: allRants, isLoading: loadingAll } = useQuery({
    queryKey: ["adminRants", adminKey],
    queryFn: () => api.admin.rants(adminKey),
    enabled: authenticated,
  });
  const { data: pendingRants } = useQuery({
    queryKey: ["adminPending", adminKey],
    queryFn: () => api.admin.pending(adminKey),
    enabled: authenticated,
  });
  const { data: activityLog } = useQuery({
    queryKey: ["adminActivity", adminKey],
    queryFn: () => api.admin.activity(adminKey),
    enabled: authenticated,
  });
  const { data: revenueData } = useQuery({
    queryKey: ["adminRevenue", adminKey, revPeriod],
    queryFn: () => api.admin.revenue(adminKey, revPeriod),
    enabled: authenticated,
  });
  const { data: callersList } = useQuery({
    queryKey: ["adminCallers", adminKey],
    queryFn: () => api.admin.callers(adminKey),
    enabled: authenticated,
  });

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["adminRants"] });
    queryClient.invalidateQueries({ queryKey: ["adminPending"] });
    queryClient.invalidateQueries({ queryKey: ["globalStats"] });
    queryClient.invalidateQueries({ queryKey: ["adminActivity"] });
  };

  const [mutatingId, setMutatingId] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const makeMutation = (fn: (id: string) => Promise<any>) => useMutation({
    mutationFn: (id: string) => { setMutatingId(id); setMutationError(null); return fn(id); },
    onSuccess: () => { setMutatingId(null); invalidateAll(); },
    onError: (err: Error) => { setMutatingId(null); setMutationError(err.message); },
  });

  const approveMut = makeMutation((id) => api.admin.approve(id, adminKey));
  const rejectMut = makeMutation((id) => api.admin.reject(id, adminKey));
  const featureMut = makeMutation((id) => api.admin.feature(id, adminKey));
  const unfeatureMut = makeMutation((id) => api.admin.unfeature(id, adminKey));
  const bulkApproveMut = useMutation({
    mutationFn: () => api.admin.bulkApprove(adminKey),
    onSuccess: invalidateAll,
    onError: (err: Error) => setMutationError(err.message),
  });

  const totalToday = callsToday?.total_calls ?? 0;

  const handleLogin = async () => {
    setAuthError(null);
    try {
      await api.admin.rants(adminKey);
      setAuthenticated(true);
    } catch {
      setAuthError("Invalid admin key. Please try again.");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] text-white flex items-center justify-center">
        <div className="bg-[#111827] border border-[#cc0000]/30 rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <AlertCircle className="w-12 h-12 text-[#cc0000] mx-auto mb-3" />
            <h2 className="text-2xl font-black uppercase">Admin Access</h2>
            <p className="text-gray-500 text-sm mt-2">Enter the admin key to continue</p>
          </div>
          {authError && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 text-center text-red-300 text-sm mb-4">{authError}</div>
          )}
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Admin API Key"
            className="w-full bg-[#0a0e1a] border border-[#cc0000]/30 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#cc0000] mb-4"
            onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
          />
          <Button onClick={handleLogin} className="w-full bg-[#cc0000] hover:bg-red-700 text-white font-black py-3 rounded-xl">
            Access Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const SIDEBAR_ITEMS: { icon: React.ReactNode; label: string; key: Page }[] = [
    { icon: <Activity className="w-4 h-4" />, label: "Overview", key: "overview" },
    { icon: <List className="w-4 h-4" />, label: "Incoming Rants", key: "rants" },
    { icon: <Star className="w-4 h-4" />, label: "Featured Mgmt", key: "featured" },
    { icon: <Trophy className="w-4 h-4" />, label: "Leaderboard", key: "leaderboard" },
    { icon: <BarChart2 className="w-4 h-4" />, label: "Analytics", key: "analytics" },
    { icon: <Users className="w-4 h-4" />, label: "Callers", key: "callers" },
    { icon: <DollarSign className="w-4 h-4" />, label: "Revenue", key: "revenue" },
  ];

  const rants = activeTab === "pending" ? (pendingRants ?? []) : (allRants ?? []);
  const filtered = searchTerm
    ? rants.filter((r) =>
        (r.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.callerNickname || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.category || "").toLowerCase().includes(searchTerm.toLowerCase())
      )
    : rants;

  const featuredRants = (allRants ?? []).filter((r) => r.featured);
  const approvedCount = (allRants ?? []).filter((r) => !r.featured).length;

  const RantActionButtons = ({ rant }: { rant: Rant }) => {
    const isBusy = mutatingId === rant.id;
    return (
      <div className="flex items-center justify-end gap-1">
        {!rant.approved && (
          <Button size="icon" variant="outline" className="h-7 w-7 bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500/20 rounded-md" title="Approve" onClick={() => approveMut.mutate(rant.id)} disabled={isBusy}><Check className="h-3.5 w-3.5" /></Button>
        )}
        <Button size="icon" variant="outline" className="h-7 w-7 bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20 rounded-md" title="Reject" onClick={() => rejectMut.mutate(rant.id)} disabled={isBusy}><X className="h-3.5 w-3.5" /></Button>
        {!rant.featured && (
          <Button size="icon" variant="outline" className="h-7 w-7 bg-yellow-500/10 border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20 rounded-md" title="Feature" onClick={() => featureMut.mutate(rant.id)} disabled={isBusy}><Star className="h-3.5 w-3.5" /></Button>
        )}
      </div>
    );
  };

  const RantTable = ({ data, loading, showActions = true }: { data: Rant[]; loading?: boolean; showActions?: boolean }) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-800/30">
          <TableRow className="border-[#cc0000]/30 hover:bg-transparent">
            <TableHead className="text-gray-500 font-bold text-xs w-16">#</TableHead>
            <TableHead className="text-gray-500 font-bold text-xs">Caller</TableHead>
            <TableHead className="text-gray-500 font-bold text-xs hidden sm:table-cell">Time</TableHead>
            <TableHead className="text-gray-500 font-bold text-xs w-16">Len</TableHead>
            <TableHead className="text-gray-500 font-bold text-xs">Audio</TableHead>
            <TableHead className="text-gray-500 font-bold text-xs">Line</TableHead>
            <TableHead className="text-gray-500 font-bold text-xs">Status</TableHead>
            <TableHead className="text-gray-500 font-bold text-xs hidden md:table-cell">Votes</TableHead>
            {showActions && <TableHead className="text-gray-500 font-bold text-xs text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((rant) => (
            <TableRow key={rant.id} className="border-[#cc0000]/20 hover:bg-gray-800/30 transition-colors">
              <TableCell className="font-mono text-gray-400 text-xs">#{rant.rantNumber}</TableCell>
              <TableCell>
                <div className="font-semibold text-sm">{rant.callerNickname || "Anonymous"}</div>
                <div className="text-gray-500 text-xs">{rant.callerState || "US"}</div>
              </TableCell>
              <TableCell className="text-gray-400 text-xs hidden sm:table-cell">{timeAgo(rant.createdAt)}</TableCell>
              <TableCell className="text-gray-400 text-xs">{formatDuration(rant.duration)}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Button size="icon" variant="ghost" onClick={() => togglePlay(rant)} className="h-7 w-7 rounded-full bg-white/[0.08] text-white hover:bg-[#cc0000] hover:text-white">
                    {playingId === rant.id ? <Pause className="h-3 w-3 fill-current" /> : <Play className="h-3 w-3 fill-current" />}
                  </Button>
                  <Waveform active={playingId === rant.id} />
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={`font-medium text-xs border ${lineColor(rant.category)}`}>{rant.category || "N/A"}</Badge>
              </TableCell>
              <TableCell>
                {rant.featured ? (
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-[10px]">Featured</Badge>
                ) : rant.approved ? (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px]">Approved</Badge>
                ) : (
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-[10px]">Pending</Badge>
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-bold text-sm">{rant.votes}</span>
                  <span className="text-gray-600">/</span>
                  <span className="text-red-400 text-xs">{rant.downvotes}</span>
                </div>
              </TableCell>
              {showActions && <TableCell className="text-right"><RantActionButtons rant={rant} /></TableCell>}
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow><TableCell colSpan={showActions ? 9 : 8} className="text-center py-10 text-gray-500">{loading ? "Loading..." : "No rants found"}</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Rants Today", val: String(totalToday), sub: "Total calls", icon: <Mic className="w-5 h-5" />, color: "text-blue-400 bg-blue-500/10" },
          { label: "Total Rants", val: (globalStats?.totalRants ?? 0).toLocaleString(), sub: `${globalStats?.approvedRants ?? 0} approved`, icon: <Hash className="w-5 h-5" />, color: "text-green-400 bg-green-500/10" },
          { label: "Total Plays", val: (globalStats?.totalPlays ?? 0).toLocaleString(), sub: "All time", icon: <Eye className="w-5 h-5" />, color: "text-yellow-400 bg-yellow-500/10" },
          { label: "Pending Review", val: String((pendingRants ?? []).length), sub: "Awaiting moderation", icon: <AlertCircle className="w-5 h-5" />, color: "text-orange-400 bg-orange-500/10" },
        ].map((s) => (
          <Card key={s.label} className="bg-gray-900/50 border-[#cc0000]/30">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${s.color} flex items-center justify-center shrink-0`}>{s.icon}</div>
              <div>
                <p className="text-xs font-medium text-gray-400">{s.label}</p>
                <h3 className="text-2xl font-black text-white leading-none">{s.val}</h3>
                <p className="text-xs text-gray-600 mt-0.5">{s.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-900/50 border border-[#cc0000]/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-white text-base">Line Distribution</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "MAGA Line", val: callStats?.maga_calls ?? 0, color: "bg-red-500", pct: callStats ? Math.round((callStats.maga_calls / Math.max(callStats.total_calls, 1)) * 100) : 0 },
              { label: "Blue Line", val: callStats?.blue_calls ?? 0, color: "bg-blue-500", pct: callStats ? Math.round((callStats.blue_calls / Math.max(callStats.total_calls, 1)) * 100) : 0 },
              { label: "Neutral Line", val: callStats?.neutral_calls ?? 0, color: "bg-gray-400", pct: callStats ? Math.round((callStats.neutral_calls / Math.max(callStats.total_calls, 1)) * 100) : 0 },
            ].map((l) => (
              <div key={l.label} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300 font-semibold">{l.label}</span>
                  <span className="text-gray-400">{l.val} calls ({l.pct}%)</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full ${l.color} rounded-full transition-all`} style={{ width: `${l.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-black text-white">{globalStats?.totalCallers ?? 0}</p>
              <p className="text-xs text-gray-500">Total Callers</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">{globalStats?.totalVotes ?? 0}</p>
              <p className="text-xs text-gray-500">Total Votes</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">{globalStats?.featuredRants ?? 0}</p>
              <p className="text-xs text-gray-500">Featured</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-[#cc0000]/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-white text-base">Live Activity</h3>
            <div className="flex items-center gap-1.5 text-xs text-green-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span>Live
            </div>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-[250px]">
            {(activityLog ?? []).slice(0, 12).map((a, i) => (
              <div key={i} className="flex gap-3 text-xs">
                <span className="text-gray-600 font-mono shrink-0 mt-0.5">{timeAgo(a.createdAt)}</span>
                <span className="text-blue-300 leading-relaxed">{a.action}: {a.details || a.targetId}</span>
              </div>
            ))}
            {(activityLog ?? []).length === 0 && <p className="text-gray-600 text-xs">No recent activity</p>}
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-[#cc0000]/30 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-white text-base">Recent Rants</h3>
          <Button variant="ghost" size="sm" className="text-[#cc0000] hover:text-red-400 text-xs" onClick={() => setPage("rants")}>View All &rarr;</Button>
        </div>
        <RantTable data={(allRants ?? []).slice(0, 5)} loading={loadingAll} />
      </div>
    </div>
  );

  const renderRants = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-black">Incoming Voicemails</h2>
          <Badge className="bg-gray-800 text-gray-300 border-[#cc0000]/40">{filtered.length} Total</Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search rants..." className="pl-8 pr-4 py-2 bg-gray-800 border border-[#cc0000]/30 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#cc0000] w-44" />
          </div>
          {(pendingRants ?? []).length > 0 && (
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs" onClick={() => bulkApproveMut.mutate()} disabled={bulkApproveMut.isPending}>
              <CheckCircle className="w-3 h-3 mr-1" /> Approve All ({(pendingRants ?? []).length})
            </Button>
          )}
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-9 w-9" onClick={invalidateAll}><RefreshCw className="w-4 h-4" /></Button>
        </div>
      </div>

      {mutationError && (
        <div className="bg-red-900/30 border border-red-700 rounded-xl p-3 text-center text-red-300 text-sm font-medium mb-4">{mutationError}</div>
      )}

      <div className="bg-gray-900/40 rounded-xl border border-[#cc0000]/30">
        <div className="p-3 border-b border-[#cc0000]/30">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-800/60 border border-[#cc0000]/30 p-0.5">
              <TabsTrigger value="all" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-xs px-3">All ({(allRants ?? []).length})</TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-900/50 data-[state=active]:text-yellow-300 text-xs px-3">Pending ({(pendingRants ?? []).length})</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <RantTable data={filtered} loading={loadingAll} />
        <div className="p-3 bg-[#0a0e1a] border-t border-[#cc0000]/20 text-xs text-gray-500">
          Showing {filtered.length} of {(allRants ?? []).length} rants
        </div>
      </div>
    </div>
  );

  const renderFeatured = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black">Featured Management</h2>
          <p className="text-gray-500 text-xs mt-1">Manage which rants are highlighted on the homepage</p>
        </div>
        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">{featuredRants.length} Featured</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Currently Featured", val: featuredRants.length, icon: <Star className="w-5 h-5" />, color: "text-yellow-400 bg-yellow-500/10" },
          { label: "Total Approved", val: approvedCount, icon: <CheckCircle className="w-5 h-5" />, color: "text-green-400 bg-green-500/10" },
          { label: "Pending Review", val: (pendingRants ?? []).length, icon: <Clock className="w-5 h-5" />, color: "text-orange-400 bg-orange-500/10" },
        ].map((s) => (
          <Card key={s.label} className="bg-gray-900/50 border-[#cc0000]/30">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${s.color} flex items-center justify-center shrink-0`}>{s.icon}</div>
              <div>
                <p className="text-xs text-gray-400">{s.label}</p>
                <h3 className="text-2xl font-black text-white leading-none">{s.val}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-900/50 border border-[#cc0000]/30 rounded-xl">
        <div className="p-4 border-b border-[#cc0000]/30">
          <h3 className="font-black text-white text-sm flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /> Currently Featured Rants</h3>
        </div>
        {featuredRants.length > 0 ? (
          <div className="divide-y divide-[#cc0000]/20">
            {featuredRants.map((rant) => (
              <div key={rant.id} className="p-4 flex items-center gap-4 hover:bg-gray-800/30 transition-colors">
                <div className={`w-2 h-12 rounded-full ${lineBg(rant.category)}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{rant.title || `Rant #${rant.rantNumber}`}</span>
                    <Badge variant="outline" className={`text-[10px] border ${lineColor(rant.category)}`}>{rant.category}</Badge>
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    by {rant.callerNickname || "Anonymous"} &middot; {rant.callerState || "US"} &middot; {formatDuration(rant.duration)} &middot; {rant.votes} votes &middot; {rant.plays} plays
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" onClick={() => togglePlay(rant)} className="h-8 w-8 rounded-full bg-white/[0.08] text-white hover:bg-[#cc0000]">
                    {playingId === rant.id ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                  </Button>
                  <Button size="sm" variant="outline" className="bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20 text-xs" onClick={() => unfeatureMut.mutate(rant.id)} disabled={unfeatureMut.isPending}>Unfeature</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center text-gray-500">
            <Star className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>No featured rants yet</p>
            <p className="text-xs mt-1">Feature a rant from the Incoming Rants page</p>
          </div>
        )}
      </div>

      <div className="bg-gray-900/50 border border-[#cc0000]/30 rounded-xl">
        <div className="p-4 border-b border-[#cc0000]/30">
          <h3 className="font-black text-white text-sm">Top Candidates for Featuring</h3>
          <p className="text-gray-500 text-xs mt-0.5">Highest-voted rants not yet featured</p>
        </div>
        <RantTable data={(allRants ?? []).filter((r) => !r.featured).sort((a, b) => b.votes - a.votes).slice(0, 5)} />
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-black">Leaderboard Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 border border-[#cc0000]/30 rounded-xl">
          <div className="p-4 border-b border-[#cc0000]/30">
            <h3 className="font-black text-white text-sm flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-400" /> Top Ranters by Votes</h3>
          </div>
          <div className="divide-y divide-[#cc0000]/20">
            {(topRanters ?? []).slice(0, 10).map((r, i) => (
              <div key={r.callerId} className="p-3 flex items-center gap-3 hover:bg-gray-800/30 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${i === 0 ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : i === 1 ? "bg-gray-400/20 text-gray-300 border border-gray-400/30" : i === 2 ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : "bg-gray-800 text-gray-500"}`}>
                  {i < 3 ? [<Crown key="c" className="w-3.5 h-3.5" />, <Award key="a" className="w-3.5 h-3.5" />, <Award key="b" className="w-3.5 h-3.5" />][i] : `#${i + 1}`}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{r.nickname || "Anonymous"}</div>
                  <div className="text-xs text-gray-500">{r.state || "US"} &middot; {r.totalRants} rants</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-sm text-white">{r.totalVotes.toLocaleString()}</div>
                  <div className="text-[10px] text-gray-500">votes</div>
                </div>
              </div>
            ))}
            {(topRanters ?? []).length === 0 && <div className="p-8 text-center text-gray-500 text-sm">No ranters yet</div>}
          </div>
        </div>

        <div className="bg-gray-900/50 border border-[#cc0000]/30 rounded-xl">
          <div className="p-4 border-b border-[#cc0000]/30">
            <h3 className="font-black text-white text-sm flex items-center gap-2"><BarChart2 className="w-4 h-4 text-blue-400" /> Top Rants by Votes</h3>
          </div>
          <div className="divide-y divide-[#cc0000]/20">
            {(allRants ?? []).sort((a, b) => b.votes - a.votes).slice(0, 10).map((rant, i) => (
              <div key={rant.id} className="p-3 flex items-center gap-3 hover:bg-gray-800/30 transition-colors">
                <span className="text-gray-600 font-mono text-xs w-6 text-center">#{i + 1}</span>
                <div className={`w-1.5 h-8 rounded-full ${lineBg(rant.category)}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{rant.title || `Rant #${rant.rantNumber}`}</div>
                  <div className="text-xs text-gray-500">{rant.callerNickname || "Anonymous"} &middot; {rant.plays} plays</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-green-400"><ThumbsUp className="w-3 h-3" /><span className="text-xs font-bold">{rant.votes}</span></div>
                  <div className="flex items-center gap-1 text-red-400"><ThumbsDown className="w-3 h-3" /><span className="text-xs font-bold">{rant.downvotes}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-black">Analytics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Rants", val: (globalStats?.totalRants ?? 0).toLocaleString(), icon: <Mic className="w-5 h-5" />, color: "text-blue-400 bg-blue-500/10" },
          { label: "Total Plays", val: (globalStats?.totalPlays ?? 0).toLocaleString(), icon: <Eye className="w-5 h-5" />, color: "text-green-400 bg-green-500/10" },
          { label: "Total Votes", val: (globalStats?.totalVotes ?? 0).toLocaleString(), icon: <ThumbsUp className="w-5 h-5" />, color: "text-yellow-400 bg-yellow-500/10" },
          { label: "Total Callers", val: (globalStats?.totalCallers ?? 0).toLocaleString(), icon: <Users className="w-5 h-5" />, color: "text-purple-400 bg-purple-500/10" },
        ].map((s) => (
          <Card key={s.label} className="bg-gray-900/50 border-[#cc0000]/30">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${s.color} flex items-center justify-center shrink-0`}>{s.icon}</div>
              <div>
                <p className="text-xs text-gray-400">{s.label}</p>
                <h3 className="text-2xl font-black text-white leading-none">{s.val}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 border border-[#cc0000]/30 rounded-xl p-5">
          <h3 className="font-black text-white text-sm mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {(catBreakdown ?? []).slice(0, 10).map((cat) => (
              <div key={cat.topic} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-semibold capitalize">{cat.topic}</span>
                  <span className="text-gray-500">{cat.count} ({cat.percentage}%)</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#cc0000] rounded-full transition-all" style={{ width: `${cat.percentage}%` }}></div>
                </div>
              </div>
            ))}
            {(catBreakdown ?? []).length === 0 && <p className="text-gray-500 text-xs">No data yet</p>}
          </div>
        </div>

        <div className="bg-gray-900/50 border border-[#cc0000]/30 rounded-xl p-5">
          <h3 className="font-black text-white text-sm mb-4">Trending Topics</h3>
          <div className="flex flex-wrap gap-2">
            {(topics ?? []).slice(0, 20).map((t) => (
              <Badge key={t.topic} variant="outline" className="bg-gray-800/50 border-[#cc0000]/30 text-gray-300 text-xs py-1 px-2.5">
                {t.topic} <span className="text-gray-500 ml-1">({t.total})</span>
              </Badge>
            ))}
            {(topics ?? []).length === 0 && <p className="text-gray-500 text-xs">No topics yet</p>}
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-[#cc0000]/30 rounded-xl p-5">
        <h3 className="font-black text-white text-sm mb-4">Calls Today by Line</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "MAGA", val: callsToday?.maga_calls ?? 0, color: "text-red-400", bg: "bg-red-500" },
            { label: "Blue", val: callsToday?.blue_calls ?? 0, color: "text-blue-400", bg: "bg-blue-500" },
            { label: "Neutral", val: callsToday?.neutral_calls ?? 0, color: "text-gray-400", bg: "bg-gray-500" },
          ].map((l) => (
            <div key={l.label} className="text-center">
              <div className={`text-3xl font-black ${l.color}`}>{l.val}</div>
              <div className="text-xs text-gray-500 mt-1">{l.label} Line</div>
              <div className={`h-1 ${l.bg} rounded-full mt-2 mx-auto`} style={{ width: `${Math.max(10, (l.val / Math.max(totalToday, 1)) * 100)}%` }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCallers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black">Callers</h2>
          <p className="text-gray-500 text-xs mt-1">{(callersList ?? []).length} registered callers</p>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-9 w-9" onClick={() => queryClient.invalidateQueries({ queryKey: ["adminCallers"] })}><RefreshCw className="w-4 h-4" /></Button>
      </div>

      <div className="bg-gray-900/40 rounded-xl border border-[#cc0000]/30 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-800/30">
            <TableRow className="border-[#cc0000]/30 hover:bg-transparent">
              <TableHead className="text-gray-500 font-bold text-xs">Nickname</TableHead>
              <TableHead className="text-gray-500 font-bold text-xs">Phone</TableHead>
              <TableHead className="text-gray-500 font-bold text-xs hidden sm:table-cell">Email</TableHead>
              <TableHead className="text-gray-500 font-bold text-xs">Location</TableHead>
              <TableHead className="text-gray-500 font-bold text-xs">Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(callersList ?? []).map((caller) => (
              <TableRow key={caller.id} className="border-[#cc0000]/20 hover:bg-gray-800/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center border border-[#cc0000]/30 text-xs font-bold text-gray-400">
                      {(caller.nickname || "A")[0].toUpperCase()}
                    </div>
                    <span className="font-semibold text-sm">{caller.nickname || "Anonymous"}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-400 text-xs font-mono">
                  <div className="flex items-center gap-1"><Phone className="w-3 h-3" />{maskPhone(caller.phone)}</div>
                </TableCell>
                <TableCell className="text-gray-400 text-xs hidden sm:table-cell">
                  <div className="flex items-center gap-1"><Mail className="w-3 h-3" />{caller.email || "N/A"}</div>
                </TableCell>
                <TableCell className="text-gray-400 text-xs">
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{caller.city && caller.state ? `${caller.city}, ${caller.state}` : caller.state || "N/A"}</div>
                </TableCell>
                <TableCell className="text-gray-400 text-xs">
                  <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(caller.createdAt).toLocaleDateString()}</div>
                </TableCell>
              </TableRow>
            ))}
            {(callersList ?? []).length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center py-10 text-gray-500">No callers yet</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  const renderRevenue = () => {
    const dailyData = revenueData?.dailyRevenue ?? [];
    const maxRev = Math.max(...dailyData.map((d) => d.revenue), 1);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black">Revenue</h2>
          <div className="flex gap-1">
            {(["week", "month", "year"] as const).map((p) => (
              <Button key={p} size="sm" variant={revPeriod === p ? "default" : "ghost"} className={revPeriod === p ? "bg-[#cc0000] text-white text-xs" : "text-gray-400 text-xs"} onClick={() => setRevPeriod(p)}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-900/50 border-[#cc0000]/30">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full text-green-400 bg-green-500/10 flex items-center justify-center shrink-0"><DollarSign className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-gray-400">Total Revenue</p>
                <h3 className="text-2xl font-black text-white leading-none">${(revenueData?.totalRevenue ?? 0).toFixed(2)}</h3>
                <p className="text-xs text-gray-600 mt-0.5">This {revPeriod}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-[#cc0000]/30">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full text-blue-400 bg-blue-500/10 flex items-center justify-center shrink-0"><Hash className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-gray-400">Transactions</p>
                <h3 className="text-2xl font-black text-white leading-none">{revenueData?.totalTransactions ?? 0}</h3>
                <p className="text-xs text-gray-600 mt-0.5">This {revPeriod}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-[#cc0000]/30">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full text-yellow-400 bg-yellow-500/10 flex items-center justify-center shrink-0"><TrendingUp className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-gray-400">Avg / Day</p>
                <h3 className="text-2xl font-black text-white leading-none">${dailyData.length > 0 ? ((revenueData?.totalRevenue ?? 0) / dailyData.length).toFixed(2) : "0.00"}</h3>
                <p className="text-xs text-gray-600 mt-0.5">This {revPeriod}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-900/50 border border-[#cc0000]/30 rounded-xl p-5">
          <h3 className="font-black text-white text-sm mb-5">Daily Revenue</h3>
          {dailyData.length > 0 ? (
            <div className="flex items-end justify-between gap-1 h-44">
              {dailyData.map((d) => (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-gray-500 text-[9px] font-mono">${d.revenue.toFixed(0)}</span>
                  <div className="w-full rounded-t-md bg-[#cc0000]/80 hover:bg-[#cc0000] transition-colors cursor-pointer" style={{ height: `${Math.max(4, (d.revenue / maxRev) * 100)}%` }}></div>
                  <span className="text-gray-500 text-[9px] font-bold">{new Date(d.date).toLocaleDateString("en-US", { weekday: "short" })}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-44 flex items-center justify-center text-gray-500 text-sm">No revenue data for this period</div>
          )}
        </div>

        <div className="bg-gray-900/50 border border-[#cc0000]/30 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#cc0000]/30">
            <h3 className="font-black text-white text-sm">Daily Breakdown</h3>
          </div>
          <Table>
            <TableHeader className="bg-gray-800/30">
              <TableRow className="border-[#cc0000]/30 hover:bg-transparent">
                <TableHead className="text-gray-500 font-bold text-xs">Date</TableHead>
                <TableHead className="text-gray-500 font-bold text-xs">Transactions</TableHead>
                <TableHead className="text-gray-500 font-bold text-xs text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dailyData.map((d) => (
                <TableRow key={d.date} className="border-[#cc0000]/20 hover:bg-gray-800/30">
                  <TableCell className="text-gray-300 text-sm font-semibold">{new Date(d.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</TableCell>
                  <TableCell className="text-gray-400 text-sm">{d.transactions}</TableCell>
                  <TableCell className="text-right font-bold text-green-400 text-sm">${d.revenue.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              {dailyData.length === 0 && (
                <TableRow><TableCell colSpan={3} className="text-center py-8 text-gray-500">No transactions this {revPeriod}</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  const pageContent: Record<Page, () => React.ReactNode> = {
    overview: renderOverview,
    rants: renderRants,
    featured: renderFeatured,
    leaderboard: renderLeaderboard,
    analytics: renderAnalytics,
    callers: renderCallers,
    revenue: renderRevenue,
  };

  return (
    <div className="min-h-screen text-white font-sans flex flex-col bg-[#0a0e1a]">
      <header className="flex items-center justify-between px-6 py-3 border-b border-[#cc0000]/40 bg-[#05070d] shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-black text-xl tracking-tight text-white">{"America's"} <span className="font-light">Rant Line</span></span>
          <h1 className="text-base font-normal text-gray-500">&mdash; Admin</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" onClick={() => setPage("rants")} />
            {(pendingRants ?? []).length > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#cc0000] rounded-full text-[8px] font-black flex items-center justify-center">{(pendingRants ?? []).length}</span>}
          </div>
          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-[#cc0000]/50 text-sm">{"\uD83D\uDC64"}</div>
            <div>
              <div className="text-sm font-semibold leading-none">Admin</div>
              <div className="text-xs text-gray-500 mt-0.5">Super Admin</div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white hover:bg-gray-800" onClick={() => { setAuthenticated(false); setAdminKey(""); }}><LogOut className="w-4 h-4" /></Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 border-r border-[#cc0000]/30 flex flex-col py-4 bg-[#0d1326] shrink-0 hidden md:flex">
          <nav className="flex-1 space-y-0.5 px-2">
            {SIDEBAR_ITEMS.map((item) => (
              <button key={item.key} onClick={() => setPage(item.key)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${page === item.key ? "bg-[#cc0000]/15 text-white font-semibold border border-[#cc0000]/20" : "text-gray-400 hover:text-white hover:bg-gray-800/40"}`}>
                <div className="flex items-center gap-2.5">{item.icon}{item.label}</div>
                {item.key === "rants" && (pendingRants ?? []).length > 0 && (
                  <span className="bg-[#cc0000] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none">{(pendingRants ?? []).length}</span>
                )}
              </button>
            ))}
          </nav>
          <div className="px-2 border-t border-white/5 pt-3 mt-3">
            <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-gray-800/40 transition-colors text-left">
              <Settings className="w-4 h-4" /> Settings
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {pageContent[page]()}
          </div>
        </main>
      </div>
    </div>
  );
}
