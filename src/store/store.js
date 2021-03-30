import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";
import firebase from "firebase";
import { firebaseConfig } from "../utils/configs";

class Store {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.database = firebase.firestore();
    this.auth = firebase.auth();
    makeAutoObservable(this);

    this.auth.onAuthStateChanged((user) => {
      runInAction(() => {
        this.user = user ? user : this.user === undefined ? null : undefined;
      });
    });
  }

  user = null;

  homeData = [];
  loadHomeData = () => {
    this.database
      .collection("puppies")
      .orderBy("timestamp", "desc")
      .limit(20)
      .get()
      .then(({ docs }) => {
        runInAction(() => {
          this.homeData = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
      });
  };

  loadingOlder = false;
  loadOlderHomeData = () => {
    if (this.loadingOlder) {
      return;
    }

    runInAction(() => (this.loadingOlder = true));
    this.database
      .collection("puppies")
      .orderBy("timestamp", "desc")
      .startAfter(this.homeData[this.homeData.length - 1].timestamp)
      .limit(20)
      .get()
      .then(({ docs }) => {
        runInAction(() => {
          this.homeData = this.homeData.concat(
            docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
          this.loadingOlder = false;
        });
      });
  };

  profileData = [];
  loadProfileData = (id) => {
    this.database
      .collection("puppies")
      .where("owner", "==", id)
      .orderBy("timestamp", "desc")
      .limit(20)
      .get()
      .then(({ docs }) => {
        runInAction(() => {
          this.profileData = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
      });
  };

  loadingOlderProfile = false;
  loadOlderProfileData = (id) => {
    if (this.loadingOlderProfile) {
      return;
    }

    runInAction(() => (this.loadingOlderProfile = true));
    this.database
      .collection("puppies")
      .where("owner", "==", id)
      .orderBy("timestamp", "desc")
      .startAfter(this.profileData[this.profileData.length - 1].timestamp)
      .limit(20)
      .get()
      .then(({ docs }) => {
        runInAction(() => {
          this.profileData = this.profileData.concat(
            docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
          this.loadingOlderProfile = false;
        });
      });
  };

  searchData = [];
  lastSearch = null;
  search = (breed, age) => {
    runInAction(() => {
      this.lastSearch = { breed, age };
    });
    this.database
      .collection("puppies")
      .where("breed", ">=", breed)
      .where("age", "==", age)
      .orderBy("breed", "asc")
      .orderBy("timestamp", "desc")
      .limit(20)
      .get()
      .then(({ docs }) => {
        runInAction(() => {
          this.searchData = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
      });
  };

  loadingOlderSearch = false;
  loadOlderSearch = () => {
    if (this.loadOlderSearch) {
      return;
    }

    runInAction(() => (this.loadingOlderSearch = true));
    this.database
      .collection("puppies")
      .where("breed", ">=", this.store.lastSearch.breed)
      .where("age", "==", this.store.lastSearch.age)
      .orderBy("breed", "asc")
      .orderBy("timestamp", "desc")
      .startAfter(this.searchData[this.searchData.length - 1].timestamp)
      .limit(20)
      .get()
      .then(({ docs }) => {
        runInAction(() => {
          this.searchData = this.searchData.concat(
            docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
          this.loadOlderSearch = false;
        });
      });
  };

  deletePet = (id) =>
    this.database
      .collection("puppies")
      .doc(id)
      .delete()
      .then(() => {
        runInAction(() => {
          this.profileData = this.profileData.filter((pet) => pet.id !== id);
        });
      });

  addPet = (data) =>
    this.database.collection("puppies").add({
      ...data,
      owner: this.user.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

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
