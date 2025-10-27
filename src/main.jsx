import React from "react";
import ReactDOM from "react-dom/client";
//import { BrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import router from "./routes/routers";
import { CourseProvider } from "./context/courseContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <AuthProvider>
    <CourseProvider>
      <RouterProvider router={router} />
    </CourseProvider>
  </AuthProvider>
</React.StrictMode>
);
