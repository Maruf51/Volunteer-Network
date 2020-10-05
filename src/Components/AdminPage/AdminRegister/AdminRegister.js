import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../../App';
import './AdminRegister.css';
import logo from '../../../images/logos/Group 1329.png'
import { adminEmailRegister, adminUpdateUser } from '../../FirebaseManager/FirebaseManager';

const AdminRegister = () => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/admin-login" } };
    const [signUpDetail, setSignUpDetail] = useState({})
    
    // for form post data
    const { register, handleSubmit } = useForm();
    const onSubmit = formData => {
        if(formData.password === formData.confirmPassword) {
            adminEmailRegister(formData.email, formData.password)
            .then(data => {
                console.log(data)
                setSignUpDetail(data)
                if(data.success){
                    console.log(data)
                    adminUpdateUser(formData.fullName)
                    alert('Admin Account Created successfully. Please login to continue...')
                    history.replace(from);
                }
            })
        }
        else{
            alert('Password and Confirm Password did not match. try again!')
        }
    };

    


    return (
        <div  className="register container text-center">
            <Link to='/'><img className="loginLogo" src={logo} alt=""/></Link>
            <form onSubmit={handleSubmit(onSubmit)} className="registerForm adminRegisterForm">
                <h3 className="registerText">Register as a Admin</h3>
                <input type="text" name="fullName" className="registerInput" placeholder="Full Name" ref={register} required/>
                <input type="text" name="email" className="registerInput" placeholder="Email Address" ref={register} required/>
                <input type="password" name="password" className="registerInput" placeholder="Password" ref={register} required/>
                <input type="password" name="confirmPassword" className="registerInput" placeholder="Confirm Password" ref={register} required/>
                {
                    signUpDetail.success ? <p className="font-14 text-success">Admin Account created successfully. Please <Link to='/admin-login'>Log in</Link></p> : <p className="font-14 text-danger">{signUpDetail.error}</p>
                }
                <button type="submit" className="btn btn-primary registerBtn">Register</button>
                <p className="mt-3 dontHaveAccount">Already have an account? <Link to="/admin-login">Admin Login here!</Link></p>
            </form>
        </div>
    );
};

export default AdminRegister;