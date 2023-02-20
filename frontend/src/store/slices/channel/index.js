import { createSlice } from '@reduxjs/toolkit';
import getChannelDataSlice from './getChannelDataSlice';

const initialState = {
  channel: [],
  errorMessage: null,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  extraReducers: {
    [getChannelDataSlice.fulfilled]: (state, action) => {
      console.log(action);
      state.channel = action.payload;
      state.errorMessage = null;
    },
    [getChannelDataSlice.rejected]: (state, action) => {
      state.channel = null;
      state.errorMessage = action.payload;
    },
  },
});

export default channelSlice.reducer;
