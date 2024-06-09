import React, { useEffect, useState } from 'react';
import img from '../../../images/avatar.jpg';
import { useGetAppointmentsByDoctorIdQuery } from '../../../redux/api/appointmentApi';
import moment from 'moment';
import CustomTable from '../../UI/component/CustomTable';
import { Tabs, Input } from 'antd';
import AdminLayout from '../AdminLayout/AdminLayout';
// import userImg from '../../../images/avatar.jpg';
import './Dashboard.css'; // Ensure you import your CSS file

const DashboardPage = () => {
    const [sortBy, setSortBy] = useState("upcoming");
    const [doctorId, setDoctorId] = useState("");
    const { data, refetch, isLoading } = useGetAppointmentsByDoctorIdQuery(doctorId, { skip: !doctorId });

    const handleOnselect = (value) => {
        setSortBy(value === '1' ? 'upcoming' : value === '2' ? 'today' : sortBy);
        refetch();
    };

    useEffect(() => {
        console.log('Fetched data:', data);
    }, [data]);

    const upcomingColumns = [
        {
            title: 'Patient Name',
            key: '1',
            width: 100,
            render: function (data) {
                const fullName = `${data?.patient?.firstName ?? ''} ${data?.patient?.lastName ?? ''}`;
                const patientName = fullName.trim() || "Un Patient";
                const imgdata = data?.patient?.img ? data?.patient?.img : img;
                return (
                    <div className="table-avatar">
                        <a className="avatar avatar-sm mr-2 d-flex gap-2">
                            <img className="avatar-img rounded-circle" src={imgdata} alt="" />
                            <div>
                                <p className='p-0 m-0 text-nowrap'>
                                    {patientName}
                                </p>
                                <p className='p-0 m-0'>{data?.patient?.designation}</p>
                            </div>
                        </a>
                    </div>
                );
            }
        },
        {
            title: 'Doctor Name',
            key: '1',
            width: 100,
            render: function (data) {
                const fullName = `${data?.doctor?.firstName ?? ''} ${data?.doctor?.lastName ?? ''}`;
                const doctorName = fullName.trim() || "Un Doctor";
                const imgdata = data?.doctor?.img ? data?.doctor?.img : img;
                return (
                    <div className="table-avatar">
                        <a className="avatar avatar-sm mr-2 d-flex gap-2">
                            <img className="avatar-img rounded-circle" src={imgdata} alt="" />
                            <div>
                                <p className='p-0 m-0 text-nowrap'>
                                    {doctorName}
                                </p>
                                <p className='p-0 m-0'>{data?.doctor?.designation}</p>
                            </div>
                        </a>
                    </div>
                );
            }
        },
        {
            title: 'App Date',
            key: '2',
            width: 100,
            render: function (data) {
                return (
                    <div>{moment(data?.scheduleDate).format("LL")} <span className="d-block text-info">{data?.scheduleTime}</span></div>
                );
            }
        },
    ];

    const items = [
        {
            key: '1',
            label: 'Upcoming',
            children: (
                <CustomTable
                    loading={isLoading}
                    columns={upcomingColumns}
                    dataSource={data}
                    showPagination={true}
                    pageSize={10}
                    showSizeChanger={true}
                />
            ),
        },
    ];

    return (
        <AdminLayout>
            <div className="dashboard-page-container">
                <Input
                    placeholder="Enter Doctor ID"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <Tabs defaultActiveKey="1" items={items} onChange={handleOnselect} />
                {/* <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                    {JSON.stringify(data, null, 2)}
                </pre> */}
            </div>
        </AdminLayout>
    );
};

export default DashboardPage;
