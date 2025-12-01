import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  createReadStream,
} from "fs";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";

// Load puppeteer dynamically
async function loadPuppeteer() {
  try {
    const puppeteerModule = await import("puppeteer");
    return puppeteerModule.default;
  } catch (e) {
    try {
      // Try to use puppeteer from react-snap
      const reactSnapPath = join(
        __dirname,
        "../node_modules/react-snap/node_modules/puppeteer/index.js"
      );
      const puppeteerModule = await import(reactSnapPath);
      return puppeteerModule.default;
    } catch (e2) {
      console.error(
        "❌ Puppeteer not found. Install with: npm install puppeteer --save-dev"
      );
      throw new Error("Puppeteer not available");
    }
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Route-specific meta tags for better SEO
const routeMetaTags = {
  "/": {
    title:
      "VoltVoyage - Rent a Tesla Model Y in Germany | U.S. Traveler Friendly",
    description:
      "Rent a Tesla Model Y in Germany - Designed for U.S. Travelers. English support, Frankfurt Airport pickup, simple charging. From €89/day. Book your electric adventure today!",
    keywords:
      "tesla rental germany, tesla model y rental, frankfurt airport tesla rental, electric car rental germany, us travelers germany, tesla rental frankfurt, ev rental germany",
    ogTitle:
      "VoltVoyage - Tesla Model Y Rental in Germany | U.S. Traveler Friendly",
    ogDescription:
      "Rent a Tesla Model Y in Germany - Designed for U.S. Travelers. English support, Frankfurt Airport pickup, simple charging. From €89/day.",
    canonical: "https://voltvoyages.com/",
  },
  "/impressum": {
    title: "Impressum | VoltVoyage Tesla Rental",
    description:
      "Legal information and company details for VoltVoyage Tesla rental service in Germany.",
    keywords: "voltvoyage impressum, legal information, company details",
    ogTitle: "Impressum | VoltVoyage Tesla Rental",
    ogDescription:
      "Legal information and company details for VoltVoyage Tesla rental service in Germany.",
    canonical: "https://voltvoyages.com/impressum",
  },
  "/privacy-policy": {
    title: "Privacy Policy | VoltVoyage Tesla Rental",
    description:
      "VoltVoyage privacy policy and data protection information. Learn how we handle your personal data when you rent a Tesla in Germany.",
    keywords: "privacy policy, data protection, voltvoyage privacy",
    ogTitle: "Privacy Policy | VoltVoyage Tesla Rental",
    ogDescription:
      "VoltVoyage privacy policy and data protection information. Learn how we handle your personal data when you rent a Tesla in Germany.",
    canonical: "https://voltvoyages.com/privacy-policy",
  },
  "/terms-of-service": {
    title: "Terms of Service | VoltVoyage Tesla Rental",
    description:
      "Terms of service for renting a Tesla Model Y in Germany with VoltVoyage. Rental requirements, policies, and terms for U.S. travelers.",
    keywords: "terms of service, rental terms, voltvoyage terms",
    ogTitle: "Terms of Service | VoltVoyage Tesla Rental",
    ogDescription:
      "Terms of service for renting a Tesla Model Y in Germany with VoltVoyage. Rental requirements, policies, and terms for U.S. travelers.",
    canonical: "https://voltvoyages.com/terms-of-service",
  },
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
      "</head>",
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
      "</head>",
      `  <link rel="canonical" href="${meta.canonical}" />\n  </head>`
    );
  }

  return updated;
}

async function prerenderWithPuppeteer(route, distPath, puppeteer, port = 4173) {
  // Start a simple HTTP server to serve the dist folder
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
  };

  const server = createServer((req, res) => {
    let filePath = join(
      distPath,
      req.url === "/" ? "index.html" : req.url.split("?")[0]
    );

    // Handle route-based files (SPA fallback)
    if (!extname(filePath) || !existsSync(filePath)) {
      filePath = join(distPath, "index.html");
    }

    const ext = extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    if (existsSync(filePath)) {
      const stream = createReadStream(filePath);
      res.writeHead(200, { "Content-Type": contentType });
      stream.pipe(res);
    } else {
      // Fallback to index.html for SPA routes
      const indexPath = join(distPath, "index.html");
      if (existsSync(indexPath)) {
        const stream = createReadStream(indexPath);
        res.writeHead(200, { "Content-Type": "text/html" });
        stream.pipe(res);
      } else {
        res.writeHead(404);
        res.end("Not Found");
      }
    }
  });

  return new Promise((resolve, reject) => {
    server.listen(port, async () => {
      try {
        const browser = await puppeteer.launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();

        // Navigate to the route
        const url = `http://localhost:${port}${route}`;
        await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

        // Wait for React to render
        await page.waitForSelector("#root", { timeout: 10000 });

        // Wait for blog content to load (if it's a blog post)
        if (route.includes("/blog-posts/")) {
          await page
            .waitForSelector(".blog-content", { timeout: 5000 })
            .catch(() => {});
          await page.waitForTimeout(2000); // Extra wait for content
        } else if (route === "/blog") {
          await page.waitForTimeout(2000); // Wait for blog list to load
        }

        // Get the fully rendered HTML
        const html = await page.content();

        // Update meta tags if route has specific meta
        const finalHTML = updateMetaTags(html, route);

        await browser.close();
        server.close();
        resolve(finalHTML);
      } catch (error) {
        try {
          await browser.close();
        } catch (e) {}
        server.close();
        reject(error);
      }
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        // Port in use, try next port
        server.listen(port + 1);
      } else {
        reject(err);
      }
    });
  });
}

async function prerenderRoutes() {
  const distPath = join(__dirname, "../dist");
  const indexPath = join(distPath, "index.html");

  if (!existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run "npm run build" first.');
    process.exit(1);
  }

  // Load puppeteer
  let puppeteer;
  try {
    puppeteer = await loadPuppeteer();
  } catch (error) {
    console.error("❌ Could not load Puppeteer:", error.message);
    console.log(
      "⚠️  Falling back to meta tag updates only (no content rendering)"
    );
    // Fallback to meta tag updates only
    const baseHTML = readFileSync(indexPath, "utf-8");
    Object.keys(routeMetaTags).forEach((route) => {
      const outputPath =
        route === "/" ? indexPath : join(distPath, route, "index.html");
      if (route !== "/") {
        mkdirSync(dirname(outputPath), { recursive: true });
      }
      const routeHTML = updateMetaTags(baseHTML, route);
      writeFileSync(outputPath, routeHTML, "utf-8");
    });
    return;
  }

  console.log("📄 Prerendering routes with full React content...");

  // Prerender static routes
  for (const route of Object.keys(routeMetaTags)) {
    const outputPath =
      route === "/" ? indexPath : join(distPath, route, "index.html");

    // Create directory if it doesn't exist
    if (route !== "/") {
      mkdirSync(dirname(outputPath), { recursive: true });
    }

    try {
      console.log(`🔄 Rendering: ${route}...`);
      const routeHTML = await prerenderWithPuppeteer(
        route,
        distPath,
        puppeteer
      );
      writeFileSync(outputPath, routeHTML, "utf-8");
      console.log(`✅ Prerendered: ${route}`);
    } catch (error) {
      console.error(`❌ Error prerendering ${route}:`, error.message);
      // Fallback to meta tag update only
      const baseHTML = readFileSync(indexPath, "utf-8");
      const routeHTML = updateMetaTags(baseHTML, route);
      writeFileSync(outputPath, routeHTML, "utf-8");
      console.log(`⚠️  Fallback: ${route} (meta tags only)`);
    }
  }

  // Prerender blog posts
  const blogPostsPath = join(__dirname, "../src/data/blogPosts.json");
  if (existsSync(blogPostsPath)) {
    try {
      const blogPosts = JSON.parse(readFileSync(blogPostsPath, "utf-8"));

      if (Array.isArray(blogPosts) && blogPosts.length > 0) {
        console.log(`\n📝 Prerendering ${blogPosts.length} blog posts...`);

        for (const post of blogPosts) {
          if (post.slug) {
            const route = `/blog-posts/${post.slug}`;
            const outputPath = join(
              distPath,
              "blog-posts",
              post.slug,
              "index.html"
            );

            mkdirSync(dirname(outputPath), { recursive: true });

            try {
              console.log(`🔄 Rendering blog post: ${route}...`);
              const routeHTML = await prerenderWithPuppeteer(
                route,
                distPath,
                puppeteer
              );
              writeFileSync(outputPath, routeHTML, "utf-8");
              console.log(`✅ Prerendered: ${route}`);
            } catch (error) {
              console.error(`❌ Error prerendering ${route}:`, error.message);
            }
          }
        }
      }
    } catch (error) {
      console.warn("⚠️  Could not prerender blog posts:", error.message);
    }
  }

  // Prerender blog listing page
  const blogRoute = "/blog";
  const blogOutputPath = join(distPath, "blog", "index.html");
  mkdirSync(dirname(blogOutputPath), { recursive: true });

  try {
    console.log(`🔄 Rendering: ${blogRoute}...`);
    const blogHTML = await prerenderWithPuppeteer(
      blogRoute,
      distPath,
      puppeteer
    );
    writeFileSync(blogOutputPath, blogHTML, "utf-8");
    console.log(`✅ Prerendered: ${blogRoute}`);
  } catch (error) {
    console.error(`❌ Error prerendering ${blogRoute}:`, error.message);
  }

  console.log("\n✅ Prerendering complete!");
  console.log("📝 All routes now have fully rendered HTML content for SEO.");
}

prerenderRoutes().catch((error) => {
  console.error("❌ Prerendering failed:", error);
  process.exit(1);
});
