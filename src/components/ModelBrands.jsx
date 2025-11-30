import './ModelBrands.css';

const ModelBrands = () => {
  const brands = [
    {
      name: 'Aurion',
      image: 'https://cdn.prod.website-files.com/6834c0874e60f0c91fecf847/6854d69f4823cbb5a34e87f0_mercedes.webp',
      slug: 'aurion'
    },
    {
      name: 'Stratos',
      image: 'https://cdn.prod.website-files.com/6834c0874e60f0c91fecf847/6859c66ed170ce2116f3f52f_stratos.webp',
      slug: 'stratos'
    },
    {
      name: 'Velox',
      image: 'https://cdn.prod.website-files.com/6834c0874e60f0c91fecf847/6859ae97d0b876a1bf7a6b9b_velox.webp',
      slug: 'velox',
      large: true
    }
  ];

  return (
    <section className="section no-padding-top">
      <div className="content-wrapper">
        <div className="model-brands-wrapper">
          <div className="model-brands-content">
            <div className="model-brands-text">
              <div className="heading-480px">
                <div className="subheadline-wrapper">
                  <div className="subheadline-dot"></div>
                  <div>Model Brands</div>
                </div>
                <h2>Discover Top Brands of Our Stunning Models</h2>
              </div>
              <div className="section-button">
                <a href="/models" className="primary-button w-inline-block">
                  <div className="clip">
                    <div className="link-text-wrapper"><div>Explore Models</div></div>
                    <div className="link-text-wrapper link-text-bottom"><div>Explore Models</div></div>
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
            <div className="model-brands-small">
              {brands.filter(b => !b.large).map((brand, index) => (
                <a key={index} href={`/model-brands/${brand.slug}`} className="model-brand-item w-inline-block">
                  <img 
                    src={brand.image} 
                    loading="eager" 
                    alt={brand.name} 
                    className="image-default"
                  />
                  <div className="model-brand-name">
                    <div>{brand.name}</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="model-brand-large">
              {brands.filter(b => b.large).map((brand, index) => (
                <a key={index} href={`/model-brands/${brand.slug}`} className="model-brand-item w-inline-block">
                  <img 
                    src={brand.image} 
                    loading="eager" 
                    alt={brand.name} 
                    className="image-default"
                  />
                  <div className="model-brand-name">
                    <div>{brand.name}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelBrands;

