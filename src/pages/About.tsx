import { Sparkles, Heart, Shield, Users, LucideIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Exquisitebnb from "@/assets/exquisitebnb-logo-gold.png";
import { useContent } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = { Sparkles, Heart, Shield, Users };

const About = () => {
  const { content, isLoading } = useContent();

if (isLoading || !content) return null;
  const about = content.about;
  if (isLoading || !about) return null;

  return (
    <Layout>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-cream-soft dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
            {about.header.label}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">
            <span className="text-[hsl(var(--forest-dark))] dark:text-cream">
              {about.header.title.primary}
            </span>
            <span className="text-gold ml-1">
              {about.header.title.accent}
            </span>
          </h1>
          <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-lg max-w-2xl mx-auto">
            {about.header.subtitle}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 bg-cream-warm dark:bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex items-center justify-center">
              <div
                className="
                  relative w-72 h-72 lg:w-96 lg:h-96
                  bg-cream rounded-full
                  border border-[hsl(var(--forest-dark))]/30
                  shadow-[0_20px_60px_hsl(var(--forest-dark)_/_0.25)]
                  dark:border-gold/30
                  dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]
                  flex items-center justify-center
                  luxury-logo-glow
                  animate-[fadeScaleIn_0.9s_ease-out_forwards]
                  group [perspective:1200px]
                "
              >
                <div
                  className="
                    transition-transform duration-[1200ms] ease-in-out
                    group-hover:[transform:rotateY(360deg)]
                    will-change-transform
                  "
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src={Exquisitebnb}
                    alt="Exquisitebnb logo"
                    className="w-48 h-48 lg:w-64 lg:h-64 object-contain about-logo-spin"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream">
                {about.story.title}
                <span className="italic text-[hsl(var(--forest-dark))] dark:text-gold"> <span className="text-[hsl(var(--forest-dark))] dark:text-cream">
              {about.header.title.primary}
            </span>
            <span className="text-gold ml-1">
              {about.header.title.accent}
            </span></span>
              </h2>
              <div className="space-y-4 text-[hsl(var(--forest-dark))]/75 dark:text-cream-muted leading-relaxed">
                {about.story.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 lg:py-24 bg-cream-soft dark:bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase mb-4">
              {about.philosophy.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream">
              {about.philosophy.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {about.philosophy.values.map((value, index) => {
              const Icon = iconMap[value.icon] || Sparkles;
              return (
                <div key={index} className="p-8 bg-card border border-[hsl(var(--forest-dark))] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_30px_hsl(var(--forest-dark)_/_0.45)] dark:border-border dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] h-full">
                  <Icon className="w-8 h-8 text-[hsl(var(--forest-dark))] dark:text-gold mb-6" />
                  <h3 className="text-xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-16 lg:py-24 bg-cream-warm dark:bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream mb-6">
            {about.closing.title}
            <br />
            <span className="italic text-[hsl(var(--forest-dark))] dark:text-gold">{about.closing.titleItalic}</span>
          </h2>
          <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted leading-relaxed mb-8">
            {about.closing.text}
          </p>
          <p className="text-[hsl(var(--forest-dark))] dark:text-gold font-serif italic text-xl">
            {about.closing.signature}
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default About;