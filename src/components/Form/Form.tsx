import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { CardBack, CardFront, ThankYouState } from './components';

import { Regex } from '../../utils/regex';

import styles from './Form.module.css';

type FormValues = {
  [key: string]: string;
};

type FormErrors = {
  [K in keyof FormValues]?: string;
};

interface CardDetails {
  cardholderName: string;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cardVerificationCode: string;
}

const initialErrorState: FormErrors = {
  expirationMonthErrorMessage: '',
  expirationYearErrorMessage: '',
  cardholderNameErrorMessage: '',
  cardNumberErrorMessage: '',
  cardVerificationCodeErrorMessage: ''
};

const Form = () => {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardholderName: '',
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cardVerificationCode: ''
  });

  const [formValidation, setFormValidation] = useState<FormErrors>(initialErrorState);

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const monthRef = useRef<HTMLInputElement>(null);

  const handleMonthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedExpirationMonth = { expirationMonth: `${event.target.value}` };

    setCardDetails((cardDetails) => ({
      ...cardDetails,
      ...updatedExpirationMonth
    }));
  };

  const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedExpirationYear = { expirationYear: `${event.target.value}` };

    setCardDetails((cardDetails) => ({
      ...cardDetails,
      ...updatedExpirationYear
    }));
  };

  const handleCardholderNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedCardholderName = { cardholderName: `${event.target.value}` };

    setCardDetails((cardDetails) => ({
      ...cardDetails,
      ...updatedCardholderName
    }));
  };

  const handleCardNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedCardNumber = { cardNumber: `${event.target.value}` };

    setCardDetails((cardDetails) => ({
      ...cardDetails,
      ...updatedCardNumber
    }));
  };

  const handleCardVerificationCode = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedCardVerificationCode = {
      cardVerificationCode: `${event.target.value}`
    };

    setCardDetails((cardDetails) => ({
      ...cardDetails,
      ...updatedCardVerificationCode
    }));
  };

  const validateCardholderName = (value: string): string => (value.trim().length === 0 ? "Can't be blank" : '');

  const validateCardNumber = (value: string): string =>
    Regex.cardNumberPattern.test(value) ? '' : 'Wrong format, numbers only';

  const validateExpirationMonth = (value: string): string =>
    Regex.expirationMonthPattern.test(value) ? '' : "Can't be blank";

  const validateExpirationYear = (value: string): string =>
    Regex.expirationYearPattern.test(value) ? '' : "Can't be blank";

  const validateCardVerificationCode = (value: string): string =>
    Regex.cardValidationCodePattern.test(value) ? '' : "Can't be blank";

  const validateForm = (cardDetails: CardDetails): FormErrors => {
    const { cardholderName, cardNumber, expirationMonth, expirationYear, cardVerificationCode } = cardDetails;

    const validationErrors: FormErrors = {
      expirationMonthErrorMessage: validateExpirationMonth(expirationMonth),
      expirationYearErrorMessage: validateExpirationYear(expirationYear),
      cardholderNameErrorMessage: validateCardholderName(cardholderName),
      cardNumberErrorMessage: validateCardNumber(cardNumber),
      cardVerificationCodeErrorMessage: validateCardVerificationCode(cardVerificationCode)
    };

    return validationErrors;
  };

  const handleFormValidation = (formValidation: FormErrors) => {
    const isValid = Object.values(formValidation).every((error) => error === '');

    setIsFormValid(isValid);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateForm(cardDetails);

    setFormValidation(validation);

    setFormSubmitted(true);
  };

  const handleLabelClick = () => {
    if (monthRef.current) {
      monthRef.current.focus();
    }
  };

  const {
    cardholderNameErrorMessage,
    cardNumberErrorMessage,
    expirationMonthErrorMessage,
    expirationYearErrorMessage,
    cardVerificationCodeErrorMessage
  } = formValidation;

  useEffect(() => {
    handleFormValidation(formValidation);
  }, [formValidation]);

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.cardWrapper}>
        <CardFront
          cardNumber={cardDetails.cardNumber}
          cardholderName={cardDetails.cardholderName}
          expirationMonth={cardDetails.expirationMonth}
          expirationYear={cardDetails.expirationYear}
        />
        <CardBack cardVerificationCode={cardDetails.cardVerificationCode} />
      </div>
      {formSubmitted && isFormValid ? (
        <ThankYouState />
      ) : (
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.labelWrapper}>
            <label
              className={styles.label}
              htmlFor="cardholder-name"
            >
              CARDHOLDER NAME
            </label>
            <input
              className={`${cardholderNameErrorMessage ? styles.inputError : styles.input}`}
              type="text"
              id="cardholder-name"
              placeholder="e.g. Jane Appleseed"
              value={cardDetails.cardholderName}
              onChange={handleCardholderNameChange}
            />
            {cardDetails.cardholderName.trim().length === 0 && (
              <label className={styles.error}>{cardholderNameErrorMessage}</label>
            )}
          </div>

          <div className={styles.labelWrapper}>
            <label
              className={styles.label}
              htmlFor="card-number"
            >
              CARD NUMBER
            </label>
            <input
              className={cardNumberErrorMessage ? styles.inputError : styles.input}
              type="text"
              id="card-number"
              placeholder="e.g. 1234 5678 9123 0000"
              value={cardDetails.cardNumber}
              onChange={handleCardNumber}
            />
            {!cardDetails.cardNumber.match(Regex.cardNumberPattern) && (
              <label className={styles.error}>{cardNumberErrorMessage}</label>
            )}
          </div>
          <div className={styles.bottomLabelSectionWrapper}>
            <div className={styles.expirationDateWrapper}>
              <label
                className={styles.label}
                htmlFor="expiration-month"
                onClick={handleLabelClick}
              >
                EXP. DATE (MM/YY)
              </label>

              <div className={styles.expirationDateInputWrapper}>
                <div className={styles.dateWrapper}>
                  <input
                    className={expirationMonthErrorMessage ? styles.shortInputError : styles.shortInput}
                    type="text"
                    id="expiration-month"
                    placeholder="MM"
                    value={cardDetails.expirationMonth}
                    onChange={handleMonthChange}
                    maxLength={2}
                  />
                </div>
                <div className={styles.dateWrapper}>
                  <input
                    className={expirationYearErrorMessage ? styles.shortInputError : styles.shortInput}
                    type="text"
                    id="expiration-year"
                    placeholder="YY"
                    value={cardDetails.expirationYear}
                    onChange={handleYearChange}
                    maxLength={2}
                  />
                </div>
              </div>
              {!cardDetails.expirationMonth.match(Regex.expirationMonthPattern) &&
                !cardDetails.expirationYear.match(Regex.expirationYearPattern) && (
                  <label className={styles.error}>{expirationMonthErrorMessage}</label>
                )}
            </div>
            <div className={styles.cardVerificationCodeWrapper}>
              <label
                className={styles.label}
                htmlFor="cvc"
              >
                CVC
              </label>
              <input
                className={cardVerificationCodeErrorMessage ? styles.inputError : styles.input}
                type="text"
                id="cvc"
                placeholder="e.g. 123"
                value={cardDetails.cardVerificationCode}
                onChange={handleCardVerificationCode}
                maxLength={3}
              />
              {!cardDetails.cardVerificationCode.match(Regex.cardValidationCodePattern) && (
                <label className={styles.error}>{cardVerificationCodeErrorMessage}</label>
              )}
            </div>
          </div>

          <input
            className={styles.submitButton}
            type="submit"
            value="Confirm"
          />
        </form>
      )}
    </div>
  );
};

export default Form;
