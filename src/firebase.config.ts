// src/firebase.config.ts
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import * as serviceAccount from '../aplicativo-para-cuidadores-firebase-adminsdk-fbsvc-eeb6691eae.json'; // tua key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export const firestore = admin.firestore();
