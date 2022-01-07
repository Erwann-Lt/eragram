import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: 'AIzaSyBeLKyUE3SvXcCBSDmm3SWGV9PBE5V43ts',
  authDomain: 'instagram-yt-5b83e.firebaseapp.com',
  projectId: 'instagram-yt-5b83e',
  storageBucket: 'instagram-yt-5b83e.appspot.com',
  messagingSenderId: '251135883747',
  appId: '1:251135883747:web:4ef8ab4bdb585cd29648d6'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
