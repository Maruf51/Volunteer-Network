import React, { useState } from 'react';
import './Event.css'

const Event = (props) => {
    const {fullName, email, _id, date, description, volunteerTitle, image} = props.data;
    const [deleteItem, setDeleteItem] = useState('flex')
    // for delete any object from database
    const handleDeleteVolunteer = () => {
        fetch(`https://enigmatic-plateau-30666.herokuapp.com/volunteerdelete/${_id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                setDeleteItem('none')
            }
        })
    }
    return (
        <div style={{display: deleteItem}} className="justify-content-left event-block">
            <img className="eventImage mr-3" src={image} alt=""/>
            <div className="volunteerTitleDate">
                <h3 className="volunteerTitle mt-1">{volunteerTitle}</h3>
                <h3 className="volunteerDate mt-3">{date}</h3>
                <button onClick={handleDeleteVolunteer} className="btn btn-secondary cancel-button">Cancel</button>
            </div>
        </div>
    );
};

export default Event;