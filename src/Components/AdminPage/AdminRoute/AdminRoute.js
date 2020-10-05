import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../../App';

const AdminRoute = ({children, ...rest}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.admin ? (
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/admin-login",
                    state: { from: location }
                    }}
                />
                )
            }
        />
    );
};

export default AdminRoute;