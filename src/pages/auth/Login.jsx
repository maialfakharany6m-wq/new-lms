import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../api/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCred.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));

      if (!userDoc.exists()) {
        alert("User not found in DB");
        return;
      }

      const role = userDoc.data().role;

      // 🔥 ROLE-BASED REDIRECT (FIXED)
      if (role === "admin") {
        window.location.href = "/admin";
      } else if (role === "student") {
        window.location.href = "/student";
      } else if (role === "instructor") {
        window.location.href = "/instructor";
      } else {
        alert("Unknown role");
      }

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1220] to-[#111827] relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[500px] h-[500px] bg-yellow-500/10 blur-3xl rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-yellow-500/10 blur-3xl rounded-full bottom-[-150px] right-[-150px]" />

      {/* login card */}
      <div className="bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 p-8 rounded-2xl w-[380px] text-white shadow-2xl">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6 text-center">

          <img
            src="/logo.png"
            className="w-50 h-auto object-contain mb-4"
            alt="logo"
          />

          <h2 className="text-2xl font-bold text-white">
            ليدر أكاديمي
          </h2>

          <h1 className="text-xs tracking-widest text-gray-400 mt-1">
            LEADER ACADEMY
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-bold mb-1">
          Welcome <span className="text-yellow-400">Back</span>
        </h2>

        <p className="text-center text-gray-400 text-sm mb-6">
          Login to access your leader academy account
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full p-3 mb-4 rounded-lg bg-[#1f2937] border border-white/10 focus:outline-none focus:border-yellow-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-2 rounded-lg bg-[#1f2937] border border-white/10 focus:outline-none focus:border-yellow-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* options */}
        <div className="flex justify-between items-center text-sm mb-5 text-gray-400">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <span className="text-yellow-400 cursor-pointer hover:underline">
            Forgot password?
          </span>
        </div>

        {/* button */}
        <button
          onClick={handleLogin}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-lg font-bold transition"
        >
          Login
        </button>

        {/* footer */}
        <p className="text-center mt-5 text-gray-400 text-sm">
          Don’t have an account?{" "}
          <span className="text-yellow-400 cursor-pointer hover:underline">
            Contact the admin
          </span>
        </p>

      </div>
    </div>
  );
}