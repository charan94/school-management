/**
 * @file SMColumn.js
 * @author K Sai Charan
*/

import React from 'react';

const SMColumn = (props) => {
    const { name, value } = props;
    return (
        <React.Fragment>
            <span className="p-column-title">{name}</span>
            {value}
        </React.Fragment>
    )
}

export default SMColumn;