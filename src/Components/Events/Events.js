import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Event from '../Event/Event';
import Navbar from '../Navbar/Navbar';
import './Events.css'
import emptyRecycleBin from '../../images/empty (1).jpg'

const Events = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [volunteerData, setVolunteerData] = useState([])
    // for getting the data of logged user
    useEffect(() => {
        fetch(`https://enigmatic-plateau-30666.herokuapp.com/getuservolunteer/?email=${loggedInUser.email}`)
        .then(response => response.json())
        .then(data => setVolunteerData(data))
    }, [])
    return (
        <div>
            <Navbar></Navbar>
            {
                volunteerData.length > 0 ? <div className="eventsArea container d-flex flex-wrap justify-content-center">
                    {
                        volunteerData.map(volunteer => <Event key={volunteer._id} data={volunteer}></Event>)
                    }
                </div> : <div className="emptyEvent"><img src={emptyRecycleBin} alt=""/><h1>Your Event Section is empty.</h1><h1>Please Register any Volunteer</h1></div>
            }
        </div>
    );
};

export default Events;