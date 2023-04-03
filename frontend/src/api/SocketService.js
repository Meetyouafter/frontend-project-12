import { io } from 'socket.io-client';
import store from '../store/index';
import { addMessage } from '../store/slices/messages/messageSlice';
import {
  addChannel, removeChannel, renameChannel, changeCurrentChannel,
} from '../store/slices/channels/channelSlice';
import { scrollToBottom } from '../components/chat/functions';

const chatEvents = {
  newMessage: 'newMessage',
  newChannel: 'newChannel',
  removeChannel: 'removeChannel',
  renameChannel: 'renameChannel',
};

const socket = io();
const { dispatch } = store;
const initialActiveChannelId = 1;

const getCurrentChannel = () => {
  const { currentChannel } = store.getState().channels;
  return currentChannel;
};

store.subscribe(getCurrentChannel);

socket.on(chatEvents.newChannel, (channel) => {
  dispatch(addChannel(channel));
  const channels = document.querySelector('.channels_container');
  setTimeout(() => scrollToBottom(channels), 0);
});

socket.on(chatEvents.renameChannel, (channel) => {
  dispatch(renameChannel(channel));
});

socket.on(chatEvents.removeChannel, (id) => {
  dispatch(removeChannel(id));
  if (getCurrentChannel() === id.id) {
    dispatch(changeCurrentChannel(initialActiveChannelId));
  }
});

socket.on(chatEvents.newMessage, (message) => {
  dispatch(addMessage(message));
});

const addNewChannel = (channel) => socket.emit(chatEvents.newChannel, channel, (response) => {
  if (response.status === 'ok') {
    dispatch(changeCurrentChannel(response.data.id));
  } else {
    throw new Error(response.status);
  }
});

const renameCurrentChannel = (channel) => socket.emit(chatEvents.renameChannel, channel);

const removeCurrentChannel = (id) => socket.emit(
  chatEvents.removeChannel,
  id,
  (response) => {
    if (response.status === 'ok') {
      if (getCurrentChannel() === id.id) {
        dispatch(changeCurrentChannel(initialActiveChannelId));
      }
    } else {
      throw new Error(response.status);
    }
  },
);

const addNewMessage = (message) => socket.emit(chatEvents.newMessage, message);

const SocketService = {
  addNewChannel, renameCurrentChannel, removeCurrentChannel, addNewMessage,
};

export default SocketService;
