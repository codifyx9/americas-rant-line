import React, { useState } from "react";
import { Mic, Check } from "lucide-react";

export default function LeaveARant() {
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "confirmed">("idle");
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "skip" | "featured" | null>(null);

  const handlePayment = (plan: "standard" | "skip" | "featured") => {
    setSelectedPlan(plan);
    setPaymentStatus("processing");
    // Simulate payment delay
    setTimeout(() => {
      setPaymentStatus("confirmed");
      // Scroll to bottom
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 1500);
  };

  const getDeliveryTime = () => {
    if (selectedPlan === "standard") return "24 hours";
    if (selectedPlan === "skip") return "2 hours";
    if (selectedPlan === "featured") return "2 hours";
    return "";
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#D61F1F] selection:text-white pb-24">
      {/* Navigation */}
      <nav className="bg-[#D61F1F] sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <Mic className="h-6 w-6 text-white" />
              <span className="font-['Bebas_Neue'] text-white text-3xl tracking-wide mt-1">MAGARANTLINE</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="text-red-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                <a href="#" className="text-red-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Rants</a>
                <a href="#" className="text-red-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Leaderboard</a>
                <a href="#" className="bg-[#F59E0B] text-black px-5 py-2 rounded-md text-sm font-bold shadow-md hover:bg-yellow-500 transition-colors">LEAVE A RANT</a>
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <a href="#" className="bg-[#F59E0B] text-black px-4 py-2 rounded-md text-sm font-bold shadow-md hover:bg-yellow-500 transition-colors">LEAVE A RANT</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <header className="bg-gradient-to-b from-[#0B1E3A] to-black py-12 px-4">
        <div className="max-w-4xl mx-auto text-center pb-2">
          <h1 className="font-['Bebas_Neue'] text-white text-7xl md:text-8xl tracking-wide mb-4">
            LEAVE YOUR RANT
          </h1>
          <p className="text-[#F59E0B] text-xl md:text-2xl font-medium">
            Your voice matters. The country is listening.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto items-center">
          
          {/* Card 1: Standard */}
          <div className="bg-[#0B1E3A] rounded-2xl border border-white/20 p-8 flex flex-col text-center shadow-lg transition-transform hover:-translate-y-2">
            <h3 className="text-white text-2xl font-bold mb-4">Leave a Rant</h3>
            <div className="mb-8">
              <span className="font-['Bebas_Neue'] text-[#F59E0B] text-6xl tracking-wide">$1.99</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1 text-left">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span className="text-slate-300">Up to 3 min recording</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span className="text-slate-300">Published within 24 hrs</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span className="text-slate-300">Community voting</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span className="text-slate-300">Share button</span>
              </li>
            </ul>
            
            <button 
              onClick={() => handlePayment("standard")}
              disabled={paymentStatus === "processing"}
              className="w-full bg-[#F59E0B] hover:bg-yellow-500 text-black font-bold py-3 rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wide"
            >
              {paymentStatus === "processing" && selectedPlan === "standard" ? "Processing..." : "GET STARTED"}
            </button>
          </div>

          {/* Card 2: Skip the Line */}
          <div className="bg-[#D61F1F] rounded-2xl border-2 border-[#F59E0B] p-8 flex flex-col relative text-center transform lg:scale-105 shadow-2xl shadow-red-900/30 z-10">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-4">
              <div className="bg-[#F59E0B] text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                MOST POPULAR
              </div>
            </div>
            
            <h3 className="text-white text-2xl font-bold mb-4">Skip the Line</h3>
            <div className="mb-8">
              <span className="font-['Bebas_Neue'] text-white text-6xl tracking-wide">$5.00</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1 text-left">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span className="text-white font-bold">Everything in Standard</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span className="text-white">Published within 2 hrs</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span className="text-white">Priority position</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span className="text-white">Bold title styling</span>
              </li>
            </ul>
            
            <button 
              onClick={() => handlePayment("skip")}
              disabled={paymentStatus === "processing"}
              className="w-full bg-white hover:bg-gray-100 text-[#D61F1F] font-bold py-3 rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wide"
            >
              {paymentStatus === "processing" && selectedPlan === "skip" ? "Processing..." : "SKIP THE LINE"}
            </button>
          </div>

          {/* Card 3: Featured Rant */}
          <div className="bg-gradient-to-b from-[#0B1E3A] to-black rounded-2xl border border-[#F59E0B] p-8 flex flex-col text-center shadow-lg shadow-yellow-500/20 transition-transform hover:-translate-y-2">
            <h3 className="text-white text-2xl font-bold mb-4">Featured Rant</h3>
            <div className="mb-8">
              <span className="font-['Bebas_Neue'] text-[#F59E0B] text-6xl tracking-wide">$25.00</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1 text-left">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span className="text-slate-300">Everything above</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span className="text-slate-300">Front page featured</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span className="text-slate-300">Pinned 24 hrs</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span className="text-slate-300">Promoted on social</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-white shrink-0 mt-0.5" />
                <span className="text-slate-300">Personal shoutout intro</span>
              </li>
            </ul>
            
            <button 
              onClick={() => handlePayment("featured")}
              disabled={paymentStatus === "processing"}
              className="w-full bg-[#F59E0B] hover:bg-yellow-500 text-black font-bold py-3 rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wide"
            >
              {paymentStatus === "processing" && selectedPlan === "featured" ? "Processing..." : "GO FEATURED"}
            </button>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-[#0B1E3A] rounded-3xl p-8 md:p-12 mb-16 shadow-xl">
          <h2 className="font-['Bebas_Neue'] text-white text-5xl text-center mb-12 tracking-wide">
            HOW IT WORKS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 shadow-lg border border-white/10">
                <span className="font-bold text-white text-2xl">1</span>
              </div>
              <p className="text-white font-medium text-lg max-w-[250px]">Choose your plan and pay securely with Stripe</p>
            </div>
            
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 shadow-lg border border-white/10">
                <span className="font-bold text-white text-2xl">2</span>
              </div>
              <p className="text-white font-medium text-lg max-w-[250px]">Call the hotline number shown after payment</p>
            </div>
            
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 shadow-lg border border-white/10">
                <span className="font-bold text-white text-2xl">3</span>
              </div>
              <p className="text-white font-medium text-lg max-w-[250px]">Record your rant — speak freely!</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto bg-[#F59E0B] rounded-2xl p-6 md:p-8 text-center shadow-xl transform hover:scale-105 transition-transform">
            <div className="font-['Bebas_Neue'] text-5xl md:text-6xl text-[#0B1E3A] tracking-wider animate-pulse">
              📞 1-800-RANT-NOW
            </div>
          </div>
        </div>

        {/* Payment Confirmed State */}
        {paymentStatus === "confirmed" && (
          <div className="max-w-3xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="bg-green-900/20 rounded-2xl border border-green-500/30 p-8 md:p-12 text-center relative overflow-hidden shadow-2xl shadow-green-900/20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 blur-3xl rounded-full pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  ✅ Payment Confirmed! You're Ready to Rant.
                </h2>
                
                <div className="mb-6">
                  <div className="font-['Bebas_Neue'] text-5xl md:text-7xl text-[#F59E0B] tracking-wider">
                    1-800-RANT-NOW
                  </div>
                </div>

                <div className="mb-8 bg-black/40 border border-white/10 px-6 py-3 rounded-lg">
                  <p className="text-white text-xl">
                    Your call code: <span className="font-bold text-[#F59E0B]">#RNT-2847</span>
                  </p>
                </div>
                
                <p className="text-gray-400 font-medium text-lg">
                  Your rant goes live within {getDeliveryTime()}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
