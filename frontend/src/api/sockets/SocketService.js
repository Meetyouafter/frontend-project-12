import { io } from 'socket.io-client';
import store from '../../store/index';
import chatEvents from './chatEvents';
import { addMessage } from '../../store/slices/messages/messageSlice';
import {
  addChannel, removeChannel, renameChannel, changeCurrentChannel,
} from '../../store/slices/channels/channelSlice';
import { scrollToBottom } from '../../components/chat/helper';

const socket = io();
const { dispatch } = store;

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

const addNewMessage = (message) => socket.emit(chatEvents.newMessage, message);

const SocketService = {
  addNewChannel, renameCurrentChannel, removeCurrentChannel, addNewMessage,
};

export default SocketService;
