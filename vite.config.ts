import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Porta 5174 escolhida porque a 5173 (padrão do Vite) já está em uso por outra aplicação local.
  // `strictPort` impede o Vite de "pular" para outra porta caso a 5174 também esteja ocupada,
  // evitando ambiguidade sobre onde a aplicação está rodando.
  server: {
    port: 5174,
    strictPort: true,
  },
  preview: {
    port: 5174,
    strictPort: true,
  },
});
