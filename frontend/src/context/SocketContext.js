import React, {
  createContext, useContext, useMemo,
} from 'react';
import { io } from 'socket.io-client';
import store from '../store/index';
import { addMessage } from '../store/slices/messageSlice';
import {
  addChannel, removeChannel, renameChannel, changeCurrentChannel,
} from '../store/slices/channelSlice';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
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

  socket.on(chatEvents.newChannel, (channel) => {
    dispatch(addChannel(channel));
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

  const memoValue = useMemo(() => ({
    addNewChannel, removeCurrentChannel, renameCurrentChannel, addNewMessage,
  }), []);

  return (
    <SocketContext.Provider value={memoValue}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };
