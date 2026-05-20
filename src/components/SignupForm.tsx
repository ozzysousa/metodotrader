import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, ShieldCheck, Zap, Gift } from "lucide-react";

const AFFILIATE_LINK = "https://iqoption.net/land/start-trading/pt/?aff=1616&afftrack=metodotrader&aff_model=revenue";

const SignupForm = () => {
  const benefits = [
    "Conta demo com R$ 10.000 grátis",
    "Depósito mínimo de apenas R$ 60",
    "Suporte 24 horas em português",
    "Mais de 500 ativos disponíveis",
  ];

  return (
    <section id="cadastro" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-medium/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-w-0">
            {/* Left Content */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                COMECE AGORA
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 break-words">
                Abra Sua Conta{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-bright">
                  Gratuitamente
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Junte-se a mais de 48 milhões de traders que confiam na IQ Option para suas operações.
              </p>

              {/* Benefits */}
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-10 border border-border/50 shadow-[0_0_60px_hsl(168_100%_42%/0.15)] min-w-0 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-cyan-bright flex items-center justify-center mb-6">
                <Gift className="w-8 h-8 text-background" />
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3">
                Acesso Imediato à Plataforma
              </h3>
              <p className="text-muted-foreground mb-8">
                Cadastro rápido em menos de 1 minuto. Comece com a conta demo e treine sem riscos.
              </p>

              <Button variant="hero" size="xl" className="w-full mb-4" asChild>
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                    <span className="hidden sm:inline">Abrir Conta Grátis na IQ Option</span>
                    <span className="sm:hidden">Abrir Conta Grátis</span>
                    <ArrowRight className="w-5 h-5 flex-shrink-0" />
                  </span>
                </a>
              </Button>

              <div className="grid grid-cols-2 gap-3 mt-6 text-xs">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-primary" /> 100% Seguro
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Zap className="w-4 h-4 text-primary" /> Cadastro em 1 min
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-6">
                Ao continuar, você concorda com nossos{" "}
                <a href="/termos-de-uso" className="text-primary hover:underline">
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a href="/politica-de-privacidade" className="text-primary hover:underline">
                  Política de Privacidade
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
