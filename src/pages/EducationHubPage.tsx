import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Target } from 'lucide-react';
import { getFuturesGuidesByCategory } from '../lib/supabase';
import { futuresEducationCategories } from '../data';

interface Guide {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  difficulty: string;
  read_time_minutes: number;
  featured: boolean;
  view_count: number;
  created_at: string;
}

export default function EducationHubPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('liquidity');
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGuides() {
      try {
        setLoading(true);
        const data = await getFuturesGuidesByCategory(selectedCategory);
        setGuides(data);
      } catch (error) {
        console.error('Failed to load guides:', error);
      } finally {
        setLoading(false);
      }
    }
    loadGuides();
  }, [selectedCategory]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-[#4ADE80]';
      case 'intermediate':
        return 'text-[#22C55E]';
      case 'advanced':
        return 'text-[#EF4444]';
      default:
        return 'text-[#22C55E]';
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = futuresEducationCategories.find(c => c.id === categoryId);
    return category?.icon || 'BookOpen';
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Trading Education Hub
          </h1>
          <p className="text-xl text-[#D1D5DB] max-w-2xl">
            Master the concepts and strategies used by professional traders. From liquidity to psychology, learn everything you need to succeed.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {futuresEducationCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-[#22C55E] text-black'
                    : 'bg-[#0a0a0a] text-[#22C55E] border border-[#22C55E]/30 hover:border-[#22C55E]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Guides Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-700 rounded-2xl" />
              </div>
            ))}
          </div>
        ) : guides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <button
                key={guide.id}
                onClick={() => navigate(`/guide/${guide.slug}`)}
                className="text-left rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(15,81,50,0.1) 0%, rgba(10,10,10,0.95) 100%)',
                  border: '1px solid rgba(34,197,94,0.15)',
                }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-[#22C55E]/20 flex items-center justify-center mb-4">
                  <BookOpen size={24} className="text-[#22C55E]" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-sm text-[#D1D5DB] mb-4 line-clamp-3">
                  {guide.excerpt}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 pt-4 border-t border-[#22C55E]/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold capitalize ${getDifficultyColor(guide.difficulty)}`}>
                      {guide.difficulty}
                    </span>
                    <span className="text-[#6B7280]">{guide.view_count} views</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <Clock size={14} />
                    <span>{guide.read_time_minutes} min read</span>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full mt-4 px-4 py-2 bg-[#22C55E] hover:bg-[#1ea34e] text-black font-semibold rounded-lg transition-all duration-200">
                  Read Guide
                </button>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#D1D5DB] text-lg">No guides available for this category yet.</p>
          </div>
        )}

        {/* Featured Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(15,81,50,0.08)', border: '1px solid rgba(34,197,94,0.1)' }}>
            <BookOpen className="mx-auto mb-4 text-[#22C55E]" size={32} />
            <p className="text-3xl font-bold text-white mb-2">70+</p>
            <p className="text-[#D1D5DB]">Trading guides created</p>
          </div>
          <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(15,81,50,0.08)', border: '1px solid rgba(34,197,94,0.1)' }}>
            <Target className="mx-auto mb-4 text-[#22C55E]" size={32} />
            <p className="text-3xl font-bold text-white mb-2">7</p>
            <p className="text-[#D1D5DB]">Learning categories</p>
          </div>
          <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(15,81,50,0.08)', border: '1px solid rgba(34,197,94,0.1)' }}>
            <Clock className="mx-auto mb-4 text-[#22C55E]" size={32} />
            <p className="text-3xl font-bold text-white mb-2">4+</p>
            <p className="text-[#D1D5DB]">Average read time (hours)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
