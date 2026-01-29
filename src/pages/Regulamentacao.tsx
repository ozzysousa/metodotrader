import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const Regulamentacao = () => {
  useEffect(() => {
    document.title = "Regulamentação - Método Trader";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Regulamentação e Disclaimer
            </h1>
            <p className="text-muted-foreground mb-8">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Natureza Educacional do Conteúdo</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                O Método Trader é uma plataforma de conteúdo educacional focada em trading e investimentos. 
                Todo o material disponibilizado em nosso site, incluindo artigos, vídeos, análises e tutoriais, 
                possui caráter exclusivamente informativo e educacional.
              </p>
              <div className="p-6 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                <p className="text-foreground font-semibold mb-2">Importante:</p>
                <p className="text-muted-foreground leading-relaxed">
                  O conteúdo do Método Trader <strong>NÃO constitui</strong> recomendação de compra, venda ou 
                  manutenção de qualquer ativo financeiro, incluindo opções binárias, criptomoedas, ações, 
                  moedas ou qualquer outro instrumento de investimento.
                </p>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Aviso de Risco</h2>
              <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/30 mb-4">
                <p className="text-muted-foreground leading-relaxed">
                  A negociação de opções binárias, criptomoedas e outros instrumentos derivativos envolve 
                  riscos substanciais de perda e não é adequada para todos os investidores. Os preços dos 
                  ativos são altamente voláteis e podem ser afetados por fatores externos como eventos 
                  financeiros, regulatórios ou políticos.
                </p>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Você pode perder parte ou a totalidade do seu capital investido</li>
                <li>Rendimentos passados não garantem resultados futuros</li>
                <li>Não invista dinheiro que você não pode perder</li>
                <li>Considere cuidadosamente seus objetivos de investimento e nível de experiência</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Não Somos Consultores Financeiros</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                O Método Trader e seus criadores:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Não são instituições financeiras autorizadas</li>
                <li>Não possuem licença para atuar como consultores ou analistas de valores mobiliários</li>
                <li>Não fornecem assessoria de investimentos personalizada</li>
                <li>Não gerenciam carteiras de terceiros</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Antes de tomar qualquer decisão de investimento, recomendamos fortemente que você consulte 
                um profissional financeiro qualificado e devidamente registrado nos órgãos competentes.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Sobre a IQ Option</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A IQ Option é uma plataforma de negociação online operada pela IQ Option Ltd, registrada em 
                São Vicente e Granadinas. A plataforma é regulamentada pela Cyprus Securities and Exchange 
                Commission (CySEC) para operações na Europa.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                O Método Trader atua como <strong>afiliado independente</strong> da IQ Option, recebendo 
                comissões por novos usuários que se cadastram através de nossos links. Essa relação de 
                afiliação não implica em qualquer vínculo empregatício, societário ou de responsabilidade 
                conjunta.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Para informações sobre regulamentação, licenças e termos de uso da plataforma IQ Option, 
                consulte diretamente o site oficial da corretora.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Legislação Brasileira</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                No Brasil, as operações com opções binárias não são regulamentadas pela Comissão de Valores 
                Mobiliários (CVM) nem pelo Banco Central do Brasil. Isso significa que:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Não há supervisão de órgãos reguladores brasileiros sobre essas operações</li>
                <li>Os investidores não contam com proteções legais específicas no Brasil</li>
                <li>É responsabilidade exclusiva do investidor avaliar os riscos envolvidos</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Responsabilidade do Usuário</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ao utilizar o conteúdo do Método Trader, você reconhece e concorda que:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Todas as decisões de investimento são tomadas por você de forma independente</li>
                <li>Você é o único responsável por suas operações e resultados financeiros</li>
                <li>Você verificou a legalidade das operações em sua jurisdição</li>
                <li>Você possui idade legal para realizar operações financeiras</li>
                <li>O Método Trader não será responsabilizado por perdas financeiras</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Isenção de Responsabilidade</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                O Método Trader, seus administradores, colaboradores e afiliados:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Não garantem a precisão, completude ou atualidade das informações publicadas</li>
                <li>Não se responsabilizam por erros, omissões ou interpretações do conteúdo</li>
                <li>Não garantem qualquer resultado financeiro específico</li>
                <li>Não se responsabilizam por decisões tomadas com base no conteúdo do site</li>
                <li>Reservam-se o direito de modificar ou remover conteúdo sem aviso prévio</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.45}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Contato</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para dúvidas sobre este documento ou qualquer aspecto legal do Método Trader, 
                entre em contato através do e-mail disponibilizado em nosso site.
              </p>
            </section>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Regulamentacao;
