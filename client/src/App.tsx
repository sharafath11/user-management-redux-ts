import { createBrowserRouter, RouterProvider } from "react-router-dom"
import UserLayout from "./Layouts/UserLayout"
import Home from "./pages/user/Home"
import Login from "./pages/user/Login"
import Register from "./pages/user/Register"
import Profile from "./pages/user/Profile"
import NotFound from "./components/Notfound"
import AdminLayout from "./Layouts/AdminLayout"
import AdminLogin from "./pages/admin/AdminLogin"
import Dashboard from "./pages/admin/Dashboard"

const route = createBrowserRouter([
  {
    path: "/", element: <UserLayout />,
    children: [
      { index: true,element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/admin", element: <AdminLayout />,
    children: [
      { index: true, element: <AdminLogin /> },
      {path:"dashboard",element:<Dashboard/>}
    ]
  },
  {path:"*", element:<NotFound/>}
  
])
const App = () => {
  return <RouterProvider router={route}></RouterProvider>
}

export default App