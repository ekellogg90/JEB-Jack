import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import LeaderBoard from './pages/LeaderBoard.jsx';
// import ProfilePage from './pages/ProfilePage.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className=''>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <HomePage />
      }, 
      {
        path: 'leader',
        element: <LeaderBoard />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
