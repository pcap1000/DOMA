import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDoctorQuery } from '../../../redux/api/doctorApi';
import { FaBriefcase } from "react-icons/fa";

const Location = () => {
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

    const { firstName, lastName, designation, specialization, address, availability, college, biography } = doctorData;

    return (
        <div className="col-md-12 col-lg-9">
            <div className='mb-3'>
                <h5 className='overview-text'>Clinic Address:</h5>
                <p className='col-md-4'>
                    {` ${address}`} 
                </p>
            </div>
        </div>
    );
};

export default Location;


