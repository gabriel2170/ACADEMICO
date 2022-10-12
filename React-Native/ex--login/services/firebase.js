import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCJbB6U4KGnRbeJflDX_Fwcij9wyiLyhV0",
  authDomain: "login-b6bef.firebaseapp.com",
  projectId: "login-b6bef",
  storageBucket: "login-b6bef.appspot.com",
  messagingSenderId: "888991045800",
  appId: "1:888991045800:web:88f8d95e0a327149b9ca9d",
 
};


if (firebase.apps.length < 1){
  firebase.initializeApp(firebaseConfig);
}



export default firebase;