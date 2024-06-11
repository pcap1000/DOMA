import React, { useState, useEffect } from 'react';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import './index.css';
import { Input, message } from 'antd';
import { useTrackAppointmentMutation } from '../../redux/api/appointmentApi';
import TrackDetailPage from './TrackDetailPage';
import AvailableServiceContent from '../Home/AvailableFeatures/AvailableServiceContent';

const { Search } = Input;

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

const TrackAppointment = () => {
    const [trackAppointment, { data, isSuccess, isLoading, isError, error }] = useTrackAppointmentMutation();
    const [showInfo, setShowInfo] = useState(false);
    const { width } = useWindowSize();
    const isMobile = width <= 768; // Define the breakpoint for mobile devices

    const onSearch = (value) => {
        if (value.length > 5) {
            trackAppointment({ id: value });
        }
    };

    useEffect(() => {
        if (isSuccess && !isError && data?.id) {
            message.success("Successfully Got Information!");
            setShowInfo(!showInfo);
        }
        if (isError) {
            message.error(error?.data?.message);
        }
        if (isSuccess && data?.id === undefined) {
            message.error("No Data is Available!");
        }
    }, [isSuccess, isError, error, data]);

    // What to render
    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong!</div>;
    if (!isLoading && !isError && data?.id) content = <TrackDetailPage data={data} setShowInfo={setShowInfo} />;

    return (
        <>
            <Header />
            <div style={{ minHeight: '100vh' }}>
                {
                    showInfo ? content
                        :
                        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '10rem' }}>
                            <div>
                                <div className='mb-5 section-title text-center'>
                                    <h2>Track Your Appointment</h2>
                                    <p className='m-0'>Track your appointment by entering your Tracking ID below.</p>
                                </div>
                                <div className='mx-auto d-flex justify-content-center'>
                                    <Search
                                        placeholder="Track Your Appointment..."
                                        allowClear
                                        enterButton="Track"
                                        onSearch={onSearch}
                                        style={{ width: 400 }}
                                        size='large'
                                    />
                                </div>

                                {!isMobile && (
                                    <section className="container" style={{ marginBottom: '8rem', marginTop: '5rem' }}>
                                        <div className="flex" style={{ maxWidth: '900px' }}>
                                            <div className='mb-4 section-title text-center'>
                                                <h5 className='text-uppercase'>Available Service</h5>
                                            </div>
                                            <AvailableServiceContent />
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                }
            </div>
            <Footer />
        </>
    );
};

export default TrackAppointment;
