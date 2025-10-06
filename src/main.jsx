import React from 'react'
import MemoryCardGame from './components/MemoryCardGame.jsx'
import TicTacToe from './components/TicTacToe.jsx'
import Snake from './components/snake.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import ReactDOM from 'react-dom/client'
import Rockpaper from './components/rockpaper.jsx'
import Services from './components/Services.jsx'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorBoundary><App/></ErrorBoundary>,
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
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
)
