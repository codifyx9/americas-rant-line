import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Play, Check, X, Star, RefreshCw, Users, Mic, Settings, List,
  BarChart2, Trophy, LogOut, Clock, AlertCircle,
  DollarSign, TrendingUp, Search, Bell, Activity, Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api, type Rant } from "@/lib/api";

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

const Waveform = ({ active = false }: { active?: boolean }) => (
  <div className="flex items-center gap-0.5 h-5 mx-2">
    {[40, 70, 40, 100, 60, 30, 80, 50, 90, 40].map((h, i) => (
      <div key={i} className={`w-0.5 ${active ? "bg-white/60" : "bg-gray-500"} rounded-full`} style={{ height: `${h}%` }} />
    ))}
  </div>
);

const REVENUE_BARS = [
  { day: "Mon", amt: 142, h: 40 },
  { day: "Tue", amt: 287, h: 70 },
  { day: "Wed", amt: 198, h: 52 },
  { day: "Thu", amt: 341, h: 85 },
  { day: "Fri", amt: 412, h: 100 },
  { day: "Sat", amt: 389, h: 94 },
  { day: "Sun", amt: 226, h: 58 },
];

const SIDEBAR_ITEMS = [
  { icon: <Activity className="w-4 h-4" />, label: "Overview", active: false },
  { icon: <List className="w-4 h-4" />, label: "Incoming Rants", active: true },
  { icon: <Star className="w-4 h-4" />, label: "Featured Mgmt", active: false },
  { icon: <Trophy className="w-4 h-4" />, label: "Leaderboard", active: false },
  { icon: <BarChart2 className="w-4 h-4" />, label: "Analytics", active: false },
  { icon: <Users className="w-4 h-4" />, label: "Callers", active: false },
  { icon: <DollarSign className="w-4 h-4" />, label: "Revenue", active: false },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: globalStats } = useQuery({ queryKey: ["globalStats"], queryFn: api.stats.global, enabled: authenticated });
  const { data: callsToday } = useQuery({ queryKey: ["callsToday"], queryFn: api.stats.callsToday, enabled: authenticated });

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

  const approveMut = useMutation({
    mutationFn: (id: string) => api.admin.approve(id, adminKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminRants"] });
      queryClient.invalidateQueries({ queryKey: ["adminPending"] });
    },
  });
  const rejectMut = useMutation({
    mutationFn: (id: string) => api.admin.reject(id, adminKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminRants"] });
      queryClient.invalidateQueries({ queryKey: ["adminPending"] });
    },
  });
  const featureMut = useMutation({
    mutationFn: (id: string) => api.admin.feature(id, adminKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminRants"] });
      queryClient.invalidateQueries({ queryKey: ["adminPending"] });
    },
  });

  const rants = activeTab === "pending" ? (pendingRants ?? []) : (allRants ?? []);
  const filtered = searchTerm
    ? rants.filter((r) =>
        (r.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.callerNickname || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.category || "").toLowerCase().includes(searchTerm.toLowerCase())
      )
    : rants;

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

  return (
    <div className="min-h-screen text-white font-sans flex flex-col bg-[#0a0e1a]">
      <header className="flex items-center justify-between px-6 py-3 border-b border-[#cc0000]/40 bg-[#05070d] shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-black text-xl tracking-tight text-white">{"America's"} <span className="font-light">Rant Line</span></span>
          <h1 className="text-base font-normal text-gray-500">&mdash; Admin</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#cc0000] rounded-full text-[8px] font-black flex items-center justify-center">{(pendingRants ?? []).length}</span>
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
              <a key={item.label} href="#" className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${item.active ? "bg-[#cc0000]/15 text-white font-semibold border border-[#cc0000]/20" : "text-gray-400 hover:text-white hover:bg-gray-800/40"}`}>
                <div className="flex items-center gap-2.5">{item.icon}{item.label}</div>
              </a>
            ))}
          </nav>
          <div className="px-2 border-t border-white/5 pt-3 mt-3">
            <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-gray-800/40 transition-colors">
              <Settings className="w-4 h-4" /> Settings
            </a>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Rants Today", val: String(totalToday), sub: "Total calls", icon: <Mic className="w-5 h-5" />, color: "text-blue-400 bg-blue-500/10" },
                { label: "Total Rants", val: (globalStats?.totalRants ?? 0).toLocaleString(), sub: `${globalStats?.approvedRants ?? 0} approved`, icon: <DollarSign className="w-5 h-5" />, color: "text-green-400 bg-green-500/10" },
                { label: "Total Plays", val: (globalStats?.totalPlays ?? 0).toLocaleString(), sub: "All time", icon: <Clock className="w-5 h-5" />, color: "text-yellow-400 bg-yellow-500/10" },
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
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-black text-white text-base">Revenue &mdash; This Week</h3>
                    <p className="text-gray-500 text-xs">Total: $1,995 &middot; Avg/day: $285</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-white/5 text-gray-400 border-white/10 text-xs cursor-pointer hover:bg-white/10">Week</Badge>
                    <Badge className="bg-white/5 text-gray-400 border-white/10 text-xs cursor-pointer hover:bg-white/10">Month</Badge>
                  </div>
                </div>
                <div className="flex items-end justify-between gap-2 h-36">
                  {REVENUE_BARS.map((b) => (
                    <div key={b.day} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-gray-500 text-[10px] font-mono">${b.amt}</span>
                      <div className="w-full rounded-t-md bg-[#cc0000]/80 hover:bg-[#cc0000] transition-colors cursor-pointer" style={{ height: `${b.h}%` }}></div>
                      <span className="text-gray-500 text-xs font-bold">{b.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900/50 border border-[#cc0000]/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-white text-base">Live Activity</h3>
                  <div className="flex items-center gap-1.5 text-xs text-green-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span>Live
                  </div>
                </div>
                <div className="space-y-3 overflow-y-auto max-h-[170px]">
                  {(activityLog ?? []).slice(0, 8).map((a, i) => (
                    <div key={i} className="flex gap-3 text-xs">
                      <span className="text-gray-600 font-mono shrink-0 mt-0.5">{timeAgo(a.createdAt)}</span>
                      <span className="text-blue-300 leading-relaxed">{a.action}: {a.details || a.targetId}</span>
                    </div>
                  ))}
                  {(activityLog ?? []).length === 0 && (
                    <p className="text-gray-600 text-xs">No recent activity</p>
                  )}
                </div>
              </div>
            </div>

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
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-9 w-9" onClick={() => {
                    queryClient.invalidateQueries({ queryKey: ["adminRants"] });
                    queryClient.invalidateQueries({ queryKey: ["adminPending"] });
                  }}><RefreshCw className="w-4 h-4" /></Button>
                </div>
              </div>

              <div className="bg-gray-900/40 rounded-xl border border-[#cc0000]/30">
                <div className="p-3 border-b border-[#cc0000]/30 flex items-center justify-between">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-gray-800/60 border border-[#cc0000]/30 p-0.5">
                      <TabsTrigger value="all" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-xs px-3">All ({(allRants ?? []).length})</TabsTrigger>
                      <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-900/50 data-[state=active]:text-yellow-300 text-xs px-3">Pending ({(pendingRants ?? []).length})</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-800/30">
                      <TableRow className="border-[#cc0000]/30 hover:bg-transparent">
                        <TableHead className="text-gray-500 font-bold text-xs w-20">#ID</TableHead>
                        <TableHead className="text-gray-500 font-bold text-xs">Caller</TableHead>
                        <TableHead className="text-gray-500 font-bold text-xs hidden sm:table-cell">Time</TableHead>
                        <TableHead className="text-gray-500 font-bold text-xs w-20">Length</TableHead>
                        <TableHead className="text-gray-500 font-bold text-xs">Audio</TableHead>
                        <TableHead className="text-gray-500 font-bold text-xs">Category</TableHead>
                        <TableHead className="text-gray-500 font-bold text-xs hidden md:table-cell">Votes</TableHead>
                        <TableHead className="text-gray-500 font-bold text-xs text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((rant, i) => (
                        <TableRow key={rant.id} className="border-[#cc0000]/20 hover:bg-gray-800/30 transition-colors">
                          <TableCell className="font-mono text-gray-400 text-xs">#{rant.rantNumber}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-semibold text-sm">{rant.callerNickname || "Anonymous"}</div>
                              <div className="text-gray-500 text-xs">{rant.callerState || "US"}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-400 text-xs hidden sm:table-cell">{timeAgo(rant.createdAt)}</TableCell>
                          <TableCell className="text-gray-400 text-xs">{formatDuration(rant.duration)}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Button size="icon" variant="ghost" onClick={() => setPlayingId(playingId === rant.id ? null : rant.id)} className="h-7 w-7 rounded-full bg-white/[0.08] text-white hover:bg-[#cc0000] hover:text-white">
                                {playingId === rant.id ? <Pause className="h-3 w-3 fill-current" /> : <Play className="h-3 w-3 fill-current" />}
                              </Button>
                              <Waveform active={playingId === rant.id} />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-[#cc0000]/40 text-gray-400 bg-gray-800/50 font-medium text-xs">{rant.category || "Uncategorized"}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-bold text-white text-sm">{rant.votes.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7 bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500/20 rounded-md"
                                title="Approve"
                                onClick={() => approveMut.mutate(rant.id)}
                                disabled={approveMut.isPending}
                              ><Check className="h-3.5 w-3.5" /></Button>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7 bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20 rounded-md"
                                title="Reject"
                                onClick={() => rejectMut.mutate(rant.id)}
                                disabled={rejectMut.isPending}
                              ><X className="h-3.5 w-3.5" /></Button>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7 bg-gray-800 border-white/10 text-gray-400 hover:text-white rounded-md"
                                title="Feature"
                                onClick={() => featureMut.mutate(rant.id)}
                                disabled={featureMut.isPending}
                              ><Star className="h-3.5 w-3.5" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filtered.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                            {loadingAll ? "Loading rants..." : "No rants found"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="p-3 bg-[#0a0e1a] border-t border-[#cc0000]/20 flex items-center justify-between text-xs text-gray-500">
                  <span>Showing {filtered.length} of {(allRants ?? []).length} rants</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
