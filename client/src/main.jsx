import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import LeaderBoard from './pages/LeaderBoard.jsx';
import Game from './pages/Game.jsx';
import Profile from './pages/Profile.jsx';

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
      },
      {
        path: 'game',
        element: <Game />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
