import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BlogPagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const set = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
    const sorted = [...set].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);
    const out: (number | "…")[] = [];
    sorted.forEach((n, i) => {
      if (i > 0 && n - sorted[i - 1] > 1) out.push("…");
      out.push(n);
    });
    return out;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const go = (p: number) => {
    if (p < 1 || p > totalPages || p === currentPage) return;
    onPageChange(p);
  };

  return (
    <nav
      aria-label="Paginação de artigos"
      className="mt-12 flex items-center justify-center gap-2 flex-wrap"
    >
      <button
        type="button"
        onClick={() => go(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className="flex items-center gap-1 px-3 h-10 rounded-lg border border-border/60 bg-card/50 text-sm text-foreground hover:border-primary/60 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-2 text-muted-foreground select-none">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            aria-current={p === currentPage ? "page" : undefined}
            aria-label={`Ir para página ${p}`}
            className={cn(
              "min-w-10 h-10 px-3 rounded-lg text-sm font-medium border transition-colors",
              p === currentPage
                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_hsl(var(--primary)/0.35)]"
                : "border-border/60 bg-card/50 text-foreground hover:border-primary/60 hover:text-primary"
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => go(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
        className="flex items-center gap-1 px-3 h-10 rounded-lg border border-border/60 bg-card/50 text-sm text-foreground hover:border-primary/60 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <span className="hidden sm:inline">Próxima</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

export default BlogPagination;
