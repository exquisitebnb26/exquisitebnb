import Layout from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useContent } from "@/lib/content";

const FAQs = () => {
  const { content, isLoading } = useContent();
  const faqs = content?.faqs?.content;
  if (isLoading || !faqs) return null;

  return (
    <Layout>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-cream-warm dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal variant="fade-in" duration={900} delay={100}>
            <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
              {faqs.header.label}
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" duration={1000} delay={250}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">
              {faqs.header.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" duration={900} delay={400}>
            <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-lg max-w-2xl mx-auto">
              {faqs.header.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24 bg-cream-soft dark:bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.items.map((faq, index) => (
              <ScrollReveal key={index} variant="fade-up" delay={100 + index * 80} duration={700}>
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-[hsl(var(--forest-dark))] rounded-sm px-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_0_30px_hsl(var(--forest-dark)_/_0.45)] data-[state=open]:border-[hsl(var(--forest-dark))] dark:border-border dark:hover:border-gold dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] dark:data-[state=open]:border-gold"
                >
                  <AccordionTrigger className="text-left font-serif text-[hsl(var(--forest-dark))] hover:text-[hsl(var(--forest-dark))] hover:drop-shadow-[0_0_6px_hsl(var(--forest-dark)_/_0.6)] dark:text-cream dark:hover:text-gold dark:hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.6)] py-6 transition-all duration-300 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[hsl(var(--forest-dark))]/75 dark:text-cream-muted leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-cream-warm dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal variant="fade-in" duration={800}>
            <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted mb-4">
              {faqs.contactCta.text}
            </p>
            <a href="/contact" className="text-[hsl(var(--forest-dark))] hover:text-[hsl(var(--forest-dark))] hover:drop-shadow-[0_0_10px_hsl(var(--forest-dark)_/_0.6)] dark:text-gold dark:hover:text-gold-muted dark:hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] font-serif text-lg transition-all duration-300">
              {faqs.contactCta.linkText}
            </a>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default FAQs;
