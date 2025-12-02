import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";

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

// Fetch recent Tesla/Elon Musk news from a news API
async function fetchRecentTeslaNews() {
  // Using NewsAPI or similar - you can also use Google News RSS or other sources
  // For now, we'll use a free news aggregator approach

  try {
    // Try to fetch from NewsAPI (requires API key, but has free tier)
    const newsApiKey = process.env.NEWS_API_KEY;

    if (newsApiKey) {
      const query = encodeURIComponent(
        'Tesla OR "Elon Musk" OR "electric vehicles" OR "EV charging"'
      );
      const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${newsApiKey}`;

      return new Promise((resolve, reject) => {
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
                  // Return top articles
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
    }

    // Fallback: Return placeholder news topics if no API key
    return [
      {
        title: "Tesla Announces New Supercharger Expansion in Europe",
        description:
          "Tesla continues to expand its Supercharger network across Europe, making EV travel more convenient.",
        url: "https://www.tesla.com/",
        publishedAt: new Date().toISOString(),
      },
      {
        title: "Electric Vehicle Adoption Accelerates in Germany",
        description:
          "Germany sees record growth in electric vehicle adoption, with Tesla leading the market.",
        url: "https://www.tesla.com/",
        publishedAt: new Date().toISOString(),
      },
    ];
  } catch (error) {
    console.log("⚠️  Could not fetch news, using fallback topics");
    return [];
  }
}

// Generate unique Unsplash image URL for each post
function generateUniqueImageUrl(seed) {
  // Unsplash provides free, high-quality images
  // We'll use curated photo IDs that are relevant to Tesla/EVs/travel
  // These are real Unsplash photo IDs for high-quality Tesla/car/travel images
  const imageIds = [
    "1560958089-b8a1929cea89", // Tesla Model Y
    "1617886322395-6ae3e11a25d7", // Electric car charging
    "1593941707882-a5bba14938c7", // Modern electric car
    "1619642751034-765dfdf7c58e", // Tesla interior
    "1558618666-fcd25c85cd64", // Electric vehicle
    "1549317661-bd32c8ce0db2", // Road trip
    "1568605117036-5fe5e7bab0b7", // Highway driving
    "1606318313252-72e150df5754", // Tesla Model 3
    "1620121692029-d088224ddc74", // EV charging station
    "1617788142179-eb4d0e5e5b26", // Modern car technology
    "1587387119725-0c3f6eed3d08", // Germany Autobahn
    "1580273916550-e323be2ae537", // Road landscape
    "1614200179296-6b0c58775463", // Tesla exterior
    "1563720360172-67b8f3dce741", // Modern vehicle
    "1615906655593-7a4b9f6f0c7f", // Electric mobility
    "1598386490624-3e0b5e8e7f90", // Car interior tech
    "1599819177961-2b68e2cfb1c5", // Sustainable transport
    "1601653056375-77a3c4c2f4d9", // EV lifestyle
    "1619642751276-d7887e13b41f", // Tesla features
    "1567818735868-b8b1e6f86d18", // Modern travel
  ];

  // Use seed to select an image ID, ensuring uniqueness
  const imageIndex = seed % imageIds.length;
  const imageId = imageIds[imageIndex];

  // Use Unsplash's image API with specific photo ID
  return `https://images.unsplash.com/photo-${imageId}?w=1200&h=630&fit=crop&q=80`;
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

    // Generate unique image for this post
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );
    const imageSeed = dayOfYear * 24 + today.getHours();
    const uniqueImage = generateUniqueImageUrl(imageSeed);

    // Create blog post object
    const blogPost = {
      title: blogContent.title,
      slug: blogContent.slug,
      category: blogContent.category,
      readTime: blogContent.readTime,
      content: blogContent.content,
      excerpt: blogContent.excerpt,
      image: blogContent.image || uniqueImage,
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

WRITING STYLE - CRITICAL REQUIREMENTS:
1. Write in a natural, conversational tone - like you're sharing personal experience with a friend
2. Use varied sentence structures - mix short punchy sentences with longer descriptive ones
3. Include specific examples, numbers, and real scenarios (e.g., "I've seen travelers save €50 by...", "On my last trip to Frankfurt...")
4. Use contractions naturally throughout (we've, it's, you'll, don't, can't, etc.)
5. Include occasional casual phrases ("Here's the thing...", "Let me tell you...", "Honestly, this is...")
6. Add personality - use "I" and "we" perspectives, share opinions, show enthusiasm
7. Include minor imperfections that make it feel human (occasional sentence fragments, natural flow)
8. Avoid AI patterns: Don't use phrases like "In conclusion", "Furthermore", "It is important to note"
9. Use active voice primarily, but mix in passive voice naturally
10. Include rhetorical questions to engage readers

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

SEO OPTIMIZATION:
- Naturally include target keywords throughout (don't stuff)
- Use keywords in at least 2-3 headings
- Include location-specific terms (Germany, Frankfurt, Munich, Berlin, etc.)
- Target long-tail keywords naturally
- Include semantic variations of keywords
- Make the title and content unique - avoid generic templates

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

Return a JSON object with: title, slug (URL-friendly, lowercase, hyphens, MUST be unique - include specific details from the topic to ensure uniqueness, avoid generic slugs like "tesla-rental-guide"), category, readTime (e.g., "6 min read" or "8 min read"), content (HTML formatted with all links), excerpt, keywords (array of 8-12), image (optional URL)

IMPORTANT: The slug must be unique and specific. Include location, specific topic details, or unique aspects to avoid collisions. For example, instead of "tesla-rental-guide", use "tesla-rental-mileage-limits-germany" or "tesla-charging-etiquette-frankfurt".`;

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
