import React, { useState } from "react";
import {
  Mic,
  List,
  Star,
  Trophy,
  BarChart2,
  Settings,
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
  <div className="inline-flex gap-[2px] items-end h-[18px]">
    {[8, 14, 10, 18, 12, 16, 9, 13].map((h, i) => (
      <div
        key={i}
        className="w-[3px] bg-gray-600 rounded-sm"
        style={{ height: `${h}px` }}
      />
    ))}
  </div>
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#080e1f] font-sans">
      {/* HERO BANNER */}
      <div className="bg-[#0B1E3A] relative overflow-hidden py-5 px-6 flex items-center justify-between shrink-0">
        <div className="relative z-10 flex flex-col items-start">
          <img 
            src="/__mockup/images/logo-reference.png" 
            className="h-14 object-contain" 
            alt="MAGA RANT LINE" 
            onError={(e) => {
              // Fallback if image not found
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="text-white text-xs uppercase tracking-widest mt-1 font-bold flex items-center gap-1">
            ★ ADMIN PANEL ★
          </div>
        </div>
        <div className="absolute top-0 right-0 w-40 h-full pointer-events-none overflow-hidden opacity-50 flex">
          <div className="w-full h-full" style={{ background: "repeating-linear-gradient(0deg, #B22234 0px, #B22234 18px, #FFFFFF 18px, #FFFFFF 36px)" }}></div>
          <div className="absolute top-0 left-0 w-16 h-full bg-[#0B1E3A] flex flex-wrap content-start p-2 gap-1.5">
            {Array.from({length: 12}).map((_,i) => <span key={i} className="text-white text-[10px] leading-none">★</span>)}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="h-14 bg-[#D61F1F] flex items-center px-4 gap-3 shrink-0 relative z-10 shadow-md border-b border-black/20">
        <div className="flex items-center gap-2">
          <Mic className="text-white w-5 h-5" />
          <span className="font-['Black_Ops_One'] text-white text-xl tracking-wide">MAGARANTLINE</span>
        </div>
        <div className="hidden md:flex items-center gap-2 ml-4">
          <button className="bg-[#0B1E3A] rounded-full px-4 py-1 text-white text-sm font-semibold hover:bg-opacity-90 transition-opacity">🏠 HOME</button>
          <button className="bg-[#0B1E3A] rounded-full px-4 py-1 text-white text-sm font-semibold hover:bg-opacity-90 transition-opacity">📻 RANT WALL</button>
          <button className="bg-[#0B1E3A] rounded-full px-4 py-1 text-white text-sm font-semibold hover:bg-opacity-90 transition-opacity">🏆 LEADERBOARD</button>
        </div>
        <button className="ml-auto bg-[#F59E0B] text-black font-bold rounded-full px-5 py-2 text-sm hover:bg-opacity-90 transition-all shadow-sm">
          LEAVE A RANT →
        </button>
      </nav>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="w-52 bg-[#0a0d1a] border-r border-white/10 flex flex-col shrink-0">
          <div className="text-gray-500 text-xs uppercase tracking-widest px-4 py-3 border-b border-white/10 font-bold">
            ADMIN PANEL
          </div>
          <nav className="flex-1 py-2">
            <div className="group py-3 px-4 text-sm flex items-center gap-2 cursor-pointer bg-[#D61F1F]/10 border-l-2 border-[#D61F1F] text-white">
              <span>📋</span> Incoming Rants
              <span className="bg-[#F59E0B] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-auto">
                8
              </span>
            </div>
            <div className="group py-3 px-4 text-sm flex items-center gap-2 cursor-pointer hover:bg-[#D61F1F]/10 text-gray-400 hover:text-white transition-colors">
              <span>⭐</span> Featured Management
            </div>
            <div className="group py-3 px-4 text-sm flex items-center gap-2 cursor-pointer hover:bg-[#D61F1F]/10 text-gray-400 hover:text-white transition-colors">
              <span>🏆</span> Leaderboard Control
            </div>
            <div className="group py-3 px-4 text-sm flex items-center gap-2 cursor-pointer hover:bg-[#D61F1F]/10 text-gray-400 hover:text-white transition-colors">
              <span>📊</span> Analytics
            </div>
            <div className="group py-3 px-4 text-sm flex items-center gap-2 cursor-pointer hover:bg-[#D61F1F]/10 text-gray-400 hover:text-white transition-colors">
              <span>⚙️</span> Settings
            </div>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* STATS ROW */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-[#0d1530] border border-white/10 rounded-xl p-4 text-center">
                <div className="text-white text-3xl font-bold">12</div>
                <div className="text-gray-400 text-xs mt-1 uppercase tracking-wider">Total Today</div>
              </div>
              <div className="bg-[#0d1530] border border-white/10 rounded-xl p-4 text-center">
                <div className="text-green-400 text-3xl font-bold">8</div>
                <div className="text-gray-400 text-xs mt-1 uppercase tracking-wider">Approved</div>
              </div>
              <div className="bg-[#0d1530] border border-white/10 rounded-xl p-4 text-center">
                <div className="text-[#F59E0B] text-3xl font-bold">3</div>
                <div className="text-gray-400 text-xs mt-1 uppercase tracking-wider">Pending</div>
              </div>
              <div className="bg-[#0d1530] border border-white/10 rounded-xl p-4 text-center">
                <div className="text-[#D61F1F] text-3xl font-bold">1</div>
                <div className="text-gray-400 text-xs mt-1 uppercase tracking-wider">Featured</div>
              </div>
            </div>

            {/* SECTION HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-['Black_Ops_One'] text-white text-2xl tracking-wide">INCOMING VOICEMAILS</h2>
              <div className="flex items-center">
                <button className="bg-green-700 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded mr-2 transition-colors flex items-center gap-1 font-medium">
                  ✅ Approve All Pending
                </button>
                <button className="bg-[#0B1E3A] hover:bg-[#0B1E3A]/80 border border-white/20 text-white text-xs px-3 py-1.5 rounded transition-colors flex items-center gap-1">
                  🔄 Refresh
                </button>
              </div>
            </div>

            {/* FILTER TABS */}
            <div className="flex border-b border-white/10 mb-4 text-sm font-medium">
              <button
                onClick={() => setActiveTab("all")}
                className={`pb-2 px-4 ${activeTab === "all" ? "text-[#D61F1F] border-b-2 border-[#D61F1F]" : "text-gray-400 hover:text-white"}`}
              >
                All (12)
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`pb-2 px-4 ${activeTab === "pending" ? "text-[#D61F1F] border-b-2 border-[#D61F1F]" : "text-gray-400 hover:text-white"}`}
              >
                Pending (8)
              </button>
              <button
                onClick={() => setActiveTab("approved")}
                className={`pb-2 px-4 ${activeTab === "approved" ? "text-[#D61F1F] border-b-2 border-[#D61F1F]" : "text-gray-400 hover:text-white"}`}
              >
                Approved (3)
              </button>
              <button
                onClick={() => setActiveTab("rejected")}
                className={`pb-2 px-4 ${activeTab === "rejected" ? "text-[#D61F1F] border-b-2 border-[#D61F1F]" : "text-gray-400 hover:text-white"}`}
              >
                Rejected (1)
              </button>
            </div>

            {/* TABLE */}
            <div className="rounded-lg overflow-hidden border border-white/10">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-xs uppercase text-gray-400 bg-[#0B1E3A]">
                  <tr>
                    <th className="px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">Caller</th>
                    <th className="px-4 py-3 font-medium">Time</th>
                    <th className="px-4 py-3 font-medium">Dur</th>
                    <th className="px-4 py-3 font-medium">Audio</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {RANTS_DATA.map((rant, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-[#D61F1F]/5 transition-colors ${idx % 2 === 0 ? "bg-[#0d1530]" : "bg-black/20"} border-b border-white/5 last:border-0`}
                    >
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs">{rant.id}</td>
                      <td className="px-4 py-3 font-medium">{rant.caller}</td>
                      <td className="px-4 py-3 text-gray-300 text-xs">{rant.time}</td>
                      <td className="px-4 py-3 text-gray-300 text-xs">{rant.duration}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="w-7 h-7 rounded-full bg-[#D61F1F] text-white flex items-center justify-center text-xs hover:bg-[#B22234] transition-colors shrink-0">
                            ▶
                          </button>
                          <Waveform />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <select 
                          className="bg-[#0B1E3A] border border-white/20 text-white text-xs rounded px-2 py-1 focus:outline-none focus:border-[#D61F1F] appearance-none cursor-pointer pr-6 relative min-w-[120px]"
                          defaultValue={rant.category || ""}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.5rem center',
                            backgroundSize: '1em 1em',
                          }}
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
                        {rant.status === "Pending" && (
                          <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full px-2 py-0.5 text-xs inline-flex items-center gap-1">
                            Pending
                          </span>
                        )}
                        {rant.status === "Approved" && (
                          <span className="bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-2 py-0.5 text-xs inline-flex items-center gap-1">
                            Approved
                          </span>
                        )}
                        {rant.status === "Rejected" && (
                          <span className="bg-red-500/20 text-red-400 border border-red-500/30 rounded-full px-2 py-0.5 text-xs inline-flex items-center gap-1">
                            Rejected
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          {rant.status === "Pending" && (
                            <>
                              <button className="bg-green-700 hover:bg-green-600 text-white rounded px-2 py-1 text-xs transition-colors" title="Approve">
                                ✅
                              </button>
                              <button className="bg-red-700 hover:bg-red-600 text-white rounded px-2 py-1 text-xs transition-colors" title="Reject">
                                ❌
                              </button>
                              <button className="bg-[#F59E0B]/20 hover:bg-[#F59E0B]/30 text-[#F59E0B] border border-[#F59E0B]/30 rounded px-2 py-1 text-xs transition-colors" title="Feature">
                                ⭐
                              </button>
                            </>
                          )}
                          {rant.status === "Approved" && (
                            <>
                              {rant.featured ? (
                                <button className="bg-[#F59E0B] text-black border border-[#F59E0B] rounded px-2 py-1 text-xs font-bold" title="Featured">
                                  ⭐✓
                                </button>
                              ) : (
                                <button className="bg-[#F59E0B]/20 hover:bg-[#F59E0B]/30 text-[#F59E0B] border border-[#F59E0B]/30 rounded px-2 py-1 text-xs transition-colors" title="Feature">
                                  ⭐
                                </button>
                              )}
                              <button className="bg-[#0B1E3A] hover:bg-white/10 text-gray-300 border border-white/20 rounded px-2 py-1 text-xs transition-colors" title="View">
                                👁
                              </button>
                            </>
                          )}
                          {rant.status === "Rejected" && (
                            <button className="bg-[#0B1E3A] hover:bg-white/10 text-gray-300 border border-white/20 rounded px-2 py-1 text-xs transition-colors" title="View">
                              👁
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
