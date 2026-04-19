import { useEffect, useState } from "react";
import { db } from "../../api/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdminAnalytics() {

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  const load = async () => {
    const u = await getDocs(collection(db, "users"));
    const c = await getDocs(collection(db, "courses"));

    setUsers(u.docs.map(d => d.data()));
    setCourses(c.docs.map(d => d.data()));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-10 text-white">

      <h1 className="text-2xl mb-6">📊 Analytics</h1>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-[#111827] p-4 rounded">
          Users: {users.length}
        </div>

        <div className="bg-[#111827] p-4 rounded text-yellow-400">
          Students: {users.filter(u => u.role === "student").length}
        </div>

        <div className="bg-[#111827] p-4 rounded text-blue-400">
          Courses: {courses.length}
        </div>

      </div>

    </div>
  );
}