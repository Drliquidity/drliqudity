import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data';
import { useScrollAnimation } from '../hooks/useCountUp';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);
  const sectionRef = useScrollAnimation();

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [auto]);

  const goTo = (i: number) => {
    setCurrent(i);
    setAuto(false);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAuto(false);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setAuto(false);
  };

  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#080c08] to-[#0A0A0A] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-14">
          <div className="green-badge inline-flex mb-4">Community Voices</div>
          <h2 className="section-title text-4xl md:text-5xl mb-5">
            What The{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #22C55E, #4ADE80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Community Says
            </span>
          </h2>
          <div className="divider-green mx-auto" />
        </div>

        {/* Slider */}
        <div className="animate-on-scroll relative">
          <div className="overflow-hidden rounded-2xl">
            <div className="relative h-96">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: current === i ? 1 : 0, pointerEvents: current === i ? 'auto' : 'none' }}
                >
                  <div
                    className="w-full h-full p-8 md:p-12 flex flex-col justify-between"
                    style={{
                      background: 'linear-gradient(135deg, rgba(15,81,50,0.12) 0%, rgba(10,10,10,0.95) 100%)',
                      border: '1px solid rgba(34,197,94,0.15)',
                    }}
                  >
                    {/* Stars */}
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-[#EAB308] fill-[#EAB308]" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-xl md:text-2xl text-white leading-relaxed italic font-light">
                      "{t.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          background: 'linear-gradient(135deg, #0F5132, #22C55E)',
                          color: '#FFFFFF',
                          fontFamily: '"Space Grotesk", sans-serif',
                        }}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                          {t.name}
                        </div>
                        <div className="text-[#6B7280] text-sm">
                          {t.handle} · {t.platform}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-300"
                  style={{
                    width: current === i ? '32px' : '8px',
                    height: '8px',
                    background: current === i ? '#22C55E' : 'rgba(34,197,94,0.2)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 text-[#D1D5DB] hover:text-white hover:bg-white/5 border border-[rgba(34,197,94,0.2)] hover:border-[rgba(34,197,94,0.4)]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 text-[#D1D5DB] hover:text-white hover:bg-white/5 border border-[rgba(34,197,94,0.2)] hover:border-[rgba(34,197,94,0.4)]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
