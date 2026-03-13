import React, { useState } from "react";
import { Mic, Check } from "lucide-react";

export default function LeaveARant() {
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "confirmed">("idle");
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "skip" | "featured" | null>(null);

  const handlePayment = (plan: "standard" | "skip" | "featured") => {
    setSelectedPlan(plan);
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("confirmed");
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 1500);
  };

  const getDeliveryTime = () => {
    if (selectedPlan === "standard") return "24 hrs";
    if (selectedPlan === "skip") return "2 hrs";
    if (selectedPlan === "featured") return "2 hrs";
    return "";
  };

  return (
    <div className="min-h-screen bg-[#080e1f] text-white font-sans selection:bg-[#D61F1F] selection:text-white pb-24">
      {/* HERO BANNER */}
      <div className="bg-[#0B1E3A] relative overflow-hidden py-5 px-6 flex items-center justify-between">
        <div className="relative z-10">
          <img src="/__mockup/images/logo-reference.png" className="h-14 object-contain" alt="MAGA RANT LINE" />
          <div className="text-white text-xs uppercase tracking-widest mt-1">
            ★ AMERICA'S VOICE. <span style={{ color: '#D61F1F' }}>UNFILTERED.</span> REAL. ★
          </div>
        </div>
        
        {/* RIGHT (flag corner) */}
        <div className="absolute top-0 right-0 w-40 h-full pointer-events-none overflow-hidden opacity-50">
          <div 
            className="absolute inset-0 transform rotate-12 scale-150 origin-top-right"
            style={{ background: "repeating-linear-gradient(0deg, #B22234 0px, #B22234 18px, #FFFFFF 18px, #FFFFFF 36px)" }}
          />
          <div className="absolute top-0 left-0 w-16 h-16 bg-[#0B1E3A] flex items-start justify-start p-2">
            <span className="text-white text-xs leading-none">★ ★ ★<br/> ★ ★<br/>★ ★ ★</span>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="bg-[#D61F1F] sticky top-0 z-50 h-14 flex items-center px-4 gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <Mic className="h-6 w-6 text-white" />
          <span className="font-['Black_Ops_One'] text-white text-xl tracking-wide mt-1">MAGARANTLINE</span>
        </div>
        
        <div className="hidden md:flex items-center gap-3 mx-auto">
          <button className="bg-[#0B1E3A] rounded-full px-4 py-1 text-white text-sm font-semibold hover:bg-black transition-colors">🏠 HOME</button>
          <button className="bg-[#0B1E3A] rounded-full px-4 py-1 text-white text-sm font-semibold hover:bg-black transition-colors">📻 RANT WALL</button>
          <button className="bg-[#0B1E3A] rounded-full px-4 py-1 text-white text-sm font-semibold hover:bg-black transition-colors">🏆 LEADERBOARD</button>
        </div>
        
        <button className="bg-[#F59E0B] text-black font-bold rounded-full px-5 py-2 text-sm ml-auto hover:bg-yellow-500 transition-colors whitespace-nowrap">
          LEAVE A RANT →
        </button>
      </nav>

      {/* PAGE HEADER */}
      <header className="bg-gradient-to-b from-[#0B1E3A] to-[#080e1f] py-10 px-6 text-center">
        <h1 className="font-['Black_Ops_One'] text-white text-5xl md:text-6xl tracking-wide">
          LEAVE YOUR RANT
        </h1>
        <p className="text-[#F59E0B] text-base mt-2">
          Your voice matters. The country is listening.
        </p>
      </header>

      {/* PRICING CARDS */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Standard */}
          <div className="bg-[#0d1530] border border-white/20 rounded-2xl p-8 text-center flex flex-col">
            <div className="font-['Black_Ops_One'] text-[#F59E0B] text-6xl mb-2">$1.99</div>
            <h3 className="text-white font-bold text-2xl mb-4">Standard Rant</h3>
            
            <ul className="text-left text-gray-300 text-sm space-y-2 mb-8 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Up to 3 minute recording</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Published within 24 hrs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Community voting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Share button</span>
              </li>
            </ul>
            
            <button 
              onClick={() => handlePayment("standard")}
              disabled={paymentStatus === "processing"}
              className="bg-[#F59E0B] hover:bg-yellow-500 text-black font-bold w-full rounded-full py-3 mt-6 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {paymentStatus === "processing" && selectedPlan === "standard" ? "PROCESSING..." : "GET STARTED"}
            </button>
          </div>

          {/* Card 2: Skip the Line */}
          <div className="bg-[#D61F1F] border-2 border-[#F59E0B] rounded-2xl p-8 text-center relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-4 bg-[#F59E0B] text-black text-xs font-bold px-4 py-1 rounded-b-lg">
              MOST POPULAR
            </div>
            
            <div className="font-['Black_Ops_One'] text-white text-6xl mb-2">$5.00</div>
            <h3 className="text-white font-bold text-2xl mb-4">Skip the Line</h3>
            
            <ul className="text-left text-white text-sm space-y-2 mb-8 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-green-300 font-bold">✓</span>
                <span className="font-bold">Everything in Standard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300">✓</span>
                <span>Published in 2 hrs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300">✓</span>
                <span>Priority feed position</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300">✓</span>
                <span>Bold title</span>
              </li>
            </ul>
            
            <button 
              onClick={() => handlePayment("skip")}
              disabled={paymentStatus === "processing"}
              className="bg-white hover:bg-gray-100 text-[#D61F1F] font-bold w-full rounded-full py-3 mt-6 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {paymentStatus === "processing" && selectedPlan === "skip" ? "PROCESSING..." : "SKIP THE LINE"}
            </button>
          </div>

          {/* Card 3: Featured Rant */}
          <div className="bg-gradient-to-b from-[#1a1200] to-[#080e1f] border-2 border-[#F59E0B] rounded-2xl p-8 text-center shadow-lg shadow-yellow-500/10 flex flex-col">
            <div className="font-['Black_Ops_One'] text-[#F59E0B] text-6xl mb-2">$25.00</div>
            <h3 className="text-white font-bold text-2xl mb-4">Featured Rant</h3>
            
            <ul className="text-left text-gray-300 text-sm space-y-2 mb-8 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>All above</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Homepage featured placement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Pinned 24 hrs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Promoted social</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Personal intro</span>
              </li>
            </ul>
            
            <button 
              onClick={() => handlePayment("featured")}
              disabled={paymentStatus === "processing"}
              className="bg-[#F59E0B] hover:bg-yellow-500 text-black font-bold w-full rounded-full py-3 mt-6 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {paymentStatus === "processing" && selectedPlan === "featured" ? "PROCESSING..." : "GO FEATURED"}
            </button>
          </div>
        </div>
      </main>

      {/* HOW IT WORKS */}
      <div className="bg-[#0B1E3A] py-10 px-6">
        <h2 className="font-['Black_Ops_One'] text-white text-5xl text-center mb-8">
          HOW IT WORKS
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-start max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center max-w-[250px]">
            <div className="bg-[#D61F1F] text-white w-12 h-12 rounded-full font-bold text-xl flex items-center justify-center mb-4">1</div>
            <p className="text-white">Choose your plan and pay securely</p>
          </div>
          
          <div className="flex flex-col items-center text-center max-w-[250px]">
            <div className="bg-[#D61F1F] text-white w-12 h-12 rounded-full font-bold text-xl flex items-center justify-center mb-4">2</div>
            <p className="text-white">Call the hotline number shown after payment</p>
          </div>
          
          <div className="flex flex-col items-center text-center max-w-[250px]">
            <div className="bg-[#D61F1F] text-white w-12 h-12 rounded-full font-bold text-xl flex items-center justify-center mb-4">3</div>
            <p className="text-white">Record your rant — speak freely!</p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-[#F59E0B] rounded-2xl px-8 py-6 inline-block shadow-lg">
            <div className="font-['Black_Ops_One'] text-black text-4xl tracking-wider">
              📞 1-800-RANT-NOW
            </div>
          </div>
        </div>
      </div>

      {/* PAYMENT CONFIRMED SECTION */}
      {paymentStatus === "confirmed" && (
        <div className="bg-[#080e1f] py-12 px-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-8 text-center max-w-md mx-auto shadow-2xl">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-white font-bold text-xl mb-6">
              Payment Confirmed! Ready to Rant.
            </h3>
            
            <div className="font-['Black_Ops_One'] text-[#F59E0B] text-4xl mb-6 tracking-wide">
              1-800-RANT-NOW
            </div>
            
            <div className="text-gray-400 mb-2 text-lg">
              Call code: <span className="font-bold text-white">#RNT-2847</span>
            </div>
            
            <div className="text-gray-400 text-sm">
              Goes live within {getDeliveryTime()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
