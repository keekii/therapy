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

firebase.firestore();

export default firebase;

// import firebase from "firebase";

// class Fire {
//   constructor() {
//     this.init();
//     this.checkAuth();
//   }
//   init = () => {
//     if (!firebase.apps.length) {
//       firebase.initializeApp({
//         apiKey: "AIzaSyBuk7RZ8ZVn7rxRAImSXXnwpZObDJ_hgKs",
//         authDomain: "theraphyapp.firebaseapp.com",
//         databaseURL: "https://theraphyapp.firebaseio.com",
//         projectId: "theraphyapp",
//         storageBucket: "theraphyapp.appspot.com",
//         messagingSenderId: "421483494295",
//         appId: "1:421483494295:web:5f3860df5ff7ca045fa2d2",
//         measurementId: "G-VH4PLYEP7R",
//       });
//     }
//   };

//   checkAuth = () => {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (!user) {
//         firebase.auth().signInAnonymously();
//       }
//     });
//   };

//   send = (messages) => {
//     messages.forEach((item) => {
//       const message = {
//         text: item.text,
//         timestamp: firebase.database.ServerValue.TIMESTAMP,
//         user: item.user,
//       };
//       this.db.push(message);
//     });
//   };
//   parse = (message) => {
//     const { user, text, timestamp } = message.val();
//     const { key: _id } = message;
//     const createdAt = new Date(timestamp);
//     return {
//       _id,
//       createdAt,
//       text,
//       user,
//     };
//   };

//   get = (callback) => {
//     this.db.on("child_added", (snapshot) => callback(this.prase(snapshot)));
//   };

//   off() {
//     this.db.off();
//   }

//   get db() {
//     return firebase.database().ref("message");
//   }
//   get uid() {
//     return (firebase.auth().currentUser || {}).uid;
//   }
// }
// export default new Fire();
