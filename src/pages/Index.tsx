import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Assets from "@/components/Assets";
import Benefits from "@/components/Benefits";
import RecentArticles from "@/components/RecentArticles";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import SignupForm from "@/components/SignupForm";
import Footer from "@/components/Footer";
import BlogCTA from "@/components/blog/BlogCTA";
import AdSlot from "@/components/AdSlot";
import { setPageSEO, setJsonLd, removeJsonLd } from "@/lib/seo";

const Index = () => {
  useEffect(() => {
    setPageSEO({
      title: "Método Trader 2026 | Estratégias e Análise de Mercado",
      description: "Domine o mercado com o Método Trader 2026. Estratégias validadas para Opções Binárias e Criptomoedas, com análise de dados e segurança.",
      path: "/",
      ogType: "website",
    });
    setJsonLd("faq-jsonld", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "O que são opções binárias?", acceptedAnswer: { "@type": "Answer", text: "Opções binárias são instrumentos financeiros que permitem especular sobre a direção do preço de um ativo. Você prevê se o preço vai subir ou descer em um período determinado. Se sua previsão estiver correta, você recebe um retorno fixo." } },
        { "@type": "Question", name: "Qual o depósito mínimo para começar?", acceptedAnswer: { "@type": "Answer", text: "O depósito mínimo na IQ Option é de apenas R$ 60 (ou equivalente em dólar). Isso permite que iniciantes comecem com um investimento baixo enquanto aprendem sobre o mercado." } },
        { "@type": "Question", name: "É seguro negociar criptomoedas na plataforma?", acceptedAnswer: { "@type": "Answer", text: "Sim, a IQ Option utiliza criptografia de nível bancário e autenticação de dois fatores para proteger sua conta e seus fundos. Além disso, mantemos os fundos dos clientes em contas segregadas." } },
        { "@type": "Question", name: "Posso negociar 24 horas por dia?", acceptedAnswer: { "@type": "Answer", text: "Sim! O mercado de criptomoedas opera 24/7, permitindo que você negocie Bitcoin, Ethereum e outras moedas a qualquer hora do dia ou da noite. Para outros ativos, os horários variam conforme o mercado." } },
        { "@type": "Question", name: "Como funciona a conta demo?", acceptedAnswer: { "@type": "Answer", text: "A conta demo oferece R$ 10.000 em dinheiro virtual para você praticar sem riscos. É uma ótima forma de aprender a usar a plataforma e testar estratégias antes de investir dinheiro real." } },
        { "@type": "Question", name: "Quais métodos de pagamento são aceitos?", acceptedAnswer: { "@type": "Answer", text: "Aceitamos diversas formas de pagamento incluindo PIX, cartões de crédito/débito, boleto bancário, transferência bancária e carteiras digitais como Skrill e Neteller." } },
      ],
    });
    return () => removeJsonLd("faq-jsonld");
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <AdSlot slotId="homeHeader" placement="header" />
        <Assets />
        <Benefits />
        <AdSlot slotId="homeMid" placement="inline" />
        <RecentArticles />
        <Testimonials />
        <div className="container mx-auto px-4 lg:px-8">
          <BlogCTA />
        </div>
        <FAQ />
        <div className="container mx-auto px-4 lg:px-8">
          <BlogCTA />
        </div>
        <AdSlot slotId="homeFooter" placement="footer" />
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
