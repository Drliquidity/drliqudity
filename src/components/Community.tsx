import { MessageCircle, Users, TrendingUp, Send, ChevronRight } from 'lucide-react';
import { socialLinks } from '../data';
import { useScrollAnimation } from '../hooks/useCountUp';

export default function Community() {
  const sectionRef = useScrollAnimation();

  const features = [
    { icon: <MessageCircle size={18} />, title: 'Market Analysis', desc: 'Real-time trading setups and market structure analysis' },
    { icon: <Users size={18} />, title: 'Trader Network', desc: 'Connect with traders on the same journey as you' },
    { icon: <TrendingUp size={18} />, title: 'Live Updates', desc: 'Funded account progress and trading insights' },
    { icon: <Send size={18} />, title: 'Daily Signals', desc: 'Pre-market prep and trading opportunities' },
  ];

  return (
    <section id="community" className="relative py-24 md:py-32 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#080c08] to-[#0A0A0A] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0F5132]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-14">
          <div className="green-badge inline-flex mb-4">Join Us</div>
          <h2 className="section-title text-4xl md:text-5xl mb-5">
            Join The{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #22C55E, #4ADE80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Community
            </span>
          </h2>
          <div className="divider-green mx-auto" />
          <p className="section-subtitle mx-auto mt-5 text-center">
            Connect with 5,000+ traders. Share insights. Grow together. No BS, just discipline and real market experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — Features */}
          <div className="space-y-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="animate-on-scroll glass-card-hover p-6 flex gap-4"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[rgba(15,81,50,0.3)] border border-[rgba(34,197,94,0.2)] flex items-center justify-center text-[#22C55E] flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                    {feature.title}
                  </h4>
                  <p className="text-[#6B7280] text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — CTA Card */}
          <div className="animate-on-scroll">
            <div
              className="relative rounded-3xl p-10 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(15,81,50,0.15) 100%)',
                border: '1px solid rgba(34,197,94,0.2)',
              }}
            >
              {/* Decorations */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#22C55E]/5 rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0F5132]/10 rounded-tr-full" />

              <div className="relative z-10 space-y-7">
                {/* Discord highlight */}
                <div className="space-y-4">
                  <div className="green-badge">Primary Community</div>
                  <div>
                    <h3
                      className="text-3xl font-bold text-white mb-2"
                      style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                    >
                      Discord Server
                    </h3>
                    <p className="text-[#D1D5DB] leading-relaxed text-sm">
                      Our main hub for real-time market analysis, community discussions, and trader networking. Active 24/5 with live updates.
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
                    <div className="text-2xl font-bold text-[#22C55E] mb-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                      5K+
                    </div>
                    <div className="text-xs text-[#6B7280] uppercase tracking-wider">Members</div>
                  </div>
                  <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
                    <div className="text-2xl font-bold text-[#22C55E] mb-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                      24/7
                    </div>
                    <div className="text-xs text-[#6B7280] uppercase tracking-wider">Active</div>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center text-base py-4"
                >
                  <span className="flex items-center gap-2">
                    Join Discord <ChevronRight size={16} />
                  </span>
                </a>

                {/* Secondary — Telegram */}
                <div className="pt-6 border-t border-[rgba(34,197,94,0.1)]">
                  <p className="text-xs text-[#6B7280] mb-3 uppercase tracking-widest">Also on Telegram</p>
                  <a
                    href={socialLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full justify-center"
                  >
                    <span>Join Telegram Channel</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
