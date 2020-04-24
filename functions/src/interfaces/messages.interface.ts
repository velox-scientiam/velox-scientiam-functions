export enum ErrorMessages {
  GENERAL_ERORR = 'Unexpected error occured',
  EMPTY = 'Field must not be empty',
  NOT_VALID = 'Field must be valid',
  USERNAME_IN_USE = 'Username is already in use',
  EMAIL_IN_USE = 'Email is already in use',
}

export enum LogMessages {
  USER_CREATED = '[SUCCESS] user created',
  USER_CREATE_ERROR = '[ERROR] user not created',
}
