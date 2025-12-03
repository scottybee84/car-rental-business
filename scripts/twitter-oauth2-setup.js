/**
 * Twitter OAuth 2.0 Setup - Get Refresh Token
 * 
 * This script helps you authorize your app and get a refresh token
 * for automated posting. Run this ONCE to set up OAuth 2.0.
 * 
 * Usage: node scripts/twitter-oauth2-setup.js
 */

import crypto from 'crypto';
import http from 'http';
import { exec } from 'child_process';

const CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:3000/callback';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ Error: TWITTER_CLIENT_ID and TWITTER_CLIENT_SECRET must be set');
  console.error('\nSet them in your environment:');
  console.error('  export TWITTER_CLIENT_ID="your_client_id"');
  console.error('  export TWITTER_CLIENT_SECRET="your_client_secret"');
  process.exit(1);
}

console.log('\n🐦 Twitter OAuth 2.0 Setup - Get Refresh Token\n');
console.log('This will open your browser to authorize the app.');
console.log('After authorization, you\'ll get a REFRESH_TOKEN to add to GitHub Secrets.\n');

// Generate PKCE parameters
function base64URLEncode(str) {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const code_verifier = base64URLEncode(crypto.randomBytes(32));
const code_challenge = base64URLEncode(
  crypto.createHash('sha256').update(code_verifier).digest()
);

console.log('📝 Generated PKCE parameters...\n');

// Build authorization URL
const authParams = new URLSearchParams({
  response_type: 'code',
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  scope: 'tweet.read tweet.write users.read offline.access',
  state: 'state',
  code_challenge: code_challenge,
  code_challenge_method: 'S256',
});

const authUrl = `https://twitter.com/i/oauth2/authorize?${authParams.toString()}`;

console.log('🔐 Authorization URL:');
console.log(authUrl);
console.log('\n📌 Opening browser in 3 seconds...\n');

// Start local server to receive callback
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  
  if (url.pathname === '/callback') {
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
    
    if (error) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h1>❌ Authorization Failed</h1><p>Error: ${error}</p>`);
      console.error(`\n❌ Authorization failed: ${error}`);
      server.close();
      process.exit(1);
    }
    
    if (code) {
      console.log('✅ Authorization code received!');
      console.log('🔄 Exchanging code for tokens...\n');
      
      try {
        // Exchange code for tokens
        const tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
          },
          body: new URLSearchParams({
            code: code,
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            code_verifier: code_verifier,
          }).toString(),
        });
        
        if (!tokenResponse.ok) {
          const errorText = await tokenResponse.text();
          throw new Error(`Token exchange failed: ${errorText}`);
        }
        
        const tokens = await tokenResponse.json();
        
        // Success page
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <html>
            <head><title>Success!</title></head>
            <body style="font-family: system-ui; max-width: 800px; margin: 50px auto; padding: 20px;">
              <h1 style="color: #1DA1F2;">✅ Authorization Successful!</h1>
              <p>You can close this window and return to your terminal.</p>
              <p style="color: #666;">The refresh token has been displayed in your terminal.</p>
            </body>
          </html>
        `);
        
        // Display tokens
        console.log('✅ Success! Tokens received:\n');
        console.log('📋 COPY THIS TO GITHUB SECRETS:\n');
        console.log('═'.repeat(60));
        console.log(`Secret Name:  TWITTER_REFRESH_TOKEN`);
        console.log(`Secret Value: ${tokens.refresh_token}`);
        console.log('═'.repeat(60));
        console.log('\n📝 Instructions:');
        console.log('1. Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions');
        console.log('2. Click "New repository secret"');
        console.log('3. Name: TWITTER_REFRESH_TOKEN');
        console.log('4. Value: (paste the refresh token above)');
        console.log('5. Click "Add secret"\n');
        console.log('✅ Then your Twitter OAuth2 setup will be complete!\n');
        
        server.close();
        process.exit(0);
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<h1>❌ Error</h1><p>${error.message}</p>`);
        console.error(`\n❌ Error: ${error.message}`);
        server.close();
        process.exit(1);
      }
    }
  }
});

server.listen(3000, () => {
  console.log('🌐 Local server started on http://127.0.0.1:3000\n');
  
  // Open browser after 3 seconds
  setTimeout(() => {
    const openCommand = process.platform === 'darwin' ? 'open' : 
                       process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${openCommand} "${authUrl}"`);
  }, 3000);
});

console.log('⏳ Waiting for authorization...');
console.log('   (If browser doesn\'t open, copy the URL above)\n');

