import * as firebase from 'firebase';
import { HttpsError } from 'firebase-functions/lib/providers/https';
import { Request } from 'express';

import { validateSignUpData, db, config } from '../utils';
import { ErrorMessages, UserData, LogMessages, SignupResponse } from '../interfaces';

firebase.initializeApp(config);

export const createSignup = async (request: Request): Promise<SignupResponse> => {
  const { email, password, confirmPassword, username } = request.body;

  const { valid, errors } = validateSignUpData({
    email,
    password,
    confirmPassword,
    username,
  });

  if (!valid) {
    throw new HttpsError('invalid-argument', ErrorMessages.INVALID_USER_DATA, errors);
  }

  const userDoc = await db.doc(`/users/${username}`).get();

  if (userDoc.exists) {
    throw new HttpsError('invalid-argument', ErrorMessages.USERNAME_IN_USE);
  }

  const credentials = await firebase.auth().createUserWithEmailAndPassword(email, password);

  if (!credentials.user) {
    throw new HttpsError('not-found', ErrorMessages.USER_MISSING_IN_CRED);
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

  return { user, token };
};
