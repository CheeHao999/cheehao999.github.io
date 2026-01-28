# GitHub Pages Deployment Guide

## **What was fixed:**

### 1. ✅ **Fixed Favicon Path** (`index.html`)
- **Before:** `href="/vite.svg"` ❌ (absolute path - breaks on GitHub Pages)
- **After:** `href="./vite-project/public/vite.svg"` ✅ (relative path)

### 2. ✅ **Fixed Script Path** (`index.html`)
- **Before:** `src="vite-project/src/main.ts"` (incorrect module path)
- **After:** `src="./vite-project/src/main.ts"` (correct relative path)

### 3. ✅ **Created Vite Configuration** (`vite.config.js`)
- Sets `base: '/e-portfolio/'` for GitHub Pages deployment
- **Important:** Change `e-portfolio` to your actual repository name if different

### 4. ✅ **Created GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
- Automatically builds and deploys on every push to `main` branch

---

## **How to Deploy to GitHub Pages:**

### **Step 1: Update Repository Settings**
1. Go to your repository on GitHub
2. Navigate to **Settings → Pages**
3. Under "Build and deployment":
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` / `root`

### **Step 2: Update Vite Config (if repo name differs)**
If your repository is NOT named `e-portfolio`, update `vite.config.js`:
```javascript
base: '/your-actual-repo-name/'
```

### **Step 3: Push to GitHub**
```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### **Step 4: Automatic Deployment**
- GitHub Actions will automatically build and deploy
- Check **Actions** tab to see build progress
- Your site will be live at: `https://your-username.github.io/e-portfolio/`

---

## **Manual Build & Deploy (if needed):**

```bash
# Build the project
npm install
cd vite-project
npm install
GITHUB_PAGES=true npm run build

# Deploy built files to gh-pages branch
# (requires github CLI or manual upload)
gh pages deploy ../dist --source=root
```

---

## **Path Rules Summary:**

| Path Type | Example | GitHub Pages Result | Status |
|-----------|---------|-------------------|--------|
| Absolute | `/assets/image.png` | `username.github.io/assets/image.png` | ❌ 404 |
| Relative | `./assets/image.png` | `username.github.io/e-portfolio/assets/image.png` | ✅ Works |
| Relative Current | `vite.svg` | `username.github.io/e-portfolio/vite.svg` | ✅ Works |
| Full URL | `https://example.com/x` | External link | ✅ Works |

---

## **Testing Locally:**

To test with the GitHub Pages base path locally:
```bash
cd vite-project
npm run preview  # Preview production build
# Or with the base path:
# npm run build && npm run preview
```

---

## **Troubleshooting:**

### **404 on Images/Styles:**
- Check that all paths use relative paths (start with `./` or no leading `/`)
- Verify file exists in public folder
- Check the `vite.config.js` base path matches your repo name

### **GitHub Pages Not Deploying:**
- Check `.github/workflows/deploy.yml` is committed
- Verify branch is set to `gh-pages` in repository Settings
- Check GitHub Actions tab for build errors

### **Infinite Redirect:**
- Ensure `base` in `vite.config.js` ends with `/`
- Example: `/e-portfolio/` not `/e-portfolio`
