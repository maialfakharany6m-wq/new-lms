import { useEffect, useState } from "react";
import { db } from "../../api/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

export default function InstructorAssignments() {

  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    const snap = await getDocs(collection(db, "assignments"));

    setAssignments(
      snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      }))
    );
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // ---------------- UPDATE STATUS + FEEDBACK ----------------
  const updateAssignment = async (id, status, feedback) => {
    await updateDoc(doc(db, "assignments", id), {
      status,
      feedback
    });

    fetchAssignments();
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        📝 Student Assignments
      </h1>

      <div className="space-y-4">

        {assignments.map(a => (
          <div
            key={a.id}
            className="bg-[#111827] p-5 rounded-xl border border-white/10"
          >

            <p className="text-sm text-gray-400">
              Student: {a.studentId}
            </p>

            <p className="text-sm text-gray-400">
              Course: {a.courseId}
            </p>

            <a
              href={a.fileUrl}
              target="_blank"
              className="text-yellow-400 underline"
            >
              📎 View Submission
            </a>

            <p className="mt-2 text-sm">
              Status: <span className="text-yellow-400">{a.status}</span>
            </p>

            {/* ACTIONS */}
            <div className="mt-3 flex gap-2">

              <button
                onClick={() =>
                  updateAssignment(a.id, "approved", "Good job 👍")
                }
                className="bg-green-500 text-black px-3 py-1 rounded"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateAssignment(a.id, "rejected", "Try again ❌")
                }
                className="bg-red-500 text-black px-3 py-1 rounded"
              >
                Reject
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}