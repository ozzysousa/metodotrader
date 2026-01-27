import { MapPin, Phone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const AFFILIATE_LINK = "https://iqoption.net/lp/lite-form/pt/?aff=1616&afftrack=Landsite.Ai&aff_model=revenue";

const Footer = () => {
  return (
    <footer id="contato" className="relative pt-24 pb-8 border-t border-border/30">
      {/* Risk Warning */}
      <div className="container mx-auto px-4 lg:px-8 mb-16">
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

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <ScrollReveal delay={0}>
            <div className="lg:col-span-1">
              <a href="#inicio" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-bright flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">MT</span>
                </div>
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
                {["Início", "Plataforma", "Ativos", "Suporte"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Legal */}
          <ScrollReveal delay={0.2}>
            <div>
              <h4 className="font-semibold text-foreground mb-6">Legal</h4>
              <ul className="space-y-3">
                {["Termos de Uso", "Política de Privacidade", "Cookies", "Regulamentação"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal delay={0.3}>
            <div id="suporte">
              <h4 className="font-semibold text-foreground mb-6">Contato</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">
                    St. Sudoeste CCSW 1 Lote 04 Bloco C - Sudoeste/Octogonal, Brasília - DF, 70297-400
                    <br />
                    <span className="text-muted-foreground/70">(Condomínio Portal Master, Bloco C)</span>
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <a
                    href="tel:+5561996662833"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    (61) 99666-2833
                  </a>
                </li>
              </ul>
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
              <span className="text-xs text-muted-foreground/60">
                Investimentos envolvem riscos. Negocie com responsabilidade.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
