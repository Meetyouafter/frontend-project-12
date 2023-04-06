import { configureStore } from '@reduxjs/toolkit';
import channels from './slices/channelSlice';
import messages from './slices/messageSlice';

const store = configureStore({
  reducer: {
    channels,
    messages,
  },
});

export default store;
