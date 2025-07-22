import React from 'react'
import './Contact.css'
import Navbar from './Navbar'
import { Helmet } from 'react-helmet'

const Contact = () => {
    return (
        <>
            <Navbar />
            <Helmet>
                <title>
                    Contact
                </title>
            </Helmet>
            <div className='contact-title'>Contact Us</div>
            <div className="contact-para">

                <p>Thank you for choosing Arcade Games as your gaming destination! We value your feedback, questions, and suggestions. Please don't hesitate to reach out to us using the contact information below:</p>

                <p className='ALL'>Customer Support</p>

                <p>For assistance with technical issues, account inquiries, or any other support-related matters, our dedicated customer support team is here to help. You can reach them via email at support@arcadegames.com or by filling out the contact form below.</p>

                <p className='ALL'>Feedback and Suggestions</p>

                <p>We're always eager to hear from our community members about how we can improve your gaming experience. Whether you have ideas for new features, suggestions for game additions, or general feedback, we'd love to hear from you! Send us an email at feedback@arcadegames.com.</p>

                <p className='ALL'>Partnerships and Business Inquiries</p>

                <p>Interested in collaborating with us or exploring partnership opportunities? For business inquiries, sponsorships, advertising, or media partnerships, please contact our business development team at partnerships@arcadegames.com.</p>

               <p className='ALL'> Social Media</p>

               <p> Stay connected with us on social media for the latest news, updates, and community events:</p>

               <p> Follow us on Twitter: [@arcadegames]
                Like us on Facebook: [Facebook.com/arcadegame]
                Office Address</p>

                <p>Arcade Games Headquarters
                Khalsa College Patial
                Patial, Punjab, 147000001
                India</p>

               <p className="ALL"> Contact Form</p>

                <p>0175-27840945</p>

               <p> Please allow up to 24-48 hours for a response from our team. We appreciate your patience and look forward to assisting you!</p>

                <p>Thank you for being a part of the Arcade Games community.</p>

                <p className="ALL">Sincerely,</p>

                <p>The Arcade Games Team</p>
            </div>
        </>
    )
}

export default Contact