import * as functions from 'firebase-functions';

export const helloVelox = functions.https.onRequest((_request, response) => {
  response.send('Hello Velox!');
});
