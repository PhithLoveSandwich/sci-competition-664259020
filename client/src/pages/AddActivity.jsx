// src/pages/AddActivity.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import ActivityService from "../services/activity_services";

const AddActivity = () => {
  const navigate = useNavigate();

  const initialActivity = {
    name: "",
    description: "",
    type: "",
    level: "",
    team_size: "",
    date: "",
    location: "",
    reg_open: "",
    reg_close: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    status: ""
  };

  const [activity, setActivity] = useState(initialActivity);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...activity,
        team_size: activity.team_size ? parseInt(activity.team_size) : 0,
        date: activity.date ? new Date(activity.date).toISOString() : null,
        reg_open: activity.reg_open ? new Date(activity.reg_open).toISOString() : null,
        reg_close: activity.reg_close ? new Date(activity.reg_close).toISOString() : null,
      };

      const token = localStorage.getItem("accessToken"); // ดึง token
      const newActivity = await ActivityService.createActivity(payload, token); // ส่ง token ไปด้วย

      if (newActivity.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Activity added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        setActivity(initialActivity); // รีเซ็ตฟอร์ม
        navigate("/"); // กลับหน้า list activities
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to add activity",
      });
      console.error("Error adding activity:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          ADD ACTIVITY FORM
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Name", name: "name", type: "text", placeholder: "ชื่อกิจกรรม", required: true },
            { label: "Description", name: "description", type: "textarea", placeholder: "คำอธิบายกิจกรรม", required: true },
            { label: "Type", name: "type", type: "text", placeholder: "ประเภทกิจกรรม" },
            { label: "Level", name: "level", type: "text", placeholder: "ระดับกิจกรรม" },
            { label: "Team size", name: "team_size", type: "number", placeholder: "จำนวนสมาชิกในทีม" },
            { label: "Date", name: "date", type: "date" },
            { label: "Venue", name: "location", type: "text", placeholder: "สถานที่จัดกิจกรรม" },
            { label: "Open", name: "reg_open", type: "date" },
            { label: "Closed", name: "reg_close", type: "date" },
            { label: "Contact Name", name: "contact_name", type: "text", placeholder: "ชื่อผู้ติดต่อ" },
            { label: "Telephone", name: "contact_phone", type: "tel", placeholder: "เบอร์โทรศัพท์" },
            { label: "Contact Email", name: "contact_email", type: "email", placeholder: "อีเมลผู้ติดต่อ" },
            { label: "Status", name: "status", type: "text", placeholder: "สถานะกิจกรรม" }
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">{field.label}:</label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={activity[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={activity[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                />
              )}
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition-colors"
            >
              Add Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActivity;
