import "./AmericanBenefits.css";

const AmericanBenefits = () => {
  const benefits = [
    {
      title: "English-first support",
      description:
        "All communication in English. No language barriers when you need help.",
    },
    {
      title: "Easy pickup at Frankfurt Airport",
      description:
        "Convenient airport location. We meet you at the terminal for a seamless start to your trip.",
    },
    {
      title: "Simple charging instructions for German roads",
      description:
        "Clear, easy-to-follow guide on where and how to charge your Tesla throughout Germany.",
    },
  ];

  return (
    <section className="section">
      <div className="content-wrapper">
        <div className="heading-580px centered">
          <div className="subheadline-wrapper">
            <div className="subheadline-dot"></div>
            <div>Why Americans Love Renting With Us</div>
          </div>
          <h2 className="centered-heading">
            Why Americans Love Renting With Us
          </h2>
        </div>
        <div className="home-benefits-wrapper">
          {benefits.map((benefit, index) => (
            <div key={index} className="home-benefit-item">
              <div className="home-benefit-heading">
                <div className="extra-large-text text-400 centered">
                  {benefit.title}
                </div>
              </div>
              <div className="small-text dusk-text centered">
                {benefit.description}
              </div>
              {index < benefits.length - 1 && (
                <div className="benefits-divider"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmericanBenefits;
