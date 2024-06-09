import React, { useState, useEffect } from 'react';
import './Reviews.css';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import img from '../../../images/avatar.jpg';
import { useGetDoctorReviewsQuery } from '../../../redux/api/reviewsApi';
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import moment from 'moment';
import StarRatings from 'react-star-ratings';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import { Empty } from 'antd';

const Reviews = () => {
    const { data: loginInfo } = useAuthCheck();
    const { data, isError, isLoading } = useGetDoctorReviewsQuery(loginInfo?.id);
    const [positivePercentage, setPositivePercentage] = useState(0);

    useEffect(() => {
        if (data && data.length > 0) {
            const positiveComments = data.filter(item => item?.isRecommended);
            const percentage = (positiveComments.length / data.length) * 100;
            setPositivePercentage(percentage.toFixed(2)); // Limiting to 2 decimal places
        }
    }, [data]);

    let content = null;

    if (!isLoading && isError) content = <div>Something Went Wrong!</div>;
    if (!isLoading && !isError && data?.length === 0) content = <Empty />;
    if (!isLoading && !isError && data?.length > 0) content =
        <>
            {
                data.map((item, key) => (
                    <div className='mb-4' key={item?.id + key}>
                        <div className='d-flex gap-3 justify-content-between'>
                            <div className='d-flex gap-4'>
                                <div className='review-img'>
                                    <img className="" alt="" src={item?.patient?.img ? item?.patient?.img : img} />
                                </div>
                                <div>
                                    <h5 className="text-nowrap text-capitalize">{item?.patient?.firstName + ' ' + item?.patient?.lastName}</h5>
                                    <p className={item?.isRecommended ? "text-success" : "text-danger"}>
                                        {
                                            item?.isRecommended 
                                                ? <><FaRegThumbsUp /> I recommend the doctor</>
                                                : <><FaRegThumbsDown /> I do not recommend the doctor</>
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className='text-end'>
                                <div>
                                    {item?.isRecommended && (
                                        <StarRatings
                                            rating={5}
                                            starRatedColor="#f4c150"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="15px"
                                            starSpacing="2px"
                                        />
                                    )}
                                </div>
                                <div className="">Reviewed {moment(item?.createdAt).startOf('day').fromNow()}</div>
                            </div>
                        </div>
                        <div>
                            <p className="mx-2 form-text">{item?.description}</p>
                        </div>
                    </div>
                ))
            }
        </>;

    return (
        <DashboardLayout>
            <div className="w-100 mb-3 rounded py-3 px-2" style={{ background: '#f8f9fa' }}>
                {content}
                <div>
                    {positivePercentage && (
                        <p>Percentage of Positive Comments: {positivePercentage}%</p>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Reviews;
