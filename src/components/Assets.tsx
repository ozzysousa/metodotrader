import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const AFFILIATE_LINK = "https://iqoption.net/land/start-trading/pt/?aff=1616&afftrack=metodotrader&aff_model=revenueafftrack=metodotraderhttps://iqoption.net/land/start-trading/pt/?aff=1616&afftrack=metodotrader&aff_model=revenueaff_model=revenue";

const assets = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    description: "A maior criptomoeda do mundo. Negocie a valorização de mais de 140% no último ciclo.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-12 h-12">
        <circle cx="16" cy="16" r="16" fill="#F7931A"/>
        <path d="M22.5 14.1c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.6-.4-.7 2.6c-.4-.1-.8-.2-1.3-.3l.7-2.7-1.6-.4-.7 2.7c-.4-.1-.7-.2-1.1-.3v-.1l-2.2-.5-.4 1.7s1.2.3 1.2.3c.6.2.8.6.7 1l-.7 3c0 0 .1 0 .2.1h-.2l-1 4.2c-.1.2-.3.5-.8.4 0 0-1.2-.3-1.2-.3l-.8 1.8 2.1.5c.4.1.8.2 1.2.3l-.7 2.8 1.6.4.7-2.7c.4.1.9.2 1.3.3l-.7 2.7 1.6.4.7-2.8c2.9.5 5 .3 5.9-2.3.7-2.1 0-3.3-1.5-4.1 1.1-.2 1.9-1 2.1-2.5zm-3.8 5.3c-.5 2-3.9.9-5 .7l.9-3.6c1.1.3 4.6.8 4.1 2.9zm.5-5.4c-.5 1.9-3.3.9-4.2.7l.8-3.2c.9.2 3.9.7 3.4 2.5z" fill="#fff"/>
      </svg>
    ),
    change: "+140%",
    changeColor: "text-neon-green",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    description: "Moeda D (ETH). A segunda cadeia mais segura, logo após a Bitcoin. Opção sólida para iniciantes e Altcoins.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-12 h-12">
        <circle cx="16" cy="16" r="16" fill="#627EEA"/>
        <path d="M16.498 4v8.87l7.497 3.35L16.498 4z" fill="#fff" fillOpacity=".602"/>
        <path d="M16.498 4L9 16.22l7.498-3.35V4z" fill="#fff"/>
        <path d="M16.498 21.968v6.027L24 17.616l-7.502 4.352z" fill="#fff" fillOpacity=".602"/>
        <path d="M16.498 27.995v-6.028L9 17.616l7.498 10.379z" fill="#fff"/>
        <path d="M16.498 20.573l7.497-4.353-7.497-3.348v7.701z" fill="#fff" fillOpacity=".2"/>
        <path d="M9 16.22l7.498 4.353v-7.701L9 16.22z" fill="#fff" fillOpacity=".602"/>
      </svg>
    ),
    change: "+85%",
    changeColor: "text-primary",
  },
];

const Assets = () => {
  return (
    <section id="ativos" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-medium/20 to-background" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              ATIVOS DISPONÍVEIS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Negocie os{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-bright">
                Maiores Ativos
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Acesse Bitcoin, Ethereum e muito mais com spreads competitivos e execução instantânea.
            </p>
          </div>
        </ScrollReveal>

        {/* Assets Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {assets.map((asset, index) => (
            <ScrollReveal key={asset.symbol} delay={index * 0.15} direction={index === 0 ? "left" : "right"}>
              <div className="group relative glass-card rounded-2xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(168_100%_42%/0.2)]">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {asset.icon}
                        <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{asset.name}</h3>
                        <span className="text-muted-foreground">{asset.symbol}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full bg-primary/10 ${asset.changeColor} font-semibold text-sm`}>
                      {asset.change}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {asset.description}
                  </p>

                  {/* CTA */}
                  <Button variant="outlineGlow" className="w-full" asChild>
                    <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
                      NEGOCIAR {asset.symbol}
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Volume 24h", value: "$2.5B+" },
            { label: "Usuários Ativos", value: "48M+" },
            { label: "Países", value: "190+" },
            { label: "Ativos", value: "250+" },
          ].map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="text-center p-6 glass-card rounded-xl border border-border/30">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Assets;
