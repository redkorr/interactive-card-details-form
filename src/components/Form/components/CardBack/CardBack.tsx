import React from 'react';

import styles from './CardBack.module.css';

interface Props {
  cardVerificationCode: string;
}

const CardBack = ({ cardVerificationCode }: Props) => {
  return (
    <div className={styles.cardBack}>
      <div className={styles.cardVerificationCode}>
        <p>{cardVerificationCode.trim().length === 0 ? '000' : cardVerificationCode}</p>
      </div>
    </div>
  );
};

export default CardBack;
