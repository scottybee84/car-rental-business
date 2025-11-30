import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustBadges from "../components/TrustBadges";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustTransparency from "../components/TrustTransparency";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <Hero />
      <TrustBadges />
      <TestimonialsSection />
      <TrustTransparency />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
