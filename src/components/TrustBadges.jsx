import "./TrustBadges.css";

const TrustBadges = () => {
  const trustItems = [
    {
      icon: "🇺🇸",
      title: "English-speaking support",
      description: "All communication in English, no German required",
    },
    {
      icon: "📄",
      title: "No German paperwork required",
      description: "Simple process designed for U.S. travelers",
    },
    {
      icon: "✈️",
      title: "Airport pickup & return",
      description: "We bring the car directly to Frankfurt Airport",
    },
    {
      icon: "🚗",
      title: "Autopilot included",
      description: "Full Autopilot features on every rental",
    },
    {
      icon: "🔌",
      title: "Simple charging instructions",
      description: "Easy guide for charging on German roads",
    },
    {
      icon: "🇺🇸",
      title: "Designed for U.S. travelers",
      description: "Everything optimized for American visitors",
    },
  ];

  return (
    <section className="section trust-badges-section">
      <div className="content-wrapper">
        <div className="trust-badges-wrapper">
          {trustItems.map((item, index) => (
            <div key={index} className="trust-badge-item">
              <div className="trust-badge-icon">{item.icon}</div>
              <div className="trust-badge-content">
                <h3 className="trust-badge-title">{item.title}</h3>
                <p className="trust-badge-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;


