import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';


const firebaseConfig: any = initializeApp({
  apiKey: "AIzaSyBMNTPqpC-rwULGqURtoPVnnr-vTSRaTeE",
  authDomain: "deliverytcc-6ece4.firebaseapp.com",
  projectId: "deliverytcc-6ece4",
});


export const auth = getAuth(firebaseConfig)