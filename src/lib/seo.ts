// Utility helpers to set per-route SEO meta tags (title, description, canonical, og:*).

const SITE_URL = "https://metodotrader.online";

function setMeta(selector: string, attr: "content" | "href", value: string) {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    if (selector.startsWith("link")) {
      el = document.createElement("link");
      const m = selector.match(/rel="([^"]+)"/);
      if (m) (el as HTMLLinkElement).rel = m[1];
    } else {
      el = document.createElement("meta");
      const nameMatch = selector.match(/name="([^"]+)"/);
      const propMatch = selector.match(/property="([^"]+)"/);
      if (nameMatch) (el as HTMLMetaElement).name = nameMatch[1];
      if (propMatch) el.setAttribute("property", propMatch[1]);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export interface PageSEO {
  title: string;
  description: string;
  path: string; // e.g. "/blog" or "/blog/slug"
  image?: string;
  ogType?: "website" | "article";
}

function toAbsoluteUrl(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/")) return `${SITE_URL}${src}`;
  return `${SITE_URL}/${src}`;
}

// Upgrade Unsplash thumbnails (e.g. w=450&h=225) to social-preview size (1200x630)
function toSocialImage(src: string): string {
  if (/images\.unsplash\.com/.test(src)) {
    return src
      .replace(/([?&])w=\d+/i, "$1w=1200")
      .replace(/([?&])h=\d+/i, "$1h=630");
  }
  return src;
}

export function setPageSEO({ title, description, path, image, ogType = "website" }: PageSEO) {
  const url = `${SITE_URL}${path}`;
  document.title = title;
  setMeta('meta[name="description"]', "content", description);
  setMeta('link[rel="canonical"]', "href", url);
  setMeta('meta[property="og:title"]', "content", title);
  setMeta('meta[property="og:description"]', "content", description);
  setMeta('meta[property="og:url"]', "content", url);
  setMeta('meta[property="og:type"]', "content", ogType);
  setMeta('meta[property="og:site_name"]', "content", "MétodoTrader");
  setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
  setMeta('meta[name="twitter:title"]', "content", title);
  setMeta('meta[name="twitter:description"]', "content", description);
  if (image) {
    const absolute = toSocialImage(toAbsoluteUrl(image));
    setMeta('meta[property="og:image"]', "content", absolute);
    setMeta('meta[property="og:image:secure_url"]', "content", absolute);
    setMeta('meta[property="og:image:type"]', "content", absolute.endsWith(".png") ? "image/png" : "image/jpeg");
    setMeta('meta[property="og:image:width"]', "content", "1200");
    setMeta('meta[property="og:image:height"]', "content", "630");
    setMeta('meta[property="og:image:alt"]', "content", title);
    setMeta('meta[name="twitter:image"]', "content", absolute);
    setMeta('meta[name="twitter:image:alt"]', "content", title);
  }
}

export function setJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function removeJsonLd(id: string) {
  const el = document.getElementById(id);
  if (el) el.remove();
}
