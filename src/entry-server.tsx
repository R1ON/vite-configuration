import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { App } from './main';

const store = configureStore({
  reducer: () => null,
});

export async function render(url: string) {
  return await renderReactComponent((helmetContext, reactRouterContext) => (
    <Provider store={store}>
      <StaticRouter location={url}
                    context={reactRouterContext}>
        <App />
      </StaticRouter>
    </Provider>
  ));
}

// ---

import { renderToPipeableStream } from 'react-dom/server';

type Context = Record<string, unknown>;

async function renderReactComponent(
  component: (helmetContext: Context, reactRouterContext: Context) => JSX.Element,
) {
  return new Promise((resolve, reject) => {
    const stream = new HtmlWritable();

    const helmetContext = {};
    const reactRouterContext = {};

    // TODO SITE-376 https://github.com/facebook/react/pull/22797
    const { pipe } = renderToPipeableStream(component(helmetContext, reactRouterContext), {
      onAllReady() {
        pipe(stream);
      },
      onError(error) {
        reject(error);
      },
    });

    stream.on('finish', () => {
      resolve({
        helmetContext,
        reactRouterContext,
        markup: stream.getHtml(),
      });
    });
  });
}

// ---

import { Writable } from 'stream';

class HtmlWritable extends Writable {
  chunks: any[] = [];
  html = '';

  getHtml() {
    return this.html;
  }

  _write(chunk: any, encoding: any, callback: any) {
    this.chunks.push(chunk);
    callback();
  }

  _final(callback: any) {
    this.html = Buffer.concat(this.chunks).toString();
    callback();
  }
}
