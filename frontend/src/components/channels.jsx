import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { setActiveChannel } from '../slices/channelsSlice.js';
import { openModal } from '../slices/modalSlice.js';
import plus from '../images/plus.png';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.channels.channels);
  const activeChannel = useSelector((state) => state.channels.activeChannel);

  const handleChannelClick = (id) => dispatch(setActiveChannel(id));

  const handleAddChannel = () => dispatch(openModal({ type: 'addChannel' }));

  const handleDelete = (channelID) => dispatch(openModal({ type: 'deleteChannel', channelID }));

  const handleRename = (channelID) => dispatch(openModal({ type: 'renameChannel', channelID }));

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleAddChannel}>
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
        {channels.map((chanel) => {
          const { id, name, removable } = chanel;
          const classChannel = cn('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': activeChannel === id, 'text-truncate': removable });
          const classChannelModal = cn('flex-grow-0', 'dropdown-toggle', 'dropdown-toggle-split', 'btn', { 'btn-warning': activeChannel === id });

          return (
            <li className="nav-item w-100" key={id}>
              {removable ? (
                <Dropdown as={ButtonGroup} className="d-flex dropdown btn-group">
                  <Button variant="outline" className={classChannel} onClick={() => handleChannelClick(id)}>
                    {`# ${name}`}
                  </Button>
                  <Dropdown.Toggle
                    variant="outline"
                    id="channelDropdown"
                    className={classChannelModal}
                  >
                    <span className="visually-hidden">Управление каналом</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ position: 'absolute', inset: '0px auto auto 0px', transform: 'translate(-8px, 40px)' }}>
                    <Dropdown.Item onClick={() => handleDelete(id)}>{t('modal.deleteBtn')}</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRename(id)}>{t('modal.renameBtn')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              ) : (
                <button type="button" className={classChannel} onClick={() => handleChannelClick(id)}>
                  <span
                    className="me-1"
                  >
                    #
                  </span>
                  {name}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
