import { useEffect, useState } from "react";
import { db } from "../../api/firebase";
import {
  collection,
  getDocs,
  addDoc
} from "firebase/firestore";

export default function AdminEnrollments() {

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  const [userId, setUserId] = useState("");
  const [courseId, setCourseId] = useState("");

  const fetchData = async () => {
    const u = await getDocs(collection(db, "users"));
    const c = await getDocs(collection(db, "courses"));

    setUsers(u.docs.map(d => ({ id: d.id, ...d.data() })));
    setCourses(c.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const assign = async () => {
    await addDoc(collection(db, "enrollments"), {
      userId,
      courseId,
      role: "student"
    });

    alert("Assigned!");
  };

  return (
    <div className="p-10 text-white">

      <h1 className="text-2xl mb-6">🔗 Enrollments</h1>

      <div className="bg-[#111827] p-6 rounded-xl">

        <select
          className="p-2 bg-[#1f2937] w-full mb-2"
          onChange={(e) => setUserId(e.target.value)}
        >
          <option>Select User</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>
              {u.email}
            </option>
          ))}
        </select>

        <select
          className="p-2 bg-[#1f2937] w-full mb-2"
          onChange={(e) => setCourseId(e.target.value)}
        >
          <option>Select Course</option>
          {courses.map(c => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <button
          onClick={assign}
          className="bg-yellow-500 text-black px-4 py-2 rounded"
        >
          Assign
        </button>

      </div>

    </div>
  );
}