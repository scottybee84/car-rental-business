import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateSitemap() {
  const baseUrl = process.env.SITE_URL || "https://voltvoyages.io";
  const currentDate = new Date().toISOString();

  // Read blog posts if they exist
  let blogPosts = [];
  const blogPostsPath = path.join(__dirname, "../src/data/blogPosts.json");
  if (fs.existsSync(blogPostsPath)) {
    try {
      const fileContent = fs.readFileSync(blogPostsPath, "utf-8");
      blogPosts = JSON.parse(fileContent);
    } catch (error) {
      console.warn("Could not read blog posts:", error.message);
    }
  }

  // Static pages
  const staticPages = [
    { loc: "", changefreq: "daily", priority: "1.0" },
    { loc: "/impressum", changefreq: "monthly", priority: "0.3" },
    { loc: "/privacy-policy", changefreq: "monthly", priority: "0.3" },
    { loc: "/terms-of-service", changefreq: "monthly", priority: "0.3" },
  ];

  // Blog posts
  const blogUrls = blogPosts.map((post) => ({
    loc: `/blog-posts/${post.slug}`,
    changefreq: "weekly",
    priority: "0.8",
    lastmod: post.publishedAt || currentDate,
  }));

  // Combine all URLs
  const urls = [
    ...staticPages.map((page) => ({
      ...page,
      loc: `${baseUrl}${page.loc || "/"}`,
      lastmod: currentDate,
    })),
    ...blogUrls.map((url) => ({
      ...url,
      loc: `${baseUrl}${url.loc}`,
    })),
  ];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  // Write to public directory
  const sitemapPath = path.join(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemap);

  // Log detailed information
  console.log(`✅ Sitemap generated with ${urls.length} URLs: ${sitemapPath}`);
  console.log(
    `📊 Static pages: ${staticPages.length}, Blog posts: ${blogUrls.length}`
  );
  if (blogUrls.length > 0) {
    console.log(`📝 Blog post URLs:`);
    blogUrls.slice(0, 5).forEach((url) => {
      console.log(`   - ${baseUrl}${url.loc}`);
    });
    if (blogUrls.length > 5) {
      console.log(`   ... and ${blogUrls.length - 5} more`);
    }
  }

  // Also copy to dist during build
  return sitemap;
}

// Run if called directly
if (
  import.meta.url.endsWith(process.argv[1]) ||
  process.argv[1]?.includes("generate-sitemap")
) {
  generateSitemap();
}

export { generateSitemap };
