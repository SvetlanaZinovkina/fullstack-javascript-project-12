import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import ModalAddChannel from './modalAddChannel.jsx';
import ModalDeleteChannel from './modalDeleteChannel.jsx';
import ModalRenameChannel from './modalRenameChannel.jsx';

const Modal = () => {
  const { t } = useTranslation();
  const type = useSelector((state) => state.modal.type);
  let currentModal;

  switch (type) {
    case 'addChannel':
      currentModal = <ModalAddChannel />;
      break;
    case 'deleteChannel':
      currentModal = <ModalDeleteChannel />;
      break;
    case 'renameChannel':
      currentModal = <ModalRenameChannel />;
      break;
    default:
      currentModal = null;
  }

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t(`modal.${type}`)}</div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
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
