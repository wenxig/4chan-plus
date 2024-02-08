import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey from 'vite-plugin-monkey';
import { fileURLToPath, URL } from 'node:url'
import { version, description, main, author } from './package.json';
import legacyPlugin from '@vitejs/plugin-legacy'
import postcssPresetEnv from 'postcss-preset-env'
import tailwindcss from 'tailwindcss';
import postCssPxToRem from "postcss-pxtorem";
import autoprefixer from "autoprefixer";
const baseUrl = ['*://**/*']
export default defineConfig(() => ({
  plugins: [
    vue(),
    legacyPlugin({
      renderLegacyChunks: false,
      modernPolyfills: true,
    }),
    monkey({
      entry: main,
      userscript: {
        icon: 'https://img13.360buyimg.com/ddimg/jfs/t1/180015/34/30499/3188/635abb87E47815c6a/bdb7d18fcb5281a0.png',
        namespace: 'wenxig/yellowUp',
        match: baseUrl,
        description,
        name: "黄色网站增强",
        author,
        "run-at": "document-end",
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
    __APP_VERSION__: `"${version}"`
  }
}));

