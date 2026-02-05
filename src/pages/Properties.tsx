import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-living-room.jpg";
import bedroomImage from "@/assets/property-bedroom.jpg";
import kitchenImage from "@/assets/property-kitchen.jpg";
import bathroomImage from "@/assets/property-bathroom.jpg";

const properties = [
  {
    id: "gilded-loft",
    name: "The Gilded Loft",
    location: "Downtown",
    guests: 4,
    description:
      "A sophisticated urban retreat with floor-to-ceiling windows, designer furnishings, and stunning city views. Perfect for couples or small families seeking refined comfort.",
    image: heroImage,
    bookingPlatforms: ["Airbnb", "VRBO"],
  },
  {
    id: "velvet-haven",
    name: "Velvet Haven",
    location: "Midtown",
    guests: 2,
    description:
      "An intimate sanctuary featuring plush textiles, warm lighting, and thoughtful touches. Ideal for romantic getaways and solo travelers seeking tranquility.",
    image: bedroomImage,
    bookingPlatforms: ["Airbnb", "VRBO"],
  },
  {
    id: "urban-retreat",
    name: "The Urban Retreat",
    location: "Uptown",
    guests: 6,
    description:
      "Spacious and elegant, this property blends modern design with cozy comfort. A chef's kitchen and generous living areas make it perfect for gatherings.",
    image: kitchenImage,
    bookingPlatforms: ["Airbnb", "VRBO"],
  },
  {
    id: "serene-suite",
    name: "The Serene Suite",
    location: "Waterfront",
    guests: 4,
    description:
      "Spa-inspired luxury with calming aesthetics and premium amenities. Unwind in style with soaking tub, ambient lighting, and peaceful atmosphere.",
    image: bathroomImage,
    bookingPlatforms: ["Airbnb", "VRBO"],
  },
];
const Properties = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-cream-soft dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-emerald dark:text-gold text-sm tracking-[0.25em] uppercase mb-4 animate-fade-in">
            Our Collection
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-emeralddark:text-cream mb-6 animate-fade-in">
            Curated Properties
          </h1>
          <p className="text-emerald dark:text-cream-muted text-lg max-w-2xl mx-auto animate-fade-in">
            Each property is hand-selected and personally maintained to ensure an
            exceptional stay. Explore our collection of thoughtfully designed spaces.
          </p>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 lg:py-24 bg-cream-warm dark:bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="group bg-cream-soft dark:bg-card border border-border rounded-sm overflow-hidden
                  transition-all duration-500 ease-out
                  /* LIGHT MODE (DEFAULT) */
                  hover:border-[hsl(var(--forest-dark))]
                  hover:shadow-[0_0_40px_hsl(var(--forest-dark)_/_0.45)]

                  /* DARK MODE OVERRIDES */
                  dark:hover:border-gold
                  dark:hover:shadow-[0_0_40px_rgba(212,175,55,0.45)]
                  hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden border border-transparent
                  group-hover:border-gold transition-colors duration-500">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm mb-4
  text-[hsl(var(--forest-dark))]
  dark:text-cream-muted"
>
  <span className="flex items-center gap-2">
    <MapPin
      className="w-4 h-4 transition-all duration-300
        text-[hsl(var(--forest-dark))]
        group-hover:drop-shadow-[0_0_8px_hsl(var(--forest-dark)_/_0.5)]
        dark:text-gold
        dark:group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
    />
    {property.location}
  </span>

  <span className="flex items-center gap-2">
    <Users
      className="w-4 h-4 transition-all duration-300
        text-[hsl(var(--forest-dark))]
        group-hover:drop-shadow-[0_0_8px_hsl(var(--forest-dark)_/_0.5)]
        dark:text-gold
        dark:group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
    />
    {property.guests} guests
  </span>
</div>

                  <h2 className="text-2xl font-serif text-emerald dark:text-cream mb-3">
                    {property.name}
                  </h2>

                  <p className="text-emerald dark:text-cream-muted text-sm leading-relaxed mb-6">
                    {property.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="luxuryOutline"
                      asChild
                      className="transition-all duration-300
                        hover:shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                    >
                      <Link to={`/properties/${property.id}`}>View Details</Link>
                    </Button>
                    <div className="flex items-center gap-1 text-xs
  text-[hsl(var(--forest-dark))]
  dark:text-cream-muted"
>
  <span>
    {property.bookingPlatforms.join(", ")}
  </span>
</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Note */}
      <section className="py-16 bg-cream-warm dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-emerald dark:text-cream-muted text-sm mb-4">
            All bookings are securely handled through trusted platforms
          </p>
          <div className="flex items-center justify-center gap-8">
            {["Airbnb", "VRBO", "Booking.com"].map((platform) => (
              <span
                key={platform}
                className="font-medium text-sm cursor-default
                  transition-all duration-300 ease-out

                  /* LIGHT MODE */
                  text-[hsl(var(--forest-dark))]
                  hover:drop-shadow-[0_0_12px_hsl(var(--forest-dark)_/_0.45)]

                  /* DARK MODE */
                  dark:text-cream/50
                  dark:hover:text-gold
                  dark:hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]

                  hover:-translate-y-0.5"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Properties;
