import { createBrowserRouter } from "react-router-dom";
// ==== [ Pages ] ====
// import Home from "@/pages/Home";
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";
import TestForm from "@/pages/TestForm";
import ErrorPage from "@/components/messages/ErrorPage";
import Home from "@/pages/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
    errorElement: <ErrorPage />
  },
  {
    path: "/test",
    element: <TestForm />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <SignIn />,
    errorElement: <ErrorPage />
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />
  }
]);

export default Router;