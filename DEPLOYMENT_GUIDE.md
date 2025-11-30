# Deployment Guide for VoltVoyage

This guide covers deploying your React + Vite site to the web and connecting your Hostinger domain.

## 🚀 Recommended: Deploy to GitHub Pages (Free & Simple)

**Why GitHub Pages?**
- ✅ Completely free
- ✅ Automatic deployments from GitHub
- ✅ Built-in SSL certificates
- ✅ Easy domain connection
- ✅ No third-party services needed
- ✅ Updates via `git push`

### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `voltvoyage`)
   - **Don't** initialize with README

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/voltvoyage.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Set Up GitHub Secrets (Environment Variables)

1. **Go to your repository** on GitHub
2. **Settings** → **Secrets and variables** → **Actions** (left sidebar)
3. **New repository secret** - Add these 4 secrets:
   - Name: `VITE_EMAILJS_SERVICE_ID` → Value: `service_gix2268`
   - Name: `VITE_EMAILJS_PUBLIC_KEY` → Value: `37v0CQHSpwl0lJ4ms`
   - Name: `VITE_EMAILJS_TEMPLATE_ID` → Value: `template_6thmv5u`
   - Name: `VITE_EMAILJS_CUSTOMER_TEMPLATE_ID` → Value: `template_ugvpv5j`

### Step 3: Enable GitHub Pages

The workflow file is already created (`.github/workflows/deploy.yml`). It will:
- Build your site automatically
- Deploy to GitHub Pages on every push

1. **Go to your repository** on GitHub
2. **Settings** → **Pages** (left sidebar)
3. **Source**: Select **"GitHub Actions"**
4. **Save**

Your site will be live at: `https://YOUR_USERNAME.github.io/voltvoyage/`

**Note**: After the first push, GitHub Actions will build and deploy. Check the "Actions" tab to see the deployment progress.

1. **Go to your repository** on GitHub
2. **Settings** → **Pages** (left sidebar)
3. **Source**: Select **"GitHub Actions"**
4. **Save**

Your site will be live at: `https://YOUR_USERNAME.github.io/voltvoyage/`

### Step 4: Connect Hostinger Domain

1. **In GitHub Pages Settings**:
   - Scroll to "Custom domain"
   - Enter your domain (e.g., `voltvoyage.com`)
   - Check "Enforce HTTPS"

2. **In Hostinger Dashboard**:
   - Go to DNS Management
   - Add/Update these DNS records:
     - **Type**: `A` Record
     - **Name**: `@` (or leave blank)
     - **Value**: `185.199.108.153` (GitHub Pages IP)
     - **TTL**: 3600
   
   - Add 3 more A records with these IPs:
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   
   - For `www` subdomain:
     - **Type**: `CNAME` Record
     - **Name**: `www`
     - **Value**: `YOUR_USERNAME.github.io`
     - **TTL**: 3600

3. **Wait**: DNS propagation takes 24-48 hours (usually faster)

### Step 5: Making Updates via VSCode

**Every time you make changes:**

1. **Edit files in VSCode** (as you normally do)
2. **Commit changes**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. **GitHub Actions automatically builds and deploys** - Your site updates in 2-3 minutes!

---

## 🌐 Alternative: Deploy to Vercel (Also Great for React)

**Why Vercel?**
- Free tier with excellent performance
- Automatic deployments from GitHub
- Built-in SSL certificates
- Easy domain connection
- Perfect for React/Vite apps

### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `voltvoyage`)
   - **Don't** initialize with README

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/voltvoyage.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Sign up/Login**: Go to https://vercel.com
2. **Import Project**: Click "Add New" → "Project" → Import your GitHub repo
3. **Configure**:
   - Framework Preset: **Vite**
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
4. **Environment Variables**: Add these in Vercel dashboard:
   - `VITE_EMAILJS_SERVICE_ID=service_gix2268`
   - `VITE_EMAILJS_PUBLIC_KEY=37v0CQHSpwl0lJ4ms`
   - `VITE_EMAILJS_TEMPLATE_ID=template_6thmv5u`
   - `VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=template_ugvpv5j`
5. **Deploy**: Click "Deploy"

### Step 3: Connect Hostinger Domain

1. **In Vercel Dashboard**:
   - Go to your project → Settings → Domains
   - Add your domain (e.g., `voltvoyage.com`)

2. **In Hostinger Dashboard**:
   - Go to DNS Management
   - Add/Update these DNS records:
     - **Type**: `A` Record
     - **Name**: `@` (or leave blank)
     - **Value**: `76.76.21.21` (Vercel's IP - check Vercel docs for current IP)
     - **TTL**: 3600
   
   - For `www` subdomain:
     - **Type**: `CNAME` Record
     - **Name**: `www`
     - **Value**: `cname.vercel-dns.com`
     - **TTL**: 3600

3. **Wait**: DNS propagation takes 24-48 hours (usually faster)

### Step 4: Making Updates via VSCode

**Every time you make changes:**

1. **Edit files in VSCode** (as you normally do)
2. **Commit changes**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. **Vercel automatically deploys** - Your site updates in 1-2 minutes!

---

## 🌐 Alternative: Deploy to Hostinger Hosting (Traditional)

If you prefer to use Hostinger's hosting directly:

### Step 1: Build Your Site

```bash
npm run build
```

This creates a `dist` folder with production-ready files.

### Step 2: Upload to Hostinger

1. **Access Hostinger File Manager** or use **FTP**:
   - FTP Host: `ftp.yourdomain.com`
   - Username: Your Hostinger FTP username
   - Password: Your Hostinger FTP password
   - Port: 21

2. **Upload files**:
   - Upload **all contents** of the `dist` folder to `public_html` (or your domain's root folder)
   - **Important**: Upload the contents, not the `dist` folder itself

3. **Create `.htaccess` file** in `public_html` (for React Router):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Step 3: Environment Variables

Since Hostinger doesn't support environment variables like Vercel, you'll need to:

1. **Create a config file** (we'll set this up)
2. **Or hardcode** (not recommended for production)

### Step 4: Making Updates

1. **Make changes in VSCode**
2. **Rebuild**: `npm run build`
3. **Upload new `dist` folder contents** to Hostinger

---

## 🔧 Setup for Hostinger Deployment (If using Hostinger)

If you choose Hostinger, we need to modify the code to work without environment variables. Let me know if you want to go this route and I'll help set it up.

---

## 📝 Quick Comparison

| Feature | GitHub Pages | Vercel | Hostinger Hosting |
|---------|--------------|--------|-------------------|
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Auto Deploy** | ✅ Yes (from GitHub) | ✅ Yes (from GitHub) | ❌ Manual upload |
| **SSL Certificate** | ✅ Automatic | ✅ Automatic | ✅ Included |
| **Performance** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Cost** | ✅ Free | ✅ Free tier | 💰 Paid hosting |
| **Updates** | `git push` | `git push` | Manual FTP upload |
| **Environment Variables** | ✅ GitHub Secrets | ✅ Easy | ⚠️ Requires setup |

---

## 🎯 Recommended Workflow

**Best Practice**: Use GitHub Pages + Hostinger domain

1. Push code to GitHub
2. Enable GitHub Pages (automatic deployment)
3. Connect Hostinger domain to GitHub Pages
4. Make updates in VSCode → `git push` → Auto-deploy

This gives you:
- ✅ Free hosting (GitHub Pages)
- ✅ Automatic deployments from GitHub
- ✅ Easy updates via `git push`
- ✅ Your custom domain
- ✅ No third-party services needed

---

## ❓ Need Help?

Let me know which option you prefer, and I can:
- Set up the GitHub repository
- Configure Vercel deployment
- Create the `.htaccess` file for Hostinger
- Set up environment variables properly
- Create a deployment script

