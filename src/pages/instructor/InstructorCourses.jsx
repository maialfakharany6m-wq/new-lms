import { useEffect, useState } from "react";
import { auth, db } from "../../api/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function InstructorCourses() {

  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const q = query(
      collection(db, "courses"),
      where("instructorId", "==", auth.currentUser.uid)
    );

    const snap = await getDocs(q);

    setCourses(
      snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      }))
    );
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        📚 My Courses
      </h1>

      <div className="grid md:grid-cols-2 gap-4">

        {courses.map(c => (
          <div
            key={c.id}
            className="bg-[#111827] p-5 rounded-xl border border-white/10"
          >

            <h2 className="text-xl font-bold">{c.title}</h2>

            <p className="text-gray-400 text-sm">
              {c.university} | {c.year}
            </p>

            <p className="text-gray-500 text-xs mt-2">
              Course ID: {c.id}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}