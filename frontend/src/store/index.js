import { configureStore } from '@reduxjs/toolkit';
import channel from './slices/channel/channelSlice';
import messages from './slices/channel/messagesSlice';

const store = configureStore({
  reducer: {
    channel,
    messages,
  },
});

export default store;
