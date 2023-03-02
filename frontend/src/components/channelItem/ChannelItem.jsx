/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import RenameChannelModal from '../modalWindows/renameChannelModal';
import RemoveChannelModal from '../modalWindows/removeChannelModal';
import './styles.css';

const ChannelMenu = () => (
  <DropdownButton id="dropdown-basic-button" title="">
    <RemoveChannelModal />
    <RenameChannelModal />
  </DropdownButton>
);

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
    {channelData.removable && <ChannelMenu />}
  </div>
);

export default ChannelItem;
