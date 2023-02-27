import React from 'react';
import { createRoot } from 'react-dom/client';
// import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Booking from "./pages/booking";
import Home from "./pages/home";
import CheckAppoint from "./pages/checkAppoint";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/booking",
    element: <Booking />,
  },
  {
    path: "/checkAppoint",
    element: <CheckAppoint />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
