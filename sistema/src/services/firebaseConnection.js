
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyC_LqeBIGb4OUS3fV1P15ue82kDVCYQrs4",
    authDomain: "sistema-1db11.firebaseapp.com",
    projectId: "sistema-1db11",
    storageBucket: "sistema-1db11.appspot.com",
    messagingSenderId: "814754856294",
    appId: "1:814754856294:web:116b7af7b40522c9ca1ca7",
    measurementId: "G-J80FSCFEDW"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase

