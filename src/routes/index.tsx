import { createBrowserRouter } from "react-router-dom";
// ==== [ Pages ] ====
// import Home from "@/pages/Home";
import SignUp from "@/pages/SignUp";
import TestForm from "@/pages/TestForm";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />
  },
  {
    path: "/test",
    element: <TestForm />
  }
]);

export default Router;