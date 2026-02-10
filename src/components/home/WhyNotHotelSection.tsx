import { ScrollReveal } from "@/components/ui/scroll-reveal";

const comparisons = [
  { point: "More space to live and work", detail: "Full kitchens, living rooms, and dedicated workspaces — not a single room." },
  { point: "Residential calm, not hotel traffic", detail: "Quiet neighborhoods instead of busy lobbies, elevators, and hallways." },
  { point: "Privacy without isolation", detail: "Your own space with a responsive host just a message away." },
  { point: "Designed homes, not standardized rooms", detail: "Thoughtfully curated interiors — each property has its own character." },
];

const WhyNotHotelSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-cream-soft dark:bg-charcoal-light">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal variant="fade-in" duration={800}>
              <p className="text-emerald dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
                A Thoughtful Alternative
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" duration={900} delay={150}>
              <h2 className="text-3xl md:text-4xl font-serif text-charcoal dark:text-cream">
                Why not <span className="italic text-gold">a hotel</span>?
              </h2>
            </ScrollReveal>
          </div>

          <div className="space-y-8">
            {comparisons.map((item, index) => (
              <ScrollReveal key={index} variant="fade-up" delay={200 + index * 120} duration={800}>
                <div className="flex gap-6 items-start">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-[hsl(var(--forest-dark))] dark:bg-gold shrink-0" />
                  <div>
                    <h3 className="text-lg font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-1">
                      {item.point}
                    </h3>
                    <p className="text-sm text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNotHotelSection;
