import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ================= AUTH ================= */
import Login from "./pages/auth/Login";

/* ================= ADMIN ================= */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminEnrollments from "./pages/admin/AdminEnrollments";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

/* ================= INSTRUCTOR ================= */
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorCourses from "./pages/instructor/InstructorCourses";
import InstructorAssignments from "./pages/instructor/InstructorAssignments";

/* ================= STUDENT ================= */
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/Profile";
import StudentAssignments from "./pages/student/AssignmentUpload";

import Chat from "./pages/chat/Chat";



export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================= AUTH ================= */}
        <Route path="/" element={<Login />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/enrollments" element={<AdminEnrollments />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />

        {/* ================= INSTRUCTOR ================= */}
        <Route path="/instructor" element={<InstructorDashboard />} />
        <Route path="/instructor/courses" element={<InstructorCourses />} />
        <Route path="/instructor/assignments" element={<InstructorAssignments />} />

        {/* ================= STUDENT ================= */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
<Route path="/student/assignments" element={<StudentAssignments />} />


<Route path="/chat" element={<Chat />} />



        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </BrowserRouter>
  );
}