const getUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

const getLocalAccessToken = () => {
  return getToken();
};


const setUser = (user) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
};

const getToken = () => {
  return getUser()?.token || null;
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const TokenService = {
  getUser,
  setUser,
  getToken,
  removeUser,
  getLocalAccessToken,
};

export default TokenService;