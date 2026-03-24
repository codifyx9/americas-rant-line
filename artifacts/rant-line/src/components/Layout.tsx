import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/rants", label: "Rants" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/arena", label: "🔴🔵 Red vs Blue", colored: true },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isArena = location === "/arena";

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <nav
        className="sticky top-0 z-50 shadow-lg border-b border-red-800"
        style={
          isArena
            ? { background: "linear-gradient(90deg, #7a0000 0%, #1c0808 30%, #0a0d14 50%, #07091a 70%, #0c1a5a 100%)" }
            : { background: "#cc0000" }
        }
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="no-underline">
            <span className="font-black text-2xl tracking-tight text-white">
              {"America's"} <span className="font-light">Rant Line</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors no-underline ${
                  location === link.href
                    ? "bg-white text-[#cc0000]"
                    : link.colored
                    ? "text-yellow-200 font-black hover:text-yellow-100"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/leave-a-rant"
              className="bg-white hover:bg-white/90 text-black font-bold rounded-full px-6 py-2 shadow-md no-underline text-sm"
            >
              LEAVE A RANT
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white hover:text-white/80"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-red-800 bg-[#cc0000] px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 text-sm font-bold uppercase tracking-wider no-underline ${
                  location === link.href ? "text-white" : "text-red-100"
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
              <Link href="/terms" className="hover:text-white transition-colors no-underline text-gray-500">Terms of Use</Link>
              <Link href="/privacy" className="hover:text-white transition-colors no-underline text-gray-500">Privacy Policy</Link>
              <Link href="/community-guidelines" className="hover:text-white transition-colors no-underline text-gray-500">Community Guidelines</Link>
            </div>
          </div>
          <div className="flex items-center justify-center mt-8 gap-3">
            <p className="text-[10px] text-gray-700">
              Opinions expressed by callers are their own and do not represent the views of {"America's"} Rant Line.
            </p>
          </div>
          <div className="flex items-center justify-center mt-1 gap-2">
            <p className="text-[10px] text-gray-700">
              &copy; {new Date().getFullYear()} {"America's"} Rant Line. All rights reserved.
            </p>
            <Link href="/admin" className="text-gray-700 hover:text-gray-500 transition-colors no-underline text-[10px]">&middot; Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
