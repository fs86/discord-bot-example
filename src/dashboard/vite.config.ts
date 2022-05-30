import react from '@vitejs/plugin-react';
import * as fs from 'fs';
import lessToJS from 'less-vars-to-js';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
import checker from 'vite-plugin-checker';
import vitePluginImp from 'vite-plugin-imp';

const pathResolver = (path: string) => resolve(__dirname, path);
const themeVariables = lessToJS(
  fs.readFileSync(pathResolver('./config/antd.variables.less'), 'utf8')
);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          antd: ['antd', '@ant-design/icons'],
          styledicons: [
            '@styled-icons/fa-brands',
            '@styled-icons/fa-regular',
            '@styled-icons/fa-solid',
          ],
        },
      },
    },
  },
  plugins: [
    checker({
      typescript: true,
      overlay: {
        position: 'br',
      },
      eslint: {
        lintCommand: 'eslint ./src --ext .jsx,.js,.ts,.tsx --ignore-path ./.gitignore',
      },
    }),
    ViteAliases(),
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: () => 'antd/dist/antd.dark.less',
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
    },
  },
});
