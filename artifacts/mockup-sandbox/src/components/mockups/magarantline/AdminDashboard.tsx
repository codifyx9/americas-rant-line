import React, { useState } from "react";
import {
  Play, Check, X, Star, RefreshCw, Users, Mic, Settings, List,
  BarChart2, Trophy, LogOut, Clock, ThumbsUp, AlertCircle,
  DollarSign, TrendingUp, Search, Bell, ChevronDown, Activity,
  Pause, Filter, Download, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RANTS_DATA = [
  { id: "#2847", caller: "+1(512)***-4892", state: "TX", timestamp: "Today 2:34 PM", duration: "2:34", category: "", status: "Pending", plan: "Skip", revenue: "$5.00", featured: false },
  { id: "#2846", caller: "+1(614)***-7723", state: "OH", timestamp: "Today 1:18 PM", duration: "4:12", category: "Inflation", status: "Pending", plan: "Featured", revenue: "$25.00", featured: false },
  { id: "#2845", caller: "+1(404)***-2291", state: "GA", timestamp: "Today 11:45 AM", duration: "3:45", category: "Politics", status: "Approved", plan: "Standard", revenue: "$1.99", featured: false },
  { id: "#2844", caller: "+1(305)***-9918", state: "FL", timestamp: "Today 9:22 AM", duration: "2:18", category: "Work", status: "Approved", plan: "Skip", revenue: "$5.00", featured: false },
  { id: "#2843", caller: "+1(734)***-5507", state: "MI", timestamp: "Yesterday 6:15 PM", duration: "5:02", category: "Dating", status: "Rejected", plan: "Standard", revenue: "$1.99", featured: false },
  { id: "#2842", caller: "+1(602)***-1134", state: "AZ", timestamp: "Yesterday 4:01 PM", duration: "1:57", category: "Everyday Life", status: "Approved", plan: "Featured", revenue: "$25.00", featured: true },
  { id: "#2841", caller: "+1(801)***-3344", state: "UT", timestamp: "Yesterday 2:22 PM", duration: "3:30", category: "Border", status: "Approved", plan: "Standard", revenue: "$1.99", featured: false },
  { id: "#2840", caller: "+1(256)***-8812", state: "AL", timestamp: "Yesterday 11:05 AM", duration: "2:47", category: "Politics", status: "Pending", plan: "Skip", revenue: "$5.00", featured: false },
];

const REVENUE_BARS = [
  { day: 'Mon', amt: 142, h: 40 },
  { day: 'Tue', amt: 287, h: 70 },
  { day: 'Wed', amt: 198, h: 52 },
  { day: 'Thu', amt: 341, h: 85 },
  { day: 'Fri', amt: 412, h: 100 },
  { day: 'Sat', amt: 389, h: 94 },
  { day: 'Sun', amt: 226, h: 58 },
];

const ACTIVITY_FEED = [
  { time: '2:34 PM', msg: 'New rant #2847 received from Texas (Skip the Line)', type: 'new' },
  { time: '2:12 PM', msg: 'Rant #2846 approved and published', type: 'approved' },
  { time: '1:55 PM', msg: 'Featured payment $25 received from +1(614)***', type: 'revenue' },
  { time: '1:30 PM', msg: 'Rant #2843 rejected — content violation', type: 'rejected' },
  { time: '1:18 PM', msg: 'New rant #2846 received from Ohio (Featured)', type: 'new' },
  { time: '12:50 PM', msg: 'Leaderboard updated — #2842 now at rank 1', type: 'info' },
];

const Waveform = ({ color = "text-white" }: { color?: string }) => (
  <div className="flex items-center gap-0.5 h-5 mx-2">
    {[40, 70, 40, 100, 60, 30, 80, 50, 90, 40].map((h, i) => (
      <div key={i} className={`w-0.5 ${color === 'text-white' ? 'bg-white/60' : 'bg-gray-500'} rounded-full`} style={{ height: `${h}%` }} />
    ))}
  </div>
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = RANTS_DATA.filter(r => {
    if (activeTab === 'pending') return r.status === 'Pending';
    if (activeTab === 'approved') return r.status === 'Approved';
    if (activeTab === 'rejected') return r.status === 'Rejected';
    return true;
  });

  return (
    <div className="min-h-screen text-white font-sans flex flex-col bg-[#0a0e1a]">

      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-[#cc0000]/40 bg-[#05070d] shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-black text-xl tracking-tight text-white">America's <span className="font-light">Rant Line</span></span>
          <h1 className="text-base font-normal text-gray-500">— Admin</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#cc0000] rounded-full text-[8px] font-black flex items-center justify-center">3</span>
          </div>
          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-[#cc0000]/50 text-sm">👤</div>
            <div>
              <div className="text-sm font-semibold leading-none">Admin</div>
              <div className="text-xs text-gray-500 mt-0.5">Super Admin</div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white hover:bg-gray-800"><LogOut className="w-4 h-4" /></Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-56 border-r border-[#cc0000]/30 flex flex-col py-4 bg-[#0d1326] shrink-0">
          <nav className="flex-1 space-y-0.5 px-2">
            {[
              { icon: <Activity className="w-4 h-4" />, label: 'Overview', active: false },
              { icon: <List className="w-4 h-4" />, label: 'Incoming Rants', badge: '12', active: true },
              { icon: <Star className="w-4 h-4" />, label: 'Featured Mgmt', active: false },
              { icon: <Trophy className="w-4 h-4" />, label: 'Leaderboard', active: false },
              { icon: <BarChart2 className="w-4 h-4" />, label: 'Analytics', active: false },
              { icon: <Users className="w-4 h-4" />, label: 'Callers', active: false },
              { icon: <DollarSign className="w-4 h-4" />, label: 'Revenue', active: false },
            ].map((item) => (
              <a key={item.label} href="#" className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${item.active ? 'bg-[#cc0000]/15 text-white font-semibold border border-[#cc0000]/20' : 'text-gray-400 hover:text-white hover:bg-gray-800/40'}`}>
                <div className="flex items-center gap-2.5">{item.icon}{item.label}</div>
                {item.badge && <Badge className="bg-[#cc0000] text-white text-xs hover:bg-[#cc0000] px-1.5 py-0">{item.badge}</Badge>}
              </a>
            ))}
          </nav>
          <div className="px-2 border-t border-white/5 pt-3 mt-3">
            <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-gray-800/40 transition-colors">
              <Settings className="w-4 h-4" /> Settings
            </a>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* STATS ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Rants Today', val: '12', sub: '+3 from yesterday', icon: <Mic className="w-5 h-5" />, color: 'text-blue-400 bg-blue-500/10' },
                { label: 'Revenue Today', val: '$68.94', sub: '16 transactions', icon: <DollarSign className="w-5 h-5" />, color: 'text-green-400 bg-green-500/10' },
                { label: 'Pending Review', val: '3', sub: 'Requires action', icon: <Clock className="w-5 h-5" />, color: 'text-yellow-400 bg-yellow-500/10' },
                { label: 'Featured Active', val: '1', sub: '22h remaining', icon: <Star className="w-5 h-5" />, color: 'text-white bg-white/10' },
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
              {/* REVENUE CHART */}
              <div className="lg:col-span-2 bg-gray-900/50 border border-[#cc0000]/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-black text-white text-base">Revenue — This Week</h3>
                    <p className="text-gray-500 text-xs">Total: $1,995 · Avg/day: $285</p>
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
                      <div className="w-full rounded-t-md bg-[#cc0000]/80 hover:bg-[#cc0000] transition-colors cursor-pointer" style={{height:`${b.h}%`}}></div>
                      <span className="text-gray-500 text-xs font-bold">{b.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTIVITY FEED */}
              <div className="bg-gray-900/50 border border-[#cc0000]/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-white text-base">Live Activity</h3>
                  <div className="flex items-center gap-1.5 text-xs text-green-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span>Live
                  </div>
                </div>
                <div className="space-y-3 overflow-y-auto max-h-[170px]">
                  {ACTIVITY_FEED.map((a, i) => (
                    <div key={i} className="flex gap-3 text-xs">
                      <span className="text-gray-600 font-mono shrink-0 mt-0.5">{a.time}</span>
                      <span className={`leading-relaxed ${a.type === 'new' ? 'text-blue-300' : a.type === 'approved' ? 'text-green-300' : a.type === 'revenue' ? 'text-white' : a.type === 'rejected' ? 'text-red-400' : 'text-gray-400'}`}>
                        {a.msg}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RANT TABLE */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-black">Incoming Voicemails</h2>
                  <Badge className="bg-gray-800 text-gray-300 border-[#cc0000]/40">{RANTS_DATA.length} Total</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search rants..."
                      className="pl-8 pr-4 py-2 bg-gray-800 border border-[#cc0000]/30 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#cc0000] w-44"
                    />
                  </div>
                  <Button className="bg-green-700 hover:bg-green-600 text-white text-sm h-9">
                    <Check className="w-4 h-4 mr-1.5" /> Approve All Pending
                  </Button>
                  <Button variant="outline" className="border-[#cc0000]/40 text-gray-300 hover:bg-gray-800 text-sm h-9">
                    <Download className="w-4 h-4 mr-1.5" /> Export
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-9 w-9">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gray-900/40 rounded-xl border border-[#cc0000]/30">
                <div className="p-3 border-b border-[#cc0000]/30 flex items-center justify-between">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-gray-800/60 border border-[#cc0000]/30 p-0.5">
                      <TabsTrigger value="all" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-xs px-3">All (8)</TabsTrigger>
                      <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-900/50 data-[state=active]:text-yellow-300 text-xs px-3">Pending (3)</TabsTrigger>
                      <TabsTrigger value="approved" className="data-[state=active]:bg-green-900/50 data-[state=active]:text-green-300 text-xs px-3">Approved (4)</TabsTrigger>
                      <TabsTrigger value="rejected" className="data-[state=active]:bg-red-900/50 data-[state=active]:text-red-300 text-xs px-3">Rejected (1)</TabsTrigger>
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
                        <TableHead className="text-gray-500 font-bold text-xs">Audio Preview</TableHead>
                        <TableHead className="text-gray-500 font-bold text-xs">Category</TableHead>
                        <TableHead className="text-gray-500 font-bold text-xs hidden md:table-cell">Plan</TableHead>
                        <TableHead className="text-gray-500 font-bold text-xs hidden md:table-cell">Revenue</TableHead>
                        <TableHead className="text-gray-500 font-bold text-xs w-24">Status</TableHead>
                        <TableHead className="text-gray-500 font-bold text-xs text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((rant, i) => (
                        <TableRow key={i} className="border-[#cc0000]/20 hover:bg-gray-800/30 transition-colors">
                          <TableCell className="font-mono text-gray-400 text-xs">{rant.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-semibold text-sm">{rant.caller}</div>
                              <div className="text-gray-500 text-xs">{rant.state}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-400 text-xs hidden sm:table-cell">{rant.timestamp}</TableCell>
                          <TableCell className="text-gray-400 text-xs">{rant.duration}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setPlayingId(playingId === rant.id ? null : rant.id)}
                                className="h-7 w-7 rounded-full bg-white/8 text-white hover:bg-[#cc0000] hover:text-white"
                              >
                                {playingId === rant.id ? <Pause className="h-3 w-3 fill-current" /> : <Play className="h-3 w-3 fill-current" />}
                              </Button>
                              <Waveform color={playingId === rant.id ? "text-white" : "text-gray-500"} />
                            </div>
                          </TableCell>
                          <TableCell>
                            {rant.category ? (
                              <Select defaultValue={rant.category.toLowerCase()}>
                                <SelectTrigger className="h-7 bg-gray-800/50 border-[#cc0000]/30 text-xs w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-[#cc0000]/30 text-white text-xs">
                                  {['Inflation','Politics','Work','Dating','Everyday Life','Border','Education','Economy'].map(c => (
                                    <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Select>
                                <SelectTrigger className="h-7 bg-gray-800/50 border-[#cc0000]/30 text-xs w-32 text-gray-500">
                                  <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-[#cc0000]/30 text-white text-xs">
                                  {['Inflation','Politics','Work','Dating','Everyday Life','Border','Education','Economy'].map(c => (
                                    <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge className={`text-xs font-bold border-none ${rant.plan === 'Featured' ? 'bg-white/15 text-white' : rant.plan === 'Skip' ? 'bg-[#cc0000]/20 text-red-300' : 'bg-gray-800 text-gray-400'}`}>
                              {rant.plan === 'Featured' ? '⭐ Featured' : rant.plan === 'Skip' ? '⚡ Skip' : 'Standard'}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-bold text-green-400 text-sm">{rant.revenue}</TableCell>
                          <TableCell>
                            {rant.status === 'Pending' && <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs w-fit flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />Pending</Badge>}
                            {rant.status === 'Approved' && <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs w-fit flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400" />Approved</Badge>}
                            {rant.status === 'Rejected' && <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-xs w-fit flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />Rejected</Badge>}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              {rant.status === 'Pending' ? (
                                <>
                                  <Button size="icon" variant="outline" className="h-7 w-7 bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500/20 rounded-md" title="Approve"><Check className="h-3.5 w-3.5" /></Button>
                                  <Button size="icon" variant="outline" className="h-7 w-7 bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20 rounded-md" title="Reject"><X className="h-3.5 w-3.5" /></Button>
                                  <Button size="icon" variant="outline" className="h-7 w-7 bg-gray-800 border-white/10 text-gray-400 hover:text-white rounded-md" title="Feature"><Star className="h-3.5 w-3.5" /></Button>
                                </>
                              ) : rant.status === 'Approved' ? (
                                <>
                                  <Button size="sm" variant="outline" className={`h-7 px-2 text-xs border-white/10 hover:bg-gray-800 rounded-md ${rant.featured ? 'bg-white/10 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
                                    <Star className={`h-3 w-3 mr-1 ${rant.featured ? 'fill-current' : ''}`} />
                                    {rant.featured ? 'Featured' : 'Feature'}
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-7 px-2 bg-gray-800 border-white/10 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md text-xs">View</Button>
                                </>
                              ) : (
                                <Button size="sm" variant="outline" className="h-7 px-2 bg-gray-800 border-white/10 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md text-xs">View</Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="p-3 bg-[#0a0e1a] border-t border-[#cc0000]/20 flex items-center justify-between text-xs text-gray-500">
                  <span>Showing {filtered.length} of {RANTS_DATA.length} rants</span>
                  <div className="flex gap-2">
                    <button className="hover:text-white transition-colors disabled:opacity-40" disabled>← Prev</button>
                    <span className="text-gray-700">Page 1 of 3</span>
                    <button className="hover:text-white transition-colors">Next →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
