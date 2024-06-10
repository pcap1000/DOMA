import React from 'react';
import img from '../../../images/avatar.jpg'; 
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useGetDoctorPatientsQuery } from '../../../redux/api/appointmentApi';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { Empty } from 'antd';

const MyPatients = () => {
    const getInitPatientName = (item) => {
        const fullName = `${item?.firstName ?? ''} ${item?.lastName ?? ''}`;
        return fullName.trim() || "Private Patient";
    }

    const { data, isLoading, isError } = useGetDoctorPatientsQuery();
    let content = null;

    if (!isLoading && isError) {
        content = <div>Something Went Wrong!</div>;
    } else if (!isLoading && !isError && data?.length === 0) {
        content = <Empty />;
    } else if (!isLoading && !isError && data?.length > 0) {
        content = (
            <>
                {data.map((item) => (
                    <div className="w-100 mb-3 rounded p-3 text-center patient-card" key={item.id} style={{ background: '#f8f9fa' }}>
                        <div className="">
                            <Link to={'/'} className="my-3 patient-img">
                            <img src={item?.patient?.img ? item?.patient?.img : img} alt="" />
                            </Link>
                            <div className="patients-info mt-4">
                                <h5>{getInitPatientName(item)}</h5>
                                <div className="info">
                                    <p><FaClock className='icon' /> {moment(item?.appointmentTime).format("MMM Do YY")}</p>
                                    <p><FaLocationArrow className='icon' /> {item?.address || 'No Address Provided'}</p>
                                    <p><FaEnvelope className='icon' /> {item?.email || 'No Email Provided'}</p>
                                    <p><FaPhoneAlt className='icon' /> {item?.mobile || 'No Phone Number Provided'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    }

    return (
        <DashboardLayout>
            <div className="row">
                <div className="col-md-6 col-lg-4 col-xl-3">
                    {content}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default MyPatients;


// export default MyPatients

// import React from 'react';
// import img from '../../../images/avatar.jpg';
// import DashboardLayout from '../DashboardLayout/DashboardLayout';
// import { useGetPatientsQuery } from '../../../redux/api/patientApi'; // Importing useGetPatientsQuery
// import moment from 'moment';
// import { Link } from 'react-router-dom';
// import { FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
// import { Empty } from 'antd';

// const MyPatients = () => {
//     const { data, isLoading, isError } = useGetPatientsQuery(); // Using useGetPatientsQuery to fetch all patients

//     const getPatientFullName = (patient) => {
//         const fullName = `${patient?.firstName ?? ''} ${patient?.lastName ?? ''}`;
//         return fullName.trim() || "Private Patient";
//     };

//     let content = null;
//     if (!isLoading && isError) content = <div>Something Went Wrong !</div>;
//     if (!isLoading && !isError && data?.length === 0) content = <Empty />;
//     if (!isLoading && !isError && data?.length > 0) {
//         content = data.map((patient) => (
//             <div className="w-100 mb-3 rounded p-3 text-center" style={{ background: '#f8f9fa' }} key={patient.id}>
//                 <div className="">
//                     <Link to={`/patients/${patient.id}`} className="my-3 patient-img">
//                         <img src={patient.img ? patient.img : img} alt="" />
//                     </Link>
//                     <div className="patients-info mt-4">
//                         <h5>{getPatientFullName(patient)}</h5>
//                         <div className="info">
//                             {/* Assuming appointmentTime, address, email, mobile are properties of patient */}
//                             <p><FaClock className='icon' /> {moment(patient.appointmentTime).format("MMM Do YY")}</p>
//                             <p><FaLocationArrow className='icon' /> {patient.address}</p>
//                             <p><FaEnvelope className='icon' /> {patient.email}</p>
//                             <p><FaPhoneAlt className='icon' /> {patient.mobile}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         ));
//     }

//     return (
//         <DashboardLayout>
//             <div className="row">
//                 <div className="col-md-6 col-lg-4 col-xl-3">
//                     {content}
//                 </div>
//             </div>
//         </DashboardLayout>
//     );
// };

// export default MyPatients;


// import React from 'react';
// import img from '../../../images/avatar.jpg';
// import DashboardLayout from '../DashboardLayout/DashboardLayout';
// import { useGetPatientsQuery } from '../../../redux/api/patientApi'; // Importing useGetPatientsQuery
// import moment from 'moment';
// import { Link } from 'react-router-dom';
// import { FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
// import { Empty } from 'antd';

// const MyPatients = () => {
//     const { data, isLoading, isError } = useGetPatientsQuery(); // Using useGetPatientsQuery to fetch all patients

//     const getPatientFullName = (patient) => {
//         const fullName = `${patient?.firstName ?? ''} ${patient?.lastName ?? ''}`;
//         return fullName.trim() || "Private Patient";
//     };

//     let content = null;
//     if (!isLoading && isError) content = <div>Something Went Wrong !</div>;
//     if (!isLoading && !isError && data?.length === 0) content = <Empty />;
//     if (!isLoading && !isError && data?.length > 0) {
//         content = (
//             <div className="d-flex flex-wrap">
//                 {data.map((patient) => (
//                     <div className="w-100 mb-3 rounded p-3 text-center" style={{ background: '#f8f9fa', flex: '0 0 33.33%' }} key={patient.id}>
//                         <div className="">
//                             <Link to={`/patients/${patient.id}`} className="my-3 patient-img">
//                                 <img src={patient.img ? patient.img : img} alt="" />
//                             </Link>
//                             <div className="patients-info mt-4">
//                                 <h5>{getPatientFullName(patient)}</h5>
//                                 <div className="info">
//                                     {/* Assuming appointmentTime, address, email, mobile are properties of patient */}
//                                     <p><FaClock className='icon' /> {moment(patient.appointmentTime).format("MMM Do YY")}</p>
//                                     <p><FaLocationArrow className='icon' /> {patient.address}</p>
//                                     <p><FaEnvelope className='icon' /> {patient.email}</p>
//                                     <p><FaPhoneAlt className='icon' /> {patient.mobile}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         );
//     }

//     return (
//         <DashboardLayout>
//             {content}
//         </DashboardLayout>
//     );
// };

// export default MyPatients;
