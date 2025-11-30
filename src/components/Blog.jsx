import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      title: 'Top Lamborghini Aventador Review for Buyers',
      category: 'Reviews',
      readTime: '3 min read',
      image: 'https://cdn.prod.website-files.com/6834c0874e60f0c91fecf847/68599f21fd2c3d027c9422b0_blog-post-5.webp',
      slug: 'top-lamborghini-aventador-review-for-buyers',
      featured: true
    },
    {
      title: 'Exciting Cruze 2025 Model Launch Event Highlights',
      category: 'Events',
      readTime: '4 min read',
      slug: 'exciting-cruze-2025-model-launch-event-highlights',
      featured: false
    },
    {
      title: 'Ultimate McLaren 570S Performance Review',
      category: 'Reviews',
      readTime: '3 min read',
      slug: 'ultimate-mclaren-570s-performance-review',
      featured: false
    },
    {
      title: 'Smart Trade-In Tips for Upgrading Your Ride',
      category: 'Guides',
      readTime: '4 min read',
      slug: 'smart-trade-in-tips-for-upgrading-your-ride',
      featured: false
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse varius enim in eros elementum tristique duis cursus mi quis.
          </p>
        </div>
        <div className="latest-blogs-wrapper">
          {featuredPost && (
            <a href={`/blog-posts/${featuredPost.slug}`} className="large-blog-card w-inline-block">
              <img 
                src={featuredPost.image} 
                loading="eager" 
                alt={featuredPost.title} 
                className="image-default home-image-copy"
              />
              <div className="listing-card home-blog-details">
                <div className="home-blog-info">
                  <div className="latest-blog-category">
                    <div>{featuredPost.category}</div>
                  </div>
                  <div className="text-400">{featuredPost.readTime}</div>
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
                    <div className="latest-blog-category">
                      <div>{post.category}</div>
                    </div>
                    <div className="text-400">{post.readTime}</div>
                  </div>
                  <h3 className="_3x-large-text">{post.title}</h3>
                </a>
              ))}
            </div>
          </div>
        </div>
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
      </div>
    </section>
  );
};

export default Blog;

