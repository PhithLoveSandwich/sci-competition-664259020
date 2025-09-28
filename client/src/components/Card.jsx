import React from "react";
import Swal from "sweetalert2";
import { useAuthContext } from "../contexts/AuthContext";
import ActivityService from "../services/activity_services";
import { useNavigate, Link } from "react-router";

const Card = (props) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // จัด format วันที่
  const formattedDate = new Date(props.date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // สีตามสถานะ
  const statusColors = {
    active: "bg-green-200 text-green-800",
    draft: "bg-yellow-200 text-yellow-800",
    closed: "bg-red-200 text-red-800",
  };

  // ลบกิจกรรม
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "คุณแน่ใจไหม?",
      text: "การลบกิจกรรมนี้จะไม่สามารถกู้คืนได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่ ลบเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("accessToken");
        await ActivityService.deleteActivity(props.id, token);
        Swal.fire({
          icon: "success",
          title: "ลบสำเร็จ",
          text: "กิจกรรมถูกลบเรียบร้อยแล้ว",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/"); 
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถลบได้",
          text: error.response?.data?.message || error.message,
        });
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 h-full flex flex-col justify-between transition-transform hover:scale-[1.02] hover:shadow-2xl">

      <div className="flex flex-col space-y-4">
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b pb-2">
          {props.title}
        </h2>

        {/* Details */}
        <div className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
          <p><span className="font-semibold">ประเภท:</span> {props.type}</p>
          <p><span className="font-semibold">ระดับ:</span> {props.level}</p>
          <p><span className="font-semibold">วันที่:</span> {formattedDate}</p>
          <p><span className="font-semibold">สถานที่:</span> {props.location}</p>
          <p><span className="font-semibold">จำนวนสมาชิก:</span> {props.team_size}</p>
          <p>
            <span className="font-semibold">สถานะ:</span>{" "}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[props.status] || "bg-gray-200 text-gray-800"}`}>
              {props.status}
            </span>
          </p>
          <p className="text-xs">
            <span className="font-semibold">ผู้ติดต่อ:</span>{" "}
            {props.contact_name} | {props.contact_phone} | {props.contact_email}
          </p>
        </div>

        {/* Action Buttons */}
        {(user?.type === "admin") && (
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            {user.type === "admin" && (
              <button
                onClick={handleDelete}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
              >
                ลบ
              </button>
            )}
            <Link
              to={`/update-activity/${props.id}`}
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm text-center"
            >
              แก้ไข
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
