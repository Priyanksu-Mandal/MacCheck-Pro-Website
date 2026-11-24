# 🚀 MacCheck Pro Website Deployment Guide

This directory (`website/`) contains a high-converting, responsive landing page and checkout system for selling **MacCheck Pro**.

It has **zero build steps** and runs as a pure static web application with modern Tailwind styling, dark glassmorphic design, embedded screenshots, and Razorpay integration.

---

## 💻 1. How to Preview & Test Locally

You can test the website immediately on your Mac with any of these methods:

### Method A: Quick Double-Click
Simply double-click `website/index.html` to open it directly in Safari, Chrome, or any browser.

### Method B: Using Python's built-in web server
Run in Terminal:
```bash
cd "/Users/uttammandal/Downloads/Mac Check/website"
python3 -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

### Method C: Using Node/Npx
```bash
npx serve website
```

---

## 🌐 2. Deploying to GitHub Pages (100% Free Forever)

GitHub Pages allows you to host this website free of charge with HTTPS and custom domain support.

### Option 1: Automatic GitHub Actions (Recommended)
We have included a GitHub Actions workflow in `.github/workflows/deploy-website.yml`.
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Add modern MacCheck Pro landing page & Razorpay integration"
   git push origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Every time you push to `main`, GitHub will automatically build and publish the site!

### Option 2: Deploy from the `/docs` or `gh-pages` branch
If you prefer not using GitHub Actions:
1. In repository settings, navigate to **Settings** → **Pages**.
2. Under **Source**, choose **Deploy from a branch**.
3. Or duplicate `website/` to a `docs/` folder at the repo root and select `/docs` as the publishing source.

---

## ⚡ 3. Deploying to Vercel (Fastest 1-Click Deployment)

Vercel provides edge hosting, global CDN, and automatic SSL.

1. Install Vercel CLI (or go to [vercel.com](https://vercel.com)):
   ```bash
   npm i -g vercel
   ```
2. In terminal, navigate to the `website` directory and deploy:
   ```bash
   cd website
   vercel --prod
   ```
3. Or in the Vercel dashboard:
   - Click **Add New Project** → Import your GitHub repository.
   - Set **Root Directory** to `website`.
   - Click **Deploy**. Done in 10 seconds!

---

## 🛡️ 4. Deploying to Netlify or Cloudflare Pages

### Netlify:
- Drag and drop the `website` folder into the [Netlify Drop Zone](https://app.netlify.com/drop) for instant deployment without connecting Git!

### Cloudflare Pages:
- Connect your GitHub repo, set the build output directory to `website`, and deploy.

---

## 🏷️ 5. Setting up a Custom Domain (e.g. `maccheck.app` or `maccheckpro.com`)

1. Purchase a domain from Cloudflare, Namecheap, GoDaddy, or Porkbun.
2. In your GitHub Pages / Vercel / Netlify dashboard:
   - Add your custom domain under **Custom Domains**.
3. In your DNS provider:
   - Add a `CNAME` record pointing to your GitHub Pages or Vercel URL.
   - For apex domains (`maccheck.app`), add the recommended `A` records.
4. SSL certificate is provisioned automatically within minutes.

---

## 📁 Directory Structure

```
website/
├── index.html            # Main Apple-grade dark landing page
├── success.html          # Post-payment order confirmation & DMG download
├── favicon.png           # App icon favicon
├── assets/
│   ├── css/
│   │   └── styles.css    # macOS dark mode design system & animations
│   ├── js/
│   │   └── main.js       # Razorpay checkout, currency toggle, tabs, simulator
│   └── images/           # All application UI screenshots & DMG graphics
│       ├── logo.png
│       ├── dashboard-score.jpg
│       ├── spatial-audio.png
│       ├── screen-xdr.png
│       ├── keyboard-matrix.png
│       ├── camera-mic.png
│       ├── stress-test.png
│       ├── network-benchmark.png
│       ├── physical-playbook.jpg
│       ├── inspection-certificate.jpg
│       └── installer-dmg.jpg
├── SETUP-RAZORPAY.md     # Step-by-step payment gateway linking guide
└── README.md             # This deployment guide
```
