import { Clock, Shield, Users, Zap, Globe, HeadphonesIcon } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const benefits = [
  {
    icon: Clock,
    title: "Aberto 24 Horas",
    description: "Suporte e negociação a qualquer momento. Os mercados nunca param, e nem nós.",
  },
  {
    icon: Shield,
    title: "Plataforma Confiável",
    description: "Tecnologia de ponta e segurança de dados com criptografia de nível bancário.",
  },
  {
    icon: Users,
    title: "Foco no Usuário",
    description: "Ferramentas intuitivas projetadas para todos os níveis de experiência.",
  },
  {
    icon: Zap,
    title: "Execução Rápida",
    description: "Ordens executadas em milissegundos para você aproveitar cada oportunidade.",
  },
  {
    icon: Globe,
    title: "Alcance Global",
    description: "Presente em mais de 190 países com suporte em múltiplos idiomas.",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte Dedicado",
    description: "Equipe de especialistas pronta para ajudar você 24 horas por dia.",
  },
];

const Benefits = () => {
  return (
    <section id="plataforma" className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-bright/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              VANTAGENS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Por Que Escolher o{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-bright">
                MétodoTrader
              </span>
              ?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A plataforma mais confiável para traders que buscam excelência e resultados consistentes.
            </p>
          </div>
        </ScrollReveal>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.1}>
              <div className="group relative p-8 rounded-2xl glass-card border border-border/30 hover:border-primary/40 transition-all duration-500 h-full">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-bright/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-primary to-cyan-bright scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
