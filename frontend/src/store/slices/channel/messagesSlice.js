/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const CHANELL_DATA_URL = '/api/v1/data';
const token = (JSON.parse((localStorage.getItem('token'))));

const getChannelData = () => axios
  .get(CHANELL_DATA_URL, { headers: { Authorization: `Bearer ${token}` } });

const getMessages = createAsyncThunk(
  'api/messages',
  async () => {
    const response = getChannelData();
    return response.data;
  },
);

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  extraReducers: {
    [getMessages.fulfilled]: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export default messagesSlice.reducer;
export { getMessages };
