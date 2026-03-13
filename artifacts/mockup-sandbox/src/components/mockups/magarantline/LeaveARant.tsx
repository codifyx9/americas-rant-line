import React, { useState } from "react";
import { Phone, Check, Star, Zap, ArrowRight, CreditCard, CheckCircle2, Radio } from "lucide-react";

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
    if (selectedPlan === "featured") return "2 hours (with featured placement)";
    return "";
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans selection:bg-[#cc0000] selection:text-white pb-24">
      {/* Navigation */}
      <nav className="bg-[#cc0000] sticky top-0 z-50 shadow-md border-b border-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <Radio className="h-6 w-6 text-white" />
              <span className="font-bold text-xl tracking-tight">MagaRantLine</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="text-red-100 hover:text-white hover:bg-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                <a href="#" className="text-red-100 hover:text-white hover:bg-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">Rants</a>
                <a href="#" className="text-red-100 hover:text-white hover:bg-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">Leaderboard</a>
                <a href="#" className="bg-red-900 text-white px-4 py-2 rounded-md text-sm font-bold border border-red-500 shadow-inner">Leave a Rant</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-red-900/30 rounded-full mb-4 border border-red-500/30">
            <Phone className="h-8 w-8 text-[#FFFFFF]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Leave Your Rant
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Your voice matters. Call the hotline and let it out. Choose your plan to get started.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          
          {/* Card 1: Standard */}
          <div className="bg-[#111827] rounded-2xl border border-slate-800 p-8 flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-300 mb-2">Standard Rant</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#FFFFFF]">$1.99</span>
                <span className="text-slate-500 text-sm font-medium">/ rant</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Up to 3 minute recording</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Published within 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Community voting</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Share button</span>
              </li>
            </ul>
            
            <button 
              onClick={() => handlePayment("standard")}
              disabled={paymentStatus === "processing"}
              className="w-full bg-[#FFFFFF] hover:bg-white text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {paymentStatus === "processing" && selectedPlan === "standard" ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>Get Started <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </div>

          {/* Card 2: Skip the Line */}
          <div className="bg-[#161b2e] rounded-2xl border-2 border-[#cc0000] p-8 flex flex-col relative overflow-hidden transform md:-translate-y-4 shadow-2xl shadow-red-900/30">
            <div className="absolute top-0 inset-x-0">
              <div className="bg-[#cc0000] text-white text-xs font-bold uppercase tracking-wider py-1.5 text-center flex items-center justify-center gap-1">
                <Zap className="h-3 w-3" fill="currentColor" /> Most Popular
              </div>
            </div>
            <div className="mt-4 mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Skip the Line</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#FFFFFF]">$5.00</span>
                <span className="text-slate-400 text-sm font-medium">/ rant</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#cc0000] shrink-0 mt-0.5" />
                <span className="text-white font-medium">Everything in Standard</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#cc0000] shrink-0 mt-0.5" />
                <span className="text-white">Published within 2 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#cc0000] shrink-0 mt-0.5" />
                <span className="text-white">Priority position in feed</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#cc0000] shrink-0 mt-0.5" />
                <span className="text-white">Bold title styling</span>
              </li>
            </ul>
            
            <button 
              onClick={() => handlePayment("skip")}
              disabled={paymentStatus === "processing"}
              className="w-full bg-[#cc0000] hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/50 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {paymentStatus === "processing" && selectedPlan === "skip" ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>Skip the Line <Zap className="h-4 w-4" fill="currentColor" /></>
              )}
            </button>
          </div>

          {/* Card 3: Featured Rant */}
          <div className="bg-gradient-to-b from-[#1a1f35] to-[#0a0e1a] rounded-2xl border border-[#FFFFFF]/50 p-8 flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1 shadow-lg shadow-[#FFFFFF]/10">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-white/20 via-white/60 to-white/20"></div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#FFFFFF] mb-2 flex items-center gap-2">
                <Star className="h-5 w-5" fill="currentColor" /> Featured Rant
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#FFFFFF]">$25.00</span>
                <span className="text-slate-500 text-sm font-medium">/ rant</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#FFFFFF] shrink-0 mt-0.5" />
                <span className="text-slate-200 font-medium">Everything in Skip the Line</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#FFFFFF] shrink-0 mt-0.5" />
                <span className="text-slate-200">Front page featured placement</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#FFFFFF] shrink-0 mt-0.5" />
                <span className="text-slate-200">Pinned for 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#FFFFFF] shrink-0 mt-0.5" />
                <span className="text-slate-200">Promoted on social media</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#FFFFFF] shrink-0 mt-0.5" />
                <span className="text-slate-200">Personal shoutout intro</span>
              </li>
            </ul>
            
            <button 
              onClick={() => handlePayment("featured")}
              disabled={paymentStatus === "processing"}
              className="w-full bg-gradient-to-r from-white/20 to-[#FFFFFF] hover:from-white/20 hover:to-white/20 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FFFFFF]/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {paymentStatus === "processing" && selectedPlan === "featured" ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>Go Featured <Star className="h-4 w-4" fill="currentColor" /></>
              )}
            </button>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto bg-slate-900/50 rounded-3xl border border-slate-800 p-8 md:p-12 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center relative">
              <div className="w-16 h-16 bg-blue-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-700/50 relative z-10">
                <CreditCard className="h-8 w-8 text-blue-400" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#cc0000] rounded-full flex items-center justify-center font-bold text-white border-2 border-[#0a0e1a]">1</div>
              </div>
              <p className="text-slate-300 font-medium">Choose your plan and pay securely with Stripe</p>
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-800 -z-0"></div>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-red-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-700/50 relative z-10">
                <Phone className="h-8 w-8 text-red-400" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#cc0000] rounded-full flex items-center justify-center font-bold text-white border-2 border-[#0a0e1a]">2</div>
              </div>
              <p className="text-slate-300 font-medium">Call the hotline number shown after payment</p>
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-800 -z-0"></div>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-white/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/50 relative z-10">
                <Radio className="h-8 w-8 text-[#FFFFFF]" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#cc0000] rounded-full flex items-center justify-center font-bold text-white border-2 border-[#0a0e1a]">3</div>
              </div>
              <p className="text-slate-300 font-medium">Record your rant — speak freely!</p>
            </div>
          </div>

          <div className="bg-black/50 border border-slate-800 rounded-xl p-6 text-center shadow-inner relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out"></div>
            <p className="text-slate-400 mb-2 font-medium uppercase tracking-widest text-sm">Hotline Number</p>
            <div className="text-4xl md:text-5xl font-black text-[#FFFFFF] tracking-wider animate-pulse">
              1-800-RANT-NOW
            </div>
          </div>
        </div>

        {/* Payment Confirmed State */}
        {paymentStatus === "confirmed" && (
          <div className="max-w-3xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="bg-gradient-to-br from-green-900/40 to-slate-900 rounded-3xl border-2 border-green-500/50 p-8 md:p-12 text-center relative overflow-hidden shadow-2xl shadow-green-900/20">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <CheckCircle2 className="w-64 h-64 text-green-500" />
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center p-4 bg-green-500/20 rounded-full mb-6 text-green-400 border border-green-500/30">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">
                  Payment Confirmed! You're Ready to Rant.
                </h2>
                
                <p className="text-xl text-slate-300 mb-10 max-w-xl mx-auto">
                  Your payment was successful. Grab your phone and call the hotline right now.
                </p>
                
                <div className="bg-black/60 border-2 border-[#FFFFFF] rounded-2xl p-8 mb-8 inline-block shadow-lg shadow-[#FFFFFF]/10">
                  <div className="text-slate-400 mb-2 font-medium uppercase tracking-widest text-sm">Call Now</div>
                  <div className="text-5xl md:text-6xl font-black text-[#FFFFFF] tracking-wider mb-6">
                    1-800-RANT-NOW
                  </div>
                  <div className="bg-slate-800 text-white font-mono py-3 px-6 rounded-lg text-xl border border-slate-700 inline-block">
                    Your call code: <span className="font-bold text-[#FFFFFF]">#RNT-2847</span>
                  </div>
                </div>
                
                <div className="bg-blue-900/30 border border-blue-800/50 rounded-xl p-4 text-blue-200 flex items-center justify-center gap-3 max-w-lg mx-auto">
                  <Zap className="h-5 w-5 text-blue-400" />
                  <span>Your rant will go live within <strong>{getDeliveryTime()}</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
