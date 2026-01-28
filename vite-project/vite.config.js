import { defineConfig } from 'vite'

export default defineConfig({
  // For user/org GitHub Pages (username.github.io), base is always '/'
  // For project GitHub Pages, base would be '/repo-name/'
  base: '/',
  
  build: {
    // Output directory for production build (relative to vite-project/)
    outDir: '../dist',
    // Clear output directory before build
    emptyOutDir: true,
  }
})
