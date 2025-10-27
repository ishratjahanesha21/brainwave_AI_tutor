
import { createBrowserRouter } from "react-router-dom";
import CourseList from "../pages/courses/CourseList";
//
// import LearningJourney from "../pages/LearningJourney";
import App from"../App"
import CodeEntry from "../components/codexplainer/CodeEntry";
import Landingpage from "../pages/Landingpage";
import CourseDetailPage from "../pages/courses/CourseDetailPage";
import ConceptPage from "../pages/courses/ConceptPage";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Singup";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";

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
      index: true,
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
       
       
        {
          path: "courses",
          element: <CourseList /> // List all courses
        },
        {
          path: "courses/:courseId",
          element: <CourseDetailPage /> // Course detail with milestones
        },
        {
          path: "courses/:courseId/milestone/:milestoneId/concept/:conceptId",
          element:
          <ProtectedRoute>

          <ConceptPage /> 
        </ProtectedRoute>
        },
        {
          path:"/dashboard",
          element:<ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }
      
      
    
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
    element:<Signup/> // Signup page
  }
]);

export default router;
