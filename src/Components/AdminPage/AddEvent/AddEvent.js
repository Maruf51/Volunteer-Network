import React, { useEffect, useState } from 'react';
import './AddEvent.css';
import logo from '../../../images/logos/Group 1329.png'
import { Link, useHistory, useLocation } from 'react-router-dom';
import userLogo from '../../../images/logos/users-alt 1.png'
import plusLogo from '../../../images/logos/plus 1.png'
import { useForm } from "react-hook-form";

const AddEvent = () => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    // const [volunteersDetail, setVolunteersData] = useState([])
    // useEffect(() => {
    //     fetch(`http://localhost:5000/volunteer/admin`)
    //     .then(res => res.json())
    //     .then(data => setVolunteersData(data))
    // }, [])

    // for getting form detail and submit
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const newData = data
        if(data.image === ""){ // for sending default image to server
            data.image = "https://i.ibb.co/MVBgndy/extra-Volunteer.png"; //for default image
        }
        fetch('https://enigmatic-plateau-30666.herokuapp.com/addvolunteerdetail', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            history.replace(from);
        })
    };

    return (
        <div className="d-flex">
            <div className="adminLeftSide">
                <Link to='/'><img className="adminLogo" src={logo} alt=""/></Link>
                <Link className="volunteerRegisterListLink2" to='/admin-page'>
                    <div className="d-flex justify-content-left volunteerRegisterList align-items-center">
                        <img className="adminPageLogo" src={userLogo} alt=""/>
                        <p className="m-0">Volunteer register list</p>
                    </div>
                </Link>
                <Link className="volunteerAddLink2" to="/add-event">
                    <div className="d-flex justify-content-left volunteerAdd align-items-center">
                        <img className="adminPageLogo" src={plusLogo} alt=""/>
                        <p className="m-0">Add event</p>
                    </div>
                </Link>
            </div>
            <div className="adminRightSide">
                <h3 className="rightSideListText">Add event</h3>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="addEventForm" action="">
                        <div className="addEventFormDiv">
                            <label htmlFor="title">Event Title</label>
                            <input className="addEventInput" type="text" id="title" placeholder="Write a title name" required ref={register} name="name"/>
                        </div>
                        <div className="addEventFormDiv">
                            <label htmlFor="date">Event Date</label>
                            <input className="addEventInput" type="date" id="date" ref={register} name="date"/>
                        </div>
                        <div className="addEventFormDiv">
                            <label htmlFor="description">Description</label>
                            <input className="addEventInput" type="text" id="description" placeholder="Write a Description" ref={register} name="description"/>
                        </div>
                        <div className="addEventFormDiv">
                            <label htmlFor="image">Banner</label>
                            <input className="addEventInput" type="text" id="image" placeholder="Add an image link" ref={register} name="image"/>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3 px-3">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEvent;