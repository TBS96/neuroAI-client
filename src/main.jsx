import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, Login, Signup, Contact, About, ChatBot, Error } from './pages/index.js'
// import Error from './pages/Error.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/chatbot',
        element: <ChatBot />
      },
      {
        path: '*',
        element: <Error />
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)