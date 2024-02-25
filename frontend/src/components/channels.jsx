import React from 'react';
// import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { setChannels, setActiveChannel } from '../slices/channelsSlice.js';
import {
  useGetChannelsQuery,
  useAddChannelMutation,
} from '../services/api.js';
import plus from '../images/plus.png';
import { ModalAddChannel } from './modal/modal.jsx';

const Channels = () => {
  // const { t } = useTranslation();
  const {
    data, isLoading, refetch,
  } = useGetChannelsQuery();

  const [addChannel] = useAddChannelMutation();

  const dispatch = useDispatch();

  dispatch(setChannels(data));

  const channels = useSelector((state) => state.channels.channels);
  const activeChannel = useSelector((state) => state.channels.activeChannel);

  const handleChannelClick = (id) => dispatch(setActiveChannel(id));
  const handleAddChannel = () => {
    console.log('rere');
  };

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
          const classChannel = cn('w-100', 'rounded-30', 'text-start', 'btn', { 'btn-warning': activeChannel === parseInt(id, 10), 'btn-secondary': removable, 'text-truncate': removable });
          return (
            <li className="nav-item w-100" key={id}>
              {removable ? (
                <div role="group" className="d-flex dropdown btn-group">
                  <button type="button" className={classChannel} onClick={() => handleChannelClick(parseInt(id, 10))}>
                    <span
                      className="me-1"
                    >
                      #
                    </span>
                    vvv
                  </button>
                  <button
                    type="button"
                    id="react-aria8515026025-:r1:"
                    aria-expanded="false"
                    className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary"
                  >
                    <span
                      className="visually-hidden"
                    >
                      Управление каналом
                    </span>
                  </button>
                </div>
              ) : (
                <button type="button" className={classChannel} onClick={() => handleChannelClick(parseInt(id, 10))}>
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
