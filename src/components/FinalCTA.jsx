import "./FinalCTA.css";

const FinalCTA = () => {
  const scrollToForm = () => {
    const formElement = document.querySelector(".booking-section-container");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="section final-cta-section">
      <div className="content-wrapper">
        <div className="final-cta-wrapper">
          <h2 className="final-cta-heading">Ready to Rent?</h2>
          <p className="final-cta-text">
            Check availability for your dates and join our waitlist. We'll
            confirm as soon as we have a Tesla Model Y available for you.
          </p>
          <button
            onClick={scrollToForm}
            className="final-cta-button secondary-button"
          >
            <div className="clip">
              <div className="link-text-wrapper">
                <div>Check Availability</div>
              </div>
              <div className="link-text-wrapper link-text-bottom">
                <div>Check Availability</div>
              </div>
            </div>
            <img
              src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/68306c3cc50945add9f5302d_364f727b295f3c1bcc98a650dc543d2e_right-arrow.svg"
              loading="eager"
              alt="Arrow"
              className="button-icon"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;


