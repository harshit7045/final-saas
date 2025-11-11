import React from "react";
import Header from "./components/header";
import Homepage from "./pages/homepage";
import Phoneosint from "./pages/phoneosint";
import Emailosint from "./pages/emailosint";
import SocialMediaosint from "./pages/socialmediaosint";
import Loginpage from "./pages/loginpage";
import Registerpage from "./pages/registerpage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Profilepage from "./pages/profilepage";
import CheckoutPage from "./pages/checkout";
import { Return } from "./components/stripe";
import Imageosint from "./pages/imageOsintPage";
import Errorpage from "./pages/errorPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <Errorpage />
  },
  {
    path: "/phoneosint",
    element: <Phoneosint />,
    errorElement: <Errorpage />
  },
  {
    path: "/emailosint",
    element: <Emailosint />,
    errorElement: <Errorpage />
  },
  {
    path: "/socialmediaosint",
    element: <SocialMediaosint />,
    errorElement: <Errorpage />
  },
  {
    path: "/login",
    element: <Loginpage />,
    errorElement: <Errorpage />
  },
  {
    path: "/register",
    element: <Registerpage />,
    errorElement: <Errorpage />
  },
  {
    path: "/profile",
    element: <Profilepage />,
    errorElement: <Errorpage />
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
    errorElement: <Errorpage />
  },
  {
    path: "/return",
    element: <Return />,
    errorElement: <Errorpage />
  },
  {
    path: "/imageosint",
    element: <Imageosint />,
    errorElement: <Errorpage />
  },

])
function App() {
  return (
    <>
    
    <RouterProvider router={router} />
    </>
  );
}

export default App;
