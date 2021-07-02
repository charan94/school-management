/**
 * @file index.js
 * @author K Sai Charan
*/

import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { loadCoursesAction, loadStudentsAction, loadStudentsByIdAction, updateStudentAction } from '../../actions/home.actions';
import { getHomeState } from '../../reducer/home.reducer';
import StudentsList from './StudentsList';

const Home = (props) => {

    const homeState = useSelector(getHomeState);
    const dispatch = useDispatch();

    const [studentPaginationProps, setStudentPaginationProps] = useState({
        limit: 10,
        skip: 0
    });

    const [expandedRows, setExpandedRows] = useState({});

    const onPage = (event) => {
        const paginationProps = {
            ...studentPaginationProps,
            skip: event?.first,
            limit: event?.rows
        }
        setStudentPaginationProps(paginationProps);
        dispatch(loadStudentsAction(paginationProps));
    }

    const onSort = (event) => {
        const paginationProps = {
            ...studentPaginationProps,
            sort: { [event.sortField]: event.sortOrder === 1 ? 'ASC' : 'DESC' },
            sortField: event.sortField,
            sortOrder: event.sortOrder
        }
        setStudentPaginationProps(paginationProps);
        dispatch(loadStudentsAction(paginationProps));
    }

    const onFilter = (event) => {
        const keys = Object.keys(event.filters);
        let filter = [];
        for (let i = 0; i < keys.length; i++) {
            filter.push({ "column": keys[i], "value": `${event.filters[keys[i]].value}` })
        }
        const paginationProps = {
            ...studentPaginationProps,
            filter
        }
        setStudentPaginationProps(paginationProps);
        dispatch(loadStudentsAction(paginationProps));
    }

    const onRowExpand = (event) => {
        setExpandedRows({});
        dispatch(loadStudentsByIdAction(event?.data?.studentUUID));
    }

    const onRowCollapse = (event) => {
        setExpandedRows({});
    }

    const updateStudent = async (data, id) => {
        await dispatch(updateStudentAction({ data, id }));
        dispatch(loadStudentsByIdAction(id));
        dispatch(loadStudentsAction(studentPaginationProps));
    }

    const searchCourses = (event) => {
        const defaultPaginationProps = {
            limit: 10,
            skip: 0
        }
        if (event && event?.query) {
            dispatch(
                loadCoursesAction({
                    ...defaultPaginationProps,
                    filter: [{ column: 'name', value: event?.query }]
                })
            )
        } else {
            dispatch(loadCoursesAction(defaultPaginationProps));
        }
    }

    useEffect(() => {
        dispatch(loadStudentsAction(studentPaginationProps));
    }, []);

    useEffect(() => {
        if (homeState.expandedStudent && homeState.expandedStudent?.studentUUID) {
            setExpandedRows({
                [homeState.expandedStudent?.studentUUID]: true
            })
        }
    }, [homeState.expandedStudent, setExpandedRows]);

    return (
        <Container fluid className="mt-5 py-2 px-5">
            <StudentsList
                state={homeState}
                onRowExpand={onRowExpand}
                paginationProps={studentPaginationProps}
                onPage={onPage}
                onSort={onSort}
                onFilter={onFilter}
                onRowCollapse={onRowCollapse}
                expandedRows={expandedRows}
                searchCourses={searchCourses}
                updateStudent={updateStudent} />
        </Container>
    );
}

export default Home;