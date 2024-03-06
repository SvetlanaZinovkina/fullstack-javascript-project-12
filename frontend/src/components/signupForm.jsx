import React from 'react';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cn from 'classnames';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { signupSchema } from './validationSchemas.js';
import signupBear from '../images/signupBear.svg';
import { useCreateUserMutation } from '../services/api';
import { setUserToken } from '../slices/loginSlice';

const SignupForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = (text) => toast(text);

  const [createUser] = useCreateUserMutation();

  const onSubmit = async ({ username, password }, { setErrors }) => {
    try {
      const response = await createUser({ username, password });
      if ('error' in response) {
        const error = new Error();
        error.statusCode = response.error.status;
        throw error;
      }
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      dispatch(setUserToken(response.data));
      navigate('/');
    } catch (error) {
      if (!error.isAxiosError) {
        notify(t('warnings.errNetwork'));
        return;
      }
      if (error.statusCode === 409) {
        notify(t('warnings.errSignup'));
        setErrors({
          username: t('warnings.errSignup'),
        });
      }
    }
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Row>
            <Col md={6} className="d-flex align-items-center">
              <img
                src={signupBear}
                alt="Registration"
                className="rounded-circle"
                style={{ maxWidth: '200px' }}
              />
            </Col>
            <Col md={6}>
              <div>
                <h2 className="mt-4 mb-4">{t('signup.text')}</h2>
                <Formik
                  initialValues={{
                    username: '',
                    password: '',
                    confirmPassword: '',
                  }}
                  validationSchema={signupSchema}
                  onSubmit={async (values, { setErrors }) => onSubmit(values, { setErrors })}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form>

                      <div className="form-floating mb-3">
                        <Field
                          type="username"
                          name="username"
                          id="username"
                          className={cn({ 'form-control': true, 'is-invalid': errors.username && touched.username })}
                        />
                        <label htmlFor="username" className="form-label">{t('signup.username')}</label>
                        <ErrorMessage name="username" component="div" className="text-danger" />
                      </div>

                      <div className="form-floating mb-3">
                        <Field
                          type="password"
                          id="password"
                          name="password"
                          className={cn({ 'form-control': true, 'is-invalid': errors.password && touched.password })}
                        />
                        <label htmlFor="password" className="form-label">
                          {t('signup.password')}
                        </label>
                        <ErrorMessage name="password" component="div" className="text-danger" />
                      </div>

                      <div className="form-floating mb-3">
                        <Field
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className={cn({ 'form-control': true, 'is-invalid': errors.confirmPassword && touched.confirmPassword })}
                        />
                        <label htmlFor="confirmPassword" className="form-label">
                          {t('signup.confirmPassword')}
                        </label>
                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                      </div>

                      <Button type="submit" variant="primary" className="w-100" disabled={isSubmitting}>
                        {t('signup.signupBtn')}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default SignupForm;
