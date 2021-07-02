/**
 * @file SMContainer.js
 * @author K Sai Charan
*/

import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getAuthState } from '../../reducer/auth.reducer';

const SMContainer = (props) => {
    const { Component, path, routes } = props;
    const authState = useSelector(getAuthState);

    const getComponent = () => {
        return (<Route path={path} exact render={(props) => {
            if (authState.isAuthenticated) {
                return <Component {...props} routes={routes} />;
            }
            return <Redirect to={{ pathname: '/login' }} />
        }} />);
    }

    return getComponent();
}

export default SMContainer;