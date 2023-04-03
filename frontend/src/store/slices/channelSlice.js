/* eslint-disable arrow-body-style */
import { createSlice } from '@reduxjs/toolkit';
import getInitialData from '../getInitialData';

const initialState = {
  channels: [],
  currentChannel: 1,
  isLoading: false,
  errors: null,
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    changeCurrentChannel: (state, action) => ({ ...state, currentChannel: action.payload }),
    addChannel: (state, action) => ({
      ...state, channels: [...state.channels, action.payload],
    }),
    renameChannel: (state, action) => {
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
      const { id } = action.payload;
      const updatedChannels = state.channels.filter((channel) => channel.id !== id);
      return { ...state, channels: updatedChannels };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialData.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(getInitialData.fulfilled, (state, action) => {
        //  const updatedChannels = [...state.channels, ...action.payload.channels];
        return { ...state, isLoading: false, channels: action.payload.channels };
      })
      .addCase(getInitialData.rejected, (state, action) => ({
        ...state, isLoading: false, channels: [], errors: action.error.message,
      }));
  },
});

export const {
  addChannel, renameChannel,
  removeChannel, changeCurrentChannel,
} = channelSlice.actions;
export { getInitialData };
export default channelSlice.reducer;
