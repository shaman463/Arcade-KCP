import React from 'react'
import MemoryGame from './components/memorygame.jsx'
import TicTacToe from './components/TicTacToe.jsx'
import Snake from './components/snake.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import ReactDOM from 'react-dom/client'
import Rockpaper from './components/rockpaper.jsx'
import Services from './components/Services.jsx'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "memorygame",
    element: <MemoryGame/>,
  },
  {
    path: "TicTacToe",
    element: <TicTacToe/>,
  },
  {
    path: "snake",
    element: <Snake/>,
  },
  {
    path: "rockpaper",
    element: <Rockpaper/>,
  },
  {
    path: "About",
    element: <About/>,
  },
  {
    path: "Contact",
    element: <Contact/>,
  },
  {
    path: "Services",
    element: <Services/>,
  },
]); 

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
