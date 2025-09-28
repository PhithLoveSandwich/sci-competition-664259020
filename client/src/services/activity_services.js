import api from "./api";
const API_URL = import.meta.env.VITE_ACTIVITY_API;

// GET ALL
const getAllActivities = async () => {
  return api.get(API_URL + "/");
};

// GET BY ID
const getActivityById = async (id) => {
  return api.get(`${API_URL}/${id}`);
};

// CREATE
const createActivity = async (activity) => {
  return api.post(API_URL + "/", activity);
};

// UPDATE BY ID
const updateActivity = async (id, activity) => {
  return api.put(`${API_URL}/${id}`, activity);
};

// DELETE BY ID
const deleteActivity = async (id) => {
  return api.delete(`${API_URL}/${id}`);
};

// SEARCH
const searchActivities = async (queryParams) => {
  // queryParams คือ object เช่น { name: "test", type: "workshop" }
  const query = new URLSearchParams(queryParams).toString();
  return api.get(`${API_URL}/search?${query}`);
};

const ActivityService = {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  searchActivities,
};

export default ActivityService;
