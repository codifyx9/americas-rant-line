import { Link } from "wouter";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0e1a]">
      <div className="text-center">
        <AlertCircle className="h-12 w-12 text-[#cc0000] mx-auto mb-4" />
        <h1 className="text-4xl font-black text-white mb-2">404</h1>
        <p className="text-gray-500 mb-6">This page does not exist.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold text-sm px-6 py-3 rounded-full no-underline transition-colors">
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
