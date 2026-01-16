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
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl flex items-center justify-between mx-auto px-6 py-4">
        
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center gap-8 flex-1">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity whitespace-nowrap">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Arcade Games Logo" />
            <span className="text-2xl font-bold text-white hidden sm:inline">Arcade Games</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link 
              to="/" 
              className={`px-4 py-2 text-lg font-medium rounded-lg transition-all duration-200 ${isActive('/') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
            >
              Home
            </Link>

            <Link 
              to="/About" 
              className={`px-4 py-2 text-lg font-medium rounded-lg transition-all duration-200 ${isActive('/About') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
            >
              About
            </Link>
            <Link 
              to="/Services" 
              className={`px-4 py-2 text-lg font-medium rounded-lg transition-all duration-200 ${isActive('/Services') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
            >
              Services
            </Link>
            <Link 
              to="/Contact" 
              className={`px-4 py-2 text-lg font-medium rounded-lg transition-all duration-200 ${isActive('/Contact') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden md:flex items-center flex-1 justify-center px-8">
          <div className="relative w-full max-w-xs">
            <input 
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Right Section - Buttons */}
        <div className="hidden lg:flex items-center gap-3 flex-1 justify-end">
          {isAuthenticated && user && !user.isGuest ? (
            <>
              <div className="px-4 py-2.5 text-sm font-medium text-cyan-400 bg-cyan-950/30 border border-cyan-500/30 rounded-lg">
                Welcome, <span className="font-bold">{user.username}</span>
              </div>
              <button 
                onClick={logout}
                className="px-5 py-2.5 text-sm font-medium text-red-300 hover:text-red-200 bg-red-950/30 hover:bg-red-950/50 border border-red-500/30 rounded-lg transition-all duration-200"
              >
                <FaSignOutAlt className="inline mr-2" />
                Logout
              </button>
            </>
          ) : user?.isGuest ? (
            <div className="px-4 py-2.5 text-sm font-medium text-gray-400 bg-gray-800/30 border border-gray-600/30 rounded-lg">
              Playing as Guest
            </div>
          ) : null}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          type="button" 
          className="lg:hidden inline-flex items-center p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all" 
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
        <div className="lg:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative w-full">
                <input 
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <FaSearch className="absolute right-3 top-3 text-gray-500" />
              </div>
            </div>

            <Link to="/" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>

            <Link to="/About" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>

            <Link to="/Services" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>

            <Link to="/Contact" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>

            {/* Mobile Buttons */}
            <div className="pt-4 space-y-2 border-t border-gray-800">
              {isAuthenticated && user && !user.isGuest ? (
                <>
                  <div className="px-4 py-2.5 text-sm font-medium text-cyan-400 bg-cyan-950/30 border border-cyan-500/30 rounded-lg text-center">
                    Welcome, <span className="font-bold">{user.username}</span>
                  </div>
                  <button 
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="w-full px-4 py-2.5 text-sm font-medium text-red-300 bg-red-950/30 hover:bg-red-950/50 border border-red-500/30 rounded-lg transition-all"
                  >
                    <FaSignOutAlt className="inline mr-2" />Logout
                  </button>
                </>
              ) : user?.isGuest ? (
                <div className="px-4 py-2.5 text-sm font-medium text-gray-400 bg-gray-800/30 border border-gray-600/30 rounded-lg text-center">
                  Playing as Guest
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar