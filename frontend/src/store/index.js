import { configureStore } from '@reduxjs/toolkit';
import channels from './slices/channels/channelSlice';
import messages from './slices/messages/messageSlice';
import notification from './slices/notification/notificationSlice';

const store = configureStore({
  reducer: {
    channels,
    messages,
    notification,
  },
});

export default store;
