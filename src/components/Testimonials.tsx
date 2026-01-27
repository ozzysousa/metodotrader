import { Star, Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Trader há 3 anos",
    avatar: "CS",
    rating: 5,
    text: "A IQ Option transformou minha forma de investir. A plataforma é intuitiva e o suporte é excelente. Já recuperei meu investimento inicial várias vezes."
  },
  {
    name: "Ana Beatriz",
    role: "Investidora iniciante",
    avatar: "AB",
    rating: 5,
    text: "Comecei sem saber nada sobre trading e a conta demo me ajudou muito. Hoje consigo fazer operações com confiança. Recomendo para quem está começando!"
  },
  {
    name: "Roberto Mendes",
    role: "Day Trader",
    avatar: "RM",
    rating: 4,
    text: "Uso a plataforma diariamente para operar criptomoedas. A execução das ordens é rápida e os gráficos são muito completos. Ótima experiência geral."
  },
  {
    name: "Juliana Costa",
    role: "Investidora de cripto",
    avatar: "JC",
    rating: 5,
    text: "Finalmente encontrei uma plataforma confiável para investir em Bitcoin. Os depósitos via PIX caem na hora e os saques são processados rapidamente."
  },
  {
    name: "Fernando Oliveira",
    role: "Trader profissional",
    avatar: "FO",
    rating: 5,
    text: "Depois de testar várias plataformas, a IQ Option se destaca pela qualidade. As ferramentas de análise técnica são profissionais e precisas."
  },
  {
    name: "Mariana Santos",
    role: "Entusiasta de Ethereum",
    avatar: "MS",
    rating: 4,
    text: "Amo poder negociar ETH a qualquer hora do dia. A interface mobile é perfeita para acompanhar o mercado em movimento."
  },
];

const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-bright/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              DEPOIMENTOS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              O Que Nossos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-bright">
                Clientes Dizem
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Milhares de traders confiam no MétodoTrader para suas operações diárias.
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="group relative glass-card rounded-2xl p-6 border border-border/30 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_hsl(168_100%_42%/0.15)] hover:-translate-y-1 h-full">
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />

                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-cyan-bright flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div className="absolute -inset-1 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Info */}
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating 
                          ? "text-primary fill-primary" 
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
