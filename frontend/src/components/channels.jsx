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
// import arrow from '../images/arrow.png';

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

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column d-flex">
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
        {channels.map((chanel) => {
          const { id, name } = chanel;
          const classChannel = cn('w-100', 'rounded-30', 'text-start', 'btn', { 'btn-warning': activeChannel === parseInt(id, 10) });
          return (
            <li className="nav-item w-100" key={id}>
              <button type="button" className={classChannel} onClick={() => handleChannelClick(parseInt(id, 10))}>
                <span
                  className="me-1"
                >
                  #
                </span>
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
