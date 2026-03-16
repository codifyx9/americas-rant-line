import React, { useState } from "react";
import { Phone, Check, Star, Zap, ArrowRight, CreditCard, CheckCircle2, Radio, ChevronDown, ChevronUp, Shield, Clock, Mic, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PLANS = [
  {
    id: 'standard',
    name: 'Standard Rant',
    price: '$2.99',
    tag: null,
    color: 'border-[#cc0000]/40 bg-[#111827]',
    btnClass: 'bg-white text-black hover:bg-white/90',
    checkColor: 'text-green-400',
    features: [
      'Up to 3 minute recording',
      'Published within 24 hours',
      'Community voting enabled',
      'Shareable link',
      'Searchable in feed',
    ],
  },
  {
    id: 'skip',
    name: 'Skip the Line',
    price: '$5.00',
    tag: 'Most Popular',
    color: 'border-[#cc0000] bg-[#161b2e] shadow-2xl shadow-red-900/30 scale-[1.02]',
    btnClass: 'bg-[#cc0000] text-white hover:bg-red-700',
    checkColor: 'text-[#cc0000]',
    features: [
      'Everything in Standard',
      'Published within 2 hours',
      'Priority position in feed',
      'Bold title styling',
      'Email notification when live',
    ],
  },
  {
    id: 'featured',
    name: 'Featured Rant',
    price: '$25.00',
    tag: '⭐ VIP',
    color: 'border-white/30 bg-gradient-to-b from-[#1a1f35] to-[#0a0e1a]',
    btnClass: 'bg-white text-black hover:bg-white/90',
    checkColor: 'text-white',
    features: [
      'Everything in Skip the Line',
      'Front page featured placement',
      'Pinned for 24 hours',
      'Promoted on social media',
      'Personal shoutout intro by host',
    ],
  },
];

const FAQS = [
  { q: 'How long can my rant be?', a: 'Standard rants can be up to 3 minutes. Skip the Line and Featured rants can be up to 5 minutes.' },
  { q: 'Is my identity kept anonymous?', a: 'Yes. We only show your general location (city/state) unless you choose to share your name. Your phone number is never displayed publicly.' },
  { q: 'When will my rant go live?', a: 'Standard rants go live within 24 hours after passing our brief review. Skip the Line rants go live within 2 hours. Featured rants go live within 30 minutes.' },
  { q: 'What topics are allowed?', a: 'Anything you want to rant about! Politics, work, dating, inflation, family — it all goes. The only rule: no threats, no doxxing, no illegal content.' },
  { q: 'Can I get a refund?', a: 'Refunds are available if your rant is rejected by our review team. If it goes live, no refund is issued.' },
  { q: 'How does the weekly challenge work?', a: 'Every week we pick the most-voted rant for a $100 cash prize. Anyone who leaves a rant is automatically entered.' },
];

const TESTIMONIALS = [
  { name: 'PatriotPete', state: 'Texas', quote: 'Left my rant at noon, it was live by 1:30 PM. 1,000 votes by midnight. This platform is the real deal.', plan: 'Skip the Line', votes: '1,203' },
  { name: 'TiredInTampa', state: 'Florida', quote: "Nobody wants to hear you on the news, they want a soundbite. America's Rant Line let me say everything I actually think.", plan: 'Standard', votes: '876' },
  { name: 'RanchManTX', state: 'Texas', quote: 'Went Featured, got shared on Twitter, 15k plays in 2 days. Worth every penny of the $25.', plan: 'Featured', votes: '2,847' },
];

export default function LeaveARant() {
  const [payment, setPayment] = useState<'idle'|'processing'|'confirmed'>('idle');
  const [selectedPlan, setSelectedPlan] = useState<string|null>(null);
  const [openFaq, setOpenFaq] = useState<number|null>(null);
  const [email, setEmail] = useState('');

  const handlePay = (id: string) => {
    setSelectedPlan(id);
    setPayment('processing');
    setTimeout(() => setPayment('confirmed'), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans pb-24">
      {/* NAV */}
      <nav className="bg-[#cc0000] sticky top-0 z-50 shadow-md border-b border-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="font-black text-2xl tracking-tight text-white">America's <span className="font-light">Rant Line</span></span>
            </div>
            <div className="hidden md:flex items-baseline space-x-6">
              {['Home','Rants','Leaderboard'].map(l => <a key={l} href="#" className="text-red-100 hover:text-white text-sm font-medium transition-colors">{l}</a>)}
              <a href="#" className="bg-red-900 text-white px-4 py-2 rounded-md text-sm font-bold border border-red-500">Leave a Rant</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* HERO HEADER */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-800 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Hotline Open Now · 1-888-460-RANT
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 uppercase">Leave Your <span className="text-[#cc0000]">Rant</span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Choose your plan, get your call code, dial the hotline, and say exactly what's on your mind. No filter. No editing. Just you.
          </p>
          <div className="flex items-center justify-center gap-8 mt-6 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-500" /> Secure payment</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-400" /> Live within hours</span>
            <span className="flex items-center gap-2"><Mic className="w-4 h-4 text-red-400" /> Fully anonymous</span>
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto items-start">
          {PLANS.map((plan) => (
            <div key={plan.id} className={`rounded-2xl border-2 p-7 flex flex-col relative overflow-hidden transition-transform ${plan.color}`}>
              {plan.tag && (
                <div className={`absolute top-0 inset-x-0 py-1.5 text-xs font-black uppercase tracking-widest text-center flex items-center justify-center gap-1 ${plan.id === 'skip' ? 'bg-[#cc0000] text-white' : 'bg-white/10 text-white'}`}>
                  <Zap className="h-3 w-3" fill="currentColor" /> {plan.tag}
                </div>
              )}
              <div className={plan.tag ? 'mt-6' : ''}>
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-gray-500 text-sm">/ rant</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className={`h-4 w-4 ${plan.checkColor} shrink-0 mt-0.5`} />
                    <span className="text-gray-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePay(plan.id)}
                disabled={payment === 'processing'}
                className={`w-full ${plan.btnClass} font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg text-base disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {payment === 'processing' && selectedPlan === plan.id
                  ? <span className="animate-pulse">Processing...</span>
                  : plan.id === 'skip' ? <><Zap className="h-4 w-4" fill="currentColor" /> Skip the Line</>
                  : plan.id === 'featured' ? <><Star className="h-4 w-4" fill="currentColor" /> Go Featured</>
                  : <>Get Started <ArrowRight className="h-4 w-4" /></>}
              </button>
            </div>
          ))}
        </div>

        {/* HOW IT WORKS */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl font-black text-center uppercase tracking-tight mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { step: '1', icon: <CreditCard className="h-7 w-7 text-blue-400" />, title: 'Choose & Pay', desc: 'Pick your plan and pay securely via Stripe. Takes under 60 seconds.' },
              { step: '2', icon: <MessageSquare className="h-7 w-7 text-red-400" />, title: 'Get Your Code', desc: 'Receive your unique call code and the hotline number instantly by text or email.' },
              { step: '3', icon: <Phone className="h-7 w-7 text-green-400" />, title: 'Call & Record', desc: 'Dial 1-888-460-RANT, enter your code, and speak your mind. Up to 5 minutes.' },
              { step: '4', icon: <Radio className="h-7 w-7 text-white" />, title: 'Go Live', desc: 'Your rant is reviewed, published, and shared to 89,000+ listeners immediately.' },
            ].map((s) => (
              <div key={s.step} className="bg-[#0f1423] border border-[#cc0000]/20 rounded-xl p-5 relative">
                <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-[#cc0000] flex items-center justify-center text-xs font-black text-white">{s.step}</div>
                <div className="mb-4 mt-2">{s.icon}</div>
                <h3 className="font-black text-white text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-black/50 border-2 border-[#cc0000]/50 rounded-xl p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-pulse pointer-events-none"></div>
            <p className="text-gray-500 mb-1 font-medium uppercase tracking-widest text-xs">Hotline Number</p>
            <div className="text-5xl md:text-6xl font-black text-white tracking-widest">1-888-460-RANT</div>
            <p className="text-gray-600 text-xs mt-2">Available 24/7 · All US numbers accepted</p>
          </div>

          {/* Optional email */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email to get notified when your rant goes live (optional)"
              className="flex-1 bg-[#111827] border border-[#cc0000]/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#cc0000]"
            />
            <button className="bg-[#cc0000] hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shrink-0">Notify Me</button>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl font-black text-center uppercase tracking-tight mb-8">What Ranters Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-[#111827] border border-[#cc0000]/25 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#cc0000]/30 border border-[#cc0000]/40 flex items-center justify-center font-black text-white text-sm">{t.name[0]}</div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.state} · {t.plan}</div>
                  </div>
                  <div className="ml-auto text-red-400 font-black text-sm">🔥 {t.votes}</div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-black text-center uppercase tracking-tight mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-[#111827] border border-[#cc0000]/25 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/3 transition-colors"
                >
                  <span className="font-bold text-white">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CONFIRMED STATE */}
        {payment === 'confirmed' && (
          <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-gradient-to-br from-green-900/40 to-[#0a0e1a] rounded-3xl border-2 border-green-500/50 p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none"><CheckCircle2 className="w-64 h-64 text-green-500" /></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center p-4 bg-green-500/20 rounded-full mb-6 border border-green-500/30">
                  <CheckCircle2 className="h-12 w-12 text-green-400" />
                </div>
                <h2 className="text-4xl font-black text-white mb-3 uppercase">Payment Confirmed!</h2>
                <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto">You're ready to rant. Grab your phone and call now.</p>
                <div className="bg-black/60 border-2 border-white rounded-2xl p-8 mb-8 inline-block">
                  <div className="text-gray-400 mb-2 font-medium uppercase tracking-widest text-xs">Call Now</div>
                  <div className="text-5xl md:text-6xl font-black text-white tracking-wider mb-5">1-888-460-RANT</div>
                  <div className="bg-gray-800 text-white font-mono py-3 px-6 rounded-lg text-xl border border-[#cc0000]/50 inline-block">
                    Your call code: <span className="font-black text-red-400">#RNT-2847</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">Your rant will go live within {selectedPlan === 'standard' ? '24 hours' : selectedPlan === 'skip' ? '2 hours' : '30 minutes'}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
