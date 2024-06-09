import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { Tag, message } from 'antd';
import './index.css';
import { FaLocationArrow, FaRegThumbsUp, FaComment } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import { truncate } from '../../../utils/truncate';
import { useGetDoctorReviewsQuery } from '../../../redux/api/reviewsApi';

const SearchContent = ({ data }) => {
    const { authChecked } = useAuthCheck();
    const navigate = useNavigate();
    const [reviewCount, setReviewCount] = useState(0);
    const [positivePercentage, setPositivePercentage] = useState(0);
    const { data: reviewsData, isError: reviewsError, isLoading: reviewsLoading } = useGetDoctorReviewsQuery(data?.id);

    useEffect(() => {
        if (reviewsData) {
            const totalReviews = reviewsData.length;
            const positiveReviews = reviewsData.filter(review => review?.isRecommended);
            const positivePercentage = totalReviews === 0 ? 100 : Math.round((positiveReviews.length / totalReviews) * 100);
            setReviewCount(totalReviews);
            setPositivePercentage(positivePercentage);
        }
    }, [reviewsData]);

    const handleBookAppointment = () => {
        if (!authChecked) {
            message.error("User is not Found, Please Login!");
            navigate('/login');
        } else {
            navigate(`/booking/${data?.id}`);
        }
    };

    const services = data?.services?.split(',');

    // Calculate the number of stars based on positive percentage
    const stars = Math.ceil((positivePercentage / 100) * 5);

    return (
        <div className="mb-4 rounded" style={{ background: '#f3f3f3' }}>
            <div className='d-flex flex-column flex-md-row p-3 justify-content-between'>
                <div className='d-flex gap-3'>
                    <div className='doc-img-fluid d-flex align-items-center'>
                        {data?.img && <img src={data?.img} className="" alt="User Image" />}
                    </div>
                    <div className="doc-info">
                        <h5 className='mb-0'><Link to={`/doctors/profile/${data?.id}`}>Dr. {data?.firstName + ' ' + data?.lastName}</Link></h5>
                        <p className='m-0 form-text'>{data?.designation}</p>

                        <div className='d-flex align-items-center'>
                            <div>
                                <StarRatings
                                    rating={stars} // Dynamic rating based on positive percentage
                                    starRatedColor="#f4c150"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="15px"
                                    starSpacing="2px"
                                />
                            </div>
                            <div>({reviewCount} Reviews)</div>
                        </div>

                        <div className="clinic-details">
                            <p className="form-text text-secondary"><FaLocationArrow /><b>Location :</b><br /> {data?.address}, {data?.country}</p>
                        </div>
                        {services?.map((item, id) => (
                            <Tag key={id + 51}>{item}</Tag>
                        ))}
                    </div>
                </div>
                <div className="doc-info-right me-3 mt-3 mt-md-0">
                    <div className="clini-infos">
                        <ul>
                            <li><FaRegThumbsUp /> {positivePercentage}%</li>
                            <li><FaComment /> {reviewCount} Feedback</li>
                            <li><FontAwesomeIcon icon={faRupeeSign} /> {data?.price ? truncate(data?.price, 4) : 60} (Per Hour)</li>
                        </ul>
                    </div>
                    <div className="clinic-booking">
                        <Link to={`/doctors/profile/${data?.id}`} className="view-pro-btn">View Profile</Link>
                        <button onClick={handleBookAppointment} className="apt-btn">Book Appointment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchContent;
