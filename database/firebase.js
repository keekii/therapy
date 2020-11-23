import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBuk7RZ8ZVn7rxRAImSXXnwpZObDJ_hgKs",
  authDomain: "theraphyapp.firebaseapp.com",
  databaseURL: "https://theraphyapp.firebaseio.com",
  projectId: "theraphyapp",
  storageBucket: "theraphyapp.appspot.com",
  messagingSenderId: "421483494295",
  appId: "1:421483494295:web:5f3860df5ff7ca045fa2d2",
  measurementId: "G-VH4PLYEP7R",
};

firebase.initializeApp(firebaseConfig);
secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");

firebase.firestore();

export default (firebase, secondaryApp);