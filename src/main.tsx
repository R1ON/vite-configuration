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
console.log('env_by_other_mode', import.meta.env.APP_API_KEY);

function App() {
  return (
    <div className={styles.container}>
      APP
      <div className={styles.checkAutoPrefixer}>CheckAutoPrefixer</div>
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
