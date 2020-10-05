import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../../App';
import './AdminLogin.css';
import logo from '../../../images/logos/Group 1329.png'
import { adminEmailLogin } from '../../FirebaseManager/FirebaseManager';

const AdminRegister = () => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    
    
    // for submitting form and login as admin
    const { register, handleSubmit } = useForm();
    const onSubmit = formData => {
        adminEmailLogin(formData.email, formData.password)
        .then(data => {
            setLoggedInUser(data)
            if(data.admin){
                history.replace(from);
            }
        })
    };


    return (
        <div  className="register container text-center">
            <Link to='/'><img className="loginLogo" src={logo} alt=""/></Link>
            <form onSubmit={handleSubmit(onSubmit)} className="registerForm adminLoginForm">
                <h3 className="registerText">Login as a Admin</h3>
                <input type="email" name="email" className="registerInput" placeholder="Email Address" ref={register} required/>
                <input type="password" name="password" className="registerInput" placeholder="Password" ref={register} required/>
                {
                    loggedInUser.success ? <p className="font-14 text-success">You logged in as an Admin.</p> : <p className="font-14 text-danger px-5">{loggedInUser.error}</p>
                }
                <button type="submit" className="btn btn-primary registerBtn">Admin Login</button>
                <p className="mt-3 dontHaveAccount">Don't have an account? <Link to="/admin-register">Register Admin here!</Link></p>
            </form>
        </div>
    );
};

export default AdminRegister;