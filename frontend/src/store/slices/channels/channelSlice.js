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
    currentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    addChannel: (state, action) => {
      socket.emit(chatEvents.newChannel, (action.payload), (response) => {
        console.log(response);
      });
    },
    subscribeChannels: (state, action) => ({
      ...state,
      channels: [...state.channels, action.payload],
    }),
    renameChannel: (state, action) => {
      socket.emit(chatEvents.renameChannel, action.payload, (response) => {
        console.log(response);
      });
    },
    subscribeChannelsRename: (state, action) => {
      const { id, name } = action.payload;
      return {
        ...state,
        channels: state.channels.map((channel) => {
          if (channel.id === id) {
            return {
              ...channel,
              name,
            };
          }
          return channel;
        }),
      };
    },
    removeChannel: (state, action) => {
      socket.emit(chatEvents.removeChannel, action.payload, (response) => {
        console.log(response);
      });
    },
    subscribeChannelsRemove: (state, action) => {
      const { id } = action.payload;
      const fillteredState = state.channels.filter((channel) => channel.id !== id);
      return {
        ...state,
        channels: [...fillteredState],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInitialData.fulfilled, (state, action) => {
        console.log('fulfilled', action.payload);
        state.isLoading = false;
        state.channels.push(...action.payload.channels);
      })
      .addCase(getInitialData.rejected, (state, action) => {
        console.log('rejected', action);
        state.isLoading = false;
        state.channels = [];
        state.errors = action.error.message;
      });
  },
});

export const {
  addChannel, subscribeChannels, renameChannel,
  subscribeChannelsRename, removeChannel, subscribeChannelsRemove,
} = channelSlice.actions;
export default channelSlice.reducer;
