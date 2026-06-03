import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star } from 'lucide-react';
import { getCFDPropFirms } from '../lib/supabase';

interface CFDFirm {
  id: string;
  name: string;
  slug: string;
  logo: string;
  tagline: string;
  challenge_cost: number;
  profit_split: number;
  max_drawdown: number;
  leverage: string;
  supports_forex: boolean;
  supports_gold: boolean;
  supports_indices: boolean;
  supports_crypto: boolean;
  rating: number;
  review_count: number;
}

type SortOption = 'featured' | 'rating' | 'price' | 'split';

export default function CFDPropFirmsPage() {
  const navigate = useNavigate();
  const [firms, setFirms] = useState<CFDFirm[]>([]);
  const [filteredFirms, setFilteredFirms] = useState<CFDFirm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [maxDrawdownFilter, setMaxDrawdownFilter] = useState<number>(8);
  const [minSplitFilter, setMinSplitFilter] = useState<number>(70);
  const [instrumentFilter, setInstrumentFilter] = useState<string>('all');

  useEffect(() => {
    async function loadFirms() {
      try {
        const data = await getCFDPropFirms();
        setFirms(data);
        setFilteredFirms(data);
      } catch (error) {
        console.error('Failed to load CFD firms:', error);
      } finally {
        setLoading(false);
      }
    }
    loadFirms();
  }, []);

  useEffect(() => {
    let result = [...firms];

    if (searchTerm) {
      result = result.filter(firm =>
        firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        firm.tagline.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    result = result.filter(firm => firm.max_drawdown >= maxDrawdownFilter);
    result = result.filter(firm => firm.profit_split >= minSplitFilter);

    if (instrumentFilter !== 'all') {
      result = result.filter(firm => {
        switch (instrumentFilter) {
          case 'forex':
            return firm.supports_forex;
          case 'gold':
            return firm.supports_gold;
          case 'indices':
            return firm.supports_indices;
          case 'crypto':
            return firm.supports_crypto;
          default:
            return true;
        }
      });
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'price':
        result.sort((a, b) => a.challenge_cost - b.challenge_cost);
        break;
      case 'split':
        result.sort((a, b) => (b.profit_split || 0) - (a.profit_split || 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredFirms(result);
  }, [firms, searchTerm, sortBy, maxDrawdownFilter, minSplitFilter, instrumentFilter]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-700 rounded w-48 mx-auto" />
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
              CFD Prop Firms
            </h1>
            <p className="text-xl text-[#D1D5DB] max-w-2xl">
              Trade Forex, Gold, Indices, and Crypto CFDs with top prop firms. Compare challenges, payouts, and leverage.
            </p>
          </div>
          <button
            onClick={() => navigate('/cfd-comparisons')}
            className="px-6 py-3 bg-[#22C55E] hover:bg-[#1ea34e] text-black font-semibold rounded-lg transition-all duration-200 flex-shrink-0"
          >
            Compare Firms
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#22C55E]" size={20} />
            <input
              type="text"
              placeholder="Search CFD firms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#22C55E]/20 text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm text-[#D1D5DB] mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-3 py-2 rounded-lg bg-[#0a0a0a] border border-[#22C55E]/20 text-white focus:outline-none focus:border-[#22C55E] transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="price">Lowest Cost</option>
                <option value="split">Highest Split</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#D1D5DB] mb-2">Instruments</label>
              <select
                value={instrumentFilter}
                onChange={(e) => setInstrumentFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0a0a0a] border border-[#22C55E]/20 text-white focus:outline-none focus:border-[#22C55E] transition-colors"
              >
                <option value="all">All Instruments</option>
                <option value="forex">Forex</option>
                <option value="gold">Gold</option>
                <option value="indices">Indices</option>
                <option value="crypto">Crypto</option>
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
              <label className="block text-sm text-[#D1D5DB] mb-2">Min Split: {minSplitFilter}%</label>
              <input
                type="range"
                min="50"
                max="95"
                value={minSplitFilter}
                onChange={(e) => setMinSplitFilter(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setMaxDrawdownFilter(8);
                  setMinSplitFilter(70);
                  setInstrumentFilter('all');
                }}
                className="w-full px-4 py-2 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] hover:bg-[#22C55E]/20 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 text-[#D1D5DB]">
          Showing {filteredFirms.length} of {firms.length} firms
        </div>

        {/* Firms Grid */}
        {filteredFirms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFirms.map((firm) => (
              <button
                key={firm.id}
                onClick={() => navigate(`/cfd-prop-firm/${firm.slug}`)}
                className="text-left rounded-2xl p-6 transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(15,81,50,0.1) 0%, rgba(10,10,10,0.95) 100%)',
                  border: '1px solid rgba(34,197,94,0.15)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg mb-4"
                  style={{
                    background: 'rgba(15,81,50,0.3)',
                    border: '1px solid rgba(34,197,94,0.2)',
                    color: '#22C55E',
                  }}
                >
                  {firm.logo}
                </div>

                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  {firm.name}
                </h3>
                <p className="text-sm text-[#22C55E] mb-4">{firm.tagline}</p>

                {firm.rating > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
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

                <div className="space-y-2 pt-4 border-t border-[#22C55E]/10 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#D1D5DB]">Challenge:</span>
                    <span className="font-semibold text-[#22C55E]">${firm.challenge_cost}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#D1D5DB]">Profit Split:</span>
                    <span className="font-semibold text-[#22C55E]">{firm.profit_split}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#D1D5DB]">Drawdown:</span>
                    <span className="font-semibold text-[#22C55E]">{firm.max_drawdown}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#D1D5DB]">Leverage:</span>
                    <span className="font-semibold text-[#22C55E]">{firm.leverage}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 pt-2">
                  {firm.supports_forex && <span className="text-xs px-2 py-1 rounded bg-[#22C55E]/20 text-[#22C55E]">Forex</span>}
                  {firm.supports_gold && <span className="text-xs px-2 py-1 rounded bg-[#22C55E]/20 text-[#22C55E]">Gold</span>}
                  {firm.supports_indices && <span className="text-xs px-2 py-1 rounded bg-[#22C55E]/20 text-[#22C55E]">Indices</span>}
                  {firm.supports_crypto && <span className="text-xs px-2 py-1 rounded bg-[#22C55E]/20 text-[#22C55E]">Crypto</span>}
                </div>

                <button className="w-full px-4 py-2 bg-[#22C55E] hover:bg-[#1ea34e] text-black font-semibold rounded-lg transition-all">
                  View Details
                </button>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#D1D5DB] text-lg">No firms match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
