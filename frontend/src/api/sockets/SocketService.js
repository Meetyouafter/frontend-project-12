import { io } from 'socket.io-client';
<<<<<<< HEAD:frontend/src/api/SocketService.js
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
=======
import store from '../../store/index';
import chatEvents from './chatEvents';
import { addMessage } from '../../store/slices/messages/messageSlice';
import {
  addChannel, removeChannel, renameChannel, changeCurrentChannel,
} from '../../store/slices/channels/channelSlice';
import { scrollToBottom } from '../../components/chat/functions';
>>>>>>> parent of 3144111 (refactoring api):frontend/src/api/sockets/SocketService.js

const socket = io();
const { dispatch } = store;
//  const initialActiveChannelId = 1;

/*
const getCurrentChannel = () => {
  const { currentChannel } = store.getState().channels;
  return currentChannel;
};

store.subscribe(getCurrentChannel);
*/
socket.on(chatEvents.newChannel, (channel) => {
  dispatch(addChannel(channel));
  const channels = document.querySelector('.channels_container');
  setTimeout(() => scrollToBottom(channels), 0);
});

socket.on(chatEvents.renameChannel, (channel) => {
  dispatch(renameChannel(channel));
});

socket.on(chatEvents.removeChannel, (id) => {
  console.log('socket on', getCurrentChannel(), id, getCurrentChannel() === id, getCurrentChannel() === { id });

  dispatch(removeChannel(id));
<<<<<<< HEAD:frontend/src/api/SocketService.js
  //  if (getCurrentChannel() === id.id) {
  //  dispatch(changeCurrentChannel(initialActiveChannelId));
  //  }
=======
  // dispatch(changeCurrentChannel(2));

  if (getCurrentChannel() === id.id) {
    dispatch(changeCurrentChannel(initialActiveChannelId));
  }
>>>>>>> parent of 3144111 (refactoring api):frontend/src/api/sockets/SocketService.js
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
<<<<<<< HEAD:frontend/src/api/SocketService.js
      //  if (getCurrentChannel() === id.id) {
      //    dispatch(changeCurrentChannel(initialActiveChannelId));
      //  }
=======
      console.log('socket emit', getCurrentChannel(), id, id.id, getCurrentChannel() === id, getCurrentChannel() === { id });

      if (getCurrentChannel() === id.id) {
        dispatch(changeCurrentChannel(initialActiveChannelId));
      }
>>>>>>> parent of 3144111 (refactoring api):frontend/src/api/sockets/SocketService.js
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
