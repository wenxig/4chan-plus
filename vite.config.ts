import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey from 'vite-plugin-monkey';
//@ts-ignore
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {  NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import package_json from './package.json';
import legacyPlugin from '@vitejs/plugin-legacy'
import postcssPresetEnv from 'postcss-preset-env'
import tailwindcss from 'tailwindcss';
import postCssPxToRem from "postcss-pxtorem";
import autoprefixer from "autoprefixer";
const baseUrl = ['*://*.4chan.org/**/*']
export default defineConfig(() => ({
  plugins: [
    vue(),
    legacyPlugin({
      renderLegacyChunks: false,
      modernPolyfills: true,
    }),
    AutoImport({
      resolvers: [
        NaiveUiResolver(),
      ],
    }),
    Components({
      resolvers: [
        NaiveUiResolver(),
      ],
    }),
    monkey({
      entry: package_json.main,
      userscript: {
        ...package_json,
        namespace: 'wenxig/4chan-plus',
        match: baseUrl,
        "run-at": "document-start",
        connect: "*"
      }
    }),
  ],
  "css": {
    postcss: {
      plugins: [
        postcssPresetEnv(),
        tailwindcss({
          content: [
            "./index.html",
            "./src/**/*.{vue,js,ts,jsx,tsx}",
          ],
          theme: {
            extend: {},
          },
          plugins: [],
          corePlugins: {
            preflight: false,
          }
        }),
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 16, // 1rem的大小
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
        }),
        autoprefixer({
          // 自动添加前缀
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
          ],
          grid: true,
        })
      ]
    }
  },
  base: "./",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  define: {
    __APP_VERSION__: `"${package_json.version}"`
  }
}));

