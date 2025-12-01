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
    // For routes without extensions, serve index.html (React Router will handle routing)
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
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--no-first-run",
            "--no-zygote",
            "--single-process"
          ],
          // Use a more compatible browser
          executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        });

        const page = await browser.newPage();
        
        // Set viewport for consistent rendering
        await page.setViewport({ width: 1280, height: 720 });

        // Enable console logging to see React errors
        page.on("console", (msg) => {
          const type = msg.type();
          const text = msg.text();
          // Log all console messages for debugging
          if (type === "error" || type === "warning") {
            console.log(`   Browser ${type}: ${text}`);
          }
        });

        page.on("pageerror", (error) => {
          console.log(`   Page error: ${error.message}`);
          console.log(`   Stack: ${error.stack}`);
        });
        
        // Log failed requests
        page.on("requestfailed", (request) => {
          console.log(`   Failed request: ${request.url()} - ${request.failure().errorText}`);
        });

        // Navigate to the route
        // Note: localhost is correct here - we're serving the dist folder locally to Puppeteer
        // This is the standard approach for prerendering. The final deployed site uses https://voltvoyages.io
        const url = `http://localhost:${port}${route}`;
        console.log(`   Navigating to: ${url} (localhost is correct for prerendering)`);

        try {
          // Set a longer timeout and wait for both DOM and network
          await page.goto(url, {
            waitUntil: ["domcontentloaded", "networkidle0"],
            timeout: 60000,
          });
        } catch (error) {
          console.log(`   Navigation error: ${error.message}`);
          // Try to continue anyway
        }

        // Wait for all scripts to load and execute
        await page.evaluate(() => {
          return new Promise((resolve) => {
            if (document.readyState === "complete") {
              // Wait for React to mount
              setTimeout(resolve, 2000);
            } else {
              window.addEventListener("load", () => {
                setTimeout(resolve, 2000);
              });
            }
          });
        });

        // Wait for React to render - check if scripts loaded
        await page.waitForSelector("#root", { timeout: 10000 });

        // Wait for JavaScript to execute and React to mount
        await page.evaluate(async () => {
          return new Promise((resolve) => {
            let attempts = 0;
            const maxAttempts = 100; // 10 seconds total

            const checkReact = () => {
              attempts++;
              const root = document.getElementById("root");

              // Check if React has rendered content
              if (
                root &&
                (root.children.length > 0 || root.innerHTML.trim().length > 0)
              ) {
                console.log("React content found!");
                resolve();
                return;
              }

              // Check if window is ready and scripts are loaded
              if (document.readyState === "complete" && (window.React || window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
                // React is loaded but not rendered yet, wait more
                if (attempts < maxAttempts) {
                  setTimeout(checkReact, 100);
                } else {
                  console.log("Timeout waiting for React content");
                  resolve();
                }
              } else if (attempts < maxAttempts) {
                setTimeout(checkReact, 100);
              } else {
                console.log("Max attempts reached, React may not have loaded");
                resolve();
              }
            };

            // Start checking
            if (document.readyState === "complete") {
              setTimeout(checkReact, 1000); // Wait 1 second for React to mount
            } else {
              window.addEventListener("load", () => {
                setTimeout(checkReact, 1000);
              });
            }
          });
        });

        // Check if root has content
        const initialContent = await page.evaluate(() => {
          const root = document.getElementById("root");
          return {
            length: root ? root.innerHTML.length : 0,
            children: root ? root.children.length : 0,
            text: root ? root.textContent.trim().length : 0,
          };
        });
        console.log(`   Initial content check:`, initialContent);

        // Wait for blog content to load (if it's a blog post)
        if (route.includes("/blog-posts/")) {
          // Wait for blog content specifically
          try {
            await page.waitForSelector(".blog-content", { timeout: 15000 });
            console.log(`   Found .blog-content selector`);
          } catch (e) {
            console.log(
              `   .blog-content not found, waiting for any content...`
            );
          }
          // Wait for content to load
          await new Promise((resolve) => setTimeout(resolve, 3000));
        } else if (route === "/blog") {
          // Wait for blog list to load
          await new Promise((resolve) => setTimeout(resolve, 3000));
        } else {
          // For other routes, wait for any content in root
          // Check if content appears
          let attempts = 0;
          while (attempts < 10) {
            const hasContent = await page.evaluate(() => {
              const root = document.getElementById("root");
              return (
                root &&
                (root.children.length > 0 || root.textContent.trim().length > 0)
              );
            });
            if (hasContent) {
              console.log(`   Content detected after ${attempts * 200}ms`);
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, 200));
            attempts++;
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        // Wait a bit more to ensure all async content is loaded
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the rendered content from the DOM
        const renderedContent = await page.evaluate(() => {
          const root = document.getElementById("root");
          if (!root) {
            console.error("Root element not found");
            return "";
          }

          // Debug info
          const debugInfo = {
            childrenCount: root.children.length,
            textLength: root.textContent ? root.textContent.trim().length : 0,
            innerHTMLLength: root.innerHTML.length,
            firstChildTag: root.firstElementChild
              ? root.firstElementChild.tagName
              : null,
          };
          console.log("Debug info:", JSON.stringify(debugInfo));

          // Get all the HTML content from root
          let content = root.innerHTML;

          // Check if we have actual content
          const hasChildren = root.children.length > 0;
          const hasText =
            root.textContent && root.textContent.trim().length > 0;

          if (!content.trim() && (hasChildren || hasText)) {
            // Content exists but innerHTML is empty, try to get it differently
            content = Array.from(root.children)
              .map((child) => child.outerHTML)
              .join("");
            if (!content && hasText) {
              // Fallback: at least get the text content wrapped in a div
              content = `<div>${root.textContent}</div>`;
            }
          }

          // If still empty, check if React has mounted
          if (!content.trim()) {
            // Check for React root
            const reactRoot = root._reactRootContainer || root.__reactContainer;
            if (reactRoot) {
              console.log("React root found but no content");
            }
          }

          return content || "";
        });

        console.log(
          `   Captured content length: ${renderedContent ? renderedContent.length : 0}`
        );

        // Get the base HTML
        const baseHTML = await page.content();

        // Inject the rendered content into the HTML using string manipulation (safer than regex)
        let html = baseHTML;
        const contentLength = renderedContent ? renderedContent.length : 0;

        if (renderedContent && renderedContent.trim()) {
          // Find the root div tag and replace its content
          const rootDivStart = html.indexOf('<div id="root"');
          if (rootDivStart !== -1) {
            // Find where the root div starts
            const rootDivTagEnd = html.indexOf(">", rootDivStart);
            if (rootDivTagEnd !== -1) {
              // Find where the root div closes (first </div> after the opening tag)
              const rootDivEnd = html.indexOf("</div>", rootDivTagEnd);
              if (rootDivEnd !== -1) {
                // Replace everything between the opening and closing tags
                const beforeRoot = html.substring(0, rootDivTagEnd + 1);
                const afterRoot = html.substring(rootDivEnd);
                html = beforeRoot + renderedContent + afterRoot;

                // Verify the replacement worked
                if (
                  !html.includes(
                    renderedContent.substring(
                      0,
                      Math.min(50, renderedContent.length)
                    )
                  )
                ) {
                  console.warn(
                    `⚠️  Content injection may have failed for route: ${route}`
                  );
                }
              } else {
                console.warn(
                  `⚠️  Could not find closing tag for root div in route: ${route}`
                );
              }
            } else {
              console.warn(
                `⚠️  Could not find root div tag end in route: ${route}`
              );
            }
          } else {
            console.warn(`⚠️  Could not find root div in route: ${route}`);
          }
        } else {
          console.warn(
            `⚠️  No content captured for route: ${route} (content length: ${contentLength})`
          );
        }

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

  // Prerender static routes (always prerender - they may have changed)
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

  // Prerender blog posts with caching
  // Strategy: Save prerendered HTML to a cache directory, reuse if post hasn't changed
  // This ensures consistent HTML for SEO and speeds up builds
  const blogPostsPath = join(__dirname, "../src/data/blogPosts.json");
  const cacheDir = join(__dirname, "../prerendered");
  const cacheIndexPath = join(cacheDir, "cache-index.json");

  // Load cache index (tracks which posts are cached and their metadata)
  let cacheIndex = {};
  if (existsSync(cacheIndexPath)) {
    try {
      cacheIndex = JSON.parse(readFileSync(cacheIndexPath, "utf-8"));
    } catch (e) {
      cacheIndex = {};
    }
  }

  if (existsSync(blogPostsPath)) {
    try {
      const blogPosts = JSON.parse(readFileSync(blogPostsPath, "utf-8"));

      if (Array.isArray(blogPosts) && blogPosts.length > 0) {
        console.log(`\n📝 Processing ${blogPosts.length} blog posts...`);

        let prerenderedPosts = 0;
        let cachedPosts = 0;
        let failedPosts = 0;
        const newCacheIndex = {};

        // Ensure cache directory exists
        mkdirSync(cacheDir, { recursive: true });
        mkdirSync(join(cacheDir, "blog-posts"), { recursive: true });

        for (const post of blogPosts) {
          if (post.slug) {
            const route = `/blog-posts/${post.slug}`;
            const cacheFilePath = join(
              cacheDir,
              "blog-posts",
              `${post.slug}.html`
            );
            const outputPath = join(
              distPath,
              "blog-posts",
              post.slug,
              "index.html"
            );

            // Create output directory
            mkdirSync(dirname(outputPath), { recursive: true });

            // Check if we can use cached version
            const cacheKey = post.slug;
            const cached = cacheIndex[cacheKey];
            const postHash = `${post.slug}-${post.publishedAt || post.title}`;

            if (
              cached &&
              cached.postHash === postHash &&
              existsSync(cacheFilePath)
            ) {
              // Post hasn't changed, use cached HTML
              const cachedHTML = readFileSync(cacheFilePath, "utf-8");
              writeFileSync(outputPath, cachedHTML, "utf-8");
              newCacheIndex[cacheKey] = cached; // Keep existing cache entry
              cachedPosts++;
              console.log(`💾 Using cached: ${route}`);
            } else {
              // Post is new or changed, prerender it
              try {
                console.log(`🔄 Rendering blog post: ${route}...`);
                const routeHTML = await prerenderWithPuppeteer(
                  route,
                  distPath,
                  puppeteer
                );

                // Save to both dist and cache
                writeFileSync(outputPath, routeHTML, "utf-8");
                writeFileSync(cacheFilePath, routeHTML, "utf-8");

                // Update cache index
                newCacheIndex[cacheKey] = {
                  slug: post.slug,
                  postHash: postHash,
                  publishedAt: post.publishedAt,
                  cachedAt: new Date().toISOString(),
                };

                console.log(`✅ Prerendered and cached: ${route}`);
                prerenderedPosts++;
              } catch (error) {
                console.error(`❌ Error prerendering ${route}:`, error.message);
                failedPosts++;
              }
            }
          }
        }

        // Save updated cache index
        writeFileSync(
          cacheIndexPath,
          JSON.stringify(newCacheIndex, null, 2),
          "utf-8"
        );

        console.log(
          `\n📊 Blog posts: ${prerenderedPosts} prerendered, ${cachedPosts} from cache, ${failedPosts} failed`
        );
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
