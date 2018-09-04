import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAo5lX_HOo3alsnG1CRZe8Z6zYZ8GdQ26g',
  authDomain: 'projectuniver-49d26.firebaseapp.com',
  databaseURL: 'https://projectuniver-49d26.firebaseio.com',
  projectId: 'projectuniver-49d26',
  storageBucket: 'projectuniver-49d26.appspot.com',
  messagingSenderId: '980072342629',
};

firebase.initializeApp(config);
const { auth } = firebase;

export default auth;
