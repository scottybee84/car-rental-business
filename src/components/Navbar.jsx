import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div data-animation="over-left" className="navbar w-nav" role="banner">
      <div className="content-wrapper">
        <div className="navbar-wrapper">
          <div
            className="menu-button w-nav-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="menu-button-icon">
              <div className="top-line"></div>
              <div className="bottom-line"></div>
            </div>
          </div>
          <div className="nav-brand-wrapper">
            <a href="/" className="logo-link w-inline-block">
              <h3 className="logo-text">VOLTVOYAGE</h3>
            </a>
          </div>
          <div style={{ width: "40px" }}></div>
        </div>
      </div>
      <nav
        role="navigation"
        className={`nav-menu-content w-nav-menu ${isMenuOpen ? "w--open" : ""}`}
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        <div className="content-wrapper height-100--with-padding">
          <div className="nav-menu-list">
            <div className="menu-top">
              <div className="menu-brand-wrapper">
                <a href="/" className="logo-link w-inline-block">
                  <h3 className="logo-text">VOLTVOYAGE</h3>
                </a>
              </div>
              <div
                className="menu-button w-nav-button"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="menu-button-icon">
                  <div className="single-line"></div>
                </div>
              </div>
            </div>
            <div className="menu-list">
              <a href="/" className="nav-link w-inline-block">
                <div className="clip">
                  <div className="link-text-wrapper">
                    <div>Home</div>
                  </div>
                  <div className="link-text-wrapper link-text-bottom">
                    <div>Home</div>
                  </div>
                </div>
              </a>
              <a href="/about" className="nav-link w-inline-block">
                <div className="clip">
                  <div className="link-text-wrapper">
                    <div>About</div>
                  </div>
                  <div className="link-text-wrapper link-text-bottom">
                    <div>About</div>
                  </div>
                </div>
              </a>
              <a href="/models" className="nav-link w-inline-block">
                <div className="clip">
                  <div className="link-text-wrapper">
                    <div>Models</div>
                  </div>
                  <div className="link-text-wrapper link-text-bottom">
                    <div>Models</div>
                  </div>
                </div>
              </a>
              <a href="/blog" className="nav-link w-inline-block">
                <div className="clip">
                  <div className="link-text-wrapper">
                    <div>Blog</div>
                  </div>
                  <div className="link-text-wrapper link-text-bottom">
                    <div>Blog</div>
                  </div>
                </div>
              </a>
              <a href="/contact" className="nav-link w-inline-block">
                <div className="clip">
                  <div className="link-text-wrapper">
                    <div>Contact</div>
                  </div>
                  <div className="link-text-wrapper link-text-bottom">
                    <div>Contact</div>
                  </div>
                </div>
              </a>
              <div className="menu-button-wrapper">
                <a href="/contact" className="secondary-button w-inline-block">
                  <div className="clip">
                    <div className="link-text-wrapper">
                      <div>Book a Test Drive</div>
                    </div>
                    <div className="link-text-wrapper link-text-bottom">
                      <div>Book a Test Drive</div>
                    </div>
                  </div>
                  <img
                    src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/68308082b56f128f8b045c7b_button-arrow-abyss.svg"
                    width="16"
                    height="16"
                    loading="eager"
                    alt="Button Arrow"
                    className="button-icon"
                  />
                </a>
              </div>
            </div>
            <div className="menu-bottom">
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
                        width="24"
                        height="24"
                        loading="lazy"
                        alt="Instagram Logo"
                      />
                    </div>
                    <div className="link-text-wrapper link-text-bottom">
                      <img
                        src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/6833313e82b2956a91165f0c_instagram-logo.svg"
                        width="24"
                        height="24"
                        loading="lazy"
                        alt="Instagram Logo"
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
                        width="24"
                        height="24"
                        loading="lazy"
                        alt="X (Twitter Logo)"
                      />
                    </div>
                    <div className="link-text-wrapper link-text-bottom">
                      <img
                        src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/68332f4468fd043cc4dba57f_x-logo.svg"
                        width="24"
                        height="24"
                        loading="lazy"
                        alt="X (Twitter Logo)"
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
                        width="24"
                        height="24"
                        loading="lazy"
                        alt="TikTok Logo"
                      />
                    </div>
                    <div className="link-text-wrapper link-text-bottom">
                      <img
                        src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/683331394f76937e3aa0cfa4_tiktok-logo.svg"
                        width="24"
                        height="24"
                        loading="lazy"
                        alt="TikTok Logo"
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
                        width="24"
                        height="24"
                        loading="lazy"
                        alt="LinkedIn Logo"
                      />
                    </div>
                    <div className="link-text-wrapper link-text-bottom">
                      <img
                        src="https://cdn.prod.website-files.com/682f02eb02aa737158465c60/6833313b4e2987177082a2bb_linkedin-logo.svg"
                        width="24"
                        height="24"
                        loading="lazy"
                        alt="LinkedIn Logo"
                      />
                    </div>
                  </div>
                </a>
              </div>
              <div className="menu-bottom-links">
                <a
                  href="/style-guide"
                  className="ghost-link-pure-small w-inline-block"
                >
                  <div className="clip">
                    <div className="link-text-wrapper">
                      <div>Style Guide</div>
                    </div>
                    <div className="link-text-wrapper link-text-bottom">
                      <div>Style Guide</div>
                    </div>
                  </div>
                </a>
                <a
                  href="/licences"
                  className="ghost-link-pure-small w-inline-block"
                >
                  <div className="clip">
                    <div className="link-text-wrapper">
                      <div>Licences</div>
                    </div>
                    <div className="link-text-wrapper link-text-bottom">
                      <div>Licences</div>
                    </div>
                  </div>
                </a>
                <a
                  href="/changelog"
                  className="ghost-link-pure-small w-inline-block"
                >
                  <div className="clip">
                    <div className="link-text-wrapper">
                      <div>Changelog</div>
                    </div>
                    <div className="link-text-wrapper link-text-bottom">
                      <div>Changelog</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
