import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-900 text-white p-6">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-2">
        🎓 Welcome Back
      </h1>

      <p className="text-white/80 mb-6">
        Continue your learning journey 🚀
      </p>

      {/* QUICK ACTIONS (NEW) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <Link
          to="/student/profile"
          className="bg-white/10 backdrop-blur p-4 rounded-2xl text-center hover:scale-105 transition"
        >
          👤 Profile
        </Link>

        <Link
          to="/student/assignments"
          className="bg-white/10 backdrop-blur p-4 rounded-2xl text-center hover:scale-105 transition"
        >
          📝 Assignments
        </Link>

        <Link
          to="/chat"
          className="bg-yellow-400 text-black font-bold p-4 rounded-2xl text-center hover:scale-105 transition"
        >
          💬 Chat
        </Link>

        <div className="bg-white/10 backdrop-blur p-4 rounded-2xl text-center">
          ⚙️ Settings
        </div>

      </div>

      {/* PROFILE */}
      <div className="bg-white/10 backdrop-blur p-4 rounded-2xl border border-white/20 mb-6">
        👤 Profile Card (connect later to Firestore)
      </div>

      {/* COURSES */}
      <h2 className="text-xl mb-3">📚 My Courses</h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-white/10 backdrop-blur p-5 rounded-2xl hover:scale-105 transition">
          📘 Math 101
        </div>

        <div className="bg-white/10 backdrop-blur p-5 rounded-2xl hover:scale-105 transition">
          💻 Programming Basics
        </div>

      </div>

      {/* NOTIFICATIONS */}
      <h2 className="text-xl mt-8 mb-3">🔔 Notifications</h2>

      <div className="space-y-2">

        <div className="bg-white/10 p-3 rounded-xl">
          New assignment available 📌
        </div>

        <div className="bg-white/10 p-3 rounded-xl">
          Instructor replied to your submission 💬
        </div>

      </div>

    </div>
  );
}