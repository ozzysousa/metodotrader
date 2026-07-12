import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import BlogCTA from "@/components/blog/BlogCTA";
import FloatingCTA from "@/components/blog/FloatingCTA";
import MidArticleCTA from "@/components/blog/MidArticleCTA";
import AdSlot from "@/components/AdSlot";
import ArticleAudioPlayer from "@/components/blog/ArticleAudioPlayer";
import ShareBar from "@/components/blog/ShareBar";
import { getPostBySlug, getRelatedPosts, SEO_KEYWORDS } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { setPageSEO, setJsonLd, removeJsonLd } from "@/lib/seo";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  // Dynamic SEO
  useEffect(() => {
    if (post) {
      setPageSEO({
        title: post.metaTitle,
        description: post.metaDescription,
        path: `/blog/${post.slug}`,
        image: post.image,
        ogType: "article",
      });

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", SEO_KEYWORDS.join(", "));
      }

      setJsonLd("article-jsonld", {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.metaDescription,
        image: post.image,
        datePublished: post.date,
        dateModified: post.date,
        author: { "@type": "Person", name: post.author },
        publisher: {
          "@type": "Organization",
          name: "MétodoTrader",
          logo: { "@type": "ImageObject", url: "https://metodotrader.online/favicon-512.png" },
        },
        mainEntityOfPage: `https://metodotrader.online/blog/${post.slug}`,
      });
    }
    return () => removeJsonLd("article-jsonld");
  }, [post]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    // Signal soft-404 to crawlers so Google doesn't index a "post não encontrado" page as valid content
    if (typeof document !== "undefined") {
      let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
      if (!robots) {
        robots = document.createElement("meta");
        robots.name = "robots";
        document.head.appendChild(robots);
      }
      robots.content = "noindex, nofollow";
      document.title = "Post não encontrado | MétodoTrader";
    }
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Post não encontrado</h1>
          <p className="text-muted-foreground mb-6">O artigo que você procura não existe.</p>
          <Button variant="hero" onClick={() => navigate("/blog")}>
            Voltar para o Blog
          </Button>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined"
    ? window.location.href
    : `https://metodotrader.online/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[720px] mx-auto"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o Blog
            </Link>

            <Badge className="mb-4 bg-primary/90 text-primary-foreground">
              {post.category}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
              {post.title}
            </h1>

            {/* Author meta line */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground pb-2 border-b border-border/40">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                ⏱️ Leitura de {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image + Audio + Share */}
      <section className="pb-8">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[720px] mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                decoding="async"
                width={1280}
                height={720}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>


            <ArticleAudioPlayer readTime={post.readTime} title={post.title} />
            <ShareBar url={shareUrl} title={post.title} variant="inline" />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {(() => {
            // Split content roughly in half at an <h2> boundary for the mid-article CTA
            const html = post.content;
            const h2Indices: number[] = [];
            const re = /<h2[\s>]/gi;
            let m: RegExpExecArray | null;
            while ((m = re.exec(html)) !== null) h2Indices.push(m.index);
            let splitAt = -1;
            if (h2Indices.length >= 2) {
              const target = html.length / 2;
              splitAt = h2Indices.reduce((best, idx) =>
                Math.abs(idx - target) < Math.abs(best - target) ? idx : best
              , h2Indices[0]);
              // Avoid splitting too early or too late
              if (splitAt < html.length * 0.25 || splitAt > html.length * 0.8) splitAt = -1;
            }
            const firstHalf = splitAt > 0 ? html.slice(0, splitAt) : html;
            const secondHalf = splitAt > 0 ? html.slice(splitAt) : "";

            const proseClasses = `max-w-[720px] mx-auto prose prose-invert prose-lg
              prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-3 prose-h2:leading-snug
              prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:leading-snug
              prose-h4:text-lg prose-h4:mt-8 prose-h4:mb-3
              prose-p:text-muted-foreground prose-p:leading-[1.95] prose-p:mb-8 prose-p:text-justify
              prose-li:text-muted-foreground prose-li:mb-4 prose-li:leading-relaxed prose-li:pl-1
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-card/50 prose-pre:border prose-pre:border-border/50
              prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
              prose-table:border-border/50
              prose-th:text-foreground prose-th:bg-card/50 prose-th:p-3 prose-th:text-left
              prose-td:text-muted-foreground prose-td:border-border/30 prose-td:p-3
              prose-ul:my-6 prose-ol:my-6 prose-ul:space-y-2 prose-ol:space-y-2
              [&_.lead]:text-lg [&_.lead]:text-muted-foreground [&_.lead]:leading-loose [&_.lead]:mb-8
              [&_.highlight-box]:bg-primary/10 [&_.highlight-box]:border-l-4 [&_.highlight-box]:border-primary [&_.highlight-box]:p-4 [&_.highlight-box]:rounded-r-lg [&_.highlight-box]:my-6
              [&_.warning-box]:bg-destructive/10 [&_.warning-box]:border-l-4 [&_.warning-box]:border-destructive [&_.warning-box]:p-4 [&_.warning-box]:rounded-r-lg [&_.warning-box]:my-6
              [&_.pro-tip]:bg-cyan-500/10 [&_.pro-tip]:border-l-4 [&_.pro-tip]:border-cyan-500 [&_.pro-tip]:p-4 [&_.pro-tip]:rounded-r-lg [&_.pro-tip]:my-6
              [&_.feature-grid]:grid [&_.feature-grid]:md:grid-cols-2 [&_.feature-grid]:gap-4 [&_.feature-grid]:my-6
              [&_.feature-item]:bg-card/50 [&_.feature-item]:border [&_.feature-item]:border-border/50 [&_.feature-item]:rounded-lg [&_.feature-item]:p-4
              [&_.steps-list]:space-y-3 [&_.steps-list>li]:bg-card/30 [&_.steps-list>li]:p-3 [&_.steps-list>li]:rounded-lg [&_.steps-list>li]:border [&_.steps-list>li]:border-border/30
              [&_.data-table]:w-full [&_.data-table]:border-collapse [&_.data-table]:my-6
              [&_.pattern-box]:bg-card/50 [&_.pattern-box]:border [&_.pattern-box]:border-border/50 [&_.pattern-box]:rounded-lg [&_.pattern-box]:p-5 [&_.pattern-box]:my-6
              [&_.checklist-box]:bg-card/50 [&_.checklist-box]:border [&_.checklist-box]:border-border/50 [&_.checklist-box]:rounded-lg [&_.checklist-box]:p-5 [&_.checklist-box]:my-6
              [&_.author-note]:bg-muted/30 [&_.author-note]:border [&_.author-note]:border-border/50 [&_.author-note]:rounded-lg [&_.author-note]:p-4 [&_.author-note]:my-8 [&_.author-note]:text-sm
              prose-figure:my-8 prose-figure:rounded-xl prose-figure:overflow-hidden
              prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-border/30
              prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:mt-3 prose-figcaption:italic`;

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="max-w-[720px] mx-auto">
                  <AdSlot slotId="articleTop" placement="article" />
                </div>

                <article
                  className={proseClasses}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(firstHalf, { USE_PROFILES: { html: true } }),
                  }}
                />

                {secondHalf && (
                  <div className="max-w-[720px] mx-auto">
                    <MidArticleCTA category={post.category} variant="mid" />
                    <AdSlot slotId="articleInline" placement="article" />
                  </div>
                )}

                {secondHalf && (
                  <article
                    className={proseClasses}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(secondHalf, { USE_PROFILES: { html: true } }),
                    }}
                  />
                )}
              </motion.div>
            );
          })()}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="max-w-[720px] mx-auto mt-8 pt-6 border-t border-border/30">
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="max-w-[720px] mx-auto">
            <MidArticleCTA category={post.category} variant="final" />
            <AdSlot slotId="articleEnd" placement="article" />
            <ShareBar url={shareUrl} title={post.title} variant="inline" />
          </div>
        </div>
      </section>


      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Artigos Relacionados
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <BlogCard post={relatedPost} />
                  </motion.div>
                ))}
              </div>
              <div className="mt-12">
                <BlogCTA />
              </div>
            </div>
          </div>
        </section>
      )}

      <FloatingCTA />
      <ShareBar url={shareUrl} title={post.title} variant="floating" />
      <Footer />
    </div>
  );
};

export default BlogPost;
