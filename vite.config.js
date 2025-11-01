import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Solução para o erro 'global is not defined' ao usar sockjs-client no Vite
    global: 'window', 
  },
  server: {
    port: 5173, // Porta do servidor
    open: true, // Abre o navegador automaticamente
    hmr: true,  // Hot Module Replacement
    historyApiFallback: true, // Redireciona todas as rotas para o index.html
  },
  resolve: {
    alias: {
      '@': '/src', // Alias para facilitar importações
    },
  },
  build: {
    rollupOptions: {
      input: './index.html', // Caminho para o arquivo HTML principal
    },
  },
});