import { useContent } from "@/lib/content";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { iconRegistry } from "@/components/admin/icons";

const DesignedForRealLifeSection = () => {
  const { content, isLoading } = useContent();

  const section = content?.home?.designedForRealLife;
  if (isLoading || !section) return null;

  return (
    <section className="py-24 lg:py-32 bg-cream-soft dark:bg-charcoal-light">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <ScrollReveal variant="fade-in" duration={800}>
            <p className="text-emerald dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
              {section.label}
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={900} delay={150}>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal dark:text-cream mb-4">
              {section.title} <span className="italic text-gold">{section.titleItalic}</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={800} delay={250}>
            <p className="text-charcoal-light dark:text-cream-muted text-lg max-w-2xl mx-auto">
              {section.subtitle}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {section.items.map((feature, index) => {
            const Icon = iconRegistry[feature.icon];
            if (!Icon) return null;
            return (
              <ScrollReveal key={index} variant="fade-up" delay={200 + index * 100} duration={800}>
                <div className="group text-center p-6 space-y-4 transition-all duration-500 ease-out hover:-translate-y-1">
                  <div
                    className="
                      w-12 h-12 mx-auto rounded-full
                      bg-[hsl(var(--forest-dark))]/10 dark:bg-gold/10
                      flex items-center justify-center
                      transition-all duration-500 ease-out
                      group-hover:scale-110
                      group-hover:shadow-[0_0_18px_hsl(var(--forest-dark))]
                      dark:group-hover:shadow-[0_0_18px_rgba(212,175,55,0.65)]
                    "
                  >
                    <Icon
                      className="
                        w-5 h-5
                        text-[hsl(var(--forest-dark))] dark:text-gold
                        transition-all duration-500 ease-out
                        group-hover:drop-shadow-[0_0_8px_hsl(var(--forest-dark))]
                        dark:group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.85)]
                      "
                    />
                  </div>
                  <h3 className="text-sm font-serif font-medium text-[hsl(var(--forest-dark))] dark:text-cream">
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DesignedForRealLifeSection;
