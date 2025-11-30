import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LegalPages.css";

const TermsOfService = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="legal-page">
        <div className="content-wrapper">
          <div className="legal-content">
            <h1>Terms of Service</h1>

            <h2>1. Rental Requirements</h2>
            <p>To rent a Tesla Model Y, you must:</p>
            <ul>
              <li>Be at least 25 years old</li>
              <li>
                Hold a valid U.S. driver's license (or international driving
                permit if required)
              </li>
              <li>Have a valid credit card for the security deposit</li>
              <li>
                Provide proof of insurance or purchase our insurance coverage
              </li>
            </ul>

            <h2>2. Driver's License Requirements</h2>
            <p>
              A valid U.S. driver's license is required. For stays longer than 6
              months, an international driving permit may be required. Please
              check current German regulations before your trip.
            </p>

            <h2>3. Payment and Pricing</h2>
            <p>
              <strong>No payment is collected automatically.</strong> All prices
              shown on the website are non-binding until we confirm availability
              and send you a final quote. Payment will be arranged after
              availability is confirmed.
            </p>

            <h2>4. Tesla Features</h2>
            <p>
              Tesla features may differ from U.S. models. European Tesla Model Y
              vehicles may have different software versions, charging
              connectors, or feature availability. We will provide detailed
              information about the specific vehicle features before your
              rental.
            </p>

            <h2>5. Availability and Waitlist</h2>
            <p>
              Due to high demand, we may not have immediate availability for
              your requested dates. By submitting an inquiry, you can join our
              waitlist. We will notify you as soon as we have availability
              matching your dates.
            </p>

            <h2>6. Cancellation Policy</h2>
            <p>
              Cancellation policies will be provided in your rental agreement.
              Generally, cancellations made more than 7 days before pickup are
              fully refundable, minus processing fees.
            </p>

            <h2>7. Vehicle Condition and Damage</h2>
            <p>
              The vehicle will be inspected before and after rental. Any damage
              beyond normal wear and tear will be charged to the renter. A
              security deposit will be held until the vehicle is returned and
              inspected.
            </p>

            <h2>8. Charging and Range</h2>
            <p>
              We provide simple charging instructions for German roads. The
              vehicle will be delivered with a full charge. You are responsible
              for charging during the rental period. Charging costs are included
              in the rental price for standard charging locations.
            </p>

            <h2>9. Contact</h2>
            <p>
              For questions about these terms, please contact us at:
              hello@voltvoyage.com
            </p>

            <p className="legal-updated">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
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

export default TermsOfService;
