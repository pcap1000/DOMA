import React, { useState } from 'react';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from 'react-router-dom';
import log from '../../images/doc/info.svg';
import register from '../../images/doc/register.svg';
import SignIn from './SignIn';
import SignUp from './SignUp';
import logo from '../../images/logo.png'; // Import your logo image here
import './SignInForm.css';

const SignInForm = () => {
    const [isSignUp, setSignUp] = useState(false);
    return (
        <div className={`${isSignUp ? "signin-signup-container sign-up-mode" : "signin-signup-container"}`}>
            <img src={logo} alt="Logo" className="logo" /> {/* Add the logo here */}
            <Link to="/">
                <p className="pageCloseBtn"><span><AiOutlineArrowLeft /></span></p>
            </Link>
            <div className="forms-container">
                <div className="signIn-singUp">
                    <SignIn />
                    <SignUp setSignUp={setSignUp} />
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3 className='text text-lg-start'>New here ?</h3>
                        <p className='text'>Join the community to enhance your life and society!!</p>
                        <button className="iBtn transparent" style={{ backgroundColor:"#3b74d1" ,color:"white"}} onClick={() => setSignUp(true)}>Sign Up</button>
                    </div>
                    {/* <img src={`${log}`} alt="" className="pImg" /> */}
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3 className='text'>Already a member?</h3>
                        <p className='text'>Versatile platform for doctors and patient to connect and communicate for the betterment!!</p>
                        <button className="iBtn transparent" style={{backgroundColor:"#3b74d1" ,color:"white"}} onClick={() => setSignUp(false)}>Sign In</button>
                    </div>
                    {/* <img src={`${register}`} alt="" className="pImg" /> */}
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
