import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import heroImage from "@/assets/hero-living-room.jpg";
import bedroomImage from "@/assets/property-bedroom.jpg";
import kitchenImage from "@/assets/property-kitchen.jpg";
import { useContent } from "@/lib/content";

const imageMap: Record<string, string> = {
  hero: heroImage,
  bedroom: bedroomImage,
  kitchen: kitchenImage,
};

const PropertiesPreview = () => {
  const { content, isLoading, error } = useContent();
  if (isLoading || !content?.home?.propertiesPreview) {
    return null;
  }
  const pp = content.home.propertiesPreview;
  // Normalize properties (supports CMS format + PMS nested format)
  const rawItems: any[] = content?.properties?.items || [];

  const normalizedItems =
    rawItems.length > 0 && rawItems[0]?.properties
      ? rawItems[0].properties
      : rawItems;

  // Show first 3 properties
  const previewItems = normalizedItems.slice(0, 3);

  return (
    <section className="py-24 lg:py-32 bg-cream-warm dark:bg-charcoal">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <ScrollReveal variant="fade-in" duration={800}>
            <p className="text-emerald dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
              {pp.label}
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={900} delay={150}>
            <h2 className="text-3xl md:text-4xl font-serif text-emerald dark:text-cream">
              {pp.title}
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewItems.map((property, index) => (
            <ScrollReveal
              key={property.id || `${property.name}-${index}`}
              variant="scale-in"
              delay={200 + index * 160}
              duration={900}
            >
              <Link
                to="/properties"
                className="group block overflow-hidden rounded-sm
                  transition-all duration-500 ease-out
                  hover:border-[hsl(var(--forest-dark))]
                  hover:shadow-[0_0_38px_hsl(var(--forest-dark)_/_0.55)]
                  dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)]
                  hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden border border-border
                  group-hover:border-gold transition-colors duration-500">
                  <img
                    src={imageMap[property.imageKey] || heroImage}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-serif text-cream mb-1">
                      {property.name}
                    </h3>
                    <p className="text-cream dark:text-cream-muted text-sm">
                      {property.location} · {property.guests} guests
                    </p>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variant="fade-up" delay={600} duration={800}>
          <div className="text-center mt-12">
            <Button variant="luxuryOutline" size="lg" asChild className="text-emerald dark:text-gold">
              <Link to="/properties">{pp.ctaText}</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PropertiesPreview;
