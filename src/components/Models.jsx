import { useState } from 'react';
import './Models.css';

const Models = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const models = [
    {
      name: 'Velox Horizon',
      year: '2023',
      price: '$550,000',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse varius enim.',
      image: 'https://cdn.prod.website-files.com/6834c0874e60f0c91fecf847/68599952fc6cbfe8bafaaf8b_front-view.webp',
      slug: 'velox-horizon'
    },
    {
      name: 'Luxora Zenith',
      year: '2024',
      price: '$500,000',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse varius enim.',
      image: 'https://cdn.prod.website-files.com/6834c0874e60f0c91fecf847/6859978177db08479b87d5fd_front-view.webp',
      slug: 'luxora-zenith'
    },
    {
      name: 'Luxora Pulse',
      year: '2025',
      price: '$280,000',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse varius enim.',
      image: 'https://cdn.prod.website-files.com/6834c0874e60f0c91fecf847/6859983a2acdac60aab364b1_front-view.webp',
      slug: 'luxora-pulse'
    },
    {
      name: 'Luxora Surge',
      year: '2022',
      price: '$300,000',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse varius enim.',
      image: 'https://cdn.prod.website-files.com/6834c0874e60f0c91fecf847/685998723c43700b29135c17_front-view.webp',
      slug: 'luxora-surge'
    },
    {
      name: 'Aurion Raptor',
      year: '2023',
      price: '$200,000',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse varius enim.',
      image: 'https://cdn.prod.website-files.com/6834c0874e60f0c91fecf847/685b312ce1f9479374ab203f_front-view.webp',
      slug: 'aurion-raptor'
    },
    {
      name: 'Luxora Apex',
      year: '2025',
      price: '$450,000',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse varius enim.',
      image: 'https://cdn.prod.website-files.com/6834c0874e60f0c91fecf847/685998ec9d16f932ec8b34c4_front-view.webp',
      slug: 'luxora-apex'
    }
  ];

  return (
    <>
      <section className="section-divider">
        <div className="content-wrapper">
          <div className="section-divider-wrapper">
            <div className="divider"></div>
          </div>
        </div>
      </section>
      <section className="section overflow-hidden">
        <div className="content-wrapper">
          <div className="models-heading-wrapper">
            <div className="models-subheadline">
              <div className="subheadline-wrapper">
                <div className="subheadline-dot"></div>
                <div>Our Models</div>
              </div>
            </div>
            <div className="models-heading-content">
              <div className="home-models-heading">
                <h2>Explore Our Elite Gallery of Stunning Luxury Cars</h2>
              </div>
              <div className="models-heading-text">
                <a href="/models" className="ghost-link-abyss-medium w-inline-block">
                  <div className="clip">
                    <div className="link-text-wrapper"><div>See All Models</div></div>
                    <div className="link-text-wrapper link-text-bottom"><div>See All Models</div></div>
                  </div>
                </a>
                <div className="small-text dusk-text right-align">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse varius enim.
                </div>
              </div>
            </div>
          </div>
          <div className="slider w-slider" data-autoplay="false">
            <div className="models-slider-mask w-slider-mask">
              {models.map((model, index) => (
                <div key={index} className="model-slide-item w-slide">
                  <a href={`/models/${model.slug}`} className="model-slide-card w-inline-block">
                    <img 
                      src={model.image} 
                      loading="eager" 
                      alt={model.name} 
                      className="image-default"
                    />
                    <div className="slide-model-details-wrapper">
                      <div className="model-details-top">
                        <h3 className="pure-heading">{model.name}</h3>
                        <div className="slide-model-year">
                          <div>{model.year}</div>
                        </div>
                      </div>
                      <div className="slide-model-bottom">
                        <div className="_3x-large-text pure-text">{model.price}</div>
                        <div className="small-text pure-text">{model.description}</div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <div 
              className="model-slider-arrow w-slider-arrow-left"
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            >
              <div className="clip slider-arrow-clip">
                <div className="link-text-wrapper">
                  <div className="w-icon-slider-left"></div>
                </div>
                <div className="link-text-wrapper link-text-bottom">
                  <div className="w-icon-slider-left"></div>
                </div>
              </div>
            </div>
            <div 
              className="model-slider-arrow w-slider-arrow-right"
              onClick={() => setCurrentSlide((prev) => Math.min(models.length - 1, prev + 1))}
            >
              <div className="clip">
                <div className="link-text-wrapper">
                  <div className="w-icon-slider-right"></div>
                </div>
                <div className="link-text-wrapper link-text-bottom">
                  <div className="w-icon-slider-right"></div>
                </div>
              </div>
            </div>
            <div className="models-slide-nav w-slider-nav w-slider-nav-invert w-round"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Models;

