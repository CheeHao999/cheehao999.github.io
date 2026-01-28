import { defineConfig } from 'vite'

export default defineConfig({
  // Set base to repo name for GitHub Pages deployment
  // Change 'cheehao999.github.io' to your actual repository name
  // For local development, this is '/'. For GitHub Pages, it should be '/repo-name/'
  base: process.env.GITHUB_PAGES ? '/cheehao999.github.io/' : '/',
  
  build: {
    // Output directory for production build
    outDir: '../../dist',
    // Clear output directory before build
    emptyOutDir: true,
  }
})
