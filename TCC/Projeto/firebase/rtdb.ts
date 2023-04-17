import { initializeApp } from 'firebase/app'
import { getDatabase}from 'firebase/database';



const firebaseConfig: any = initializeApp({
  apiKey: "AIzaSyBMNTPqpC-rwULGqURtoPVnnr-vTSRaTeE",
  authDomain: "deliverytcc-6ece4.firebaseapp.com",
  projectId: "deliverytcc-6ece4",
});



export const rtdb = getDatabase(firebaseConfig)


