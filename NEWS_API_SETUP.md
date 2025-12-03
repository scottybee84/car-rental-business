# News API Setup for Blog Generation

## Overview

The blog generation system now fetches recent Tesla/Elon Musk news and creates opinion pieces that spin the news positively while connecting it to your Tesla rental business in Germany.

## Features

- **News-based content**: Fetches real-time Tesla/Elon Musk/EV news
- **Opinion pieces**: Creates engaging, passionate takes on the news
- **Positive spin**: All content frames news optimistically
- **Rental connection**: Links news to benefits of renting Teslas in Germany
- **Unique images**: Each post gets a different image

## Setup (Optional but Recommended)

### Get a News API Key (Free Tier Available)

1. **Sign up at NewsAPI.org**:

   - Go to https://newsapi.org/register
   - Sign up for a free account
   - Free tier includes: 100 requests/day (more than enough for 2 posts/day)

2. **Get your API key**:

   - After signing up, you'll see your API key
   - Copy it (looks like: `1234567890abcdef1234567890abcdef`)

3. **Add to GitHub Secrets**:
   ```
   Name: NEWS_API_KEY
   Value: your-api-key-here
   ```

### Without News API Key

If you don't set up a News API key, the system will:

- Use fallback Tesla-related topics
- Still generate high-quality opinion pieces
- Focus on general Tesla/EV industry developments

## How It Works

### With News API:

1. System fetches latest Tesla/Elon Musk news (up to 10 articles)
2. **Checks for duplicates**: Filters out news already covered in previous posts
3. AI analyzes the top 3 most recent NEW articles
4. Creates an opinion piece connecting the news to Tesla rentals in Germany
5. Spins the news positively and enthusiastically

### Duplicate Detection:

- Compares news article titles with existing blog post titles
- If 40%+ of significant words match, considers it already covered
- Automatically falls back to general Tesla topics if all news is duplicate
- Ensures fresh, unique content every time

### Content Style:

- **Personal voice**: Written as ${authorName}, a passionate Tesla advocate
- **Opinion-driven**: Strong takes, not just reporting
- **Positive framing**: All news spun to highlight benefits
- **Rental focus**: Always connects to why renting in Germany is great
- **Timely**: References current events to feel fresh and relevant

## Example Topics Generated

- "Tesla's Supercharger Expansion: Why NOW is the Perfect Time to Road Trip Germany"
- "What Elon's Latest Announcement Means for Your German Tesla Adventure"
- "The Real Story Behind Tesla's Production Numbers (And Why Renters Win)"
- "Tesla's New Battery Tech: How Germany Travelers Benefit First"

## AI-Generated Images (NEW!)

Each post gets a **custom AI-generated image** using OpenAI DALL-E 3:

- Generated based on the article title and content
- Shows Tesla Model Y in relevant German settings
- Professional, photographic style
- Unique to each article
- Guaranteed to work (hosted by OpenAI)
- Perfect match for the article topic

**Example prompts generated:**

- "Tesla Model Y on German autobahn with Supercharger expansion theme"
- "Tesla electric vehicle in beautiful German city, futuristic sustainable travel"
- "Tesla Model Y charging at modern EV station in Bavaria"

## Monitoring

Check the GitHub Actions logs to see:

```
📰 Fetching recent Tesla/Elon Musk news...
✅ Found 5 recent news articles
📰 Top article: [Article Title]
👤 Author: [Author Name]
```

## Cost

- **NewsAPI Free Tier**: $0 (100 requests/day)
- **OpenAI GPT-4o-mini**: ~$0.02 per blog post (text generation)
- **OpenAI DALL-E 3**: ~$0.04 per image (1792x1024, standard quality)
- **Total per blog post**: ~$0.06
- **Total per month**: ~$3.60 (for 60 posts/month)

**Cost Breakdown:**

- Text generation is very cheap with GPT-4o-mini
- AI images ensure perfect relevance and guaranteed working URLs
- No more broken image links
- Professional, custom imagery for each post

## Fallback Behavior

Without NEWS_API_KEY, posts will still be generated using:

- General Tesla industry topics
- EV market developments
- Autopilot/technology updates
- Supercharger network news
- Sustainability trends

All content remains high-quality, opinion-driven, and SEO-optimized.
