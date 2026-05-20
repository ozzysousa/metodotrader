import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Clock } from "lucide-react";
import TradingChart from "@/components/TradingChart";
import ScrollReveal from "@/components/ScrollReveal";
import heroVideo from "@/assets/hero-video.mp4";

const AFFILIATE_LINK = "https://iqoption.net/land/start-trading/pt/?aff=1616&afftrack=metodotrader&aff_model=revenueafftrack=metodotraderhttps://iqoption.net/land/start-trading/pt/?aff=1616&afftrack=metodotrader&aff_model=revenueaff_model=revenue";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>
      {/* Animated Trading Chart Background */}
      <TradingChart />
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-bright/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "3s" }} />
      
      {/* Decorative Chart Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <path
          d="M0,300 Q150,200 300,280 T600,220 T900,300 T1000,250"
          fill="none"
          stroke="hsl(168 100% 42%)"
          strokeWidth="2"
          className="animate-pulse"
        />
        <path
          d="M0,350 Q200,300 400,320 T700,280 T1000,350"
          fill="none"
          stroke="hsl(199 100% 50%)"
          strokeWidth="1.5"
          opacity="0.5"
        />
      </svg>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Rating Badge */}
          <ScrollReveal delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-border/50 mb-8">
              <div className="flex text-primary">
                {"★★★☆☆".split("").map((_, i) => (
                  <span key={i} className={i < 3 ? "text-primary" : "text-muted-foreground"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-muted-foreground text-sm">3,0 (2 avaliações)</span>
            </div>
          </ScrollReveal>

          {/* Main Headline */}
          <ScrollReveal delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 px-2">
              Domine o Mercado:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-bright glow-text">
                Negocie Opções Binárias
              </span>{" "}
              e Criptomoedas com Confiança
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Plataforma de trading segura, 24 horas por dia, com tecnologia de ponta para os maiores ativos, incluindo{" "}
              <span className="text-primary font-semibold">Bitcoin</span> e{" "}
              <span className="text-primary font-semibold">Ethereum</span> (Moeda D).
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button variant="hero" size="xl" asChild>
                <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
                  COMECE A INVESTIR AGORA
                </a>
              </Button>
              <Button variant="outlineGlow" size="xl" asChild>
                <a href="#ativos">
                  CONHECER ATIVOS
                </a>
              </Button>
            </div>
          </ScrollReveal>

          {/* Feature Pills */}
          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">24/7 Trading</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Plataforma Segura</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">+140% Bitcoin</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
