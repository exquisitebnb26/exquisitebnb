import { ScrollReveal } from "@/components/ui/scroll-reveal";

const PhilosophySection = () => {
  return (
    <section className="py-24 lg:py-32 bg-cream-warm dark:bg-charcoal">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <ScrollReveal variant="fade-in" duration={800}>
            <p className="text-emerald dark:text-gold text-sm tracking-[0.25em] uppercase">
              Our Philosophy
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={900} delay={150}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-charcoal dark:text-cream">
              Where comfort meets
              <span className="italic text-gold"> elegance</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-in" duration={700} delay={300}>
            <div
              className="h-px
                bg-gradient-emerald-divider
                dark:bg-gradient-to-r dark:from-transparent dark:via-gold/40 dark:to-transparent"
            />
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={900} delay={400}>
            <p className="text-charcoal-light dark:text-cream-muted text-lg leading-relaxed">
              Exquisitebnb is not just a place to stay—it's an experience.
              We believe that every guest deserves spaces that feel like home,
              yet exceed the standards of the finest hotels. Our properties are
              thoughtfully designed, impeccably maintained, and personally
              hosted with genuine care.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
