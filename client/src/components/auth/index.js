import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import LoginForm from './LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthState } from '../../reducer/auth.reducer';
import { loginAction } from '../../actions/auth.actions';

const Auth = (props) => {

    const authState = useSelector(getAuthState);
    const dispatch = useDispatch();
    const { history } = props;

    const doLogin = (data) => {
        dispatch(loginAction(data));
    }

    useEffect(() => {
        if (authState.isAuthenticated) {
            history.push('/home');
        }
    }, [authState.isAuthenticated, history])

    return (
        <Container fluid>
            <Row className="mt-0 mt-lg-5">
                <Col xs={10} md={{ offset: 4, span: 3 }}>
                    <Card className="p-5 login-card">
                        <LoginForm doLogin={doLogin} authState={authState} />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Auth;