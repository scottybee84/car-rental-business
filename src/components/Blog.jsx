import { useState, useEffect } from 'react';
import './Blog.css';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load blog posts from JSON file
    // In production, this will be served from /src/data/blogPosts.json
    // During build, the file will be copied to dist
    fetch('/src/data/blogPosts.json')
      .then(res => {
        if (!res.ok) {
          // If file doesn't exist or fails, use empty array
          return [];
        }
        return res.json();
      })
      .then(data => {
        // Ensure we have an array
        const posts = Array.isArray(data) ? data : [];
        setBlogPosts(posts);
        setLoading(false);
      })
      .catch(err => {
        console.warn('Error loading blog posts:', err);
        // Fallback to empty array
        setBlogPosts([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="section">
        <div className="content-wrapper">
          <div className="heading-580px centered">
            <h2>Our Latest Posts</h2>
            <p className="small-text dusk-text centered">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  if (blogPosts.length === 0) {
    // Don't show blog section if no posts
    return null;
  }

  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];
  const otherPosts = blogPosts.filter(post => post.slug !== featuredPost?.slug).slice(0, 3);

  return (
    <section className="section">
      <div className="content-wrapper">
        <div className="heading-580px centered">
          <div className="subheadline-wrapper">
            <div className="subheadline-dot"></div>
            <div>Blog Posts</div>
          </div>
          <h2>Our Latest Posts</h2>
          <p className="small-text dusk-text centered">
            Expert tips, guides, and insights for renting a Tesla in Germany. Everything U.S. travelers need to know.
          </p>
        </div>
        <div className="latest-blogs-wrapper">
          {featuredPost && featuredPost.slug && (
            <a href={`/blog-posts/${featuredPost.slug}`} className="large-blog-card w-inline-block">
              {featuredPost.image && (
                <img 
                  src={featuredPost.image} 
                  loading="eager" 
                  alt={featuredPost.title} 
                  className="image-default home-image-copy"
                />
              )}
              <div className="listing-card home-blog-details">
                <div className="home-blog-info">
                  {featuredPost.category && (
                    <div className="latest-blog-category">
                      <div>{featuredPost.category}</div>
                    </div>
                  )}
                  {featuredPost.readTime && (
                    <div className="text-400">{featuredPost.readTime}</div>
                  )}
                </div>
                <h3 className="_3x-large-text">{featuredPost.title}</h3>
              </div>
            </a>
          )}
          <div className="w-dyn-list">
            <div className="latest-blog-list-2 w-dyn-items">
              {otherPosts.map((post, index) => (
                <a key={index} href={`/blog-posts/${post.slug}`} className="listing-card w-inline-block">
                  <div className="home-blog-info">
                    {post.category && (
                      <div className="latest-blog-category">
                        <div>{post.category}</div>
                      </div>
                    )}
                    {post.readTime && (
                      <div className="text-400">{post.readTime}</div>
                    )}
                  </div>
                  <h3 className="_3x-large-text">{post.title}</h3>
                </a>
              ))}
            </div>
          </div>
        </div>
        {blogPosts.length > 4 && (
          <div className="bottom-button">
            <div className="section-button">
              <a href="/blog" className="primary-button w-inline-block">
                <div className="clip">
                  <div className="link-text-wrapper"><div>Browse All Posts</div></div>
                  <div className="link-text-wrapper link-text-bottom"><div>Browse All Posts</div></div>
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
        )}
      </div>
    </section>
  );
};

export default Blog;
