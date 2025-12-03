# GitHub Secrets Checklist

## Required Secrets for Full Automation

Add these to: **GitHub Repo** → **Settings** → **Secrets and variables** → **Actions**

---

## ✅ Core Blog Generation

### 1. OPENAI_API_KEY
- **Purpose**: AI content and image generation
- **Get it**: https://platform.openai.com/api-keys
- **Cost**: ~$3.60/month for 60 posts
- **Status**: ✅ Already set up

---

## 🤖 AI Detection Bypass

### 2. UNDETECTABLE_AI_KEY
- **Purpose**: Humanize content to bypass AI detection (100% → 15-30%)
- **Value**: `7f5e2a0c-fda0-4233-8baa-f5c880741bc4`
- **Get it**: https://undetectable.ai (already have)
- **Cost**: ~$30-40/month for 100K words
- **Status**: ⚠️ NEED TO ADD

---

## 📰 News Fetching (Optional)

### 3. NEWS_API_KEY
- **Purpose**: Fetch recent Tesla/Elon Musk news
- **Get it**: https://newsapi.org/register (free tier: 100 requests/day)
- **Cost**: FREE
- **Status**: ⚠️ OPTIONAL - Already have key

---

## 📍 Google Indexing (Fast SEO)

### 4. GOOGLE_SERVICE_ACCOUNT_JSON
- **Purpose**: Submit URLs to Google for immediate indexing
- **Get it**: Google Cloud Console → Service Account → Create Key (JSON)
- **Format**: Full JSON file contents
- **Cost**: FREE
- **Setup time**: 20 minutes
- **Status**: ⚠️ NEED TO SET UP

**Instructions**: See CONTENT_PROMOTION_SETUP.md → Section 1

---

## 📱 Social Media Sharing

### 5. BUFFER_ACCESS_TOKEN
- **Purpose**: Auto-share posts to Twitter/X and LinkedIn
- **Get it**: https://buffer.com/developers/apps
- **Cost**: FREE (up to 3 social accounts)
- **Setup time**: 10 minutes
- **Status**: ⚠️ NEED TO SET UP

### 6. BUFFER_PROFILE_IDS
- **Purpose**: Specify which social accounts to post to
- **Format**: Comma-separated IDs: `twitter_id,linkedin_id`
- **Get it**: Buffer API call (see setup docs)
- **Cost**: FREE
- **Status**: ⚠️ NEED TO SET UP

**Instructions**: See CONTENT_PROMOTION_SETUP.md → Section 2

---

## 📝 Medium Syndication

### 7. MEDIUM_INTEGRATION_TOKEN
- **Purpose**: Publish posts to Medium.com (100M+ readers)
- **Get it**: https://medium.com/me/settings/security
- **Cost**: FREE (API access)
- **Setup time**: 5 minutes
- **Status**: ⚠️ NEED TO SET UP

### 8. MEDIUM_USER_ID
- **Purpose**: Your Medium account ID
- **Get it**: Medium API call or profile URL
- **Cost**: FREE
- **Status**: ⚠️ NEED TO SET UP

**Instructions**: See CONTENT_PROMOTION_SETUP.md → Section 3

---

## 📧 Optional: Email Marketing

### 9. SENDGRID_API_KEY (Future)
- **Purpose**: Email new posts to subscribers
- **Get it**: https://sendgrid.com/
- **Cost**: FREE (100 emails/day)
- **Status**: ⏸️ NOT IMPLEMENTED YET

---

## Quick Setup Priority

### Priority 1 (Critical):
1. ✅ `OPENAI_API_KEY` - Already set
2. ⚠️ `UNDETECTABLE_AI_KEY` - Add now (have the key)

### Priority 2 (High Impact):
3. ⚠️ `GOOGLE_SERVICE_ACCOUNT_JSON` - 20 min setup, huge SEO benefit
4. ⚠️ `BUFFER_ACCESS_TOKEN` + `BUFFER_PROFILE_IDS` - 10 min setup, immediate social traffic

### Priority 3 (Good to Have):
5. ⚠️ `MEDIUM_INTEGRATION_TOKEN` + `MEDIUM_USER_ID` - 5 min setup, extra audience
6. ⚠️ `NEWS_API_KEY` - Already have, just need to add to secrets

---

## Total Setup Time

- **Minimum (humanization only)**: 2 minutes
  - Just add UNDETECTABLE_AI_KEY
  
- **Recommended (full promotion)**: 35 minutes
  - UNDETECTABLE_AI_KEY: 2 min
  - Google Indexing: 20 min
  - Buffer: 10 min
  - Medium: 5 min

- **Complete (with news)**: 37 minutes
  - Everything above + NEWS_API_KEY

---

## Testing Checklist

After adding secrets, test with manual workflow run:

1. Go to **Actions** → **Generate Daily Blog Post**
2. Click **Run workflow**
3. Watch the logs for:
   - ✅ Content humanized successfully
   - ✅ Google notified - page will be indexed soon
   - ✅ Shared to X social profiles
   - ✅ Published to Medium
4. Verify:
   - Blog post appears on your site
   - Post appears on Twitter/LinkedIn
   - Post appears on your Medium profile
   - Google Search Console shows indexing request

---

## Current Status Summary

| Secret | Status | Priority | Setup Time |
|--------|--------|----------|------------|
| OPENAI_API_KEY | ✅ Set | Critical | Done |
| UNDETECTABLE_AI_KEY | ⚠️ Need to add | Critical | 2 min |
| GOOGLE_SERVICE_ACCOUNT_JSON | ⚠️ Need setup | High | 20 min |
| BUFFER_ACCESS_TOKEN | ⚠️ Need setup | High | 5 min |
| BUFFER_PROFILE_IDS | ⚠️ Need setup | High | 5 min |
| MEDIUM_INTEGRATION_TOKEN | ⚠️ Need setup | Medium | 3 min |
| MEDIUM_USER_ID | ⚠️ Need setup | Medium | 2 min |
| NEWS_API_KEY | ⚠️ Have key, not added | Low | 1 min |

**Next action**: Add `UNDETECTABLE_AI_KEY` first, then set up promotion APIs for maximum impact!

