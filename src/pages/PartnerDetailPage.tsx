import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';
import { partners } from '../data';

export default function PartnerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const partner = partners.find(p => p.id === parseInt(id || '0'));

  if (!partner) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Partner not found</h1>
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

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#22C55E] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Partners
        </button>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-8">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0"
              style={{
                background: 'rgba(15,81,50,0.3)',
                border: '1px solid rgba(34,197,94,0.2)',
                color: '#22C55E',
                fontFamily: '"Space Grotesk", sans-serif',
              }}
            >
              {partner.logo}
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                {partner.name}
              </h1>
              <p className="text-xl text-[#22C55E]">{partner.tagline}</p>
            </div>
          </div>
          {partner.featured && (
            <div className="inline-flex gap-2 mb-6">
              <span className="partner-badge">
                <CheckCircle size={10} />
                Official Partner
              </span>
            </div>
          )}
          <p className="text-lg text-[#D1D5DB] leading-relaxed mb-8">{partner.description}</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Benefits */}
          <div
            className="rounded-2xl p-10"
            style={{
              background: 'linear-gradient(135deg, rgba(15,81,50,0.1) 0%, rgba(10,10,10,0.95) 100%)',
              border: '1px solid rgba(34,197,94,0.15)',
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Key Benefits
            </h2>
            <div className="space-y-4">
              {partner.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E] mt-2 flex-shrink-0" />
                  <span className="text-[#D1D5DB] text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div
            className="rounded-2xl p-10 flex flex-col justify-between"
            style={{
              background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(15,81,50,0.08) 100%)',
              border: '1px solid rgba(34,197,94,0.2)',
            }}
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                Ready to Start?
              </h2>
              <p className="text-[#D1D5DB] mb-6">
                Click below to visit {partner.name} and begin your trading journey with an official DR Liquidity Trader partner.
              </p>
            </div>
            <a
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center text-base py-4"
            >
              Visit {partner.name}
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        {/* Why Partner With */}
        <div
          className="rounded-2xl p-10 mb-16"
          style={{
            background: 'linear-gradient(135deg, rgba(15,81,50,0.12) 0%, rgba(10,10,10,0.95) 100%)',
            border: '1px solid rgba(34,197,94,0.1)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Why We Partner with {partner.name}
          </h2>
          <p className="text-[#D1D5DB] text-lg leading-relaxed mb-4">
            {partner.name} has been personally evaluated and tested by DR Liquidity Trader. We only recommend platforms and services that meet our rigorous standards for:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-[#D1D5DB]">
              <span className="text-[#22C55E] font-bold">✓</span>
              <span>Reliability and institutional-grade execution</span>
            </li>
            <li className="flex items-start gap-3 text-[#D1D5DB]">
              <span className="text-[#22C55E] font-bold">✓</span>
              <span>Transparent pricing and terms</span>
            </li>
            <li className="flex items-start gap-3 text-[#D1D5DB]">
              <span className="text-[#22C55E] font-bold">✓</span>
              <span>Community value and support</span>
            </li>
            <li className="flex items-start gap-3 text-[#D1D5DB]">
              <span className="text-[#22C55E] font-bold">✓</span>
              <span>Real trader benefits and opportunities</span>
            </li>
          </ul>
        </div>

        {/* CTA Footer */}
        <div className="text-center">
          <p className="text-[#6B7280] text-sm mb-6">
            Ready to get started? Join thousands of traders already using {partner.name}.
          </p>
          <a
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg py-4 px-8"
          >
            Open {partner.name}
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
