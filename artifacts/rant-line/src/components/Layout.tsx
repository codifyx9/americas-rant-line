import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/rants", label: "RANTS" },
  { href: "/leaderboard", label: "LEADERBOARD" },
  { href: "/arena", label: "RED VS BLUE", colored: true },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <nav className="bg-[#0a0e1a]/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="no-underline">
            <span className="font-black text-xl tracking-tight text-white">
              {"America's"} <span className="font-light">Rant Line</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-bold tracking-wider no-underline transition-colors ${
                  location === link.href
                    ? "text-white"
                    : link.colored
                    ? "text-red-400 hover:text-red-300"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.colored && (
                  <span className="mr-1">
                    <span className="text-red-500">&#9679;</span>
                    <span className="text-white">&#9679;</span>
                    <span className="text-blue-500">&#9679;</span>
                  </span>
                )}
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/leave-a-rant"
              className="bg-white text-black font-black text-xs px-4 py-2 rounded-full no-underline hover:bg-white/90 transition-colors"
            >
              LEAVE A RANT
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#0a0e1a] px-4 py-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 text-sm font-bold tracking-wider no-underline ${
                  location === link.href ? "text-white" : "text-gray-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main>{children}</main>

      <footer className="bg-[#060810] border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-black text-lg text-white">
                {"America's"} <span className="font-light">Rant Line</span>
              </span>
              <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                <Phone className="w-3 h-3" />
                <span>1-888-460-RANT</span>
              </div>
            </div>
            <div className="flex gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Community Guidelines</a>
            </div>
          </div>
          <p className="text-center text-[10px] text-gray-700 mt-8">
            Opinions expressed by callers are their own and do not represent the views of {"America's"} Rant Line.
          </p>
          <p className="text-center text-[10px] text-gray-700 mt-1">
            &copy; {new Date().getFullYear()} {"America's"} Rant Line. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
