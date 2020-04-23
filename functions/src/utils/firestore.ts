import * as admin from 'firebase-admin';

import * as serviceAccount from '../env/velox-80fb5-firebase-adminsdk-u85ov-9191ce2305.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: 'https://velox-80fb5.firebaseio.com',
});

export const db = admin.firestore();

export const config = {
  apiKey: 'AIzaSyDlnO7l_vFoE-D27-wNEjYZa8Bdk0sQ2a8',
  authDomain: 'velox-80fb5.firebaseapp.com',
  databaseURL: 'https://velox-80fb5.firebaseio.com',
  projectId: 'velox-80fb5',
  storageBucket: 'velox-80fb5.appspot.com',
  messagingSenderId: '480611311073',
  appId: '1:480611311073:web:1fb072d18df6686afbc6a0',
  measurementId: 'G-5Z421VCQK1',
};
