import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Route-specific meta tags for better SEO
const routeMetaTags = {
  '/': {
    title: 'VoltVoyage - Rent a Tesla Model Y in Germany | U.S. Traveler Friendly',
    description: 'Rent a Tesla Model Y in Germany - Designed for U.S. Travelers. English support, Frankfurt Airport pickup, simple charging. From €89/day. Book your electric adventure today!',
    keywords: 'tesla rental germany, tesla model y rental, frankfurt airport tesla rental, electric car rental germany, us travelers germany, tesla rental frankfurt, ev rental germany',
    ogTitle: 'VoltVoyage - Tesla Model Y Rental in Germany | U.S. Traveler Friendly',
    ogDescription: 'Rent a Tesla Model Y in Germany - Designed for U.S. Travelers. English support, Frankfurt Airport pickup, simple charging. From €89/day.',
    canonical: 'https://voltvoyages.com/'
  },
  '/impressum': {
    title: 'Impressum | VoltVoyage Tesla Rental',
    description: 'Legal information and company details for VoltVoyage Tesla rental service in Germany.',
    keywords: 'voltvoyage impressum, legal information, company details',
    ogTitle: 'Impressum | VoltVoyage Tesla Rental',
    ogDescription: 'Legal information and company details for VoltVoyage Tesla rental service in Germany.',
    canonical: 'https://voltvoyages.com/impressum'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | VoltVoyage Tesla Rental',
    description: 'VoltVoyage privacy policy and data protection information. Learn how we handle your personal data when you rent a Tesla in Germany.',
    keywords: 'privacy policy, data protection, voltvoyage privacy',
    ogTitle: 'Privacy Policy | VoltVoyage Tesla Rental',
    ogDescription: 'VoltVoyage privacy policy and data protection information. Learn how we handle your personal data when you rent a Tesla in Germany.',
    canonical: 'https://voltvoyages.com/privacy-policy'
  },
  '/terms-of-service': {
    title: 'Terms of Service | VoltVoyage Tesla Rental',
    description: 'Terms of service for renting a Tesla Model Y in Germany with VoltVoyage. Rental requirements, policies, and terms for U.S. travelers.',
    keywords: 'terms of service, rental terms, voltvoyage terms',
    ogTitle: 'Terms of Service | VoltVoyage Tesla Rental',
    ogDescription: 'Terms of service for renting a Tesla Model Y in Germany with VoltVoyage. Rental requirements, policies, and terms for U.S. travelers.',
    canonical: 'https://voltvoyages.com/terms-of-service'
  }
};

function updateMetaTags(html, route) {
  const meta = routeMetaTags[route];
  if (!meta) return html;

  let updated = html;

  // Update title (both <title> and meta name="title")
  updated = updated.replace(
    /<title>.*?<\/title>/,
    `<title>${meta.title}</title>`
  );
  
  // Update meta name="title"
  if (updated.includes('<meta name="title"')) {
    updated = updated.replace(
      /<meta name="title" content="[^"]*"/,
      `<meta name="title" content="${meta.title}"`
    );
  }

  // Update or add meta description
  if (updated.includes('<meta name="description"')) {
    updated = updated.replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${meta.description}"`
    );
  } else {
    updated = updated.replace(
      '</head>',
      `  <meta name="description" content="${meta.description}" />\n  </head>`
    );
  }

  // Update keywords
  if (updated.includes('<meta name="keywords"')) {
    updated = updated.replace(
      /<meta name="keywords" content="[^"]*"/,
      `<meta name="keywords" content="${meta.keywords}"`
    );
  }

  // Update Open Graph tags
  if (updated.includes('<meta property="og:title"')) {
    updated = updated.replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${meta.ogTitle}"`
    );
  }
  if (updated.includes('<meta property="og:description"')) {
    updated = updated.replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${meta.ogDescription}"`
    );
  }
  
  // Update og:url
  if (updated.includes('<meta property="og:url"')) {
    updated = updated.replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${meta.canonical}"`
    );
  }

  // Update Twitter tags
  if (updated.includes('<meta name="twitter:title"')) {
    updated = updated.replace(
      /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${meta.ogTitle}"`
    );
  }
  if (updated.includes('<meta name="twitter:description"')) {
    updated = updated.replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${meta.ogDescription}"`
    );
  }
  if (updated.includes('<meta name="twitter:url"')) {
    updated = updated.replace(
      /<meta name="twitter:url" content="[^"]*"/,
      `<meta name="twitter:url" content="${meta.canonical}"`
    );
  }

  // Update canonical
  if (updated.includes('<link rel="canonical"')) {
    updated = updated.replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${meta.canonical}"`
    );
  } else {
    updated = updated.replace(
      '</head>',
      `  <link rel="canonical" href="${meta.canonical}" />\n  </head>`
    );
  }

  return updated;
}

function prerenderRoutes() {
  const distPath = join(__dirname, '../dist');
  const indexPath = join(distPath, 'index.html');
  
  if (!existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run "npm run build" first.');
    process.exit(1);
  }

  const baseHTML = readFileSync(indexPath, 'utf-8');
  
  console.log('📄 Prerendering static routes with route-specific meta tags...');
  
  Object.keys(routeMetaTags).forEach(route => {
    const outputPath = route === '/' 
      ? indexPath 
      : join(distPath, route, 'index.html');
    
    // Create directory if it doesn't exist
    if (route !== '/') {
      mkdirSync(dirname(outputPath), { recursive: true });
    }
    
    // Update HTML with route-specific meta tags
    const routeHTML = updateMetaTags(baseHTML, route);
    
    writeFileSync(outputPath, routeHTML, 'utf-8');
    console.log(`✅ Prerendered: ${route}`);
  });
  
  console.log('✅ Prerendering complete!');
  console.log('📝 Each route now has optimized meta tags for better SEO.');
}

prerenderRoutes();
