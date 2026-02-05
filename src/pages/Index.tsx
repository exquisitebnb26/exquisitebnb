import { Link } from "react-router-dom";
import { Star, Sparkles, Shield, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-living-room.jpg";
import bedroomImage from "@/assets/property-bedroom.jpg";
import kitchenImage from "@/assets/property-kitchen.jpg";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
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
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <p className="text-sm tracking-[0.3em] uppercase luxury-text-glow">
              Boutique Hospitality
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-cream leading-tight">
              A refined stay.
              <br />
              <span className="italic text-cream/80">Thoughtfully hosted.</span>
            </h1>
            <p className="text-cream-muted text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              Experience the comfort of home with the elegance of a boutique
              hotel. Every detail curated, every stay memorable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button variant="heroGold" size="lg" asChild>
                <Link to="/properties">View Properties</Link>
              </Button>
              <Button variant="hero" size="lg" asChild className="luxury-text-glow">
                <Link to="/book">Book on Trusted Platforms</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-cream/50 to-transparent" />
        </div>
      </section>

      {/* Brand Introduction */}
      <section className="py-24 lg:py-32 bg-cream-warm dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-emerald dark:text-gold text-sm tracking-[0.25em] uppercase">
              Our Philosophy
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-charcoal dark:text-cream">
              Where comfort meets
              <span className="italic text-emerald dark:text-gold"> elegance</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-emerald/30 dark:via-gold/30 to-transparent" />
            <p className="text-charcoal-light dark:text-cream-muted text-lg leading-relaxed">
              Exquisitebnb is not just a place to stay—it's an experience.
              We believe that every guest deserves spaces that feel like home,
              yet exceed the standards of the finest hotels. Our properties are
              thoughtfully designed, impeccably maintained, and personally
              hosted with genuine care.
            </p>
          </div>
        </div>
      </section>

      {/* Why Exquisitebnb */}
      <section className="py-24 lg:py-32 bg-cream-soft dark:bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-emerald dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
              The Experience
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal dark:text-cream">
              Why Exquisitebnb
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Thoughtful Design",
                description:
                  "Every space is curated with intention—beautiful furnishings, ambient lighting, and refined details.",
              },
              {
                icon: Shield,
                title: "Hotel-Level Cleanliness",
                description:
                  "Rigorous cleaning protocols ensure every corner sparkles. Fresh linens, spotless surfaces, always.",
              },
              {
                icon: Heart,
                title: "Ultimate Comfort",
                description:
                  "Premium bedding, quality amenities, and everything you need for a restful, rejuvenating stay.",
              },
              {
                icon: MessageCircle,
                title: "Responsive Hosting",
                description:
                  "Personal, attentive service from real hosts who care about your experience.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-emerald dark:bg-card border border-emerald/20 dark:border-border rounded-sm
                  transition-all duration-500 ease-out
                  hover:border-emerald-light dark:hover:border-gold
                  hover:shadow-[0_8px_30px_rgba(16,95,76,0.25)] dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)]
                  hover:-translate-y-1"
              >
                <feature.icon className="w-8 h-8 text-cream dark:text-gold mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-serif text-cream dark:text-cream mb-3">
                  {feature.title}
                </h3>
                <p className="text-cream/80 dark:text-cream-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Preview */}
      <section className="py-24 lg:py-32 bg-cream-warm dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-emerald dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
              Featured Stays
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal dark:text-cream">
              Discover Our Properties
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: heroImage,
                name: "The Gilded Loft",
                location: "Downtown · 4 guests",
              },
              {
                image: bedroomImage,
                name: "Velvet Haven",
                location: "Midtown · 2 guests",
              },
              {
                image: kitchenImage,
                name: "The Urban Retreat",
                location: "Uptown · 6 guests",
              },
            ].map((property, index) => (
              <Link
                key={index}
                to="/properties"
                className="group block overflow-hidden rounded-sm
    transition-all duration-500 ease-out
    hover:shadow-[0_8px_30px_rgba(16,95,76,0.25)] dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)]
    hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden border border-emerald/20 dark:border-border
  group-hover:border-emerald dark:group-hover:border-gold transition-colors duration-500 bg-emerald dark:bg-transparent">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-dark dark:from-charcoal via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-serif text-cream mb-1">
                      {property.name}
                    </h3>
                    <p className="text-cream/80 dark:text-cream-muted text-sm">{property.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="luxuryOutline" size="lg" asChild>
              <Link to="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-24 lg:py-32 bg-cream-soft dark:bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-emerald dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
              Trusted by Guests
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal dark:text-cream">
              What Our Guests Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                rating: 5,
                text: "Absolutely stunning space. Every detail was perfect—from the lighting to the linens. Felt like a five-star hotel with the warmth of home.",
                author: "Sarah M.",
              },
              {
                rating: 5,
                text: "The cleanest rental I've ever stayed in. You can tell the hosts truly care. Will definitely be returning.",
                author: "James K.",
              },
              {
                rating: 5,
                text: "A rare find. Beautiful, comfortable, and the host was incredibly responsive. This is what hospitality should be.",
                author: "Elena R.",
              },
            ].map((review, index) => (
              <div
                key={index}
                className="p-8 bg-emerald dark:bg-card border border-emerald/20 dark:border-border rounded-sm
                  transition-all duration-500 ease-out
                  hover:border-emerald-light dark:hover:border-gold
                  hover:shadow-[0_8px_30px_rgba(16,95,76,0.25)] dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)]
                  hover:-translate-y-1"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-cream dark:fill-gold text-cream dark:text-gold"
                    />
                  ))}
                </div>
                <p className="text-cream/80 dark:text-cream-muted italic mb-4 leading-relaxed">
                  "{review.text}"
                </p>
                <p className="text-cream dark:text-cream text-sm font-medium">{review.author}</p>
              </div>
            ))}
          </div>

          {/* Booking Platform Logos */}
          <div className="text-center">
            <p className="text-charcoal-light dark:text-cream-muted text-sm mb-6">
              Book securely through trusted platforms
            </p>
            <div className="flex items-center justify-center gap-12">
              <span className="text-charcoal/40 dark:text-cream/40 text-lg font-medium tracking-wide">
                Airbnb
              </span>
              <span className="text-charcoal/40 dark:text-cream/40 text-lg font-medium tracking-wide">
                VRBO
              </span>
              <span className="text-charcoal/40 dark:text-cream/40 text-lg font-medium tracking-wide">
                Booking.com
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-forest rounded-full blur-[200px]" />
        </div>
        <div className="relative container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-cream mb-6">
            Ready to experience
            <span className="italic text-gold"> exquisite</span>?
          </h2>
          <p className="text-cream-muted text-lg max-w-xl mx-auto mb-8">
            Browse our collection of thoughtfully curated properties and find
            your perfect stay.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="luxuryGold" size="lg" asChild>
              <Link to="/properties">Explore Properties</Link>
            </Button>
            <Button variant="luxuryOutline" size="lg" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
