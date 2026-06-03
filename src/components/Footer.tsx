import { TrendingUp, Mail, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { socialLinks, navLinks } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-[rgba(34,197,94,0.1)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        {/* Top section */}
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <img
                src="/_RZ-gArh_400x400_(1).jpg"
                alt="DR Liquidity Trader"
                className="w-10 h-10 rounded-full object-cover shadow-[0_0_12px_rgba(34,197,94,0.3)]"
              />
              <div className="leading-tight">
                <div className="font-display font-700 text-white text-xs tracking-wide" style={{ fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '-0.02em' }}>
                  DR Liquidity
                </div>
                <div className="text-[#22C55E] text-[9px] font-semibold tracking-wider">
                  Trader
                </div>
              </div>
            </div>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Professional trading insights powered by discipline, psychology, and real market experience.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#6B7280] hover:text-[#22C55E] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/prop-firms"
                  className="text-[#6B7280] hover:text-[#22C55E] transition-colors text-sm"
                >
                  Prop Firms
                </Link>
              </li>
              <li>
                <Link
                  to="/education"
                  className="text-[#6B7280] hover:text-[#22C55E] transition-colors text-sm"
                >
                  Education
                </Link>
              </li>
              <li>
                <Link
                  to="/tools"
                  className="text-[#6B7280] hover:text-[#22C55E] transition-colors text-sm"
                >
                  Trading Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-[#6B7280] hover:text-[#22C55E] transition-colors text-sm"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Community
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6B7280] hover:text-[#22C55E] transition-colors text-sm flex items-center gap-2"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6B7280] hover:text-[#22C55E] transition-colors text-sm flex items-center gap-2"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6B7280] hover:text-[#22C55E] transition-colors text-sm flex items-center gap-2"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6B7280] hover:text-[#22C55E] transition-colors text-sm flex items-center gap-2"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(34,197,94,0.1)] mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#6B7280] text-xs text-center md:text-left">
            © {currentYear} DR Liquidity Trader. All rights reserved. Trading involves risk. Past performance is not indicative of future results.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[#6B7280] text-xs uppercase tracking-widest">Powered by</span>
            <div className="flex items-center gap-1.5 text-[#22C55E]">
              <Zap size={12} />
              <span className="text-xs font-semibold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                Bolt
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
