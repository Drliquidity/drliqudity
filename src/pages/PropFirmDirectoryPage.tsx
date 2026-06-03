import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, TrendingUp } from 'lucide-react';
import { getFuturesPropFirms } from '../lib/supabase';

interface PropFirm {
  id: string;
  name: string;
  slug: string;
  logo: string;
  tagline: string;
  activation_fee: number;
  starting_balance: number;
  max_drawdown: number;
  payout_split: number;
  rating: number;
  review_count: number;
}

type SortOption = 'featured' | 'rating' | 'price' | 'payout';

export default function PropFirmDirectoryPage() {
  const navigate = useNavigate();
  const [firms, setFirms] = useState<PropFirm[]>([]);
  const [filteredFirms, setFilteredFirms] = useState<PropFirm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [maxDrawdownFilter, setMaxDrawdownFilter] = useState<number>(15);
  const [minPayoutFilter, setMinPayoutFilter] = useState<number>(70);

  useEffect(() => {
    async function loadFirms() {
      try {
        const data = await getFuturesPropFirms();
        setFirms(data);
        setFilteredFirms(data);
      } catch (error) {
        console.error('Failed to load prop firms:', error);
      } finally {
        setLoading(false);
      }
    }
    loadFirms();
  }, []);

  useEffect(() => {
    let result = [...firms];

    // Search filter
    if (searchTerm) {
      result = result.filter(firm =>
        firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        firm.tagline.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Drawdown filter
    result = result.filter(firm => firm.max_drawdown >= maxDrawdownFilter);

    // Payout filter
    result = result.filter(firm => firm.payout_split >= minPayoutFilter);

    // Sorting
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'price':
        result.sort((a, b) => a.activation_fee - b.activation_fee);
        break;
      case 'payout':
        result.sort((a, b) => (b.payout_split || 0) - (a.payout_split || 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredFirms(result);
  }, [firms, searchTerm, sortBy, maxDrawdownFilter, minPayoutFilter]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4" />
            <div className="h-4 bg-gray-700 rounded w-96 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Prop Firm Directory
            </h1>
            <p className="text-xl text-[#D1D5DB] max-w-2xl">
              Explore and compare the top proprietary trading firms. Find the perfect match for your trading style and goals.
            </p>
          </div>
          <button
            onClick={() => navigate('/compare')}
            className="px-6 py-3 bg-[#22C55E] hover:bg-[#1ea34e] text-black font-semibold rounded-lg transition-all duration-200 flex-shrink-0"
          >
            Compare Firms
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#22C55E]" size={20} />
            <input
              type="text"
              placeholder="Search firms by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#22C55E]/20 text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
          </div>

          {/* Filter and Sort Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-[#D1D5DB] mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-3 py-2 rounded-lg bg-[#0a0a0a] border border-[#22C55E]/20 text-white focus:outline-none focus:border-[#22C55E] transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="price">Lowest Fee</option>
                <option value="payout">Highest Payout</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#D1D5DB] mb-2">Min Drawdown: {maxDrawdownFilter}%</label>
              <input
                type="range"
                min="1"
                max="20"
                value={maxDrawdownFilter}
                onChange={(e) => setMaxDrawdownFilter(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-[#D1D5DB] mb-2">Min Payout: {minPayoutFilter}%</label>
              <input
                type="range"
                min="50"
                max="95"
                value={minPayoutFilter}
                onChange={(e) => setMinPayoutFilter(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setMaxDrawdownFilter(15);
                  setMinPayoutFilter(70);
                }}
                className="w-full px-4 py-2 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] hover:bg-[#22C55E]/20 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-[#D1D5DB]">
          Showing {filteredFirms.length} of {firms.length} firms
        </div>

        {/* Firms Grid */}
        {filteredFirms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFirms.map((firm) => (
              <button
                key={firm.id}
                onClick={() => navigate(`/prop-firm/${firm.slug}`)}
                className="text-left rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(15,81,50,0.1) 0%, rgba(10,10,10,0.95) 100%)',
                  border: '1px solid rgba(34,197,94,0.15)',
                }}
              >
                {/* Logo */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg mb-4 flex-shrink-0"
                  style={{
                    background: 'rgba(15,81,50,0.3)',
                    border: '1px solid rgba(34,197,94,0.2)',
                    color: '#22C55E',
                    fontFamily: '"Space Grotesk", sans-serif',
                  }}
                >
                  {firm.logo}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  {firm.name}
                </h3>
                <p className="text-sm text-[#22C55E] mb-4">{firm.tagline}</p>

                {/* Rating and Reviews */}
                {firm.rating > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.round(firm.rating) ? 'fill-[#22C55E] text-[#22C55E]' : 'text-[#6B7280]'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#D1D5DB]">{firm.rating.toFixed(1)}</span>
                    <span className="text-xs text-[#6B7280]">({firm.review_count})</span>
                  </div>
                )}

                {/* Key Metrics */}
                <div className="space-y-2 pt-4 border-t border-[#22C55E]/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#D1D5DB]">Account Fee:</span>
                    <span className="font-semibold text-[#22C55E]">
                      ${firm.activation_fee > 0 ? firm.activation_fee : 'Free'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#D1D5DB]">Starting Balance:</span>
                    <span className="font-semibold text-[#22C55E]">${firm.starting_balance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#D1D5DB]">Max Drawdown:</span>
                    <span className="font-semibold text-[#22C55E]">{firm.max_drawdown}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#D1D5DB]">Payout Split:</span>
                    <span className="font-semibold text-[#22C55E]">{firm.payout_split}%</span>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full mt-4 px-4 py-2 bg-[#22C55E] hover:bg-[#1ea34e] text-black font-semibold rounded-lg transition-all duration-200">
                  View Details
                </button>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#D1D5DB] text-lg mb-4">No firms match your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setMaxDrawdownFilter(15);
                setMinPayoutFilter(70);
              }}
              className="px-6 py-2 bg-[#22C55E] hover:bg-[#1ea34e] text-black font-semibold rounded-lg transition-all duration-200"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
