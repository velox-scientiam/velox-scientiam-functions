import * as firebase from 'firebase';
import { HttpsError } from 'firebase-functions/lib/providers/https';
import { Request, Response } from 'express';

import { validateSignUpData, db, config } from '../utils';
import { ErrorMessages, UserData, LogMessages } from '../interfaces';

firebase.initializeApp(config);

export const signUp = async (request: Request, response: Response) => {
  const { email, password, confirmPassword, username } = request.body;

  const { valid, errors } = validateSignUpData({
    email,
    password,
    confirmPassword,
    username,
  });

  if (!valid) {
    return response.status(400).json(errors);
  }

  const userDoc = await db.doc(`/users/${username}`).get();

  if (userDoc.exists) {
    return response.status(400).json({ username: ErrorMessages.USERNAME_IN_USE });
  }

  try {
    const credentials = await firebase.auth().createUserWithEmailAndPassword(email, password);

    if (!credentials.user) {
      throw new HttpsError('not-found', ErrorMessages.GENERAL_ERORR);
    }

    const token = await credentials.user.getIdToken();
    const { uid } = credentials.user;
    const user: UserData = {
      username,
      email,
      uid,
      createdAt: new Date().toISOString(),
    };

    await db.doc(`/users/${username}`).set(user);

    console.log(LogMessages.USER_CREATED, user);
    return response.status(201).json({ ...user, token });
  } catch (err) {
    const { code } = err;

    console.error(LogMessages.USER_CREATE_ERROR, Error);

    if (code === 'auth/email-already-in-use') {
      return response.status(400).json({ email: ErrorMessages.EMAIL_IN_USE });
    } else {
      return response.status(500).json({ message: ErrorMessages.GENERAL_ERORR, err });
    }
  }
};
