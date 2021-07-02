/**
 * @file SMLoader.js
 * @author K Sai Charan
*/

import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const SMLoader = () => {

    return (
        <div className="container">
            <Spinner animation="border" role="status">
                <span className="sr-only"></span>
            </Spinner>
        </div>
    );
}

export default SMLoader;