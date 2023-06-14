import vitePluginVue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import vitePluginEslint from 'vite-plugin-eslint';
import viteSvgLoader from 'vite-svg-loader';

const isDev = process.env.NODE_ENV === 'development';

function generateRichClassName(name: string, filename: string) {
  // @ts-ignore
  const { groups: { fileName } } = /(?<fileName>\w+)(\.\w+)*(\.\w+)(\?.+)?$/.exec(filename);
  return `${fileName}_${name}`;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitePluginVue(),
    vitePluginEslint(),
    viteSvgLoader({
      svgoConfig: {
        plugins: [{
          name: 'preset-default',
          params: { overrides: { removeViewBox: false } },
        },
        ],
      },
    }),
  ],
  build: { outDir: './docs' },
  base: '/dinooo/',
  css: { modules: { generateScopedName: isDev ? generateRichClassName : undefined } },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
