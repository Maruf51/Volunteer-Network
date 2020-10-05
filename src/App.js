import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router,  Switch,  Route, Link } from "react-router-dom";
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import VolunteerRegister from './Components/VolunteerRegister/VolunteerRegister';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Events from './Components/Events/Events';
import AdminPage from './Components/AdminPage/AdminPage';
import AddEvent from './Components/AdminPage/AddEvent/AddEvent';
import AdminRegister from './Components/AdminPage/AdminRegister/AdminRegister';
import AdminLogin from './Components/AdminPage/AdminLogin/AdminLogin';
import AdminRoute from './Components/AdminPage/AdminRoute/AdminRoute';


export const UserContext = createContext()
function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <AdminRoute path="/admin-page">
            <AdminPage></AdminPage>
          </AdminRoute>
          <Route path="/add-event">
            <AddEvent></AddEvent>
          </Route>
          <Route path="/admin-register">
            <AdminRegister></AdminRegister>
          </Route>
          <Route path="/admin-login">
            <AdminLogin></AdminLogin>
          </Route>
          <PrivateRoute path="/events">
            <Events></Events>
          </PrivateRoute>
          <PrivateRoute path='/register/:id'>
            <VolunteerRegister></VolunteerRegister>
          </PrivateRoute>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
