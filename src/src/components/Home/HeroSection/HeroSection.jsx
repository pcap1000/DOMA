import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';


const HeroSection = () => {
    return (
        <div id="hero" >
            <div className="container">
                <div className='Wrapp'>
                    <h1>Book with Ease 
                        <br />Heal with Confidence</h1>
                    <p>Docmate offers seamless doctor-patient appointment booking, ensuring hassle-free scheduling for all medical needs. With our user-friendly platform, patients can easily find available slots, empowering them to take control of their health journey with confidence and convenience. </p>
                </div>
                <div className="d-flex justify-content-start gap-2">
                    <Link to={'/doctors'} className="btn-get-started scrollto">Get Started</Link>
                    <Link to={'/track-appointment'} className="btn-get-started scrollto">Track Appointment</Link>
                </div>
            </div>

            
        </div>
    )
}
export default HeroSection;