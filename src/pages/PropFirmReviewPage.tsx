import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Star, CheckCircle, TrendingUp } from 'lucide-react';
import { getFuturesPropFirmBySlug, getFuturesReviews } from '../lib/supabase';

interface PropFirm {
  id: string;
  name: string;
  slug: string;
  logo: string;
  tagline: string;
  description: string;
  website_url: string;
  evaluation_cost: number;
  starting_balance: number;
  max_drawdown: number;
  daily_drawdown: number;
  payout_split: number;
  payout_frequency: string;
  featured: boolean;
  rating: number;
  review_count: number;
}

interface Review {
  id: string;
  user_name: string;
  rating: number;
  title: string;
  content: string;
  experience_level: string;
  verified_trader: boolean;
  helpful_count: number;
  created_at: string;
}

export default function PropFirmReviewPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [firm, setFirm] = useState<PropFirm | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        if (slug) {
          const firmData = await getFuturesPropFirmBySlug(slug);
          if (!firmData) {
            setFirm(null);
            setLoading(false);
            return;
          }
          setFirm(firmData);
          const reviewsData = await getFuturesReviews(firmData.id);
          setReviews(reviewsData);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-700 rounded w-48 mx-auto" />
            <div className="h-4 bg-gray-700 rounded w-96 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (!firm) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Firm not found</h1>
          <button
            onClick={() => navigate('/prop-firms')}
            className="btn-primary"
          >
            Back to Directory
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
          onClick={() => navigate('/prop-firms')}
          className="flex items-center gap-2 text-[#22C55E] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Directory
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
              {firm.logo}
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                {firm.name}
              </h1>
              <p className="text-xl text-[#22C55E]">{firm.tagline}</p>
            </div>
          </div>
          {firm.featured && (
            <div className="inline-flex gap-2 mb-6">
              <span className="partner-badge">
                <CheckCircle size={10} />
                Featured Firm
              </span>
            </div>
          )}
          <p className="text-lg text-[#D1D5DB] leading-relaxed mb-8">{firm.description}</p>
        </div>

        {/* Rating Overview */}
        <div
          className="rounded-2xl p-8 mb-12"
          style={{
            background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(15,81,50,0.08) 100%)',
            border: '1px solid rgba(34,197,94,0.2)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={i < Math.round(firm.rating) ? 'fill-[#22C55E] text-[#22C55E]' : 'text-[#6B7280]'}
                  />
                ))}
              </div>
              <p className="text-3xl font-bold text-white mb-1">{firm.rating.toFixed(1)}</p>
              <p className="text-[#D1D5DB]">out of 5 stars</p>
            </div>
            <div className="text-center border-l border-r border-[#22C55E]/20">
              <p className="text-3xl font-bold text-[#22C55E] mb-1">{firm.review_count}</p>
              <p className="text-[#D1D5DB]">verified reviews</p>
            </div>
            <div className="text-center">
              <a
                href={firm.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#22C55E] hover:bg-[#1ea34e] text-black font-semibold rounded-lg transition-all duration-200"
              >
                Visit Website
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Account Specifications */}
        <div
          className="rounded-2xl p-10 mb-12"
          style={{
            background: 'linear-gradient(135deg, rgba(15,81,50,0.1) 0%, rgba(10,10,10,0.95) 100%)',
            border: '1px solid rgba(34,197,94,0.15)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Account Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-[#22C55E]" />
                <p className="text-[#D1D5DB]">Starting Balance</p>
              </div>
              <p className="text-3xl font-bold text-white">${firm.starting_balance.toLocaleString()}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-[#22C55E]" />
                <p className="text-[#D1D5DB]">Evaluation Cost</p>
              </div>
              <p className="text-3xl font-bold text-white">
                ${firm.evaluation_cost}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-[#22C55E]" />
                <p className="text-[#D1D5DB]">Maximum Drawdown</p>
              </div>
              <p className="text-3xl font-bold text-white">{firm.max_drawdown}%</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-[#22C55E]" />
                <p className="text-[#D1D5DB]">Payout Split</p>
              </div>
              <p className="text-3xl font-bold text-white">{firm.payout_split}%</p>
            </div>
            {firm.daily_drawdown && firm.daily_drawdown > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} className="text-[#22C55E]" />
                  <p className="text-[#D1D5DB]">Daily Drawdown</p>
                </div>
                <p className="text-3xl font-bold text-white">{firm.daily_drawdown}%</p>
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-[#22C55E]" />
                <p className="text-[#D1D5DB]">Payout Frequency</p>
              </div>
              <p className="text-3xl font-bold text-white capitalize">{firm.payout_frequency}</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Community Reviews
            </h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl p-6"
                  style={{
                    background: 'rgba(15,81,50,0.08)',
                    border: '1px solid rgba(34,197,94,0.1)',
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white">{review.user_name}</h3>
                      <p className="text-sm text-[#6B7280]">
                        {review.experience_level} trader
                        {review.verified_trader && ' • Verified'}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? 'fill-[#22C55E] text-[#22C55E]' : 'text-[#6B7280]'}
                        />
                      ))}
                    </div>
                  </div>
                  <h4 className="font-semibold text-white mb-2">{review.title}</h4>
                  <p className="text-[#D1D5DB] mb-3">{review.content}</p>
                  <div className="text-xs text-[#6B7280]">
                    {review.helpful_count} people found this helpful
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Footer */}
        <div className="text-center">
          <p className="text-[#D1D5DB] text-lg mb-6">
            Ready to start your trading journey with {firm.name}?
          </p>
          <a
            href={firm.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#22C55E] hover:bg-[#1ea34e] text-black font-semibold text-lg rounded-lg transition-all duration-200"
          >
            Create Account
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
