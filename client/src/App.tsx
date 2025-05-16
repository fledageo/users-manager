import { useEffect } from "react"
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router"
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Login/Login"
import { Invite } from "./pages/Invite/Invite"

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/invite",
    element:<Invite/>
  }
]) 


const App = () => {
  return (
    <>
      <RouterProvider router={router}>

      </RouterProvider>
    </>
  )
}

export default App