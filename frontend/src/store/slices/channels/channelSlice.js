import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import chatEvents from '../../../api/chatEvents';
import getInitialData from '../initialData/getInitialData';

const initialState = {
  channels: [],
  currentChannel: 0,
  isLoading: false,
  errors: null,
};

const socket = io();

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    currentChannel: (state, action) => ({ ...state, currentChannel: action.payload }),
    addChannel: (state, action) => {
      socket.emit(chatEvents.newChannel, (action.payload), (response) => {
        console.log(response);
      });
      return state;
    },
    subscribeChannels: (state, action) => ({
      ...state, channels: [...state.channels, action.payload],
    }),
    renameChannel: (state, action) => {
      socket.emit(chatEvents.renameChannel, action.payload, (response) => {
        console.log(response);
      });
      return state;
    },
    subscribeChannelsRename: (state, action) => {
      const { id, name } = action.payload;
      const updatedChannels = state.channels.map((channel) => {
        if (channel.id === id) {
          return {
            ...channel,
            name,
          };
        }
        return channel;
      });
      return { ...state, channels: updatedChannels };
    },
    removeChannel: (state, action) => {
      socket.emit(chatEvents.removeChannel, action.payload, (response) => {
        console.log(response);
      });
      return state;
    },
    subscribeChannelsRemove: (state, action) => {
      const { id } = action.payload;
      const updatedChannels = state.channels.filter((channel) => channel.id !== id);
      return { ...state, channels: updatedChannels };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialData.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(getInitialData.fulfilled, (state, action) => {
        console.log('fulfilled', action.payload);
        const updatedChannels = [...state.channels, ...action.payload.channels];
        return { ...state, isLoading: false, channels: updatedChannels };
      })
      .addCase(getInitialData.rejected, (state, action) => {
        console.log('rejected', action);
        return {
          ...state, isLoading: false, channels: [], errors: action.error.message,
        };
      });
  },
});

export const {
  addChannel, subscribeChannels, renameChannel,
  subscribeChannelsRename, removeChannel, subscribeChannelsRemove,
} = channelSlice.actions;
export default channelSlice.reducer;
