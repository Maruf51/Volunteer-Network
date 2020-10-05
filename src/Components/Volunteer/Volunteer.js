import React from 'react';
import { Link } from 'react-router-dom';
import './Volunteer.css'

const Volunteer = (props) => {
    const {name, image, _id} = props.volunteer;
    return (
        <Link to={'/register/' + _id} style={{margin: '15px 0'}}>
            <div style={{backgroundImage: `url(${image})`}} className="volunteerBlock d-flex justify-content-center">
                <h3 className="volunteerName px-2">{name}</h3>
            </div>
        </Link>
    );
};

export default Volunteer;