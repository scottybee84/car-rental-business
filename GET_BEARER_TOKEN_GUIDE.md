# How to Get Bearer Token for Twitter OAuth 2.0

## What is the Bearer Token?

The **Bearer token** is the **Access Token** you get from Twitter's OAuth 2.0 authorization flow. It's used in the API call like this:

```bash
Authorization: Bearer <access_token>
```

## The Problem with Access Tokens

- ✅ Works for posting tweets
- ❌ **Expires in 2 hours**
- ❌ Can't use same token in GitHub Actions

## The Solution: Refresh Token

Twitter gives you TWO tokens:

1. **Access Token** (Bearer token)
   - Expires in 2 hours
   - Use this for API calls: `Authorization: Bearer <token>`

2. **Refresh Token** 
   - Lasts 6 months (auto-renews if used regularly)
   - Use this to get NEW access tokens automatically
   - **This is what you store in GitHub Secrets**

## Complete Flow

### One-Time Setup (Get Refresh Token)

```
You authorize app → Twitter gives you tokens
              ↓
        Access Token (2 hour lifetime)
        Refresh Token (6 month lifetime, store this!)
```

### Automated Posting (GitHub Actions)

```
GitHub Actions runs
        ↓
Uses Refresh Token → Get new Access Token
        ↓
Use Access Token as Bearer token
        ↓
Post tweet with: Authorization: Bearer <access_token>
```

## Step-by-Step: Get Your Refresh Token

### Step 1: Configure Twitter App

1. Go to https://developer.twitter.com/en/portal/dashboard
2. Click your app
3. Click **Settings** tab
4. Scroll to **"User authentication settings"**
5. Click **"Set up"** (if not set up) or **"Edit"**

Configure:
```
✓ App permissions: "Read and write"
✓ Type of App: "Web App, Automated App or Bot"
✓ Callback URI: http://127.0.0.1:3000/callback
✓ Website URL: https://voltvoyages.io
```

6. Click **Save**
7. **Wait 2-3 minutes** for settings to propagate

### Step 2: Run Authorization Script

```bash
cd "/Users/scottbrown/Desktop/Car Rental Business"

# Set your credentials
export TWITTER_CLIENT_ID="your_client_id_here"
export TWITTER_CLIENT_SECRET="your_client_secret_here"

# Run the script
node scripts/twitter-oauth2-setup.js
```

**What happens:**
1. Opens your browser
2. Shows Twitter authorization page
3. You click "Authorize app"
4. You get redirected to `http://127.0.0.1:3000/callback`
5. Script displays your **REFRESH_TOKEN**

### Step 3: Add Refresh Token to GitHub

1. Go to https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `TWITTER_REFRESH_TOKEN`
4. Value: (paste the refresh token from step 2)
5. Click **"Add secret"**

### Step 4: GitHub Actions Automation

Your workflow will automatically:

```javascript
// 1. Read refresh token from secrets
const refreshToken = process.env.TWITTER_REFRESH_TOKEN;

// 2. Exchange refresh token for NEW access token
const response = await fetch('https://api.twitter.com/2/oauth2/token', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${base64(clientId:clientSecret)}`,
  },
  body: 'grant_type=refresh_token&refresh_token=' + refreshToken
});

const { access_token } = await response.json();

// 3. Use access token as Bearer token
const tweetResponse = await fetch('https://api.x.com/2/tweets', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${access_token}`,  // <-- This is the Bearer token!
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text: 'Hello World' })
});
```

## Troubleshooting

### "You weren't able to give access to the App"

**Cause:** Twitter app OAuth 2.0 not configured correctly

**Fix:**
1. Verify OAuth 2.0 is enabled (Settings → User authentication settings)
2. Check callback URL is exactly: `http://127.0.0.1:3000/callback`
3. Ensure permissions are "Read and write"
4. Wait 2-3 minutes after saving settings

### "Missing required parameter [client_secret]"

**Cause:** Environment variables not set

**Fix:**
```bash
export TWITTER_CLIENT_ID="your_actual_client_id"
export TWITTER_CLIENT_SECRET="your_actual_client_secret"
```

### Where to find Client ID and Secret?

1. Go to https://developer.twitter.com/en/portal/dashboard
2. Click your app
3. Click **"Keys and tokens"** tab
4. Under **"OAuth 2.0 Client ID and Client Secret"**:
   - Client ID is shown
   - Client Secret: Click "Regenerate" if needed (only shows once!)

## Summary

**For Manual API Testing:**
- You need an **Access Token** (Bearer token)
- Get it from OAuth 2.0 flow
- Expires in 2 hours

**For GitHub Actions Automation:**
- You need a **Refresh Token**
- Store it in GitHub Secrets
- Script automatically gets new Bearer tokens
- Works forever (auto-renews)

**The script I created (`twitter-oauth2-setup.js`) does ALL of this for you!**

Just fix the Twitter app settings and run it again.

## Quick Verification

To verify your OAuth 2.0 setup is correct, check:

```
✓ Twitter app → Settings → User authentication settings → Edit
✓ Shows "OAuth 2.0 Client ID" 
✓ Shows callback URL: http://127.0.0.1:3000/callback
✓ App permissions: "Read and write"
✓ Type: "Web App, Automated App or Bot"
```

If all ✓ are checked, the authorization will work!

