import React from 'react';
import styles from './CardFront.module.css';
import cardLogo from '../../../assets/card-logo.svg';

// interface Props {
//   cardNumber: number;
// }

const CardFront = () => {
  return (
    <div className={styles.CardFront}>
      <img src={cardLogo} />
      <p></p>
    </div>
  );
};

export default CardFront;
