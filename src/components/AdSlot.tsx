import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const COOKIE_CONSENT_KEY = "metodotrader-cookie-consent";
const ADSENSE_CLIENT = "ca-pub-2486849619385192";

interface AdSlotProps {
  /** AdSense ad slot ID (configure in your AdSense dashboard). */
  slot: string;
  /** Layout format. Default: auto responsive. */
  format?: string;
  /** Full width responsive. Default true. */
  fullWidthResponsive?: boolean;
  /** Optional CSS class for the wrapper. */
  className?: string;
  /** Optional inline style override for the <ins> tag. */
  style?: React.CSSProperties;
  /** Optional label shown above the ad. */
  label?: string;
}

/**
 * Google AdSense ad slot.
 * Only renders after the user has accepted cookies (LGPD/GDPR friendly).
 */
const AdSlot = ({
  slot,
  format = "auto",
  fullWidthResponsive = true,
  className = "",
  style,
  label = "Publicidade",
}: AdSlotProps) => {
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
    if (!consented || pushedRef.current || !insRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch (e) {
      // AdSense not yet loaded; will retry on next mount
      console.warn("AdSense push failed", e);
    }
  }, [consented]);

  if (!consented) return null;

  return (
    <div className={`my-8 w-full text-center ${className}`}>
      {label && (
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground/60 mb-2">
          {label}
        </div>
      )}
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={style ?? { display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
};

export default AdSlot;
