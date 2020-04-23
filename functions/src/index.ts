import * as functions from 'firebase-functions';
import * as express from 'express';

import { signUp } from './handlers';

const app = express();

app.post('/signup', signUp);

export const api = functions.region('europe-west1').https.onRequest(app);
