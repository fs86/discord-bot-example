import react from '@vitejs/plugin-react';
import * as fs from 'fs';
import lessToJS from 'less-vars-to-js';
import { resolve } from 'path';
import { defineConfig, PluginOption } from 'vite';
import { ViteAliases } from 'vite-aliases';
import checker from 'vite-plugin-checker';
import vitePluginImp from 'vite-plugin-imp';

const pathResolver = (path: string) => resolve(__dirname, path);
const themeVariables = lessToJS(
  fs.readFileSync(pathResolver('./config/antd.variables.less'), 'utf8')
);

// Workaround for "Type 'Plugin' is not assignable to type 'PluginOption'."
// Wait for a new vite-aliases version or revert back to vite 2.9.9.
function aliases(options?: Partial<unknown>): PluginOption {
  const aliases = ViteAliases(options);
  return aliases as unknown as PluginOption;
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          antd: ['antd', '@ant-design/icons'],
          chartjs: ['chart.js', 'react-chartjs-2'],
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
    aliases(),
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
