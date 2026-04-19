import { Link } from "react-router-dom";

export default function InstructorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-sky-800 to-black text-white p-10">

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-center mb-2">
        👨‍🏫 Instructor Studio
      </h1>

      <p className="text-center text-white/70 mb-10">
        Manage your courses & interact with students
      </p>

      {/* QUICK ACTIONS (UPDATED) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

        <Link
          to="/instructor/courses"
          className="bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/20 hover:scale-105 transition text-center"
        >
          📚 My Courses
        </Link>

        <Link
          to="/instructor/assignments"
          className="bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/20 hover:scale-105 transition text-center"
        >
          📝 Assignments
        </Link>

        {/* 💬 CHAT (NEW - IMPORTANT) */}
        <Link
          to="/chat"
          className="bg-yellow-400 text-black font-bold p-6 rounded-2xl hover:scale-105 transition text-center"
        >
          💬 Chat with Students
        </Link>

        <div className="bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/20 text-center">
          🔔 Notifications
        </div>

      </div>

    </div>
  );
}