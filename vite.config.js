import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_BASE sets the public path when deploying under a sub-folder (default "/").
export default defineConfig({ base: process.env.VITE_BASE || '/', plugins: [react()] })
