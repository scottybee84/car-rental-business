# AI Blog Generation Setup Guide

## ✅ What's Been Set Up

1. **Blog Generation Script** (`scripts/generate-blog-post.js`)

   - **NEW**: Fetches recent Tesla/Elon Musk/EV news
   - **NEW**: Creates opinion pieces that spin news positively
   - **NEW**: Unique images for each blog post
   - Generates human-like, SEO-optimized blog posts
   - Includes internal linking to main page and deep links
   - Uses OpenAI GPT-4o-mini for cost efficiency
   - Connects news to Tesla rental benefits in Germany

2. **GitHub Actions Workflow** (`.github/workflows/generate-blog.yml`)
   - Runs **twice daily** at 2 AM and 2 PM UTC
   - Can be triggered manually
   - Fetches latest news before generating content
   - Auto-commits and pushes new blog posts
   - **Automatically regenerates sitemap** with new posts
   - Creates timely, relevant opinion pieces

## 📰 News API Setup (Optional but Recommended)

For the best results, add a News API key (free tier available):

1. Sign up at https://newsapi.org/register (free)
2. Get your API key
3. Add to GitHub Secrets:
   - Name: `NEWS_API_KEY`
   - Value: your-api-key-here

**Without News API**: System will still generate high-quality opinion pieces using general Tesla/EV topics.

See `NEWS_API_SETUP.md` for detailed instructions.

## 🔐 Step 1: Add OpenAI API Key to GitHub Secrets

**IMPORTANT:** Never commit your API key to the repository!

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `OPENAI_API_KEY`

5. Click **Add secret**

## 🧪 Step 2: Test the Script Locally (Optional)

```bash
# Set your API key as environment variable (DO NOT commit this!)
export OPENAI_API_KEY="your-api-key-here"

# Run the script
node scripts/generate-blog-post.js
```

**⚠️ WARNING:** Never commit your actual API key to the repository!

## 🚀 Step 3: Trigger First Blog Post

### Option A: Manual Trigger (Recommended for first test)

1. Go to **Actions** tab in GitHub
2. Select **Generate Daily Blog Post** workflow
3. Click **Run workflow** → **Run workflow**

### Option B: Wait for Scheduled Run

- First automatic run: Tomorrow at 2 AM UTC
- Or adjust the cron schedule in `.github/workflows/generate-blog.yml`

## 📝 What Each Blog Post Includes

### Content Features:

- ✅ **Human-like writing**: Conversational tone, natural flow, personal anecdotes
- ✅ **SEO optimized**: 1100-1500 words, proper keyword usage
- ✅ **Internal linking**: 3-4 links to main page (`https://voltvoyages.io`)
- ✅ **Deep linking**: 2-3 links to relevant pages (privacy, terms, etc.)
- ✅ **Proper structure**: H2/H3 headings, HTML formatting
- ✅ **Rich content**: Examples, tips, real-world scenarios

### Blog Post Structure:

```json
{
  "title": "SEO-optimized title (60-70 chars)",
  "slug": "url-friendly-slug",
  "category": "Guides|Reviews|Tips|News",
  "readTime": "6-8 min read",
  "content": "1100-1500 words with HTML formatting",
  "excerpt": "150-200 character hook",
  "keywords": ["keyword1", "keyword2", ...],
  "image": "URL to relevant image",
  "publishedAt": "ISO date string",
  "featured": false,
  "author": {
    "name": "Random Author Name",
    "bio": "Travel enthusiast and Tesla rental expert..."
  }
}
```

### Author System:

- ✅ **Random author assignment** - Each post gets a unique author from a pool of 60+ names
- ✅ **Consistent per time slot** - Same author for same time/day combination
- ✅ **Diverse names** - Mix of genders, ethnicities, and backgrounds
- ✅ **Author displayed** on blog post pages
- ✅ **Structured data** includes author information for SEO

## 🔗 Internal Linking Strategy

### Main Page Links (3-4 per post):

- "book your Tesla rental in Germany"
- "rent a Tesla Model Y"
- "check availability for your dates"
- "reserve your Tesla today"
- "get started with your rental"

### Deep Links (2-3 per post):

- Privacy policy (when discussing data/booking)
- Terms of service (when discussing requirements)
- Other relevant pages contextually

## ⚙️ Customization

### Change Schedule:

Edit `.github/workflows/generate-blog.yml`:

```yaml
schedule:
  - cron: "0 2 * * *" # First run (UTC)
  - cron: "0 14 * * *" # Second run (UTC)
```

**Current Schedule:** Twice daily (2 AM and 2 PM UTC)

### Add More Topics:

Edit `blogTopics` array in `scripts/generate-blog-post.js`

### Adjust Content Length:

Edit the prompt in `scripts/generate-blog-post.js`:

- Change "1100-1500 words" to your preferred range

## 📊 Monitoring

### Check Blog Posts:

- View `src/data/blogPosts.json` to see all generated posts
- Posts are automatically added to the sitemap
- Check GitHub Actions logs for any errors

### View Generated Posts:

- Posts appear on your site at `/blog-posts/[slug]`
- Homepage blog section shows latest posts

## 💰 Cost Estimate

- **Model**: GPT-4o-mini (cost-efficient)
- **Tokens per post**: ~2000-3000 tokens
- **Cost per post**: ~$0.01-0.02
- **Posts per day**: 2
- **Monthly cost**: ~$0.60-1.20 (60 posts/month)
- **5-year cost**: ~$36-72 total

## 🎯 Uniqueness Guarantee

- ✅ **730+ base topics** with variations
- ✅ **Date + time-based seeding** ensures unique topic selection
- ✅ **Topic variations** (8 different formats per base topic)
- ✅ **Author rotation** (60+ different authors)
- ✅ **AI temperature 0.9** for maximum variation
- ✅ **5 years coverage**: 3,650 posts (2 per day × 365 × 5)
- ✅ **No duplicate content** - each post is completely unique

## 🐛 Troubleshooting

### Blog post not generating:

1. Check GitHub Actions logs
2. Verify `OPENAI_API_KEY` secret is set correctly
3. Check API key has sufficient credits

### Posts not appearing on site:

1. Verify `src/data/blogPosts.json` was updated
2. Check that build process includes blog data
3. Verify blog component is loading JSON correctly

### Links not working:

1. Check that links use correct domain (`https://voltvoyages.io`)
2. Verify deep links use correct paths
3. Test links after deployment

## ✅ Next Steps

1. ✅ Add `OPENAI_API_KEY` to GitHub Secrets
2. ✅ Trigger first blog post manually
3. ✅ Verify post appears on site
4. ✅ Check internal links work correctly
5. ✅ Monitor for a few days to ensure automation works

Your blog will now generate fresh, SEO-optimized content daily! 🚀
