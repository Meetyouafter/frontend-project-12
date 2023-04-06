import { io } from 'socket.io-client';
import store from '../store/index';
import { addMessage } from '../store/slices/messageSlice';
import {
  addChannel, removeChannel, renameChannel, changeCurrentChannel,
} from '../store/slices/channelSlice';
import { scrollToBottom } from '../components/chat/functions';

const chatEvents = {
  newMessage: 'newMessage',
  newChannel: 'newChannel',
  removeChannel: 'removeChannel',
  renameChannel: 'renameChannel',
};

const { dispatch } = store;
const initialActiveChannelId = 1;

const getCurrentChannel = () => {
  const { currentChannel } = store.getState().channels;
  return currentChannel;
};

store.subscribe(getCurrentChannel);
const socket = io();

const socketListener = () => {
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
};

const addNewChannel = (channel, callback) => socket
  .emit(chatEvents.newChannel, channel, (response) => {
    if (response.status === 'ok') {
      dispatch(changeCurrentChannel(response.data.id));
      callback('success');
    } else {
      callback('error');
    }
  });

const renameCurrentChannel = (channel, callback) => socket
  .emit(chatEvents.renameChannel, channel, (response) => {
    if (response.status === 'ok') {
      callback('success');
    } else {
      callback('error');
    }
  });

const removeCurrentChannel = (id, callback) => socket
  .emit(chatEvents.removeChannel, id, (response) => {
    if (response.status === 'ok') {
      callback('success');
    } else {
      callback('error');
    }
  });

const addNewMessage = (message, callback) => socket
  .emit(chatEvents.newMessage, message, (response) => {
    if (response.status === 'ok') {
      callback('success');
    } else {
      callback('error');
    }
  });

const SocketService = {
  addNewChannel, renameCurrentChannel, removeCurrentChannel, addNewMessage,
};

export default SocketService;
export { socketListener };
