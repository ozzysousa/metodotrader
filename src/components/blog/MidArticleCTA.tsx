import { ArrowRight, Gift, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AFFILIATE_LINK } from "@/data/blogPosts";

// Lightweight Unsplash images (small, lazy-loaded) mapped by category.
// Using w=480&q=55&auto=format keeps them under ~50KB on mobile.
const IMG = (id: string, alt: string) => ({
  url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=480&q=55`,
  alt,
});

const IMG_BY_CATEGORY: Record<string, { url: string; alt: string }> = {
  "Análise Técnica": IMG("photo-1611974789855-9c2a0a7236a3", "Gráfico de análise técnica"),
  "Análise": IMG("photo-1611974789855-9c2a0a7236a3", "Análise de mercado financeiro"),
  "Avançado": IMG("photo-1642790551116-18e150f248e3", "Trader profissional avançado"),
  "Educacional": IMG("photo-1554224155-6726b3ff858f", "Estudando o mercado financeiro"),
  "Estratégias": IMG("photo-1590283603385-17ffb3a7f29f", "Estratégia de trading"),
  "Gerenciamento": IMG("photo-1579532537598-459ecdaf39cc", "Gestão de capital"),
  "Gestão de Risco": IMG("photo-1579532537598-459ecdaf39cc", "Gestão de risco financeiro"),
  "Iniciantes": IMG("photo-1559526324-4b87b5e36e44", "Primeiros passos no trading"),
  "Mindset": IMG("photo-1506784983877-45594efa4cbe", "Mentalidade vencedora"),
  "Plataforma": IMG("photo-1642790551116-18e150f248e3", "Plataforma de trading"),
  "Psicologia": IMG("photo-1506784983877-45594efa4cbe", "Psicologia do trader"),
};

const DEFAULT_IMG = IMG("photo-1611974789855-9c2a0a7236a3", "Mercado financeiro");

interface MidArticleCTAProps {
  category?: string;
  variant?: "mid" | "final";
}

const MidArticleCTA = ({ category, variant = "mid" }: MidArticleCTAProps) => {
  const img = (category && IMG_BY_CATEGORY[category]) || DEFAULT_IMG;
  const isFinal = variant === "final";

  return (
    <div className="my-12 rounded-2xl overflow-hidden border border-primary/30 bg-gradient-to-br from-primary/10 via-cyan-500/5 to-primary/10">
      <div className="grid md:grid-cols-2 items-stretch">
        <div className="relative min-h-[200px] md:min-h-[260px] overflow-hidden bg-card/30">
          <img
            src={img.url}
            alt={img.alt}
            loading="lazy"
            decoding="async"
            width={480}
            height={320}
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
