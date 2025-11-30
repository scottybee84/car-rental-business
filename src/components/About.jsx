import './About.css';

const About = () => {
  return (
    <section className="section">
      <div className="content-wrapper">
        <div className="home-about-content">
          <div className="home-about-left">
            <div className="subheadline-wrapper">
              <div className="subheadline-dot"></div>
              <div>About Us</div>
            </div>
            <div className="metric-item about-metric-item">
              <div className="metric-number-wrapper">
                <div className="counter-numbers-wrapper">
                  <div className="counter-number-item number-1">
                    <div className="metric-number">5</div>
                    <div className="metric-number">4</div>
                    <div className="metric-number">3</div>
                    <div className="metric-number">2</div>
                    <div className="metric-number">1</div>
                    <div className="metric-number">5</div>
                    <div className="metric-number">4</div>
                    <div className="metric-number">3</div>
                    <div className="metric-number">2</div>
                    <div className="metric-number">5</div>
                  </div>
                  <div className="counter-number-item number-2">
                    <div className="metric-number">5</div>
                    <div className="metric-number">3</div>
                    <div className="metric-number">4</div>
                    <div className="metric-number">5</div>
                    <div className="metric-number">6</div>
                    <div className="metric-number">7</div>
                    <div className="metric-number">8</div>
                    <div className="metric-number">9</div>
                    <div className="metric-number">0</div>
                    <div className="metric-number">1</div>
                  </div>
                  <div className="counter-number-item number-1">
                    <div className="metric-number">0</div>
                    <div className="metric-number">1</div>
                    <div className="metric-number">2</div>
                    <div className="metric-number">3</div>
                    <div className="metric-number">4</div>
                    <div className="metric-number">5</div>
                    <div className="metric-number">6</div>
                    <div className="metric-number">7</div>
                    <div className="metric-number">8</div>
                    <div className="metric-number">0</div>
                  </div>
                </div>
                <div className="metric-plus-sign">+</div>
              </div>
              <div className="text-400">Models Sold</div>
            </div>
          </div>
          <div className="home-about-right">
            <div className="section-heading-wrapper">
              <h2>Discover Cruze Excellence, Where Elite Cars Meet Your Passion and Precision in Every Deal You Make!</h2>
            </div>
            <div className="home-about-text-wrapper">
              <div className="home-about-subheading">
                <div className="surge-text text-400">Find top luxury cars fast</div>
                <div className="home-about-image">
                  <img 
                    src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/6859a7c242a3c6b4bc97a7a2_side-view.webp" 
                    loading="eager" 
                    alt="About Image" 
                    className="image-default"
                  />
                  <div className="image-overlay"></div>
                </div>
              </div>
              <div className="home-about-text">
                <p className="small-text dusk-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. 
                  Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
                </p>
                <div className="section-button">
                  <a href="/about" className="primary-button w-inline-block">
                    <div className="clip">
                      <div className="link-text-wrapper"><div>Learn More</div></div>
                      <div className="link-text-wrapper link-text-bottom"><div>Learn More</div></div>
                    </div>
                    <img 
                      src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/68306c3cc50945add9f5302d_364f727b295f3c1bcc98a650dc543d2e_right-arrow.svg" 
                      loading="eager" 
                      alt="Button Arrow" 
                      className="button-icon"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

