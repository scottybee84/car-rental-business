import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Models from "./components/Models";
import ModelBrands from "./components/ModelBrands";
import Benefits from "./components/Benefits";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <Hero />
      <About />
      <Models />
      <ModelBrands />
      <Benefits />
      <Testimonials />
      <Blog />
      <Footer />
    </div>
  );
}

export default App;
