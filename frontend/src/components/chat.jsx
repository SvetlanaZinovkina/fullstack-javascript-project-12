import React from 'react';
import { useTranslation } from 'react-i18next';
import plus from '../images/plus.png';
import arrow from '../images/arrow.png';

const ChatForm = () => {
  const { t } = useTranslation();
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button type="button" className="p-0 text-primary btn btn-group-vertical">
              <img
                src={plus}
                alt="добавить"
                width="20"
                height="20"
              />
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            <li className="nav-item w-100">
              <button type="button" className="w-100 rounded-30 text-start btn btn-warning">
                <span
                  className="me-1"
                >
                  #
                </span>
                general
              </button>
            </li>
            <li className="nav-item w-100">
              <button type="button" className="w-100 rounded-30 text-start btn">
                <span
                  className="me-1"
                >
                  #
                </span>
                random
              </button>
            </li>
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0"><b># general</b></p>
              <span className="text-muted">0 сообщений</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5 " />
            <div className="mt-auto px-5 py-3">
              <form noValidate="" className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <input
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2 form-control"
                    value=""
                  />
                  <button type="submit" disabled="" className="btn btn-group-vertical">
                    <img src={arrow} width="20" height="20" alt="отправить" />
                    <span className="visually-hidden">Отправить</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
