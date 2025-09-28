// src/pages/AddActivity.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import ActivityService from "../services/activity_services";

const AddActivity = () => {
  const [activity, setActivity] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((prev) => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async () => {
    try {
        const payload = {
        ...activity,
        team_size: parseInt(activity.team_size),
        date: new Date(activity.date).toISOString(),
        reg_open: new Date(activity.reg_open).toISOString(),
        reg_close: new Date(activity.reg_close).toISOString(),
        };

        const newActivity = await ActivityService.createActivity(payload);

        if (newActivity.status === 201) {
        Swal.fire({
            title: "Add New Activity",
            text: "Add new Activity Successfully",
            icon: "success",
        });
        setActivity({
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
        });
        } else {
        Swal.fire({
            title: "Add New Activity",
            text: "Failed to add activity",
            icon: "error",
        });
        }
    } catch (error) {
        Swal.fire({
        title: "Add New Activity",
        text: "An error occurred while adding activity",
        icon: "error",
        });
        console.error(error);
    }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          ADD ACTIVITY FORM
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={activity.name}
              onChange={handleChange}
              placeholder="ชื่อกิจกรรม"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Description:</label>
            <textarea
              name="description"
              value={activity.description}
              onChange={handleChange}
              placeholder="คำอธิบายกิจกรรม"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Type:</label>
            <input
              type="text"
              name="type"
              value={activity.type}
              onChange={handleChange}
              placeholder="ประเภทกิจกรรม"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Level */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Level:</label>
            <input
              type="text"
              name="level"
              value={activity.level}
              onChange={handleChange}
              placeholder="ระดับกิจกรรม"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Team Size */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Team size:</label>
            <input
              type="number"
              name="team_size"
              value={activity.team_size}
              onChange={handleChange}
              placeholder="จำนวนสมาชิกในทีม"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Opem:</label>
            <input
              type="date"
              name="date"
              value={activity.date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Venue:</label>
            <input
              type="text"
              name="location"
              value={activity.location}
              onChange={handleChange}
              placeholder="สถานที่จัดกิจกรรม"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Registration Open */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Open:</label>
            <input
              type="date"
              name="reg_open"
              value={activity.reg_open}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Registration Close */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Closed:</label>
            <input
              type="date"
              name="reg_close"
              value={activity.reg_close}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Contact Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Contract Name:</label>
            <input
              type="text"
              name="contact_name"
              value={activity.contact_name}
              onChange={handleChange}
              placeholder="ชื่อผู้ติดต่อ"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Contact Phone */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Telephone:</label>
            <input
              type="tel"
              name="contact_phone"
              value={activity.contact_phone}
              onChange={handleChange}
              placeholder="เบอร์โทรศัพท์"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Contract Email:</label>
            <input
              type="email"
              name="contact_email"
              value={activity.contact_email}
              onChange={handleChange}
              placeholder="อีเมลผู้ติดต่อ"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Status:</label>
            <input
              type="text"
              name="status"
              value={activity.status}
              onChange={handleChange}
              placeholder="สถานะกิจกรรม"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>

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
