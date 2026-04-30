import { defineConfig } from "vite";
import { resolve } from "path";

process.env.BROWSER = "chrome";

export default defineConfig({
  base: "/",
  root: resolve(__dirname),
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "login.html"),
        register: resolve(__dirname, "register.html"),
        reset: resolve(__dirname, "reset-password.html"),
      },
    },
    assetsDir: "assets",
  },
  server: {
    hmr: { overlay: true },
    open: true,
    port: 3000,
  },
});
