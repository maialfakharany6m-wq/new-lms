import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../api/firebase";
import { collection, getDocs } from "firebase/firestore";
import Chat from "../../components/Chat";

export default function CourseView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "courses", id, "lessons"));

      setLessons(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    };

    load();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white flex">

      {/* LESSONS */}
      <div className="w-[300px] bg-[#111827] p-5 border-r border-white/10">

        <h2 className="font-bold mb-4">📚 Lessons</h2>

        {lessons.map((l) => (
          <div key={l.id} className="mb-3">

            <p className="font-bold">{l.title}</p>

            {l.videoUrl && (
              <video controls className="w-full mt-2 rounded">
                <source src={l.videoUrl} />
              </video>
            )}

            {l.pdfUrl && (
              <a
                href={l.pdfUrl}
                target="_blank"
                className="text-yellow-400 underline text-sm"
              >
                Open PDF
              </a>
            )}

          </div>
        ))}

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">

        {/* CHAT */}
        <Chat courseId={id} />

        <button
          onClick={() => navigate(`/course/${id}/assignments`)}
          className="mt-6 bg-yellow-500 text-black px-4 py-2 rounded"
        >
          Upload Assignment
        </button>

      </div>

    </div>
  );
}