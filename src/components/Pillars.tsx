import { Zap, ShieldCheck, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: Zap,
    title: "Cadastro Rápido",
    description:
      "Sua conta oficial de operações pronta e configurada em menos de 2 minutos para começar a treinar sem burocracia ou taxas ocultas.",
  },
  {
    icon: ShieldCheck,
    title: "Treine Sem Riscos",
    description:
      "Ganhe uma conta demo com saldo virtual recarregável totalmente grátis para testar o método com segurança antes de investir de verdade.",
  },
  {
    icon: TrendingUp,
    title: "Gerenciamento Blindado",
    description:
      "Foco inabalável na proteção do capital. Aprenda a utilizar o gerenciamento matemático a seu favor para estabilizar a sua banca.",
  },
];

const Pillars = () => {
  return (
    <section aria-label="Por que começar com o Método Trader" className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-card border border-border rounded-2xl p-8 space-y-4 hover:border-primary/50 transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Icon className="w-7 h-7" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pillars;
