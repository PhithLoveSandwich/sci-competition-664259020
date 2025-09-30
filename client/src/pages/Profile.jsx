// src/pages/Profile.jsx
import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            กรุณาเข้าสู่ระบบก่อน
          </h1>
          <button
            className="mt-4 w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition-colors"
            onClick={() => navigate("/signin")}
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          ข้อมูลผู้ใช้
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium">
              ชื่อ
            </label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{user.name}</p>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium">
              อีเมล
            </label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{user.email}</p>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium">
              ประเภท
            </label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{user.type}</p>
          </div>

          {user.type === "teacher" && (
            <>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium">
                  โรงเรียน
                </label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">{user.school}</p>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium">
                  เบอร์โทรศัพท์
                </label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">{user.phone}</p>
              </div>
            </>
          )}

          <button
            onClick={() => navigate("/edit-profile")}
            className="mt-6 w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition-colors"
          >
            แก้ไขข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
