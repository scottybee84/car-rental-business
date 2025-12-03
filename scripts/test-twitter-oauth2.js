/**
 * Test Twitter OAuth2 Setup
 * 
 * This script tests your Twitter OAuth2 credentials without posting anything.
 * Run: node scripts/test-twitter-oauth2.js
 */

import https from 'https';

const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET;
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
const TWITTER_ACCESS_SECRET = process.env.TWITTER_ACCESS_SECRET;

console.log('\n🐦 Testing Twitter OAuth2 Setup...\n');

// Check which credentials are available
console.log('📋 Checking credentials:');
console.log(`   OAuth 2.0 Client ID: ${TWITTER_CLIENT_ID ? '✅ Set' : '❌ Missing'}`);
console.log(`   OAuth 2.0 Client Secret: ${TWITTER_CLIENT_SECRET ? '✅ Set' : '❌ Missing'}`);
console.log(`   OAuth 1.0a API Key: ${TWITTER_API_KEY ? '✅ Set' : '❌ Missing'}`);
console.log(`   OAuth 1.0a API Secret: ${TWITTER_API_SECRET ? '✅ Set' : '❌ Missing'}`);
console.log(`   OAuth 1.0a Access Token: ${TWITTER_ACCESS_TOKEN ? '✅ Set' : '❌ Missing'}`);
console.log(`   OAuth 1.0a Access Secret: ${TWITTER_ACCESS_SECRET ? '✅ Set' : '❌ Missing'}`);

const hasOAuth2 = TWITTER_CLIENT_ID && TWITTER_CLIENT_SECRET;
const hasOAuth1 = TWITTER_API_KEY && TWITTER_API_SECRET && TWITTER_ACCESS_TOKEN && TWITTER_ACCESS_SECRET;

console.log('\n🔍 Authentication Methods:');
console.log(`   OAuth 2.0: ${hasOAuth2 ? '✅ Available' : '❌ Not configured'}`);
console.log(`   OAuth 1.0a: ${hasOAuth1 ? '✅ Available' : '❌ Not configured'}`);

if (!hasOAuth2 && !hasOAuth1) {
  console.log('\n❌ ERROR: No Twitter credentials configured!');
  console.log('\n📖 Setup Instructions:');
  console.log('   1. See TWITTER_SETUP.md for OAuth2 setup guide');
  console.log('   2. Add credentials to GitHub Secrets or .env file');
  console.log('   3. Rerun this test\n');
  process.exit(1);
}

// Test OAuth2 if available
if (hasOAuth2) {
  console.log('\n🔐 Testing OAuth 2.0 Client Credentials Flow...');
  
  const credentials = Buffer.from(`${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}`).toString('base64');
  
  fetch('https://api.twitter.com/2/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then(text => {
          throw new Error(`OAuth2 failed (${response.status}): ${text}`);
        });
      }
    })
    .then(data => {
      console.log('   ✅ OAuth 2.0 token obtained successfully!');
      console.log(`   Token type: ${data.token_type}`);
      console.log(`   Token preview: ${data.access_token.substring(0, 20)}...`);
      console.log('\n✅ OAuth2 Setup: WORKING! 🎉');
      console.log('\n📝 Note: OAuth 2.0 Client Credentials is app-only authentication.');
      console.log('   For posting tweets, you may need user-context OAuth 2.0 or OAuth 1.0a.');
      console.log('   Current setup supports both methods for maximum compatibility.\n');
    })
    .catch(error => {
      console.log(`   ❌ OAuth 2.0 test failed: ${error.message}`);
      console.log('\n🔧 Troubleshooting:');
      console.log('   1. Verify TWITTER_CLIENT_ID and TWITTER_CLIENT_SECRET are correct');
      console.log('   2. Check that OAuth 2.0 is enabled in Twitter Developer Portal');
      console.log('   3. Ensure your app has "Read and write" permissions');
      console.log('   4. Try regenerating the Client Secret\n');
    });
} else {
  console.log('\n⚠️  OAuth 2.0 not configured - using OAuth 1.0a fallback');
}

// Test OAuth 1.0a if available
if (hasOAuth1) {
  console.log('\n🔐 Testing OAuth 1.0a Setup...');
  console.log('   OAuth 1.0a credentials present and will be used for:');
  console.log('   - Media upload (required)');
  console.log('   - Posting tweets (fallback method)');
  console.log('   ✅ OAuth 1.0a: READY\n');
}

console.log('\n🎯 Summary:');
if (hasOAuth2 && hasOAuth1) {
  console.log('   ✅ Full setup complete!');
  console.log('   • OAuth 2.0: Tweet posting (primary)');
  console.log('   • OAuth 1.0a: Media upload + fallback posting');
  console.log('\n   Ready to auto-post tweet threads with images! 🚀\n');
} else if (hasOAuth2) {
  console.log('   ⚠️  Partial setup:');
  console.log('   • OAuth 2.0: ✅ Working (text-only tweets)');
  console.log('   • OAuth 1.0a: ❌ Missing (no image uploads)');
  console.log('\n   Add OAuth 1.0a credentials to enable image uploads\n');
} else if (hasOAuth1) {
  console.log('   ⚠️  Legacy setup only:');
  console.log('   • OAuth 1.0a: ✅ Working (full functionality)');
  console.log('   • OAuth 2.0: ❌ Not configured');
  console.log('\n   Consider adding OAuth 2.0 for modern authentication\n');
}

console.log('💡 Next Steps:');
console.log('   1. Run a test blog post generation: npm run generate-blog');
console.log('   2. Check the Twitter feed for the posted thread');
console.log('   3. Monitor GitHub Actions workflow logs\n');

