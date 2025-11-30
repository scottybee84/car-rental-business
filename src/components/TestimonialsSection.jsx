import "./TestimonialsSection.css";
import person1 from "../assets/360_F_428968271_1GKh0pDWRwNx9xVBhMYcGpimYztCYHCQ.jpg";
import person2 from "../assets/handsome-man-smiling-outside-park-600nw-1169629294.webp";
import person3 from "../assets/young-woman-outdoor-portrait-4089800.webp";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "Renting from VoltVoyage was seamless! The airport pickup was exactly as promised, and the Tesla Model Y made exploring Germany a breeze. No German paperwork needed - perfect for Americans!",
      name: "Steve S.",
      location: "California, USA",
      rating: 5,
      image: person1,
    },
    {
      quote:
        "As a first-time visitor to Germany, I was nervous about renting a car. VoltVoyage's English support and simple process put me at ease. The charging guide was incredibly helpful!",
      name: "Michael R.",
      location: "Texas, USA",
      rating: 5,
      image: person2,
    },
    {
      quote:
        "Best rental experience I've had in Europe. The car was spotless, Autopilot worked perfectly, and the team was responsive to all my questions. Highly recommend!",
      name: "Jennifer L.",
      location: "New York, USA",
      rating: 5,
      image: person3,
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
                  <span key={i} className="star">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-author-image"
                />
                <div className="testimonial-author-info">
                  <strong>{testimonial.name}</strong>
                  <span className="testimonial-location">
                    {testimonial.location}
                  </span>
                </div>
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
