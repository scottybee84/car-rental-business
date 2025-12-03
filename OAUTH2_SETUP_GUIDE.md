# Twitter OAuth2 Setup - Complete Guide

## What Changed?

Your blog automation now uses **OAuth2** for posting tweets - a more modern and secure authentication method.

### Benefits of OAuth2:
- ✅ Simpler authentication flow
- ✅ More secure (automatic token refresh)
- ✅ Industry standard used by most APIs
- ✅ Better rate limits and features
- ✅ Easier to maintain and debug

### What You Need:
- **OAuth 2.0**: For posting tweets (primary method)
- **OAuth 1.0a**: For uploading images (Twitter requirement)

Both are needed for full functionality (tweet threads with images).

---

## Step-by-Step Setup

### Step 1: Access Twitter Developer Portal

1. Go to https://developer.twitter.com/
2. Log in with your Twitter account
3. If you haven't already, apply for **Elevated access**:
   - Go to **Products** → **Twitter API v2**
   - Click **Apply for Elevated**
   - Fill out the form (takes 1-2 hours for approval)
   - **Why**: "Automated blog post sharing for Tesla rental business"

### Step 2: Create or Access Your App

1. Go to https://developer.twitter.com/en/portal/dashboard
2. Click **Projects & Apps** in sidebar
3. Find your app "VoltVoyage Blog Automation" (or create new one)
4. Click on your app name to open settings

### Step 3: Configure OAuth 2.0

1. In your app settings, scroll to **User authentication settings**
2. Click **Set up** (or **Edit** if already configured)
3. Configure the following:

**App permissions:**
- ✅ Select: **Read and write** (required for posting)
- ❌ Not: Read-only

**Type of App:**
- ✅ Select: **Web App, Automated App or Bot**

**App info:**
- **Callback URI / Redirect URL**: `https://voltvoyages.io/callback`
- **Website URL**: `https://voltvoyages.io`

4. Click **Save**

### Step 4: Get OAuth 2.0 Credentials

After saving, you'll see:

1. **OAuth 2.0 Client ID** 
   - Example: `a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0`
   - Copy this - you'll need it for GitHub Secrets

2. **Client Secret**
   - ⚠️ **IMPORTANT**: Shows only once! Copy it immediately!
   - If you lose it, you'll need to regenerate
   - Keep it secret - never commit to GitHub!

### Step 5: Get OAuth 1.0a Credentials (for Media)

Twitter still requires OAuth 1.0a for uploading images.

1. In your app dashboard, go to **Keys and tokens** tab
2. You'll see:
   - **API Key** (also called Consumer Key)
   - **API Secret** (also called Consumer Secret)
3. Under **Authentication Tokens**, click **Generate**
   - You'll get: **Access Token** and **Access Token Secret**
   - Save these immediately!

### Step 6: Add All Credentials to GitHub

Go to your GitHub repository:

1. Click **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** for each:

#### OAuth 2.0 Secrets (2):

**Secret 1:**
- Name: `TWITTER_CLIENT_ID`
- Value: [Your OAuth 2.0 Client ID from Step 4]

**Secret 2:**
- Name: `TWITTER_CLIENT_SECRET`
- Value: [Your Client Secret from Step 4]

#### OAuth 1.0a Secrets (4):

**Secret 3:**
- Name: `TWITTER_API_KEY`
- Value: [Your API Key / Consumer Key from Step 5]

**Secret 4:**
- Name: `TWITTER_API_SECRET`
- Value: [Your API Secret / Consumer Secret from Step 5]

**Secret 5:**
- Name: `TWITTER_ACCESS_TOKEN`
- Value: [Your Access Token from Step 5]

**Secret 6:**
- Name: `TWITTER_ACCESS_SECRET`
- Value: [Your Access Token Secret from Step 5]

---

## Testing Your Setup

### Option 1: Test Locally

1. Create a `.env` file in your project root:
```bash
TWITTER_CLIENT_ID=your_client_id_here
TWITTER_CLIENT_SECRET=your_client_secret_here
TWITTER_API_KEY=your_api_key_here
TWITTER_API_SECRET=your_api_secret_here
TWITTER_ACCESS_TOKEN=your_access_token_here
TWITTER_ACCESS_SECRET=your_access_secret_here
```

2. Run the test script:
```bash
node scripts/test-twitter-oauth2.js
```

3. You should see:
```
✅ OAuth 2.0 token obtained successfully!
✅ OAuth 1.0a: READY
✅ Full setup complete!
```

### Option 2: Test via GitHub Actions

1. Go to **Actions** tab in GitHub
2. Select **Generate Daily Blog Post** workflow
3. Click **Run workflow**
4. Watch the logs - look for:
```
🐦 Posting to Twitter with OAuth2...
   ✅ OAuth2 access token obtained
   ✅ Image uploaded to Twitter (OAuth 1.0a)
   ✅ Posted 4-tweet thread to Twitter (OAuth 2.0)
```

---

## Troubleshooting

### "OAuth2 authentication failed"

**Cause**: Client ID or Secret is incorrect

**Fix**:
1. Double-check credentials in GitHub Secrets
2. Ensure no extra spaces or line breaks
3. Try regenerating Client Secret in Twitter Portal
4. Verify OAuth 2.0 is enabled in app settings

### "Failed to get OAuth2 access token"

**Cause**: App permissions or settings incorrect

**Fix**:
1. Check app has **Read and write** permissions
2. Verify **Type of App** is set to "Automated App or Bot"
3. Ensure Callback URI is set (any valid URL works)
4. Wait 5 minutes after changing settings

### "Image upload failed"

**Cause**: OAuth 1.0a credentials missing or incorrect

**Fix**:
1. Verify all 4 OAuth 1.0a secrets are set
2. Check Access Token and Secret are for YOUR app
3. Ensure tokens haven't been regenerated (invalidates old ones)
4. Verify file exists in `public/blog-images/`

### "Tweet posting failed - 403 Forbidden"

**Cause**: App doesn't have write permissions

**Fix**:
1. Go to app settings → User authentication settings
2. Change permissions to **Read and write**
3. Click **Save**
4. Regenerate Access Token and Secret
5. Update GitHub Secrets with new tokens

### "Rate limit exceeded"

**Limits on Free tier**:
- 50 tweets per day (OAuth 2.0)
- 1,500 tweets per month
- 5 requests per 15 minutes for some endpoints

**Fix**:
1. Your workflow runs 2x daily = 8 tweets/day (well under limit)
2. If testing frequently, wait 15 minutes between runs
3. Consider upgrading to Basic tier ($100/month) for 10K tweets/month

---

## Understanding Your Setup

### What OAuth 2.0 Does:
- ✅ Posts text tweets
- ✅ Creates tweet threads
- ✅ Replies to tweets (threading)
- ❌ Cannot upload media (Twitter limitation)

### What OAuth 1.0a Does:
- ✅ Uploads images/media
- ✅ Fallback for posting if OAuth2 fails
- ✅ Full API access (legacy support)

### Why Both?
Twitter's media upload endpoint (`media/upload`) only supports OAuth 1.0a. To post tweets with images, you need:
1. OAuth 1.0a to upload the image → get media ID
2. OAuth 2.0 to post tweet with media ID attached

This is why the script requires both credential sets for full functionality.

---

## Security Best Practices

### ✅ DO:
- Store credentials in GitHub Secrets only
- Regenerate tokens if accidentally exposed
- Use environment variables for local testing
- Add `.env` to `.gitignore`

### ❌ DON'T:
- Commit credentials to GitHub
- Share Client Secret or Access Secrets
- Use same credentials across multiple apps
- Disable write permissions after setup

---

## What Happens Automatically?

Once set up, every blog post will:

1. Generate AI content + image
2. Upload image to Twitter (OAuth 1.0a)
3. Post tweet 1 with image (OAuth 2.0)
4. Reply with tweet 2 (thread)
5. Reply with tweet 3 (thread)
6. Reply with tweet 4 with hashtags & link (thread)

**Result**: Professional 4-tweet thread with image, posted automatically 2x per day!

---

## Rate Limits Reference

### Free Tier (Current):
- 50 tweets/day
- 1,500 tweets/month
- Media uploads: 50/day

### Your Usage:
- 2 workflows/day × 4 tweets = 8 tweets/day
- 8 tweets/day × 30 days = 240 tweets/month

**You're using only 16% of your monthly limit!** ✅

---

## Next Steps

1. ✅ Complete OAuth2 setup (this guide)
2. ⏭️ Set up Google Indexing API (fast SEO)
3. ⏭️ Add Undetectable.AI key (humanize content)
4. ⏭️ Monitor Twitter analytics

See `GITHUB_SECRETS_CHECKLIST.md` for complete setup guide.

---

## Support

### Documentation:
- Twitter OAuth 2.0: https://developer.twitter.com/en/docs/authentication/oauth-2-0
- Twitter API v2: https://developer.twitter.com/en/docs/twitter-api

### Your Setup Files:
- `TWITTER_SETUP.md` - Original setup guide
- `scripts/generate-blog-post.js` - Implementation
- `scripts/test-twitter-oauth2.js` - Test script
- `.github/workflows/generate-blog.yml` - Automation workflow

---

**Questions?** Check the logs in GitHub Actions for detailed error messages.

**Success?** You'll see your blog posts appearing on Twitter automatically! 🎉

