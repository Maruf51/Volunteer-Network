import React, { useContext } from 'react';
import './Login.css'
import logo from '../../images/logos/Group 1329.png';
import googleLogo from '../../images/logos/google.png'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App'
import { googleSignIn, initializeLoginFrameworkFirebase } from '../FirebaseManager/FirebaseManager';

    initializeLoginFrameworkFirebase()

const Login = () => {
    let location = useLocation();
    let history = useHistory();
    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    
    
    // for logging in simple user
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(data => {
            setLoggedInUser(data);
            if(data.isSignedIn === true){
                history.replace(from);
            }
        })
    }
    
    return (
        <div className="text-center loginPage">
            <Link to='/'><img className="loginLogo" src={logo} alt=""/></Link>
            <div className="loginArea d-flex align-items-center">
                <div className="m-auto">
                    <h3 className="loginWithText">Login with</h3>
                    <div className="loginGoogle" onClick={handleGoogleSignIn}>
                        <img className="googleLogo" src={googleLogo} alt=""/>
                        <p className="googleText">Continue with Google</p>
                    </div>
                    <p className="createAccountText">Don't have an account? <Link to="/login">Create an account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;