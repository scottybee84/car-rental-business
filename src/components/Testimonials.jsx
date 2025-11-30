import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Cruze made buying my McLaren effortless with Easy Financing. The Prime Warranty ensures I drive with total confidence on every thrilling journey!",
      name: "Alex Reed",
      location: "New York",
      image: "https://cdn.prod.website-files.com/682f02eb02aa737158465c60/683931f5ea1c368db800abfb_customer-image-1.webp"
    },
    {
      quote: "Smart Trade-In at Cruze was fair. Loving my new Lamborghini!",
      name: "Mark Lane",
      location: "Florida",
      image: "https://cdn.prod.website-files.com/682f02eb02aa737158465c60/683931f59ca4b657c43a02bd_customer-image-2.webp"
    },
    {
      quote: "The Cruze team simplified financing for my Ferrari with ease!",
      name: "Luke Nash",
      location: "Illinois",
      image: "https://cdn.prod.website-files.com/682f02eb02aa737158465c60/683931f5731b87f326d122ee_customer-image-3.webp"
    },
    {
      quote: "Cruze's Smart Trade-In valued my car perfectly. Exceptional service—now I love my dream Mercedes!",
      name: "Paul Gray",
      location: "Texas",
      image: "https://cdn.prod.website-files.com/682f02eb02aa737158465c60/683931f49ca4b657c43a0210_customer-image-4.webp"
    }
  ];

  return (
    <section className="section mist-bg">
      <div className="content-wrapper">
        <div className="testimonials-heading-wrapper">
          <div className="heading-480px">
            <div className="subheadline-wrapper">
              <div className="subheadline-dot"></div>
              <div>Testimonials</div>
            </div>
            <h2>See What Our Clients Say About Their Rides</h2>
          </div>
          <div className="section-button">
            <a href="/contact" className="primary-button w-inline-block">
              <div className="clip">
                <div className="link-text-wrapper"><div>Book Test Drive</div></div>
                <div className="link-text-wrapper link-text-bottom"><div>Book Test Drive</div></div>
              </div>
              <img 
                src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/68306c3cc50945add9f5302d_364f727b295f3c1bcc98a650dc543d2e_right-arrow.svg" 
                loading="eager" 
                alt="Button Arrow" 
                className="button-icon"
              />
            </a>
          </div>
        </div>
        <div className="testimonials-wrapper">
          <div className="testimonials-top">
            <div className="testimonial-image">
              <img 
                src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/68449b559c270652d7a42164_7b157e743de31f3705aeb49210fd8b02_showroom-2.webp" 
                loading="eager" 
                alt="Showroom Image" 
                className="image-default"
              />
            </div>
            <div className="testimonial-item">
              <div className="large-text text-400 italicized">"{testimonials[0].quote}"</div>
              <div className="testimonial-info">
                <div className="customer-info-wrapper">
                  <div className="customer-image">
                    <img src={testimonials[0].image} loading="eager" alt={testimonials[0].name} className="image-default" />
                  </div>
                  <div className="customer-info">
                    <div className="text-400">{testimonials[0].name}</div>
                    <div className="small-text dusk-text">{testimonials[0].location}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-item">
              <div className="large-text text-400 italicized">"{testimonials[1].quote}"</div>
              <div className="testimonial-info">
                <div className="customer-info-wrapper">
                  <div className="customer-image">
                    <img src={testimonials[1].image} loading="eager" alt={testimonials[1].name} className="image-default" />
                  </div>
                  <div className="customer-info">
                    <div className="text-400">{testimonials[1].name}</div>
                    <div className="small-text dusk-text">{testimonials[1].location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonials-bottom">
            <div className="testimonial-item">
              <div className="large-text text-400 italicized">"{testimonials[2].quote}"</div>
              <div className="testimonial-info">
                <div className="customer-info-wrapper">
                  <div className="customer-image">
                    <img src={testimonials[2].image} loading="eager" alt={testimonials[2].name} className="image-default" />
                  </div>
                  <div className="customer-info">
                    <div className="text-400">{testimonials[2].name}</div>
                    <div className="small-text dusk-text">{testimonials[2].location}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-image">
              <img 
                src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/68449b5622684ab14fd0e645_ff43e171620b6a61f173a5843d1d579f_showroom-1.webp" 
                loading="eager" 
                alt="Showroom Image" 
                className="image-default"
              />
            </div>
            <div className="testimonial-item">
              <div className="large-text text-400 italicized">"{testimonials[3].quote}"</div>
              <div className="testimonial-info">
                <div className="customer-info-wrapper">
                  <div className="customer-image">
                    <img src={testimonials[3].image} loading="eager" alt={testimonials[3].name} className="image-default" />
                  </div>
                  <div className="customer-info">
                    <div className="text-400">{testimonials[3].name}</div>
                    <div className="small-text dusk-text">{testimonials[3].location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

