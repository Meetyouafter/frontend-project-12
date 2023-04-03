/* eslint-disable jsx-a11y/no-static-element-interactions */
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
        <RemoveChannelModal channelId={channelId} />
        <RenameChannelModal channelId={channelId} channelName={channelName} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

const ChannelItem = ({ currentChannel, channelData }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={currentChannel === channelData.id ? 'chat active_chat' : 'chat'}
      onClick={() => dispatch(changeCurrentChannel(channelData.id))}
      onKeyPress={() => dispatch(changeCurrentChannel(channelData.id))}
    >
      <p className="channel_name">
        {channelData.name}
      </p>
      {channelData.removable
      && <ChannelMenu channelId={channelData.id} channelName={channelData.name} />}
    </div>
  );
};

export default ChannelItem;
