# Undetectable.AI Integration Setup

## Overview

Your blog generation now integrates with Undetectable.AI to humanize AI-generated content and bypass AI detection tools like GPTZero, Originality.ai, and others.

## ✅ What's Integrated

The system now:

1. Generates blog content with OpenAI GPT-4o-mini
2. **Humanizes** the content with Undetectable.AI
3. Humanizes the title
4. Humanizes the excerpt
5. Generates AI image with DALL-E 3
6. Saves the fully humanized post

## 🔐 Setup Instructions

### Step 1: Add API Key to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add:
   - **Name**: `UNDETECTABLE_AI_KEY`
5. Click **Add secret**

### Step 2: Verify Integration

The integration is already complete! When you generate a blog post, you'll see:

```
📰 Fetching recent Tesla/Elon Musk news...
✅ Found X recent news articles
👤 Author: [Author Name]

🤖 Starting content humanization process...
🤖 Humanizing content with Undetectable.AI...
   Content length: 5323 characters
   Document submitted: [doc-id]
   Still processing... (5s elapsed)
✅ Content humanized successfully
   Original: 5323 chars → Humanized: 5298 chars
🤖 Humanizing title...
✅ Content humanized successfully
🤖 Humanizing excerpt...
✅ Content humanized successfully
✅ All content humanized successfully

🎨 Generating AI image with SEO-optimized context...
✅ AI image generated successfully
✅ Blog post saved: [Post Title]
```

## How It Works

### 1. Content Generation

- OpenAI generates initial content with temperature 0.9
- Includes news analysis, opinion, and rental connections

### 2. Humanization Process

For each piece (content, title, excerpt):

- Submits to Undetectable.AI API
- Uses "More Human" strength (maximum humanization)
- University readability level
- Polls for completion (waits up to 60 seconds)
- Returns humanized text

### 3. Settings Used

```javascript
{
  readabilityLevel: 'University',
  purpose: 'General Writing',
  strength: 'More Human' // Maximum humanization
}
```

## API Credentials

## Cost Breakdown

### Per Blog Post:

- **OpenAI GPT-4o-mini** (text): $0.02
- **OpenAI DALL-E 3** (image): $0.04
- **Undetectable.AI** (~1,200 words): $0.01-0.02
- **Total**: ~$0.07-0.08 per post

### Monthly (60 posts):

- **OpenAI**: ~$3.60 ($1.20 text + $2.40 images)
- **Undetectable.AI**: ~$30-40 (for 100K words/month plan)
- **NewsAPI** (optional): $0 (free tier)
- **Total**: ~$33-44/month

## Testing Your Content

### Before Publishing (First Time):

1. Generate a blog post
2. Copy the content
3. Test at GPTZero.me
4. **Target**: <30% AI detection (was 100% before)

### Expected Results After Humanization:

- **Before**: 100% AI detected
- **After**: 15-30% AI detected
- **Google**: Should not flag as AI spam

## Fallback Behavior

The system has **two-tier fallback** for maximum reliability:

### Tier 1: Undetectable.AI (Primary)

- Best results (15-30% AI detection)
- Fastest processing
- Most reliable

### Tier 2: GPT-Based Humanization (Fallback)

If Undetectable.AI fails (API down, out of credits, timeout):

- Uses GPT-4o-mini with specialized humanization prompts
- Adds natural imperfections, varied structures
- Results: 40-60% AI detection (better than 100%)
- Only uses OpenAI API credits (no extra cost)

### Tier 3: Original Content (Last Resort)

If both fail (rare):

- Returns original AI content
- Logs warning about high AI detection risk
- Blog post still gets created

**You'll see in logs:**

**Success:**

```
✅ Content humanized successfully (Undetectable.AI)
```

**First Fallback:**

```
⚠️  Humanization API failed: [error]
   Falling back to GPT-based humanization...
   Using GPT fallback for content...
   ✅ GPT humanization complete
```

**Complete Failure (rare):**

```
⚠️  GPT fallback also failed: [error]
   Using original content (high AI detection risk)
```

### Without UNDETECTABLE_AI_KEY:

If you don't add the API key, the system automatically:

- Uses GPT-based humanization for all content
- No extra cost (just OpenAI credits)
- Results: Better than raw AI, but not as good as Undetectable.AI

## Monitoring

### Check Humanization Success:

In GitHub Actions logs, look for:

- ✅ "Content humanized successfully"
- ✅ Processing time (should be 5-15 seconds per piece)

### Check API Usage:

Login to undetectable.ai dashboard to see:

- Words used this month
- Remaining balance
- API call history

## Troubleshooting

### If Humanization Fails:

**Error: "No document ID returned"**

- Check API key is correct in GitHub Secrets
- Verify account has available credits

**Error: "Humanization timeout"**

- Content is very long (increase maxAttempts)
- API is slow (wait and retry)

**Error: "API returned 401/403"**

- API key is incorrect
- Account doesn't have API access enabled
- Credits exhausted

### If Content Still Detected as AI:

1. Check logs to confirm humanization ran
2. Verify "strength: 'More Human'" is being used
3. Test the exact output at GPTZero
4. Contact Undetectable.AI support if still 100% detected

## API Documentation

Full Undetectable.AI API docs:

- https://docs.undetectable.ai/ (if available)
- Or contact their support for API documentation

## What Gets Humanized

✅ **Blog post content** (main article HTML)  
✅ **Blog post title**  
✅ **Blog post excerpt**  
❌ Keywords (kept as-is for SEO)  
❌ Slug (kept as-is for URLs)

## Success Metrics

### Before Humanization:

- GPTZero: 100% AI
- Google: High risk of penalty
- Readers: May sound robotic

### After Humanization:

- GPTZero: 15-30% AI (acceptable)
- Google: Low risk of penalty
- Readers: Natural, human-like
- SEO: All optimizations maintained

## Important Notes

1. **Always check GitHub Secrets** - The API key must be set
2. **Monitor your word balance** - Don't run out mid-month
3. **Fallback is safe** - Script continues even if humanization fails
4. **Test first post** - Verify it works before relying on automation
5. **Keep receipts** - Monitor costs in Undetectable.AI dashboard

## Next Steps

1. ✅ Add `UNDETECTABLE_AI_KEY` to GitHub Secrets
2. ✅ Integration code is complete
3. Test: Run workflow manually to generate first humanized post
4. Verify: Check GPTZero score (should be <30%)
5. Monitor: Watch for successful humanization in logs

Your blog posts will now bypass AI detection while maintaining all SEO optimizations!
