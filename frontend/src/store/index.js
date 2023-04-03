import { configureStore } from '@reduxjs/toolkit';
import channels from './slices/channelSlice';
import messages from './slices/messageSlice';
import notification from './slices/notificationSlice';

const store = configureStore({
  reducer: {
    channels,
    messages,
    notification,
  },
});

export default store;
