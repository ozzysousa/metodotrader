// Central AdSense configuration.
// Substitua os valores abaixo pelos IDs reais das unidades criadas no painel do AdSense.
// (Painel AdSense → Anúncios → Por unidade de anúncio → copie o `data-ad-slot`.)
export const ADSENSE_CLIENT = "ca-pub-2486849619385192";

export const AD_SLOTS = {
  // Home
  homeHeader: "1111111111",
  homeMid: "2222222222",
  homeFooter: "3333333333",
  // Blog post
  articleTop: "4444444444",
  articleInline: "5555555555",
  articleEnd: "6666666666",
} as const;

export type AdSlotId = keyof typeof AD_SLOTS;

const SCRIPT_ID = "adsbygoogle-js";
let scriptInjected = false;

/** Inject the AdSense loader script. Safe to call multiple times. */
export function loadAdSenseScript() {
  if (typeof window === "undefined") return;
  if (scriptInjected || document.getElementById(SCRIPT_ID)) {
    scriptInjected = true;
    return;
  }
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  document.head.appendChild(s);
  scriptInjected = true;
}
