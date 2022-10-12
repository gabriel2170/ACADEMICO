import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBxBxkvDohb7X8z2O2MAcN7aSaz9ZK4ILM",
  authDomain: "compras-1c57d.firebaseapp.com",
  projectId: "compras-1c57d",
  storageBucket: "compras-1c57d.appspot.com",
  messagingSenderId: "679246664159",
  appId: "1:679246664159:web:6aeb5b52bfeb5124da346a",
};


if (firebase.apps.length < 1){
  firebase.initializeApp(firebaseConfig);
}


export default firebase;