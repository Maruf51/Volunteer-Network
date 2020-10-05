import React, { useState } from 'react';
import deleteIcon from '../../../images/logos/trash-2 9.png'

const AdminPageData = (props) => {
    const {fullName, email, date, description, volunteerTitle, image, _id} = props.details;
    const [deleteItem, setDeleteItem] = useState('table-row')
    // for delete any volunteer register admin want
    const handleDeleteVolunteer = () => {
        fetch(`https://enigmatic-plateau-30666.herokuapp.com/admin/volunteerdelete/${_id}`, {
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
        <tr style={{display: deleteItem}}>
            <td>{fullName}</td>
            <td>{email}</td>
            <td>{date}</td>
            <td>{volunteerTitle}</td>
            <td><img onClick={handleDeleteVolunteer} className="deleteIcon" src={deleteIcon} alt="Delete"/></td>
        </tr>
    );
};

export default AdminPageData;