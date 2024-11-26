import { createBrowserRouter } from "react-router-dom";
// ==== [ Pages ] ====
import Home from "@/pages/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
]);

export default Router;