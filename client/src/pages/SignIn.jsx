import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { signin } = useAuthContext(); // ฟังก์ชัน signin จาก AuthContext

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(loginForm.email, loginForm.password); // ใช้ signin จาก context

      Swal.fire({
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1200,
      });

      navigate("/"); // ไปหน้า home
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: err?.message || "Invalid credentials",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          SCI-COMPETITION SIGN IN
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition-colors"
            >
              Sign In
            </button>
          </div>

          <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
