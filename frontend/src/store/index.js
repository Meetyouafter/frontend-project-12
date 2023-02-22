import { configureStore } from '@reduxjs/toolkit';
import channelSlice from './slices/channel/channelSlice';

const store = configureStore({
  reducer: {
    channelSlice,
  },
});

export default store;
