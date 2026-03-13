import React, { useState } from "react";
import {
  Mic,
  List,
  Star,
  Trophy,
  BarChart2,
  Settings,
  LogOut,
  User,
  Check,
  RefreshCw,
  Play,
  X,
  Eye,
  CircleDot
} from "lucide-react";

const RANTS_DATA = [
  {
    id: "#2847",
    caller: "+1(512)***-4892",
    time: "2:34 PM",
    duration: "2:34",
    category: "",
    status: "Pending",
    featured: false,
  },
  {
    id: "#2846",
    caller: "+1(614)***-7723",
    time: "1:18 PM",
    duration: "4:12",
    category: "Inflation",
    status: "Pending",
    featured: false,
  },
  {
    id: "#2845",
    caller: "+1(404)***-2291",
    time: "11:45 AM",
    duration: "3:45",
    category: "Politics",
    status: "Approved",
    featured: false,
  },
  {
    id: "#2844",
    caller: "+1(305)***-9918",
    time: "9:22 AM",
    duration: "2:18",
    category: "Work",
    status: "Approved",
    featured: true,
  },
  {
    id: "#2843",
    caller: "+1(734)***-5507",
    time: "Yesterday",
    duration: "5:02",
    category: "Dating",
    status: "Rejected",
    featured: false,
  },
  {
    id: "#2842",
    caller: "+1(602)***-1134",
    time: "Yesterday",
    duration: "1:57",
    category: "Everyday Life",
    status: "Approved",
    featured: false,
  },
];

const Waveform = () => (
  <div className="flex items-center gap-[2px] h-4 mx-2">
    {[30, 60, 40, 80, 50, 30, 70, 90].map((h, i) => (
      <div
        key={i}
        className="w-[2px] bg-white/40 rounded-full"
        style={{ height: `${h}%` }}
      />
    ))}
  </div>
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen text-white font-sans flex flex-col bg-[#0B1E3A]">
      {/* Top Nav Bar */}
      <header className="h-14 bg-[#0B1E3A] border-b border-white/10 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-2">
          <Mic className="w-5 h-5 text-[#D61F1F]" />
          <h1 className="font-['Bebas_Neue'] text-[#D61F1F] text-2xl tracking-wide flex items-center gap-2">
            MAGARANTLINE <span className="text-white text-xl tracking-normal">— Admin Panel</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <User className="w-4 h-4" />
            <span>Admin</span>
          </div>
          <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
            <LogOut className="w-3 h-3" />
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden bg-black/20">
        {/* Left Sidebar */}
        <aside className="w-52 bg-black/40 border-r border-white/10 flex flex-col shrink-0">
          <nav className="flex-1 py-4">
            <div className="px-4 py-3 text-sm cursor-pointer bg-[#D61F1F]/20 border-l-2 border-[#D61F1F] flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <List className="w-4 h-4" />
                <span>Incoming Rants</span>
              </div>
              <span className="bg-[#F59E0B] text-black text-[10px] font-bold rounded-full px-2 py-0.5">
                8 pending
              </span>
            </div>
            <div className="px-4 py-3 text-sm cursor-pointer hover:bg-[#D61F1F]/20 flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Star className="w-4 h-4" />
              <span>Featured Mgmt</span>
            </div>
            <div className="px-4 py-3 text-sm cursor-pointer hover:bg-[#D61F1F]/20 flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Trophy className="w-4 h-4" />
              <span>Leaderboard</span>
            </div>
            <div className="px-4 py-3 text-sm cursor-pointer hover:bg-[#D61F1F]/20 flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <BarChart2 className="w-4 h-4" />
              <span>Analytics</span>
            </div>
            <div className="px-4 py-3 text-sm cursor-pointer hover:bg-[#D61F1F]/20 flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1400px] mx-auto">
            {/* Header Row */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-['Bebas_Neue'] text-white text-3xl tracking-wide">INCOMING VOICEMAILS</h2>
              <div className="flex items-center gap-2">
                <button className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors font-medium">
                  <Check className="w-3 h-3" />
                  Approve All Pending
                </button>
                <button className="bg-[#0B1E3A] hover:bg-[#0B1E3A]/80 border border-white/20 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors">
                  <RefreshCw className="w-3 h-3" />
                  Refresh
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-[#0B1E3A] border border-white/10 rounded-lg p-3 text-center">
                <div className="text-gray-400 text-xs uppercase font-medium mb-1">Total Today</div>
                <div className="text-white text-2xl font-bold">12</div>
              </div>
              <div className="bg-[#0B1E3A] border border-white/10 rounded-lg p-3 text-center">
                <div className="text-gray-400 text-xs uppercase font-medium mb-1">Approved</div>
                <div className="text-green-400 text-2xl font-bold">8</div>
              </div>
              <div className="bg-[#0B1E3A] border border-white/10 rounded-lg p-3 text-center">
                <div className="text-gray-400 text-xs uppercase font-medium mb-1">Pending</div>
                <div className="text-yellow-400 text-2xl font-bold">3</div>
              </div>
              <div className="bg-[#0B1E3A] border border-white/10 rounded-lg p-3 text-center">
                <div className="text-gray-400 text-xs uppercase font-medium mb-1">Featured</div>
                <div className="text-[#F59E0B] text-2xl font-bold">1</div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-b border-white/10 mb-4">
              <button
                onClick={() => setActiveTab("all")}
                className={`pb-2 px-4 text-sm font-medium ${activeTab === "all" ? "border-b-2 border-[#D61F1F] text-[#D61F1F]" : "text-gray-400 hover:text-white"}`}
              >
                All (12)
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`pb-2 px-4 text-sm font-medium ${activeTab === "pending" ? "border-b-2 border-[#D61F1F] text-[#D61F1F]" : "text-gray-400 hover:text-white"}`}
              >
                Pending (8)
              </button>
              <button
                onClick={() => setActiveTab("approved")}
                className={`pb-2 px-4 text-sm font-medium ${activeTab === "approved" ? "border-b-2 border-[#D61F1F] text-[#D61F1F]" : "text-gray-400 hover:text-white"}`}
              >
                Approved (3)
              </button>
              <button
                onClick={() => setActiveTab("rejected")}
                className={`pb-2 px-4 text-sm font-medium ${activeTab === "rejected" ? "border-b-2 border-[#D61F1F] text-[#D61F1F]" : "text-gray-400 hover:text-white"}`}
              >
                Rejected (1)
              </button>
            </div>

            {/* Table */}
            <div className="bg-[#0B1E3A] border border-white/10 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase text-gray-400 bg-black/40 border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3 font-medium w-16">#</th>
                    <th className="px-4 py-3 font-medium">Caller</th>
                    <th className="px-4 py-3 font-medium">Time</th>
                    <th className="px-4 py-3 font-medium">Dur</th>
                    <th className="px-4 py-3 font-medium">Audio</th>
                    <th className="px-4 py-3 font-medium w-40">Category</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {RANTS_DATA.map((rant, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-[#D61F1F]/10 transition-colors ${idx % 2 === 0 ? "bg-[#0B1E3A]" : "bg-black/20"}`}
                    >
                      <td className="px-4 py-3 text-gray-400 font-mono">{rant.id}</td>
                      <td className="px-4 py-3 font-medium">{rant.caller}</td>
                      <td className="px-4 py-3 text-gray-300">{rant.time}</td>
                      <td className="px-4 py-3 text-gray-300">{rant.duration}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <button className="text-white hover:text-[#D61F1F] transition-colors p-1">
                            <Play className="w-4 h-4 fill-current" />
                          </button>
                          <Waveform />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <select 
                          className="bg-black/30 border border-white/10 text-white text-xs rounded px-2 py-1.5 w-full focus:outline-none focus:border-[#D61F1F]"
                          defaultValue={rant.category || ""}
                        >
                          <option value="" disabled>Select...</option>
                          <option value="Inflation">Inflation</option>
                          <option value="Politics">Politics</option>
                          <option value="Work">Work</option>
                          <option value="Dating">Dating</option>
                          <option value="Everyday Life">Everyday Life</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {rant.status === "Pending" && (
                            <>
                              <CircleDot className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-yellow-400">Pending</span>
                            </>
                          )}
                          {rant.status === "Approved" && (
                            <>
                              <Check className="w-3 h-3 text-green-400" />
                              <span className="text-green-400">Approved</span>
                            </>
                          )}
                          {rant.status === "Rejected" && (
                            <>
                              <X className="w-3 h-3 text-red-400" />
                              <span className="text-red-400">Rejected</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {rant.status === "Pending" ? (
                            <>
                              <button className="bg-green-600/20 text-green-400 hover:bg-green-600 hover:text-white border border-green-600/30 text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors" title="Approve">
                                <Check className="w-3 h-3" />
                              </button>
                              <button className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-600/30 text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors" title="Reject">
                                <X className="w-3 h-3" />
                              </button>
                              <button className="bg-[#F59E0B]/20 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black border border-[#F59E0B]/30 text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors" title="Feature">
                                <Star className="w-3 h-3" />
                              </button>
                            </>
                          ) : rant.status === "Approved" ? (
                            <>
                              {rant.featured ? (
                                <button className="bg-[#F59E0B] text-black text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-current" />
                                  Featured ✓
                                </button>
                              ) : (
                                <button className="bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20 border border-[#F59E0B]/30 text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors" title="Feature">
                                  <Star className="w-3 h-3" />
                                </button>
                              )}
                              <button className="bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10 text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors" title="View">
                                <Eye className="w-3 h-3" />
                              </button>
                            </>
                          ) : (
                            <button className="bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10 text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors" title="View">
                              <Eye className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
