import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/ScrollReveal";

const faqs = [
  {
    question: "O que são opções binárias?",
    answer: "Opções binárias são instrumentos financeiros que permitem especular sobre a direção do preço de um ativo. Você prevê se o preço vai subir ou descer em um período determinado. Se sua previsão estiver correta, você recebe um retorno fixo."
  },
  {
    question: "Qual o depósito mínimo para começar?",
    answer: "O depósito mínimo na IQ Option é de apenas R$ 60 (ou equivalente em dólar). Isso permite que iniciantes comecem com um investimento baixo enquanto aprendem sobre o mercado."
  },
  {
    question: "É seguro negociar criptomoedas na plataforma?",
    answer: "Sim, a IQ Option utiliza criptografia de nível bancário e autenticação de dois fatores para proteger sua conta e seus fundos. Além disso, mantemos os fundos dos clientes em contas segregadas."
  },
  {
    question: "Posso negociar 24 horas por dia?",
    answer: "Sim! O mercado de criptomoedas opera 24/7, permitindo que você negocie Bitcoin, Ethereum e outras moedas a qualquer hora do dia ou da noite. Para outros ativos, os horários variam conforme o mercado."
  },
  {
    question: "Como funciona a conta demo?",
    answer: "A conta demo oferece R$ 10.000 em dinheiro virtual para você praticar sem riscos. É uma ótima forma de aprender a usar a plataforma e testar estratégias antes de investir dinheiro real."
  },
  {
    question: "Quais métodos de pagamento são aceitos?",
    answer: "Aceitamos diversas formas de pagamento incluindo PIX, cartões de crédito/débito, boleto bancário, transferência bancária e carteiras digitais como Skrill e Neteller."
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-medium/10 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              PERGUNTAS FREQUENTES
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Tire Suas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-bright">
                Dúvidas
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Encontre respostas para as perguntas mais comuns sobre nossa plataforma.
            </p>
          </div>
        </ScrollReveal>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
              <div
                className={cn(
                  "glass-card rounded-xl border transition-all duration-300",
                  openIndex === index 
                    ? "border-primary/50 shadow-[0_0_30px_hsl(168_100%_42%/0.1)]" 
                    : "border-border/30 hover:border-border/60"
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openIndex === index ? "max-h-96" : "max-h-0"
                  )}
                >
                  <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
