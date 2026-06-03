import { Brain, Shield, BarChart2, Clock, Target, Repeat } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useCountUp';

const pillars = [
  {
    icon: <Brain size={20} />,
    title: 'Psychology First',
    description: 'Emotional mastery is the foundation of every successful trade. Control the mind, control the outcome.',
  },
  {
    icon: <Shield size={20} />,
    title: 'Risk Management',
    description: 'Capital preservation is paramount. Structured position sizing and defined risk on every single entry.',
  },
  {
    icon: <BarChart2 size={20} />,
    title: 'Market Insights',
    description: 'Institutional order flow, liquidity concepts, and real market structure analysis — not retail noise.',
  },
  {
    icon: <Clock size={20} />,
    title: 'Patience & Process',
    description: 'High-probability setups only. Waiting for the market to come to you is a skill most traders never develop.',
  },
  {
    icon: <Target size={20} />,
    title: 'Funded Accounts',
    description: 'Real prop firm experience from challenge to funded to payout. Every step documented transparently.',
  },
  {
    icon: <Repeat size={20} />,
    title: 'Consistency',
    description: 'Long-term edge built on repeatable processes. One approach, applied with precision, day after day.',
  },
];

export default function About() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden" ref={sectionRef}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0F5132]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-16">
          <div className="green-badge inline-flex mb-4">About The Brand</div>
          <h2 className="section-title text-4xl md:text-5xl mb-5">
            Who Is{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #22C55E, #4ADE80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              DR Liquidity Trader?
            </span>
          </h2>
          <div className="divider-green mx-auto" />
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
          {/* Left text */}
          <div className="animate-on-scroll space-y-6">
            <p className="text-2xl md:text-3xl font-semibold text-white leading-snug" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Trading is more than{' '}
              <span className="text-[#22C55E]">entries and exits.</span>
            </p>
            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              Success comes from discipline, emotional control, risk management, patience, and consistency.
            </p>
            <p className="text-[#D1D5DB] leading-relaxed">
              DR Liquidity Trader documents real trading experiences, funded account journeys, market insights, and trusted opportunities for traders looking to improve their performance — not just their results, but their approach to the entire craft of trading.
            </p>
            <p className="text-[#D1D5DB] leading-relaxed">
              This brand exists to share what actually works in the markets. No shortcuts. No guaranteed signals. Just transparency, discipline, and the real work behind consistent trading performance.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="glass-card px-4 py-2 text-sm text-[#22C55E] font-medium">Prop Firm Trader</span>
              <span className="glass-card px-4 py-2 text-sm text-[#22C55E] font-medium">Risk Specialist</span>
              <span className="glass-card px-4 py-2 text-sm text-[#22C55E] font-medium">Community Leader</span>
            </div>
          </div>

          {/* Right card */}
          <div className="animate-on-scroll">
            <div
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(15,81,50,0.15) 0%, rgba(10,10,10,0.8) 100%)',
                border: '1px solid rgba(34,197,94,0.2)',
              }}
            >
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#22C55E]/5 rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#0F5132]/10 rounded-tr-full" />

              <div className="relative z-10 space-y-5">
                <div className="green-badge">Core Mission</div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  "Control Your Emotions."
                </h3>
                <p className="text-[#D1D5DB] leading-relaxed text-sm">
                  The tagline is not just a catchphrase. It's a daily commitment. Every trade, every loss, every win — approached with the same emotional discipline that separates consistent traders from the rest.
                </p>

                <div className="space-y-3 pt-2">
                  {['Transparency over hype', 'Discipline over impulse', 'Process over outcome', 'Community over competition'].map((val) => (
                    <div key={val} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] flex-shrink-0" />
                      <span className="text-[#D1D5DB] text-sm">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="glass-card-hover animate-on-scroll p-6"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-10 h-10 rounded-xl bg-[rgba(15,81,50,0.3)] border border-[rgba(34,197,94,0.2)] flex items-center justify-center text-[#22C55E] mb-4">
                {pillar.icon}
              </div>
              <h4 className="font-semibold text-white mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                {pillar.title}
              </h4>
              <p className="text-[#6B7280] text-sm leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
