import { Mail, Instagram, Twitter, MessageCircle, Youtube, ExternalLink, ArrowRight } from 'lucide-react';
import { socialLinks } from '../data';
import { useScrollAnimation } from '../hooks/useCountUp';

export default function Contact() {
  const sectionRef = useScrollAnimation();

  const channels = [
    { icon: <Instagram size={20} />, label: 'Instagram', url: socialLinks.instagram, color: '#E1306C' },
    { icon: <Twitter size={20} />, label: 'X (Twitter)', url: socialLinks.twitter, color: '#FFFFFF' },
    { icon: <MessageCircle size={20} />, label: 'Telegram', url: socialLinks.telegram, color: '#2CA5E0' },
    { icon: <MessageCircle size={20} />, label: 'Discord', url: socialLinks.discord, color: '#5865F2' },
    { icon: <Youtube size={20} />, label: 'YouTube', url: socialLinks.youtube, color: '#FF0000' },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#080d08] to-[#0A0A0A] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0F5132]/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-14">
          <div className="green-badge inline-flex mb-4">Get In Touch</div>
          <h2 className="section-title text-4xl md:text-5xl mb-5">
            Connect &{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #22C55E, #4ADE80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Engage
            </span>
          </h2>
          <div className="divider-green mx-auto" />
          <p className="section-subtitle mx-auto mt-5 text-center">
            Follow DR Liquidity Trader across all platforms for daily market analysis, trading updates, and community engagement.
          </p>
        </div>

        {/* Channels grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {channels.map((channel, i) => (
            <a
              key={i}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-on-scroll group rounded-xl p-6 text-center transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(15,81,50,0.08) 0%, rgba(10,10,10,0.95) 100%)',
                border: '1px solid rgba(34,197,94,0.1)',
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:shadow-lg"
                style={{
                  color: channel.color,
                  background: `${channel.color}15`,
                  border: `1px solid ${channel.color}40`,
                }}
              >
                {channel.icon}
              </div>
              <h4 className="font-semibold text-white text-sm mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                {channel.label}
              </h4>
              <p className="text-[#6B7280] text-xs">Follow</p>
            </a>
          ))}
        </div>

        {/* Main CTA */}
        <div className="animate-on-scroll rounded-2xl p-10 md:p-12 text-center">
          <div
            className="rounded-2xl p-12 md:p-16"
            style={{
              background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(15,81,50,0.08) 100%)',
              border: '1px solid rgba(34,197,94,0.15)',
            }}
          >
            <Mail className="w-12 h-12 text-[#22C55E] mx-auto mb-5" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Questions or Feedback?
            </h3>
            <p className="text-[#D1D5DB] mb-7 max-w-md mx-auto">
              Reach out via any of our social platforms. We engage with every message in the community.
            </p>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex text-base py-3.5 px-7"
            >
              <span className="flex items-center gap-2">
                Send Message <ArrowRight size={16} />
              </span>
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div className="animate-on-scroll text-center mt-12 pt-8 border-t border-[rgba(34,197,94,0.1)]">
          <p className="text-[#6B7280] text-sm mb-4">
            DR Liquidity Trader is a personal brand focused on trading psychology, discipline, and real market experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <a href="#" className="text-[#6B7280] hover:text-[#22C55E] transition-colors">
              Affiliate Disclosure
            </a>
            <span className="text-[rgba(34,197,94,0.2)]">·</span>
            <a href="#" className="text-[#6B7280] hover:text-[#22C55E] transition-colors">
              Privacy Policy
            </a>
            <span className="text-[rgba(34,197,94,0.2)]">·</span>
            <a href="#" className="text-[#6B7280] hover:text-[#22C55E] transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
