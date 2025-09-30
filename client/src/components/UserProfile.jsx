import React, { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

const UserProfile = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
    window.location.reload(); // รีโหลดหน้าอัตโนมัติ
  };

  return (
    <div className="relative flex justify-center">
      {/* ปุ่มรูปโปรไฟล์ */}
      <div
        className="avatar avatar-online cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
        tabIndex={0}
      >
        <div className="w-12 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
          <img
            src={
              user?.photo ||
              "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }
            alt="profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Dropdown เมนู */}
      {open && (
        <div className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-black text-black dark:text-white rounded shadow z-20 flex flex-col">
          <button
            className="btn btn-ghost justify-start normal-case text-left"
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
          >
            View Profile
          </button>
          <button
            className="btn btn-ghost justify-start normal-case text-left"
            onClick={() => {
              setOpen(false);
              navigate("/settings");
            }}
          >
            Settings
          </button>
          <div className="border-t my-1 border-gray-300 dark:border-gray-600" />
          <button
            className="btn btn-outline btn-error mt-1 normal-case"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
