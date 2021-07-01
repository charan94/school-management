import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import SMTextInput from '../shared/SMTextInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';

const LoginForm = (props) => {

    const { doLogin } = props;

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: ''
        },
        validationSchema: Yup.object({
            userName: Yup.string().required('UserName is required.'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: (data) => {
            doLogin(data);
        }
    })

    return (
        <Form onSubmit={formik.handleSubmit}>
            <div className="form-row">
                <Col xs={12} className="text-center">
                    <img src={`https://www.redwolf.in/image/catalog/artwork-Images/sweatshirts/hogwarts-crest-hoodie-artwork.png`} className="img-fluid login-logo-img" alt={'logo'} />
                </Col>
            </div>
            <div className="form-row">
                <Col xs={12}>
                    <SMTextInput
                        name="userName"
                        id="userName"
                        value={formik.values.userName}
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className=""
                        errors={formik.errors}
                        touched={formik.touched}
                        placeholder="UserName"
                    />
                </Col>
            </div>
            <div className="form-row">
                <Col xs={12}>
                    <SMTextInput
                        name="password"
                        id="password"
                        value={formik.values.password}
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className=""
                        errors={formik.errors}
                        touched={formik.touched}
                        placeholder="Password"
                    />
                </Col>
            </div>
            <div className="form-row mt-2">
                <Col xs={12} className="text-center">
                    <Button type="submit" variant={'primary'} disabled={formik.errors.userName || formik.errors.password}>
                        Login
                    </Button>
                </Col>
            </div>
        </Form>
    );
}

export default LoginForm;