import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/REACT_SERDAL/', // 👈 Add this line
  plugins: [react()],
});
