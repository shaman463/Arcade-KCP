import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Helmet } from 'react-helmet'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you within 24-48 hours.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactMethods = [
        {
            icon: '💬',
            title: 'Customer Support',
            desc: 'Technical issues & account inquiries',
            contact: 'support@arcadegames.com',
            type: 'email'
        },
        {
            icon: '💡',
            title: 'Feedback & Suggestions',
            desc: 'Share your ideas for improvements',
            contact: 'feedback@arcadegames.com',
            type: 'email'
        },
        {
            icon: '🤝',
            title: 'Partnerships',
            desc: 'Business & sponsorship inquiries',
            contact: 'partnerships@arcadegames.com',
            type: 'email'
        },
        {
            icon: '📞',
            title: 'Phone Support',
            desc: 'Call us for urgent matters',
            contact: '0175-27840945',
            type: 'phone'
        },
    ];

    const socialLinks = [
        { icon: '𝕏', name: 'Twitter', url: '#' },
        { icon: 'f', name: 'Facebook', url: '#' },
        { icon: '📱', name: 'Instagram', url: '#' },
        { icon: '▶', name: 'YouTube', url: '#' },
    ];

    return (
        <>
            <Navbar />
            <Helmet>
                <title>Contact Us - Arcade Games</title>
            </Helmet>

            {/* Hero Section */}
            <div className="min-h-screen bg-gradient-to-br from-[#0A001A] via-[#1A0033] to-[#0A0015] py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4" style={{ textShadow: '0 0 30px rgba(0, 217, 255, 0.3)' }}>
                            Get In <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">Touch</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            We'd love to hear from you! Reach out to us with any questions, feedback, or partnership opportunities.
                        </p>
                    </div>

                    {/* Contact Methods Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {contactMethods.map((method, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-xl p-6 transition-all duration-300 transform hover:scale-105">
                                <div className="text-4xl mb-3">{method.icon}</div>
                                <h3 className="text-lg font-bold text-cyan-300 mb-1">{method.title}</h3>
                                <p className="text-gray-500 text-xs mb-3">{method.desc}</p>
                                <a href={method.type === 'email' ? `mailto:${method.contact}` : `tel:${method.contact}`} className="text-cyan-400 hover:text-cyan-300 font-semibold break-all text-sm">
                                    {method.contact}
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form & Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {/* Form */}
                        <div className="lg:col-span-2 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 border-2 border-cyan-500/30 rounded-2xl p-8">
                            <h2 className="text-3xl font-bold text-cyan-300 mb-6">Send Us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="bg-gray-900/50 border-2 border-cyan-500/30 focus:border-cyan-400 text-white rounded-lg px-4 py-3 focus:outline-none transition-all"
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-gray-900/50 border-2 border-cyan-500/30 focus:border-cyan-400 text-white rounded-lg px-4 py-3 focus:outline-none transition-all"
                                        required
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900/50 border-2 border-cyan-500/30 focus:border-cyan-400 text-white rounded-lg px-4 py-3 focus:outline-none transition-all"
                                    required
                                />
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full bg-gray-900/50 border-2 border-cyan-500/30 focus:border-cyan-400 text-white rounded-lg px-4 py-3 focus:outline-none transition-all resize-none"
                                    required
                                ></textarea>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Office Info */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-pink-300 mb-3 flex items-center gap-2">
                                    📍 Office Address
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Arcade Games Headquarters<br />
                                    Khalsa College Patiala<br />
                                    Patiala, Punjab 147001<br />
                                    India
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-2 border-green-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-green-300 mb-3">Follow Us</h3>
                                <div className="flex gap-3 flex-wrap">
                                    {socialLinks.map((link, idx) => (
                                        <a key={idx} href={link.url} className="w-10 h-10 bg-gray-800 hover:bg-cyan-500/20 border-2 border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-cyan-200 rounded-lg flex items-center justify-center transition-all duration-300 font-bold">
                                            {link.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-yellow-300 mb-3 flex items-center gap-2">
                                    ⏱️ Response Time
                                </h3>
                                <p className="text-gray-300 text-sm">
                                    We aim to respond to all inquiries within <span className="font-bold text-yellow-300">24-48 hours</span>. Thank you for your patience!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Contact