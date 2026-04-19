import { useEffect, useState } from "react";
import { db } from "../../api/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function AdminCourses() {

  const [courses, setCourses] = useState([]);

  const [course, setCourse] = useState({
    title: "",
    university: "",
    college: "",
    year: "",
    instructorId: "",
  });

  const fetchCourses = async () => {
    const snap = await getDocs(collection(db, "courses"));
    setCourses(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const createCourse = async () => {
    await addDoc(collection(db, "courses"), {
      ...course,
      createdAt: new Date()
    });

    setCourse({
      title: "",
      university: "",
      college: "",
      year: "",
      instructorId: "",
    });

    fetchCourses();
  };

  const deleteCourse = async (id) => {
    await deleteDoc(doc(db, "courses", id));
    fetchCourses();
  };

  return (
    <div className="p-10 text-white">

      <h1 className="text-2xl mb-6">📚 Courses</h1>

      {/* CREATE */}
      <div className="bg-[#111827] p-6 rounded-xl mb-6">

        <input placeholder="Title"
          className="p-2 bg-[#1f2937] rounded w-full mb-2"
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
        />

        <input placeholder="University"
          className="p-2 bg-[#1f2937] rounded w-full mb-2"
          value={course.university}
          onChange={(e) => setCourse({ ...course, university: e.target.value })}
        />

        <input placeholder="Instructor ID"
          className="p-2 bg-[#1f2937] rounded w-full mb-2"
          value={course.instructorId}
          onChange={(e) => setCourse({ ...course, instructorId: e.target.value })}
        />

        <button
          onClick={createCourse}
          className="bg-yellow-500 text-black px-4 py-2 rounded"
        >
          Create Course
        </button>

      </div>

      {/* LIST */}
      <div className="bg-[#111827] rounded-xl">

        {courses.map(c => (
          <div key={c.id} className="p-4 border-b border-white/10 flex justify-between">

            <div>
              <p>{c.title}</p>
              <p className="text-gray-400 text-sm">{c.university}</p>
            </div>

            <button
              onClick={() => deleteCourse(c.id)}
              className="text-red-400"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}