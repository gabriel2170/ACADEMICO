import { initializeApp } from 'firebase/app'
import { getFirestore}from 'firebase/firestore';



const firebaseConfig: any = initializeApp({
  apiKey: "AIzaSyBMNTPqpC-rwULGqURtoPVnnr-vTSRaTeE",
  authDomain: "deliverytcc-6ece4.firebaseapp.com",
  projectId: "deliverytcc-6ece4",
});



export const db = getFirestore(firebaseConfig)


