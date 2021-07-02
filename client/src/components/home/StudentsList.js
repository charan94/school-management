/**
 * @file StudentsList.js
 * @author K Sai Charan
*/

import React from 'react';
import StudentsTable from './StudentsTable';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const StudentsList = (props) => {
    const { state } = props;
    const data = state?.students || [];
    return (
        <Row>
            <Col xs={12}>
                <h4>Students</h4>
            </Col>
            <Col xs={12}>
                <StudentsTable {...props} data={data} loading={state.studentsDataLoading} />
            </Col>
        </Row>
    );
}


export default StudentsList;