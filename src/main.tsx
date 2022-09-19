import React from 'react';
import { render } from 'react-dom';

import 'normalize.css';

import CheckAliases from 'app/check/alias';

import Dog from './dog.jpg';
import Svg from './bet.svg';
import SmallPNG from './smallPNG.png';
import BigPNG from './bigPNG.png';

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
      <button>check normalize.css</button>
      <div className={styles.checkAutoPrefixer}>CheckAutoPrefixer</div>
      <CheckAliases />
      <div className={styles.backgroundDog}>
        background dog
      </div>
      <img src={Dog}
           width="50" />
      <img src={SmallPNG}
           width="50" /> {/* Так как картинка маленькая, будет переконверт. в base64 */}
      <img src={BigPNG}
           width="50" /> {/* Так как картинка большая, она будет сжата */}
      <img src={Svg}
           width="50" />
    </div>
  );
}
