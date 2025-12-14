import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from '@tailwindcss/vite' //bạn thiếu dòng này nên bị lỗi

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
