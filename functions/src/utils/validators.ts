import { SignUpData, ErrorMessages } from '../interfaces';

export const isEmpty = (s: string) => !s || !s.trim();

export const isEmail = (email: string) => {
  const emailRegExP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !email || !!email.match(emailRegExP);
};

export const validateSignUpData = ({ email, password, confirmPassword, username }: SignUpData) => {
  const errors = {} as SignUpData;

  if (isEmpty(email)) {
    errors.email = ErrorMessages.EMPTY;
  } else if (!isEmail(email)) {
    errors.email = ErrorMessages.NOT_VALID;
  }

  if (isEmpty(password)) {
    errors.password = ErrorMessages.EMPTY;
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = ErrorMessages.NOT_VALID;
  }

  if (isEmpty(username)) {
    errors.username = ErrorMessages.EMPTY;
  }

  return {
    errors,
    valid: !Object.keys(errors).length,
  };
};
