import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, TrendingUp } from 'lucide-react';
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
  daily_loss_limit: number;
  payout_split: number;
  min_days_to_payout: number;
  rating: number;
  review_count: number;
}

export default function PropFirmComparisonPage() {
  const navigate = useNavigate();
  const [allFirms, setAllFirms] = useState<PropFirm[]>([]);
  const [selectedFirms, setSelectedFirms] = useState<PropFirm[]>([]);
  const [availableFirms, setAvailableFirms] = useState<PropFirm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFirms() {
      try {
        const data = await getFuturesPropFirms();
        setAllFirms(data);
        setAvailableFirms(data);
      } catch (error) {
        console.error('Failed to load firms:', error);
      } finally {
        setLoading(false);
      }
    }
    loadFirms();
  }, []);

  const handleAddFirm = (firm: PropFirm) => {
    if (selectedFirms.length < 4) {
      setSelectedFirms([...selectedFirms, firm]);
      setAvailableFirms(availableFirms.filter(f => f.id !== firm.id));
    }
  };

  const handleRemoveFirm = (firmId: string) => {
    const removed = selectedFirms.find(f => f.id === firmId);
    if (removed) {
      setSelectedFirms(selectedFirms.filter(f => f.id !== firmId));
      setAvailableFirms([...availableFirms, removed]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-700 rounded w-48 mx-auto" />
            <div className="h-4 bg-gray-700 rounded w-96 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  const comparisonMetrics = [
    { key: 'activation_fee', label: 'Account Activation Fee', unit: '$', type: 'number' },
    { key: 'starting_balance', label: 'Starting Balance', unit: '$', type: 'number' },
    { key: 'max_drawdown', label: 'Maximum Drawdown', unit: '%', type: 'number' },
    { key: 'daily_loss_limit', label: 'Daily Loss Limit', unit: '%', type: 'number' },
    { key: 'payout_split', label: 'Payout Split', unit: '%', type: 'number' },
    { key: 'min_days_to_payout', label: 'Min Days to Payout', unit: 'days', type: 'number' },
    { key: 'rating', label: 'Average Rating', unit: '/ 5', type: 'number' },
  ];

  const getValue = (firm: PropFirm, key: string) => {
    const value = firm[key as keyof PropFirm];
    if (key === 'activation_fee' && value === 0) return 'Free';
    if (key === 'min_days_to_payout' && value === 0) return 'Immediate';
    if (typeof value === 'number') return value;
    return value;
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Compare Prop Firms
          </h1>
          <p className="text-xl text-[#D1D5DB] max-w-2xl">
            Side-by-side comparison of up to 4 prop firms. Choose your firms below to compare their features and specifications.
          </p>
        </div>

        {/* Add Firms Section */}
        {selectedFirms.length < 4 && (
          <div className="mb-12">
            <h2 className="text-lg font-bold text-white mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Add Firms to Compare ({selectedFirms.length} / 4)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableFirms.map((firm) => (
                <button
                  key={firm.id}
                  onClick={() => handleAddFirm(firm)}
                  className="p-4 rounded-lg bg-[#0a0a0a] border border-[#22C55E]/20 hover:border-[#22C55E] transition-all duration-200 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{
                        background: 'rgba(15,81,50,0.3)',
                        border: '1px solid rgba(34,197,94,0.2)',
                        color: '#22C55E',
                      }}
                    >
                      {firm.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">{firm.name}</p>
                    </div>
                    <Plus size={18} className="text-[#22C55E] flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {selectedFirms.length > 0 ? (
          <div className="overflow-x-auto mb-12">
            <div
              className="rounded-2xl p-6 min-w-full"
              style={{
                background: 'linear-gradient(135deg, rgba(15,81,50,0.1) 0%, rgba(10,10,10,0.95) 100%)',
                border: '1px solid rgba(34,197,94,0.15)',
              }}
            >
              <table className="w-full">
                <tbody>
                  {/* Header Row */}
                  <tr className="border-b border-[#22C55E]/20">
                    <td className="pb-4 pr-6">
                      <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Metric</p>
                    </td>
                    {selectedFirms.map((firm) => (
                      <td key={firm.id} className="pb-4 px-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm"
                            style={{
                              background: 'rgba(15,81,50,0.3)',
                              border: '1px solid rgba(34,197,94,0.2)',
                              color: '#22C55E',
                            }}
                          >
                            {firm.logo}
                          </div>
                          <p className="font-semibold text-white text-sm max-w-[120px] truncate">{firm.name}</p>
                          <button
                            onClick={() => handleRemoveFirm(firm.id)}
                            className="mt-2 p-1 rounded hover:bg-[#EF4444]/20 text-[#EF4444] transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Metrics Rows */}
                  {comparisonMetrics.map((metric, index) => (
                    <tr
                      key={metric.key}
                      className={`border-b border-[#22C55E]/10 ${index % 2 === 0 ? 'bg-[#0a0a0a]/30' : ''}`}
                    >
                      <td className="py-4 pr-6">
                        <p className="text-sm font-semibold text-[#D1D5DB]">{metric.label}</p>
                      </td>
                      {selectedFirms.map((firm) => (
                        <td key={firm.id} className="py-4 px-4 text-center">
                          <p className="text-white font-semibold">
                            {getValue(firm, metric.key)}
                            {metric.key !== 'activation_fee' &&
                              metric.key !== 'min_days_to_payout' &&
                              typeof getValue(firm, metric.key) === 'number' &&
                              ` ${metric.unit}`}
                          </p>
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* CTA Row */}
                  <tr>
                    <td className="pt-4 pr-6" />
                    {selectedFirms.map((firm) => (
                      <td key={firm.id} className="pt-4 px-4">
                        <button
                          onClick={() => navigate(`/prop-firm/${firm.slug}`)}
                          className="w-full px-4 py-2 bg-[#22C55E] hover:bg-[#1ea34e] text-black font-semibold rounded-lg transition-all duration-200 text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <TrendingUp className="mx-auto mb-4 text-[#22C55E]/50" size={48} />
            <p className="text-[#D1D5DB] text-lg mb-6">Select firms above to start comparing</p>
          </div>
        )}

        {/* Tips Section */}
        <div
          className="rounded-2xl p-10"
          style={{
            background: 'rgba(15,81,50,0.08)',
            border: '1px solid rgba(34,197,94,0.1)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            What to Look For
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex gap-3">
              <span className="text-[#22C55E] font-bold flex-shrink-0">•</span>
              <span className="text-[#D1D5DB]"><strong>Low Activation Fee:</strong> Saves money upfront</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#22C55E] font-bold flex-shrink-0">•</span>
              <span className="text-[#D1D5DB]"><strong>High Drawdown Limit:</strong> More room to trade</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#22C55E] font-bold flex-shrink-0">•</span>
              <span className="text-[#D1D5DB]"><strong>High Payout Split:</strong> More profit for you</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#22C55E] font-bold flex-shrink-0">•</span>
              <span className="text-[#D1D5DB]"><strong>Fast Payouts:</strong> Access your earnings sooner</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
