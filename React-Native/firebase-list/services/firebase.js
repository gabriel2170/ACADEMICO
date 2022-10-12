import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCAPDbwpXEc5WuohHTqmfHVzOlXQldhKlc",
  authDomain: "bda-2020-cc.firebaseapp.com",
  projectId: "bda-2020-cc",
  storageBucket: "bda-2020-cc.appspot.com",
  messagingSenderId: "823477552143",
  appId: "1:823477552143:web:99e5abb552b1b498c64f7a"
};

if (firebase.apps.length < 1) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
