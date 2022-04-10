import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyAz8n4bStEGrzFdwGPmK6LKN1rMVigQAh4",
    authDomain: "political-spinner.firebaseapp.com",
    projectId: "political-spinner",
    storageBucket: "political-spinner.appspot.com",
    messagingSenderId: "699094044429",
    appId: "1:699094044429:web:ab0e256b18c4067b6fea44",
    measurementId: "G-0Y5QCFT2S6"
});
const firestore = firebase.firestore();
const analytics = firebase.analytics();

export default {
    firebase,
    firestore,
    analytics
}