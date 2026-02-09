import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useContent } from "@/lib/content";

const CTASection = () => {
  const { content, isLoading, error } = useContent();
  if (isLoading || !content?.home?.cta) {
    return null;
  }
  const cta = content.home.cta;

  return (
    <section className="py-24 lg:py-32 bg-cream-warm dark:bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-forest rounded-full blur-[200px]" />
      </div>
      <div className="relative container mx-auto px-6 lg:px-12 text-center">
        <ScrollReveal variant="fade-up" duration={1000}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-emerald dark:text-cream mb-6">
            {cta.title}
            <span className="italic text-gold"> {cta.titleItalic}</span>?
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" duration={900} delay={200}>
          <p className="text-emerald dark:text-cream-muted text-lg max-w-xl mx-auto mb-8">
            {cta.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" duration={800} delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="luxuryGold" size="lg" asChild>
              <Link to={cta.cta1Link}>{cta.cta1Text}</Link>
            </Button>
            <Button variant="luxuryOutline" size="lg" asChild>
              <Link to={cta.cta2Link}>{cta.cta2Text}</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;
