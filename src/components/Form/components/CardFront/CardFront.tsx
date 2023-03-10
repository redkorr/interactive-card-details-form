import React from 'react';
import styles from './CardFront.module.css';
import cardLogo from '../../../../assets/bg-card-front.png';

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
