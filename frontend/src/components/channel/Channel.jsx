import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import RenameChannelModal from '../modalWindows/RenameChannelModal';
import RemoveChannelModal from '../modalWindows/RemoveChannelModal';
import { changeCurrentChannel } from '../../store/slices/channelSlice';
import './styles.css';

const ChannelMenu = ({ channelId, channelName }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });

  return (
    <Dropdown onClick={(e) => e.stopPropagation()}>
      <Dropdown.Toggle id="dropdown-basic">
        <span className="visually-hidden">
          {t('label')}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          <RemoveChannelModal channelId={channelId} />
        </Dropdown.Item>
        <Dropdown.Item>
          <RenameChannelModal channelId={channelId} channelName={channelName} />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const ChannelItem = ({ currentChannel, channelData }) => {
  const dispatch = useDispatch();
  const { removable } = channelData;

  return (
    removable ? (
      <div className={currentChannel === channelData.id ? 'chat active_chat' : 'chat'}>
        <button
          type="button"
          className="channel_name"
          onClick={() => dispatch(changeCurrentChannel(channelData.id))}
        >
          {channelData.name}
        </button>
        {channelData.removable
      && <ChannelMenu channelId={channelData.id} channelName={channelData.name} />}
      </div>
    )
      : (
        <button
          className={currentChannel === channelData.id ? 'chat active_chat' : 'chat'}
          onClick={() => dispatch(changeCurrentChannel(channelData.id))}
          type="button"
        >
          <p className="channel_name">
            {channelData.name}
          </p>
        </button>
      )
  );
};

export default ChannelItem;
