/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebaseConfig";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchList] = useState([]);
  const [watchedlist, setWatchedList] = useState([]);

  // updateUserData function
  async function updateUserData(data) {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    await setDoc(ref, data, { merge: true }); // <-- safe id doc dont exist it creates one
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Firebase current user:", currentUser);
      setUser(currentUser || null); // make sure null if logged out
      setLoading(false);

      // clear local state if logged out
      if (!currentUser) {
        setWatchList([]);
        setWatchedList([]);
        return;
      }

      // firestore real time subscription to document
      const ref = doc(db, "users", currentUser.uid); // ref to doc

      const unsubscribeSnapshot = onSnapshot(ref, (snap) => {
        const data = snap.data();
        if (!data) return;

        setWatchList(data.watchlist || []);
        setWatchedList(data.watchedlist || []);
      });

      return unsubscribeSnapshot;
    });

    return unsubscribe; // cleanup
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, watchlist, watchedlist, updateUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
