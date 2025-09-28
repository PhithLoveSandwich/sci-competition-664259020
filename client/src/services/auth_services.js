import api from "./api";
import TokenService from "./token_services";

const API_URL = import.meta.env.VITE_AUTH_API;

// Signup
const signup = async (formData) => {
  try {
    const response = await api.post(`${API_URL}/signup`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // คืนค่าเฉพาะ data
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Signin
const signin = async (email, password) => {
  try {
    const response = await api.post(`${API_URL}/signin`, { email, password }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.token) {
      TokenService.setUser(response.data);
    }

    return response.data; // คืนค่าเฉพาะ data
  } catch (error) {
    console.error("Signin error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Logout
const logout = () => {
  TokenService.removeUser();
};

// Export
const AuthServices = {
  signup,
  signin,
  logout,
};

export default AuthServices;