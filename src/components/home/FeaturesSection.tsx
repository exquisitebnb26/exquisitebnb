import { Sparkles, Shield, Heart, MessageCircle, LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useContent } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Sparkles, Shield, Heart, MessageCircle,
};

const FeaturesSection = () => {
  const { home } = useContent();
  const f = home.features;

  return (
    <section className="py-24 lg:py-32 bg-cream-soft dark:bg-charcoal-light">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <ScrollReveal variant="fade-in" duration={800}>
            <p className="text-emerald dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
              {f.label}
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={900} delay={150}>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal dark:text-cream">
              {f.title}<span className="text-gold">{f.titleAccent}</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {f.items.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Sparkles;
            return (
              <ScrollReveal key={index} variant="fade-up" delay={200 + index * 140} duration={800}>
                <div className="group p-8 bg-card border border-border rounded-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[hsl(var(--forest-dark))] hover:shadow-[0_0_35px_hsl(var(--forest-dark)_/_0.45)] dark:hover:border-gold dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] h-full">
                  <Icon className="w-8 h-8 mb-6 group-hover:scale-110 transition-transform duration-300 dark:text-gold text-[hsl(var(--forest-dark))]" />
                  <h3 className="text-xl font-serif mb-3 dark:text-cream text-[hsl(var(--forest-dark))]">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed dark:text-cream-muted text-[hsl(var(--forest-dark))]/70">
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

export default FeaturesSection;
