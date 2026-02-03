import { Sparkles, Heart, Shield, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Exquisitebnb from "@/assets/exquisitebnb-logo-gold.png";

const About = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4 animate-fade-in">
            Our Story
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream mb-6 animate-fade-in">
            About Exquisitebnb
          </h1>
          <p className="text-cream-muted text-lg max-w-2xl mx-auto animate-fade-in">
            More than a place to stay—an experience crafted with intention, care,
            and a genuine love for hospitality.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-72 h-72 lg:w-96 lg:h-96
                bg-white rounded-full
                border border-gold/30
                shadow-[0_30px_90px_rgba(0,0,0,0.3)]
                flex items-center justify-center luxury-logo-glow
              ">
                <img
                  src={Exquisitebnb}
                  alt="Exquisitebnb logo"
                  className="w-48 h-48 lg:w-64 lg:h-64 object-contain "
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-cream">
                Why We Created
                <span className="italic text-gold"> Exquisitebnb</span>
              </h2>

              <div className="space-y-4 text-cream-muted leading-relaxed">
                <p>
                  Exquisitebnb was born from a simple belief: every guest
                  deserves to feel truly welcomed, comfortable, and cared for.
                  Not just a clean room and a key, but an experience that feels
                  like coming home to something even better than home.
                </p>
                <p>
                  We've stayed in countless rentals—some forgettable, some
                  uncomfortable, and a rare few that made us think, "This is how
                  it should always be." Those exceptional stays inspired us to
                  create something different.
                </p>
                <p>
                  Each of our properties is thoughtfully designed with intention.
                  We obsess over the details: the softness of the linens, the
                  quality of the lighting, the freshness of the space. We believe
                  that great hospitality isn't about grand gestures—it's about
                  consistency, cleanliness, and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 lg:py-24 bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-gold text-sm tracking-[0.25em] uppercase mb-4">
              Our Philosophy
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-cream">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "Thoughtful Design",
                description:
                  "Every space tells a story. We curate each property with beautiful furnishings, ambient lighting, and refined details that create an atmosphere of calm elegance.",
              },
              {
                icon: Shield,
                title: "Uncompromising Cleanliness",
                description:
                  "Hotel-level cleanliness isn't optional—it's our standard. Rigorous protocols ensure every surface sparkles, every linen is fresh, every corner is pristine.",
              },
              {
                icon: Heart,
                title: "Genuine Care",
                description:
                  "Behind every stay is a real host who cares. We're responsive, attentive, and genuinely invested in making your experience exceptional.",
              },
              {
                icon: Users,
                title: "Guest-First Approach",
                description:
                  "Your comfort drives every decision. From premium amenities to seamless check-in, we anticipate your needs before you even ask.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="p-8 bg-card border border-border rounded-sm
                  transition-all duration-500 ease-out
                  hover:border-gold
                  hover:shadow-[0_0_35px_rgba(212,175,55,0.45)]"
              >
                <value.icon className="w-8 h-8 text-gold mb-6" />
                <h3 className="text-xl font-serif text-cream mb-3">
                  {value.title}
                </h3>
                <p className="text-cream-muted text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-16 lg:py-24 bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif text-cream mb-6">
            A Personal Touch,
            <br />
            <span className="italic text-gold">Every Time</span>
          </h2>
          <p className="text-cream-muted leading-relaxed mb-8">
            When you book with Exquisitebnb, you're not just renting a space—
            you're experiencing hospitality the way it was meant to be. Personal,
            warm, and consistently excellent. We look forward to welcoming you.
          </p>
          <p className="text-gold font-serif italic text-xl">
            — The Exquisitebnb Team
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default About;
