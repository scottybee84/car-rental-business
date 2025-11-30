import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustBadges from "../components/TrustBadges";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <Hero />
      <TrustBadges />
      <Footer />
    </div>
  );
};

export default Home;
