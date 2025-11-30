import { useState } from "react";
import BookingForm from "./BookingForm";
import usFlag from "../assets/Flag_of_the_United_States.png";
import teslaFront from "../assets/2024-01-tesla-model-y-europe.jpg";
import teslaImage1 from "../assets/20210904_135626793_iOS-scaled-e1643025766682.jpg";
import teslaImage2 from "../assets/20210904_140215450_iOS-scaled-e1643025758256.jpg";
import teslaImage3 from "../assets/20210904_140405936_iOS-scaled-e1643025750431.jpg";
import teslaImage4 from "../assets/tesla1-scaled-e1643025740584.jpg";
import teslaImage5 from "../assets/tesla2-scaled-e1643025731686.jpg";
import "./Hero.css";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("Exterior View 1");
  const [isThumbnailsOpen, setIsThumbnailsOpen] = useState(false);

  const car = {
    name: "Tesla Model Y",
    year: "2024",
    mileage: "20 KM",
    horsepower: "730 HP",
    engine: "6.5 L",
    price: "$450,000",
    monthly: "$8,100/mo",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    slug: "tesla-model-y",
    images: {
      "Exterior View 1": teslaFront, // Keep the first image
      "Exterior View 2": teslaImage1,
      "Interior Dashboard": teslaImage2,
      "Exterior View 3": teslaImage3,
      "Trunk View": teslaImage4,
      "Rear Interior": teslaImage5,
    },
  };

  const imageKeys = Object.keys(car.images);
  const currentIndex = imageKeys.indexOf(activeTab);

  const goToPrevious = () => {
    const prevIndex =
      currentIndex === 0 ? imageKeys.length - 1 : currentIndex - 1;
    setActiveTab(imageKeys[prevIndex]);
  };

  const goToNext = () => {
    const nextIndex =
      currentIndex === imageKeys.length - 1 ? 0 : currentIndex + 1;
    setActiveTab(imageKeys[nextIndex]);
  };

  return (
    <section className="section home-hero-section">
      <div className="hero-slider-mask">
        <div className="hero-slide-item">
          <div className="hero-collection-wrapper">
            <div className="hero-collection-list">
              <div className="hero-collection-item">
                <div className="hero-slide-content">
                  <div className="hero-tabs-wrapper">
                    <div className="hero-tabs w-tabs">
                      <div
                        className={`hero-tabs-menu w-tab-menu ${isThumbnailsOpen ? "thumbnails-open" : ""}`}
                      >
                        <button
                          type="button"
                          className="hero-thumbnails-toggle"
                          onClick={() => setIsThumbnailsOpen(!isThumbnailsOpen)}
                          aria-label="Toggle thumbnails"
                        >
                          <span className="thumbnails-toggle-icon">
                            {isThumbnailsOpen ? "−" : "+"}
                          </span>
                        </button>
                        <div className="hero-thumbnails-container">
                          {Object.entries(car.images).map(([key, imageSrc]) => (
                            <button
                              key={key}
                              type="button"
                              className={`hero-tab-link w-inline-block w-tab-link ${activeTab === key ? "w--current" : ""}`}
                              onClick={() => {
                                setActiveTab(key);
                                setIsThumbnailsOpen(false);
                              }}
                              style={{
                                border: "none",
                                background: "transparent",
                                padding: 0,
                                cursor: "pointer",
                              }}
                            >
                              <img
                                loading="lazy"
                                src={imageSrc}
                                alt={key}
                                className="image-default"
                                width="80"
                                height="80"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="hero-tabs-content w-tab-content">
                        {Object.entries(car.images).map(
                          ([key, imageSrc], index) => (
                            <div
                              key={key}
                              className={`hero-tab-pane w-tab-pane ${activeTab === key ? "w--tab-active" : ""}`}
                              data-first-image={index === 0 ? "true" : "false"}
                            >
                              <div className="tab-pane-image-wrapper">
                                <img
                                  loading={index === 0 ? "eager" : "lazy"}
                                  fetchPriority={index === 0 ? "high" : "auto"}
                                  decoding={index === 0 ? "sync" : "async"}
                                  src={imageSrc}
                                  alt={car.name}
                                  className="image-default"
                                  width={index === 0 ? 1829 : 750}
                                  height={index === 0 ? 685 : 563}
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      {/* Mobile Navigation Arrows */}
                      <button
                        type="button"
                        className="hero-nav-arrow hero-nav-arrow-left"
                        onClick={goToPrevious}
                        aria-label="Previous image"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 18L9 12L15 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="hero-nav-arrow hero-nav-arrow-right"
                        onClick={goToNext}
                        aria-label="Next image"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 18L15 12L9 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="slide-model-info-wrapper">
                      <div className="content-wrapper">
                        <div className="slide-model-info">
                          <div className="slide-model-info-item no-gap">
                            <div className="small-text pure-text">
                              <img
                                src={usFlag}
                                alt="United States Flag"
                                width="36"
                                height="19"
                                loading="lazy"
                                decoding="async"
                                style={{
                                  width: "36px",
                                  height: "19px",
                                  objectFit: "contain",
                                }}
                              />
                              Made for U.S. Travelers
                            </div>
                            <p className="hero-sub-subline">
                              English support · Frankfurt Airport pickup ·
                              Simple charging
                            </p>
                            <h1 className="_4x-large-text pure-text">
                              Rent a Tesla Model Y in Germany – Designed for
                              U.S. Travelers
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-wrapper">
                    <div className="hero-slide-details">
                      <div className="hero-booking-form-wrapper">
                        <BookingForm />
                      </div>
                    </div>
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

export default Hero;
