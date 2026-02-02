import { Link } from "react-router-dom";
import Logo from "@/components/brand/Logo";

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "Properties", path: "/properties" },
  { name: "About", path: "/about" },
  { name: "FAQs", path: "/faqs" },
  { name: "Book", path: "/book" },
  { name: "Contact", path: "/contact" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal border-t border-border">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Logo />
            <p className="text-cream-muted text-sm leading-relaxed max-w-sm">
              A boutique hospitality experience. Thoughtfully designed spaces,
              hotel-level cleanliness, and warm personal hosting.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="lg:text-center">
            <h4 className="text-gold text-xs tracking-widest uppercase mb-6">
              Navigation
            </h4>
            <div className="flex flex-wrap gap-x-8 gap-y-4 lg:justify-center">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-cream/60 hover:text-cream text-sm transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Trust Column */}
          <div className="lg:text-right">
            <h4 className="text-gold text-xs tracking-widest uppercase mb-6">
              Book With Confidence
            </h4>
            <p className="text-cream-muted text-sm leading-relaxed">
              All bookings are securely handled through trusted platforms:
              Airbnb, VRBO, and Booking.com
            </p>
            <div className="flex items-center gap-6 mt-6 lg:justify-end">
              <span className="text-cream/40 text-xs">Airbnb</span>
              <span className="text-cream/40 text-xs">VRBO</span>
              <span className="text-cream/40 text-xs">Booking.com</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="luxury-divider my-12" />

        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-cream/40 text-xs">
          <p>© {currentYear} Exquisitebnb. All rights reserved.</p>
          <p className="italic font-serif">A refined stay. Thoughtfully hosted.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
