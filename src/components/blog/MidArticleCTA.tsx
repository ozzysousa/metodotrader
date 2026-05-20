import { ArrowRight, Gift, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AFFILIATE_LINK } from "@/data/blogPosts";

// Animated GIFs (Giphy direct) mapped by topic category
const GIF_BY_CATEGORY: Record<string, { url: string; alt: string }> = {
  "Análise Técnica": {
    url: "https://media.giphy.com/media/l0HlGRDhBjFhfWvgI/giphy.gif",
    alt: "Gráfico de análise técnica em movimento",
  },
  "Análise": {
    url: "https://media.giphy.com/media/l0HlGRDhBjFhfWvgI/giphy.gif",
    alt: "Gráfico financeiro em movimento",
  },
  "Avançado": {
    url: "https://media.giphy.com/media/3o7TKuHzpf3hQ4ZK8E/giphy.gif",
    alt: "Trader profissional analisando o mercado",
  },
  "Educacional": {
    url: "https://media.giphy.com/media/26gsspfbuFTV3rgFW/giphy.gif",
    alt: "Aprendendo trading",
  },
  "Estratégias": {
    url: "https://media.giphy.com/media/3o7TKuHzpf3hQ4ZK8E/giphy.gif",
    alt: "Estratégia de trading em ação",
  },
  "Gerenciamento": {
    url: "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif",
    alt: "Gerenciamento de capital",
  },
  "Gestão de Risco": {
    url: "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif",
    alt: "Gestão de risco financeiro",
  },
  "Iniciantes": {
    url: "https://media.giphy.com/media/JtBZm3Getg3dqxK0zP/giphy.gif",
    alt: "Primeiros passos no trading",
  },
  "Mindset": {
    url: "https://media.giphy.com/media/26gsspfbuFTV3rgFW/giphy.gif",
    alt: "Mentalidade vencedora",
  },
  "Plataforma": {
    url: "https://media.giphy.com/media/3o7TKuHzpf3hQ4ZK8E/giphy.gif",
    alt: "Plataforma de trading",
  },
  "Psicologia": {
    url: "https://media.giphy.com/media/26gsspfbuFTV3rgFW/giphy.gif",
    alt: "Psicologia do trader",
  },
};

const DEFAULT_GIF = {
  url: "https://media.giphy.com/media/l0HlGRDhBjFhfWvgI/giphy.gif",
  alt: "Mercado financeiro em movimento",
};

interface MidArticleCTAProps {
  category?: string;
  variant?: "mid" | "final";
}

const MidArticleCTA = ({ category, variant = "mid" }: MidArticleCTAProps) => {
  const gif = (category && GIF_BY_CATEGORY[category]) || DEFAULT_GIF;
  const isFinal = variant === "final";

  return (
    <div className="my-12 rounded-2xl overflow-hidden border border-primary/30 bg-gradient-to-br from-primary/10 via-cyan-500/5 to-primary/10">
      <div className="grid md:grid-cols-2 items-stretch">
        <div className="relative min-h-[200px] md:min-h-[260px] overflow-hidden">
          <img
            src={gif.url}
            alt={gif.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/40 md:bg-gradient-to-r md:from-transparent md:to-background/20" />
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-semibold text-primary border border-primary/30">
            <Gift className="w-3.5 h-3.5" /> Bônus Exclusivo
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
            <TrendingUp className="w-4 h-4" />
            {isFinal ? "Aplique o que você aprendeu agora" : "Pratique enquanto lê"}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-snug">
            {isFinal
              ? "Pronto para colocar em prática? Abra sua conta gratuita."
              : "Acesse a IQ Option e teste tudo na conta demo grátis."}
          </h3>
          <p className="text-muted-foreground text-sm mb-5">
            Conta demo com <strong className="text-foreground">R$ 10.000 virtuais</strong> para
            treinar sem riscos. Cadastro em menos de 1 minuto.
          </p>
          <Button variant="hero" size="lg" className="group self-start" asChild>
            <a
              href={AFFILIATE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              {isFinal ? "Abrir Conta Grátis Agora" : "Começar na IQ Option"}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MidArticleCTA;
