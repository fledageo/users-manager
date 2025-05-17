import { createBrowserRouter, RouterProvider } from "react-router"
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Login/Login"
import { Invite } from "./pages/Invite/Invite"
import { Activate } from "./pages/Activate/Activate"
import UserContext from "./context/UserContext"
import { useState } from "react"
import type { IUser } from "./lib/types"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/invite",
    element: <Invite />
  },
  {
    path: "/activate",
    element: <Activate />
  }
])


const App = () => {
  const [user,setUser] = useState<IUser>({})

  return (
    <>
      <UserContext value={{user, setUser}}>
        <RouterProvider router={router}>

        </RouterProvider>
      </UserContext>
    </>
  )
}

export default App