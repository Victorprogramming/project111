import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";
import firebase from "firebase";
import { firebaseConfig } from "../utils/configs";

class Store {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.database = firebase.database();
    this.auth = firebase.auth();
    makeAutoObservable(this);

    this.auth.onAuthStateChanged((user) => {
      this.user = user ? user : this.user === undefined ? null : undefined;
    });
  }

  user = null;

  signIn = (email, password) =>
    new Promise((resolve) =>
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then(() => resolve({}))
        .catch(({ message }) => resolve({ error: message }))
    );

  signUp = (email, password) =>
    new Promise((resolve) =>
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => resolve({}))
        .catch(({ message }) => resolve({ error: message }))
    );

  signOut = () => this.auth.signOut();
}

const store = new Store();

const StoreContext = createContext(store);
const useStore = () => useContext(StoreContext);

export { store, StoreContext, useStore };
