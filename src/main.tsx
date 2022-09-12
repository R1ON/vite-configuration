import React from 'react';
import { render } from 'react-dom';

import CheckAliases from 'app/check/alias';

import Dog from './dog.jpg';
import Svg from './bet.svg';

import styles from './test.module.scss';

// ---

render(
  <App />,
  document.getElementById('root'),
);

console.log('env_custom', import.meta.env.APP_TEST_VAR);
console.log('env_mode', import.meta.env.MODE);

function App() {
  return (
    <div className={styles.container}>
      APP
      <CheckAliases />
      <div className={styles.backgroundDog}>
        background dog
      </div>
      <img src={Dog}
           width="50" />
      <img src={Svg}
           width="50" />
    </div>
  );
}
