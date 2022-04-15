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
  const [notes ,setNotes] = useState()
  const [loading, setLoading] = useState(true);
  const value = {
    currentUser,
    signup,
    Login,
    LogOut,
    getNotes,
  };
  async function signup(email, password) {
    console.log("Inside authContext");
    let user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    console.log("In setter ");
    let targetString = user.user.uid;
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
    const snapShot = await get(child(dbref, currentUser.user.uid + "/notes"));
    if (snapShot.exists()) {
      return snapShot;
    }
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() =>{
    return(
      
    )
  },[])


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
