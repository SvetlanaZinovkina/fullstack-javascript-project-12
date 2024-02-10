import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import welcomeLogin from '../images/welcome_login.jpg';
import { useLoginMutation } from '../services/loginApi.js';
// import cn from 'classnames';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(8, 'Максимум 8 букв')
    .required('Обязательное поле'),
});

const LoginForm = () => {
  const { t } = useTranslation();
  const [login, { error }] = useLoginMutation();

  const onSubmit = async (userData) => {
    const response = await login(userData).unwrap();
    console.log(error); // хотела посмотреть ответ от сервера
    console.log(userData); // а тут что приходит из формы
    console.log(response.data); // а тут тоже от сервера
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
                  validationSchema={SignupSchema}
                  onSubmit={(values) => onSubmit(values)}
                >
                  {() => (
                    <Form>
                      <div className="form-floating mb-3">
                        <label htmlFor="username">{t('loginForm.userName')}</label>
                        <Field
                          type="username"
                          name="username"
                          className="form-control"
                        />
                      </div>
                      <div className="form-floating mb-4">
                        <label htmlFor="password">{t('loginForm.userPassword')}</label>
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                        />
                      </div>
                      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('loginForm.btn')}</button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
