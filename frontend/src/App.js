import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// The component name should always be PascalCase
import Rootlayout from './Rootlayout'
import Home from './components/Home'
import Signin from './components/Signin'
import Login from './components/Login'
import ClientHome from './components/ClientHome'
import EateryHome from './components/EateryHome'

function App() {

  let router = createBrowserRouter([{
    path: '',
    element: <Rootlayout />,
    children: [{
      path: '',
      element: <Home />
    },
    {
      path: 'signin',
      element: <Signin />
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'client-home',
      element: <ClientHome />
    },
    {
      path: 'eatery-home',
      element: <EateryHome />
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