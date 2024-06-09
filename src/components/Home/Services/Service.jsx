import React from 'react';
import './index.css';
import img from '../../../images/doc/FOUR.jpg'
import img2 from '../../../images/doc/FIVE.jpg'
import img3 from '../../../images/doc/THREE.jpg'
import { Link } from 'react-router-dom';

const Service = () => {
    return (
        <section className="container" style={{ marginTop: 50, marginBottom: 50 }}>
            <div className='mb-5 section-title text-center'>
                <h2>Services</h2>
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4 col-sm-6">
                        <div className="service-img">
                            <img src={img} alt="" className="img-fluid" />
                            <img src={img2} alt="" className="img-fluid mt-4" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="service-img mt-4 mt-lg-0">
                            <img src={img3} alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="service-content ps-4 mt-4 mt-lg-0">
                            <h2>Personal care <br />healthy living</h2>
                            <p className="mt-4 mb-5 text-secondary form-text">We prioritize personal care and promote healthy living, offering tailored services and resources to support your well-being and enhance your quality of life.</p>
                            <Link to={'/'} className="btn-get-started scrollto">Services</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Service