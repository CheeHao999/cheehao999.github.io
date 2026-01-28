import { defineConfig } from 'vite'

export default defineConfig({
  // Set base to repo name for GitHub Pages deployment
  // Change 'e-portfolio' to your actual repository name
  // For local development, this is '/'. For GitHub Pages, it should be '/repo-name/'
  base: process.env.GITHUB_PAGES ? '/e-portfolio/' : '/',
  
  build: {
    // Output directory for production build
    outDir: '../../dist',
    // Clear output directory before build
    emptyOutDir: true,
  }
})
