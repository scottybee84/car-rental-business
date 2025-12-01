import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch('/src/data/blogPosts.json')
      .then(res => res.json())
      .then(data => {
        const foundPost = Array.isArray(data) 
          ? data.find(p => p.slug === slug)
          : null;
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading blog post:', err);
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <main>
          <div className="content-wrapper" style={{ padding: '4rem 0', textAlign: 'center' }}>
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <main>
          <div className="content-wrapper" style={{ padding: '4rem 0', textAlign: 'center' }}>
            <h1>Post Not Found</h1>
            <p>The blog post you're looking for doesn't exist.</p>
            <a href="/">Return to Home</a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Structured Data for Blog Post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.description,
    "image": post.image,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt || post.dateModified,
    "author": {
      "@type": "Organization",
      "name": "VoltVoyage"
    },
    "publisher": {
      "@type": "Organization",
      "name": "VoltVoyage",
      "logo": {
        "@type": "ImageObject",
        "url": "https://voltvoyages.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://voltvoyages.com/blog-posts/${post.slug}`
    },
    "keywords": post.keywords?.join(', ') || '',
    "articleSection": post.category
  };

  return (
    <div className="page-wrapper">
      <SEO
        title={`${post.title} | VoltVoyage Blog`}
        description={post.excerpt || post.description || `Read about ${post.title} on VoltVoyage`}
        keywords={post.keywords?.join(', ')}
        image={post.image}
        url={`/blog-posts/${post.slug}`}
        type="article"
        structuredData={structuredData}
        canonical={`https://voltvoyages.com/blog-posts/${post.slug}`}
      />
      <Navbar />
      <main>
        <article className="blog-post" style={{ padding: '4rem 0' }}>
          <div className="content-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                alignItems: 'center', 
                marginBottom: '1rem',
                fontSize: '0.9rem',
                color: '#666'
              }}>
                {post.category && (
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    fontWeight: '500'
                  }}>
                    {post.category}
                  </span>
                )}
                {post.readTime && <span>{post.readTime}</span>}
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}
              </div>
              <h1 style={{ 
                fontSize: '2.5rem', 
                lineHeight: '1.2', 
                marginBottom: '1rem',
                fontWeight: '700'
              }}>
                {post.title}
              </h1>
              {post.excerpt && (
                <p style={{ 
                  fontSize: '1.25rem', 
                  color: '#666', 
                  lineHeight: '1.6',
                  marginBottom: '2rem'
                }}>
                  {post.excerpt}
                </p>
              )}
            </header>
            
            {post.image && (
              <img 
                src={post.image} 
                alt={post.title} 
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  marginBottom: '2rem'
                }}
                loading="eager"
              />
            )}
            
            <div 
              className="blog-content" 
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#333'
              }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;

