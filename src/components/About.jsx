import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { Helmet } from 'react-helmet'


const About = () => {
    const navigate = useNavigate()
    const features = [
        { icon: '🎮', title: 'Diverse Games', desc: 'From action to puzzles, explore endless gaming possibilities' },
        { icon: '👥', title: 'Thriving Community', desc: 'Connect with millions of gamers worldwide and share your passion' },
        { icon: '🏆', title: 'Competitions', desc: 'Compete in tournaments and prove your skills to the world' },
        { icon: '🔒', title: 'Safe & Inclusive', desc: 'A welcoming environment for gamers of all backgrounds' },
    ];

    return (
        <>
            <Navbar />
            <Helmet>
                <title>About - Arcadia</title>
            </Helmet>

            {/* Hero Section */}
            <div className="min-h-screen bg-gradient-to-br from-[#0A001A] via-[#1A0033] to-[#0A0015] py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Title */}
                    <div className="text-center mb-16">
                        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4" style={{ textShadow: '0 0 30px rgba(0, 217, 255, 0.3)' }}>
                            About <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">Arcadia</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Where gaming passion meets boundless imagination. Join millions of players in the ultimate gaming destination.
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
                        {/* Left - Story */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-cyan-500/10 to-pink-500/10 border-2 border-cyan-500/30 rounded-2xl p-8">
                                <h2 className="text-3xl font-bold text-cyan-400 mb-4">Our Story</h2>
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    We are a vibrant community of gamers, united by our shared love for immersive worlds, thrilling challenges, and unforgettable adventures. Whether you're a seasoned veteran or just starting your journey, you've found your digital home.
                                </p>
                                <p className="text-gray-300 leading-relaxed">
                                    At Arcadia, we believe in the power of gaming to inspire, connect, and entertain. Our platform is more than just a place to play; it's a sanctuary where friendships are forged, skills are honed, and dreams are realized.
                                </p>
                            </div>
                        </div>

                        {/* Right - Mission */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-2 border-pink-500/30 rounded-2xl p-8">
                                <h2 className="text-3xl font-bold text-pink-400 mb-4">Our Mission</h2>
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    We are committed to providing an inclusive and welcoming environment for gamers of all backgrounds and identities. Respect, sportsmanship, and mutual support are the cornerstones of our community.
                                </p>
                                <p className="text-gray-300 leading-relaxed">
                                    From heart-pounding action to mind-bending puzzles, our extensive collection caters to every taste. Dive into epic quests, conquer opponents, or embark on whimsical escapades – the possibilities are endless.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold text-white text-center mb-12">Why Choose Us</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, idx) => (
                                <div key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30">
                                    <div className="text-5xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-bold text-cyan-300 mb-2">{feature.title}</h3>
                                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border-2 border-cyan-500/50 rounded-2xl p-12 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Join the Adventure?</h2>
                        <p className="text-gray-300 mb-8 text-lg">Start your gaming journey today and become part of our amazing community!</p>
                        <button onClick={() => navigate('/games')} className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
                            Explore Games Now
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default About