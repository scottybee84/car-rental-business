import "./TrustTransparency.css";

const TrustTransparency = () => {
  const transparencyItems = [
    {
      icon: "📜",
      title: "U.S. Driver License Accepted",
      description: "Your valid U.S. driver's license is accepted in Germany. No international permit required for stays under 6 months.",
    },
    {
      icon: "🛡️",
      title: "Full Insurance Coverage",
      description: "Comprehensive insurance included. Collision damage waiver and third-party liability coverage are standard.",
    },
    {
      icon: "💰",
      title: "Transparent Pricing",
      description: "All-inclusive pricing means no hidden fees. The price you see includes Autopilot, insurance, and English support.",
    },
    {
      icon: "💳",
      title: "Security Deposit",
      description: "A refundable security deposit of $500 is required. Fully refunded upon return if no damage is found.",
    },
    {
      icon: "❌",
      title: "Cancellation Policy",
      description: "Free cancellation up to 48 hours before pickup. 50% refund for cancellations 24-48 hours before.",
    },
    {
      icon: "🔌",
      title: "Charging Instructions",
      description: "Simple charging guide included. We'll show you how to use German charging stations - it's easier than you think!",
    },
  ];

  return (
    <section className="section trust-transparency-section">
      <div className="content-wrapper">
        <div className="transparency-heading">
          <h2 className="section-heading">Trust & Transparency</h2>
          <p className="section-subheading">
            Everything you need to know upfront - no surprises
          </p>
        </div>
        <div className="transparency-grid">
          {transparencyItems.map((item, index) => (
            <div key={index} className="transparency-item">
              <div className="transparency-icon">{item.icon}</div>
              <div className="transparency-content">
                <h3 className="transparency-title">{item.title}</h3>
                <p className="transparency-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustTransparency;

