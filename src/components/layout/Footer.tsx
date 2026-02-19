import { Link } from "react-router-dom";
import Logo from "@/components/brand/Logo";
import { Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { useContent } from "@/lib/content";

const Footer = () => {
  const { content, isLoading } = useContent();
  if (isLoading || !content?.site?.content) {
    return null;
  }
  const currentYear = new Date().getFullYear();
  const site = content.site.content;

  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "Book", path: "/book" },
    { name: "About", path: "/about" },
    { name: "Partnership", path: "/partnership" },
    { name: "Contact", path: "/contact" },
    { name: "FAQs", path: "/faqs" },
  ];

  return (
    <footer className="bg-cream-warm dark:bg-charcoal border-t border-border">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="inline-block luxury-logo-theme-glow">
              <Logo />
            </div>
            <p className="text-emerald dark:text-cream-muted text-sm leading-relaxed max-w-sm">
              {site.description}
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald/50 dark:text-cream/50 transition-all duration-300 hover:text-gold hover:-translate-y-0.5 hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={site.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald/50 dark:text-cream/50 transition-all duration-300 hover:text-gold hover:-translate-y-0.5 hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:text-center">
            <h4 className="text-emerald dark:text-gold text-xs tracking-widest uppercase mb-6">
              Navigation
            </h4>
            <div className="flex flex-wrap gap-x-8 gap-y-4 lg:justify-center">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-emerald/60 dark:text-cream/60 hover:text-gold dark:hover:text-cream text-sm transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Office Location Column */}
          <div className="space-y-4 text-left lg:text-right">
            <h4 className="text-emerald dark:text-gold text-xs tracking-widest uppercase">
              Office Location
            </h4>

            <div className="text-emerald dark:text-cream-muted text-sm leading-relaxed space-y-3">
              <p className="flex items-start gap-2 lg:justify-end">
                <MapPin className="text-emerald dark:text-gold w-4 h-4 shrink-0 mt-1 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                <span>
                  {site.officeName}
                  <br />
                  {site.address}
                </span>
              </p>

              <p className="flex items-start gap-2 lg:justify-end">
                <Phone className="text-emerald dark:text-gold w-4 h-4 shrink-0 mt-1 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                <a
                  href={`tel:${site.phone}`}
                  className="hover:text-gold dark:hover:text-cream transition-colors"
                >
                  {site.phone}
                </a>
              </p>

              <p className="flex items-start gap-2 lg:justify-end">
                <Mail className="text-emerald dark:text-gold w-4 h-4 shrink-0 mt-1 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="hover:text-gold dark:hover:text-cream transition-colors"
                >
                  {site.supportEmail}
                </a>
              </p>
            </div>

            <div className="w-full lg:max-w-sm lg:ml-auto h-40 rounded-xl overflow-hidden border-[2px] transition-all duration-500 ease-out hover:-translate-y-1 border-[hsl(var(--forest-dark))] shadow-[0_0_12px_hsl(var(--forest-dark)_/_0.35)] hover:shadow-[0_0_30px_hsl(var(--forest-dark)_/_0.6)] dark:border-gold dark:shadow-[0_0_12px_rgba(212,175,55,0.35)] dark:hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]">
              <iframe
                title="Office Location Map"
                src={site.mapEmbedUrl}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-emerald-divider dark:bg-gradient-to-r dark:from-transparent dark:via-gold/40 dark:to-transparent my-12" />

        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-emerald dark:text-cream/40 text-xs">
          <p>© {currentYear} {site.brandName}. {site.copyrightText}</p>
          <p className="italic font-serif">Privately hosted. Thoughtfully managed.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
