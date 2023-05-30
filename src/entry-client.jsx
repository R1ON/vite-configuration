import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import * as toolkitRaw from '@reduxjs/toolkit';
const { configureStore, combineReducers } = ((toolkitRaw).default ?? toolkitRaw);
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { App } from './main';
import ConnectedRouter, { history } from './lib/router';

// ---

const root = createRoot(document.getElementById('app-root'));

const rootReducer = combineReducers({
  router: connectRouter(history),
});


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(
      routerMiddleware(history),
    )
  ),
});

root.render(
  <Provider store={store}>
    <ConnectedRouter>
      <App />
    </ConnectedRouter>
  </Provider>,
);
