import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import heroImage from "@/assets/hero-living-room.jpg";
import { useContent } from "@/lib/content";

const HeroSection = () => {
  const { content, isLoading, error } = useContent();

if (isLoading) return null;
if (error) return null;

const home = content?.home;
if (!home) return null;

const hero = home.hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury living room interior"
          className="w-full h-full object-cover brightness-125 contrast-95 saturate-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <ScrollReveal variant="fade-in" duration={900} delay={200}>
            <p className="text-sm tracking-[0.3em] uppercase luxury-text-glow">
              {hero.label}
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={1000} delay={400}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-cream leading-tight">
              {hero.title}
              <br />
              <span className="italic text-cream/80">{hero.titleItalic}</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={900} delay={650}>
            <p className="text-cream dark:text-gold text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              {hero.subtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-in" duration={800} delay={800}>
            <p className="text-cream/70 text-sm tracking-wide max-w-md mx-auto">
              Thoughtfully designed stays for professionals, families, and extended visits.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={800} delay={850}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button variant="heroGold" size="lg" asChild>
                <Link to={hero.cta1Link}>{hero.cta1Text}</Link>
              </Button>
              <Button variant="hero" size="lg" asChild className="luxury-text-glow">
                <Link to={hero.cta2Link}>{hero.cta2Text}</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-cream/50 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
