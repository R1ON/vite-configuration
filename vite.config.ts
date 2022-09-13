import path from 'path';

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

import autoprefixer from 'autoprefixer';

// ---

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  // const isProd = mode === 'production';

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
    plugins: [
      react(),
      eslintPlugin({
        // failOnError: isProd, // TODO не забыть активировать
        failOnError: false,
      }),
      splitVendorChunkPlugin(),
    ],
    build: {
      sourcemap: true,
    },
  };
});
