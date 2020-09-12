import React, { useState, useRef } from 'react';
import useOnVisible from 'use-on-visible';
import styles from './App.module.css';

const App = () => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useOnVisible(
    ref,
    () => setCount(count + 1),
    [count],
  );

  return (
    <div className={ styles.container }>
      <div className={ styles.scrollable }>
        <h1>
          <span
            className={ styles.emoji }
            role="img"
            aria-label="eyes"
          >
            ⬇️
          </span>
          { ' ' }
          Scroll me!
          { ' ' }
          <span
            className={ styles.emoji }
            role="img"
            aria-label="eyes"
          >
            ⬇️
          </span>
        </h1>
        <div className={ styles.countContainer }>
          <p className={ styles.count }>
            The eyes have become visible { count } times!
          </p>
          <span
            className={ styles.emoji }
            role="img"
            aria-label="eyes"
            ref={ ref }
          >
            👀
          </span>
        </div>
      </div>
    </div>
  )
};

export default App;
