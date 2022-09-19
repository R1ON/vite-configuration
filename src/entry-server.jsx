import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './main';

export function render(url, context) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}
                  context={context}>
      <App />
    </StaticRouter>,
  );
}
