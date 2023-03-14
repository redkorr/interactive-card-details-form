import React from 'react';

import styles from './CardFront.module.css';

import CardLogo from '../../../../assets/card-logo.svg';

interface Props {
  cardholderName: string;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
}

const CardFront = ({ cardholderName, cardNumber, expirationMonth, expirationYear }: Props) => {
  return (
    <div className={styles.cardFront}>
      <img
        className={styles.cardLogo}
        src={CardLogo}
      />
      <div className={styles.cardNumber}>
        <p>{cardNumber.trim().length === 0 ? '1234 5678 9123 0000' : cardNumber}</p>
      </div>
      <div className={styles.bottomWrapper}>
        <div className={styles.cardholderName}>
          <p>{cardholderName.trim().length === 0 ? 'JANE APPLESEED' : cardholderName.toUpperCase()}</p>
        </div>
        <div className={styles.expirationDateWrapper}>
          <p>
            {expirationMonth.trim().length === 0 ? '00' : expirationMonth}/
            {expirationYear.trim().length === 0 ? '00' : expirationYear}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardFront;
