import { useEffect, useState } from "react";
import { auth, db } from "../../api/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "users", auth.currentUser.uid));
      setProfile(snap.data());
    };

    load();
  }, []);

  const save = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), profile);
    alert("Saved!");
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-8">

      <h1 className="text-2xl font-bold mb-6">👤 Profile</h1>

      <input
        className="w-full p-3 mb-3 bg-[#111827] rounded"
        value={profile.name || ""}
        onChange={(e) =>
          setProfile({ ...profile, name: e.target.value })
        }
        placeholder="Name"
      />

      <textarea
        className="w-full p-3 mb-3 bg-[#111827] rounded"
        value={profile.bio || ""}
        onChange={(e) =>
          setProfile({ ...profile, bio: e.target.value })
        }
        placeholder="Bio"
      />

      <button
        onClick={save}
        className="bg-yellow-500 text-black px-4 py-2 rounded"
      >
        Save
      </button>

    </div>
  );
}