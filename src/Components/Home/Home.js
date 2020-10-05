import React, { useEffect, useState } from 'react';
import Volunteer from '../Volunteer/Volunteer';
import Navbar from '../Navbar/Navbar';
import './Home.css';

const Home = () => {
    const [volunteers, setVolunteers] = useState([])
    // for getting all 20 or many volunteer in home page
    useEffect(() => {
        fetch('https://enigmatic-plateau-30666.herokuapp.com/volunteer')
        .then(res => res.json())
        .then(data => setVolunteers(data))
    })

    return (
        <div className="home">
            <Navbar></Navbar>
            <div className="container text-center header">
                <h1 className="headerText">I grow by helping people in need</h1>
                <div className="d-flex align-items-center justify-content-center my-4">
                    <input className="searchInput" type="text" placeholder="Search..."/>
                    <div className="btn btn-primary searchBtn">Search</div>
                </div>
                <p className="font-14 text-danger">Please wait some time for the image to load.</p>
                <div className="d-flex justify-content-between flex-wrap align-items-end">
                    {
                        volunteers.map(volunteer => <Volunteer key={volunteer._id} volunteer={volunteer}></Volunteer>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;