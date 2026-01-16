import React from 'react'
import MemoryCardGame from './Games/MemoryCardGame.jsx'
import TicTacToe from './Games/TicTacToe.jsx'
import Snake from './Games/snake.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import ReactDOM from 'react-dom/client'
import Rockpaper from './Games/rockpaper.jsx'
import Services from './components/Services.jsx'
import App from './App.jsx'
import Gamespage from './components/Gamespage.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorBoundary><App/></ErrorBoundary>,
  },
  {
    path: "games",
    element: <ErrorBoundary><Gamespage/></ErrorBoundary>,
  },
  {
    path: "memorygame",
    element: <ErrorBoundary><MemoryCardGame/></ErrorBoundary>,
  },
  {
    path: "TicTacToe",
    element: <ErrorBoundary><TicTacToe/></ErrorBoundary>,
  },
  {
    path: "snake",
    element: <ErrorBoundary><Snake/></ErrorBoundary>,
  },
  {
    path: "rockpaper",
    element: <ErrorBoundary><Rockpaper/></ErrorBoundary>,
  },
  {
    path: "About",
    element: <ErrorBoundary><About/></ErrorBoundary>,
  },
  {
    path: "Contact",
    element: <ErrorBoundary><Contact/></ErrorBoundary>,
  },
  {
    path: "Services",
    element: <ErrorBoundary><Services/></ErrorBoundary>,
  },
]); 

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);