import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Users,
  MapPin,
  Wifi,
  Car,
  Snowflake,
  Tv,
  Coffee,
  UtensilsCrossed,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-living-room.jpg";
import bedroomImage from "@/assets/property-bedroom.jpg";
import kitchenImage from "@/assets/property-kitchen.jpg";
import bathroomImage from "@/assets/property-bathroom.jpg";

const propertiesData: Record<string, any> = {
  "gilded-loft": {
    name: "The Gilded Loft",
    location: "Downtown",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.96,
    reviewCount: 128,
    description:
      "Welcome to The Gilded Loft—a sophisticated urban retreat where modern luxury meets timeless elegance. Floor-to-ceiling windows frame stunning city views, while designer furnishings and curated artwork create an atmosphere of refined comfort. Every detail has been thoughtfully considered, from the premium bedding to the fully-equipped chef's kitchen.",
    images: [heroImage, bedroomImage, kitchenImage],
    amenities: [
      { icon: Wifi, name: "High-Speed WiFi" },
      { icon: Car, name: "Free Parking" },
      { icon: Snowflake, name: "Air Conditioning" },
      { icon: Tv, name: "Smart TV" },
      { icon: Coffee, name: "Coffee & Tea" },
      { icon: UtensilsCrossed, name: "Full Kitchen" },
    ],
    reviews: [
      {
        rating: 5,
        text: "Absolutely stunning space. Every detail was perfect.",
        author: "Sarah M.",
      },
      {
        rating: 5,
        text: "The views alone are worth the stay. Immaculate and elegant.",
        author: "James K.",
      },
    ],
    airbnbUrl: "#",
    vrboUrl: "#",
    bookingUrl: "#",
  },
  "velvet-haven": {
    name: "Velvet Haven",
    location: "Midtown",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.98,
    reviewCount: 89,
    description:
      "Velvet Haven is an intimate sanctuary designed for rest and rejuvenation. Plush textiles, warm ambient lighting, and thoughtful touches create a cocoon of comfort. Perfect for romantic getaways or solo travelers seeking tranquility in the heart of the city.",
    images: [bedroomImage, heroImage, bathroomImage],
    amenities: [
      { icon: Wifi, name: "High-Speed WiFi" },
      { icon: Snowflake, name: "Air Conditioning" },
      { icon: Tv, name: "Smart TV" },
      { icon: Coffee, name: "Coffee & Tea" },
    ],
    reviews: [
      {
        rating: 5,
        text: "The coziest stay I've ever had. Felt like a warm embrace.",
        author: "Elena R.",
      },
    ],
    airbnbUrl: "#",
    vrboUrl: "#",
    bookingUrl: "#",
  },
  "urban-retreat": {
    name: "The Urban Retreat",
    location: "Uptown",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.94,
    reviewCount: 156,
    description:
      "The Urban Retreat offers spacious elegance for groups and families. Modern design meets cozy comfort with a chef's kitchen, generous living areas, and thoughtful amenities throughout. Perfect for celebrations or multi-generational gatherings.",
    images: [kitchenImage, heroImage, bedroomImage],
    amenities: [
      { icon: Wifi, name: "High-Speed WiFi" },
      { icon: Car, name: "Free Parking" },
      { icon: Snowflake, name: "Air Conditioning" },
      { icon: Tv, name: "Smart TV" },
      { icon: Coffee, name: "Coffee & Tea" },
      { icon: UtensilsCrossed, name: "Full Kitchen" },
    ],
    reviews: [
      {
        rating: 5,
        text: "Perfect for our family gathering. Kitchen was amazing!",
        author: "Michael T.",
      },
    ],
    airbnbUrl: "#",
    vrboUrl: "#",
    bookingUrl: "#",
  },
  "serene-suite": {
    name: "The Serene Suite",
    location: "Waterfront",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.97,
    reviewCount: 72,
    description:
      "Spa-inspired luxury awaits at The Serene Suite. Calming aesthetics, premium amenities, and a stunning soaking tub create an atmosphere of pure relaxation. Ambient lighting and peaceful surroundings ensure the ultimate retreat experience.",
    images: [bathroomImage, bedroomImage, heroImage],
    amenities: [
      { icon: Wifi, name: "High-Speed WiFi" },
      { icon: Snowflake, name: "Air Conditioning" },
      { icon: Tv, name: "Smart TV" },
      { icon: Coffee, name: "Coffee & Tea" },
    ],
    reviews: [
      {
        rating: 5,
        text: "The bathroom alone is worth the stay. Pure bliss.",
        author: "Anna L.",
      },
    ],
    airbnbUrl: "#",
    vrboUrl: "#",
    bookingUrl: "#",
  },
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const property = propertiesData[id || "gilded-loft"];

  if (!property) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-cream">Property not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back Link */}
      <div className="pt-24 lg:pt-28 bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-cream-muted hover:text-cream transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Properties
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <section className="bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="relative aspect-[21/9] rounded-sm overflow-hidden">
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Property Info */}
      <section className="py-12 lg:py-16 bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Header */}
              <div>
                <div className="flex items-center gap-4 text-cream-muted text-sm mb-4">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    {property.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold" />
                    {property.guests} guests · {property.bedrooms} beds ·{" "}
                    {property.bathrooms} baths
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-serif text-cream mb-4">
                  {property.name}
                </h1>

                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-gold text-gold" />
                  <span className="text-cream font-medium">{property.rating}</span>
                  <span className="text-cream-muted">
                    ({property.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="luxury-divider" />

              {/* Description */}
              <div>
                <h2 className="text-xl font-serif text-cream mb-4">
                  About This Space
                </h2>
                <p className="text-cream-muted leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-serif text-cream mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-card border border-border rounded-sm"
                    >
                      <amenity.icon className="w-5 h-5 text-gold" />
                      <span className="text-cream text-sm">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h2 className="text-xl font-serif text-cream mb-6">
                  Guest Reviews
                </h2>
                <div className="space-y-6">
                  {property.reviews.map((review: any, index: number) => (
                    <div
                      key={index}
                      className="p-6 bg-card border border-border rounded-sm"
                    >
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="text-cream-muted italic mb-3">
                        "{review.text}"
                      </p>
                      <p className="text-cream text-sm font-medium">
                        {review.author}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 p-8 bg-card border border-border rounded-sm space-y-6">
                <h3 className="text-xl font-serif text-cream text-center">
                  Book This Property
                </h3>

                <Button
                  variant="luxuryGold"
                  className="w-full"
                  size="lg"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  Check Availability
                </Button>

                {showCalendar && (
                  <div className="animate-fade-in">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-sm border border-border bg-charcoal-light"
                    />
                    <p className="text-cream-muted text-xs text-center mt-4">
                      Select your dates, then book through our partner platforms
                    </p>
                  </div>
                )}

                <div className="luxury-divider" />

                <div className="space-y-3">
                  <p className="text-cream-muted text-sm text-center mb-4">
                    Book securely on:
                  </p>
                  <a
                    href={property.airbnbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-charcoal-light border border-border rounded-sm hover:border-gold/30 transition-colors"
                  >
                    <span className="text-cream text-sm">Airbnb</span>
                    <ExternalLink className="w-4 h-4 text-cream-muted" />
                  </a>
                  <a
                    href={property.vrboUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-charcoal-light border border-border rounded-sm hover:border-gold/30 transition-colors"
                  >
                    <span className="text-cream text-sm">VRBO</span>
                    <ExternalLink className="w-4 h-4 text-cream-muted" />
                  </a>
                  <a
                    href={property.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-charcoal-light border border-border rounded-sm hover:border-gold/30 transition-colors"
                  >
                    <span className="text-cream text-sm">Booking.com</span>
                    <ExternalLink className="w-4 h-4 text-cream-muted" />
                  </a>
                </div>

                <p className="text-cream-muted text-xs text-center">
                  Bookings and payments are completed securely through trusted
                  partner platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PropertyDetail;
