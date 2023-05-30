import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import 'express-async-errors';
import sirv from "sirv";


// TODO: ЕСЛИ Я В БУДУЩЕМ ЗАХОЧУ СЮДА ВЕРНУТЬСЯ
// причина по которой забросил
// не понятно как запускать всю эту хрень на проде
// в папку artifacts кажется должен попадать package.json, server.js
// чтобы можно было запустить npm run serve
// но нифига не понятно

import crypto from 'crypto';

import helmet from 'helmet';

import cookieParser from 'cookie-parser';
import { createServer as createViteServer } from 'vite';

const isProd = process.env.NODE_ENV === 'production';

console.log('isProd', isProd);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  app.use(cookieParser());
  app.disable('x-powered-by');

  const uuid = crypto.randomUUID();

  const router = express.Router();
  router.use((req, res, next) => {
    res.locals.nonce = uuid;
    next();
  });

  const currentNonce = (req, res) => `'nonce-${res.locals.nonce}'`;


  router.use(helmet.contentSecurityPolicy({
    directives: {
      'script-src': [
        "'self'", // eslint-disable-line quotes
        currentNonce,
        "'unsafe-eval'", // eslint-disable-line quotes
      ],
      'img-src': [
        "'self'", // eslint-disable-line quotes
        'data:',
      ],
      'child-src': [
        "'self'", // eslint-disable-line quotes
      ],
      'frame-src': [
        "'self'", // eslint-disable-line quotes
      ],
      'worker-src': [
        "'self'", // eslint-disable-line quotes
        'blob:',
      ],
      'form-action': [
        "'self'", // eslint-disable-line quotes
      ],
      'frame-ancestors': [
        "'self'", // eslint-disable-line quotes
      ],
    },
  }));

  router.use(helmet.noSniff());
  router.use(helmet.frameguard());
  router.use(helmet.xssFilter());

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  // const vite = await createViteServer({
  //   server: { middlewareMode: true },
  //   appType: 'custom',
  // });

  // use vite's connect instance as middleware
  // if you use your own express router (express.Router()), you should use router.use
  // router.use(vite.middlewares);

  let vite;

  if (isProd) {
    router.use(sirv("artifacts/client", {
        gzip: true,
      })
    );
  } else {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    router.use(vite.middlewares);
  }

  router.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      let template, render;

      if (isProd) {
        template = fs.readFileSync(
          path.resolve(__dirname, 'artifacts/client/index.html'),
          'utf-8',
        );
        render = (await import(path.resolve(__dirname, 'artifacts/server/entry-server.js'))).render;
      } else {
        template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8',
        );

        // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
        //    also applies HTML transforms from Vite plugins, e.g. global preambles
        //    from @vitejs/plugin-react
        template = await vite.transformIndexHtml(url, template);

        // Implement nonce to RefreshRuntime module
        // If you have some problems after upgrade @vitejs/plugin-react
        // Please, check this regexp
        template = template.replace(
          /<script type="module">/,
          `<script type="module" nonce="${uuid}">`,
        );

        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      }


      const context = {};
      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = await render(url, context);

      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace('<!--ssr-outlet-->', appHtml.markup);

      // 6. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    }
    catch (e) {
      console.log('ERROR', e);
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.use(router);

  app.listen(5173, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening @ http://localhost:5173/`);
  });
}

createServer();
