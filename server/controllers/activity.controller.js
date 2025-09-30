import { Op } from "sequelize";
import Activity from "../models/activity.model.js";

const activityControllers = {};

// Create a new activity
activityControllers.createActivity = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status
    } = req.body;

    // Validate required fields
    if (
      !name || !description || !type || !level || !team_size || !date ||
      !location || !reg_open || !reg_close || !contact_name || !contact_phone || !contact_email
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if name already exists
    const activity = await Activity.findOne({ where: { name } });
    if (activity) {
      return res.status(400).send({ message: "Activity name already taken" });
    }

    // Create new activity
    const newActivity = await Activity.create({
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status: status || "draft" // Default status
    });

    res.status(201).json(newActivity);
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

// Get all activities
activityControllers.getAll = async (req, res) => {
  try {
    const data = await Activity.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({
      message: error.message || "Something went wrong while getting all activities",
    });
  }
};

// Get activity by ID
activityControllers.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Activity.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: "Not found Activity with id: " + id });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching activity by ID:", error);
    res.status(500).json({
      message: error.message || "Something went wrong while retrieving the Activity.",
    });
  }
};

// Update activity by ID
activityControllers.updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Activity ID is required." });
    }

    const {
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status
    } = req.body;

    if (
      !name || !description || !type || !level || !team_size || !date ||
      !location || !reg_open || !reg_close || !contact_name || !contact_phone || !contact_email
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found." });
    }

    await activity.update({
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status: status || activity.status
    });

    res.status(200).json(activity);
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

// Delete activity by ID
activityControllers.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found." });
    }

    await activity.destroy();
    res.status(200).json({ message: "Activity deleted successfully." });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

// Search activities
activityControllers.searchActivities = async (req, res) => {
  try {
    const { name, type, level, status } = req.query;
    const whereClause = {};

    if (name) {
      whereClause.name = { [Op.like]: `%${name}%` };
    }
    if (type) {
      whereClause.type = type;
    }
    if (level) {
      whereClause.level = level;
    }
    if (status) {
      whereClause.status = status;
    }

    const activities = await Activity.findAll({ where: whereClause });
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error searching activities:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

export default activityControllers;
