import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { channelsSchema } from './validationSchemas.js';

const ModalAddChannel = () => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.channels);
  const classInputs = cn('mb-2', 'form-control', { 'is-invalid': isError });

  return (
    <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style="display: block;">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t('modal.addChannel')}</div>
            <button
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
            />
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{
                name: '',
              }}
              validationSchema={channelsSchema(channels)}
              onSubmit={async (values) => onSubmit(values)}
            >
              {() => (
                <Form className="">
                  <div>
                    <Field name="name" id="name" className={classInputs} value="" />
                    <label
                      className="visually-hidden"
                      htmlFor="name"
                    >
                      Имя канала
                    </label>
                    <div className="invalid-feedback" />
                    <div className="d-flex justify-content-end">
                      <button type="button" className="me-2 btn btn-secondary">{t('modal.cancelBtn')}</button>
                      <button type="submit" className="btn btn-primary">{t('modal.sendBtn')}</button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
