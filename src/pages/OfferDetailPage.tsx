import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, CheckCircle } from 'lucide-react';
import { exclusiveOffers } from '../data';
import { useState } from 'react';

export default function OfferDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const offer = exclusiveOffers.find(o => o.id === parseInt(id || '0'));

  if (!offer) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Offer not found</h1>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const copyCode = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#22C55E] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Offers
        </button>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-8">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-base flex-shrink-0"
              style={{
                background: 'rgba(15,81,50,0.3)',
                border: '1px solid rgba(34,197,94,0.2)',
                color: '#22C55E',
                fontFamily: '"Space Grotesk", sans-serif',
              }}
            >
              {offer.logo}
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                {offer.offer}
              </h1>
              <p className="text-xl text-[#D1D5DB]">Exclusive deal for DR Liquidity Trader community</p>
            </div>
          </div>
          <p className="text-lg text-[#D1D5DB] leading-relaxed">{offer.description}</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Coupon Code */}
          <div
            className="rounded-2xl p-10"
            style={{
              background: 'linear-gradient(135deg, rgba(15,81,50,0.1) 0%, rgba(10,10,10,0.95) 100%)',
              border: '1px solid rgba(34,197,94,0.15)',
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Your Coupon Code
            </h2>
            <div
              className="rounded-xl p-6 mb-6 text-center"
              style={{ background: 'rgba(15,81,50,0.3)', border: '2px dashed rgba(34,197,94,0.5)' }}
            >
              <p className="text-sm text-[#6B7280] mb-2 uppercase tracking-wider">Coupon Code</p>
              <p
                className="text-4xl font-bold text-[#22C55E] mb-4"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {offer.code}
              </p>
              <button
                onClick={copyCode}
                className="flex items-center justify-center gap-2 mx-auto text-sm font-semibold px-4 py-2 rounded-lg transition-all"
                style={{
                  background: copied ? 'rgba(34,197,94,0.2)' : 'rgba(34,197,94,0.1)',
                  color: '#22C55E',
                }}
              >
                {copied ? (
                  <>
                    <CheckCircle size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy Code
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-[#6B7280]">
              Copy this code and use it during checkout to claim your exclusive discount.
            </p>
          </div>

          {/* Benefits */}
          <div
            className="rounded-2xl p-10"
            style={{
              background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(15,81,50,0.08) 100%)',
              border: '1px solid rgba(34,197,94,0.2)',
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              What You Get
            </h2>
            <div className="space-y-4 mb-8">
              {offer.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E] mt-2 flex-shrink-0" />
                  <span className="text-[#D1D5DB] text-lg">{benefit}</span>
                </div>
              ))}
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="btn-primary w-full justify-center text-base py-4"
            >
              Claim Offer
            </a>
          </div>
        </div>

        {/* How It Works */}
        <div
          className="rounded-2xl p-10 mb-16"
          style={{
            background: 'linear-gradient(135deg, rgba(15,81,50,0.12) 0%, rgba(10,10,10,0.95) 100%)',
            border: '1px solid rgba(34,197,94,0.1)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            How to Use This Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Copy Code', desc: 'Click the button above to copy your coupon code' },
              { step: '2', title: 'Visit {offer.company}', desc: 'Head to their website and start your account' },
              { step: '3', title: 'Apply Code', desc: 'Use your code at checkout to claim the discount' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4"
                  style={{ background: 'linear-gradient(135deg, #0F5132, #22C55E)' }}
                >
                  {item.step}
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[#6B7280] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center">
          <p className="text-[#6B7280] text-sm mb-6">
            Ready to get started? Use coupon code <span className="text-[#22C55E] font-mono font-bold">{offer.code}</span> to save on your account.
          </p>
          <button
            onClick={copyCode}
            className="btn-primary text-lg py-4 px-8"
          >
            {copied ? 'Code Copied!' : 'Copy Code & Start'}
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 p-6 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(34,197,94,0.1)]">
          <p className="text-[#6B7280] text-xs text-center">
            This is an affiliate link. DR Liquidity Trader may receive compensation at no extra cost to you. We only recommend offers that provide real value to our community.
          </p>
        </div>
      </div>
    </div>
  );
}
