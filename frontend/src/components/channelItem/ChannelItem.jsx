/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import RenameChannelModal from '../modalWindows/renameChannelModal';
import RemoveChannelModal from '../modalWindows/removeChannelModal';
import addIcon from '../../assets/images/add_icon.svg';
import './styles.css';

const ChannelMenu = ({ channelId, channelName }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <img className="modal_image" src={addIcon} alt="add channel" />
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

const ChannelItem = ({ activeChannel, channelData, setActiveChannel }) => (
  <div
    className={activeChannel === channelData.id ? 'chat active_chat' : 'chat'}
    onClick={setActiveChannel}
  >
    <p className="channel_name">
      #
      {' '}
      {channelData.name}
    </p>
    {channelData.removable
      && <ChannelMenu channelId={channelData.id} channelName={channelData.name} />}
  </div>
);

export default ChannelItem;
