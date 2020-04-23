import * as firebase from 'firebase';
import { Request, Response } from 'express';

import { validateSignUpData, db, config } from '../utils';
import { ErrorMessages } from '../interfaces';

firebase.initializeApp(config);

export const signUp = (request: Request, response: Response) => {
  const { email, password, confirmPassword, username } = request.body;
  let token: string;
  let userId: string;

  const { valid, errors } = validateSignUpData({
    email,
    password,
    confirmPassword,
    username,
  });

  if (!valid) return response.status(400).json(errors);

  return db
    .doc(`/users/${username}`)
    .get()
    .then((doc: firebase.firestore.DocumentData) => {
      if (doc.exists) {
        return response.status(400).json({ username: ErrorMessages.USERNAME_IN_USE });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((data: firebase.auth.UserCredential) => {
            if (!data.user) {
              throw new Error(ErrorMessages.GENERAL_ERORR);
            }

            userId = data.user.uid;
            return data.user.getIdToken();
          })
          .then((idToken: string) => {
            token = idToken;

            return db.doc(`/users/${username}`).set({
              username,
              email,
              userId,
              createdAt: new Date().toISOString(),
            });
          })
          .then(() => {
            return response.status(201).json({ token });
          })
          .catch((e) => {
            console.error(e);

            if (e.code === 'auth/email-already-in-use') {
              return response.status(400).json({ email: ErrorMessages.EMAIL_IN_USE });
            } else {
              return response.status(500).json({ general: ErrorMessages.GENERAL_ERORR });
            }
          });
      }
    });
};
