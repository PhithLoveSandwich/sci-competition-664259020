import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout.jsx"
import SignIn from "../pages/SignIn.jsx";
import SignUp from "../pages/SignUp.jsx";
import Profile from "../pages/Profile.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import AddActivity from "../pages/AddActivity.jsx";
import UpdateActivity from "../pages/UpdateActivity.jsx";
import NotAllowed from "../pages/NotAllowed";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";

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
        element: <UserPage> <Profile /> </UserPage>,
      },
      {
        path: "/add-activity",
        element: <AdminPage> <AddActivity /> </AdminPage>
      },
      {
        path: "update-activity/:id",
        element: <AdminPage> <UpdateActivity /> </AdminPage>
      },
      {
        path: "*",
        element: <NotFound />
      },
      {
         path: "/notallowed",
         element: <NotAllowed />,
      },
    ],
  },
]);

export default router;
