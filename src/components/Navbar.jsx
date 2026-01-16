import React, { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaSearch, FaSignOutAlt } from 'react-icons/fa'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const { user, isAuthenticated, logout } = useContext(AuthContext)

  const isActive = (path) => location.pathname === path

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-gradient-to-r from-[#0A001A] via-[#1A0033] to-[#0A001A] border-b-2 border-cyan-500/30 sticky top-0 z-50" style={{ boxShadow: '0 4px 20px rgba(0, 217, 255, 0.1)' }}>
      <div className="max-w-7xl flex items-center justify-between mx-auto px-6 py-4">
        
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center gap-8 flex-1">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform whitespace-nowrap group">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
              🎮
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent hidden sm:inline">Arcade Games</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <Link 
              to="/" 
              className={`px-4 py-2 text-base font-semibold rounded-lg transition-all duration-300 ${isActive('/') ? 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20 text-cyan-300 border border-cyan-500/50' : 'text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent'}`}
            >
              Home
            </Link>

            <Link 
              to="/About" 
              className={`px-4 py-2 text-base font-semibold rounded-lg transition-all duration-300 ${isActive('/About') ? 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20 text-cyan-300 border border-cyan-500/50' : 'text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent'}`}
            >
              About
            </Link>
            <Link 
              to="/Services" 
              className={`px-4 py-2 text-base font-semibold rounded-lg transition-all duration-300 ${isActive('/Services') ? 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20 text-cyan-300 border border-cyan-500/50' : 'text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent'}`}
            >
              Services
            </Link>
            <Link 
              to="/Contact" 
              className={`px-4 py-2 text-base font-semibold rounded-lg transition-all duration-300 ${isActive('/Contact') ? 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20 text-cyan-300 border border-cyan-500/50' : 'text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent'}`}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden md:flex items-center flex-1 justify-center px-8">
          <div className="relative w-full max-w-xs group">
            <input 
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-900/50 border-2 border-cyan-500/30 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-gray-900/70 transition-all duration-300 group-hover:border-cyan-400/50"
            />
            <FaSearch className="absolute right-3 top-3.5 text-cyan-400" />
          </div>
        </div>

        {/* Right Section - Buttons */}
        <div className="hidden lg:flex items-center gap-3 flex-1 justify-end">
          {isAuthenticated && user && !user.isGuest ? (
            <>
              <div className="px-4 py-2.5 text-sm font-semibold text-cyan-300 bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 border-2 border-cyan-500/50 rounded-lg hover:border-cyan-400 transition-all duration-300">
                ✓ <span className="font-bold">{user.username}</span>
              </div>
              <Link 
                to="/settings"
                className="px-4 py-2.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg transition-all duration-300"
              >
                ⚙️ Settings
              </Link>
              <button 
                onClick={logout}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 border-2 border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50"
              >
                <FaSignOutAlt className="inline mr-2" />
                Logout
              </button>
            </>
          ) : user?.isGuest ? (
            <div className="px-4 py-2.5 text-sm font-semibold text-gray-400 bg-gray-800/50 border-2 border-gray-600/50 rounded-lg">
              👤 Playing as Guest
            </div>
          ) : (
            <Link 
              to="/"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 border-2 border-cyan-400/50 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          type="button" 
          className="lg:hidden inline-flex items-center p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-400 rounded-lg transition-all" 
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-[#1A0033] to-[#0A001A] border-t-2 border-cyan-500/30">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative w-full group">
                <input 
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border-2 border-cyan-500/30 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all group-hover:border-cyan-400/50"
                />
                <FaSearch className="absolute right-3 top-3.5 text-cyan-400" />
              </div>
            </div>

            <Link to="/" className="block px-4 py-3 text-cyan-300 font-semibold hover:text-white hover:bg-cyan-500/10 rounded-lg border border-cyan-500/20 hover:border-cyan-400 transition-all" onClick={() => setIsMenuOpen(false)}>
              🏠 Home
            </Link>

            <Link to="/About" className="block px-4 py-3 text-cyan-300 font-semibold hover:text-white hover:bg-cyan-500/10 rounded-lg border border-cyan-500/20 hover:border-cyan-400 transition-all" onClick={() => setIsMenuOpen(false)}>
              ℹ️ About
            </Link>

            <Link to="/Services" className="block px-4 py-3 text-cyan-300 font-semibold hover:text-white hover:bg-cyan-500/10 rounded-lg border border-cyan-500/20 hover:border-cyan-400 transition-all" onClick={() => setIsMenuOpen(false)}>
              🎯 Services
            </Link>

            <Link to="/Contact" className="block px-4 py-3 text-cyan-300 font-semibold hover:text-white hover:bg-cyan-500/10 rounded-lg border border-cyan-500/20 hover:border-cyan-400 transition-all" onClick={() => setIsMenuOpen(false)}>
              📞 Contact
            </Link>

            {/* Mobile Buttons */}
            <div className="pt-4 space-y-2 border-t-2 border-cyan-500/20">
              {isAuthenticated && user && !user.isGuest ? (
                <>
                  <div className="px-4 py-3 text-sm font-semibold text-cyan-300 bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 border-2 border-cyan-500/50 rounded-lg text-center">
                    ✓ Welcome, <span className="font-bold">{user.username}</span>
                  </div>
                  <Link 
                    to="/settings"
                    className="block px-4 py-3 text-sm font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-lg transition-all text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ⚙️ Settings
                  </Link>
                  <button 
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 border-2 border-red-500/50 hover:border-red-400 rounded-lg transition-all"
                  >
                    <FaSignOutAlt className="inline mr-2" />Logout
                  </button>
                </>
              ) : user?.isGuest ? (
                <div className="px-4 py-3 text-sm font-semibold text-gray-400 bg-gray-800/50 border-2 border-gray-600/50 rounded-lg text-center">
                  👤 Playing as Guest
                </div>
              ) : (
                <Link 
                  to="/"
                  className="block px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 border-2 border-cyan-400/50 rounded-lg transition-all text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar