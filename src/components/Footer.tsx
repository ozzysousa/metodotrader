import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

const AFFILIATE_LINK = "https://iqoption.net/land/start-trading/pt/?aff=1616&afftrack=metodotrader&aff_model=revenue";

const Footer = () => {
  return (
    <footer className="relative pt-24 pb-8 border-t border-border/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <ScrollReveal delay={0}>
            <div className="lg:col-span-1">
              <a href="/#inicio" className="flex items-center gap-2 mb-6">
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
                    <linearGradient id="mt-grad-footer" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="hsl(160 84% 45%)" />
                      <stop offset="100%" stopColor="hsl(190 95% 55%)" />
                    </linearGradient>
                  </defs>
                  <rect x="6" y="24" width="5" height="10" rx="1" fill="url(#mt-grad-footer)" opacity="0.7" />
                  <rect x="13" y="18" width="5" height="16" rx="1" fill="url(#mt-grad-footer)" opacity="0.85" />
                  <rect x="20" y="12" width="5" height="22" rx="1" fill="url(#mt-grad-footer)" />
                  <path
                    d="M5 22 L12 16 L19 11 L27 5"
                    stroke="hsl(190 95% 55%)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M31 6 L32.4 9.2 L35.8 9.6 L33.2 11.9 L34 15.2 L31 13.5 L28 15.2 L28.8 11.9 L26.2 9.6 L29.6 9.2 Z"
                    fill="hsl(160 84% 50%)"
                  />
                </svg>
                <span className="text-xl font-bold text-foreground">
                  Método<span className="text-primary">Trader</span>
                </span>
              </a>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Sua plataforma de referência para trading de opções binárias e criptomoedas. Negocie com confiança.
              </p>
              <Button variant="hero" size="default" asChild>
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
                  ABRIR CONTA
                </a>
              </Button>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal delay={0.1}>
            <div>
              <h4 className="font-semibold text-foreground mb-6">Navegação</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/#inicio" className="text-muted-foreground hover:text-primary transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="/#plataforma" className="text-muted-foreground hover:text-primary transition-colors">
                    Plataforma
                  </a>
                </li>
                <li>
                  <a href="/#ativos" className="text-muted-foreground hover:text-primary transition-colors">
                    Ativos
                  </a>
                </li>
                <li>
                  <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Legal */}
          <ScrollReveal delay={0.2}>
            <div>
              <h4 className="font-semibold text-foreground mb-6">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/termos-de-uso" className="text-muted-foreground hover:text-primary transition-colors">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link to="/politica-de-privacidade" className="text-muted-foreground hover:text-primary transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link to="/regulamentacao" className="text-muted-foreground hover:text-primary transition-colors">
                    Regulamentação
                  </Link>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* App Download */}
          <ScrollReveal delay={0.3}>
            <div>
              <h4 className="font-semibold text-foreground mb-6">Baixe o App</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Negocie de qualquer lugar com o aplicativo oficial da IQ Option.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-transform hover:scale-105"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Disponível no Google Play"
                    width={162}
                    height={48}
                    className="h-12 w-auto"
                  />
                </a>
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-transform hover:scale-105"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Baixar na App Store"
                    width={162}
                    height={48}
                    className="h-12 w-auto"
                  />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} MétodoTrader. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-muted-foreground">
                Investimentos envolvem riscos. Negocie com responsabilidade.
              </span>
            </div>
          </div>
        </div>

        {/* Risk Warning - Bottom */}
        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/30">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Aviso de Risco</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>O seu capital pode estar em risco.</strong> Opções binárias envolvem alto risco financeiro.
                  A negociação de opções binárias e criptomoedas pode não ser adequada para todos os investidores.
                  Você pode perder parte ou todo o seu capital investido. Antes de decidir negociar, considere cuidadosamente seus objetivos de investimento,
                  nível de experiência e tolerância ao risco. A IQ Option não fornece aconselhamento financeiro. Negocie com responsabilidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
