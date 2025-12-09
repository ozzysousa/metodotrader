import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Assets from "@/components/Assets";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Assets />
        <Benefits />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
