import { configureStore } from '@reduxjs/toolkit';
import channel from './slices/channel/channelSlice';

const store = configureStore({
  reducer: {
    channel,
  },
});

export default store;
