import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import { Toaster } from "./components/ui/toaster";


const App = () => {
  return (
    <>
      <RouterProvider router={Router} />
      <Toaster />
    </>
  )
}

export default App
