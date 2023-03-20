import { io } from 'socket.io-client';
import store from '../store/index';
import { addMessage } from '../store/slices/messages/messageSlice';
import {
  addChannel, changeCurrentChannel, removeChannel, renameChannel,
} from '../store/slices/channels/channelSlice';

const socket = io();
const { dispatch } = store;

const chatEvents = {
  newMessage: 'newMessage',
  newChannel: 'newChannel',
  removeChannel: 'removeChannel',
  renameChannel: 'renameChannel',
};

socket.on(chatEvents.newChannel, (channel) => {
  dispatch(addChannel(channel));
});

const addNewChannel = (channel) => socket.emit(chatEvents.newChannel, channel, (response) => {
  if (response.status === 'ok') {
    dispatch(changeCurrentChannel(response.data.id));
  } else {
    throw new Error(response.status);
  }
});

socket.on(chatEvents.renameChannel, (channel) => {
  dispatch(renameChannel(channel));
});

const renameCurrentChannel = (channel) => socket.emit(chatEvents.renameChannel, channel);

socket.on(chatEvents.removeChannel, (id) => {
  dispatch(removeChannel(id));
});

const removeCurrentChannel = (channel) => socket.emit(
  chatEvents.removeChannel,
  channel,
  (response) => {
    if (response.status === 'ok') {
      dispatch(changeCurrentChannel(1));
    } else {
      throw new Error(response.status);
    }
  },
);

socket.on(chatEvents.newMessage, (message) => {
  dispatch(addMessage(message));
});

const addNewMessage = (message) => socket.emit(chatEvents.newMessage, message);

const SocketService = {
  addNewChannel, renameCurrentChannel, removeCurrentChannel, addNewMessage,
};

export default SocketService;
