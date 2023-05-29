import React from 'react';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

// create browser history
export const history = createBrowserHistory();

export default function (props) {
  return (
    <ConnectedRouter {...props}
                     history={history}>
      {props.children}
    </ConnectedRouter>
  );
}