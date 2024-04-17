import React, { useContext } from 'react';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cn from 'classnames';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { AuthContext } from '../context/authContext.jsx';
import signupBear from '../images/signupBear.svg';
import { useCreateUserMutation } from '../services/api';
import notify from '../utils/toast.js';

const SignupForm = () => {
  const { setUser } = useContext(AuthContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('warnSchema.signUpName'))
      .max(20, t('warnSchema.signUpName'))
      .required(t('warnSchema.required')),
    password: Yup.string()
      .min(6, t('warnSchema.signUpPassword'))
      .required(t('warnSchema.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('warnSchema.signUpConfirmPassword'))
      .required(t('warnSchema.required')),
  });

  const [createUser] = useCreateUserMutation();

  const onSubmit = async ({ username, password }, { setErrors }) => {
    try {
      const response = await createUser({ username, password });
      if ('error' in response) {
        const error = new Error();
        error.statusCode = response.error.status;
        throw error;
      }
      setUser(response.data.token, response.data.username);
      navigate('/');
    } catch (error) {
      if (error.statusCode === 409) {
        notify(t('warnings.errSignup'));
        setErrors({
          username: t('warnings.errSignup'),
        });
        notify(t('warnings.errNetwork'));
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
