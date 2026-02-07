import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const AFFILIATE_LINK = "https://iqoption.net/lp/start/en/?aff=1616&afftrack=metodotrader&aff_model=revenue";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Início", href: "/#inicio" },
    { label: "Plataforma", href: "/#plataforma" },
    { label: "Ativos", href: "/#ativos" },
    { label: "Blog", href: "/blog" },
    { label: "Depoimentos", href: "/#depoimentos" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2">
            <img src={logo} alt="MétodoTrader Logo" className="w-10 h-10 object-contain" />
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
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/30 animate-fade-in">
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
