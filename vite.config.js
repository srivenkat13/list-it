import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/list-it",
  plugins: [preact()],
})

// https://dev.to/rashidshamloo/deploying-vite-react-app-to-github-pages-35hf