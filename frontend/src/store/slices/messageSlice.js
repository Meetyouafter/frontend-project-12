import { createSlice } from '@reduxjs/toolkit';
import getInitialData from '../getInitialData';

const initialState = {
  messages: [],
  isLoading: true,
  errors: null,
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const newMessage = action.payload;
      return {
        ...state,
        messages: [...state.messages, newMessage],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialData.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(getInitialData.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        messages: [...action.payload.messages],
      }))
      .addCase(getInitialData.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        messages: [],
        errors: action.error.message,
      }));
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
