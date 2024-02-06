import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
// import cn from 'classnames';

const LoginForm = () => {
  const { t } = useTranslation();
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
  return (
    <div className="card-body row p-5">
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <img src="../images/welcome_login.jpg" className="rounded-circle" alt="Войти" />
      </div>
      <form className="col-12 col-md-6 mt-3 mt-mb-0">
        <h1 className="text-center mb-4">{t('loginForm.signIn')}</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => console.log(values)}
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
      </form>
    </div>
  );
};

export default LoginForm;
