import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv'
config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.NGROK_DOMAIN) || 5133
  },
  plugins: [react()],
})
