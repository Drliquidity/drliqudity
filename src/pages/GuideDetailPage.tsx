import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { getFuturesGuideBySlug } from '../lib/supabase';

interface Guide {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  excerpt: string;
  difficulty: string;
  read_time_minutes: number;
  featured: boolean;
  view_count: number;
  created_at: string;
}

export default function GuideDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGuide() {
      try {
        if (slug) {
          const data = await getFuturesGuideBySlug(slug);
          setGuide(data);
        }
      } catch (error) {
        console.error('Failed to load guide:', error);
      } finally {
        setLoading(false);
      }
    }
    loadGuide();
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

  if (!guide) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Guide not found</h1>
          <button
            onClick={() => navigate('/education')}
            className="btn-primary"
          >
            Back to Education
          </button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return { text: 'text-[#4ADE80]', bg: 'bg-[#4ADE80]/10', border: 'border-[#4ADE80]/30' };
      case 'intermediate':
        return { text: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10', border: 'border-[#22C55E]/30' };
      case 'advanced':
        return { text: 'text-[#EF4444]', bg: 'bg-[#EF4444]/10', border: 'border-[#EF4444]/30' };
      default:
        return { text: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10', border: 'border-[#22C55E]/30' };
    }
  };

  const difficultyColors = getDifficultyColor(guide.difficulty);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/education')}
          className="flex items-center gap-2 text-[#22C55E] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Education Hub
        </button>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <BookOpen className="text-[#22C55E] flex-shrink-0 mt-1" size={32} />
            <h1 className="text-5xl font-bold text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              {guide.title}
            </h1>
          </div>
          <p className="text-lg text-[#D1D5DB] mb-6 leading-relaxed">
            {guide.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${difficultyColors.bg} ${difficultyColors.border}`}
            >
              <span className={`font-semibold capitalize ${difficultyColors.text}`}>
                {guide.difficulty}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30">
              <Clock size={16} className="text-[#22C55E]" />
              <span className="text-[#22C55E] font-semibold">{guide.read_time_minutes} min read</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D1D5DB]/10 border border-[#D1D5DB]/20">
              <span className="text-[#D1D5DB] text-sm">{guide.view_count} views</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className="rounded-2xl p-10 mb-12 prose prose-invert max-w-none"
          style={{
            background: 'linear-gradient(135deg, rgba(15,81,50,0.1) 0%, rgba(10,10,10,0.95) 100%)',
            border: '1px solid rgba(34,197,94,0.15)',
          }}
        >
          <div className="text-[#D1D5DB] leading-relaxed whitespace-pre-wrap">
            {guide.content}
          </div>
        </div>

        {/* Key Takeaways */}
        <div
          className="rounded-2xl p-10 mb-12"
          style={{
            background: 'rgba(15,81,50,0.08)',
            border: '1px solid rgba(34,197,94,0.1)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Key Takeaways
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-[#D1D5DB]">
              <span className="text-[#22C55E] font-bold flex-shrink-0">✓</span>
              <span>This guide covers essential concepts for {guide.category.toLowerCase()} trading strategy</span>
            </li>
            <li className="flex items-start gap-3 text-[#D1D5DB]">
              <span className="text-[#22C55E] font-bold flex-shrink-0">✓</span>
              <span>Suitable for {guide.difficulty} traders looking to improve their edge</span>
            </li>
            <li className="flex items-start gap-3 text-[#D1D5DB]">
              <span className="text-[#22C55E] font-bold flex-shrink-0">✓</span>
              <span>Apply these concepts in live trading for consistent results</span>
            </li>
            <li className="flex items-start gap-3 text-[#D1D5DB]">
              <span className="text-[#22C55E] font-bold flex-shrink-0">✓</span>
              <span>Combine with other educational resources for mastery</span>
            </li>
          </ul>
        </div>

        {/* CTA Footer */}
        <div className="text-center">
          <p className="text-[#D1D5DB] text-lg mb-6">
            Ready to expand your trading knowledge?
          </p>
          <button
            onClick={() => navigate('/education')}
            className="px-8 py-4 bg-[#22C55E] hover:bg-[#1ea34e] text-black font-semibold text-lg rounded-lg transition-all duration-200"
          >
            Explore More Guides
          </button>
        </div>
      </div>
    </div>
  );
}
