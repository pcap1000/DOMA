import { useEffect, useState } from 'react';
import './index.css';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../../images/logo.png';
import avatar from '../../../images/avatar.jpg';
import { Button, message } from 'antd';
import { loggedOut } from '../../../service/auth.service';
import HeaderNav from './HeaderNav';

const Header = () => {
    const navigate = useNavigate();
    const { authChecked, data } = useAuthCheck();
    const [isLoggedIn, setIsLogged] = useState(false);
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            setShow(false);
        } else {
            setShow(true);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => { authChecked && setIsLogged(true) }, [authChecked]);

    const hanldeSignOut = () => {
        loggedOut();
        message.success("Successfully Logged Out")
        setIsLogged(false)
        navigate('/')
    }

    const content = (
        <div className='nav-popover'>
            <div className='my-2'>
                <h5 className='text-capitalize'>{data?.firstName + ' ' + data?.lastName}</h5>
                <p className='my-0'>{data?.email}</p>
                <Link to="/dashboard">Dashboard</Link>
            </div>
            <Button variant="outline-danger" className='w-100' size="sm" onClick={hanldeSignOut}>
                Log Out
            </Button>
        </div>
    );

    return (
        <>
            <header id="header" className={`fixed-top ${!show && "stickyHeader"}`}>
                <div className="container d-flex align-items-center">
                    <Link to={'/'} className="logo me-auto">
                        <img src={img} alt="" className="img-fluid" />
                    </Link>
                    <HeaderNav isLoggedIn={isLoggedIn} data={data} avatar={avatar} content={content} open={open} setOpen={setOpen} />
                    {!isLoggedIn && (
                        <Link to={'/login'} className="appointment-btn scrollto">
                            <span className="d-none d-md-inline"></span>Login/Signup
                        </Link>
                    )}
                </div>
            </header>
        </>
    )
}

export default Header;
