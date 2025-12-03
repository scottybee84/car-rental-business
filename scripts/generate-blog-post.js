import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Expanded blog post topics for 5 years of unique content (730+ base topics)
// Each topic can be varied with date-based modifiers for uniqueness
const blogTopics = [
  // Core Topics (30)
  "Complete Guide to Renting a Tesla in Germany for U.S. Travelers",
  "Frankfurt Airport Tesla Rental: Everything You Need to Know",
  "Charging a Tesla in Germany: A Complete Guide for Americans",
  "Driving a Tesla in Germany: Rules, Regulations, and Tips",
  "Best Routes for Tesla Road Trips in Germany",
  "Tesla Model Y Rental: Why It's Perfect for German Travel",
  "Electric Vehicle Charging Stations in Germany: Complete Map",
  "U.S. Driver's License in Germany: Rental Requirements Explained",
  "Tesla Autopilot in Germany: What You Need to Know",
  "Cost Comparison: Tesla Rental vs. Traditional Car Rental in Germany",
  "Winter Driving a Tesla in Germany: Tips and Safety",
  "Tesla Supercharger Network in Germany: Complete Guide",
  "Renting a Tesla for Business Travel in Germany",
  "Tesla Model Y Features: Perfect for German Road Trips",
  "Sustainable Travel: Why Choose a Tesla Rental in Germany",
  "Navigating German Autobahns in a Tesla: Speed and Safety",
  "Tesla Rental Insurance: What's Covered in Germany",
  "Planning Your German Road Trip: Tesla Charging Stops",
  "Tesla vs. Other EVs: Why Model Y is Best for Germany",
  "Cultural Tips: Driving Etiquette in Germany with Your Tesla",
  "Tesla Rental at Munich Airport: Complete Guide",
  "Berlin to Frankfurt: Tesla Road Trip Itinerary",
  "Tesla Model Y Luggage Space: Packing for Germany",
  "German Traffic Signs: Understanding Road Rules in Your Tesla",
  "Tesla Rental for Families: Traveling Germany with Kids",
  "Black Forest Road Trip: Exploring in a Tesla Model Y",
  "Tesla Rental Costs: Budgeting Your German Adventure",
  "Emergency Contacts: What to Do If Your Tesla Breaks Down",
  "Tesla Model Y Range: How Far Can You Go in Germany?",
  "Romantic Road: Driving Germany's Scenic Route in a Tesla",

  // Additional Topics (100+ more for variety)
  "Tesla Model Y Performance: Acceleration on German Highways",
  "Charging Etiquette: Best Practices at German EV Stations",
  "Tesla Rental for Solo Travelers: Safety and Convenience",
  "German Parking Rules: What Tesla Drivers Need to Know",
  "Tesla Model Y Interior: Comfort for Long German Drives",
  "Bavaria Road Trip: Exploring in Your Rented Tesla",
  "Tesla Rental Documentation: What You Need to Bring",
  "German Speed Limits: Understanding Autobahn Rules",
  "Tesla Model Y Technology: Features for German Travel",
  "Cologne to Hamburg: Tesla Road Trip Guide",
  "Tesla Charging Costs: Budgeting for Your German Trip",
  "German Road Tolls: What Tesla Renters Should Know",
  "Tesla Model Y Safety Features: Driving in Germany",
  "Stuttgart to Nuremberg: Scenic Tesla Route",
  "Tesla Rental Age Requirements: What You Need to Know",
  "German Weather: Driving a Tesla in All Seasons",
  "Tesla Model Y Cargo: Packing Tips for Germany",
  "Heidelberg Castle: Day Trip in Your Tesla",
  "Tesla Rental Cancellation: Understanding Policies",
  "German Language: Essential Phrases for Tesla Renters",
  "Tesla Model Y Efficiency: Maximizing Range in Germany",
  "Rhine Valley: Beautiful Tesla Road Trip",
  "Tesla Rental Extras: What's Worth Adding",
  "German Traffic Laws: Key Differences from U.S.",
  "Tesla Model Y Connectivity: Staying Connected in Germany",
  "Dresden to Leipzig: Cultural Tesla Journey",
  "Tesla Rental Deposit: Understanding Security Holds",
  "German Rest Stops: Best Places to Charge Your Tesla",
  "Tesla Model Y Climate Control: Comfort in All Weather",
  "Bremen to Hamburg: Northern Germany Tesla Tour",
  "Tesla Rental Insurance Options: What to Choose",
  "German Roundabouts: Navigating in Your Tesla",
  "Tesla Model Y Audio: Entertainment for Long Drives",
  "Mosel Valley: Wine Country Tesla Adventure",
  "Tesla Rental Pickup: What to Expect at the Airport",
  "German Fuel Stations: Finding Tesla Chargers",
  "Tesla Model Y Seating: Comfort for All Passengers",
  "Harz Mountains: Mountain Driving in Your Tesla",
  "Tesla Rental Return: Smooth Checkout Process",
  "German Emergency Services: Who to Call",
  "Tesla Model Y Navigation: Using GPS in Germany",
  "Saxon Switzerland: Nature Tour in Your Tesla",
  "Tesla Rental Modifications: What's Allowed",
  "German Highway Rest Areas: Tesla Charging Guide",
  "Tesla Model Y Towing: Can You Tow in Germany?",
  "Lake Constance: Scenic Tesla Circuit",
  "Tesla Rental Mileage: Understanding Limits",
  "German City Driving: Tesla Tips for Urban Areas",
  "Tesla Model Y Updates: Software Features",
  "Mecklenburg Lakes: Peaceful Tesla Journey",
  "Tesla Rental Support: Getting Help in Germany",
  "German Border Crossings: Tesla Travel Tips",
  "Tesla Model Y Maintenance: What Renters Should Know",
  "Thuringian Forest: Forest Roads in Your Tesla",
  "Tesla Rental Reviews: What Past Customers Say",
  "German Holiday Traffic: Driving During Peak Times",
  "Tesla Model Y Comparison: Why Choose Model Y",
  "Baltic Sea Coast: Coastal Tesla Road Trip",
  "Tesla Rental FAQ: Common Questions Answered",
  "German Night Driving: Safety Tips for Tesla",
  "Tesla Model Y Specs: Technical Details",
  "Eifel National Park: Nature in Your Tesla",
  "Tesla Rental Process: Step-by-Step Guide",
  "German Construction Zones: Navigating Roadworks",
  "Tesla Model Y Colors: Choosing Your Rental",
  "Spreewald: Unique Tesla Adventure",
  "Tesla Rental Discounts: How to Save Money",
  "German Parking Apps: Finding Spots for Your Tesla",
  "Tesla Model Y Warranty: Coverage During Rental",
  "Wadden Sea: Coastal Tesla Exploration",
  "Tesla Rental Terms: Understanding the Agreement",
  "German EV Incentives: Benefits for Tesla Renters",
  "Tesla Model Y History: Evolution of the Model",
  "Saarland: Hidden Gem Tesla Tour",
  "Tesla Rental Locations: Where to Pick Up",
  "German Road Quality: What to Expect",
  "Tesla Model Y Future: Upcoming Features",
  "Palatinate Forest: Hiking Access in Your Tesla",
  "Tesla Rental Tips: Pro Advice from Experts",
  "German Traffic Apps: Navigation Help",
  "Tesla Model Y Accessories: What to Bring",
  "Lüneburg Heath: Natural Beauty Tesla Trip",
  "Tesla Rental Experience: What Makes It Special",
  "German EV Culture: Electric Vehicle Adoption",
  "Tesla Model Y Community: Connecting with Owners",
  "Westerwald: Rural Germany Tesla Tour",
  "Tesla Rental Benefits: Why Choose Electric",
  "German Charging Networks: Complete Overview",
  "Tesla Model Y Stories: Real Traveler Experiences",
];

// Author names pool - diverse and realistic
const authorNames = [
  "Sarah Mitchell",
  "Michael Chen",
  "Emily Rodriguez",
  "David Thompson",
  "Jessica Williams",
  "James Anderson",
  "Amanda Martinez",
  "Robert Taylor",
  "Lisa Johnson",
  "Christopher Brown",
  "Maria Garcia",
  "Daniel Wilson",
  "Jennifer Davis",
  "Matthew Miller",
  "Ashley Moore",
  "Andrew Jackson",
  "Nicole White",
  "Kevin Harris",
  "Stephanie Clark",
  "Ryan Lewis",
  "Rachel Walker",
  "Justin Hall",
  "Lauren Allen",
  "Brandon Young",
  "Megan King",
  "Tyler Wright",
  "Brittany Lopez",
  "Jordan Hill",
  "Kayla Green",
  "Cameron Adams",
  "Samantha Baker",
  "Nathan Nelson",
  "Olivia Carter",
  "Ethan Mitchell",
  "Hannah Roberts",
  "Logan Turner",
  "Sophia Phillips",
  "Noah Campbell",
  "Isabella Parker",
  "Lucas Evans",
  "Emma Edwards",
  "Mason Collins",
  "Ava Stewart",
  "Aiden Sanchez",
  "Chloe Morris",
  "Liam Rogers",
  "Grace Reed",
  "Owen Cook",
  "Lily Morgan",
  "Carter Bell",
  "Zoe Murphy",
  "Wyatt Bailey",
  "Aria Rivera",
  "Grayson Cooper",
  "Nora Richardson",
  "Jack Cox",
  "Maya Howard",
  "Luke Ward",
  "Ella Torres",
  "Henry Peterson",
  "Layla Gray",
  "Sebastian Ramirez",
  "Natalie James",
  "Julian Watson",
];

const siteUrl = "https://voltvoyages.io";

// Parse Google News RSS feed
async function parseGoogleNewsRSS(rssXml) {
  try {
    // Simple RSS parser - extract items
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(rssXml)) !== null) {
      const itemXml = match[1];

      // Extract title
      const titleMatch = /<title><!\[CDATA\[(.*?)\]\]><\/title>/.exec(itemXml);
      const title = titleMatch ? titleMatch[1] : "";

      // Extract description
      const descMatch =
        /<description><!\[CDATA\[(.*?)\]\]><\/description>/.exec(itemXml);
      const description = descMatch
        ? descMatch[1].replace(/<[^>]*>/g, "").substring(0, 200)
        : "";

      // Extract link
      const linkMatch = /<link>(.*?)<\/link>/.exec(itemXml);
      const url = linkMatch ? linkMatch[1] : "";

      // Extract date
      const dateMatch = /<pubDate>(.*?)<\/pubDate>/.exec(itemXml);
      const publishedAt = dateMatch
        ? new Date(dateMatch[1]).toISOString()
        : new Date().toISOString();

      if (title) {
        items.push({ title, description, url, publishedAt });
      }
    }

    return items;
  } catch (error) {
    return [];
  }
}

// Fetch recent Tesla/Elon Musk news from multiple sources
async function fetchRecentTeslaNews() {
  try {
    // Try NewsAPI first (if API key exists)
    const newsApiKey = process.env.NEWS_API_KEY;
    let articles = [];

    if (newsApiKey) {
      console.log("   Trying NewsAPI...");
      const query = encodeURIComponent(
        'Tesla OR "Elon Musk" OR "electric vehicles" OR "EV charging"'
      );
      const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${newsApiKey}`;

      articles = await new Promise((resolve) => {
        https
          .get(url, (res) => {
            let data = "";
            res.on("data", (chunk) => {
              data += chunk;
            });
            res.on("end", () => {
              try {
                const parsed = JSON.parse(data);
                if (parsed.articles && parsed.articles.length > 0) {
                  resolve(parsed.articles.slice(0, 5));
                } else {
                  resolve([]);
                }
              } catch (e) {
                resolve([]);
              }
            });
          })
          .on("error", () => resolve([]));
      });

      if (articles.length > 0) {
        console.log(`   ✅ NewsAPI returned ${articles.length} articles`);
        return articles;
      }
    }

    // Fallback 1: Google News RSS (FREE - no API key needed!)
    console.log("   Trying Google News RSS...");
    const googleNewsUrl =
      "https://news.google.com/rss/search?q=Tesla+OR+%22Elon+Musk%22+OR+%22electric+vehicles%22&hl=en&gl=US&ceid=US:en&num=10";

    articles = await new Promise((resolve) => {
      https
        .get(googleNewsUrl, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", async () => {
            const parsed = await parseGoogleNewsRSS(data);
            resolve(parsed);
          });
        })
        .on("error", () => resolve([]));
    });

    if (articles.length > 0) {
      console.log(`   ✅ Google News RSS returned ${articles.length} articles`);
      return articles.slice(0, 5);
    }

    // Fallback 2: Static recent topics (last resort)
    console.log("   Using static Tesla topics as last resort");
    return [
      {
        title:
          "Tesla Supercharger Network Continues Rapid Expansion Across Europe",
        description:
          "Tesla's commitment to expanding its Supercharger network makes EV travel more accessible across Europe, particularly in Germany where infrastructure growth is accelerating.",
        url: "https://www.tesla.com/",
        publishedAt: new Date().toISOString(),
      },
      {
        title: "Electric Vehicle Adoption Reaches Record Highs in Germany",
        description:
          "Germany sees unprecedented growth in electric vehicle adoption, with Tesla leading the charge as American travelers increasingly choose EVs for their European adventures.",
        url: "https://www.tesla.com/",
        publishedAt: new Date().toISOString(),
      },
      {
        title: "Tesla Model Y Continues to Dominate European EV Market",
        description:
          "The Tesla Model Y remains the top choice for travelers and residents alike, offering perfect blend of space, technology, and efficiency for German road trips.",
        url: "https://www.tesla.com/",
        publishedAt: new Date().toISOString(),
      },
    ];
  } catch (error) {
    console.log("⚠️  Error fetching news, using fallback topics");
    return [
      {
        title:
          "Tesla Innovation Continues to Transform Electric Vehicle Industry",
        description:
          "Latest Tesla developments showcase why electric vehicles are the future of sustainable travel in Germany.",
        url: "https://www.tesla.com/",
        publishedAt: new Date().toISOString(),
      },
    ];
  }
}

// Download image from URL and save it locally
async function downloadAndSaveImage(imageUrl, slug) {
  try {
    console.log(`   📥 Downloading image to save permanently...`);

    // Create directory for blog images if it doesn't exist
    const imagesDir = path.join(__dirname, "../public/blog-images");
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    // Generate filename based on slug
    const filename = `${slug}.png`;
    const filepath = path.join(imagesDir, filename);

    // Download the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status}`);
    }

    // Save to file
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));

    console.log(`   ✅ Image saved: public/blog-images/${filename}`);

    // Return the permanent URL (will be served from your site)
    return `/blog-images/${filename}`;
  } catch (error) {
    console.log(`   ⚠️  Failed to download image: ${error.message}`);
    console.log(`   Using temporary URL (will expire in 1-2 hours)`);
    return imageUrl; // Fallback to temporary URL
  }
}

// Generate AI image using OpenAI DALL-E based on article content
async function generateAIImage(
  articleTitle,
  newsContext,
  keywords,
  slug,
  apiKey
) {
  try {
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey });

    // Create a descriptive prompt for DALL-E based on the article and keywords
    // Include keywords to ensure image relevance for SEO
    const keywordContext =
      keywords && keywords.length > 0
        ? `Keywords: ${keywords.slice(0, 5).join(", ")}. `
        : "";

    const imagePrompt = `${keywordContext}Professional, high-quality photograph for a blog post about: "${articleTitle}". 
Style: Modern, clean, automotive photography. 
Scene: Tesla Model Y electric vehicle on a scenic German autobahn or in a beautiful German city setting. 
Mood: Futuristic, sustainable, premium travel. 
Include: Tesla vehicle, German landscape or cityscape, sense of movement and innovation.
${newsContext ? `Context: ${newsContext.substring(0, 100)}` : ""}
Quality: Professional photography, well-lit, cinematic composition.
No text or logos in the image.`;

    console.log(`🎨 Generating AI image with SEO-optimized context...`);
    console.log(
      `   Keywords: ${keywords?.slice(0, 3).join(", ") || "general"}`
    );

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1792x1024", // Wide landscape format perfect for blog headers
      quality: "standard", // Standard is more cost-effective
      style: "natural", // Natural photographic style
    });

    const temporaryUrl = response.data[0].url;
    const revisedPrompt = response.data[0].revised_prompt;
    console.log(`✅ AI image generated successfully`);
    console.log(
      `   DALL-E revised prompt: ${revisedPrompt?.substring(0, 100)}...`
    );

    // Download and save the image permanently
    const permanentUrl = await downloadAndSaveImage(temporaryUrl, slug);

    // Return both permanent URL and metadata for SEO
    return {
      url: permanentUrl,
      altText: `${articleTitle} - Tesla Model Y rental in Germany`,
      description: revisedPrompt || imagePrompt,
    };
  } catch (error) {
    console.log(`⚠️  Could not generate AI image: ${error.message}`);
    console.log(`   Falling back to placeholder image`);
    // Fallback to a working placeholder
    return {
      url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&h=630&fit=crop&q=80",
      altText: `${articleTitle} - Tesla rental in Germany`,
      description: "Tesla Model Y electric vehicle in Germany",
    };
  }
}

// Humanize AI content using Undetectable.AI to bypass AI detection
async function humanizeContent(content, apiKey, userId) {
  try {
    console.log(`🤖 Humanizing content with Undetectable.AI...`);
    console.log(`   Content length: ${content.length} characters`);

    // Submit content for humanization (correct endpoint and format per docs)
    const submitResponse = await fetch(
      "https://humanize.undetectable.ai/submit",
      {
        method: "POST",
        headers: {
          apikey: apiKey, // lowercase 'apikey' per docs
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          readability: "University", // 'readability' not 'readabilityLevel'
          purpose: "General Writing",
          strength: "More Human", // Maximum humanization
          model: "v11", // Best for English, high humanization
        }),
      }
    );

    if (!submitResponse.ok) {
      const errorText = await submitResponse.text();
      throw new Error(`API returned ${submitResponse.status}: ${errorText}`);
    }

    const submitData = await submitResponse.json();

    if (!submitData.id) {
      throw new Error("No document ID returned from API");
    }

    const documentId = submitData.id;
    console.log(`   Document submitted: ${documentId}`);
    console.log(`   Waiting for humanization to complete...`);

    // Poll for completion (Undetectable.AI processes asynchronously)
    let attempts = 0;
    const maxAttempts = 60; // 60 seconds max wait

    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds between checks (per docs: every 5-10 seconds)

      // Correct endpoint: POST to /document with id in body
      const checkResponse = await fetch(
        "https://humanize.undetectable.ai/document",
        {
          method: "POST",
          headers: {
            apikey: apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: documentId,
          }),
        }
      );

      if (!checkResponse.ok) {
        throw new Error(`Status check failed: ${checkResponse.status}`);
      }

      const checkData = await checkResponse.json();

      // Check if document has output (means it's done)
      if (checkData.output) {
        console.log(`✅ Content humanized successfully`);
        console.log(
          `   Original: ${content.length} chars → Humanized: ${checkData.output.length} chars`
        );
        return checkData.output;
      }

      // Still processing
      if (attempts % 3 === 0 && attempts > 0) {
        console.log(`   Still processing... (${attempts * 2}s elapsed)`);
      }

      attempts++;
    }

    throw new Error("Humanization timeout after 120 seconds");
  } catch (error) {
    console.log(`⚠️  Humanization API failed: ${error.message}`);
    console.log(`   Falling back to GPT-based humanization...`);
    return null; // Signal to use GPT fallback
  }
}

// Fallback humanization using GPT when Undetectable.AI fails
async function humanizeWithGPT(content, openaiApiKey, contentType = "content") {
  try {
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: openaiApiKey });

    const prompt =
      contentType === "title"
        ? `Rewrite this title to sound more human and less AI-generated. Keep it SEO-friendly and under 70 characters. Make it conversational and unique:\n\n"${content}"\n\nReturn ONLY the rewritten title, nothing else.`
        : contentType === "excerpt"
          ? `Rewrite this excerpt to sound more human and less AI-generated. Keep it under 200 characters. Make it engaging and conversational:\n\n"${content}"\n\nReturn ONLY the rewritten excerpt, nothing else.`
          : `Rewrite this blog post content to sound more human and less AI-generated. 

CRITICAL REQUIREMENTS:
1. Add minor imperfections (start sentences with And/But/So sometimes)
2. Vary paragraph lengths dramatically (some 1 sentence, some 6-7)
3. Use contractions heavily (we're, it's, you'll, don't, can't)
4. Add filler words naturally (actually, basically, honestly, literally)
5. Include personal interjections (I mean, you know, here's the thing)
6. Use em dashes — like this
7. Add parenthetical asides (they add personality)
8. Make some sentences incomplete for emphasis. Like this.
9. Remove AI phrases: "game changer", "revolutionizing", "it's a win-win", "cutting-edge"
10. Keep all HTML tags and links EXACTLY as they are
11. Keep the same structure but make writing flow more naturally
12. Add specific numbers, dates, and examples where generic terms exist

Original content:
${content}

Return ONLY the humanized HTML content, preserving all tags and links.`;

    console.log(`   Using GPT fallback for ${contentType}...`);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a content editor who makes AI text sound human-written. You preserve HTML, links, and SEO elements while making the writing natural.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1.0, // Higher temperature for more variation
      max_tokens:
        contentType === "title" ? 100 : contentType === "excerpt" ? 200 : 4000,
    });

    const humanized = response.choices[0].message.content.trim();
    console.log(`   ✅ GPT humanization complete`);
    return humanized;
  } catch (error) {
    console.log(`   ⚠️  GPT fallback also failed: ${error.message}`);
    console.log(`   Using original content (high AI detection risk)`);
    return content;
  }
}

// ==================== CONTENT PROMOTION APIS ====================

// 1. Google Indexing API - Get indexed immediately
async function notifyGoogleIndexing(blogUrl) {
  try {
    const googleServiceAccount = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

    if (!googleServiceAccount) {
      console.log(
        `   ⚠️  GOOGLE_SERVICE_ACCOUNT_JSON not set - skipping Google indexing`
      );
      return false;
    }

    console.log(`📍 Submitting to Google Indexing API...`);

    // Parse service account credentials
    const credentials = JSON.parse(googleServiceAccount);

    // Get OAuth2 token
    const { JWT } = await import("google-auth-library");
    const client = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ["https://www.googleapis.com/auth/indexing"],
    });

    const token = await client.authorize();

    // Submit URL to Google
    const response = await fetch(
      "https://indexing.googleapis.com/v3/urlNotifications:publish",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: blogUrl,
          type: "URL_UPDATED",
        }),
      }
    );

    if (response.ok) {
      console.log(`   ✅ Google notified - page will be indexed soon`);
      return true;
    } else {
      const error = await response.text();
      console.log(`   ⚠️  Google Indexing failed: ${error}`);
      return false;
    }
  } catch (error) {
    console.log(`   ⚠️  Google Indexing API error: ${error.message}`);
    return false;
  }
}

// 2. Twitter API - Auto-post with smart hashtags and threading (OAuth 2.0 + v2 API)
async function postToTwitter(blogPost, blogUrl) {
  try {
    // OAuth 2.0 credentials (required for v2 API on Free tier)
    const twitterClientId = process.env.TWITTER_CLIENT_ID;
    const twitterClientSecret = process.env.TWITTER_CLIENT_SECRET;
    const twitterRefreshToken = process.env.TWITTER_REFRESH_TOKEN;
    
    // OAuth 1.0a credentials (for media upload only)
    const twitterApiKey = process.env.TWITTER_API_KEY;
    const twitterApiSecret = process.env.TWITTER_API_SECRET;
    const twitterAccessToken = process.env.TWITTER_ACCESS_TOKEN;
    const twitterAccessSecret = process.env.TWITTER_ACCESS_SECRET;

    // Check if OAuth 2.0 is configured (required for Free tier posting)
    if (!twitterClientId || !twitterClientSecret || !twitterRefreshToken) {
      console.log(
        `   ⚠️  OAuth 2.0 credentials not set - required for v2 API on Free tier`
      );
      console.log(
        `   Required: TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET, TWITTER_REFRESH_TOKEN`
      );
      console.log(
        `   Run: node scripts/twitter-oauth2-setup.js to get refresh token`
      );
      return false;
    }

    // Check OAuth 1.0a for media upload
    const hasOAuth1 = twitterApiKey && twitterApiSecret && twitterAccessToken && twitterAccessSecret;
    
    console.log(`🐦 Posting to Twitter with OAuth 2.0 + v2 API...`);

    // Debug: Log credentials (safely)
    console.log(`\n   🔍 Credentials Check:`);
    console.log(`      OAuth 2.0 Client ID: ${twitterClientId ? '✅ Set' : '❌ Missing'}`);
    console.log(`      OAuth 2.0 Client Secret: ${twitterClientSecret ? '✅ Set' : '❌ Missing'}`);
    console.log(`      OAuth 2.0 Refresh Token: ${twitterRefreshToken ? '✅ Set' : '❌ Missing'}`);
    console.log(`      OAuth 1.0a (for media): ${hasOAuth1 ? '✅ Set' : '⚠️  Not set (media upload will fail)'}`);


    // Generate smart hashtags based on content
    const hashtags = generateSmartHashtags(blogPost);
    console.log(`\n   📌 Hashtags: ${hashtags.join(" ")}`);

    // Create tweet thread (multiple tweets for better engagement)
    const tweets = createTweetThread(blogPost, blogUrl, hashtags);
    console.log(`   📝 Created thread with ${tweets.length} tweets`);

    // Upload image first (if available) - requires OAuth 1.0a
    let mediaId = null;
    if (blogPost.image && blogPost.image.startsWith("/blog-images/")) {
      if (hasOAuth1) {
        const { default: OAuth } = await import("oauth-1.0a");
        const crypto = await import("crypto");

        const oauth = OAuth({
          consumer: {
            key: twitterApiKey,
            secret: twitterApiSecret,
          },
          signature_method: "HMAC-SHA1",
          hash_function(base_string, key) {
            return crypto
              .createHmac("sha1", key)
              .update(base_string)
              .digest("base64");
          },
        });

        const token = {
          key: twitterAccessToken,
          secret: twitterAccessSecret,
        };

        const imagePath = path.join(__dirname, "../public", blogPost.image);
        if (fs.existsSync(imagePath)) {
          mediaId = await uploadImageToTwitter(imagePath, oauth, token);
        }
      } else {
        console.log(`   ⚠️  No OAuth 1.0a credentials - posting without image`);
      }
    }

    // Post tweet thread using v2 API with OAuth 2.0
    let previousTweetId = null;
    let postedCount = 0;

    for (let i = 0; i < tweets.length; i++) {
      const tweetText = tweets[i];

      // Build request data for v2 API
      const tweetData = {
        text: tweetText,
        ...(previousTweetId && {
          reply: { in_reply_to_tweet_id: previousTweetId },
        }),
        ...(i === 0 && mediaId && { media: { media_ids: [mediaId] } }),
      };

      if (i === 0) {
        console.log(`\n   🔍 Posting Tweet 1 (v2 API with OAuth 2.0)...`);
        console.log(`      Tweet text length: ${tweetText.length} chars`);
        console.log(`      Has media: ${!!mediaId}`);
      }

      // For v2 API, try OAuth 2.0 first, fallback to OAuth 1.0a
      // Free tier requires OAuth 2.0 for posting
      const useOAuth2 = process.env.TWITTER_REFRESH_TOKEN;
      let response;

      if (useOAuth2) {
        // Use OAuth 2.0 Bearer token
        const refreshToken = process.env.TWITTER_REFRESH_TOKEN;
        const clientId = process.env.TWITTER_CLIENT_ID;
        const clientSecret = process.env.TWITTER_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
          console.log(
            `   ⚠️  OAuth 2.0 credentials incomplete, falling back to OAuth 1.0a`
          );
          useOAuth2 = false;
        } else {
          // Get fresh access token from refresh token
          const accessToken = await getOAuth2AccessToken(
            clientId,
            clientSecret,
            refreshToken
          );

          if (accessToken) {
            console.log(`   🔑 Using OAuth 2.0 Bearer token for v2 API`);
            response = await fetch("https://api.twitter.com/2/tweets", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(tweetData),
            });
          } else {
            console.log(
              `   ⚠️  Failed to get OAuth 2.0 token, falling back to OAuth 1.0a`
            );
            useOAuth2 = false;
          }
        }
      }

      // Fallback to OAuth 1.0a if OAuth 2.0 not available (won't work on Free tier)
      if (!useOAuth2) {
        console.log(
          `   ⚠️  OAuth 2.0 not configured - OAuth 1.0a doesn't work with v2 API on Free tier`
        );
        console.log(
          `   Run: node scripts/twitter-oauth2-setup.js to get refresh token`
        );
        break;
      }

      if (!response) {
        console.log(`   ⚠️  No response received`);
        break;
      }

      if (response.ok) {
        const data = await response.json();
        previousTweetId = data.data.id; // v2 uses data.id
        postedCount++;

        if (i === 0) {
          console.log(
            `   ✅ Tweet 1 posted successfully! ID: ${previousTweetId}`
          );
        }

        // Wait 2 seconds between tweets to avoid rate limits
        if (i < tweets.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } else {
        const error = await response.text();
        console.log(`\n   ❌ Tweet ${i + 1} FAILED:`);
        console.log(`      Response status: ${response.status}`);
        console.log(
          `      Response headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2)}`
        );
        console.log(`      Error body: ${error}`);

        // Additional debugging for 401
        if (response.status === 401) {
          console.log(`\n   🔍 401 UNAUTHORIZED - Possible Issues:`);
          console.log(`      1. Tokens don't have Read+Write permissions`);
          console.log(
            `      2. Tokens were not regenerated after setting permissions`
          );
          console.log(
            `      3. API Key/Secret mismatch with Access Token/Secret`
          );
          console.log(`      4. App suspended or credentials revoked`);
          console.log(`\n   ✅ To Fix:`);
          console.log(
            `      1. Go to: https://developer.twitter.com/en/portal/dashboard`
          );
          console.log(
            `      2. Settings → Ensure "Read and Write" permissions`
          );
          console.log(
            `      3. Keys and tokens → Regenerate Access Token & Secret`
          );
          console.log(`      4. Update GitHub Secrets with NEW tokens`);
        }
        break;
      }
    }

    if (postedCount > 0) {
      console.log(`   ✅ Posted ${postedCount}-tweet thread to Twitter`);
      return true;
    } else {
      console.log(`   ⚠️  Twitter posting failed`);
      return false;
    }
  } catch (error) {
    console.log(`   ⚠️  Twitter API error: ${error.message}`);
    return false;
  }
}

// Get OAuth2 access token using Client Credentials flow
async function getOAuth2AccessToken(clientId, clientSecret, refreshToken) {
  try {
    // Use refresh token to get a new access token for posting
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const response = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
      }).toString(),
    });

    if (response.ok) {
      const data = await response.json();
      return data.access_token;
    } else {
      const error = await response.text();
      console.log(`   ⚠️  OAuth2 token refresh failed: ${error}`);
      return null;
    }
  } catch (error) {
    console.log(`   ⚠️  OAuth2 error: ${error.message}`);
    return null;
  }
}

// Fallback: Post using OAuth 1.0a
async function postToTwitterOAuth1(
  blogPost,
  blogUrl,
  tweets,
  mediaId,
  apiKey,
  apiSecret,
  accessToken,
  accessSecret
) {
  try {
    const { default: OAuth } = await import("oauth-1.0a");
    const crypto = await import("crypto");

    const oauth = OAuth({
      consumer: {
        key: apiKey,
        secret: apiSecret,
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64");
      },
    });

    const token = {
      key: accessToken,
      secret: accessSecret,
    };

    let previousTweetId = null;
    let postedCount = 0;

    for (let i = 0; i < tweets.length; i++) {
      const tweetText = tweets[i];

      const tweetData = {
        text: tweetText,
        ...(previousTweetId && {
          reply: { in_reply_to_tweet_id: previousTweetId },
        }),
        ...(i === 0 && mediaId && { media: { media_ids: [mediaId] } }),
      };

      const request = {
        url: "https://api.twitter.com/2/tweets",
        method: "POST",
        data: tweetData,
      };

      const authHeader = oauth.toHeader(oauth.authorize(request, token));

      const response = await fetch(request.url, {
        method: "POST",
        headers: {
          ...authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tweetData),
      });

      if (response.ok) {
        const data = await response.json();
        previousTweetId = data.data.id;
        postedCount++;

        if (i === 0) {
          console.log(
            `   ✅ Tweet 1 posted successfully (OAuth1)! ID: ${previousTweetId}`
          );
        }

        if (i < tweets.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } else {
        const error = await response.text();
        console.log(`   ⚠️  Tweet ${i + 1} failed: ${error}`);
        break;
      }
    }

    if (postedCount > 0) {
      console.log(
        `   ✅ Posted ${postedCount}-tweet thread to Twitter (OAuth1.0a)`
      );
      return true;
    }
    return false;
  } catch (error) {
    console.log(`   ⚠️  OAuth 1.0a posting error: ${error.message}`);
    return false;
  }
}

// Upload image to Twitter
async function uploadImageToTwitter(imagePath, oauth, token) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");

    const request = {
      url: "https://upload.twitter.com/1.1/media/upload.json",
      method: "POST",
      data: {
        media_data: base64Image,
      },
    };

    const authHeader = oauth.toHeader(oauth.authorize(request, token));

    const response = await fetch(request.url, {
      method: "POST",
      headers: {
        ...authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `media_data=${encodeURIComponent(base64Image)}`,
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`   ✅ Image uploaded to Twitter`);
      return data.media_id_string;
    }
    return null;
  } catch (error) {
    console.log(`   ⚠️  Image upload failed: ${error.message}`);
    return null;
  }
}

// Generate smart hashtags based on blog content
function generateSmartHashtags(blogPost) {
  const hashtags = new Set();

  // Always include core hashtags
  hashtags.add("#Tesla");
  hashtags.add("#ElectricVehicles");

  // Add based on keywords
  const keywords = blogPost.keywords || [];

  if (
    keywords.some(
      (k) =>
        k.toLowerCase().includes("supercharger") ||
        k.toLowerCase().includes("charging")
    )
  ) {
    hashtags.add("#TeslaCharging");
  }

  if (
    keywords.some(
      (k) =>
        k.toLowerCase().includes("germany") ||
        k.toLowerCase().includes("europe")
    )
  ) {
    hashtags.add("#GermanyTravel");
  }

  if (keywords.some((k) => k.toLowerCase().includes("model y"))) {
    hashtags.add("#TeslaModelY");
  }

  if (
    keywords.some(
      (k) =>
        k.toLowerCase().includes("road trip") ||
        k.toLowerCase().includes("travel")
    )
  ) {
    hashtags.add("#RoadTrip");
  }

  // Add news-specific hashtags
  if (blogPost.category === "News") {
    hashtags.add("#TeslaNews");
  }

  // Limit to 4 hashtags (Twitter best practice)
  return Array.from(hashtags).slice(0, 4);
}

// Create engaging tweet thread from blog post
function createTweetThread(blogPost, blogUrl, hashtags) {
  const tweets = [];

  // Tweet 1: Hook with image (main tweet)
  const emoji = "🚗";
  const mainTweet = `${emoji} ${blogPost.title}

${blogPost.excerpt.substring(0, 160)}...

👇 Thread 👇`;

  tweets.push(mainTweet);

  // Tweet 2: Key insight or stat
  const tweet2 = `Here's why this matters:

${extractKeyPoint(blogPost.content, 1)}

Perfect timing for anyone planning a Germany trip 🇩🇪`;

  tweets.push(tweet2);

  // Tweet 3: Another insight
  const tweet3 = extractKeyPoint(blogPost.content, 2);
  tweets.push(tweet3);

  // Tweet 4: Call-to-action with link and hashtags
  const tweet4 = `Full article with all the details:
${blogUrl}

Planning a Tesla road trip in Germany? We've got you covered ⚡

${hashtags.join(" ")}`;

  tweets.push(tweet4);

  return tweets;
}

// Extract key points from blog content for threading
function extractKeyPoint(content, pointNumber) {
  // Remove HTML tags
  const text = content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Split into sentences
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 20);

  // Get a compelling sentence from the middle
  const index = Math.min(pointNumber * 3, sentences.length - 1);
  let point = sentences[index]?.trim();

  // Ensure it's not too long for a tweet (under 280 chars)
  if (point && point.length > 260) {
    point = point.substring(0, 257) + "...";
  }

  return point || "Tesla rentals in Germany just got even better!";
}

// 3. Buffer API - Share to social media (DEPRECATED - keeping for backwards compatibility)
async function shareToBuffer(blogPost, blogUrl) {
  try {
    const bufferToken = process.env.BUFFER_ACCESS_TOKEN;
    const bufferProfileIds = process.env.BUFFER_PROFILE_IDS; // Comma-separated: "twitter_id,linkedin_id"

    if (!bufferToken || !bufferProfileIds) {
      console.log(
        `   ⚠️  Buffer credentials not set - skipping social media sharing`
      );
      return false;
    }

    console.log(`📱 Sharing to social media via Buffer...`);

    const profileIds = bufferProfileIds.split(",").map((id) => id.trim());
    const socialText = `${blogPost.title}\n\n${blogPost.excerpt}\n\nRead more: ${blogUrl}`;

    const response = await fetch(
      "https://api.bufferapp.com/1/updates/create.json",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bufferToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: socialText,
          profile_ids: profileIds,
          media: {
            photo: blogPost.image,
          },
          shorten: false, // Use full URL for better tracking
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(`   ✅ Shared to ${profileIds.length} social profiles`);
      return true;
    } else {
      const error = await response.text();
      console.log(`   ⚠️  Buffer sharing failed: ${error}`);
      return false;
    }
  } catch (error) {
    console.log(`   ⚠️  Buffer API error: ${error.message}`);
    return false;
  }
}

// 3. Medium API - Syndicate content
async function publishToMedium(blogPost, blogUrl) {
  try {
    const mediumToken = process.env.MEDIUM_INTEGRATION_TOKEN;
    const mediumUserId = process.env.MEDIUM_USER_ID;

    if (!mediumToken || !mediumUserId) {
      console.log(`   ⚠️  Medium credentials not set - skipping syndication`);
      return false;
    }

    console.log(`📝 Publishing to Medium...`);

    // Add canonical link at the end of content
    const mediumContent = `${blogPost.content}\n\n<p><em>Originally published at <a href="${blogUrl}">${blogUrl}</a></em></p>`;

    const response = await fetch(
      `https://api.medium.com/v1/users/${mediumUserId}/posts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${mediumToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          title: blogPost.title,
          contentFormat: "html",
          content: mediumContent,
          canonicalUrl: blogUrl, // Critical: points back to your site for SEO
          tags: blogPost.keywords?.slice(0, 5) || [
            "Tesla",
            "Germany",
            "Travel",
          ],
          publishStatus: "public",
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(`   ✅ Published to Medium: ${data.data.url}`);
      return true;
    } else {
      const error = await response.text();
      console.log(`   ⚠️  Medium publishing failed: ${error}`);
      return false;
    }
  } catch (error) {
    console.log(`   ⚠️  Medium API error: ${error.message}`);
    return false;
  }
}

// Master function to promote blog post across all channels
async function promoteContent(blogPost) {
  const blogUrl = `${siteUrl}/blog-posts/${blogPost.slug}`;

  console.log(`\n🚀 Promoting content across channels...`);
  console.log(`   URL: ${blogUrl}`);

  const results = {
    google: false,
    twitter: false,
  };

  // Run all promotions in parallel for speed
  const [googleResult, twitterResult] = await Promise.all([
    notifyGoogleIndexing(blogUrl),
    postToTwitter(blogPost, blogUrl),
  ]);

  results.google = googleResult;
  results.twitter = twitterResult;

  // Summary
  const successCount = Object.values(results).filter((r) => r).length;
  console.log(`\n📊 Promotion summary: ${successCount}/2 channels successful`);
  if (results.google) console.log(`   ✅ Google Indexing`);
  if (results.twitter) console.log(`   ✅ Twitter (thread posted with image)`);

  if (successCount === 0) {
    console.log(
      `   ⚠️  No promotion APIs configured - blog post created but not promoted`
    );
    console.log(`   Add API keys to GitHub Secrets for automatic promotion`);
  }

  return results;
}

// Generate unique topic variation based on date and time
function getUniqueTopic(date) {
  const dayOfYear = Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
  const hour = date.getHours();
  const minutes = date.getMinutes();

  // Use day of year + hour for topic selection (ensures 2 different topics per day)
  const topicIndex =
    (dayOfYear * 2 + Math.floor(hour / 12)) % blogTopics.length;
  const baseTopic = blogTopics[topicIndex];

  // Add variation based on minutes to ensure uniqueness even if run at same time
  const variationSeed = dayOfYear * 24 * 60 + hour * 60 + minutes;

  // Create unique variation by adding context
  const variations = [
    `${baseTopic}`,
    `${baseTopic}: Expert Tips and Insights`,
    `${baseTopic}: A Practical Guide`,
    `${baseTopic}: Everything You Need to Know`,
    `${baseTopic}: Insider Secrets`,
    `${baseTopic}: The Ultimate Guide`,
    `${baseTopic}: Tips from Experience`,
    `${baseTopic}: What You Should Know`,
  ];

  const variationIndex = variationSeed % variations.length;
  return variations[variationIndex];
}

// Select random author based on date for consistency but with more variation
function getAuthorForDate(date) {
  const dayOfYear = Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
  const hour = date.getHours();
  const minutes = date.getMinutes();
  // Ensure different authors for morning (0-11) vs afternoon (12-23) runs
  // Use day of year * 2 to account for two posts per day, plus hour offset
  const isAfternoon = hour >= 12 ? 1 : 0;
  // Add minutes for additional variation
  const seed = (dayOfYear * 2 + isAfternoon) * 1000 + (hour * 60 + minutes);
  return authorNames[seed % authorNames.length];
}

async function generateBlogPost() {
  const AI_API_KEY = process.env.OPENAI_API_KEY;

  if (!AI_API_KEY) {
    console.error("❌ OPENAI_API_KEY environment variable not set");
    process.exit(1);
  }

  const today = new Date();
  const author = getAuthorForDate(today);

  // Read existing blog posts to check for duplicates
  const blogPostsPath = path.join(__dirname, "../src/data/blogPosts.json");
  let existingBlogPosts = [];

  if (fs.existsSync(blogPostsPath)) {
    const fileContent = fs.readFileSync(blogPostsPath, "utf-8");
    existingBlogPosts = JSON.parse(fileContent);
  }

  // Fetch recent Tesla/Elon Musk news
  console.log(`📰 Fetching recent Tesla/Elon Musk news...`);
  let recentNews = await fetchRecentTeslaNews();

  // Check if news articles have already been covered
  if (recentNews.length > 0) {
    console.log(`✅ Found ${recentNews.length} recent news articles`);

    // Filter out news that's already been covered
    const filteredNews = recentNews.filter((article) => {
      // Check if this article title is too similar to any existing post
      const articleTitle = article.title.toLowerCase();
      const alreadyCovered = existingBlogPosts.some((post) => {
        const postTitle = post.title.toLowerCase();
        // Simple similarity check - if titles share significant words
        const articleWords = articleTitle
          .split(" ")
          .filter((w) => w.length > 4);
        const postWords = postTitle.split(" ").filter((w) => w.length > 4);
        const sharedWords = articleWords.filter((w) => postWords.includes(w));
        // If more than 40% of significant words match, consider it duplicate
        return (
          sharedWords.length >
          Math.min(articleWords.length, postWords.length) * 0.4
        );
      });
      return !alreadyCovered;
    });

    if (filteredNews.length < recentNews.length) {
      console.log(
        `🔍 Filtered out ${recentNews.length - filteredNews.length} already-covered articles`
      );
    }

    recentNews = filteredNews;

    if (recentNews.length > 0) {
      console.log(`📰 Top new article: ${recentNews[0].title}`);
    } else {
      console.log(
        `⚠️  All recent news already covered, falling back to general Tesla topics`
      );
      // Use fallback topics
      recentNews = [];
    }
  } else {
    console.log(`⚠️  No recent news found, using general Tesla topics`);
  }

  console.log(`👤 Author: ${author}`);

  try {
    const blogContent = await generateWithOpenAI(
      recentNews,
      AI_API_KEY,
      author
    );

    // Humanize content to bypass AI detection if API key is available
    const UNDETECTABLE_AI_KEY = process.env.UNDETECTABLE_AI_KEY;
    const UNDETECTABLE_USER_ID = "ffa7ea41-f16d-42f4-9b9c-fad525a78450";

    if (UNDETECTABLE_AI_KEY) {
      console.log(`\n🤖 Starting content humanization process...`);

      // Humanize main content
      let humanizedContent = await humanizeContent(
        blogContent.content,
        UNDETECTABLE_AI_KEY,
        UNDETECTABLE_USER_ID
      );

      if (humanizedContent === null) {
        // Undetectable.AI failed, use GPT fallback
        humanizedContent = await humanizeWithGPT(
          blogContent.content,
          AI_API_KEY,
          "content"
        );
      }
      blogContent.content = humanizedContent;

      // Humanize title
      console.log(`🤖 Humanizing title...`);
      let humanizedTitle = await humanizeContent(
        blogContent.title,
        UNDETECTABLE_AI_KEY,
        UNDETECTABLE_USER_ID
      );

      if (humanizedTitle === null) {
        humanizedTitle = await humanizeWithGPT(
          blogContent.title,
          AI_API_KEY,
          "title"
        );
      }
      blogContent.title = humanizedTitle;

      // Humanize excerpt
      console.log(`🤖 Humanizing excerpt...`);
      let humanizedExcerpt = await humanizeContent(
        blogContent.excerpt,
        UNDETECTABLE_AI_KEY,
        UNDETECTABLE_USER_ID
      );

      if (humanizedExcerpt === null) {
        humanizedExcerpt = await humanizeWithGPT(
          blogContent.excerpt,
          AI_API_KEY,
          "excerpt"
        );
      }
      blogContent.excerpt = humanizedExcerpt;

      console.log(`✅ All content humanized successfully\n`);
    } else {
      console.log(
        `\n⚠️  UNDETECTABLE_AI_KEY not set - using GPT fallback humanization`
      );
      console.log(
        `   For best results, add Undetectable.AI key to GitHub Secrets\n`
      );

      // Use GPT-based humanization as fallback
      blogContent.content = await humanizeWithGPT(
        blogContent.content,
        AI_API_KEY,
        "content"
      );
      blogContent.title = await humanizeWithGPT(
        blogContent.title,
        AI_API_KEY,
        "title"
      );
      blogContent.excerpt = await humanizeWithGPT(
        blogContent.excerpt,
        AI_API_KEY,
        "excerpt"
      );
    }

    // Generate AI image based on the article title, content, and keywords
    const aiImageData = await generateAIImage(
      blogContent.title,
      recentNews.length > 0 ? recentNews[0].title : "",
      blogContent.keywords,
      blogContent.slug, // Pass slug for filename
      AI_API_KEY
    );

    // Create blog post object
    const blogPost = {
      title: blogContent.title,
      slug: blogContent.slug,
      category: blogContent.category,
      readTime: blogContent.readTime,
      content: blogContent.content,
      excerpt: blogContent.excerpt,
      image: aiImageData.url, // Use AI-generated image URL
      imageAlt: aiImageData.altText, // SEO-optimized alt text
      imageDescription: aiImageData.description, // For structured data
      featured: false,
      publishedAt: today.toISOString(),
      keywords: blogContent.keywords || [],
      author: {
        name: author,
        bio: `Travel enthusiast and Tesla rental expert with extensive experience exploring Germany.`,
      },
    };

    // Use existing blog posts array (already loaded earlier for duplicate check)
    let blogPosts = existingBlogPosts;

    // Check if post with same slug already exists - if so, make it unique
    let finalSlug = blogPost.slug;
    let slugSuffix = 1;
    while (blogPosts.find((p) => p.slug === finalSlug)) {
      // Add a suffix to make the slug unique
      const baseSlug = blogPost.slug.replace(/-\d+$/, ""); // Remove any existing suffix
      finalSlug = `${baseSlug}-${slugSuffix}`;
      slugSuffix++;
    }

    if (finalSlug !== blogPost.slug) {
      console.log(
        `⚠️  Slug ${blogPost.slug} already exists. Using unique slug: ${finalSlug}`
      );
      blogPost.slug = finalSlug;
    }

    // Add new post at the beginning
    blogPosts.unshift(blogPost);

    // Keep only last 500 posts (for 5 years at 2 posts/day)
    if (blogPosts.length > 500) {
      blogPosts = blogPosts.slice(0, 500);
    }

    // Write back to file
    fs.writeFileSync(blogPostsPath, JSON.stringify(blogPosts, null, 2));
    console.log(`✅ Blog post saved: ${blogPost.title}`);
    console.log(`📊 Total blog posts: ${blogPosts.length}`);

    // Promote content across all channels
    await promoteContent(blogPost);

    return blogPost;
  } catch (error) {
    console.error("❌ Error generating blog post:", error.message);
    throw error;
  }
}

async function generateWithOpenAI(recentNews, apiKey, authorName) {
  const OpenAI = (await import("openai")).default;
  const openai = new OpenAI({ apiKey });

  // Create news context for the AI
  let newsContext = "";
  if (recentNews && recentNews.length > 0) {
    newsContext = "\n\nRECENT NEWS TO BASE YOUR OPINION PIECE ON:\n";
    recentNews.slice(0, 3).forEach((article, index) => {
      newsContext += `\n${index + 1}. "${article.title}"\n   ${article.description || ""}\n   Published: ${new Date(article.publishedAt).toLocaleDateString()}\n`;
    });
  } else {
    newsContext =
      "\n\nTOPIC: Write about recent developments in Tesla technology or electric vehicle industry, focusing on how they enhance the rental experience in Germany.";
  }

  const prompt = `You are ${authorName}, a travel blogger and Tesla enthusiast who runs a Tesla Model Y rental company in Germany for U.S. travelers.

YOUR TASK:
Write an engaging opinion piece that takes recent Tesla/Elon Musk/EV industry news and connects it positively to why renting a Tesla Model Y in Germany is a great choice for American travelers.${newsContext}

CRITICAL APPROACH:
- Take the news story/development and spin it in a POSITIVE light
- Show enthusiasm and optimism about Tesla and EVs
- Connect the news to practical benefits for Tesla renters in Germany
- Write as an informed opinion piece, not just news reporting
- Be authentic, opinionated, and passionate (but not salesy)
- Frame everything around how this news makes NOW the perfect time to rent a Tesla in Germany

LIVED DETAILS - MAKE IT FEEL REAL (CRITICAL):
1. **Concrete Specifics** - Replace generic statements with real details:
   - NOT: "The rental process is easy"
   - YES: "At Frankfurt Airport Terminal 1, we meet you at Hall A arrivals with the Tesla ready to go"
   
2. **Real Locations**:
   - Mention specific charging stations: "The Supercharger at Aschaffenburg West services"
   - Specific routes: "The A3 from Frankfurt to Nuremberg"
   - Real cities: "When you drive through Heidelberg, the charging station is right off the B37"
   
3. **Honest Confessions & Stories**:
   - "The first time I pulled into a German charging station, I had no idea where to tap the card"
   - "I once drove from Frankfurt to Munich and made only 2 charging stops - here's what I learned"
   - "My customer Sarah from Texas told me she was nervous about the Autobahn, but..."
   
4. **Real Questions Answered**:
   - "Is my U.S. license enough?" (then answer specifically)
   - "How do I pay for charging at German stations?" (actual steps)
   - "What's different about driving a Tesla in Germany vs. the U.S.?" (specific differences)
   
5. **Small Jokes & Personality**:
   - Light humor about cultural differences
   - Self-deprecating moments: "I definitely panicked the first time..."
   - Relatable frustrations turned positive
   
6. **Honest Pros AND Cons**:
   - NOT: "Everything is perfect!"
   - YES: "The only downside is that charging takes 20-30 minutes, but honestly? It's the perfect excuse to grab a coffee and check out the local bakery"
   
7. **Numbers & Specifics**:
   - "€89 per day" not "affordable rates"
   - "30-minute charging time" not "quick charging"
   - "550km range" not "long range"
   - "2 hours from Frankfurt to Heidelberg" not "short drive"

WRITING STYLE - CRITICAL REQUIREMENTS:
1. **Write like a real person sharing real experience** - NOT like an AI summarizing information
2. **Use SPECIFIC DETAILS constantly**:
   - "Terminal 1, Hall A at Frankfurt Airport" not "the airport"
   - "The Supercharger at Aschaffenburg West" not "charging stations"
   - "€89 per day" not "affordable"
   - "The A3 autobahn between Frankfurt and Nuremberg" not "the highway"
3. **Tell actual stories and confessions**:
   - "I remember when..." followed by a specific incident
   - "My customer John from California asked me..." (real scenario)
   - "The first time I did X, I made this mistake..." (relatable failure)
4. **Use contractions HEAVILY** (we've, it's, you'll, don't, can't, I've, that's, what's, here's, there's)
5. **Casual phrases** ("Here's the thing...", "Let me be honest...", "Look...", "Honestly?", "Real talk...")
6. **Personality markers**:
   - Use "I" and "we" constantly
   - Share opinions: "I think...", "In my view...", "I honestly believe..."
   - Show enthusiasm WITHOUT clichés: "This blew my mind" not "game changer"
7. **Minor imperfections** (these signal human writing):
   - Start sentences with: And, But, So, Or
   - Sentence fragments. Like this one.
   - Em dashes — they're great for asides
   - Parenthetical thoughts (because we all have them)
8. **BANNED AI PHRASES** - Never use:
   - "game changer", "revolutionizing", "cutting-edge"
   - "seamless", "it's a win-win", "at the end of the day"
   - "In conclusion", "Furthermore", "Moreover", "It is important to note"
   - "leverage", "utilize" (use "use" instead)
9. **Varied sentence structure**:
   - Mix very short (3-5 words) with longer (20+ words)
   - Questions mid-paragraph: "Want to know the best part?"
   - Lists that aren't perfectly formatted
10. **Real questions from real travelers**:
    - Answer specific concerns: "What if I get a flat tire on the Autobahn?"
    - Address fears: "I was worried about charging, but here's what actually happens..."
    - Provide actionable answers with real details

11. **MAKE IT BOOKMARK-WORTHY**:
    - Would a real person save this for their trip?
    - Does it answer questions better than competitors?
    - Is there information you can't find elsewhere?
    - Are there specific tips that save time/money?

OPINION PIECE STRUCTURE:
1. **Opening Hook** (2-3 paragraphs):
   - Reference the news with excitement/interest
   - Share your immediate reaction as ${authorName}
   - Connect it personally to your Tesla rental experience in Germany

2. **Main Opinion Sections** (4-6 H2 headings):
   - Analyze what this news means for Tesla/EV industry
   - Explain why this is POSITIVE for travelers
   - Connect to specific benefits for renting in Germany
   - Share personal insights and predictions
   - Address any concerns optimistically

3. **Practical Application** (1-2 sections):
   - How renters benefit from this development RIGHT NOW
   - What this means for planning a Germany trip
   - Why NOW is the perfect time to rent

4. **Conclusion** (2 paragraphs):
   - Summarize your optimistic take
   - Natural call-to-action about renting with your company

CONTENT REQUIREMENTS:
- Title: Opinion-style, engaging title that references the news angle (e.g., "Why Tesla's Latest Move Makes Germany Road Trips Even Better")
- Content: 1100-1500 words
- Category: Always "News" for opinion pieces
- Tone: Passionate, informed, optimistic, personal
- Include 3-4 links to ${siteUrl} naturally
- Include 2-3 deep links to /privacy-policy, /terms-of-service, etc.

INTERNAL LINKING REQUIREMENTS:
- Main page links (3-4 total): Use varied anchor text like:
  * "book your Tesla rental in Germany"
  * "rent a Tesla Model Y"
  * "check availability for your dates"
  * "reserve your Tesla today"
  * "get started with your rental"
- Deep links (2-3 total): Link naturally to relevant pages:
  * Privacy policy when discussing data/booking
  * Terms of service when discussing rental requirements
  * Other relevant pages contextually
- Make ALL links feel natural and contextual - never forced
- Links should appear in the flow of content, not in a list

HTML FORMATTING:
- Use proper HTML: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
- Format main page links as: <a href="${siteUrl}">natural anchor text</a>
- Format deep links as: <a href="${siteUrl}/privacy-policy">privacy policy</a> or <a href="/privacy-policy">privacy policy</a>
- Use <strong> for emphasis, <em> for subtle emphasis
- Include 1-2 bulleted lists where appropriate

SEO OPTIMIZATION & KEYWORDS:
- Naturally include target keywords throughout (don't stuff)
- Use keywords in at least 2-3 headings
- Include location-specific terms (Germany, Frankfurt, Munich, Berlin, etc.)
- Target long-tail keywords naturally
- Include semantic variations of keywords
- Make the title and content unique - avoid generic templates
- **CRITICAL**: Include keywords from the news story/topic (e.g., if news is about "Supercharger expansion", include "Tesla Supercharger", "EV charging network", "charging infrastructure")
- Blend news-specific terms with rental-focused keywords (e.g., "Tesla Model Y rental Germany", "EV road trip", "electric vehicle travel")

POSITIVE SPIN EXAMPLES:
- If news is about production challenges → Focus on quality improvements and attention to detail
- If about competition → Emphasize Tesla's innovation leadership and first-mover advantage
- If about pricing → Connect to value proposition and long-term savings
- If about Autopilot/FSD → Highlight safety, convenience for travelers, German Autobahn experience
- If about Supercharger network → Emphasize expanding infrastructure, convenience for road trips
- If about new features → Show how renters get immediate access to cutting-edge tech

WRITING STYLE EXAMPLES:
GOOD: "When I heard about Tesla's latest Supercharger expansion in Bavaria, I literally did a happy dance. This is HUGE for anyone planning a road trip through southern Germany."
BAD: "Tesla has announced new Supercharger locations in Bavaria, which will improve charging infrastructure."

GOOD: "Look, I'll be honest - when I first read the headlines, I was skeptical. But dig deeper, and this is actually fantastic news for anyone thinking about renting a Tesla in Germany."
BAD: "Recent developments in the electric vehicle sector indicate positive trends for the rental market."

Return a JSON object with: title, slug (URL-friendly, lowercase, hyphens, MUST be unique - include specific details from the topic to ensure uniqueness, avoid generic slugs like "tesla-rental-guide"), category, readTime (e.g., "6 min read" or "8 min read"), content (HTML formatted with all links), excerpt, keywords (array of 8-12 - MUST include news-specific terms + rental terms)

CRITICAL REQUIREMENTS:
1. The slug must be unique and specific. Include location, specific topic details, or unique aspects to avoid collisions. For example, instead of "tesla-rental-guide", use "tesla-supercharger-expansion-bavaria-rental-2024" or "tesla-model-y-updates-germany-travelers"
2. Keywords MUST include a mix of:
   - News-specific terms (from the article/topic)
   - Tesla/EV rental keywords
   - Location keywords (Germany, specific cities)
   - Long-tail search terms travelers would use
3. DO NOT include an "image" field - images are handled separately

EXAMPLE KEYWORDS for a Supercharger news article: ["Tesla Supercharger expansion", "EV charging Germany", "Tesla Model Y rental", "electric vehicle road trip Germany", "Tesla charging infrastructure", "Bavaria EV travel", "Tesla rental Frankfurt", "Supercharger network Europe"]`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are ${authorName}, an expert travel writer and SEO content specialist. You write in a natural, conversational style that engages readers while optimizing for search engines. Your content sounds human-written, not AI-generated. Always write from first-person perspective as ${authorName}. Always return valid JSON.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.9, // Higher temperature for more natural, varied writing
      max_tokens: 4000,
    });

    const response = JSON.parse(completion.choices[0].message.content);

    // Post-process to ensure internal links are correct
    if (response.content) {
      // Ensure main site links are absolute
      response.content = response.content.replace(
        /<a href="(?!https?:\/\/)([^"]+)">/g,
        (match, url) => {
          if (url.startsWith("/")) {
            return `<a href="${siteUrl}${url}">`;
          }
          return match;
        }
      );
    }

    return response;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
}

// Run if called directly
if (
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.includes("generate-blog-post")
) {
  generateBlogPost()
    .then(() => {
      console.log("✅ Blog post generation complete!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Error generating blog post:", error);
      process.exit(1);
    });
}

export { generateBlogPost };
