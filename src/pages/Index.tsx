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
      {/* Hero Section - Dark with image */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury living room interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <p className="text-sm tracking-[0.3em] uppercase luxury-text-glow">
              Boutique Hospitality
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-ivory leading-tight">
              A refined stay.
              <br />
              <span className="italic text-ivory/80">Thoughtfully hosted.</span>
            </h1>
            <p className="text-ivory/70 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              Experience the comfort of home with the elegance of a boutique
              hotel. Every detail curated, every stay memorable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button variant="heroGold" size="lg" asChild>
                <Link to="/properties">View Properties</Link>
              </Button>
              <Button variant="hero" size="lg" asChild>
                <Link to="/book">Book on Trusted Platforms</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-ivory/50 to-transparent" />
        </div>
      </section>

      {/* Brand Introduction - Light warm section */}
      <section className="py-24 lg:py-32 bg-ivory">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-gold text-sm tracking-[0.25em] uppercase font-medium">
              Our Philosophy
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-charcoal">
              Where comfort meets
              <span className="italic text-forest"> elegance</span>
            </h2>
            <div className="luxury-divider" />
            <p className="text-charcoal/70 text-lg leading-relaxed">
              Exquisitebnb is not just a place to stay—it's an experience.
              We believe that every guest deserves spaces that feel like home,
              yet exceed the standards of the finest hotels. Our properties are
              thoughtfully designed, impeccably maintained, and personally
              hosted with genuine care.
            </p>
          </div>
        </div>
      </section>

      {/* Why Exquisitebnb - Stone/cream section */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4 font-medium">
              The Experience
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal">
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
                className="group p-8 bg-ivory border border-stone-warm rounded-sm
                  transition-all duration-500 ease-out luxury-card-hover"
              >
                <feature.icon className="w-8 h-8 text-gold mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-serif text-charcoal mb-3">
                  {feature.title}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Preview - Light ivory section */}
      <section className="py-24 lg:py-32 bg-ivory">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4 font-medium">
              Featured Stays
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal">
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
                  transition-all duration-500 ease-out luxury-card-hover
                  bg-card border border-stone-warm"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-serif text-ivory mb-1">
                      {property.name}
                    </h3>
                    <p className="text-ivory/70 text-sm">{property.location}</p>
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

      {/* Trust Signals - Dark accent section */}
      <section className="py-24 lg:py-32 bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4">
              Trusted by Guests
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-ivory">
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
                className="p-8 bg-charcoal-light border border-charcoal-light rounded-sm
                  transition-all duration-500 ease-out
                  hover:border-gold/30
                  hover:shadow-[0_0_30px_rgba(180,145,45,0.15)]"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-gold text-gold"
                    />
                  ))}
                </div>
                <p className="text-ivory/70 italic mb-4 leading-relaxed">
                  "{review.text}"
                </p>
                <p className="text-ivory text-sm font-medium">{review.author}</p>
              </div>
            ))}
          </div>

          {/* Booking Platform Logos */}
          <div className="text-center">
            <p className="text-ivory/60 text-sm mb-6">
              Book securely through trusted platforms
            </p>
            <div className="flex items-center justify-center gap-12">
              <span className="text-ivory/40 text-lg font-medium tracking-wide hover:text-gold transition-colors duration-300">
                Airbnb
              </span>
              <span className="text-ivory/40 text-lg font-medium tracking-wide hover:text-gold transition-colors duration-300">
                VRBO
              </span>
              <span className="text-ivory/40 text-lg font-medium tracking-wide hover:text-gold transition-colors duration-300">
                Booking.com
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Warm champagne section */}
      <section className="py-24 lg:py-32 bg-champagne relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/20 rounded-full blur-[200px]" />
        </div>
        <div className="relative container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-charcoal mb-6">
            Ready to experience
            <span className="italic text-forest"> exquisite</span>?
          </h2>
          <p className="text-charcoal/60 text-lg max-w-xl mx-auto mb-8">
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
