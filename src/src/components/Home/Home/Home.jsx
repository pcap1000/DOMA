import React, { useState, useEffect } from 'react';
import Footer from '../../Shared/Footer/Footer';
import Testimonial from '../Testimonial/Testimonial';
import ClinicAndSpecialities from '../ClinicAndSpecialities/ClinicAndSpecialities';
import BookDoctor from '../BookOurDoctor/BookDoctor';
import HeroSection from '../HeroSection/HeroSection';
import InfoPage from '../InfoPage/InfoPage';
import Header from '../../Shared/Header/Header';
import Service from '../Services/Service';
import ChatBotHome from "../../ChatBot/ChatBotHome";
import "./index.css"
import { Analytics } from "@vercel/analytics/react"
// Custom Hook to detect window size with throttling
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        let timeoutId = null;

        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }, 150); // Throttle resize events every 150ms
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
};

const Home = () => {
    const { width } = useWindowSize();
    const isMobile = width <= 768; // Define the breakpoint for mobile devices

    return (
        <>
            <Header />
            <HeroSection />
            <Analytics />
            <InfoPage />
            <Service />
            <ClinicAndSpecialities />
            {!isMobile && <BookDoctor />} {/* Conditionally render based on device type */}
            {!isMobile && <Testimonial />} {/* Conditionally render based on device type */}
            <ChatBotHome />
            <Footer />
        </>
    );
};

export default Home;

/* Additional CSS for hiding elements on small screens */
