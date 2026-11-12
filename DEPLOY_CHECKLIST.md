# 🚀 Deployment Checklist for Vincent's ML Portfolio

Follow this checklist to successfully deploy your portfolio to Vercel.

---

## ✅ Pre-Deployment Checklist

### 1. Verify Build Passes

- [ ] **Double-click `CHECK_BUILD.bat`**
  - Runs ESLint check
  - Runs TypeScript check
  - Runs production build
  - All should pass without errors

**OR manually run:**
```bash
npm run lint
npm run build
```

Expected result: `✓ Compiled successfully` 

---

### 2. Test Locally

- [ ] **Double-click `START_SERVER.bat`** (or run `npm run dev`)
- [ ] Visit http://localhost:3000
- [ ] Check:
  - [ ] Homepage loads correctly
  - [ ] All 9 projects appear on `/projects` page
  - [ ] Category filtering works
  - [ ] Click into individual project pages
  - [ ] About page shows your info
  - [ ] Contact form displays properly
  - [ ] Mobile responsive (resize browser window)

---

### 3. Review Content

- [ ] **Projects**: All 9 projects have correct info
  - knowledge-distillation-efficientnet
  - real-time-audio-subtitling
  - credit-default-prediction
  - neural-network-from-scratch
  - heart-health-prediction
  - beefood-campus-preorder
  - xray-disease-classification
  - phrase-level-sentiment-analysis
  - asl-gesture-recognition

- [ ] **About page**: Info is accurate (currently has placeholder experience/education)
- [ ] **Contact page**: Your preferred contact method
- [ ] **GitHub link**: Points to github.com/Vinz602

---

### 4. Optional Customizations

Before deploying, you might want to:

- [ ] Update experience section in `app/about/page.tsx`
- [ ] Update education section in `app/about/page.tsx`
- [ ] Add real project images to `public/images/projects/`
- [ ] Add your real email to contact form
- [ ] Update LinkedIn/Twitter links in About page

**These can also be done after deployment!**

---

## 🔧 Deployment Steps

### Step 1: Push to GitHub

- [ ] **Double-click `PUSH_TO_GITHUB.bat`**

**OR manually:**
```bash
git add .
git commit -m "Fix ESLint errors and prepare for deployment"
git push origin main
```

**First time?** You'll need to create the GitHub repository first:

1. Go to https://github.com/new
2. Repository name: `ml-portfolio` (or your choice)
3. Make it Public
4. **Don't** check "Initialize with README"
5. Click "Create repository"
6. Run these commands:
```bash
git remote add origin https://github.com/Vinz602/ml-portfolio.git
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy to Vercel

- [ ] Go to https://vercel.com
- [ ] Sign up / Log in (use GitHub login for easier setup)
- [ ] Click **"Add New..."** → **"Project"**
- [ ] Click **"Import Git Repository"**
- [ ] Find and select your `ml-portfolio` repository
- [ ] Vercel will auto-detect Next.js settings:
  - Framework Preset: **Next.js** ✅
  - Root Directory: `./` ✅
  - Build Command: `npm run build` ✅
  - Output Directory: `out` ✅
- [ ] Click **"Deploy"**
- [ ] Wait 2-3 minutes ⏱️
- [ ] **Success!** Your site is live! 🎉

---

### Step 3: Verify Deployment

- [ ] Visit your Vercel URL (e.g., `ml-portfolio-vinz602.vercel.app`)
- [ ] Check all pages load:
  - [ ] Homepage
  - [ ] Projects page
  - [ ] Individual project pages (click a few)
  - [ ] About page
  - [ ] Contact page
- [ ] Test on mobile (open on your phone)
- [ ] Share with a friend to verify

---

## 🎯 Post-Deployment

### Update GitHub Repository

- [ ] Add website URL to GitHub repo:
  1. Go to your repo on GitHub
  2. Click ⚙️ (Settings)
  3. Add Website: Your Vercel URL
  4. Description: "Machine Learning Portfolio - Next.js"
  5. Topics: `portfolio` `machine-learning` `nextjs` `typescript`

### Share Your Portfolio

- [ ] Add to LinkedIn profile (Featured section)
- [ ] Add to resume
- [ ] Pin repository on GitHub profile
- [ ] Share on Twitter/X
- [ ] Add to email signature

---

## 🔄 Making Updates

After deployment, to update your site:

1. Edit files locally
2. Test with `npm run dev`
3. Commit: `git add . && git commit -m "Update X"`
4. Push: `git push`
5. **Vercel automatically rebuilds!** ✨

No need to manually redeploy. Every push to `main` triggers a new deployment.

---

## 📊 Optional Enhancements

After your portfolio is live:

### Add Analytics

Install Vercel Analytics:
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

<Analytics />
```

### Custom Domain

1. Buy domain (Namecheap, Google Domains, etc.)
2. In Vercel: Settings → Domains
3. Add your domain and follow DNS setup
4. Free SSL certificate included!

### SEO Optimization

- Add meta descriptions to each page
- Create `sitemap.xml`
- Add Open Graph images
- Submit to Google Search Console

---

## 🐛 Troubleshooting

### Build fails on Vercel

**Check Vercel build logs** for specific error

Common fixes:
- Ensure Node 18+ in Vercel settings
- Check all dependencies are in `package.json`
- Verify no TypeScript errors locally

### Projects not showing

- Check markdown files are in `content/projects/`
- Verify frontmatter format is correct
- Check file names don't have spaces

### Images not loading

- Images must be in `public/` directory
- Reference as `/images/...` (not `../public/images/...`)
- Use `.jpg` or `.png` format

---

## ✨ Success Criteria

Your deployment is successful when:

✅ Vercel build completes without errors  
✅ Site loads at your Vercel URL  
✅ All 9 projects display correctly  
✅ Navigation works between pages  
✅ Mobile responsive design works  
✅ GitHub link works  
✅ Contact form displays properly  

---

## 🎉 Ready to Deploy?

**Start with Step 1:** Double-click `CHECK_BUILD.bat`

If it passes, you're ready to go live! 🚀

---

**Questions or issues?**
- Check `DEPLOYMENT_GUIDE.md` for detailed help
- Review `ESLINT_FIXES.md` for what was fixed
- Vercel docs: https://vercel.com/docs

**Good luck with your deployment!** 🌟
