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

export function setPageSEO({ title, description, path, image, ogType = "website" }: PageSEO) {
  const url = `${SITE_URL}${path}`;
  document.title = title;
  setMeta('meta[name="description"]', "content", description);
  setMeta('link[rel="canonical"]', "href", url);
  setMeta('meta[property="og:title"]', "content", title);
  setMeta('meta[property="og:description"]', "content", description);
  setMeta('meta[property="og:url"]', "content", url);
  setMeta('meta[property="og:type"]', "content", ogType);
  if (image) setMeta('meta[property="og:image"]', "content", image);
  setMeta('meta[name="twitter:title"]', "content", title);
  setMeta('meta[name="twitter:description"]', "content", description);
  if (image) setMeta('meta[name="twitter:image"]', "content", image);
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
