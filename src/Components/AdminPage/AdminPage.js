import React, { useEffect, useState } from 'react';
import './AdminPage.css';
import logo from '../../images/logos/Group 1329.png'
import { Link } from 'react-router-dom';
import userLogo from '../../images/logos/users-alt 1.png'
import plusLogo from '../../images/logos/plus 1.png'
import AdminPageData from './AdminPageData/AdminPageData';

const AdminPage = () => {
    //for getting all registered volunteer from database for admin
    const [volunteersDetail, setVolunteersData] = useState([])
    useEffect(() => {
        fetch(`https://enigmatic-plateau-30666.herokuapp.com/`)
        .then(res => res.json())
        .then(data => setVolunteersData(data))
    }, [])
    return (
        <div className="d-flex">
            <div className="adminLeftSide">
                <Link to='/'><img className="adminLogo" src={logo} alt=""/></Link>
                <Link className="volunteerRegisterListLink" to='/admin-page'>
                    <div className="d-flex justify-content-left volunteerRegisterList align-items-center">
                        <img className="adminPageLogo" src={userLogo} alt=""/>
                        <p className="m-0">Volunteer register list</p>
                    </div>
                </Link>
                <Link className="volunteerAddLink" to="/add-event">
                    <div className="d-flex justify-content-left volunteerAdd align-items-center">
                        <img className="adminPageLogo" src={plusLogo} alt=""/>
                        <p className="m-0">Add event</p>
                    </div>
                </Link>
            </div>
            <div className="adminRightSide">
                <h3 className="rightSideListText">Volunteer register list</h3>
                <div className="adminListSection">
                    <table>
                        <thead>
                            <tr>
                                <th style={{padding: '10px 10px 10px 20px', borderRadius: '10px 0 0 10px'}}>Name</th>
                                <th>Email ID</th>
                                <th>Registating Date</th>
                                <th>Volunteer List</th>
                                <th style={{borderRadius: '0 10px 10px 0'}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                volunteersDetail.map(volunteerDetail => <AdminPageData key={volunteerDetail._id} details={volunteerDetail}></AdminPageData>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;