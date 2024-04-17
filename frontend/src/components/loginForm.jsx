import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import * as Yup from 'yup';
import { AuthContext } from '../context/authContext.jsx';
import welcomeLogin from '../images/welcome_login.jpg';
import { useLoginMutation } from '../services/api.js';

const LoginForm = () => {
  const { setUser } = useContext(AuthContext);
  const { t } = useTranslation();
  const [login, { isError }] = useLoginMutation();
  const navigate = useNavigate();

  const signInSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, t('warnSchema.signInNameMin'))
      .max(50, t('warnSchema.signInNameMax'))
      .required(t('warnSchema.required')),
    password: Yup.string()
      .min(2, t('warnSchema.signInPasswordMin'))
      .max(8, t('warnSchema.signInPasswordMax'))
      .required(t('warnSchema.required')),
  });

  const classInputs = cn({ 'form-control': true, 'is-invalid': isError });

  const onSubmit = async (userData) => {
    try {
      const response = await login(userData);
      const { token, username } = response.data;
      setUser(token, username);
      navigate('/');
    } catch (error) {
      console.error('Error login:', error);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5 bg-white">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={welcomeLogin} className="img-welcome rounded-circle" alt="Войти" />
              </div>
              <div className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('loginForm.signIn')}</h1>
                <Formik
                  initialValues={{
                    username: '',
                    password: '',
                  }}
                  validationSchema={signInSchema}
                  onSubmit={async (values) => onSubmit(values)}
                >
                  {() => (
                    <Form>
                      <div className="form-floating mb-3">
                        <Field
                          type="username"
                          name="username"
                          className={classInputs}
                          required
                          placeholder="Ваш ник"
                          id="username"
                        />
                        <label htmlFor="username" className="form-label">{t('loginForm.userName')}</label>
                      </div>
                      <div className="form-floating mb-4">
                        <Field
                          type="password"
                          name="password"
                          className={classInputs}
                          required
                          placeholder="Пароль"
                          id="password"
                        />
                        <label htmlFor="password" className="form-label">{t('loginForm.userPassword')}</label>
                        {isError && <div className="invalid-tooltip">{t('warnings.errLogin')}</div>}
                      </div>
                      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('loginForm.btn')}</button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="card-footer p-5 bg-white">
              <div className="text-center">
                <span>{t('loginForm.footer.textNoAccount')}</span>
                {' '}
                <a href="/signup">{t('loginForm.footer.signUp')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
