import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDoctorQuery } from '../../../redux/api/doctorApi';
import { FaBriefcase } from "react-icons/fa";

const OverView = () => {
    const { id } = useParams(); // Extracting the ID from the URL
    const { data: doctorData, isError, isLoading } = useGetDoctorQuery(id);
    
    useEffect(() => {
        // Fetch doctor data
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching data.</div>;
    }

    const { firstName, lastName, designation, specialization, address, college, price, biography } = doctorData;

    return (
        <div className="col-md-12 col-lg-9">
            <div className='mb-3'>
                <h5 className='overview-text'>About Me</h5>
                <p className='text-secondary'>
                    {` ${biography}`}
                </p>
                <h5 className='overview-text'>Specialization:</h5>
                <p className='col-md-4'>
                    {` ${specialization}`} 
                </p>
                <h5 className='overview-text'>Designation:</h5>
                <p className='col-md-4'>
                    {` ${designation}`} 
                </p>
                <h5 className='overview-text'>College:</h5>
                <p className='col-md-4'>
                    {` ${college}`} 
                </p>
            </div>
        </div>
    );
};

export default OverView;