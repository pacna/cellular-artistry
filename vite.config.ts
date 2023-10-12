import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/cellular-artistry/", // IMPORTANT: Set the base path for GH Page deployment
    plugins: [react()],
    server: {
        port: 3000,
    },
});
