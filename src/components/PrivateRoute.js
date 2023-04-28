// import react.
import React from 'react';
// import react router.
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            localStorage.getItem('auth') ?
                <Component {...props} />
            : <Navigate to="/login" />
        )} />
    );
};

export default PrivateRoute;