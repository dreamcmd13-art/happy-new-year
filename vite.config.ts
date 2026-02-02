import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // 确保在生产环境下也能加载到变量
    const env = loadEnv(mode, process.cwd(), ''); 
    
    return {
      base: '/', 
      plugins: [react()],
      define: {
        // 建议增加回退值，防止 build 崩溃
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || '')
      },
      resolve: {
        alias: {
          // 确保 path.resolve 在 Vercel 的 Linux 环境下正常工作
          '@': path.resolve(__dirname, './src'), 
        }
      },
      build: {
        // 增加 sourcemap 方便在生产环境排查白屏
        sourcemap: true 
      }
    };
});
