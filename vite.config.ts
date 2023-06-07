import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@modules/*": path.resolve(__dirname, "./src/modules"),
      "@services/*": path.resolve(__dirname, "./src/services"),
      "@shared/*": path.resolve(__dirname, "./src/shared"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@utils/*": path.resolve(__dirname, "./src/utils"),
      "@config/*": path.resolve(__dirname, "./config"),
      "@types": path.resolve(__dirname, "./src/types.ts"),
      "@public/*": path.resolve(__dirname, "./public"),
      "@redux/*": path.resolve(__dirname, "./src/redux"),
    },
  },
});
