import { useState } from 'react';
import { Youtube, Instagram, MessageCircle, Twitter, ExternalLink, Play, Heart, Repeat2, Eye } from 'lucide-react';
import { socialLinks } from '../data';
import { useScrollAnimation } from '../hooks/useCountUp';

const platforms = [
  { key: 'youtube', label: 'YouTube', icon: <Youtube size={16} />, color: '#FF0000', url: socialLinks.youtube },
  { key: 'instagram', label: 'Instagram', icon: <Instagram size={16} />, color: '#E1306C', url: socialLinks.instagram },
  { key: 'telegram', label: 'Telegram', icon: <MessageCircle size={16} />, color: '#2CA5E0', url: socialLinks.telegram },
  { key: 'twitter', label: 'X (Twitter)', icon: <Twitter size={16} />, color: '#FFFFFF', url: socialLinks.twitter },
];

const contentItems = {
  youtube: [
    { title: 'How I Passed 3 Funded Challenges in 2024', type: 'video', views: '12.4K', date: '3 days ago', thumb: 'chart' },
    { title: 'The Psychology of Losing Trades', type: 'video', views: '8.7K', date: '1 week ago', thumb: 'brain' },
    { title: 'ICT Liquidity Concepts Explained', type: 'video', views: '21.2K', date: '2 weeks ago', thumb: 'market' },
    { title: 'Risk Management Masterclass', type: 'video', views: '15.8K', date: '3 weeks ago', thumb: 'shield' },
  ],
  instagram: [
    { title: 'Monday market prep done. Here\'s what I\'m watching this week...', type: 'post', likes: '1.2K', date: '2 days ago', thumb: 'chart' },
    { title: 'Another payout hit. Consistency over everything. Control your emotions.', type: 'post', likes: '3.4K', date: '5 days ago', thumb: 'money' },
    { title: 'Breakout setup on EURUSD — here\'s the plan.', type: 'reel', likes: '2.1K', date: '1 week ago', thumb: 'trade' },
    { title: 'The difference between revenge trading and strategic re-entry', type: 'carousel', likes: '1.8K', date: '2 weeks ago', thumb: 'brain' },
  ],
  telegram: [
    { title: 'GBPUSD analysis — key liquidity levels to watch today', type: 'analysis', views: '4.2K', date: '1 hour ago', thumb: 'chart' },
    { title: 'Pre-London session watchlist — 3 setups ready', type: 'update', views: '3.8K', date: '4 hours ago', thumb: 'market' },
    { title: 'New exclusive offer from FundedNext — code in pinned', type: 'announcement', views: '5.1K', date: '1 day ago', thumb: 'gift' },
    { title: 'Daily mindset: Why discipline beats intelligence in trading', type: 'insight', views: '2.9K', date: '2 days ago', thumb: 'brain' },
  ],
  twitter: [
    { title: 'Most traders fail not because of strategy, but because they can\'t control their emotions. The edge is in the psychology.', type: 'tweet', likes: '847', retweets: '234', date: '6 hours ago' },
    { title: 'Risk management tip: Never risk more than 1% per trade. Your account is your business. Protect it.', type: 'tweet', likes: '1.2K', retweets: '412', date: '1 day ago' },
    { title: 'The market doesn\'t care about your feelings. But your feelings will destroy your account if you let them.', type: 'tweet', likes: '2.1K', retweets: '789', date: '3 days ago' },
    { title: 'Funded account update: 3 payouts this month. Consistency is the name of the game.', type: 'tweet', likes: '3.4K', retweets: '1.1K', date: '1 week ago' },
  ],
};

const thumbColors: Record<string, string> = {
  chart: '#0F5132',
  brain: '#166534',
  market: '#14532D',
  shield: '#15803D',
  money: '#16A34A',
  trade: '#15803D',
  brain2: '#166534',
  gift: '#0F5132',
};

export default function ContentHub() {
  const [activePlatform, setActivePlatform] = useState('youtube');
  const sectionRef = useScrollAnimation();
  const items = contentItems[activePlatform as keyof typeof contentItems] || [];
  const platform = platforms.find((p) => p.key === activePlatform);

  return (
    <section id="content" className="relative py-24 md:py-32 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#080d08] to-[#0A0A0A] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-12">
          <div className="green-badge inline-flex mb-4">Content Hub</div>
          <h2 className="section-title text-4xl md:text-5xl mb-5">
            Latest{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #22C55E, #4ADE80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Content
            </span>
          </h2>
          <div className="divider-green mx-auto" />
          <p className="section-subtitle mx-auto mt-5 text-center">
            Trading insights, market analysis, mindset content, and community updates across all platforms.
          </p>
        </div>

        {/* Platform tabs */}
        <div className="animate-on-scroll flex flex-wrap justify-center gap-3 mb-10">
          {platforms.map((p) => (
            <button
              key={p.key}
              onClick={() => setActivePlatform(p.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activePlatform === p.key ? 'scale-[1.03]' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                background: activePlatform === p.key
                  ? `rgba(${p.color === '#FFFFFF' ? '255,255,255' : p.color.replace('#', '').match(/.{2}/g)?.map((x) => parseInt(x, 16)).join(',')}, 0.15)`
                  : 'rgba(255,255,255,0.03)',
                border: activePlatform === p.key
                  ? `1px solid ${p.color}50`
                  : '1px solid rgba(255,255,255,0.08)',
                color: activePlatform === p.key ? p.color : '#D1D5DB',
              }}
            >
              {p.icon}
              {p.label}
            </button>
          ))}
        </div>

        {/* Content grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="animate-on-scroll group rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] cursor-pointer"
              style={{
                background: 'rgba(17,17,17,0.9)',
                border: '1px solid rgba(34,197,94,0.08)',
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {/* Thumbnail */}
              <div
                className="relative h-36 flex items-center justify-center overflow-hidden"
                style={{ background: thumbColors[item.thumb] || '#0F5132' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                {activePlatform === 'youtube' && (
                  <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={18} fill="white" className="text-white ml-1" />
                  </div>
                )}
                {activePlatform !== 'youtube' && (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: `${platform?.color || '#22C55E'}20`, border: `1px solid ${platform?.color || '#22C55E'}40` }}
                  >
                    <div style={{ color: platform?.color || '#22C55E' }}>{platform?.icon}</div>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-black/50 text-[#D1D5DB]">
                    {'type' in item ? item.type : ''}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-white text-sm font-medium leading-snug mb-3 line-clamp-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  {item.title}
                </p>
                <div className="flex items-center justify-between text-xs text-[#6B7280]">
                  <div className="flex items-center gap-3">
                    {'views' in item && (
                      <span className="flex items-center gap-1"><Eye size={10} /> {item.views}</span>
                    )}
                    {'likes' in item && (
                      <span className="flex items-center gap-1"><Heart size={10} /> {item.likes}</span>
                    )}
                    {'retweets' in item && (
                      <span className="flex items-center gap-1"><Repeat2 size={10} /> {item.retweets}</span>
                    )}
                  </div>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="animate-on-scroll text-center">
          <a
            href={platform?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm inline-flex"
          >
            View All on {platform?.label} <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
