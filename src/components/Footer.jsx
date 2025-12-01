import { useNavigate, useLocation } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToBooking: true } });
      // Wait for navigation, then scroll
      setTimeout(() => {
        const formElement = document.querySelector(".booking-section-container");
        if (formElement) {
          formElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      const formElement = document.querySelector(".booking-section-container");
      if (formElement) {
        formElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <section className="footer">
      <div className="content-wrapper">
        <div className="footer-content-wrapper">
          <div className="footer-top">
            <div className="footer-heading">
              <h2 className="pure-heading">
                American-friendly Tesla rentals in Germany. Clean, simple,
                stress-free.
              </h2>
            </div>
            <div className="footer-info-wrapper">
              <div className="footer-links-wrapper">
                <div className="footer-links">
                  <a href="/" className="ghost-link-pure-small w-inline-block">
                    <div className="clip">
                      <div className="link-text-wrapper">
                        <div>Home</div>
                      </div>
                      <div className="link-text-wrapper link-text-bottom">
                        <div>Home</div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="footer-links">
                  <a
                    href="/impressum"
                    className="ghost-link-pure-small w-inline-block"
                  >
                    <div className="clip">
                      <div className="link-text-wrapper">
                        <div>Impressum</div>
                      </div>
                      <div className="link-text-wrapper link-text-bottom">
                        <div>Impressum</div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="/privacy-policy"
                    className="ghost-link-pure-small w-inline-block"
                  >
                    <div className="clip">
                      <div className="link-text-wrapper">
                        <div>Privacy Policy</div>
                      </div>
                      <div className="link-text-wrapper link-text-bottom">
                        <div>Privacy Policy</div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="/terms-of-service"
                    className="ghost-link-pure-small w-inline-block"
                  >
                    <div className="clip">
                      <div className="link-text-wrapper">
                        <div>Terms of Service</div>
                      </div>
                      <div className="link-text-wrapper link-text-bottom">
                        <div>Terms of Service</div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="footer-links">
                  <a
                    href="mailto:voyagesvolt@gmail.com"
                    className="ghost-link-pure-small w-inline-block"
                  >
                    <div className="clip">
                      <div className="link-text-wrapper">
                        <div>voyagesvolt@gmail.com</div>
                      </div>
                      <div className="link-text-wrapper link-text-bottom">
                        <div>voyagesvolt@gmail.com</div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://maps.google.com/?q=Braunstrasse+2-4+Michelstadt+Germany"
                    className="ghost-link-pure-small w-inline-block"
                  >
                    <div className="clip">
                      <div className="link-text-wrapper">
                        <div>Braunstrasse 2-4 Michelstadt, DE</div>
                      </div>
                      <div className="link-text-wrapper link-text-bottom">
                        <div>Braunstrasse 2-4 Michelstadt, DE</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="footer-cta">
                <div className="small-text pure-text">
                  Ready to rent a Tesla in Germany?
                </div>
                <a
                  href="#booking"
                  className="secondary-button w-inline-block"
                  onClick={handleCheckAvailability}
                >
                  <div className="clip">
                    <div className="link-text-wrapper">
                      <div>Check Availability</div>
                    </div>
                    <div className="link-text-wrapper link-text-bottom">
                      <div>Check Availability</div>
                    </div>
                  </div>
                  <img
                    src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/68308082b56f128f8b045c7b_button-arrow-abyss.svg"
                    loading="lazy"
                    alt="Button Arrow"
                    className="button-icon"
                    width="16"
                    height="16"
                  />
                </a>
              </div>
            </div>
          </div>
          <a href="/" className="footer-bottom w-inline-block">
            <span className="footer-logo-text">VOLTVOYAGE</span>
            <div className="footer-logo-gradient"></div>
          </a>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-bottom-full-width">
        <div className="content-wrapper">
          <div className="footer-info-bottom">
            <div className="small-text pure-text">
              © {new Date().getFullYear()} VOLTVOYAGE. All rights reserved.
            </div>
            <div className="social-media-links-wrapper">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-link w-inline-block"
              >
                <div className="clip">
                  <div className="link-text-wrapper">
                    <img
                      src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/6833313e82b2956a91165f0c_instagram-logo.svg"
                      loading="lazy"
                      alt="Instagram Logo"
                      width="24"
                      height="24"
                    />
                  </div>
                  <div className="link-text-wrapper link-text-bottom">
                    <img
                      src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/6833313e82b2956a91165f0c_instagram-logo.svg"
                      loading="lazy"
                      alt="Instagram Logo"
                      width="24"
                      height="24"
                    />
                  </div>
                </div>
              </a>
              <a
                href="https://www.x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-link w-inline-block"
              >
                <div className="clip">
                  <div className="link-text-wrapper">
                    <img
                      src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/68332f4468fd043cc4dba57f_x-logo.svg"
                      loading="lazy"
                      alt="X (Twitter Logo)"
                      width="24"
                      height="24"
                    />
                  </div>
                  <div className="link-text-wrapper link-text-bottom">
                    <img
                      src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/68332f4468fd043cc4dba57f_x-logo.svg"
                      loading="lazy"
                      alt="X (Twitter Logo)"
                      width="24"
                      height="24"
                    />
                  </div>
                </div>
              </a>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-link w-inline-block"
              >
                <div className="clip">
                  <div className="link-text-wrapper">
                    <img
                      src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/683331394f76937e3aa0cfa4_tiktok-logo.svg"
                      loading="lazy"
                      alt="TikTok Logo"
                      width="24"
                      height="24"
                    />
                  </div>
                  <div className="link-text-wrapper link-text-bottom">
                    <img
                      src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/683331394f76937e3aa0cfa4_tiktok-logo.svg"
                      loading="lazy"
                      alt="TikTok Logo"
                      width="24"
                      height="24"
                    />
                  </div>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-link w-inline-block"
              >
                <div className="clip">
                  <div className="link-text-wrapper">
                    <img
                      src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/6833313b4e2987177082a2bb_linkedin-logo.svg"
                      loading="lazy"
                      alt="LinkedIn Logo"
                      width="24"
                      height="24"
                    />
                  </div>
                  <div className="link-text-wrapper link-text-bottom">
                    <img
                      src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/6833313b4e2987177082a2bb_linkedin-logo.svg"
                      loading="lazy"
                      alt="LinkedIn Logo"
                      width="24"
                      height="24"
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
