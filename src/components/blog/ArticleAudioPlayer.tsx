import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

interface ArticleAudioPlayerProps {
  /** Reading time label like "5 min" — used to fake total duration */
  readTime: string;
  title: string;
}

/**
 * Visual-only audio player that simulates a text-to-speech experience.
 * No real audio is played — the progress bar advances while "playing".
 */
const ArticleAudioPlayer = ({ readTime, title }: ArticleAudioPlayerProps) => {
  const minutes = parseInt(readTime.replace(/\D/g, ""), 10) || 5;
  const totalSeconds = Math.max(60, minutes * 60);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = window.setInterval(() => {
        setElapsed((s) => {
          if (s >= totalSeconds) {
            setPlaying(false);
            return totalSeconds;
          }
          return s + 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, totalSeconds]);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const r = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${r}`;
  };

  const progress = (elapsed / totalSeconds) * 100;

  return (
    <div
      role="region"
      aria-label={`Ouvir o artigo: ${title}`}
      className="flex items-center gap-4 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-4 my-8 shadow-sm"
    >
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? "Pausar leitura" : "Ouvir este artigo"}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.35)] hover:scale-105 transition-transform shrink-0"
      >
        {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-primary" />
            Ouvir este artigo
          </span>
          <span className="text-xs text-muted-foreground tabular-nums">
            {fmt(elapsed)} / {fmt(totalSeconds)}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-cyan-bright transition-[width] duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleAudioPlayer;
