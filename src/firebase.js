import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDEIkOY3twyheTBlfK6mcIsUWdd_ptV15s",
    authDomain: "howdy-2898.firebaseapp.com",
    databaseURL: "https://howdy-2898.firebaseio.com",
    projectId: "howdy-2898",
    storageBucket: "howdy-2898.appspot.com",
    messagingSenderId: "330968575240",
    appId: "1:330968575240:web:333dc3277fe5838f86d0bd"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  export default firebase.firestore();
