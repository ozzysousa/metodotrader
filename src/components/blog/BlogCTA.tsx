import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AFFILIATE_LINK } from "@/data/blogPosts";

const BlogCTA = () => {
  return (
    <div className="my-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-cyan-500/10 to-primary/10 border border-primary/20">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-background" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Pronto para começar a operar?
          </h3>
          <p className="text-muted-foreground">
            Junte-se a milhares de traders que já estão lucrando com o MétodoTrader na IQ Option.
            Comece com uma conta demo gratuita!
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button variant="hero" size="xl" className="group" asChild>
            <a
              href={AFFILIATE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCTA;
