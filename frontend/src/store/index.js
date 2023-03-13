import { configureStore } from '@reduxjs/toolkit';
import messages from './slices/messages/messageSlice';
import channels from './slices/channels/channelSlice';
import notification from './slices/notification/notificationSlice';

const store = configureStore({
  reducer: {
    messages,
    channels,
    notification,
  },
});

export default store;
