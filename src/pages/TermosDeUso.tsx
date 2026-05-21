import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { setPageSEO } from "@/lib/seo";

const TermosDeUso = () => {
  useEffect(() => {
    setPageSEO({
      title: "Termos de Uso | MétodoTrader",
      description: "Conheça os Termos de Uso do MétodoTrader: regras de utilização do conteúdo educacional, aviso de risco e responsabilidades do usuário.",
      path: "/termos-de-uso",
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Termos de Uso
            </h1>
            <p className="text-muted-foreground mb-8">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Aceitação dos Termos</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ao acessar e utilizar o site Método Trader, você declara estar de acordo com estes Termos de Uso. 
                Caso não concorde com qualquer disposição aqui apresentada, solicitamos que não utilize nossos serviços.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Natureza do Conteúdo</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Todo o conteúdo disponibilizado no Método Trader possui caráter exclusivamente educacional e informativo. 
                Nossos materiais incluem:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Artigos e tutoriais sobre estratégias de trading</li>
                <li>Análises de mercado e indicadores técnicos</li>
                <li>Guias sobre gestão de risco e psicologia do trader</li>
                <li>Informações sobre plataformas de negociação</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Aviso de Risco</h2>
              <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/30 mb-4">
                <p className="text-foreground font-semibold mb-2">Importante:</p>
                <p className="text-muted-foreground leading-relaxed">
                  A negociação de opções binárias, criptomoedas e outros instrumentos financeiros envolve riscos significativos 
                  e pode não ser adequada para todos os investidores. Você pode perder parte ou todo o capital investido. 
                  Antes de iniciar qualquer operação, avalie cuidadosamente seus objetivos financeiros, nível de experiência 
                  e tolerância ao risco.
                </p>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Responsabilidades do Usuário</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ao utilizar nosso site, você se compromete a:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Tomar decisões de investimento de forma independente e consciente</li>
                <li>Não considerar nosso conteúdo como recomendação de investimento</li>
                <li>Consultar profissionais qualificados antes de realizar operações financeiras</li>
                <li>Utilizar o site de maneira ética e em conformidade com a legislação vigente</li>
                <li>Não reproduzir ou distribuir nosso conteúdo sem autorização prévia</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Propriedade Intelectual</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Todo o conteúdo presente no Método Trader, incluindo textos, gráficos, logotipos, imagens, vídeos, 
                código-fonte e demais materiais, é de propriedade exclusiva do Método Trader ou de seus licenciadores, 
                sendo protegido pelas leis brasileiras de propriedade intelectual e direitos autorais.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                É expressamente proibida a reprodução, distribuição, modificação ou utilização comercial de qualquer 
                material deste site sem autorização prévia e por escrito.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitação de Responsabilidade</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                O Método Trader não se responsabiliza por:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Perdas financeiras decorrentes de decisões de investimento</li>
                <li>Erros, omissões ou imprecisões no conteúdo publicado</li>
                <li>Interrupções ou falhas técnicas no acesso ao site</li>
                <li>Conteúdo de sites de terceiros acessados através de links</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Modificações dos Termos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento, sem aviso prévio. 
                Recomendamos que você revise esta página periodicamente para estar ciente de eventuais alterações. 
                O uso continuado do site após modificações constitui aceitação dos novos termos.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.45}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Lei Aplicável</h2>
              <p className="text-muted-foreground leading-relaxed">
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. 
                Qualquer disputa relacionada a estes termos será submetida ao foro da comarca de Brasília, 
                Distrito Federal, com exclusão de qualquer outro.
              </p>
            </section>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermosDeUso;
