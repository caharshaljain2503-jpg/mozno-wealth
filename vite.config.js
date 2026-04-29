import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  assetsInclude: ["**/*.glb", "**/*.gltf", "**/*.bin"],
  server: {
    host: true,
    allowedHosts: [
      "2ae9-2409-40c4-21d4-7cf3-6598-76a5-69da-8b70.ngrok-free.app",
      ".ngrok-free.app",
    ],
  },
})
