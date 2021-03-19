import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import 'firebase/storage'; 
const config = {
  apiKey: "AIzaSyBYC_WOnN_MP6-GjGQ02I7GdZ4VcRQ74aU",
  authDomain: "citypass131999.firebaseapp.com",
  databaseURL: "https://citypass131999-default-rtdb.firebaseio.com",
  projectId: "citypass131999",
  storageBucket: "citypass131999.appspot.com",
  messagingSenderId: "584972427073"
};

if (!firebase.apps.length) {
  //initializing with the config object
  firebase.initializeApp(config);
}

//separting database API and authentication
const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { firebase, db, auth, facebookProvider, storage };
