import { useEffect, useState } from "react";
import { auth, db } from "../api/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function useRole() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return;

      setUser(u);

      const snap = await getDoc(doc(db, "users", u.uid));
      setRole(snap.data()?.role);
    });

    return () => unsub();
  }, []);

  return { role, user };
}