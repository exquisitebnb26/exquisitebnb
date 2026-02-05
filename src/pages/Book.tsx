import { ExternalLink, Shield, CreditCard, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";

const platforms = [
  {
    name: "Airbnb",
    description:
      "Browse our listings, check availability, and book with Airbnb's trusted guest protection.",
    url: "#",
  },
  {
    name: "VRBO",
    description:
      "Explore our properties on VRBO with their Book with Confidence guarantee.",
    url: "#",
  },
  {
    name: "Booking.com",
    description:
      "View our spaces on Booking.com and enjoy their flexible booking options.",
    url: "#",
  },
];

const Book = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-cream-warm dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4 animate-fade-in">
            Reserve Your Stay
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6 animate-fade-in">
            Book with Confidence
          </h1>
          <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-lg max-w-2xl mx-auto animate-fade-in">
            We partner with trusted platforms to ensure your booking is secure,
            protected, and hassle-free. Choose your preferred platform below.
          </p>
        </div>
      </section>

      {/* Why Trusted Platforms */}
      <section className="py-16 lg:py-24 bg-cream-soft dark:bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-4">
              Why We Use Trusted Platforms
            </h2>
            <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted max-w-2xl mx-auto">
              Your security and peace of mind matter to us. That's why we handle
              all bookings through established platforms that offer protection,
              support, and transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Shield,
                title: "Guest Protection",
                description:
                  "Every platform offers their own guest protection policies for your peace of mind.",
              },
              {
                icon: CreditCard,
                title: "Secure Payments",
                description:
                  "All payments are processed securely through encrypted, trusted systems.",
              },
              {
                icon: Calendar,
                title: "Flexible Booking",
                description:
                  "View real-time availability and choose dates that work for your schedule.",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <feature.icon className="w-10 h-10 text-[hsl(var(--forest-dark))] dark:text-gold mx-auto mb-4" />
                <h3 className="text-lg font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-2">
                  {feature.title}
                </h3>
                <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Cards */}
      <section className="py-16 lg:py-24 bg-cream-grey dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-4">
              Choose Your Platform
            </h2>
            <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted">
              All our properties are listed on these trusted platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {platforms.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 bg-card border border-[hsl(var(--forest-dark))] rounded-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_28px_hsl(var(--forest-dark)_/_0.4)] dark:border-border dark:hover:border-gold/40 dark:hover:shadow-[0_0_28px_rgba(212,175,55,0.45)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream group-hover:text-[hsl(var(--forest-dark))] dark:group-hover:text-gold transition-colors">
                    {platform.name}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted group-hover:text-[hsl(var(--forest-dark))] dark:group-hover:text-gold transition-colors" />
                </div>
                <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-sm leading-relaxed">
                  {platform.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency Note */}
      <section className="py-16 bg-cream-soft dark:bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-2xl">
          <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-sm leading-relaxed">
            <span className="text-[hsl(var(--forest-dark))] dark:text-gold">Note:</span> Availability, pricing, and
            payments are managed directly by each booking platform. Once you
            select your dates and complete your reservation, you'll receive
            confirmation and communication through that platform. We'll be in
            touch shortly after to ensure your stay is perfect.
          </p>
        </div>
      </section>

      {/* Browse Properties CTA */}
      <section className="py-16 lg:py-24 bg-cream-warm dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-4">
            Not sure which property to book?
          </h2>
          <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted mb-6">
            Explore our collection first and find the perfect space for your
            stay.
          </p>
          <a
            href="/properties"
            className="inline-flex items-center gap-2 text-[hsl(var(--forest-dark))] hover:text-[hsl(var(--forest-dark))] dark:text-gold dark:hover:text-gold-muted transition-colors font-serif text-lg"
          >
            Browse Properties →
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Book;
