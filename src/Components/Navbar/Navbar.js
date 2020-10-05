import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../images/logos/Group 1329.png'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { userSignOut } from '../FirebaseManager/FirebaseManager';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [userNameColor, setUserNameColor] = useState('#28a745')

    // if you click user name. the user will be signed out
    const handleSignOut = () => {
        userSignOut()
        .then(data => {
            setLoggedInUser(data)
        })
    }

    // for setting admin name color
    useEffect(() => {
        if(loggedInUser.admin){
            setUserNameColor('tomato')
        }
        else{
            setUserNameColor('#28a745')
        }
    }, [])
    return (
        <div className="d-flex justify-content-center">
            <nav className="navbar position-fixed navbar-expand-lg navbar-light bg-none container d-flex justify-content-between">
                <Link to="/"><img className="logo" src={logo} alt=""/></Link>
                <div className="d-flex align-items-center">
                    <Link to="/" className="navLink">Home</Link>
                    <Link to="/" className="navLink">Donation</Link>
                    <Link to="/events" className="navLink">Events</Link>
                    <Link to="/admin-page" className="navLink">Admin Page</Link>
                    {
                        loggedInUser.isSignedIn ? 
                        <div className="d-flex align-items-center">
                            <p style={{color: userNameColor}} onClick={handleSignOut} title="Click to Sign Out" className="m-0 mx-3 loggedInUserName">{loggedInUser.displayName}</p>
                            <img className="userImage" src={loggedInUser.photoURL} alt=""/>
                        </div> : 
                        <div>
                            <Link to="/login"><button className="btn btn-primary mx-2 px-3">Log in</button>
                            </Link> <Link to="/admin-login"><button className="btn btn-dark px-3">Admin</button></Link>
                        </div>
                    }
                </div>
            </nav>
        </div>
    );
};

export default Navbar;