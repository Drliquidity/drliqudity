import { ArrowRight, Users, TrendingUp, Shield, ChevronDown } from 'lucide-react';
import ChartBackground from './ChartBackground';
import { socialLinks, tickerData } from '../data';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0A]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0a150a] to-[#0A0A0A]" />
        <ChartBackground />
        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#0F5132]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-6 pt-24 pb-16">
        {/* Badge */}
        <div
          className="green-badge mb-6"
          style={{ animation: 'fadeInDown 0.6s ease-out 0.2s both' }}
        >
          <TrendingUp size={12} />
          Professional Trading Brand
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 leading-none tracking-tight"
          style={{ fontFamily: '"Space Grotesk", sans-serif', animation: 'fadeInUp 0.8s ease-out 0.3s both' }}
        >
          DR{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #22C55E, #4ADE80)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Liquidity
          </span>
          <br />Trader
        </h1>

        {/* Tagline */}
        <p
          className="text-xl md:text-2xl lg:text-3xl text-[#D1D5DB] font-light tracking-widest mb-6 uppercase"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.45s both', letterSpacing: '0.2em' }}
        >
          Control Your Emotions.
        </p>

        {/* Divider */}
        <div
          className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#22C55E] to-transparent mb-8"
          style={{ animation: 'fadeIn 0.6s ease-out 0.6s both' }}
        />

        {/* Description */}
        <p
          className="max-w-xl text-[#D1D5DB] text-lg leading-relaxed mb-10"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.55s both' }}
        >
          Professional trading insights, real market experience, trusted partnerships, and a transparent trading journey.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.65s both' }}
        >
          <button
            onClick={() => scrollTo('about')}
            className="btn-primary text-base py-3.5 px-7"
          >
            <span className="flex items-center gap-2">
              Explore Resources <ArrowRight size={16} />
            </span>
          </button>
          <button
            onClick={() => scrollTo('partners')}
            className="btn-outline text-base py-3.5 px-7"
          >
            View Partnerships
          </button>
          <a
            href={socialLinks.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-base py-3.5 px-7 border-[rgba(255,255,255,0.15)] text-[#D1D5DB] hover:text-white hover:border-white/30 hover:bg-white/5"
          >
            <Users size={16} />
            Join Community
          </a>
        </div>

        {/* Stats mini-bar */}
        <div
          className="glass-card flex flex-wrap items-center justify-center gap-8 py-4 px-8"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.75s both' }}
        >
          {[
            { icon: <Users size={14} />, label: '5,000+ Community' },
            { icon: <TrendingUp size={14} />, label: '8+ Funded Accounts' },
            { icon: <Shield size={14} />, label: '12+ Trusted Partners' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-[#D1D5DB]">
              <span className="text-[#22C55E]">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="relative z-10 border-t border-[rgba(34,197,94,0.1)] bg-[rgba(0,0,0,0.4)] backdrop-blur-sm overflow-hidden">
        <div className="flex" style={{ animation: 'ticker 30s linear infinite' }}>
          {[...tickerData, ...tickerData].map((item, i) => (
            <div key={i} className="ticker-item">
              <span className="text-[#6B7280]">{item.pair}</span>
              <span className={item.positive ? 'text-[#22C55E]' : 'text-red-400'}>
                {item.change}
              </span>
              <span className="text-[rgba(34,197,94,0.2)]">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-[#6B7280] hover:text-[#22C55E] transition-colors animate-float z-10"
        aria-label="Scroll down"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
}
