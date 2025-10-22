
import { createBrowserRouter } from "react-router-dom";
import CourseList from "../pages/courses/CourseList";
//
// import LearningJourney from "../pages/LearningJourney";
import App from"../App"
import Login from "../components/auth/Login";
import Singup from "../components/auth/Singup";
import CodeEntry from "../components/codexplainer/CodeEntry";
import Landingpage from "../pages/Landingpage";

// const RouterWrapper = () => {
//   const { isAuthenticated } = useAuth();

//   // 👇 Define helper function here (inside this file)
//   const requireAuth = (element) =>
//     isAuthenticated ? element : <Login />;
// }

const router = createBrowserRouter([
  {
   path: "/", 
   element: <App />,
   children: [
    {
      path:"/",
      element:<Landingpage/>
    },
    {
      path:"/codexplainer",
      element:<CodeEntry />
    },
    {
      path: "/courses",
      element: <CourseList />, // Course list page
    },
    // {
    //   path: "learning",
    //   children: [
    //     { index: true, element: <LearningJourney /> },
    //     { path: "course/:courseId", element: <CourseDetailPage /> },
    //     {
    //       path: "course/:courseId/milestone/:milestoneId",
    //       element: requireAuth(<MilestoneDetail />),
    //     },
    //     {
    //       path: "course/:courseId/milestone/:milestoneId/concept/:conceptId",
    //       element: requireAuth(<ConceptPage />),
    //     },
    //   ],
    // },
   ] // Home page
  },
  
  // {
  //   path: "/course",
  //   element: <LearningJourney />, // Learning journey page
  // },
  {
    path:"/login",
    element:<Login/> // Login page
  },
 
  {
    path:"/signup",
    element:<Singup/> // Signup page
  }
]);

export default router;
