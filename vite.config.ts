import path from 'path';

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';

import eslintPlugin from 'vite-plugin-eslint';
import stylelintPlugin from 'vite-plugin-stylelint';
import imageminPlugin from 'vite-plugin-imagemin';

import autoprefixer from 'autoprefixer';

// ---

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const outputPath = path.resolve(__dirname, isDev ? 'build' : 'artifacts');

  return {
    // https://vitejs.dev/config/shared-options.html#envprefix:~:text=mport.meta.env.-,SECURITY%20NOTES,-envPrefix%20should%20not
    envPrefix: 'APP_',
    resolve: {
      alias: {
        app: path.resolve(__dirname, 'src/'),
        // TODO: 'react-dom': isEnvDevelopment ? '@hot-loader/react-dom' : 'react-dom'
        // TODO: если в коде есть алиасы ниже - выпилить
        // 'lodash': 'lodash-es',
        // 'lodash.debounce': 'lodash-es/debounce',
        // 'lodash.throttle': 'lodash-es/throttle',
      },
    },
    css: {
      devSourcemap: true,
      modules: {
        generateScopedName: isDev ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:5]',
      },
      postcss: {
        plugins: [
          autoprefixer,
        ],
      },
    },
    plugins: getPlugins(isProd),
    build: {
      sourcemap: true,
      outDir: outputPath,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('normalize.css')) {
              return 'vendor';
            }
          },
        },
      },
    },
  };
});

function getPlugins(isProd: boolean) {
  return [
    react(),
    eslintPlugin({
      // failOnError: isProd, // TODO не забыть активировать
      failOnError: false,
    }),
    stylelintPlugin({
      // emitError: isProd, // TODO не забыть активировать
      emitError: false,
    }),
    splitVendorChunkPlugin(),
    isProd && imageminPlugin({
      gifsicle: false,
      optipng: false, // Очеень сильно увеличивает время сборки проекта
      webp: false,
      mozjpeg: {
        quality: 70,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: ['preset-default'],
      },
    }),
  ].filter(Boolean);
}
