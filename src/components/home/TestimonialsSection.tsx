import { Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const reviews = [
  {
    rating: 5,
    text: "Absolutely stunning space. Every detail was perfect—from the lighting to the linens. Felt like a five-star hotel with the warmth of home.",
    author: "Sarah M.",
  },
  {
    rating: 5,
    text: "The cleanest rental I've ever stayed in. You can tell the hosts truly care. Will definitely be returning.",
    author: "James K.",
  },
  {
    rating: 5,
    text: "A rare find. Beautiful, comfortable, and the host was incredibly responsive. This is what hospitality should be.",
    author: "Elena R.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-cream-soft dark:bg-charcoal-light">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <ScrollReveal variant="fade-in" duration={800}>
            <p className="text-emerald dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
              Trusted by Guests
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={900} delay={150}>
            <h2 className="text-emerald dark:text-cream text-3xl md:text-4xl font-serif">
              What Our Guests Say
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {reviews.map((review, index) => (
            <ScrollReveal
              key={index}
              variant="fade-up"
              delay={200 + index * 140}
              duration={800}
            >
              <div
                className="p-8 bg-card border border-border rounded-sm
                  transition-all duration-500 ease-out
                  hover:border-[hsl(var(--forest-dark))]
                  hover:shadow-[0_0_38px_hsl(var(--forest-dark)_/_0.55)]
                  dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)]
                  hover:-translate-y-1
                  h-full"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-forest dark:fill-gold text-emerald dark:text-gold"
                    />
                  ))}
                </div>
                <p className="text-emerald dark:text-cream-muted italic mb-4 leading-relaxed">
                  "{review.text}"
                </p>
                <p className="text-cream text-sm font-medium">{review.author}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Booking Platform Logos */}
        <ScrollReveal variant="fade-in" delay={500} duration={900}>
          <div className="text-center">
            <p className="text-emerald dark:text-cream-muted text-sm mb-6">
              Book securely through trusted platforms
            </p>
            <div className="flex items-center justify-center gap-12">
              <span className="text-emerald/40 dark:text-cream text-lg font-medium tracking-wide">
                Airbnb
              </span>
              <span className="text-emerald/40 dark:text-cream text-lg font-medium tracking-wide">
                VRBO
              </span>
              <span className="text-emerald/40 dark:text-cream text-lg font-medium tracking-wide">
                Booking.com
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
