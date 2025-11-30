import { useState } from 'react';
import BookingForm from './BookingForm';
import usFlag from '../assets/Flag_of_the_United_States.png';
import teslaFront from '../assets/2024-01-tesla-model-y-europe.jpg';
import teslaSide from '../assets/2022-tesla-model-y-1639687270.avif';
import teslaBack from '../assets/Tesla-Model-Y-Juniper-White-Interior_8ce811f1-4a61-44b1-8561-830330881453_2048x.webp';
import './Hero.css';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('Model Front View');
  const [isThumbnailsOpen, setIsThumbnailsOpen] = useState(false);

  const car = {
    name: 'Tesla Model Y',
    year: '2024',
    mileage: '20 KM',
    horsepower: '730 HP',
    engine: '6.5 L',
    price: '$450,000',
    monthly: '$8,100/mo',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    slug: 'tesla-model-y',
    images: {
      front: teslaFront,
      side: teslaSide,
      back: teslaBack
    }
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
                      <div className={`hero-tabs-menu w-tab-menu ${isThumbnailsOpen ? 'thumbnails-open' : ''}`}>
                        <button
                          type="button"
                          className="hero-thumbnails-toggle"
                          onClick={() => setIsThumbnailsOpen(!isThumbnailsOpen)}
                          aria-label="Toggle thumbnails"
                        >
                          <span className="thumbnails-toggle-icon">{isThumbnailsOpen ? '−' : '+'}</span>
                        </button>
                        <div className="hero-thumbnails-container">
                          <button
                            type="button"
                            className={`hero-tab-link w-inline-block w-tab-link ${activeTab === 'Model Front View' ? 'w--current' : ''}`}
                            onClick={() => {
                              setActiveTab('Model Front View');
                              setIsThumbnailsOpen(false);
                            }}
                            style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
                          >
                            <img 
                              loading="eager" 
                              src={car.images.front} 
                              alt="Front View" 
                              className="image-default"
                            />
                          </button>
                          <button
                            type="button"
                            className={`hero-tab-link w-inline-block w-tab-link ${activeTab === 'Model Side View' ? 'w--current' : ''}`}
                            onClick={() => {
                              setActiveTab('Model Side View');
                              setIsThumbnailsOpen(false);
                            }}
                            style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
                          >
                            <img 
                              loading="eager" 
                              src={car.images.side} 
                              alt="Side View" 
                              className="image-default"
                            />
                          </button>
                          <button
                            type="button"
                            className={`hero-tab-link w-inline-block w-tab-link ${activeTab === 'Model Back View' ? 'w--current' : ''}`}
                            onClick={() => {
                              setActiveTab('Model Back View');
                              setIsThumbnailsOpen(false);
                            }}
                            style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
                          >
                            <img 
                              loading="eager" 
                              src={car.images.back} 
                              alt="Back View" 
                              className="image-default"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="hero-tabs-content w-tab-content">
                        <div className={`hero-tab-pane w-tab-pane ${activeTab === 'Model Front View' ? 'w--tab-active' : ''}`}>
                          <div className="tab-pane-image-wrapper">
                            <img 
                              loading="eager" 
                              src={car.images.front} 
                              alt={car.name} 
                              className="image-default"
                            />
                          </div>
                        </div>
                        <div className={`hero-tab-pane w-tab-pane ${activeTab === 'Model Side View' ? 'w--tab-active' : ''}`}>
                          <div className="tab-pane-image-wrapper">
                            <img 
                              loading="eager" 
                              src={car.images.side} 
                              alt={car.name} 
                              className="image-default"
                            />
                          </div>
                        </div>
                        <div className={`hero-tab-pane w-tab-pane ${activeTab === 'Model Back View' ? 'w--tab-active' : ''}`}>
                          <div className="tab-pane-image-wrapper">
                            <img 
                              loading="eager" 
                              src={car.images.back} 
                              alt={car.name} 
                              className="image-default"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="slide-model-info-wrapper">
                      <div className="content-wrapper">
                        <div className="slide-model-info">
                          <div className="slide-model-info-item no-gap">
                            <div className="small-text pure-text">
                              <img 
                                src={usFlag} 
                                alt="United States Flag" 
                              />
                              Made for U.S. Travelers
                            </div>
                            <h1 className="_4x-large-text pure-text">Rent a Tesla Model Y in Germany</h1>
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
