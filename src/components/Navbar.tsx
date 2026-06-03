import { useState, useEffect } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navLinks } from '../data';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'journey', 'partners', 'offers', 'community', 'contact'];
      const current = sections.find((s) => {
        const el = document.getElementById(s);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('/')) {
      navigate(href);
    } else {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[rgba(34,197,94,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2.5 group"
          >
            <img
              src="/_RZ-gArh_400x400_(1).jpg"
              alt="DR Liquidity Trader"
              className="w-10 h-10 rounded-full object-cover shadow-[0_0_12px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-shadow"
            />
            <div className="leading-tight hidden sm:block">
              <div className="font-display font-700 text-white text-xs tracking-wide" style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }}>
                DR Liquidity
              </div>
              <div className="text-[#22C55E] text-[9px] font-semibold tracking-wider">
                Trader
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[#22C55E] bg-[rgba(34,197,94,0.08)]'
                      : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
                  }`}
                  style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="relative group">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname.includes('/prop-firm') || location.pathname.includes('/futures-prop-firms') || location.pathname.includes('/cfd-prop-firms')
                    ? 'text-[#22C55E] bg-[rgba(34,197,94,0.08)]'
                    : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
                }`}
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                Prop Firms
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-[#0A0A0A] border border-[#22C55E]/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={() => handleNavClick('/futures-prop-firms')}
                  className="w-full text-left px-4 py-3 text-[#D1D5DB] hover:text-[#22C55E] hover:bg-[#22C55E]/10 transition-all text-sm border-b border-[#22C55E]/10"
                >
                  Futures Firms
                </button>
                <button
                  onClick={() => handleNavClick('/cfd-prop-firms')}
                  className="w-full text-left px-4 py-3 text-[#D1D5DB] hover:text-[#22C55E] hover:bg-[#22C55E]/10 transition-all text-sm"
                >
                  CFD Firms
                </button>
              </div>
            </div>
            <button
              onClick={() => handleNavClick('/education')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname.includes('/education') || location.pathname.includes('/guide')
                  ? 'text-[#22C55E] bg-[rgba(34,197,94,0.08)]'
                  : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
              }`}
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              Education
            </button>
            <button
              onClick={() => handleNavClick('/tools')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname.includes('/tools')
                  ? 'text-[#22C55E] bg-[rgba(34,197,94,0.08)]'
                  : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
              }`}
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              Tools
            </button>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('#community')}
              className="btn-primary text-sm py-2.5 px-5"
            >
              <span>Join Community</span>
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-[#D1D5DB] hover:text-white hover:bg-white/5 transition-all"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0A0A0A]/98 backdrop-blur-xl border-t border-[rgba(34,197,94,0.1)] px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="w-full text-left px-4 py-3 rounded-lg text-[#D1D5DB] hover:text-white hover:bg-white/5 transition-all font-medium text-sm"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('/futures-prop-firms')}
            className="w-full text-left px-4 py-3 rounded-lg text-[#D1D5DB] hover:text-white hover:bg-white/5 transition-all font-medium text-sm"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Futures Prop Firms
          </button>
          <button
            onClick={() => handleNavClick('/cfd-prop-firms')}
            className="w-full text-left px-4 py-3 rounded-lg text-[#D1D5DB] hover:text-white hover:bg-white/5 transition-all font-medium text-sm"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            CFD Prop Firms
          </button>
          <button
            onClick={() => handleNavClick('/education')}
            className="w-full text-left px-4 py-3 rounded-lg text-[#D1D5DB] hover:text-white hover:bg-white/5 transition-all font-medium text-sm"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Education
          </button>
          <button
            onClick={() => handleNavClick('/tools')}
            className="w-full text-left px-4 py-3 rounded-lg text-[#D1D5DB] hover:text-white hover:bg-white/5 transition-all font-medium text-sm"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Tools
          </button>
          <div className="pt-3 border-t border-[rgba(34,197,94,0.1)]">
            <button
              onClick={() => handleNavClick('#community')}
              className="btn-primary w-full text-sm py-3 justify-center"
            >
              <span>Join Community</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
