import React, { useState, useRef, ChangeEvent } from 'react';
import CardBack from './CardBack/CardBack';
import CardFront from './CardFront/CardFront';

const Form = () => {
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardVerificationCode, setCardVerificationCode] = useState('');
  const monthRef = useRef<HTMLInputElement>(null);

  const handleMonthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpirationMonth(event.target.value);
  };
  const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpirationYear(event.target.value);
  };
  const handleCardholderNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardholderName(event.target.value);
  };
  const handleCardNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(event.target.value);
  };
  const handleCardVerificationCode = (event: ChangeEvent<HTMLInputElement>) => {
    setCardVerificationCode(event.target.value);
  };
  const handleLabelClick = () => {
    if (monthRef.current) {
      monthRef.current.focus();
    }
  };

  return (
    <div>
      <CardFront />
      <CardBack />
      <form>
        <div>
          <label htmlFor='cardholder-name'>CARDHOLDER NAME</label>
          <input
            type='text'
            id='cardholder-name'
            placeholder='e.g. Jane Appleseed'
            value={cardholderName}
            onChange={handleCardholderNameChange}
          />
        </div>
        <div>
          <label htmlFor='card-number'>CARD NUMBER</label>

          <input
            type='number'
            id='card-number'
            placeholder='e.g. 1234 5678 9123 0000'
            value={cardNumber}
            onChange={handleCardNumber}
          />
        </div>
        <div>
          <label htmlFor='expiration-month' onClick={handleLabelClick}>
            EXP. DATE (MM/YY)
          </label>
          <label htmlFor='cvc'>CVC</label>
          <div>
            <input
              type='text'
              id='expiration-month'
              placeholder='MM'
              value={expirationMonth}
              onChange={handleMonthChange}
              maxLength={2}
            />
            <input
              type='text'
              id='expiration-year'
              placeholder='YY'
              value={expirationYear}
              onChange={handleYearChange}
              maxLength={2}
            />
          </div>
          <input
            type='text'
            id='cvc'
            placeholder='e.g. 123'
            value={cardVerificationCode}
            onChange={handleCardVerificationCode}
          />
        </div>
        <br />
        <input type='submit' value='Confirm' />
      </form>
    </div>
  );
};

export default Form;
