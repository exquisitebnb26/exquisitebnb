import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star, Users, MapPin, Wifi, Car, Snowflake, Tv, Coffee, UtensilsCrossed,
  ChevronLeft, ChevronRight, ExternalLink, LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import heroImage from "@/assets/hero-living-room.jpg";
import bedroomImage from "@/assets/property-bedroom.jpg";
import kitchenImage from "@/assets/property-kitchen.jpg";
import bathroomImage from "@/assets/property-bathroom.jpg";
import { useContent } from "@/lib/content";
import { AvailabilityCalendar } from "@/components/property/AvailabilityCalendar";
import { useAvailability } from "@/lib/avaliability/useAvaliability";

const imageMap: Record<string, string> = {
  hero: heroImage, bedroom: bedroomImage, kitchen: kitchenImage, bathroom: bathroomImage,
};

const amenityIconMap: Record<string, LucideIcon> = {
  "High-Speed WiFi": Wifi, "Free Parking": Car, "Air Conditioning": Snowflake,
  "Smart TV": Tv, "Coffee & Tea": Coffee, "Full Kitchen": UtensilsCrossed,
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { content, isLoading } = useContent();
  const [activeImage, setActiveImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { blockedDates, error } = useAvailability(id ?? "");
  const properties = content?.properties;

  // Support both CMS format and PMS nested format
  const rawItems: any[] = properties?.items || [];

  const propertyList =
    Array.isArray(rawItems) && rawItems[0]?.properties
      ? rawItems[0].properties
      : rawItems;

  const property =
    propertyList.find((p: any) => p.id === id) ??
    propertyList[0];

  // Support CMS image keys OR PMS direct image URLs
  const images =
    property?.galleryKeys && property.galleryKeys.length > 0
      ? property.galleryKeys.map((k: string) => imageMap[k] || heroImage)
      : property?.images && property.images.length > 0
      ? property.images
      : [heroImage];

  useEffect(() => {
    if (!property || isTransitioning || images.length === 0) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setActiveImage((prev) => (prev + 1) % images.length);
      setTimeout(() => setIsTransitioning(false), 1400);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length, isTransitioning, property]);

  // Loading state after all hooks, do not return before hooks
  if (isLoading || !property) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-[hsl(var(--forest-dark))] dark:text-cream-muted">
            Loading property…
          </p>
        </div>
      </Layout>
    );
  }

  const handlePrevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 1400);
  };

  const handleNextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 1400);
  };

  return (
    <Layout>
      <div className="pt-24 lg:pt-28 bg-cream-soft dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12">
          <Link to="/properties" className="inline-flex items-center gap-2 text-[hsl(var(--forest-dark))] hover:text-[hsl(var(--forest-dark))] transition-colors text-sm dark:text-cream-muted dark:hover:text-cream">
            <ChevronLeft className="w-4 h-4" /> Back to Properties
          </Link>
        </div>
      </div>

      {/* Hero Image Slider */}
      <section className="bg-cream-soft dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <ScrollReveal variant="scale-in" duration={1000}>
            <div className="relative aspect-[21/9] rounded-sm overflow-hidden group">
              {images.map((img, index) => (
                <img key={index} src={img} alt={`${property.name} image ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1400ms] ease-out ${index === activeImage ? "opacity-100 scale-105" : "opacity-0 scale-100"}`} />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent dark:from-charcoal/60" />
              <button onClick={handlePrevImage} aria-label="Previous image" disabled={isTransitioning}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm border transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-40 disabled:cursor-not-allowed border-[hsl(var(--forest-dark))] text-[hsl(var(--forest-dark))] bg-cream/70 hover:bg-cream hover:shadow-[0_0_18px_hsl(var(--forest-dark)_/_0.6)] dark:border-gold dark:text-gold dark:bg-charcoal/60 dark:hover:bg-charcoal/80 dark:hover:shadow-[0_0_18px_rgba(212,175,55,0.6)]">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={handleNextImage} aria-label="Next image" disabled={isTransitioning}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm border transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-40 disabled:cursor-not-allowed border-[hsl(var(--forest-dark))] text-[hsl(var(--forest-dark))] bg-cream/70 hover:bg-cream hover:shadow-[0_0_18px_hsl(var(--forest-dark)_/_0.6)] dark:border-gold dark:text-gold dark:bg-charcoal/60 dark:hover:bg-charcoal/80 dark:hover:shadow-[0_0_18px_rgba(212,175,55,0.6)]">
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {images.map((_, index) => (
                  <button key={index} onClick={() => setActiveImage(index)} type="button" aria-label={`Go to image ${index + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${index === activeImage
                      ? "bg-[hsl(var(--forest-dark))] shadow-[0_0_12px_hsl(var(--forest-dark)_/_0.8)] dark:bg-gold dark:shadow-[0_0_12px_rgba(212,175,55,0.8)] scale-125"
                      : "bg-forest/30 hover:bg-forest/60 dark:bg-cream/40 dark:hover:bg-cream/70"}`} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Property Info */}
      <section className="py-12 lg:py-16 bg-cream-soft dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <ScrollReveal variant="fade-up" duration={900}>
                <div>
                  <div className="text-sm mb-4 text-[hsl(var(--forest-dark))] dark:text-cream-muted flex items-center gap-4">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[hsl(var(--forest-dark))] dark:text-gold" /> {property.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[hsl(var(--forest-dark))] dark:text-gold" />
                      {property.guests} guests · {property.bedrooms} beds · {property.bathrooms} baths
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-4 drop-shadow-none dark:drop-shadow-[0_0_12px_rgba(212,175,55,0.55)]">
                    {property.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-[hsl(var(--forest-dark))] text-[hsl(var(--forest-dark))] dark:fill-gold dark:text-gold" />
                    <span className="text-[hsl(var(--forest-dark))] dark:text-cream font-medium">{property.rating}</span>
                    <span className="text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted">({property.reviewCount} reviews)</span>
                  </div>
                </div>
              </ScrollReveal>

              <div className="h-px bg-gradient-emerald-divider dark:bg-gradient-to-r dark:from-transparent dark:via-gold/40 dark:to-transparent" />

              <ScrollReveal variant="fade-up" duration={800} delay={150}>
                <div>
                  <h2 className="text-xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-4">About This Space</h2>
                  <p className="text-[hsl(var(--forest-dark))]/80 dark:text-cream-muted leading-relaxed">{property.fullDescription}</p>
                </div>
              </ScrollReveal>

              {/* Booking Clarity */}
              <ScrollReveal variant="fade-up" duration={800} delay={200}>
                <div className="p-6 bg-[hsl(var(--forest-dark))]/5 dark:bg-gold/5 rounded-sm space-y-4">
                  <h2 className="text-lg font-serif text-[hsl(var(--forest-dark))] dark:text-cream">What to Know Before You Book</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[hsl(var(--forest-dark))]/50 dark:text-cream-muted text-xs uppercase tracking-wider mb-1">Check-in</p>
                      <p className="text-[hsl(var(--forest-dark))] dark:text-cream">From 3:00 PM — self check-in with clear instructions</p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--forest-dark))]/50 dark:text-cream-muted text-xs uppercase tracking-wider mb-1">Check-out</p>
                      <p className="text-[hsl(var(--forest-dark))] dark:text-cream">11:00 AM</p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--forest-dark))]/50 dark:text-cream-muted text-xs uppercase tracking-wider mb-1">Ideal for</p>
                      <p className="text-[hsl(var(--forest-dark))] dark:text-cream">Professionals, remote workers, families, extended stays</p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--forest-dark))]/50 dark:text-cream-muted text-xs uppercase tracking-wider mb-1">Not suited for</p>
                      <p className="text-[hsl(var(--forest-dark))] dark:text-cream">Events or parties</p>
                    </div>
                  </div>
                   <p className="text-[hsl(var(--forest-dark))]/50 dark:text-cream-muted text-xs">
                    Extended stays are welcome — reach out for multi-week availability. Cancellation terms are fair and clearly stated on each booking platform.
                  </p>
                </div>
              </ScrollReveal>

              {/* Amenities */}
              <div>
                <ScrollReveal variant="fade-in" duration={800}>
                  <h2 className="text-xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">Amenities</h2>
                </ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(Array.isArray(property?.amenities) ? property.amenities : []).map(
                    (amenity, index) => {
                    const Icon = amenityIconMap[amenity] || Wifi;
                    return (
                      <ScrollReveal key={index} variant="fade-up" delay={100 + index * 80} duration={700}>
                        <div className="flex items-center gap-3 p-4 bg-card border border-border transition-all duration-500 hover:-translate-y-0.5 border-[hsl(var(--forest-dark))] hover:shadow-[0_0_24px_hsl(var(--forest-dark)_/_0.45)] dark:border-border dark:hover:shadow-[0_0_24px_rgba(212,175,55,0.45)] rounded-sm">
                          <Icon className="w-5 h-5 text-[hsl(var(--forest-dark))] dark:text-gold" />
                          <span className="text-[hsl(var(--forest-dark))] dark:text-cream text-sm">{amenity}</span>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <ScrollReveal variant="fade-in" duration={800}>
                  <h2 className="text-xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">Guest Reviews</h2>
                </ScrollReveal>
                <div className="space-y-6">
                  {(property.reviews ?? []).map((review, index) => (
                    <ScrollReveal key={index} variant="fade-up" delay={100 + index * 120} duration={800}>
                      <div className="p-6 bg-card border border-border transition-all duration-500 hover:-translate-y-0.5 border-[hsl(var(--forest-dark))] hover:shadow-[0_0_24px_hsl(var(--forest-dark)_/_0.45)] dark:border-border dark:hover:shadow-[0_0_24px_rgba(212,175,55,0.45)] rounded-sm">
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[hsl(var(--forest-dark))] text-[hsl(var(--forest-dark))] dark:fill-gold dark:text-gold" />
                          ))}
                        </div>
                        {/* Review text */}
                        <p className="text-[hsl(var(--forest-dark))] dark:text-cream-muted text-base mb-4">{review.text}</p>
                        {/* Footer row: author left, label right */}
                        <div className="flex items-end justify-between">
                          <span className="text-[hsl(var(--forest-dark))] dark:text-cream text-sm font-medium">
                            {review.author}
                          </span>
                          {review.label && (
                            <span className="text-[hsl(var(--forest-dark))]/50 dark:text-gold/60 text-xs tracking-wide whitespace-nowrap">
                              {review.label}
                            </span>
                          )}
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ScrollReveal variant="fade-right" duration={900} delay={300}>
                <div className="sticky top-28 p-8 rounded-sm space-y-6 bg-cream-warm border border-[hsl(var(--forest-dark))] dark:bg-card dark:border-border transition-all duration-700 ease-out will-change-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_0_28px_hsl(var(--forest-dark)_/_0.35)] dark:hover:shadow-[0_0_28px_rgba(212,175,55,0.35)]">
                  <h3 className="text-xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream text-center">Where to Book</h3>
                  <div className="luxury-divider" />
                  <div className="space-y-3">
                    {/* Availability Calendar */}
              <ScrollReveal variant="fade-right" duration={900} delay={450}>
                <div className="mt-6 p-8 rounded-sm space-y-4 bg-cream-warm border border-[hsl(var(--forest-dark))] dark:bg-card dark:border-border transition-all duration-700 ease-out will-change-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_0_28px_hsl(var(--forest-dark)_/_0.35)] dark:hover:shadow-[0_0_28px_rgba(212,175,55,0.35)]">
                  {error && (
                    <p className="text-xs text-red-500 dark:text-red-400 text-center">
                      Failed to load availability.
                    </p>
                  )}
                  <AvailabilityCalendar bookedDates={blockedDates} />
                </div>
              </ScrollReveal>
                    <p className="text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted text-sm text-center mb-4">Book securely on:</p>
                    {(property.bookingPlatforms ?? []).map((platform) => (
  <a
    key={platform.name}
    href={platform.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-between p-4 rounded-sm
      bg-cream border border-[hsl(var(--forest-dark))]
      dark:bg-charcoal-light dark:border-border
      transition-all duration-500 ease-out
      hover:-translate-y-0.5
      hover:shadow-[0_0_24px_hsl(var(--forest-dark)_/_0.45)]
      dark:hover:shadow-[0_0_24px_rgba(212,175,55,0.45)]"
  >
    <span className="text-[hsl(var(--forest-dark))] dark:text-cream text-sm">
      {platform.name}
    </span>
    <ExternalLink className="w-4 h-4 text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted" />
  </a>
))}
                  </div>
                   <p className="text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted text-xs text-center">
                    Availability, pricing, and payments are managed securely by each platform.
                  </p>
                </div>
              </ScrollReveal>

              
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PropertyDetail;
