import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'copy-blog-data',
      closeBundle() {
        // Copy blog posts JSON to dist during build
        const srcPath = join(process.cwd(), 'src/data/blogPosts.json')
        const distPath = join(process.cwd(), 'dist/src/data/blogPosts.json')
        
        if (existsSync(srcPath)) {
          mkdirSync(join(process.cwd(), 'dist/src/data'), { recursive: true })
          copyFileSync(srcPath, distPath)
          console.log('✅ Copied blog posts data to dist')
        }
      }
    }
  ],
  optimizeDeps: {
    include: ['react-router-dom'],
    force: true
  }
})
