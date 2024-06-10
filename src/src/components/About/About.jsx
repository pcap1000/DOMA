import React from 'react';
import './index.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import ImageHeading from '../../images/doc/doctor 5.jpg';
import SubHeader from '../Shared/SubHeader';

const About = () => {
    return (
        <>
            <Header />
            <SubHeader title="about us"/>
            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row p-5">
                    <div className="col-lg-4">
                        <div className='section-title text-center'>
                            <h2 className='text-uppercase'>Our Doctors Acheivement</h2>
                            <p className='form-text m-0'>A patient-Doctor relationship site</p>
                        </div> 
                        <p className='mt-3'>Docmate streamlines healthcare with its dual-functionality app. Patients effortlessly schedule appointments with preferred doctors while accessing medical records and receiving appointment reminders. The platform fosters secure doctor-patient communication through messaging features, enhancing care coordination and patient engagement. With Health Ease, accessing quality healthcare and maintaining meaningful doctor-patient relationships has never been easier or more convenient.</p>
                    </div>
                    <div className="col-lg-8">
                        <img src={ImageHeading} alt="" className="img-fluid rounded shadow" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;
