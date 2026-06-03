import { useState } from 'react';
import { ExternalLink, CheckCircle, Building2, Landmark, Wrench, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { partners } from '../data';
import { useScrollAnimation } from '../hooks/useCountUp';

const categories = [
  { key: 'all', label: 'All Partners', icon: <Building2 size={14} /> },
  { key: 'prop-firm', label: 'Prop Firms', icon: <TrendingUpIcon /> },
  { key: 'broker', label: 'Brokers', icon: <Landmark size={14} /> },
  { key: 'tool', label: 'Trading Tools', icon: <Wrench size={14} /> },
];

function TrendingUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

export default function Partners() {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  const sectionRef = useScrollAnimation();

  const filtered = activeCategory === 'all'
    ? partners
    : partners.filter((p) => p.category === activeCategory);

  return (
    <section id="partners" className="relative py-24 md:py-32 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#080c08] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#0F5132]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-12">
          <div className="green-badge inline-flex mb-4">Verified Partnerships</div>
          <h2 className="section-title text-4xl md:text-5xl mb-5">
            Official{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #22C55E, #4ADE80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Partners
            </span>
          </h2>
          <div className="divider-green mx-auto" />
          <p className="section-subtitle mx-auto mt-5 text-center">
            Hand-selected partners that DR Liquidity Trader has personally used, evaluated, and trusts to provide real value to the trading community.
          </p>
        </div>

        {/* Category filter */}
        <div className="animate-on-scroll flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'bg-[#22C55E] text-[#0A0A0A]'
                  : 'glass-card text-[#D1D5DB] hover:text-white hover:border-[rgba(34,197,94,0.3)]'
              }`}
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Partners grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((partner, i) => (
            <div
              key={partner.id}
              className="animate-on-scroll group relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, rgba(15,81,50,0.1) 0%, rgba(17,17,17,0.95) 100%)',
                border: partner.featured ? '1px solid rgba(34,197,94,0.35)' : '1px solid rgba(34,197,94,0.1)',
                boxShadow: partner.featured ? '0 0 30px rgba(34,197,94,0.1)' : undefined,
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {partner.featured && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#22C55E] to-transparent" />
              )}

              <div className="p-6">
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{
                        background: 'rgba(15,81,50,0.3)',
                        border: '1px solid rgba(34,197,94,0.2)',
                        color: '#22C55E',
                        fontFamily: '"Space Grotesk", sans-serif',
                        letterSpacing: '-0.03em',
                        fontSize: partner.logo.length > 6 ? '9px' : '11px',
                      }}
                    >
                      {partner.logo}
                    </div>
                    <div>
                      <div className="font-bold text-white text-base" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                        {partner.name}
                      </div>
                      <div className="text-[#6B7280] text-xs">{partner.tagline}</div>
                    </div>
                  </div>
                  <div className="partner-badge flex-shrink-0">
                    <CheckCircle size={9} />
                    Official
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#D1D5DB] text-sm leading-relaxed mb-5">{partner.description}</p>

                {/* Benefits */}
                <div className="space-y-2 mb-6">
                  {partner.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] flex-shrink-0" />
                      <span className="text-[#D1D5DB] text-xs">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => navigate(`/partner/${partner.id}`)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 group-hover:bg-[#22C55E] group-hover:text-[#0A0A0A]"
                  style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    background: 'rgba(34,197,94,0.08)',
                    border: '1px solid rgba(34,197,94,0.25)',
                    color: '#22C55E',
                  }}
                >
                  Learn More <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
