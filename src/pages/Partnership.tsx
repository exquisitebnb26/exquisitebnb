import { ArrowRight, Sparkles, Shield, Users, Palette, CheckCircle, LucideIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useContent } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = { Sparkles, Shield, Users, Palette };

const Partnership = () => {
  const { partnership } = useContent();
  const p = partnership;

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-cream-warm dark:bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-forest/10 dark:from-forest/5 to-transparent" />
        <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
          <ScrollReveal variant="fade-in" duration={900} delay={100}>
            <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-6">{p.hero.label}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" duration={1000} delay={250}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-8 max-w-4xl mx-auto leading-tight">
              {p.hero.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" duration={900} delay={450}>
            <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">{p.hero.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-20 lg:py-28 bg-cream-soft dark:bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ScrollReveal variant="fade-in" duration={800}>
              <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">{p.whyPartner.label}</p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" duration={900} delay={150}>
              <h2 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">{p.whyPartner.title}</h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" duration={900} delay={300}>
              <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted leading-relaxed">{p.whyPartner.text}</p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {p.whyPartner.cards.map((card, index) => {
              const Icon = iconMap[card.icon] || Shield;
              return (
                <ScrollReveal key={index} variant={index === 0 ? "fade-left" : "fade-right"} delay={200 + index * 150} duration={800}>
                  <div className="p-8 bg-card border border-[hsl(var(--forest-dark))] dark:border-border hover:border-[hsl(var(--forest-dark))]/30 dark:hover:border-gold/30 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_30px_hsl(var(--forest-dark)_/_0.45)] dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] h-full">
                    <Icon className="w-8 h-8 text-[hsl(var(--forest-dark))] dark:text-gold mb-4" />
                    <h3 className="text-xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-3">{card.title}</h3>
                    <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-sm leading-relaxed">{card.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 lg:py-28 bg-cream-warm dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ScrollReveal variant="fade-in" duration={800}>
              <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">{p.differentiators.label}</p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" duration={900} delay={150}>
              <h2 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">{p.differentiators.title}</h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {p.differentiators.items.map((item, index) => (
              <ScrollReveal key={index} variant="fade-up" delay={200 + index * 130} duration={800}>
                <div className="text-center p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[hsl(var(--forest-dark))]/10 dark:bg-gold/10 flex items-center justify-center">
                    <span className="text-[hsl(var(--forest-dark))] dark:text-gold font-serif text-lg">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-3">{item.title}</h3>
                  <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-cream-soft dark:bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ScrollReveal variant="fade-in" duration={800}>
              <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">{p.benefits.label}</p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" duration={900} delay={150}>
              <h2 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">{p.benefits.title}</h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {p.benefits.items.map((item, index) => {
              const Icon = iconMap[item.icon] || Sparkles;
              return (
                <ScrollReveal key={index} variant="fade-up" delay={150 + index * 120} duration={800}>
                  <div className="flex gap-4 p-6 bg-card border border-[hsl(var(--forest-dark))] dark:border-border hover:border-[hsl(var(--forest-dark))]/30 dark:hover:border-gold/30 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_30px_hsl(var(--forest-dark)_/_0.45)] dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] h-full">
                    <Icon className="w-6 h-6 text-[hsl(var(--forest-dark))] dark:text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-2">{item.title}</h3>
                      <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 lg:py-28 bg-cream-warm dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <ScrollReveal variant="fade-in" duration={800}>
                <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">{p.idealPartners.label}</p>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" duration={900} delay={150}>
                <h2 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-8">{p.idealPartners.title}</h2>
              </ScrollReveal>
              <ul className="space-y-4">
                {p.idealPartners.items.map((item, index) => (
                  <ScrollReveal key={index} variant="fade-left" delay={250 + index * 100} duration={700}>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[hsl(var(--forest-dark))] dark:text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted leading-relaxed">{item}</span>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>

            <ScrollReveal variant="fade-right" delay={300} duration={900}>
              <div className="lg:pl-8 lg:border-l lg:border-[hsl(var(--forest-dark))] dark:lg:border-border">
                <p className="text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted text-sm tracking-[0.2em] uppercase mb-4">{p.idealPartners.noteFull.label}</p>
                <h3 className="text-xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">{p.idealPartners.noteFull.title}</h3>
                <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted leading-relaxed mb-4">{p.idealPartners.noteFull.text1}</p>
                <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted leading-relaxed">{p.idealPartners.noteFull.text2}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28 bg-cream-soft dark:bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ScrollReveal variant="fade-in" duration={800}>
              <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">{p.process.label}</p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" duration={900} delay={150}>
              <h2 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">{p.process.title}</h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" duration={800} delay={300}>
              <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted leading-relaxed">{p.process.subtitle}</p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {p.process.steps.map((item, index) => (
              <ScrollReveal key={index} variant="fade-up" delay={200 + index * 150} duration={900}>
                <div className="text-center p-8 bg-card border border-[hsl(var(--forest-dark))] dark:border-border hover:border-[hsl(var(--forest-dark))]/30 dark:hover:border-gold/30 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_30px_hsl(var(--forest-dark)_/_0.45)] dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] h-full">
                  <span className="text-[hsl(var(--forest-dark))] dark:text-gold font-serif text-3xl mb-4 block">{item.step}</span>
                  <h3 className="text-xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-4">{item.title}</h3>
                  <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-cream-warm dark:bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-forest/15 dark:from-forest/10 to-transparent" />
        <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
          <ScrollReveal variant="fade-up" duration={1000}>
            <h2 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6 max-w-2xl mx-auto">{p.cta.title}</h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" duration={900} delay={200}>
            <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">{p.cta.subtitle}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" duration={800} delay={400}>
            <Button variant="luxuryGold" size="xl" asChild>
              <Link to="/contact">
                {p.cta.ctaText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted text-sm mt-6">{p.cta.note}</p>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Partnership;
