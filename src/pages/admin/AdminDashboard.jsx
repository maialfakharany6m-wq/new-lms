import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white p-10">

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-center mb-2">
        👑 Admin Control Center
      </h1>

      <p className="text-center text-white/70 mb-10">
        Manage everything in your LMS system
      </p>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

        <Link to="/admin/users"
          className="bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/20 hover:scale-105 transition"
        >
          👤 Users
        </Link>

        <Link to="/admin/courses"
          className="bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/20 hover:scale-105 transition"
        >
          📚 Courses
        </Link>

        <Link to="/admin/enrollments"
          className="bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/20 hover:scale-105 transition"
        >
          🔗 Enrollments
        </Link>

        <Link to="/admin/analytics"
          className="bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/20 hover:scale-105 transition"
        >
          📊 Analytics
        </Link>

      </div>

    </div>
  );
}