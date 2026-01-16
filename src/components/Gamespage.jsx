import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar"
import Footer from "./Footer"
import '../App.css'

function Gamespage() {
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      name: "Tic Tac Toe",
      image: "https://store-images.s-microsoft.com/image/apps.2005.14057826194083709.67242c47-4fd7-4f1a-9dd6-5d93f6cc10df.f80f14c0-72ab-46ff-86cd-9d801c8e04e8?mode=scale&q=90&h=300&w=300",
      route: "/TicTacToe",
      rating: 85,
      category: "Strategy"
    },
    {
      id: 2,
      name: "Snake",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUiAyGahyuOz49kZh_1Cx6dhuOEYVURk8Bn_o2JvS54w&s",
      route: "/snake",
      rating: 82,
      category: "Action"
    },
    {
      id: 3,
      name: "Memory Match",
      image: "https://user-images.githubusercontent.com/17979853/140742294-d8e0155b-b840-4a40-ad8d-0d4106b08338.png",
      route: "/memorygame",
      rating: 88,
      category: "Puzzle"
    },
    {
      id: 4,
      name: "Rock Paper Scissors",
      image: "https://miro.medium.com/v2/resize:fit:1000/0*pwDqZoXvHo79MoT7.png",
      route: "/rockpaper",
      rating: 78,
      category: "Casual"
    }
  ];

  return (
    <>
      <Navbar />

      {/* Games Grid Container */}
      <div className="min-h-screen bg-gradient-to-br from-[#1A0033] via-[#0A001A] to-[#1A0033] py-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center" 
              style={{ textShadow: '0 0 20px #00D9FF, 0 0 40px #00D9FF' }}>
            🎮 All Games
          </h1>
          <p className="text-center text-gray-300 text-lg">
            Select a game and start playing now!
          </p>
        </div>

        {/* Games Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <div
                key={game.id}
                className="group relative rounded-2xl overflow-hidden bg-gray-900/50 border-2 border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                style={{
                  boxShadow: 'inset 0 0 15px rgba(0, 217, 255, 0.1)'
                }}
              >
                {/* Game Image Container */}
                <div className="relative w-full h-64 overflow-hidden bg-gray-800">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ⭐ {game.rating}
                  </div>
                </div>

                {/* Game Info */}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {game.name}
                  </h3>
                  <p className="text-cyan-300 text-sm mb-4">
                    {game.category}
                  </p>

                  {/* Play Button */}
                  <button
                    onClick={() => navigate(game.route)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    style={{
                      boxShadow: '0 0 15px rgba(0, 217, 255, 0.5), 0 0 30px rgba(255, 0, 110, 0.3)'
                    }}
                  >
                    ▶ Play Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="max-w-7xl mx-auto mt-20">
          <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-2 border-purple-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">🎊 More Games Coming Soon</h2>
            <p className="text-gray-300">New exciting games are being developed. Stay tuned!</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Gamespage