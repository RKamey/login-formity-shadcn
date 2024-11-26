import { createBrowserRouter } from "react-router-dom";
// ==== [ Pages ] ====
// import Home from "@/pages/Home";
import SignUp from "@/pages/SignUp";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />
  }
]);

export default Router;