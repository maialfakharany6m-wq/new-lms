import { useEffect, useState, useMemo } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "../../api/firebase";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const snap = await getDocs(collection(db, "users"));
    setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, role) => {
    await updateDoc(doc(db, "users", id), { role });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  };

  return (
    <div className="p-10 text-white">

      <h1 className="text-2xl mb-6">👤 Users</h1>

      <div className="bg-[#111827] rounded-xl">

        {users.map(u => (
          <div key={u.id} className="flex justify-between p-4 border-b border-white/10">

            <div>
              <p>{u.email}</p>
              <p className="text-gray-400 text-sm">{u.role}</p>
            </div>

            <div className="flex gap-3">

              <select
                value={u.role}
                onChange={(e) => changeRole(u.id, e.target.value)}
                className="bg-[#1f2937] p-2 rounded"
              >
                <option>student</option>
                <option>instructor</option>
              </select>

              <button
                onClick={() => deleteUser(u.id)}
                className="text-red-400"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}