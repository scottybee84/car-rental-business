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

## 🐦 Twitter/X Auto-Posting (OAuth2)

### 5. TWITTER_CLIENT_ID
- **Purpose**: OAuth2 authentication for posting tweets (primary method)
- **Get it**: Twitter Developer Portal → App Settings → OAuth 2.0
- **Cost**: FREE (50 tweets/day on Free tier)
- **Setup time**: 15 minutes
- **Status**: ⚠️ NEED TO SET UP

### 6. TWITTER_CLIENT_SECRET
- **Purpose**: OAuth2 authentication secret
- **Get it**: Same place as Client ID (save it immediately!)
- **Cost**: FREE
- **Status**: ⚠️ NEED TO SET UP

**Instructions**: See TWITTER_SETUP.md for OAuth2 setup

---

## 🔐 Twitter/X OAuth 1.0a (for Media Upload)

### 7. TWITTER_API_KEY
- **Purpose**: OAuth 1.0a Consumer Key (needed for media upload)
- **Get it**: Twitter Developer Portal → Keys and tokens
- **Cost**: FREE
- **Status**: ⚠️ NEED TO SET UP

### 8. TWITTER_API_SECRET
- **Purpose**: OAuth 1.0a Consumer Secret
- **Get it**: Same place as API Key
- **Cost**: FREE
- **Status**: ⚠️ NEED TO SET UP

### 9. TWITTER_ACCESS_TOKEN
- **Purpose**: OAuth 1.0a User Access Token
- **Get it**: Generate in Twitter Developer Portal
- **Cost**: FREE
- **Status**: ⚠️ NEED TO SET UP

### 10. TWITTER_ACCESS_SECRET
- **Purpose**: OAuth 1.0a Access Token Secret
- **Get it**: Same place as Access Token
- **Cost**: FREE
- **Status**: ⚠️ NEED TO SET UP

**Note**: Both OAuth2 and OAuth1.0a credentials are needed - OAuth2 for posting, OAuth1.0a for media upload.

**Instructions**: See TWITTER_SETUP.md

---

## 📱 Social Media Sharing (Optional - Alternative to Twitter Direct)

### 11. BUFFER_ACCESS_TOKEN
- **Purpose**: Auto-share posts to Twitter/X and LinkedIn via Buffer
- **Get it**: https://buffer.com/developers/apps
- **Cost**: FREE (up to 3 social accounts)
- **Setup time**: 10 minutes
- **Status**: ⏸️ OPTIONAL (if using direct Twitter integration above)

### 12. BUFFER_PROFILE_IDS
- **Purpose**: Specify which social accounts to post to
- **Format**: Comma-separated IDs: `twitter_id,linkedin_id`
- **Get it**: Buffer API call (see setup docs)
- **Cost**: FREE
- **Status**: ⏸️ OPTIONAL

**Instructions**: See CONTENT_PROMOTION_SETUP.md → Section 2

---

## 📝 Medium Syndication (Optional)

### 13. MEDIUM_INTEGRATION_TOKEN
- **Purpose**: Publish posts to Medium.com (100M+ readers)
- **Get it**: https://medium.com/me/settings/security
- **Cost**: FREE (API access)
- **Setup time**: 5 minutes
- **Status**: ⏸️ OPTIONAL

### 14. MEDIUM_USER_ID
- **Purpose**: Your Medium account ID
- **Get it**: Medium API call or profile URL
- **Cost**: FREE
- **Status**: ⏸️ OPTIONAL

**Instructions**: See CONTENT_PROMOTION_SETUP.md → Section 3

---

## 📧 Optional: Email Marketing

### 15. SENDGRID_API_KEY (Future)
- **Purpose**: Email new posts to subscribers
- **Get it**: https://sendgrid.com/
- **Cost**: FREE (100 emails/day)
- **Status**: ⏸️ NOT IMPLEMENTED YET

---

## Quick Setup Priority

### Priority 1 (Critical):
1. ✅ `OPENAI_API_KEY` - Already set
2. ⚠️ `UNDETECTABLE_AI_KEY` - Add now (have the key)

### Priority 2 (High Impact - Twitter):
3. ⚠️ Twitter OAuth2: `TWITTER_CLIENT_ID` + `TWITTER_CLIENT_SECRET` - 15 min setup
4. ⚠️ Twitter OAuth1.0a: `TWITTER_API_KEY` + `TWITTER_API_SECRET` + `TWITTER_ACCESS_TOKEN` + `TWITTER_ACCESS_SECRET` - 5 min more
   - **Total Twitter setup**: 20 minutes for automatic tweet threads with images

### Priority 3 (SEO Boost):
5. ⚠️ `GOOGLE_SERVICE_ACCOUNT_JSON` - 20 min setup, huge SEO benefit (fast indexing)

### Priority 4 (Optional):
6. ⚠️ `NEWS_API_KEY` - Already have, just need to add to secrets (better blog topics)
7. ⏸️ `BUFFER_ACCESS_TOKEN` + `BUFFER_PROFILE_IDS` - Alternative to direct Twitter (if preferred)
8. ⏸️ `MEDIUM_INTEGRATION_TOKEN` + `MEDIUM_USER_ID` - Extra reach on Medium platform

---

## Total Setup Time

- **Minimum (humanization only)**: 2 minutes
  - Just add UNDETECTABLE_AI_KEY
  
- **Recommended (with Twitter automation)**: 40 minutes
  - UNDETECTABLE_AI_KEY: 2 min
  - Twitter OAuth2 + OAuth1.0a: 20 min
  - Google Indexing: 20 min

- **Complete (everything)**: 45 minutes
  - Everything above + NEWS_API_KEY: 1 min
  - Optional: Buffer (10 min) or Medium (5 min)

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
| TWITTER_CLIENT_ID | ⚠️ Need setup | High | 5 min |
| TWITTER_CLIENT_SECRET | ⚠️ Need setup | High | - |
| TWITTER_API_KEY | ⚠️ Need setup | High | 5 min |
| TWITTER_API_SECRET | ⚠️ Need setup | High | - |
| TWITTER_ACCESS_TOKEN | ⚠️ Need setup | High | 3 min |
| TWITTER_ACCESS_SECRET | ⚠️ Need setup | High | - |
| GOOGLE_SERVICE_ACCOUNT_JSON | ⚠️ Need setup | Medium | 20 min |
| NEWS_API_KEY | ⚠️ Have key, not added | Low | 1 min |
| BUFFER_ACCESS_TOKEN | ⏸️ Optional | Low | 5 min |
| BUFFER_PROFILE_IDS | ⏸️ Optional | Low | 5 min |
| MEDIUM_INTEGRATION_TOKEN | ⏸️ Optional | Low | 3 min |
| MEDIUM_USER_ID | ⏸️ Optional | Low | 2 min |

**Next action**: 
1. Add `UNDETECTABLE_AI_KEY` (2 min)
2. Set up Twitter OAuth2 + OAuth1.0a (20 min) - automatic tweet threads!
3. Set up Google Indexing (20 min) - fast SEO indexing!

