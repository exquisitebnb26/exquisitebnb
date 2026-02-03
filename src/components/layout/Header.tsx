import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/brand/Logo";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "FAQs", path: "/faqs" },
  { name: "Properties", path: "/properties" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-charcoal/95 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 relative">
        <nav className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link
            to="/"
            className="relative z-50 luxury-logo-glow"
          >
            <Logo />
          </Link>

          {/* Hamburger-Controlled Inline Navigation */}
          <div
            className={`absolute right-24 top-1/2 -translate-y-1/2
              max-w-[calc(100%-6rem)]
              flex items-center gap-4
              transition-all duration-500 ease-out
              ${
                isMenuOpen
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 translate-x-2 pointer-events-none"
              }
            `}
          >
            {navLinks.map((link, index) => (
              <div key={link.path} className="flex items-center gap-4">
                <Link
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm tracking-wider uppercase transition-colors duration-300 ${
                    location.pathname === link.path
                      ? "text-gold"
                      : "text-cream/70 hover:text-cream"
                  }`}
                >
                  {link.name}
                </Link>

                {index !== navLinks.length - 1 && (
                  <span className="text-cream/40 select-none"></span>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative z-50 text-cream"
            aria-label="Menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="relative w-6 h-6 block">
              <Menu
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${
                  isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
                }`}
              />
            </span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;