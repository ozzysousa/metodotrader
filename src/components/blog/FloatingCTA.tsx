import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AFFILIATE_LINK } from "@/data/blogPosts";

const FloatingCTA = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Button
        variant="hero"
        size="lg"
        className="shadow-2xl group"
        asChild
      >
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <span className="hidden sm:inline">Começar agora com o MétodoTrader na IQ Option</span>
          <span className="sm:hidden">Começar Agora</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </a>
      </Button>
    </div>
  );
};

export default FloatingCTA;
