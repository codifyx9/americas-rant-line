import { useState } from "react";
import { Phone, CreditCard, Shield, Clock, Mic, Star, Zap, CheckCircle } from "lucide-react";

const LINES = [
  {
    key: "maga",
    emoji: "🟥",
    label: "MAGA LINE",
    sublabel: "Conservative / Republican",
    color: "border-red-600 bg-red-600/10 hover:bg-red-600/20",
    activeColor: "border-red-500 bg-red-600/20 ring-2 ring-red-500/50",
  },
  {
    key: "blue",
    emoji: "🟦",
    label: "BLUE LINE",
    sublabel: "Democrat / Progressive",
    color: "border-blue-600 bg-blue-600/10 hover:bg-blue-600/20",
    activeColor: "border-blue-500 bg-blue-600/20 ring-2 ring-blue-500/50",
  },
  {
    key: "neutral",
    emoji: "⬜",
    label: "NEUTRAL LINE",
    sublabel: "Independent / Other",
    color: "border-gray-600 bg-gray-600/10 hover:bg-gray-600/20",
    activeColor: "border-gray-400 bg-gray-600/20 ring-2 ring-gray-400/50",
  },
];

const PLANS = [
  {
    key: "standard",
    label: "Standard",
    price: "$2.99",
    features: ["2-minute rant", "Published to feed", "Community voting"],
    icon: Mic,
    popular: true,
  },
  {
    key: "skip-line",
    label: "Skip the Line",
    price: "$5.00",
    features: ["Priority queue", "3-minute rant", "Published to feed", "Community voting"],
    icon: Zap,
    popular: false,
  },
  {
    key: "featured",
    label: "Featured",
    price: "$25.00",
    features: ["Featured placement", "5-minute rant", "Highlighted on homepage", "Priority moderation"],
    icon: Star,
    popular: false,
  },
];

export default function LeaveARant() {
  const [selectedLine, setSelectedLine] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = async () => {
    if (!selectedLine) return;
    setPurchasing(true);
    try {
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${base}/api/payments/create-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: selectedPlan, category: selectedLine }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Payment system is not configured yet. Call 1-888-460-RANT directly!");
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div className="bg-[#0a0e1a] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="font-black text-3xl text-white mb-2">LEAVE A RANT</h1>
          <p className="text-gray-500 text-sm">Pick your line, choose your plan, and let America hear you</p>
        </div>

        <div className="mb-10">
          <h2 className="font-black text-sm text-gray-400 mb-4 uppercase tracking-wider">Step 1: Choose Your Line</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {LINES.map((line) => (
              <button
                key={line.key}
                onClick={() => setSelectedLine(line.key)}
                className={`p-6 rounded-xl border text-center transition-all ${
                  selectedLine === line.key ? line.activeColor : line.color
                }`}
              >
                <div className="text-4xl mb-3">{line.emoji}</div>
                <div className="font-black text-white text-sm mb-1">{line.label}</div>
                <div className="text-gray-500 text-xs">{line.sublabel}</div>
                {selectedLine === line.key && (
                  <CheckCircle className="w-5 h-5 text-green-400 mx-auto mt-3" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="font-black text-sm text-gray-400 mb-4 uppercase tracking-wider">Step 2: Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {PLANS.map((plan) => (
              <button
                key={plan.key}
                onClick={() => setSelectedPlan(plan.key)}
                className={`relative p-6 rounded-xl border text-left transition-all ${
                  selectedPlan === plan.key
                    ? "border-[#cc0000] bg-[#cc0000]/10 ring-2 ring-[#cc0000]/50"
                    : "border-white/10 bg-[#111827] hover:border-white/20"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-2.5 right-4 bg-[#cc0000] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <plan.icon className="w-6 h-6 text-[#cc0000] mb-3" />
                <div className="font-black text-white text-lg mb-1">{plan.price}</div>
                <div className="font-bold text-white text-sm mb-3">{plan.label}</div>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="font-black text-sm text-gray-400 mb-4 uppercase tracking-wider">Step 3: How It Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: CreditCard, label: "Pay securely", desc: "Quick checkout" },
              { icon: Phone, label: "Get your code", desc: "Unique call code" },
              { icon: Mic, label: "Call & record", desc: "1-888-460-RANT" },
              { icon: Star, label: "Go live", desc: "Published to feed" },
            ].map((step, i) => (
              <div key={i} className="bg-[#111827] border border-white/5 rounded-xl p-5 text-center">
                <div className="w-8 h-8 rounded-full bg-[#cc0000]/20 flex items-center justify-center mx-auto mb-3">
                  <step.icon className="w-4 h-4 text-[#cc0000]" />
                </div>
                <div className="font-bold text-white text-sm mb-1">{step.label}</div>
                <div className="text-gray-500 text-xs">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handlePurchase}
            disabled={!selectedLine || purchasing}
            className="bg-[#cc0000] hover:bg-[#aa0000] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-lg px-12 py-4 rounded-full transition-colors inline-flex items-center gap-3"
          >
            <Phone className="w-5 h-5" />
            {purchasing ? "PROCESSING..." : `GET YOUR CALL CODE — ${PLANS.find(p => p.key === selectedPlan)?.price}`}
          </button>
          <p className="text-gray-600 text-xs mt-4 flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" /> Secure payment via Stripe &middot; <Clock className="w-3 h-3" /> Code valid for 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}
