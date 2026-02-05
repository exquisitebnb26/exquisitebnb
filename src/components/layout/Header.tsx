import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/brand/Logo";
import ThemeToggle from "@/components/ui/theme-toggle";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Properties", path: "/properties" },
  {name: "Book", path: "/book"},
  { name: "About", path: "/about" },
  { name: "Partnership", path: "/partnership" },
  { name: "Contact", path: "/contact" },
  { name: "FAQs", path: "/faqs" }
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${
          isScrolled
                       ? "dark:bg-background/95 dark:backdrop-blur-md dark:border-b dark:border-border bg-cream-warm"
            : "dark:bg-transparent bg-cream-warm"
        }
      `}
    >
      <div className="container mx-auto px-6 lg:px-12 relative">
        <nav className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link
            to="/"
            className="relative z-50 luxury-logo-theme-glow">
            <Logo />
          </Link>

          {/* Hamburger-Controlled Inline Navigation */}
          <div
            className={`hidden lg:flex absolute right-36 top-1/2 -translate-y-1/2
              max-w-[calc(100%-6rem)]
              flex items-center gap-5 sm:gap-4
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
                  className={`relative text-sm sm:text-xs tracking-[0.18em] uppercase transition-colors duration-300
                    after:absolute after:left-0 after:-bottom-1
                    after:h-[1px] after:w-0 after:bg-[hsl(var(--forest-dark))] dark:after:bg-gold
                    after:transition-all after:duration-300
                    hover:after:w-full
                    ${
                      location.pathname === link.path
                                                ? "dark:text-gold after:w-full text-[hsl(var(--forest-dark))]"
                        : "dark:text-foreground/70 dark:hover:text-foreground text-[hsl(var(--forest-dark))] hover:text-[hsl(var(--forest-dark))]"
                      }
                  `}
                >
                  {link.name}
                </Link>

                {index !== navLinks.length - 1 && (
                  <span className="text-foreground/40 select-none"></span>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative z-50 text-foreground transition-transform duration-300 hover:scale-105"
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
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Flyout Menu */}
        <div
          className={`lg:hidden absolute inset-x-0 top-full
            transition-all duration-500 ease-out
            ${
              isMenuOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-3 pointer-events-none"
            }
          `}
        >
          <div className="mx-6 mt-4 rounded-xl bg-card/95 backdrop-blur-md border border-border shadow-lg">
            <div className="flex flex-col items-center gap-5 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`relative text-sm tracking-[0.3em] uppercase transition-colors duration-300
                    after:absolute after:left-0 after:-bottom-2
                    after:h-[1px] after:w-0 after:bg-gold
                    after:transition-all after:duration-300
                    hover:after:w-full
                    ${
                      location.pathname === link.path
                        ? "text-gold after:w-full"
                        : "dark:text-foreground/80 dark:hover:text-foreground light:text-black/80 light:hover:text-black"
                    }
                  `}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;