import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
import vitePluginImp from 'vite-plugin-imp';
import lessToJS from 'less-vars-to-js';
import { resolve } from 'path';
import * as fs from 'fs';

const pathResolver = (path: string) => resolve(__dirname, path);
const themeVariables = lessToJS(
  fs.readFileSync(pathResolver('./config/antd.variables.less'), 'utf8')
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ViteAliases({}),
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
