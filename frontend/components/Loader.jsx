import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner}></div>
      <span className={styles.loaderText}>Loading...</span>
    </div>
  );
};

export default Loader;