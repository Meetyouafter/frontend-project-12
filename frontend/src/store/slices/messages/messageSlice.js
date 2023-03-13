/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import chatEvents from '../../../api/chatEvents';
import getInitialData from '../initialData/getInitialData';

const initialState = {
  messages: [],
};

const socket = io();

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      socket.emit(chatEvents.newMessage, (action.payload), (response) => {
        console.log(response.status); // ok
      });
    },
    subscribeMessages: (state, action) => ({
      ...state,
      messages: [...state.messages, action.payload],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInitialData.fulfilled, (state, action) => {
        console.log('fulfilled', action.payload);
        state.isLoading = false;
        state.messages.push(...action.payload.messages);
      })
      .addCase(getInitialData.rejected, (state, action) => {
        console.log('rejected', action);
        state.isLoading = false;
        state.messages = [];
        state.errors = action.error.message;
      });
  },
});

export const { addMessage, subscribeMessages } = messageSlice.actions;
export default messageSlice.reducer;
