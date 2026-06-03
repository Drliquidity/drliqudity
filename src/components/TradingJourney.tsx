import { Flag, Target, Trophy, DollarSign, Rocket, Users, TrendingUp, Handshake, Zap, Activity } from 'lucide-react';
import { tradingMilestones } from '../data';
import { useScrollAnimation } from '../hooks/useCountUp';

const iconMap: Record<string, React.ReactNode> = {
  flag: <Flag size={16} />,
  target: <Target size={16} />,
  trophy: <Trophy size={16} />,
  dollar: <DollarSign size={16} />,
  rocket: <Rocket size={16} />,
  users: <Users size={16} />,
  'trending-up': <TrendingUp size={16} />,
  handshake: <Handshake size={16} />,
  zap: <Zap size={16} />,
  activity: <Activity size={16} />,
};

const typeColors: Record<string, { bg: string; border: string; dot: string }> = {
  milestone: { bg: 'rgba(15,81,50,0.2)', border: 'rgba(34,197,94,0.3)', dot: '#22C55E' },
  challenge: { bg: 'rgba(30,64,175,0.15)', border: 'rgba(59,130,246,0.25)', dot: '#3B82F6' },
  achievement: { bg: 'rgba(161,98,7,0.15)', border: 'rgba(234,179,8,0.3)', dot: '#EAB308' },
  brand: { bg: 'rgba(15,81,50,0.25)', border: 'rgba(34,197,94,0.4)', dot: '#4ADE80' },
  community: { bg: 'rgba(109,40,217,0.12)', border: 'rgba(139,92,246,0.25)', dot: '#A78BFA' },
  partnership: { bg: 'rgba(15,81,50,0.2)', border: 'rgba(34,197,94,0.3)', dot: '#22C55E' },
  current: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.5)', dot: '#22C55E' },
};

export default function TradingJourney() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="journey" className="relative py-24 md:py-32 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#080d08] to-[#0A0A0A] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-16">
          <div className="green-badge inline-flex mb-4">Real Journey</div>
          <h2 className="section-title text-4xl md:text-5xl mb-5">
            The{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #22C55E, #4ADE80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Trading Journey
            </span>
          </h2>
          <div className="divider-green mx-auto" />
          <p className="section-subtitle mx-auto mt-5 text-center">
            Real milestones. Real lessons. A transparent look at the path from learning trader to funded professional.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(34,197,94,0.3)] to-transparent" />

          <div className="space-y-8">
            {tradingMilestones.map((milestone, i) => {
              const colors = typeColors[milestone.type] || typeColors.milestone;
              const isEven = i % 2 === 0;

              return (
                <div
                  key={milestone.id}
                  className={`animate-on-scroll relative flex gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {/* Card — desktop: half width */}
                  <div className={`w-full md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}>
                    <div
                      className="rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <span
                            className="text-xs font-mono font-medium px-2 py-1 rounded"
                            style={{ background: 'rgba(0,0,0,0.3)', color: colors.dot }}
                          >
                            {milestone.date}
                          </span>
                        </div>
                        {milestone.type === 'current' && (
                          <span className="text-xs text-[#22C55E] font-semibold animate-pulse">● LIVE</span>
                        )}
                      </div>
                      <h4
                        className="font-semibold text-white text-base mb-2"
                        style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                      >
                        {milestone.title}
                      </h4>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 top-5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                    style={{
                      background: colors.dot,
                      boxShadow: `0 0 12px ${colors.dot}60`,
                    }}
                  >
                    <div className="text-[#0A0A0A]" style={{ transform: 'scale(0.65)' }}>
                      {iconMap[milestone.icon]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
