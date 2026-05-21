import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Assets from "@/components/Assets";
import Benefits from "@/components/Benefits";
import RecentArticles from "@/components/RecentArticles";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import SignupForm from "@/components/SignupForm";
import Footer from "@/components/Footer";
import BlogCTA from "@/components/blog/BlogCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Assets />
        <Benefits />
        <RecentArticles />
        <Testimonials />
        <div className="container mx-auto px-4 lg:px-8">
          <BlogCTA />
        </div>
        <FAQ />
        <div className="container mx-auto px-4 lg:px-8">
          <BlogCTA />
        </div>
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
