import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookieConsent from "./components/CookieConsent";

// Lazy load page components for better code splitting
const Index = lazy(() => import("./pages/Index"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const TermosDeUso = lazy(() => import("./pages/TermosDeUso"));
const PoliticaDePrivacidade = lazy(() => import("./pages/PoliticaDePrivacidade"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Regulamentacao = lazy(() => import("./pages/Regulamentacao"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/termos-de-uso" element={<TermosDeUso />} />
            <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/regulamentacao" element={<Regulamentacao />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
