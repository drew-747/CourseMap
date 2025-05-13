import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBF87WD_Gpknxcy3iXfYCGc8FvHwV07fSY",
  authDomain: "coursemap-f2b2d.firebaseapp.com",
  projectId: "coursemap-f2b2d",
  storageBucket: "coursemap-f2b2d.firebasestorage.app",
  messagingSenderId: "972774273894",
  appId: "1:972774273894:web:f9118121e0f5fd096e0ea7",
  measurementId: "G-Z10BL4HPQG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); 
export const storage = getStorage(app);