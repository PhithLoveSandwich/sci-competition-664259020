import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout.jsx"
import SignIn from "../pages/SignIn.jsx";
import SignUp from "../pages/SignUp.jsx";
import Profile from "../pages/Profile.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import AddActivity from "../pages/AddActivity.jsx";
import UpdateActivity from "../pages/UpdateActivity.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/add-activity",
        element: <AddActivity />
      },
      {
        path: "update-activity/:id",
        element: <UpdateActivity />
      },
      {
        path: "*",
        element: <NotFound />
      },
    ],
  },
]);

export default router;
