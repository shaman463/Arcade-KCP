import React from 'react';
import Navbar from "./Navbar"
import '../App.css'
import { Link } from "react-router-dom"
import FlipCard from "../Games/Flipcard"
import Footer from "./Footer"

function Gamespage() {

  return (
    <>
      <Navbar />

      <div className="separation"></div>

      <div className="cube">
        <div className="desciption">
          <span>Tic Tac Toe is like a tiny battlefield where the mind engages in a strategic dance</span>
          <span>Why did the Tic Tac Toe player go to therapy?</span>
          <span>Because they were tired of always being in a "draw" situation!</span>
          <Link to="/TicTacToe" className="play-game text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-1 py-2.5 text-center me-2 mb-2 mt-10 inline-block">Play</Link>
        </div>
        <div className="Picture">
          <FlipCard frontContent={<img src="https://store-images.s-microsoft.com/image/apps.2005.14057826194083709.67242c47-4fd7-4f1a-9dd6-5d93f6cc10df.f80f14c0-72ab-46ff-86cd-9d801c8e04e8?mode=scale&q=90&h=300&w=300" alt="Tic Tac Toe game board with X and O symbols" />} backContent="Tic Tac Toe Game" />
        </div>
      </div>

      <div className="separation"></div>

      <div className="cube">
        <div className="Picture-2">
          <FlipCard frontContent={<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUiAyGahyuOz49kZh_1Cx6dhuOEYVURk8Bn_o2JvS54w&s" alt="Classic Snake game with green snake moving on dark background" />} backContent="Snake Game" />
        </div>
        <div className="desciption-2">
          <span>"Playing the snake game: where you grow longer by the minute,</span>
          <span> regretting every decision you made five seconds ago!"</span>
          <span>"In the snake game, I'm not just dodging obstacles, </span>
          <span>I'm also dodging my responsibilities... and apparently, my own tail!"</span>
          <Link to="/snake" className="play-game text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-1 py-2.5 text-center me-2 mb-2 mt-10 inline-block">Play</Link>
        </div>
      </div>

      <div className="separation"></div>

      <div className="cube">
        <div className="desciption">
          <span>"Flip the card game: Where the excitement of finding a match is </span>
          <span>only rivaled by the dread of forgetting where you saw it last!"</span>
          <span>"If I had a dollar for every time I forgot where the matching card was in this game,</span>
          <span>I'd have enough to hire a personal memory coach... or just buy more memory cards!"</span>
          <Link to="/memorygame" className="play-game text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-1 py-2.5 text-center me-2 mb-2 mt-10 inline-block">Play</Link>
        </div>
        <div className="Picture">
          <FlipCard frontContent={<img className="border-white border-2" src="https://user-images.githubusercontent.com/17979853/140742294-d8e0155b-b840-4a40-ad8d-0d4106b08338.png" alt="Memory card matching game with fantasy themed cards" />} backContent="Memory Game" />
        </div>
      </div>

      <div className="separation"></div>

      <div className="cube">
        <div className="Picture-2">
          <FlipCard frontContent={<img src="https://miro.medium.com/v2/resize:fit:1000/0*pwDqZoXvHo79MoT7.png" alt="Rock Paper Scissors game showing hand gestures for rock, paper, and scissors" />} backContent="Rock Paper Scissors" />
        </div>
        <div className="desciption-2">
          <span> "Rock, paper, scissors: the only game where you can win with a rock, </span>
          <span>defeat with a pair of scissors, and be covered by paper... </span>
          <span> it's like the ultimate stationary showdown!"</span>
          <Link to="/rockpaper" className="play-game text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-1 py-2.5 text-center me-2 mb-2 mt-10 inline-block">Play</Link>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Gamespage