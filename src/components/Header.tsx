import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const AFFILIATE_LINK = "https://iqoption.net/land/start-trading/pt/?aff=1616&afftrack=metodotrader&aff_model=revenue";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Início", href: "/#inicio" },
    { label: "Ativos", href: "/#ativos" },
    { label: "Plataforma", href: "/#plataforma" },
    { label: "Estratégias", href: "/#estrategias" },
    { label: "Depoimentos", href: "/#depoimentos" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10"
              aria-label="MétodoTrader Logo"
            >
              <defs>
                <linearGradient id="mt-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="hsl(160 84% 45%)" />
                  <stop offset="100%" stopColor="hsl(190 95% 55%)" />
                </linearGradient>
              </defs>
              {/* Ascending bars */}
              <rect x="6" y="24" width="5" height="10" rx="1" fill="url(#mt-grad)" opacity="0.7" />
              <rect x="13" y="18" width="5" height="16" rx="1" fill="url(#mt-grad)" opacity="0.85" />
              <rect x="20" y="12" width="5" height="22" rx="1" fill="url(#mt-grad)" />
              {/* Trend line */}
              <path
                d="M5 22 L12 16 L19 11 L27 5"
                stroke="hsl(190 95% 55%)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Star accent */}
              <path
                d="M31 6 L32.4 9.2 L35.8 9.6 L33.2 11.9 L34 15.2 L31 13.5 L28 15.2 L28.8 11.9 L26.2 9.6 L29.6 9.2 Z"
                fill="hsl(160 84% 50%)"
              />
            </svg>
            <span className="text-xl font-bold text-foreground">
              Método<span className="text-primary">Trader</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith('/') && !link.href.startsWith('/#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="outlineGlow" size="default" asChild>
              <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
                CADASTRE-SE
              </a>
            </Button>
            <Button variant="hero" size="default" asChild>
              <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
                NEGOCIE AGORA
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-nav" className="lg:hidden py-4 border-t border-border/30 animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border/30">
                <Button variant="outlineGlow" size="lg" asChild>
                  <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
                    CADASTRE-SE
                  </a>
                </Button>
                <Button variant="hero" size="lg" asChild>
                  <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
                    NEGOCIE AGORA
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
