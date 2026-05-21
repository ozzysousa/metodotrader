import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { setPageSEO } from "@/lib/seo";

const Cookies = () => {
  useEffect(() => {
    setPageSEO({
      title: "Política de Cookies | MétodoTrader",
      description: "Saiba como o MétodoTrader utiliza cookies essenciais, de desempenho e de afiliados, e como você pode gerenciar suas preferências em conformidade com a LGPD.",
      path: "/cookies",
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
              Política de Cookies
            </h1>
            <p className="text-muted-foreground mb-8">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. O que são Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, tablet ou smartphone) 
                quando você visita um site. Eles permitem que o site reconheça seu dispositivo e lembre-se de suas 
                preferências, melhorando sua experiência de navegação.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Tipos de Cookies que Utilizamos</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">2.1 Cookies Essenciais</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                São necessários para o funcionamento básico do site. Sem eles, algumas funcionalidades não estariam 
                disponíveis. Esses cookies não coletam informações pessoais identificáveis.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">2.2 Cookies de Desempenho</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Coletam informações sobre como os visitantes usam o site, como páginas mais visitadas e mensagens 
                de erro. Esses dados são utilizados para melhorar o desempenho do site.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">2.3 Cookies de Funcionalidade</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permitem que o site lembre-se de escolhas que você fez, como preferência de idioma ou tema 
                (claro/escuro), proporcionando uma experiência mais personalizada.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">2.4 Cookies de Marketing e Afiliados</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                São utilizados para rastrear visitantes em sites e exibir anúncios relevantes. Também permitem 
                identificar que você chegou à plataforma parceira (IQ Option) através do Método Trader, 
                garantindo o funcionamento correto do programa de afiliados.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Cookies de Terceiros</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Utilizamos cookies de terceiros para diversas finalidades:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-muted-foreground border border-border/50 rounded-lg">
                  <thead className="bg-card">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Provedor</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Finalidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border/50">
                      <td className="px-4 py-3">Google Analytics</td>
                      <td className="px-4 py-3">Análise de tráfego e comportamento do usuário</td>
                    </tr>
                    <tr className="border-t border-border/50">
                      <td className="px-4 py-3">IQ Option</td>
                      <td className="px-4 py-3">Rastreamento de conversões do programa de afiliados</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Como Gerenciar Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Você pode controlar e gerenciar cookies de diversas formas:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                <li>
                  <strong>Configurações do navegador:</strong> A maioria dos navegadores permite que você 
                  recuse ou aceite cookies, exclua cookies existentes e defina preferências para sites específicos.
                </li>
                <li>
                  <strong>Ferramentas de terceiros:</strong> Você pode optar por não participar do rastreamento 
                  do Google Analytics visitando o site de opt-out do Google.
                </li>
              </ul>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-muted-foreground">
                  <strong>Atenção:</strong> Desabilitar cookies pode afetar a funcionalidade do site e sua 
                  experiência de navegação. Alguns recursos podem não funcionar corretamente.
                </p>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Instruções por Navegador</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Veja como gerenciar cookies nos navegadores mais populares:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Google Chrome:</strong> Configurações → Privacidade e segurança → Cookies</li>
                <li><strong>Mozilla Firefox:</strong> Configurações → Privacidade e Segurança → Cookies</li>
                <li><strong>Safari:</strong> Preferências → Privacidade → Gerenciar dados de sites</li>
                <li><strong>Microsoft Edge:</strong> Configurações → Cookies e permissões do site</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Atualizações desta Política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esta Política de Cookies pode ser atualizada periodicamente para refletir mudanças em nossas 
                práticas ou por outros motivos operacionais, legais ou regulatórios. Recomendamos que você 
                revise esta página regularmente para estar informado sobre como utilizamos cookies.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Contato</h2>
              <p className="text-muted-foreground leading-relaxed">
                Se tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco através do 
                e-mail disponibilizado em nosso site.
              </p>
            </section>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
