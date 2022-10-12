import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBJQd5Yt-1e3DKLK2RKCvwkk_Kr-bg4GLk",
  authDomain: "ex---produtos.firebaseapp.com",
  projectId: "ex---produtos",
  storageBucket: "ex---produtos.appspot.com",
  messagingSenderId: "741223880920",
  appId: "1:741223880920:web:2414ce215ca037f0251fad",
  measurementId: "G-JP2WLPGJZ2"
};

if (firebase.apps.length < 1) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
