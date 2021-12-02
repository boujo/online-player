import React, { useState, useEffect } from 'react';


import styles from './Range.module.scss';

type ComponentProps = {
  onChange : () => void
};

const defaultProps = {
  onChange : () => {}
};

const Range = ({ onChange }: ComponentProps): JSX.Element => {
  const [ progress, setProgress ] = useState(0);

  const changeHandler = (e) => {
    const value = parseInt(e.target.value);
    setProgress(value);
    onChange(e);
  };

  return (
    <div className={styles.container}>
      <input
        type="range"
        min={0}
        max={100}
        onChange={changeHandler}
      />

      <div className={styles.filled} style={{ width: '10px' }} />
    </div>
  );
}
Range.defaultProps = defaultProps;

export { Range };
