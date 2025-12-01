import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import "./LegalPages.css";

const PrivacyPolicy = () => {
  return (
    <div className="page-wrapper">
      <SEO
        title="Privacy Policy | VoltVoyage Tesla Rental"
        description="VoltVoyage privacy policy and data protection information. Learn how we handle your personal data when you rent a Tesla in Germany."
        url="/privacy-policy"
        canonical="https://voltvoyages.com/privacy-policy"
        noindex={false}
      />
      <Navbar />
      <div className="legal-page">
        <div className="content-wrapper">
          <div className="legal-content">
            <h1>Privacy Policy (Datenschutzerklärung)</h1>

            <h2>1. Data Protection Overview</h2>
            <p>
              The following gives a simple overview of what happens to your
              personal information when you visit our website. Personal
              information is any data with which you could be personally
              identified.
            </p>

            <h2>2. Data Collection on Our Website</h2>

            <h3>Who is responsible for the data collection on this website?</h3>
            <p>
              The data collected on this website are processed by the website
              operator. The operator's contact details can be found in the
              website's required legal notice.
            </p>

            <h3>How do we collect your data?</h3>
            <p>
              Some data are collected when you provide it to us. This could, for
              example, be data you enter on a contact form or booking inquiry
              form.
            </p>

            <h3>What do we use your data for?</h3>
            <p>
              Part of the data is collected to ensure the proper functioning of
              the website. Other data can be used to analyze how visitors use
              the site, or to contact you regarding your rental inquiry.
            </p>

            <h2>3. Your Rights</h2>
            <p>
              You always have the right to request information about your stored
              data, its origin, its recipients, and the purpose of its
              collection at no charge. You also have the right to request that
              it be corrected, blocked, or deleted.
            </p>

            <h2>4. Contact Form and Booking Inquiries</h2>
            <p>
              If you send us questions via the contact form or booking inquiry,
              we will collect the data entered on the form, including the
              contact details you provide, to answer your question and any
              follow-up questions. We do not share this information without your
              permission.
            </p>

            <h2>5. Email Communications</h2>
            <p>
              We use EmailJS to send emails related to your booking inquiries.
              EmailJS processes your data according to their privacy policy. We
              do not store your email data on our servers beyond what is
              necessary to respond to your inquiry.
            </p>

            <h2>6. Contact</h2>
            <p>
              For questions about data protection, please contact us at:
              voyagesvolt@gmail.com
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

export default PrivacyPolicy;
