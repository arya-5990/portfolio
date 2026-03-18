import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBpT7bdQ_t9ANjheg9IklI18LEgBMmJuSU",
  authDomain: "portfolio-6647d.firebaseapp.com",
  projectId: "portfolio-6647d",
  storageBucket: "portfolio-6647d.firebasestorage.app",
  messagingSenderId: "305986669481",
  appId: "1:305986669481:web:3d606c719580d11a19d2b8",
  measurementId: "G-JKY097D1BX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedAuth() {
  console.log('Seeding Admin Credentials...');
  try {
    await setDoc(doc(db, 'portfolio', 'admin'), {
      username: 'Arya_5990',
      password: '123456' // In a real app we would hash this, but we'll store as requested
    });
    console.log('Admin credentials beautifully saved to Firestore!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding credentials: ', error);
    process.exit(1);
  }
}

seedAuth();
