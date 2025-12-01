import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustBadges from "../components/TrustBadges";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustTransparency from "../components/TrustTransparency";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const Home = () => {
  // Structured Data for Home Page
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://voltvoyages.com/#organization",
        "name": "VoltVoyage",
        "url": "https://voltvoyages.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://voltvoyages.com/logo.png"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "voyagesvolt@gmail.com",
          "contactType": "Customer Service",
          "availableLanguage": ["English"]
        },
        "sameAs": [
          "https://www.instagram.com/",
          "https://www.x.com/",
          "https://www.linkedin.com/"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://voltvoyages.com/#localbusiness",
        "name": "VoltVoyage - Tesla Rental Germany",
        "image": "https://voltvoyages.com/tesla-model-y.jpg",
        "description": "Rent a Tesla Model Y in Germany - Designed for U.S. Travelers. English support, Frankfurt Airport pickup, simple charging.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Braunstrasse 2-4",
          "addressLocality": "Michelstadt",
          "addressCountry": "DE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "49.6761",
          "longitude": "9.0036"
        },
        "telephone": "+49-XXX-XXXXXXX",
        "priceRange": "€€",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Germany"
        }
      },
      {
        "@type": "Product",
        "@id": "https://voltvoyages.com/#product",
        "name": "Tesla Model Y Rental",
        "description": "2024 Tesla Model Y rental in Germany. Perfect for U.S. travelers with English support and Frankfurt Airport pickup.",
        "brand": {
          "@type": "Brand",
          "name": "Tesla"
        },
        "category": "Car Rental",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": "89",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "89",
            "priceCurrency": "EUR",
            "unitCode": "DAY"
          },
          "availability": "https://schema.org/InStock",
          "url": "https://voltvoyages.com"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "127"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://voltvoyages.com/#website",
        "url": "https://voltvoyages.com",
        "name": "VoltVoyage",
        "description": "Tesla Model Y Rental in Germany for U.S. Travelers",
        "publisher": {
          "@id": "https://voltvoyages.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://voltvoyages.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is my U.S. driver's license valid in Germany?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Your valid U.S. driver's license is accepted in Germany for stays up to 6 months. No international driving permit is required. Just bring your valid U.S. license and passport."
            }
          },
          {
            "@type": "Question",
            "name": "What insurance is included?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Every rental includes comprehensive insurance with collision damage waiver (CDW) and third-party liability coverage. You're fully covered for accidents, theft, and damage."
            }
          },
          {
            "@type": "Question",
            "name": "How does charging work in Germany?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide simple charging instructions with your rental. Germany has an extensive network of Tesla Superchargers and public charging stations. We'll show you how to use the charging card and locate stations - it's easier than you think!"
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to speak German?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Not at all! All communication with VoltVoyage is in English. We handle all German paperwork and interactions. You just need to drive and enjoy your trip!"
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="page-wrapper">
      <SEO
        title="VoltVoyage - Rent a Tesla Model Y in Germany | U.S. Traveler Friendly"
        description="Rent a Tesla Model Y in Germany - Designed for U.S. Travelers. English support, Frankfurt Airport pickup, simple charging. From €89/day. Book your electric adventure today!"
        keywords="tesla rental germany, tesla model y rental, frankfurt airport tesla rental, electric car rental germany, us travelers germany, tesla rental frankfurt, ev rental germany"
        image="https://voltvoyages.com/tesla-model-y-og.jpg"
        url="/"
        structuredData={structuredData}
        canonical="https://voltvoyages.com"
      />
      <Navbar />
      <main>
        <Hero />
        <TrustBadges />
        <TestimonialsSection />
        <TrustTransparency />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
