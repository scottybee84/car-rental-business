import "./TestimonialsSection.css";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Renting from VoltVoyage was seamless! The airport pickup was exactly as promised, and the Tesla Model Y made exploring Germany a breeze. No German paperwork needed - perfect for Americans!",
      name: "Sarah M.",
      location: "California, USA",
      rating: 5,
    },
    {
      quote: "As a first-time visitor to Germany, I was nervous about renting a car. VoltVoyage's English support and simple process put me at ease. The charging guide was incredibly helpful!",
      name: "Michael R.",
      location: "Texas, USA",
      rating: 5,
    },
    {
      quote: "Best rental experience I've had in Europe. The car was spotless, Autopilot worked perfectly, and the team was responsive to all my questions. Highly recommend!",
      name: "Jennifer L.",
      location: "New York, USA",
      rating: 5,
    },
  ];

  return (
    <section className="section testimonials-section">
      <div className="content-wrapper">
        <div className="testimonials-heading">
          <h2 className="section-heading">What Our Customers Say</h2>
          <p className="section-subheading">
            Real experiences from U.S. travelers who rented with us
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span className="testimonial-location">{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="trust-badges-row">
          <div className="trust-badge">
            <span className="trust-badge-icon">✓</span>
            <span>Satisfaction Guarantee</span>
          </div>
          <div className="trust-badge">
            <span className="trust-badge-icon">🔒</span>
            <span>Secure Booking</span>
          </div>
          <div className="trust-badge">
            <span className="trust-badge-icon">✓</span>
            <span>Verified Business</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

