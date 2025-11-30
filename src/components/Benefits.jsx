import './Benefits.css';

const Benefits = () => {
  const benefits = [
    {
      icon: 'https://cdn.prod.website-files.com/682f02eb02aa737158465c60/6837a7bdb1a11a779604e4ad_wrench-icon.svg',
      title: 'Prime Warranty',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.'
    },
    {
      icon: 'https://cdn.prod.website-files.com/682f02eb02aa737158465c60/6837a648b1a11a779603fc33_calculator-icon.svg',
      title: 'Easy Financing',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.'
    },
    {
      icon: 'https://cdn.prod.website-files.com/682f02eb02aa737158465c60/6837a72273b8cfafc60bbe10_key-icon.svg',
      title: 'Smart Trade-In',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.'
    }
  ];

  return (
    <section className="section no-padding-top">
      <div className="content-wrapper">
        <div className="heading-580px centered">
          <div className="subheadline-wrapper">
            <div className="subheadline-dot"></div>
            <div>Why Cruze?</div>
          </div>
          <h2 className="centered-heading">Why Choose Cruze for Your Luxury Journey</h2>
        </div>
        <div className="benefits-heading-divider">
          <div className="divider"></div>
        </div>
        <div className="home-benefits-wrapper">
          {benefits.map((benefit, index) => (
            <div key={index} className="home-benefit-item">
              <div className="home-benefit-heading">
                <img src={benefit.icon} loading="eager" alt={`${benefit.title} Icon`} className="benefit-icon" />
                <div className="extra-large-text text-400 centered">{benefit.title}</div>
              </div>
              <div className="small-text dusk-text centered">{benefit.description}</div>
              {index < benefits.length - 1 && <div className="benefits-divider"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

