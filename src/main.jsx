import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, Login, Register, Contact, About, ChatBot, Error, ForgottenPassword, UserProfile } from './pages/index.js'
import Aos from 'aos'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { AuthLayout } from './components/index.js'


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
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: `/profile/:userName`,
        element: (
          <AuthLayout authentication>
            <UserProfile />
          </AuthLayout>
        )
      },
      {
        path: '/forgotten-password',
        element: (
          <AuthLayout authentication={false}>
            <ForgottenPassword />
          </AuthLayout>
        )
      },
      {
        path: '/register',
        element: (
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        )
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
        element: (
          <AuthLayout authentication>
            <ChatBot />
          </AuthLayout>
        )
      },
      {
        path: '*',
        element: <Error />
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)