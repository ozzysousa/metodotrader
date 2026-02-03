import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import BlogCTA from "@/components/blog/BlogCTA";
import FloatingCTA from "@/components/blog/FloatingCTA";
import { getPostBySlug, getRelatedPosts, SEO_KEYWORDS } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  // Dynamic SEO
  useEffect(() => {
    if (post) {
      document.title = post.metaTitle;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", post.metaDescription);
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", SEO_KEYWORDS.join(", "));
      }

      // Open Graph
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", post.metaTitle);

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) ogDescription.setAttribute("content", post.metaDescription);

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute("content", post.image);

      // Twitter Card
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) twitterTitle.setAttribute("content", post.metaTitle);

      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) twitterDescription.setAttribute("content", post.metaDescription);
    }
  }, [post]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
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

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } catch {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para a área de transferência!");
    }
  };

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
            className="max-w-4xl mx-auto"
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
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {new Date(post.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {post.readTime} de leitura
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-primary hover:text-primary/80"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Compartilhar
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto prose prose-invert prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-3
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4 prose-p:text-justify
              prose-li:text-muted-foreground prose-li:mb-2
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-card/50 prose-pre:border prose-pre:border-border/50
              prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
              prose-table:border-border/50
              prose-th:text-foreground prose-th:bg-card/50 prose-th:p-3 prose-th:text-left
              prose-td:text-muted-foreground prose-td:border-border/30 prose-td:p-3
              prose-ul:my-4 prose-ol:my-4
              [&_.lead]:text-lg [&_.lead]:text-muted-foreground [&_.lead]:leading-relaxed
              [&_.highlight-box]:bg-primary/10 [&_.highlight-box]:border-l-4 [&_.highlight-box]:border-primary [&_.highlight-box]:p-4 [&_.highlight-box]:rounded-r-lg [&_.highlight-box]:my-6
              [&_.warning-box]:bg-destructive/10 [&_.warning-box]:border-l-4 [&_.warning-box]:border-destructive [&_.warning-box]:p-4 [&_.warning-box]:rounded-r-lg [&_.warning-box]:my-6
              [&_.pro-tip]:bg-cyan-500/10 [&_.pro-tip]:border-l-4 [&_.pro-tip]:border-cyan-500 [&_.pro-tip]:p-4 [&_.pro-tip]:rounded-r-lg [&_.pro-tip]:my-6
              [&_.feature-grid]:grid [&_.feature-grid]:md:grid-cols-2 [&_.feature-grid]:gap-4 [&_.feature-grid]:my-6
              [&_.feature-item]:bg-card/50 [&_.feature-item]:border [&_.feature-item]:border-border/50 [&_.feature-item]:rounded-lg [&_.feature-item]:p-4
              [&_.steps-list]:space-y-3 [&_.steps-list>li]:bg-card/30 [&_.steps-list>li]:p-3 [&_.steps-list>li]:rounded-lg [&_.steps-list>li]:border [&_.steps-list>li]:border-border/30
              [&_.data-table]:w-full [&_.data-table]:border-collapse [&_.data-table]:my-6
              [&_.pattern-box]:bg-card/50 [&_.pattern-box]:border [&_.pattern-box]:border-border/50 [&_.pattern-box]:rounded-lg [&_.pattern-box]:p-5 [&_.pattern-box]:my-6
              [&_.checklist-box]:bg-card/50 [&_.checklist-box]:border [&_.checklist-box]:border-border/50 [&_.checklist-box]:rounded-lg [&_.checklist-box]:p-5 [&_.checklist-box]:my-6
              [&_.author-note]:bg-muted/30 [&_.author-note]:border [&_.author-note]:border-border/50 [&_.author-note]:rounded-lg [&_.author-note]:p-4 [&_.author-note]:my-8 [&_.author-note]:text-sm"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-border/30">
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
          
          <div className="max-w-4xl mx-auto">
            <BlogCTA />
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
            </div>
          </div>
        </section>
      )}

      <FloatingCTA />
      <Footer />
    </div>
  );
};

// Simple markdown-like formatting
function formatContent(content: string): string {
  return content
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hulo])/gm, '<p>')
    .replace(/(?<![>])$/gm, '</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<[hulo])/g, '$1')
    .replace(/(<\/[hulo][^>]*>)<\/p>/g, '$1')
    .replace(/(<li>)/g, '</ul>$1')
    .replace(/<\/ul><li>/g, '<li>')
    .replace(/(<li>.*?<\/li>)(?!<li>)/gs, '<ul>$1</ul>')
    .replace(/<\/ul><ul>/g, '');
}

export default BlogPost;
