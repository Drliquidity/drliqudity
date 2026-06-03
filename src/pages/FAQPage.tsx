import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { getAllFAQs } from '../lib/supabase';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful_count: number;
  created_at: string;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function loadFAQs() {
      try {
        const data = await getAllFAQs();
        setFaqs(data);
        setFilteredFaqs(data);
      } catch (error) {
        console.error('Failed to load FAQs:', error);
      } finally {
        setLoading(false);
      }
    }
    loadFAQs();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredFaqs(faqs.filter(faq => faq.category === selectedCategory));
    } else {
      setFilteredFaqs(faqs);
    }
  }, [selectedCategory, faqs]);

  const categories = [...new Set(faqs.map(faq => faq.category))];

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

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-[#D1D5DB] max-w-2xl">
            Find answers to common questions about prop firms, trading rules, funding, and more.
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  selectedCategory === null
                    ? 'bg-[#22C55E] text-black'
                    : 'bg-[#0a0a0a] text-[#22C55E] border border-[#22C55E]/30 hover:border-[#22C55E]'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-[#22C55E] text-black'
                      : 'bg-[#0a0a0a] text-[#22C55E] border border-[#22C55E]/30 hover:border-[#22C55E]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        <div className="space-y-4 mb-12">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'rgba(15,81,50,0.08)',
                  border: '1px solid rgba(34,197,94,0.1)',
                }}
              >
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-start justify-between gap-4 hover:bg-[#22C55E]/5 transition-colors"
                >
                  <span className="text-lg font-semibold text-white text-left">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[#22C55E] flex-shrink-0 transition-transform duration-300 ${
                      expandedId === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedId === faq.id && (
                  <div className="px-6 pb-4 border-t border-[#22C55E]/10">
                    <p className="text-[#D1D5DB] leading-relaxed mb-4">
                      {faq.answer}
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-[#22C55E]/10">
                      <span className="text-xs text-[#6B7280]">
                        {faq.helpful_count} people found this helpful
                      </span>
                      <button className="text-xs px-3 py-1 rounded bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] hover:bg-[#22C55E]/20 transition-colors">
                        Helpful
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-[#D1D5DB] text-lg">No FAQs found in this category.</p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div
          className="rounded-2xl p-10 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(15,81,50,0.08) 100%)',
            border: '1px solid rgba(34,197,94,0.2)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Didn't find your answer?
          </h2>
          <p className="text-[#D1D5DB] mb-6">
            Join our community to ask questions and get personalized support from experienced traders.
          </p>
          <a
            href="https://t.me/DrLiquidityChartlab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-8 py-3 bg-[#22C55E] hover:bg-[#1ea34e] text-black font-semibold rounded-lg transition-all duration-200"
          >
            Join Telegram Community
          </a>
        </div>
      </div>
    </div>
  );
}
