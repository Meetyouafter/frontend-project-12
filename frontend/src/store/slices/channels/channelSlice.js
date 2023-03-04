import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import chatEvents from '../../../api/chatEvents';

const initialState = {
  channels: [],
};

const socket = io();

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      socket.emit(chatEvents.newChannel, (action.payload));
    },
    subscribeChannels: (state, action) => ({
      ...state,
      channels: [...state.channels, action.payload],
    }),
    renameChannel: (state, action) => {
      socket.emit(chatEvents.renameChannel, action.payload);
    },
    subscribeChannelsRename: (state, action) => {
      const { id } = action.payload;
      state.channels.filter((channel) => channel.id !== id);
      return {
        ...state,
        channels: [...state.channels, action.payload],
      };
    },
    removeChannel: (state, action) => {
      socket.emit(chatEvents.removeChannel, action.payload);
    },
    subscribeChannelsRemove: (state, action) => {
      const { id } = action.payload;
      state.channels.filter((channel) => channel.id !== id);
    },
  },
});

export const {
  addChannel, subscribeChannels, renameChannel,
  subscribeChannelsRename, removeChannel, subscribeChannelsRemove,
} = channelSlice.actions;
export default channelSlice.reducer;
