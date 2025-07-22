import React from 'react'
import './About.css'
import Navbar from './Navbar'
import { Helmet } from 'react-helmet'

const About = () => {
    return (
        <>
            <Navbar />
            <Helmet>
                <title>
                    About
                </title>
            </Helmet>
            <div className='about-title'>Arcade Games</div>

            <div className="paragraph">
                <ul>
                <li>Welcome to Arcade Games, where gaming passion meets boundless imagination!</li>

                   <li> We are a vibrant community of gamers, united by our shared love for immersive worlds, thrilling challenges, and unforgettable adventures. Whether you're a seasoned veteran or just starting your journey into the realms of virtual excitement, you've found your digital home.</li>

                   <li> At Arcade Games, we believe in the power of gaming to inspire, connect, and entertain. Our platform is more than just a place to play; it's a sanctuary where friendships are forged, skills are honed, and dreams are realized.</li>

                    <li>From heart-pounding action to mind-bending puzzles, our extensive collection of games caters to every taste and preference. Dive into epic quests, conquer fierce opponents, or embark on whimsical escapades – the possibilities are endless, and the choice is yours.</li>

                   <li> But Arcade Games is more than just a gaming platform; it's a thriving community. Join forces with fellow players, share strategies, and celebrate victories together. Whether you're competing for glory or simply seeking camaraderie, you'll find your tribe here.</li>

                   <li> We are committed to providing an inclusive and welcoming environment for gamers of all backgrounds and identities. Respect, sportsmanship, and mutual support are the cornerstones of our community, ensuring that everyone feels valued and empowered to unleash their full gaming potential.</li>

                   <li> So, whether you're seeking thrills, camaraderie, or simply a momentary escape from reality, welcome to Arcade Games. Let the games begin!</li>





                    </ul>
            </div>
        </>
    )
}

export default About