/**
 * @file AddCourseModal.js
 * @author K Sai Charan
*/

import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import Col from 'react-bootstrap/Col';
import { AutoComplete } from 'primereact/autocomplete';
import Button from 'react-bootstrap/Button';

const AddCourseModal = (props) => {

    const { showCourseDialog, onHide, state, searchCourses, updateStudent, data } = props;

    const [selectedCourses, setSelectedCourses] = useState([]);

    const updateSelectedList = (event) => {
        setSelectedCourses(event?.value || []);
    }

    const handleSubmit = () => {
        const request = selectedCourses.map(r => ({ courseUUID: r.courseUUID }));
        updateStudent(request, data?.studentUUID);
        setSelectedCourses([]);
        onHide();
    }

    const footer = () => {
        return (
            <div className="form-row">
                <Col xs={12}>
                    <Button variant="primary" onClick={handleSubmit} disabled={!selectedCourses.length}>Submit</Button>
                </Col>
            </div>
        )
    }

    return (
        <Dialog header="Add Course" visible={showCourseDialog} footer={footer} style={{ width: '50vw' }} onHide={onHide} >
            <div className="form-row">
                <Col xs={12}>
                    <label htmlFor="course-select">Select Courses</label>
                    <AutoComplete
                        value={selectedCourses}
                        suggestions={state.courses?.records || [{ name: 'Loading...' }]}
                        completeMethod={searchCourses}
                        field="name"
                        multiple
                        delay={300}
                        onChange={updateSelectedList}
                        id="course-select"
                        className="px-2"
                        appendTo={document.body}
                        autoFocus={true}
                    />
                </Col>
            </div>
        </Dialog>

    )
}

export default AddCourseModal;