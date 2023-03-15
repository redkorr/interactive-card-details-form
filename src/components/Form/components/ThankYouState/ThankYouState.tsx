import React from 'react';

import styles from './ThankYouState.module.css';

import Icon from '../../../../assets/icon-complete.svg';

const ThankYouState = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.icon}>
        <img src={Icon} />
      </div>
      <div className={styles.header}>
        <p>THANK YOU!</p>
      </div>
      <div className={styles.text}>We've added your card details</div>
      <div>
        <button
          className={styles.button}
          onClick={handleClick}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ThankYouState;
