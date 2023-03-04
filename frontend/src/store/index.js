import { configureStore } from '@reduxjs/toolkit';
import initialData from './slices/initialData/initialSlice';
import messages from './slices/messages/messageSlice';
import channels from './slices/channels/channelSlice';

const store = configureStore({
  reducer: {
    initialData,
    messages,
    channels,
  },
});

export default store;
