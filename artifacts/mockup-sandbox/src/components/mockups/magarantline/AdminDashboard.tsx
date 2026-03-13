import React, { useState } from "react";
import {
  Play,
  Check,
  X,
  Star,
  RefreshCw,
  Users,
  Mic,
  Settings,
  List,
  BarChart2,
  Trophy,
  LogOut,
  Radio,
  Clock,
  ThumbsUp,
  AlertCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RANTS_DATA = [
  {
    id: "#2847",
    caller: "+1(512)***-4892",
    timestamp: "Today 2:34 PM",
    duration: "2:34",
    category: "",
    status: "Pending",
    featured: false,
  },
  {
    id: "#2846",
    caller: "+1(614)***-7723",
    timestamp: "Today 1:18 PM",
    duration: "4:12",
    category: "Inflation",
    status: "Pending",
    featured: false,
  },
  {
    id: "#2845",
    caller: "+1(404)***-2291",
    timestamp: "Today 11:45 AM",
    duration: "3:45",
    category: "Politics",
    status: "Approved",
    featured: false,
  },
  {
    id: "#2844",
    caller: "+1(305)***-9918",
    timestamp: "Today 9:22 AM",
    duration: "2:18",
    category: "Work",
    status: "Approved",
    featured: false,
  },
  {
    id: "#2843",
    caller: "+1(734)***-5507",
    timestamp: "Yesterday",
    duration: "5:02",
    category: "Dating",
    status: "Rejected",
    featured: false,
  },
  {
    id: "#2842",
    caller: "+1(602)***-1134",
    timestamp: "Yesterday",
    duration: "1:57",
    category: "Everyday Life",
    status: "Approved",
    featured: true,
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("all");

  const Waveform = () => (
    <div className="flex items-center gap-0.5 h-6 mx-2">
      {[40, 70, 40, 100, 60, 30, 80, 50, 90, 40].map((h, i) => (
        <div
          key={i}
          className="w-1 bg-[#FFD700]/70 rounded-full"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen text-white font-sans flex flex-col" style={{ backgroundColor: "#0a0e1a" }}>
      {/* Top Navigation */}
      <header
        className="flex items-center justify-between px-6 py-4 border-b border-gray-800"
        style={{ backgroundColor: "#05070d" }}
      >
        <div className="flex items-center gap-3">
          <Radio className="w-6 h-6 text-[#FFD700]" />
          <h1 className="text-xl font-bold tracking-tight">
            MagaRantLine <span className="text-gray-500 font-normal">— Admin</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
              👤
            </div>
            <span className="text-sm font-medium">Admin User</span>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className="w-[240px] border-r border-gray-800 flex flex-col py-6"
          style={{ backgroundColor: "#0d1326" }}
        >
          <nav className="flex-1 space-y-1 px-3">
            <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#FFD700]/10 text-[#FFD700] font-medium transition-colors">
              <div className="flex items-center gap-3">
                <List className="w-5 h-5" />
                Incoming Rants
              </div>
              <Badge className="bg-[#FFD700] text-black hover:bg-[#FFD700]">12</Badge>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
              <Star className="w-5 h-5" />
              Featured Mgmt
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
              <Trophy className="w-5 h-5" />
              Leaderboard
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
              <BarChart2 className="w-5 h-5" />
              Analytics
            </a>
          </nav>
          <div className="px-3 mt-auto">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
              <Settings className="w-5 h-5" />
              Settings
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Mic className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Total Today</p>
                    <h3 className="text-2xl font-bold text-white">12</h3>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <ThumbsUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Approved</p>
                    <h3 className="text-2xl font-bold text-white">8</h3>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Pending</p>
                    <h3 className="text-2xl font-bold text-white">3</h3>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center text-[#FFD700]">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Featured</p>
                    <h3 className="text-2xl font-bold text-white">1</h3>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Table Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">Incoming Voicemails — Pending Review</h2>
                  <Badge className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700">12 Total</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Check className="w-4 h-4 mr-2" />
                    Approve All Pending
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl border border-gray-800 flex flex-col">
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
                    <TabsList className="bg-gray-800/50 border border-gray-700 p-1">
                      <TabsTrigger value="all" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">All (12)</TabsTrigger>
                      <TabsTrigger value="pending" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">Pending (8)</TabsTrigger>
                      <TabsTrigger value="approved" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">Approved (3)</TabsTrigger>
                      <TabsTrigger value="rejected" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">Rejected (1)</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-800/30">
                      <TableRow className="border-gray-800 hover:bg-transparent">
                        <TableHead className="text-gray-400 font-medium w-[80px]">#</TableHead>
                        <TableHead className="text-gray-400 font-medium w-[160px]">Caller</TableHead>
                        <TableHead className="text-gray-400 font-medium w-[160px]">Timestamp</TableHead>
                        <TableHead className="text-gray-400 font-medium w-[100px]">Duration</TableHead>
                        <TableHead className="text-gray-400 font-medium w-[200px]">Audio</TableHead>
                        <TableHead className="text-gray-400 font-medium w-[180px]">Category</TableHead>
                        <TableHead className="text-gray-400 font-medium w-[120px]">Status</TableHead>
                        <TableHead className="text-gray-400 font-medium text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {RANTS_DATA.map((rant, i) => (
                        <TableRow key={i} className="border-gray-800 hover:bg-gray-800/30 transition-colors">
                          <TableCell className="font-mono text-gray-400">{rant.id}</TableCell>
                          <TableCell className="font-medium">{rant.caller}</TableCell>
                          <TableCell className="text-gray-400">{rant.timestamp}</TableCell>
                          <TableCell className="text-gray-400">{rant.duration}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-[#FFD700]/10 text-[#FFD700] hover:bg-[#FFD700]/20 hover:text-[#FFD700]">
                                <Play className="h-4 w-4 fill-current" />
                              </Button>
                              <Waveform />
                            </div>
                          </TableCell>
                          <TableCell>
                            {rant.category ? (
                              <Select defaultValue={rant.category.toLowerCase()}>
                                <SelectTrigger className="h-8 bg-gray-800/50 border-gray-700 text-sm w-[140px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                  <SelectItem value="inflation">Inflation</SelectItem>
                                  <SelectItem value="politics">Politics</SelectItem>
                                  <SelectItem value="work">Work</SelectItem>
                                  <SelectItem value="dating">Dating</SelectItem>
                                  <SelectItem value="everyday life">Everyday Life</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <Select>
                                <SelectTrigger className="h-8 bg-gray-800/50 border-gray-700 text-sm w-[140px] text-gray-400">
                                  <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                  <SelectItem value="inflation">Inflation</SelectItem>
                                  <SelectItem value="politics">Politics</SelectItem>
                                  <SelectItem value="work">Work</SelectItem>
                                  <SelectItem value="dating">Dating</SelectItem>
                                  <SelectItem value="everyday life">Everyday Life</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          </TableCell>
                          <TableCell>
                            {rant.status === "Pending" && (
                              <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20 flex w-fit items-center gap-1.5 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Pending
                              </Badge>
                            )}
                            {rant.status === "Approved" && (
                              <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 flex w-fit items-center gap-1.5 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Approved
                              </Badge>
                            )}
                            {rant.status === "Rejected" && (
                              <Badge className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 flex w-fit items-center gap-1.5 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Rejected
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {rant.status === "Pending" ? (
                                <>
                                  <Button size="icon" variant="outline" className="h-8 w-8 bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500/20 hover:text-green-400 rounded-md" title="Approve">
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button size="icon" variant="outline" className="h-8 w-8 bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20 hover:text-red-400 rounded-md" title="Reject">
                                    <X className="h-4 w-4" />
                                  </Button>
                                  <Button size="icon" variant="outline" className="h-8 w-8 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-[#FFD700] rounded-md" title="Feature">
                                    <Star className="h-4 w-4" />
                                  </Button>
                                </>
                              ) : rant.status === "Approved" ? (
                                <>
                                  <Button size="sm" variant="outline" className={`h-8 px-2 text-xs border-gray-700 hover:bg-gray-800 rounded-md ${rant.featured ? 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 hover:bg-[#FFD700]/20' : 'bg-gray-800 text-gray-400 hover:text-[#FFD700]'}`}>
                                    <Star className={`h-3.5 w-3.5 mr-1.5 ${rant.featured ? 'fill-current' : ''}`} />
                                    {rant.featured ? 'Featured ✓' : 'Feature'}
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-8 px-3 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
                                    View
                                  </Button>
                                </>
                              ) : (
                                <Button size="sm" variant="outline" className="h-8 px-3 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
                                  View
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
