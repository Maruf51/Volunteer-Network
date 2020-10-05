import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import './VolunteerRegister.css';
import logo from '../../images/logos/Group 1329.png'
import { UserContext } from '../../App';

const VolunteerRegister = () => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/events" } };

    const {id} = useParams()
    const [volunteerData, setVolunteerData] = useState({})
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [registerImage, setRegisterImage] = useState()
    
    // for registering new volunteer in database
    useEffect(() => {
        fetch(`https://enigmatic-plateau-30666.herokuapp.com/volunteer/${id}`)
        .then(res => res.json())
        .then(data => {
            setVolunteerData(data)
            setRegisterImage(data.image)
        })
    }, [])

    // for getting form detail and submit to database
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        // setRegisterData(data)
        let newData = data
        data.image = registerImage;
        fetch('https://enigmatic-plateau-30666.herokuapp.com/registervolunteer', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newData)
        })
        .then(res => res.json())
        .then(data => {
            history.replace(from);
        })
    };


    return (
        <div  className="register container text-center">
            <Link to='/'><img className="loginLogo" src={logo} alt=""/></Link>
            <form onSubmit={handleSubmit(onSubmit)} className="registerForm">
                <h3 className="registerText">Register as a Volunteer</h3>
                <input type="text" name="fullName" readOnly="readonly" value={loggedInUser.displayName} className="registerInput" placeholder="Full Name" ref={register} required/>
                <input type="text" name="email" readOnly="readonly" value={loggedInUser.email} className="registerInput" placeholder="Username or Email" ref={register} required/>
                <input type="date" name="date" defaultValue="" className="registerInput" placeholder="Date" ref={register} required/>
                <input type="text" name="description" defaultValue="" className="registerInput" placeholder="Description" ref={register} required/>
                <input type="text" name="volunteerTitle" readOnly="readonly" value={volunteerData.name} className="registerInput" placeholder="Volunteer Name" ref={register} required/>
                <button type="submit" className="btn btn-primary registerBtn">Register</button>
            </form>
        </div>
    );
};

export default VolunteerRegister;