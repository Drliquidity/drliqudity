import { useState } from 'react';
import { Copy, CheckCircle, ExternalLink, Tag, Gift, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { exclusiveOffers } from '../data';
import { useScrollAnimation } from '../hooks/useCountUp';

export default function ExclusiveOffers() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const navigate = useNavigate();
  const sectionRef = useScrollAnimation();

  const copyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code).catch(() => {
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    });
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="offers" className="relative py-24 md:py-32 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#080c08] to-[#0A0A0A] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#22C55E]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-14">
          <div className="green-badge inline-flex mb-4">
            <Gift size={12} />
            Community Exclusive
          </div>
          <h2 className="section-title text-4xl md:text-5xl mb-5">
            Partner Benefits &{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #22C55E, #4ADE80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Exclusive Deals
            </span>
          </h2>
          <div className="divider-green mx-auto" />
          <p className="section-subtitle mx-auto mt-5 text-center">
            Real discount codes and exclusive offers negotiated specifically for the DR Liquidity Trader community. Save on your trading journey.
          </p>
        </div>

        {/* Offers grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {exclusiveOffers.map((offer, i) => (
            <div
              key={offer.id}
              className="animate-on-scroll group relative rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(15,81,50,0.08) 100%)',
                border: '1px solid rgba(34,197,94,0.15)',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Top accent bar */}
              <div className="h-0.5 bg-gradient-to-r from-[#0F5132] via-[#22C55E] to-[#0F5132]" />

              <div className="p-7">
                {/* Company header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center font-bold flex-shrink-0"
                      style={{
                        background: 'rgba(15,81,50,0.25)',
                        border: '1px solid rgba(34,197,94,0.2)',
                        color: '#22C55E',
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: offer.logo.length > 6 ? '9px' : '10px',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {offer.logo}
                    </div>
                    <div>
                      <div className="font-bold text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                        {offer.company}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Tag size={10} className="text-[#22C55E]" />
                        <span className="text-[#22C55E] text-xs font-semibold">{offer.offer}</span>
                      </div>
                    </div>
                  </div>
                  <div className="partner-badge">Exclusive</div>
                </div>

                {/* Description */}
                <p className="text-[#D1D5DB] text-sm leading-relaxed mb-5">{offer.description}</p>

                {/* Benefits */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {offer.benefits.map((b) => (
                    <span
                      key={b}
                      className="text-xs px-3 py-1 rounded-full text-[#D1D5DB]"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {b}
                    </span>
                  ))}
                </div>

                {/* Coupon code */}
                <div
                  className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 mb-5"
                  style={{ background: 'rgba(15,81,50,0.2)', border: '1px dashed rgba(34,197,94,0.4)' }}
                >
                  <div>
                    <div className="text-[#6B7280] text-xs mb-0.5 uppercase tracking-wider">Coupon Code</div>
                    <div
                      className="font-mono font-bold text-[#22C55E] text-lg tracking-widest"
                      style={{ fontFamily: '"JetBrains Mono", monospace' }}
                    >
                      {offer.code}
                    </div>
                  </div>
                  <button
                    onClick={() => copyCode(offer.id, offer.code)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                    style={{
                      background: copiedId === offer.id ? 'rgba(34,197,94,0.2)' : 'rgba(34,197,94,0.1)',
                      border: '1px solid rgba(34,197,94,0.3)',
                      color: '#22C55E',
                      fontFamily: '"Space Grotesk", sans-serif',
                    }}
                  >
                    {copiedId === offer.id ? (
                      <>
                        <CheckCircle size={14} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                {/* CTA */}
                <button
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    background: 'linear-gradient(135deg, #0F5132, #22C55E)',
                    color: '#FFFFFF',
                  }}
                  onClick={() => navigate(`/offer/${offer.id}`)}
                >
                  View Offer <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="animate-on-scroll text-center text-[#6B7280] text-xs mt-8 max-w-2xl mx-auto">
          Some links on this page are affiliate links. DR Liquidity Trader may receive a commission at no extra cost to you. Only partners that have been personally evaluated and trusted are featured.
        </p>
      </div>
    </section>
  );
}
