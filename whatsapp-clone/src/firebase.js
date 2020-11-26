import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyCMcUd9aoXbbmZuLVRXHKYnnzJHJrSsk2w",
  authDomain: "whatsapp-clone-9fb51.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-9fb51.firebaseio.com",
  projectId: "whatsapp-clone-9fb51",
  storageBucket: "whatsapp-clone-9fb51.appspot.com",
  messagingSenderId: "281184124345",
  appId: "1:281184124345:web:9c2a8542c4bee999a48a68",
  measurementId: "G-JMRRQCMYTJ"
};
const firebaseApp=firebase.initializeApp(firebaseConfig)
const db=firebaseApp.firestore()
const auth=firebase.auth()
const googleProvider=new firebase.auth.GoogleAuthProvider();

export {auth,googleProvider}//explicitly export
export default db;