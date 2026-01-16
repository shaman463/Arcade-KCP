import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Services = () => {
    const services = [
        {
            icon: '⭐',
            title: 'Game Reviews & Recommendations',
            desc: 'Get expert insights on the latest releases to make informed gaming choices.',
            color: 'cyan'
        },
        {
            icon: '📰',
            title: 'Gaming News & Updates',
            desc: 'Stay updated with industry trends and breaking game developments.',
            color: 'pink'
        },
        {
            icon: '📚',
            title: 'Guides & Walkthroughs',
            desc: 'Overcome challenges with detailed guides and step-by-step walkthroughs.',
            color: 'purple'
        },
        {
            icon: '💬',
            title: 'Community Forums',
            desc: 'Connect with gamers worldwide and discuss strategies together.',
            color: 'blue'
        },
        {
            icon: '🏆',
            title: 'Events & Tournaments',
            desc: 'Compete for glory and exciting prizes in gaming tournaments.',
            color: 'yellow'
        },
        {
            icon: '🎁',
            title: 'Exclusive Deals',
            desc: 'Access special discounts on games and accessories for members.',
            color: 'green'
        },
    ];

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div className="min-h-screen bg-gradient-to-br from-[#0A001A] via-[#1A0033] to-[#0A0015] py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4" style={{ textShadow: '0 0 30px rgba(0, 217, 255, 0.3)' }}>
                            Our <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">Services</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Elevate your gaming journey with our comprehensive suite of premium gaming services.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {services.map((service, idx) => {
                            const borderColors = {
                                cyan: 'border-cyan-500/30 hover:border-cyan-400',
                                pink: 'border-pink-500/30 hover:border-pink-400',
                                purple: 'border-purple-500/30 hover:border-purple-400',
                                blue: 'border-blue-500/30 hover:border-blue-400',
                                yellow: 'border-yellow-500/30 hover:border-yellow-400',
                                green: 'border-green-500/30 hover:border-green-400',
                            };
                            const textColors = {
                                cyan: 'text-cyan-400',
                                pink: 'text-pink-400',
                                purple: 'text-purple-400',
                                blue: 'text-blue-400',
                                yellow: 'text-yellow-400',
                                green: 'text-green-400',
                            };

                            return (
                                <div
                                    key={idx}
                                    className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 ${borderColors[service.color]} rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group`}
                                    style={{
                                        boxShadow: `inset 0 0 15px rgba(0, 217, 255, 0.05)`,
                                    }}
                                >
                                    <div className={`text-6xl mb-4 group-hover:scale-110 transition-transform duration-300`}>{service.icon}</div>
                                    <h3 className={`text-2xl font-bold ${textColors[service.color]} mb-3`}>{service.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Features Highlight */}
                    <div className="bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border-2 border-cyan-500/50 rounded-2xl p-12 mb-16">
                        <h2 className="text-3xl font-bold text-white text-center mb-6">Why Our Services Stand Out</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">24/7</div>
                                <p className="text-gray-300">Available round the clock for your gaming needs</p>
                            </div>
                            <div>
                                <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">Expert</div>
                                <p className="text-gray-300">Curated by experienced gaming professionals</p>
                            </div>
                            <div>
                                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">Free</div>
                                <p className="text-gray-300">Most services included with your membership</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/50 rounded-2xl p-12 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Start Your Premium Experience</h2>
                        <p className="text-gray-300 mb-8 text-lg">Get access to all premium services and unlock exclusive benefits!</p>
                        <a href="/" className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
                            Join Now
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Services