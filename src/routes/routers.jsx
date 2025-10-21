
import { createBrowserRouter } from "react-router-dom";
import CourseList from "../pages/CourseList";
import LearningJourney from "../pages/LearningJourney";
import App from"../App"
import Login from "../components/auth/Login";
import Singup from "../components/auth/Singup";
import CodeEntry from "../components/codexplainer/CodeEntry";


const router = createBrowserRouter([
  {
   path: "/",   element: <App />, // Home page
  },
    {
    path: "/courses",
    element: <CourseList />, // Course list page
  },
  {
    path: "/course",
    element: <LearningJourney />, // Learning journey page
  },
  {
    path:"/login",
    element:<Login/> // Login page
  },
  {
    path:"/codexplainer",
    element:<CodeEntry />
  },
  {
    path:"/signup",
    element:<Singup/> // Signup page
  }
]);

export default router;
