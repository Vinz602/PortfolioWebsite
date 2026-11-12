# Deployment Guide - Vincent's ML Portfolio

## ✅ LATEST UPDATE: Build Errors Fixed!

All ESLint errors have been resolved:
- ✅ Escaped apostrophes with `&apos;` in all JSX files
- ✅ Fixed ARIA role attribute in CategoryFilter component
- ✅ Ready for production build and Vercel deployment

**Run `CHECK_BUILD.bat` to verify the build passes before deploying!**

---

## 🚀 Quick Deploy to Vercel (Recommended - 5 minutes)

### Prerequisites
- GitHub account
- Vercel account (free) - sign up at vercel.com

### Step 1: Push to GitHub

1. **Initialize Git (if not already done):**
```bash
git init
git add .
git commit -m "Initial commit - ML Portfolio"
```

2. **Create GitHub repository:**
   - Go to github.com/new
   - Name it: `ml-portfolio` or `portfolio-website`
   - Don't initialize with README (you already have files)
   - Click "Create repository"

3. **Push to GitHub:**
```bash
git remote add origin https://github.com/Vinz602/your-repo-name.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

**Option A: Use Vercel Website (Easiest)**

1. Go to https://vercel.com
2. Click "Sign Up" → Sign in with GitHub
3. Click "Add New..." → "Project"
4. Import your `ml-portfolio` repository
5. **Configure:**
   - Framework Preset: **Next.js**
   - Root Directory: `./` (leave default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `out` (auto-detected)
6. Click "Deploy"
7. Wait 2-3 minutes
8. Done! Your site is live at `your-project.vercel.app`

**Option B: Use Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts, accept defaults
# Production deploy
vercel --prod
```

### Step 3: Configure Custom Domain (Optional)

1. In Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. SSL certificate auto-generated

---

## 🌐 Alternative: Deploy to Netlify

### Step 1: Push to GitHub (same as above)

### Step 2: Build locally

```bash
npm install
npm run build
```

This creates the `out/` folder with your static site.

### Step 3: Deploy to Netlify

**Option A: Drag and Drop (Easiest)**

1. Go to https://app.netlify.com
2. Sign up/login
3. Drag the `out/` folder onto the deploy area
4. Done! Site is live

**Option B: Connect GitHub**

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub
4. Select your repository
5. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `out`
6. Click "Deploy"

---

## 🔧 Build Configuration

Your `next.config.js` is already set for static export:

```javascript
const nextConfig = {
  output: 'export',  // Static export
  images: {
    unoptimized: true,  // Required for static export
  },
  trailingSlash: true,  // Better for static hosting
}
```

This means your site works on any static host!

---

## ✅ Pre-Deployment Checklist

Before deploying, make sure:

- [ ] Run `npm install` successfully
- [ ] Run `npm run build` without errors
- [ ] Test site locally with `npm run dev`
- [ ] All project markdown files have correct links
- [ ] Update your email in About/Contact pages
- [ ] Add real project images (or use placeholders)
- [ ] Commit all changes to Git
- [ ] Push to GitHub

---

## 🐛 Common Issues & Fixes

### Issue: Build fails on Vercel

**Check:**
- Node version (Vercel uses Node 18 by default)
- All dependencies in `package.json`
- No TypeScript errors

**Fix:**
Add to Vercel project settings → Environment Variables:
```
NODE_VERSION=18
```

### Issue: Images not loading

**Cause:** Image paths incorrect for static export

**Fix:** All images must be in `public/` and referenced as `/images/...`

### Issue: 404 on project pages

**Cause:** Dynamic routes not generated properly

**Fix:** Ensure `output: 'export'` in `next.config.js` and rebuild

### Issue: CSS not loading

**Cause:** Incorrect base path

**Fix:** Verify `trailingSlash: true` in config

---

## 📊 After Deployment

### Update GitHub Link

Once deployed, add the live URL to your GitHub repo:
1. Go to your GitHub repository
2. Click ⚙️ Settings
3. Add Website URL: `https://your-site.vercel.app`
4. Add description: "Machine Learning Portfolio"
5. Add topics: `portfolio`, `machine-learning`, `nextjs`, `react`

### Custom Domain Setup (Vercel)

1. Buy domain from Namecheap, Google Domains, etc.
2. In Vercel: Settings → Domains → Add
3. Add DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.19.19

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (up to 48 hours, usually minutes)

### Enable Analytics (Optional)

**Vercel Analytics (Free):**
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🔄 Continuous Deployment

Once connected to GitHub:

1. **Edit any file locally**
2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update project descriptions"
   git push
   ```
3. **Vercel/Netlify automatically rebuilds and deploys!**

No manual redeployment needed! 🎉

---

## 📱 Share Your Portfolio

After deployment, share at:
- LinkedIn: Add to "Featured" section
- Resume: Add portfolio URL
- GitHub: Pin the repository
- Twitter/X: Share your projects
- Email signature: Add portfolio link

---

## 🎯 Quick Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Test production build locally
npm run start

# Deploy to Vercel
vercel --prod

# Check for errors
npm run lint
```

---

## Need Help?

- Vercel docs: https://vercel.com/docs
- Netlify docs: https://docs.netlify.com
- Next.js docs: https://nextjs.org/docs

---

**Ready to deploy? Just follow Step 1 and Step 2 above!** 🚀

Your portfolio will be live in less than 5 minutes!
