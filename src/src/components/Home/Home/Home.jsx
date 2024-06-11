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

// Custom Hook to detect window size
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call handler once to set initial size

        return () => window.removeEventListener('resize', handleResize);
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
