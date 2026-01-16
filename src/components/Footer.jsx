import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-[#0A001A] via-[#1A0033] to-[#0A0015] border-t-2 border-cyan-500/30 mt-20">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    
                    {/* Brand Section */}
                    <div className="col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                🎮
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                                Arcade Games
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your ultimate destination for fun, engaging arcade games. Play, compete, and have a blast!
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all duration-300">
                                <span className="text-lg">f</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all duration-300">
                                <span className="text-lg">𝕏</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all duration-300">
                                <span className="text-lg">📱</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-pink-500 rounded-full"></span>
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/About" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                                    → About Us
                                </Link>
                            </li>
                            <li>
                                <a href="#games" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                                    → All Games
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                                    → Leaderboard
                                </a>
                            </li>
                            <li>
                                <Link to="/Contact" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                                    → Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Support */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-pink-500 rounded-full"></span>
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                                    → Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                                    → Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                                    → Licensing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                                    → Cookie Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-pink-500 rounded-full"></span>
                            Stay Updated
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to get updates on new games and features.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 bg-gray-800/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-300 text-sm"
                            />
                            <button className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
                                →
                            </button>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="border-t border-gray-700/50 mb-8"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <p className="text-gray-400 text-sm">
                            © 2023-2026 <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent font-semibold">Arcade Games</span>. All Rights Reserved.
                        </p>
                    </div>
                    
                    
                </div>

            </div>
        </footer>
    )
}

export default Footer