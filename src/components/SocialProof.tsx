import { useCountUp, useScrollAnimation } from '../hooks/useCountUp';
import { stats } from '../data';

export default function SocialProof() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="proof" className="relative py-20 md:py-28 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#080c08] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#22C55E]/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const { count, ref } = useCountUp(stat.value, 2500);
            return (
              <div
                key={i}
                ref={ref}
                className="animate-on-scroll text-center rounded-2xl p-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(15,81,50,0.08) 0%, rgba(10,10,10,0.95) 100%)',
                  border: '1px solid rgba(34,197,94,0.12)',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div className="number-display text-5xl md:text-6xl font-black mb-2">
                  {count}
                  <span className="text-[#22C55E]">{stat.suffix}</span>
                </div>
                <p className="text-[#D1D5DB] text-sm uppercase tracking-wider font-semibold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
