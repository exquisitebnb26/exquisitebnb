import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useContent } from "@/lib/content";


const TestimonialsSection = () => {
  const { content, isLoading } = useContent();
  const [currentIndex, setCurrentIndex] = useState(0);

  const home = content?.home?.content;

if (isLoading || !home?.testimonials) {
  return null;
}

const t = home.testimonials;
  const items = t.items.filter((r) => r.text !== "sk testing");
  const visibleCount = 3;
  const maxIndex = Math.max(0, items.length - visibleCount);
  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < maxIndex;
  const visibleItems = items.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section className="py-24 lg:py-32 bg-cream-soft dark:bg-charcoal-light">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <ScrollReveal variant="fade-in" duration={800}>
            <p className="text-emerald dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
              {t.label}
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={900} delay={150}>
            <h2 className="text-emerald dark:text-cream text-3xl md:text-4xl font-serif">
              {t.title}
            </h2>
          </ScrollReveal>
        </div>

        {/* Carousel with arrows */}
        <div className="relative mb-16">
          {items.length > visibleCount && (
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={!canScrollPrev}
              className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[hsl(var(--forest-dark))] dark:hover:border-gold"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5 text-emerald dark:text-cream" />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-2">
            {visibleItems.map((review, index) => {
              const label = review.label;
              return (
                <ScrollReveal key={currentIndex + index} variant="fade-up" delay={200 + index * 140} duration={800}>
                  <div className="p-8 bg-card border border-border rounded-sm transition-all duration-500 ease-out hover:border-[hsl(var(--forest-dark))] hover:shadow-[0_0_38px_hsl(var(--forest-dark)_/_0.55)] dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] hover:-translate-y-1 h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-forest dark:fill-gold text-emerald dark:text-gold" />
                      ))}
                    </div>
                    <p className="text-emerald dark:text-cream-muted italic mb-4 leading-relaxed">
                      "{review.text}"
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-cream text-sm font-medium">{review.author}</p>
                      {label && (
                        <span className="text-[hsl(var(--forest-dark))]/50 dark:text-gold/60 text-xs tracking-wide">
                          {label}
                        </span>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {items.length > visibleCount && (
            <button
              onClick={() => setCurrentIndex((i) => Math.min(maxIndex, i + 1))}
              disabled={!canScrollNext}
              className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[hsl(var(--forest-dark))] dark:hover:border-gold"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5 text-emerald dark:text-cream" />
            </button>
          )}
        </div>

        {/* Dot indicators */}
        {items.length > visibleCount && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-emerald dark:bg-gold w-4"
                    : "bg-emerald/30 dark:bg-cream/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Booking Platform Logos */}
        <ScrollReveal variant="fade-in" delay={500} duration={900}>
          <div className="text-center">
            <p className="text-emerald dark:text-cream-muted text-sm mb-6">
              {t.platformNote}
            </p>
            <div className="flex items-center justify-center gap-12">
              <span className="text-emerald/40 dark:text-cream text-lg font-medium tracking-wide">Airbnb</span>
              <span className="text-emerald/40 dark:text-cream text-lg font-medium tracking-wide">VRBO</span>
              <span className="text-emerald/40 dark:text-cream text-lg font-medium tracking-wide">Booking.com</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
