import { describe, it, expect, afterEach } from "vitest";
import DOMPurify from "dompurify";

describe("DOMPurify XSS sanitization", () => {
  describe("Standard XSS payloads", () => {
    it("strips <script> tags", () => {
      const dirty = '<div>hello</div><script>alert("xss")</script>';
      const clean = DOMPurify.sanitize(dirty);
      expect(clean).not.toContain("<script>");
      expect(clean).not.toContain("alert");
      expect(clean).toContain("hello");
    });

    it("removes inline event handlers (onerror)", () => {
      const dirty = '<img src=x onerror="alert(1)">';
      const clean = DOMPurify.sanitize(dirty);
      expect(clean).not.toMatch(/onerror/i);
      expect(clean).not.toContain("alert");
    });

    it("removes javascript: URLs in href", () => {
      const dirty = '<a href="javascript:alert(1)">click</a>';
      const clean = DOMPurify.sanitize(dirty);
      expect(clean).not.toMatch(/javascript:/i);
    });

    it("strips <iframe> injections", () => {
      const dirty = '<iframe src="javascript:alert(1)"></iframe><p>ok</p>';
      const clean = DOMPurify.sanitize(dirty);
      expect(clean).not.toContain("<iframe");
      expect(clean).toContain("ok");
    });

    it("removes SVG-based XSS", () => {
      const dirty = '<svg><script>alert(1)</script></svg>';
      const clean = DOMPurify.sanitize(dirty);
      expect(clean).not.toContain("alert");
    });
  });

  describe("IN_PLACE sanitization", () => {
    it("sanitizes an existing DOM node in place", () => {
      const node = document.createElement("div");
      node.innerHTML = '<p>keep</p><script>alert("xss")</script><img src=x onerror=alert(1)>';
      const result = DOMPurify.sanitize(node, { IN_PLACE: true });
      // In IN_PLACE mode, DOMPurify mutates the passed node and returns it
      expect(result).toBe(node);
      expect(node.innerHTML).toContain("keep");
      expect(node.innerHTML).not.toContain("<script>");
      expect(node.innerHTML).not.toMatch(/onerror/i);
    });
  });

  describe("Shadow DOM bypass attempts", () => {
    it("sanitizes content that later gets attached to a shadow root", () => {
      const dirty =
        '<template><div><img src=x onerror=alert(1)><script>alert(2)</script></div></template>';
      const clean = DOMPurify.sanitize(dirty);
      expect(clean).not.toMatch(/onerror/i);
      expect(clean).not.toContain("<script>");

      // Simulate attaching sanitized content to a shadow root and confirm no
      // executable vectors survived the round-trip.
      const host = document.createElement("div");
      const shadow = host.attachShadow({ mode: "open" });
      shadow.innerHTML = clean;
      expect(shadow.innerHTML).not.toMatch(/onerror|<script|javascript:/i);
    });

    it("blocks <use> href pointing at external SVG (shadow-DOM style bypass)", () => {
      const dirty = '<svg><use href="http://evil.example/x.svg#a"/></svg>';
      const clean = DOMPurify.sanitize(dirty);
      // External <use> refs are a known shadow-tree bypass — must be stripped
      expect(clean).not.toMatch(/evil\.example/);
    });
  });

  describe("Hook pollution scenarios", () => {
    afterEach(() => {
      // Ensure we never leak a permissive hook into other tests
      DOMPurify.removeAllHooks();
    });

    it("does not persist a malicious afterSanitizeAttributes hook across calls once removed", () => {
      DOMPurify.addHook("afterSanitizeAttributes", (node) => {
        if (node instanceof Element && node.tagName === "A") {
          node.setAttribute("onclick", "alert(1)");
        }
      });
      const poisoned = DOMPurify.sanitize('<a href="/x">link</a>');
      expect(poisoned).toMatch(/onclick/i);

      DOMPurify.removeAllHooks();
      const clean = DOMPurify.sanitize('<a href="/x">link</a>');
      expect(clean).not.toMatch(/onclick/i);
    });

    it("respects ALLOWED_TAGS / ALLOWED_ATTR overrides without leaking to defaults", () => {
      const strict = DOMPurify.sanitize('<p><b>bold</b><i>i</i></p>', {
        ALLOWED_TAGS: ["b"],
        ALLOWED_ATTR: [],
      });
      expect(strict).toContain("<b>bold</b>");
      expect(strict).not.toContain("<i>");

      // Next call must fall back to default policy, not the previous strict one
      const normal = DOMPurify.sanitize("<p><i>italic</i></p>");
      expect(normal).toContain("<i>italic</i>");
    });
  });
});
