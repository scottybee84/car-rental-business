import { useState, useMemo } from "react";
import "./BookingForm.css";

const BookingForm = () => {
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState(
    "Frankfurt Airport (FRA)"
  );
  const [returnLocation, setReturnLocation] = useState(
    "Frankfurt Airport (FRA)"
  );
  const [showPricingModal, setShowPricingModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ pickupDate, returnDate, pickupLocation, returnLocation });
  };

  // Calculate minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  // Calculate minimum return date (pickup date or today)
  const minReturnDate = pickupDate || today;

  // Pricing calculation
  const BASE_RATE = 89; // €89 per day
  const WEEKLY_DISCOUNT = 0.2; // 20% off
  const MONTHLY_DISCOUNT = 0.4; // Additional 20% off (40% total)
  const AIRPORT_PICKUP_FEE = 59; // €59 for Frankfurt Airport pickup

  const pricing = useMemo(() => {
    // Check if Frankfurt Airport is selected in pickup and/or return location
    const hasPickupAirport = pickupLocation === "Frankfurt Airport (FRA)";
    const hasReturnAirport = returnLocation === "Frankfurt Airport (FRA)";

    if (!pickupDate || !returnDate) {
      return {
        days: 0,
        dailyRate: BASE_RATE,
        weeklyRate: BASE_RATE * (1 - WEEKLY_DISCOUNT),
        monthlyRate: BASE_RATE * (1 - MONTHLY_DISCOUNT),
        total: 0,
        rateType: "daily",
        airportFee: 0,
        pickupAirportFee: 0,
        returnAirportFee: 0,
        hasPickupAirport,
        hasReturnAirport,
      };
    }

    const pickup = new Date(pickupDate);
    const returnDateObj = new Date(returnDate);
    const days = Math.ceil((returnDateObj - pickup) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      return {
        days: 0,
        dailyRate: BASE_RATE,
        weeklyRate: BASE_RATE * (1 - WEEKLY_DISCOUNT),
        monthlyRate: BASE_RATE * (1 - MONTHLY_DISCOUNT),
        total: 0,
        rateType: "daily",
        airportFee: 0,
        pickupAirportFee: 0,
        returnAirportFee: 0,
        hasPickupAirport,
        hasReturnAirport,
      };
    }

    const dailyRate = BASE_RATE;
    const weeklyRate = BASE_RATE * (1 - WEEKLY_DISCOUNT); // €71.20/day
    const monthlyRate = BASE_RATE * (1 - MONTHLY_DISCOUNT); // €53.40/day

    let total = 0;
    let rateType = "daily";

    if (days >= 30) {
      total = days * monthlyRate;
      rateType = "monthly";
    } else if (days >= 7) {
      total = days * weeklyRate;
      rateType = "weekly";
    } else {
      total = days * dailyRate;
      rateType = "daily";
    }

    // Add airport pickup fees if applicable (once for pickup, once for return)
    const pickupAirportFee = hasPickupAirport ? AIRPORT_PICKUP_FEE : 0;
    const returnAirportFee = hasReturnAirport ? AIRPORT_PICKUP_FEE : 0;
    const airportFee = pickupAirportFee + returnAirportFee;
    total = total + airportFee;

    return {
      days,
      dailyRate,
      weeklyRate,
      monthlyRate,
      total: Math.round(total * 100) / 100,
      rateType,
      airportFee,
      pickupAirportFee,
      returnAirportFee,
      hasPickupAirport,
      hasReturnAirport,
    };
  }, [pickupDate, returnDate, pickupLocation, returnLocation]);

  // Extract airport flags for use in JSX
  const hasPickupAirport = pricing.hasPickupAirport;
  const hasReturnAirport = pricing.hasReturnAirport;

  return (
    <div className="booking-section-container">
      <div className="content-wrapper">
        <div className="booking-section-layout">
          {/* Left Side - Form */}
          <div className="booking-form-side">
            <form className="booking-form" onSubmit={handleSubmit}>
              <p className="form-intro-text">Simple, English, Stress-Free.</p>
              <div className="form-from-text">
                From €{pricing.dailyRate.toFixed(0)}/day
              </div>
              <div className="booking-form-fields">
                <div className="booking-form-row">
                  <div className="booking-form-field">
                    <label className="booking-label">PICKUP DATE</label>
                    <input
                      type="date"
                      className="booking-input"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={today}
                      placeholder="mm/dd/yyyy"
                      required
                    />
                  </div>
                  <div className="booking-form-field">
                    <label className="booking-label">RETURN DATE</label>
                    <input
                      type="date"
                      className="booking-input"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={minReturnDate}
                      placeholder="mm/dd/yyyy"
                      required
                    />
                  </div>
                </div>
                <div className="booking-form-row">
                  <div className="booking-form-field">
                    <label className="booking-label">PICKUP LOCATION</label>
                    <select
                      className="booking-input"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      required
                    >
                      <option value="Frankfurt Airport (FRA)">
                        Frankfurt Airport (FRA)
                      </option>
                      <option value="Frankfurt City Center">
                        Frankfurt City Center
                      </option>
                      <option value="Darmstadt">Darmstadt</option>
                      <option value="Heidelberg">Heidelberg</option>
                      <option value="Mannheim">Mannheim</option>
                      <option value="Home Delivery">Home Delivery</option>
                    </select>
                  </div>
                  <div className="booking-form-field">
                    <label className="booking-label">RETURN LOCATION</label>
                    <select
                      className="booking-input"
                      value={returnLocation}
                      onChange={(e) => setReturnLocation(e.target.value)}
                      required
                    >
                      <option value="Frankfurt Airport (FRA)">
                        Frankfurt Airport (FRA)
                      </option>
                      <option value="Frankfurt City Center">
                        Frankfurt City Center
                      </option>
                      <option value="Darmstadt">Darmstadt</option>
                      <option value="Heidelberg">Heidelberg</option>
                      <option value="Mannheim">Mannheim</option>
                      <option value="Home Pickup">Home Pickup</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="booking-submit-button">
                  <span>CHECK AVAILABILITY</span>
                  <img
                    src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/68306c3cc50945add9f5302d_364f727b295f3c1bcc98a650dc543d2e_right-arrow.svg"
                    loading="eager"
                    alt="Arrow"
                    className="button-icon"
                  />
                </button>
              </div>
              <div className="booking-form-footer">
                <p className="booking-form-note">
                  No German paperwork required.
                </p>
                <p className="booking-form-reassurance">
                  No payment required to check availability.
                </p>
                <p className="booking-form-microcopy">
                  Your request is non-binding. We confirm availability within a
                  few hours.
                </p>
              </div>
            </form>
          </div>

          {/* Right Side - Pricing Calculator */}
          <div className="pricing-calculator-side">
            <div className="pricing-calculator">
              <p className="pricing-includes-text">
                All prices include Autopilot + English support + Simple charging
                guide
              </p>
              <h3 className="pricing-calculator-title">Rental Rates</h3>
              <div className="pricing-rates">
                <div className="pricing-rate-item">
                  <span className="pricing-rate-label">Daily Rate</span>
                  <span className="pricing-rate-value">
                    €{pricing.dailyRate.toFixed(2)}/day
                  </span>
                </div>
                <div className="pricing-rate-item">
                  <span className="pricing-rate-label">Weekly Rate</span>
                  <span className="pricing-rate-value pricing-discounted">
                    €{pricing.weeklyRate.toFixed(2)}/day
                  </span>
                  <span className="pricing-discount-badge">20% off</span>
                </div>
                <div className="pricing-rate-item">
                  <span className="pricing-rate-label">Monthly Rate</span>
                  <span className="pricing-rate-value pricing-discounted">
                    €{pricing.monthlyRate.toFixed(2)}/day
                  </span>
                  <span className="pricing-discount-badge">40% off</span>
                </div>
                {hasPickupAirport && (
                  <div className="pricing-rate-item pricing-rate-item-with-description">
                    <div className="pricing-rate-item-content">
                      <span className="pricing-rate-label">
                        Frankfurt Airport pickup
                      </span>
                      <span className="pricing-rate-value">
                        +€{AIRPORT_PICKUP_FEE}
                      </span>
                    </div>
                    <small className="pricing-rate-description">
                      We bring the car directly to arrivals—no lines, no
                      paperwork.
                    </small>
                  </div>
                )}
                {hasReturnAirport && (
                  <div className="pricing-rate-item pricing-rate-item-with-description">
                    <div className="pricing-rate-item-content">
                      <span className="pricing-rate-label">
                        Frankfurt Airport return
                      </span>
                      <span className="pricing-rate-value">
                        +€{AIRPORT_PICKUP_FEE}
                      </span>
                    </div>
                    <small className="pricing-rate-description">
                      Drop your Tesla at the terminal and walk straight to your
                      gate.
                    </small>
                  </div>
                )}
              </div>
              <a
                href="#pricing-info"
                className="pricing-how-it-works-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPricingModal(true);
                }}
              >
                How pricing works →
              </a>
              {pricing.days > 0 && (
                <div className="pricing-total">
                  <p className="pricing-total-reassurance">
                    This is your final price. No hidden fees.
                  </p>
                  <div className="pricing-total-days">
                    {pricing.days} {pricing.days === 1 ? "day" : "days"} rental
                  </div>
                  <div className="pricing-total-amount">
                    <span className="pricing-total-label">Total:</span>
                    <span className="pricing-total-value">
                      €{pricing.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="pricing-total-rate-type">
                    {pricing.rateType === "monthly" && "Monthly rate applied"}
                    {pricing.rateType === "weekly" && "Weekly rate applied"}
                    {pricing.rateType === "daily" && "Daily rate applied"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showPricingModal && (
        <div
          className="pricing-modal-overlay"
          onClick={() => setShowPricingModal(false)}
        >
          <div className="pricing-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="pricing-modal-close"
              onClick={() => setShowPricingModal(false)}
            >
              ×
            </button>
            <h3 className="pricing-modal-title">How Pricing Works</h3>
            <div className="pricing-modal-content">
              <div className="pricing-modal-item">
                <strong>1–6 days</strong> = Daily rate
              </div>
              <div className="pricing-modal-item">
                <strong>7–29 days</strong> = Weekly rate (20% off)
              </div>
              <div className="pricing-modal-item">
                <strong>30+ days</strong> = Monthly rate (40% off)
              </div>
              <div className="pricing-modal-item">
                <strong>Airport pickup/return fees</strong> = +€59 each
              </div>
              <div className="pricing-modal-item">
                <strong>No hidden charges</strong> - What you see is what you
                pay
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
