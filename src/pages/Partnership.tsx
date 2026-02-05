import { ArrowRight, Sparkles, Shield, Users, Palette, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Partnership = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-cream-warm dark:bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-forest/10 dark:from-forest/5 to-transparent" />
        <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
          <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-6 animate-fade-in">
            Partnership Opportunities
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-8 animate-fade-in max-w-4xl mx-auto leading-tight">
            Elevate Your Property. <br className="hidden md:block" />
            Partner With Purpose.
          </h1>
          <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-lg md:text-xl max-w-2xl mx-auto animate-fade-in leading-relaxed">
            We don't manage properties — we curate experiences. If you own a 
            remarkable space and value thoughtful hospitality, let's explore 
            what we can build together.
          </p>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-20 lg:py-28 bg-cream-soft dark:bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
              A Different Approach
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">
              Why Partner With Exquisitebnb
            </h2>
            <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted leading-relaxed">
              Exquisitebnb is built on a brand-first philosophy. We believe that 
              exceptional stays are created through intention — not volume. Our 
              partnerships are selective because quality cannot be scaled without care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 bg-card border border-[hsl(var(--forest-dark))] dark:border-border hover:border-[hsl(var(--forest-dark))]/30 dark:hover:border-gold/30 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_30px_hsl(var(--forest-dark)_/_0.45)] dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)]">
              <Shield className="w-8 h-8 text-[hsl(var(--forest-dark))] dark:text-gold mb-4" />
              <h3 className="text-xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-3">Trust Over Transactions</h3>
              <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-sm leading-relaxed">
                We prioritize relationships built on mutual respect and shared values, 
                not quick turnovers or aggressive marketing tactics.
              </p>
            </div>
            <div className="p-8 bg-card border border-[hsl(var(--forest-dark))] dark:border-border hover:border-[hsl(var(--forest-dark))]/30 dark:hover:border-gold/30 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_30px_hsl(var(--forest-dark)_/_0.45)] dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)]">
              <Sparkles className="w-8 h-8 text-[hsl(var(--forest-dark))] dark:text-gold mb-4" />
              <h3 className="text-xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-3">Long-Term Value</h3>
              <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-sm leading-relaxed">
                Our focus is sustainable success — protecting your asset's reputation 
                while building a legacy of memorable guest experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 lg:py-28 bg-cream-grey dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
              The Exquisitebnb Difference
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">
              What Sets Us Apart
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Curated Positioning",
                description: "Each property is positioned as a distinct experience, not a commodity listing."
              },
              {
                title: "Design & Presentation",
                description: "We guide styling, photography, and presentation to reflect refined taste."
              },
              {
                title: "Guest Quality Over Volume",
                description: "We attract discerning travelers who respect spaces and value experiences."
              },
              {
                title: "Thoughtful Operations",
                description: "Every detail — from communication to turnover — reflects our standard of care."
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[hsl(var(--forest-dark))]/10 dark:bg-gold/10 flex items-center justify-center">
                  <span className="text-[hsl(var(--forest-dark))] dark:text-gold font-serif text-lg">{index + 1}</span>
                </div>
                <h3 className="text-lg font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-3">{item.title}</h3>
                <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 lg:py-28 bg-cream-soft dark:bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
              What You Gain
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">
              Partnership Benefits
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Palette,
                title: "Premium Brand Positioning",
                description: "Your property becomes part of a curated collection, attracting guests who seek elevated stays."
              },
              {
                icon: Sparkles,
                title: "Design Guidance",
                description: "Receive thoughtful recommendations on styling, amenities, and presentation that enhance guest appeal."
              },
              {
                icon: Shield,
                title: "Seamless Operations",
                description: "From guest communication to turnover coordination, we handle the details with professionalism and care."
              },
              {
                icon: Users,
                title: "Respectful Guests",
                description: "Our brand attracts travelers who appreciate quality — guests who treat your home with respect."
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-6 bg-card border border-[hsl(var(--forest-dark))] dark:border-border hover:border-[hsl(var(--forest-dark))]/30 dark:hover:border-gold/30 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_30px_hsl(var(--forest-dark)_/_0.45)] dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)]">
                <item.icon className="w-6 h-6 text-[hsl(var(--forest-dark))] dark:text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-2">{item.title}</h3>
                  <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 lg:py-28 bg-cream-warm dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
                Ideal Partners
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-8">
                Who This Partnership Is For
              </h2>
              <ul className="space-y-4">
                {[
                  "Property owners with quality homes seeking premium positioning",
                  "Investors who understand that brand value protects asset value",
                  "Design-conscious owners who care deeply about guest experience",
                  "Hospitality-minded professionals who appreciate operational excellence"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--forest-dark))] dark:text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:pl-8 lg:border-l lg:border-[hsl(var(--forest-dark))] dark:lg:border-border">
              <p className="text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted text-sm tracking-[0.2em] uppercase mb-4">
                A Gentle Note
              </p>
              <h3 className="text-xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">
                This May Not Be the Right Fit If...
              </h3>
              <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted leading-relaxed mb-4">
                Our approach is intentional, which means it's not for everyone. If 
                your primary focus is maximizing nightly rates at any cost, or if 
                guest experience feels secondary to revenue optimization, we may 
                not be aligned.
              </p>
              <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted leading-relaxed">
                We work best with partners who see their property as more than an 
                investment — but as a space that deserves care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 lg:py-28 bg-cream-soft dark:bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">
              Our Process
            </h2>
            <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted leading-relaxed">
              We believe great partnerships begin with conversation, not contracts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We start with a thoughtful conversation to understand your property, your goals, and your vision for the guest experience."
              },
              {
                step: "02",
                title: "Alignment & Preparation",
                description: "If we're a good fit, we work together on positioning, presentation, and operational details before going live."
              },
              {
                step: "03",
                title: "Launch & Collaboration",
                description: "Your property joins our collection, and we maintain an ongoing dialogue to ensure continued excellence."
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-8 bg-card border border-[hsl(var(--forest-dark))] dark:border-border hover:border-[hsl(var(--forest-dark))]/30 dark:hover:border-gold/30 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_30px_hsl(var(--forest-dark)_/_0.45)] dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)]">
                <span className="text-[hsl(var(--forest-dark))] dark:text-gold font-serif text-3xl mb-4 block">{item.step}</span>
                <h3 className="text-xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-4">{item.title}</h3>
                <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-cream-warm dark:bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-forest/15 dark:from-forest/10 to-transparent" />
        <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6 max-w-2xl mx-auto">
            Let's Explore What's Possible
          </h2>
          <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            No commitment required. Just a conversation to see if we're aligned. 
            We'd love to hear about your property and your vision.
          </p>
          <Button variant="luxuryGold" size="xl" asChild>
            <Link to="/contact">
              Start the Conversation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <p className="text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted text-sm mt-6">
            We respond to all inquiries within 48 hours.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Partnership;
