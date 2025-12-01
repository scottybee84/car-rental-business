import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/src/data/blogPosts.json')
      .then(res => {
        if (!res.ok) {
          return [];
        }
        return res.json();
      })
      .then(data => {
        const posts = Array.isArray(data) ? data : [];
        setBlogPosts(posts);
        setLoading(false);
      })
      .catch(err => {
        console.warn('Error loading blog posts:', err);
        setBlogPosts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-wrapper">
      <SEO
        title="Blog | VoltVoyage Tesla Rental - Travel Tips & Guides"
        description="Expert tips, guides, and insights for renting a Tesla in Germany. Everything U.S. travelers need to know about Tesla rentals, charging, and German travel."
        keywords="tesla rental blog, germany travel tips, tesla charging guide, frankfurt airport rental, ev travel germany"
        url="/blog"
        canonical="https://voltvoyages.io/blog"
      />
      <Navbar />
      <main>
        <section className="section" style={{ padding: '4rem 0' }}>
          <div className="content-wrapper">
            <div className="heading-580px centered">
              <div className="subheadline-wrapper">
                <div className="subheadline-dot"></div>
                <div>Blog</div>
              </div>
              <h1>Our Blog</h1>
              <p className="small-text dusk-text centered">
                Expert tips, guides, and insights for renting a Tesla in Germany. Everything U.S. travelers need to know.
              </p>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <p>Loading blog posts...</p>
              </div>
            ) : blogPosts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <p>No blog posts available yet. Check back soon!</p>
              </div>
            ) : (
              <div className="blog-list" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem',
                marginTop: '3rem'
              }}>
                {blogPosts.map((post, index) => (
                  <Link 
                    key={index} 
                    to={`/blog-posts/${post.slug}`}
                    className="blog-card-link"
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block'
                    }}
                  >
                    <article className="blog-card" style={{
                      background: '#f0f0f0',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt={post.title}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover'
                          }}
                          loading="lazy"
                        />
                      )}
                      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ 
                          display: 'flex', 
                          gap: '1rem', 
                          alignItems: 'center',
                          marginBottom: '1rem',
                          fontSize: '0.875rem',
                          color: '#666'
                        }}>
                          {post.category && (
                            <span style={{
                              padding: '0.25rem 0.75rem',
                              backgroundColor: 'rgba(0, 0, 0, 0.1)',
                              borderRadius: '4px',
                              fontWeight: '500'
                            }}>
                              {post.category}
                            </span>
                          )}
                          {post.readTime && <span>{post.readTime}</span>}
                        </div>
                        <h2 style={{
                          fontSize: '1.5rem',
                          lineHeight: '1.3',
                          marginBottom: '0.75rem',
                          fontWeight: '700'
                        }}>
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p style={{
                            fontSize: '1rem',
                            color: '#666',
                            lineHeight: '1.6',
                            marginBottom: '1rem',
                            flex: 1
                          }}>
                            {post.excerpt}
                          </p>
                        )}
                        {post.author && (
                          <div style={{
                            fontSize: '0.875rem',
                            color: '#888',
                            marginTop: 'auto',
                            paddingTop: '1rem',
                            borderTop: '1px solid rgba(0, 0, 0, 0.1)'
                          }}>
                            By {post.author.name}
                          </div>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;

