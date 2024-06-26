import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slices/modalSlice.js';
import ModalAddChannel from './modalAddChannel.jsx';
import ModalDeleteChannel from './modalDeleteChannel.jsx';
import ModalRenameChannel from './modalRenameChannel.jsx';
import { getModalType } from '../../selectors/selectors';

const Modal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const type = useSelector(getModalType);
  let currentModal;

  const handleCloseModal = () => dispatch(closeModal());

  switch (type) {
    case 'addChannel':
      currentModal = <ModalAddChannel handleCloseModal={handleCloseModal} />;
      break;
    case 'deleteChannel':
      currentModal = <ModalDeleteChannel handleCloseModal={handleCloseModal} />;
      break;
    case 'renameChannel':
      currentModal = <ModalRenameChannel handleCloseModal={handleCloseModal} />;
      break;
    default:
      currentModal = null;
  }

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show"
        tabIndex="-1"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t(`modal.${type}`)}</div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
                onClick={handleCloseModal}
              />
            </div>
            <div className="modal-body">{currentModal}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
