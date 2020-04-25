import { Request, Response } from 'express';

import { createSignup } from '../api';
import { LogMessages } from '../interfaces';

export const signUp = async (request: Request, response: Response) => {
  try {
    response.status(201).json(await createSignup(request));
  } catch (err) {
    const { httpErrorCode } = err;

    console.error(LogMessages.USER_CREATE_ERROR, err);

    if (httpErrorCode && httpErrorCode.status) {
      response.status(httpErrorCode.status).json(err);
    } else {
      response.status(500).json(err);
    }
  }
};
