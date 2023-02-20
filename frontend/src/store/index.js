import { configureStore } from '@reduxjs/toolkit';
import channel from './slices/channel/index';

const store = configureStore({
  reducer: {
    channel,
  },
});

export default store;
