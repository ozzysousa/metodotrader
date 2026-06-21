import { useEffect, useRef, useState } from "react";
import { ADSENSE_CLIENT, AD_SLOTS, loadAdSenseScript, type AdSlotId } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const COOKIE_CONSENT_KEY = "metodotrader-cookie-consent";

type Placement = "header" | "inline" | "footer" | "article";

interface AdSlotProps {
  /** Pre-configured slot key from src/lib/adsense.ts (preferred). */
  slotId?: AdSlotId;
  /** Raw AdSense slot ID. Used if slotId is omitted. */
  slot?: string;
  /** Visual placement preset that controls max-width and spacing. */
  placement?: Placement;
  format?: string;
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

const placementClasses: Record<Placement, string> = {
  header: "max-w-3xl mx-auto my-6 md:my-8 min-h-[100px]",
  inline: "max-w-3xl mx-auto my-8 md:my-10 min-h-[120px]",
  footer: "max-w-3xl mx-auto mt-8 mb-4 min-h-[100px]",
  article: "max-w-2xl mx-auto my-8 min-h-[120px]",
};

/**
 * Google AdSense ad slot.
 * - Only renders + loads the adsbygoogle script after the user accepts cookies (LGPD/GDPR).
 * - Uses semantic tokens and a subtle "Publicidade" label so ads blend with the dark theme.
 */
const AdSlot = ({
  slotId,
  slot,
  placement = "inline",
  format = "auto",
  fullWidthResponsive = true,
  className = "",
  style,
  label = "Publicidade",
}: AdSlotProps) => {
  const resolvedSlot = slot ?? (slotId ? AD_SLOTS[slotId] : undefined);
  const insRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);
  const [consented, setConsented] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
  });

  useEffect(() => {
    const handler = () => {
      setConsented(localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted");
    };
    window.addEventListener("cookie-consent-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("cookie-consent-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  useEffect(() => {
    if (!consented || pushedRef.current || !insRef.current || !resolvedSlot) return;
    loadAdSenseScript();
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch (e) {
      console.warn("AdSense push failed", e);
    }
  }, [consented, resolvedSlot]);

  if (!consented || !resolvedSlot) return null;

  return (
    <aside
      aria-label="Anúncio patrocinado"
      className={`w-full px-4 ${placementClasses[placement]} ${className}`}
    >
      {label && (
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-2 text-center">
          {label}
        </div>
      )}
      <div className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-2 overflow-hidden">
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={style ?? { display: "block", minHeight: 90 }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={resolvedSlot}
          data-ad-format={format}
          data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        />
      </div>
    </aside>
  );
};

export default AdSlot;
