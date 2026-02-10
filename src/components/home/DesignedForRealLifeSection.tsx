import { Wifi, TreePine, Monitor, KeyRound, SprayCanIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const features = [
  { icon: Wifi, title: "Reliable Wi-Fi", description: "Consistent, high-speed connectivity for work calls, streaming, and everything in between." },
  { icon: TreePine, title: "Quiet Settings", description: "Residential neighborhoods — calm, private, and free from hotel traffic." },
  { icon: Monitor, title: "Work-Ready Spaces", description: "Dedicated desk setups designed for focused, productive days." },
  { icon: KeyRound, title: "Self Check-In", description: "Arrive when it suits you — clear instructions, no waiting." },
  { icon: SprayCanIcon, title: "Professionally Cleaned", description: "Consistent, thorough cleaning between every stay. Always." },
];

const DesignedForRealLifeSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-cream-warm dark:bg-charcoal">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <ScrollReveal variant="fade-in" duration={800}>
            <p className="text-emerald dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
              Built for Real Life
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={900} delay={150}>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal dark:text-cream mb-4">
              Designed for <span className="italic text-gold">Real Life</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={800} delay={250}>
            <p className="text-charcoal-light dark:text-cream-muted text-lg max-w-2xl mx-auto">
              Every detail considered — for guests who need more than just a bed.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={index} variant="fade-up" delay={200 + index * 100} duration={800}>
                <div className="text-center p-6 space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[hsl(var(--forest-dark))]/10 dark:bg-gold/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[hsl(var(--forest-dark))] dark:text-gold" />
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
