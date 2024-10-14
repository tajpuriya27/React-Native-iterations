import firebase from "firebase/compat/app";
import "@firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVJ5yrHTQ6HrkzW6QQLdgarFrFIS_l9Pc",
  authDomain: "my-todo-101.firebaseapp.com",
  projectId: "my-todo-101",
  storageBucket: "my-todo-101.appspot.com",
  messagingSenderId: "519409860928",
  appId: "1:519409860928:web:02cac970cff2691b70baa5",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  getLists(callback) {
    let ref = this.ref.orderBy("name");

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      let lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      callback(lists);
    });
  }

  addList(list) {
    let ref = this.ref;
    ref.add(list);
  }

  updateList(list) {
    let ref = this.ref;
    ref.doc(list.id).update(list);
  }

  get ref() {
    return firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;
