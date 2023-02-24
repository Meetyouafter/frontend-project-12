/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const CHANELL_DATA_URL = '/api/v1/data';
const token = (JSON.parse((localStorage.getItem('token'))));

const getChannelData = () => axios
  .get(CHANELL_DATA_URL, { headers: { Authorization: `Bearer ${token}` } });

const getChannel = createAsyncThunk(
  'api/v1/data',
  async () => {
    const response = await getChannelData();
    return response.data;
  },
);

const initialState = {
  channels: [],
  isLoading: false,
  errors: null,
};

const channelSlice = createSlice({
  name: 'channelData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChannel.pending, (state) => {
        console.log('pending');
        state.isLoading = true;
      })
      .addCase(getChannel.fulfilled, (state, action) => {
        console.log('fulfilled');
        state.isLoading = false;
        state.channels.push(action.payload);
      })
      .addCase(getChannel.rejected, (state, action) => {
        console.log('rejected');
        state.isLoading = false;
        state.channels = [];
        state.errors = action.error.message;
      });
  },
});

export default channelSlice.reducer;
export { getChannel };
