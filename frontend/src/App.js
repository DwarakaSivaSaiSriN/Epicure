import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Rootlayout from './Rootlayout'
import Home from './components/Home'
import Signin from './components/Signin'
import Login from './components/Login'
import clientHome from './components/clientHome'
import eateryHome from './components/eateryHome'

function App() {

  let router = createBrowserRouter([{
    path: '',
    element: <Rootlayout />,
    children: [{
      path: '',
      element: <Home />
    },
    {
      path: '/signin',
      element: <Signin />
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: '/client-home',
      element: <clientHome />
    },
    {
      path: '/eatery-home',
      element: <eateryHome />
    }
    ]
  }])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App