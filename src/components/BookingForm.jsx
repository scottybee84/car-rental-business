import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import emailjs from "@emailjs/browser";
import "./BookingForm.css";

// EmailJS Configuration
const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
const EMAILJS_CUSTOMER_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID ||
  "YOUR_CUSTOMER_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

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
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Initialize EmailJS
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", { pickupDate, returnDate });
    // Validate dates are set
    if (!pickupDate || !returnDate) {
      alert("Please select both pickup and return dates.");
      return;
    }
    // Show availability modal
    console.log("Showing availability modal");
    setShowAvailabilityModal(true);
    console.log("showAvailabilityModal set to:", true);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Check if EmailJS is configured
      if (
        EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
        EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID" ||
        EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY"
      ) {
        console.warn(
          "EmailJS not configured. Please set up your EmailJS credentials."
        );
        console.log("Email data that would be sent:", {
          customer_name: contactForm.name,
          customer_email: contactForm.email,
          customer_phone: contactForm.phone,
          customer_message: contactForm.message || "No message provided",
          pickup_date: pickupDate,
          return_date: returnDate,
          pickup_location: pickupLocation,
          return_location: returnLocation,
          rental_days: pricing.days,
          rate_type: pricing.rateType,
          daily_rate: `€${pricing.dailyRate.toFixed(2)}/day`,
          airport_fee:
            pricing.airportFee > 0
              ? `€${pricing.airportFee.toFixed(2)}`
              : "€0.00",
          total_price: `€${pricing.total.toFixed(2)}`,
        });
        // Simulate success for development
        setSubmitStatus("success");
        setContactForm({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => {
          setShowAvailabilityModal(false);
          setSubmitStatus(null);
        }, 2000);
        return;
      }

      // Send email using EmailJS
      const templateParams = {
        to_email: "scottybee@gmail.com",
        customer_name: contactForm.name,
        customer_email: contactForm.email,
        customer_phone: contactForm.phone,
        customer_message: contactForm.message || "No message provided",
        pickup_date: pickupDate,
        return_date: returnDate,
        pickup_location: pickupLocation,
        return_location: returnLocation,
        rental_days: pricing.days.toString(),
        rate_type: pricing.rateType,
        daily_rate: `€${pricing.dailyRate.toFixed(2)}/day`,
        airport_fee:
          pricing.airportFee > 0
            ? `€${pricing.airportFee.toFixed(2)}`
            : "€0.00",
        total_price: `€${pricing.total.toFixed(2)}`,
      };

      // Send email to business
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      // Send auto-reply email to customer
      if (
        EMAILJS_CUSTOMER_TEMPLATE_ID &&
        EMAILJS_CUSTOMER_TEMPLATE_ID !== "YOUR_CUSTOMER_TEMPLATE_ID"
      ) {
        const customerTemplateParams = {
          customer_name: contactForm.name,
          customer_email: contactForm.email,
          pickup_date: pickupDate,
          return_date: returnDate,
          pickup_location: pickupLocation,
          return_location: returnLocation,
          rental_days: pricing.days.toString(),
          rate_type: pricing.rateType,
          daily_rate: `€${pricing.dailyRate.toFixed(2)}/day`,
          airport_fee:
            pricing.airportFee > 0
              ? `€${pricing.airportFee.toFixed(2)}`
              : "€0.00",
          total_price: `€${pricing.total.toFixed(2)}`,
        };

        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_CUSTOMER_TEMPLATE_ID,
          customerTemplateParams
        );
      }

      setSubmitStatus("success");
      setContactForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => {
        setShowAvailabilityModal(false);
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
      alert(
        "There was an error sending your request. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                      <option value="Mossautal Odenwald">
                        Mossautal Odenwald
                      </option>
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
                      <option value="Mossautal Odenwald">
                        Mossautal Odenwald
                      </option>
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
      {showPricingModal &&
        createPortal(
          <div
            className="pricing-modal-overlay"
            onClick={() => setShowPricingModal(false)}
          >
            <div className="pricing-modal" onClick={(e) => e.stopPropagation()}>
              <div className="pricing-modal-header">
                <h3 className="pricing-modal-title">How Pricing Works</h3>
                <button
                  className="pricing-modal-close"
                  onClick={() => setShowPricingModal(false)}
                  aria-label="Close modal"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
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
          </div>,
          document.body
        )}
      {showAvailabilityModal &&
        createPortal(
          <div
            className="availability-modal-overlay"
            onClick={() => setShowAvailabilityModal(false)}
          >
            <div
              className="availability-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="availability-modal-header">
                <h3 className="availability-modal-title">Check Availability</h3>
                <button
                  className="availability-modal-close"
                  onClick={() => setShowAvailabilityModal(false)}
                  aria-label="Close modal"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="availability-modal-content">
                <div className="availability-summary">
                  <h4 className="availability-summary-title">Rental Summary</h4>
                  <div className="availability-summary-details">
                    <div className="availability-summary-item">
                      <span className="availability-summary-label">
                        Pickup:
                      </span>
                      <span className="availability-summary-value">
                        {pickupDate} at {pickupLocation}
                      </span>
                    </div>
                    <div className="availability-summary-item">
                      <span className="availability-summary-label">
                        Return:
                      </span>
                      <span className="availability-summary-value">
                        {returnDate} at {returnLocation}
                      </span>
                    </div>
                    <div className="availability-summary-item availability-summary-item-no-border">
                      <span className="availability-summary-label">
                        Duration:
                      </span>
                      <span className="availability-summary-value">
                        {pricing.days} {pricing.days === 1 ? "day" : "days"}
                      </span>
                    </div>
                    <div className="availability-summary-total">
                      <span className="availability-summary-label">Total:</span>
                      <span className="availability-summary-total-value">
                        €{pricing.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <form
                  className="availability-contact-form"
                  onSubmit={handleContactSubmit}
                >
                  <div className="availability-form-field">
                    <label className="booking-label">NAME</label>
                    <input
                      type="text"
                      name="name"
                      className="booking-input"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="availability-form-field">
                    <label className="booking-label">EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      className="booking-input"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="availability-form-field">
                    <label className="booking-label">PHONE NUMBER</label>
                    <input
                      type="tel"
                      name="phone"
                      className="booking-input"
                      value={contactForm.phone}
                      onChange={handleContactChange}
                      required
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="availability-form-field">
                    <label className="booking-label">MESSAGE (OPTIONAL)</label>
                    <textarea
                      name="message"
                      className="booking-input booking-textarea"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      rows="4"
                      placeholder="Any special requests or questions..."
                    />
                  </div>
                  {submitStatus === "success" && (
                    <div className="availability-form-success">
                      Thank you! Your request has been submitted. We'll confirm
                      availability within a few hours.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="availability-form-error">
                      There was an error submitting your request. Please try
                      again or contact us directly.
                    </div>
                  )}
                  <button
                    type="submit"
                    className="booking-submit-button"
                    disabled={isSubmitting}
                  >
                    <span>
                      {isSubmitting ? "SUBMITTING..." : "SUBMIT REQUEST"}
                    </span>
                    {!isSubmitting && (
                      <img
                        src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/68306c3cc50945add9f5302d_364f727b295f3c1bcc98a650dc543d2e_right-arrow.svg"
                        loading="eager"
                        alt="Arrow"
                        className="button-icon"
                      />
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default BookingForm;
