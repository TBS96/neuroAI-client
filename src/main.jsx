import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, Login, Register, Contact, About, ChatBot, Error, ForgottenPassword } from './pages/index.js'
import Aos from 'aos'


Aos.init();

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
        path: '/forgotten-password',
        element: <ForgottenPassword />
      },
      {
        path: '/register',
        element: <Register />
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