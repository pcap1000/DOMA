import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDoctorAppointmentsQuery } from '../../redux/api/appointmentApi';
import { useGetDoctorQuery } from '../../redux/api/doctorApi'; // Importing the doctorApi

import './DoctorAppointmentsPage.css';

const DoctorAppointmentsPage = () => {
    const { doctorId } = useParams();
    const { data: doctor } = useGetDoctorQuery(doctorId); // Fetching doctor data

    const { data: appointments, error, isLoading, refetch } = useGetDoctorAppointmentsQuery(
        { doctorId },
        { skip: !doctorId }
    );

    useEffect(() => {
        if (doctorId) {
            refetch({ doctorId });
        }
    }, [doctorId, refetch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <h1>Doctor: {doctor?.name}</h1> {/* Displaying doctor's name */}
                        <div className="table-responsive">
                            <table className="datatable table table-hover table-center mb-0">
                                <thead>
                                    <tr>
                                        <th>Doctor ID</th>
                                        <th>Speciality</th>
                                        <th>Patient Name</th>
                                        <th>Appointment Time</th>
                                        <th>Status</th>
                                        <th className="text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments && appointments.length > 0 && appointments.map(appointment => (
                                        <tr key={appointment.id}>
                                            <td>{appointment.doctorId ? appointment.doctorId : 'N/A'}</td>
                                            <td>{appointment.doctor?.specialization}</td>
                                            <td>
                                                <h2 className="table-avatar">
                                                    <a href="profile.html" className="avatar avatar-sm mr-2">
                                                        <img className="avatar-img rounded-circle" src={appointment.patient?.img} alt=""/>
                                                    </a>
                                                    <a href="profile.html">{appointment.patient?.firstName} {appointment.patient?.lastName}</a>
                                                </h2>
                                            </td>
                                            <td>{appointment.scheduleDate} <span className="text-primary d-block">{appointment.scheduleTime}</span></td>
                                            <td>
                                                <div className="status-toggle">
                                                    {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                                                </div>
                                            </td>
                                            <td className="text-right">
                                                ${appointment.amount}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorAppointmentsPage;


// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useGetDoctorAppointmentsQuery } from '../../redux/api/appointmentApi';
// import { useGetDoctorQuery } from '../../redux/api/doctorApi';

// import './DoctorAppointmentsPage.css';

// const DoctorAppointmentsPage = () => {
//     const { doctorId } = useParams();
//     const { data: doctor, error: doctorError, isLoading: doctorLoading } = useGetDoctorQuery(doctorId);

//     const { data: appointments, error: appointmentError, isLoading: appointmentLoading, refetch } = useGetDoctorAppointmentsQuery(
//         { doctorId },
//         { skip: !doctorId }
//     );

//     useEffect(() => {
//         if (doctorId) {
//             refetch({ doctorId });
//         }
//     }, [doctorId, refetch]);

//     if (doctorLoading || appointmentLoading) {
//         return <div>Loading...</div>;
//     }

//     if (doctorError || appointmentError) {
//         return <div>Error: {doctorError?.message || appointmentError?.message}</div>;
//     }

//     return (
//         <div className="row">
//             <div className="col-md-12">
//                 <div className="card">
//                     <div className="card-body">
//                         <h1>Doctor: {doctor?.name}</h1>
//                         <div className="table-responsive">
//                             <table className="datatable table table-hover table-center mb-0">
//                                 <thead>
//                                     <tr>
//                                         <th>Doctor ID</th>
//                                         <th>Speciality</th>
//                                         <th>Patient Name</th>
//                                         <th>Appointment Time</th>
//                                         <th>Status</th>
//                                         <th className="text-right">Amount</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {appointments && appointments.length > 0 && appointments.map(appointment => (
//                                         <tr key={appointment.id}>
//                                             <td>{appointment.doctorId ? appointment.doctorId : 'N/A'}</td>
//                                             <td>{appointment.doctor?.specialization}</td>
//                                             <td>
//                                                 <h2 className="table-avatar">
//                                                     <a href="profile.html" className="avatar avatar-sm mr-2">
//                                                         <img className="avatar-img rounded-circle" src={appointment.patient?.img} alt=""/>
//                                                     </a>
//                                                     <a href="profile.html">{appointment.patient?.firstName} {appointment.patient?.lastName}</a>
//                                                 </h2>
//                                             </td>
//                                             <td>{appointment.scheduleDate} <span className="text-primary d-block">{appointment.scheduleTime}</span></td>
//                                             <td>
//                                                 <div className="status-toggle">
//                                                     {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
//                                                 </div>
//                                             </td>
//                                             <td className="text-right">
//                                                 ${appointment.amount}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DoctorAppointmentsPage;
