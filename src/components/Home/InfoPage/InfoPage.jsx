import React from 'react';
import './InfoPage.css';
import { FaClock, FaHeadset,FaHouseUser  } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { Link } from 'react-router-dom';
const InfoPage = () => {
    return (
        <section className="why-us">
            <div className="container">
                        <div className="content">
                            <h3>Why Choose Us?</h3>
                            <p>
                            Choose Experience unparalleled convenience with Docmate. For just ₹100 per meeting, our platform allows you to book medical appointments effortlessly. With a user-friendly interface and an extensive network of healthcare providers, Docmate prioritizes your needs, ensuring a seamless experience that empowers you to prioritize your health with confidence.
                            </p>
                            <div className="text-center">
                                <Link to={'/about'} className="more-btn">Learn More</Link>
                            </div>
                        </div>
                    <div className="row">
                        <div className="icon-boxes">
                                <div className="col-2">
                                    <div className="icon-box">
                                        <FaHouseUser className="icon"/>
                                        <h4>Need an appointment?</h4>
                                        <p>Access healthcare at any time with our 24-hour appointment service, ensuring round-the-clock availability for booking appointments according to your schedule.</p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon-box">
                                        <FaHeadset className="icon"/>
                                        <h4>Emegency Cases</h4>
                                        <h6 className='text-secondary'>+1 518 531 6950</h6>
                                        <p>Our 24/7 customer care ensures support whenever you need it. Reach out anytime for assistance with bookings, inquiries, or concerns, providing peace of mind and reliable assistance around the clock</p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="icon-box">
                                        <GiReceiveMoney className="icon"/>
                                        <h4>Book at ₹100</h4>
                                        <p>Book medical appointments for just ₹100 each. Pay the remaining amount after meeting with the doctor. Enjoy a user-friendly experience with a wide network of healthcare providers, making your health a priority with ease.</p>
                                    </div>
                                </div>
                               
                            
                        </div>
                    </div>
            </div>
        </section>
    )
}

export default InfoPage