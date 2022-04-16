import React, { useContext, useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  set,
  child,
  update,
  remove,
  get,
} from "firebase/database";
import app from "../firebase";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const db = getDatabase(app);
  const [currentUser, setCurrentUser] = useState();
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const value = {
    currentUser,
    signup,
    Login,
    LogOut,
    getNotes,
    setNewNotes,
  };
  async function signup(email, password) {
    console.log("Inside authContext");
    let user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    console.log("In setter ");
    let targetString = user.uid;
    console.log(targetString);
    set(ref(db, targetString), {
      userEmail: email,
    });
    console.log("out setter");
    console.warn("Data stored successfully");
    return user;
  }
  function Login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function LogOut() {
    return signOut(auth);
  }
  async function getNotes() {
    const dbref = ref(db);
    const snapShot = await get(child(dbref, currentUser.uid + "/notes"));
    if (snapShot.exists()) {
      setNotes(snapShot.val());
    }
    return notes;
  }
  async function setNewNotes(newNote) {
    let response = null;
    if (notes === null) {
      const target = [newNote];
      const targetString = currentUser.uid;
      response = set(ref(db, targetString), {
        notes: target,
      });
    } else {
      const target = [...notes, newNote];
      const targetString = currentUser.uid;
      let response = update(ref(db, targetString), {
        notes: target,
      });
    }
    return response;
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
