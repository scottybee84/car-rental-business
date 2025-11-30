import { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is my U.S. driver's license valid in Germany?",
      answer: "Yes! Your valid U.S. driver's license is accepted in Germany for stays up to 6 months. No international driving permit is required. Just bring your valid U.S. license and passport.",
    },
    {
      question: "What insurance is included?",
      answer: "Every rental includes comprehensive insurance with collision damage waiver (CDW) and third-party liability coverage. You're fully covered for accidents, theft, and damage. A refundable $500 security deposit is required.",
    },
    {
      question: "How does charging work in Germany?",
      answer: "We provide simple charging instructions with your rental. Germany has an extensive network of Tesla Superchargers and public charging stations. We'll show you how to use the charging card and locate stations - it's easier than you think!",
    },
    {
      question: "What if I need to cancel my reservation?",
      answer: "Free cancellation up to 48 hours before your pickup time. Cancellations between 24-48 hours receive a 50% refund. Cancellations less than 24 hours before pickup are non-refundable.",
    },
    {
      question: "What happens if the car breaks down?",
      answer: "We provide 24/7 English-speaking support. If you encounter any issues, call us immediately and we'll arrange roadside assistance or a replacement vehicle. All repairs are covered under our insurance.",
    },
    {
      question: "Do I need to speak German?",
      answer: "Not at all! All communication with VoltVoyage is in English. We handle all German paperwork and interactions. You just need to drive and enjoy your trip!",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section faq-section">
      <div className="content-wrapper">
        <div className="faq-heading">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="section-subheading">
            Common questions from U.S. travelers renting in Germany
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

