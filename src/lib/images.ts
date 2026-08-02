/**
 * Helpers para servir imagens externas (Unsplash) já redimensionadas,
 * comprimidas e em formato moderno, com srcset/sizes responsivos.
 */

const WIDTHS = [400, 600, 800, 1200];

const isUnsplash = (url: string) => url.includes("images.unsplash.com");

/** Reescreve a URL do Unsplash com largura/altura e compressão eficientes. */
export const unsplashUrl = (url: string, width: number, aspect = 16 / 9) => {
  if (!isUnsplash(url)) return url;
  const [base] = url.split("?");
  const height = Math.round(width / aspect);
  return `${base}?w=${width}&h=${height}&auto=format&fit=crop&fm=webp&q=80`;
};

/** Gera um srcset responsivo para uma imagem do Unsplash. */
export const unsplashSrcSet = (url: string, aspect = 16 / 9) => {
  if (!isUnsplash(url)) return undefined;
  return WIDTHS.map((w) => `${unsplashUrl(url, w, aspect)} ${w}w`).join(", ");
};

/** `sizes` padrão para grids de cards (1 col mobile, 2 tablet, 3 desktop). */
export const CARD_SIZES = "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw";
