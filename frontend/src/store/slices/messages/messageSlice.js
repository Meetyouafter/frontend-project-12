import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import chatEvents from '../../../api/chatEvents';

const initialState = {
  messages: [],
};

const socket = io();

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      socket.emit(chatEvents.newMessage, (action.payload));
    },
    subscribeMessages: (state, action) => ({
      ...state,
      messages: [...state.messages, action.payload],
    }),
  },
});

export const { addMessage, subscribeMessages } = messageSlice.actions;
export default messageSlice.reducer;
