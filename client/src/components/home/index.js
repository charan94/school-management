import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { loadStudentsAction, loadStudentsByIdAction } from '../../actions/home.actions';
import { getHomeState } from '../../reducer/home.reducer';
import StudentsList from './StudentsList';

const Home = (props) => {

    const homeState = useSelector(getHomeState);
    const dispatch = useDispatch();

    const [studentPaginationProps, setStudentPaginationProps] = useState({
        limit: 10,
        skip: 0
    });

    const onPage = (event) => {
        console.log('onPage ', event);
    }

    const onSort = (event) => {
        console.log('onSort ', event)
    }

    const onFilter = (event) => {
        console.log('onFilter ', event);
    }

    useEffect(() => {
        dispatch(loadStudentsAction(studentPaginationProps));
    }, []);

    const loadStudent = (id) => {
        dispatch(loadStudentsByIdAction(id));
    }

    return (
        <Container fluid className="mt-5 py-2 px-5">
            <StudentsList state={homeState} onPage={onPage} onSort={onSort} onFilter={onFilter} />
        </Container>
    );
}

export default Home;