import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const PoliticaDePrivacidade = () => {
  useEffect(() => {
    document.title = "Política de Privacidade - Método Trader";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Política de Privacidade
            </h1>
            <p className="text-muted-foreground mb-8">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introdução</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                O Método Trader está comprometido com a proteção da sua privacidade. Esta Política de Privacidade 
                explica como coletamos, utilizamos, armazenamos e protegemos suas informações pessoais, em conformidade 
                com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Dados Coletados</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Podemos coletar os seguintes tipos de informações:
              </p>
              <h3 className="text-xl font-semibold text-foreground mb-3">2.1 Dados fornecidos diretamente por você:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Informações de contato (quando fornecidas voluntariamente)</li>
              </ul>
              <h3 className="text-xl font-semibold text-foreground mb-3">2.2 Dados coletados automaticamente:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Endereço IP</li>
                <li>Tipo de navegador e dispositivo</li>
                <li>Páginas visitadas e tempo de navegação</li>
                <li>Dados de cookies (consulte nossa Política de Cookies)</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Finalidade do Tratamento</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Utilizamos seus dados pessoais para:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Enviar newsletters e conteúdos educacionais sobre trading</li>
                <li>Personalizar sua experiência de navegação</li>
                <li>Analisar o desempenho do site e melhorar nossos serviços</li>
                <li>Cumprir obrigações legais e regulatórias</li>
                <li>Direcionar para plataformas parceiras de trading (links de afiliados)</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Base Legal para o Tratamento</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                O tratamento de seus dados pessoais é realizado com base nas seguintes hipóteses legais previstas na LGPD:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Consentimento:</strong> para envio de comunicações de marketing</li>
                <li><strong>Execução de contrato:</strong> para prestação dos serviços solicitados</li>
                <li><strong>Legítimo interesse:</strong> para melhoria de nossos produtos e serviços</li>
                <li><strong>Cumprimento de obrigação legal:</strong> quando exigido por lei</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Compartilhamento de Dados</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Seus dados pessoais podem ser compartilhados com:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Plataformas parceiras de trading (IQ Option) para fins de cadastro via links de afiliados</li>
                <li>Ferramentas de análise (Google Analytics) para melhoria do site</li>
                <li>Autoridades competentes, quando exigido por lei</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Não vendemos, alugamos ou negociamos suas informações pessoais com terceiros para fins comerciais não relacionados aos nossos serviços.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Armazenamento e Segurança</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais, incluindo:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Criptografia de dados em trânsito (SSL/TLS)</li>
                <li>Controle de acesso restrito às informações</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares e seguros</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Seus dados são armazenados pelo tempo necessário para cumprir as finalidades descritas nesta política 
                ou conforme exigido por lei.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Seus Direitos (LGPD)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Como titular dos dados, você possui os seguintes direitos:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Confirmar a existência de tratamento de dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
                <li>Solicitar a portabilidade dos dados</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.45}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Contato</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, 
                entre em contato conosco através do e-mail disponibilizado em nosso site.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Alterações nesta Política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você a revise 
                regularmente para estar ciente de quaisquer mudanças. A continuidade do uso do site após alterações 
                constitui aceitação das novas condições.
              </p>
            </section>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaDePrivacidade;
