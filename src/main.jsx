import React from "react";
import ReactDOM from "react-dom/client";
//import { BrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import router from "./routes/routers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   
      <RouterProvider router={router} />
   
  </React.StrictMode>
);
