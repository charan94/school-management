import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { getAuthState } from '../../reducer/auth.reducer';

const SMContainer = (props) => {
    const { Component, path, routes } = props;
    const authState = useSelector(getAuthState);

    const getComponent = () => {
        return (<Route path={path} exact render={(props) => {
            if (authState.isAuthenticated) {
                return <Component {...props} routes={routes} />;
            }
            window.location.href = `${process.env.REACT_APP_LOGIN_URL}#session-timeout`;
            return null;
        }} />);
    }

    return getComponent();
}

export default SMContainer;