import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
  const selectedTopic = getUniqueTopic(today);
  const author = getAuthorForDate(today);

  console.log(`📝 Generating blog post: ${selectedTopic}`);
  console.log(`👤 Author: ${author}`);

  try {
    const blogContent = await generateWithOpenAI(
      selectedTopic,
      AI_API_KEY,
      author
    );

    // Create blog post object
    const blogPost = {
      title: blogContent.title,
      slug: blogContent.slug,
      category: blogContent.category,
      readTime: blogContent.readTime,
      content: blogContent.content,
      excerpt: blogContent.excerpt,
      image:
        blogContent.image ||
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&h=630&fit=crop",
      featured: false,
      publishedAt: today.toISOString(),
      keywords: blogContent.keywords || [],
      author: {
        name: author,
        bio: `Travel enthusiast and Tesla rental expert with extensive experience exploring Germany.`,
      },
    };

    // Read existing blog posts
    const blogPostsPath = path.join(__dirname, "../src/data/blogPosts.json");
    let blogPosts = [];

    if (fs.existsSync(blogPostsPath)) {
      const fileContent = fs.readFileSync(blogPostsPath, "utf-8");
      blogPosts = JSON.parse(fileContent);
    }

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

async function generateWithOpenAI(topic, apiKey, authorName) {
  const OpenAI = (await import("openai")).default;
  const openai = new OpenAI({ apiKey });

  const prompt = `Write a comprehensive, SEO-optimized blog post about "${topic}" for a Tesla Model Y rental company in Germany targeting U.S. travelers.

AUTHOR CONTEXT:
- Write as if you are ${authorName}, a travel enthusiast with personal experience
- Use first-person perspective naturally ("I've found that...", "In my experience...")
- Include personal anecdotes and specific examples
- Make it feel authentic and personal

CRITICAL REQUIREMENTS FOR HUMAN-LIKE WRITING:
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

CONTENT REQUIREMENTS:
- Title: Engaging, SEO-friendly title (60-70 characters) - make it catchy, not generic, unique to this post
- Content: 1100-1500 words, well-structured with proper headings
- Category: One of "Guides", "Reviews", "Tips", "News"
- Excerpt: 150-200 character summary that hooks the reader
- Keywords: 8-12 relevant SEO keywords (include long-tail variations)
- Tone: Friendly, helpful, conversational, like talking to a friend who's been there

STRUCTURE:
- Start with a relatable hook or personal story (2-3 paragraphs) - make it unique
- Use H2 headings for main sections (4-6 sections)
- Use H3 headings for subsections where needed
- Include 3-4 internal links to the main booking page: ${siteUrl}
- Include 2-3 deep links to relevant pages (like /impressum, /privacy-policy, /terms-of-service)
- End with a natural, conversational call-to-action linking to ${siteUrl}

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

UNIQUENESS REQUIREMENTS:
- This post must be completely unique - never repeat content from other posts
- Use different examples, stories, and perspectives
- Vary the writing style and structure
- Include unique insights and tips
- Make the title distinctive and memorable

WRITING STYLE EXAMPLES:
GOOD: "I remember my first time driving a Tesla on the Autobahn - it was incredible. The instant acceleration when you need to pass someone? Game changer."
BAD: "It is important to note that Tesla vehicles provide excellent acceleration capabilities on German highways."

GOOD: "Here's what most people don't realize: charging in Germany is actually easier than you think."
BAD: "It should be noted that the charging infrastructure in Germany is well-developed."

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
