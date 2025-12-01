import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import "./LegalPages.css";

const Impressum = () => {
  return (
    <div className="page-wrapper">
      <SEO
        title="Impressum | VoltVoyage Tesla Rental"
        description="Legal information and company details for VoltVoyage Tesla rental service in Germany."
        url="/impressum"
        canonical="https://voltvoyages.com/impressum"
        noindex={false}
      />
      <Navbar />
      <div className="legal-page">
        <div className="content-wrapper">
          <div className="legal-content">
            <h1>Impressum</h1>

            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              VoltVoyage – Scott Brown
              <br />
              Braunstrasse 2-4
              <br />
              Michelstadt, DE
            </p>

            <h2>Kontakt</h2>
            <p>Email: voyagesvolt@gmail.com</p>

            <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              Scott Brown
              <br />
              Braunstrasse 2-4
              <br />
              Michelstadt, DE
            </p>

            <h2>Haftungsausschluss</h2>

            <h3>Haftung für Inhalte</h3>
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              können wir jedoch keine Gewähr übernehmen.
            </p>

            <h3>Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich.
            </p>

            <p className="legal-updated">
              Stand:{" "}
              {new Date().toLocaleDateString("de-DE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Impressum;
