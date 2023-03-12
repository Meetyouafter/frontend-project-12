import { configureStore } from '@reduxjs/toolkit';
import initialData from './slices/initialData/initialSlice';
import messages from './slices/messages/messageSlice';
import channels from './slices/channels/channelSlice';
import notification from './slices/notification/notificationSlice';

const store = configureStore({
  reducer: {
    initialData,
    messages,
    channels,
    notification,
  },
});

export default store;
