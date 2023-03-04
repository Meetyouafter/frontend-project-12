/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import getInitialData from './getInitialData';

const initialState = {
  initialData: [],
  isLoading: false,
  errors: null,
};

const initialSlice = createSlice({
  name: 'initialData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInitialData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInitialData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.initialData.push(action.payload);
      })
      .addCase(getInitialData.rejected, (state, action) => {
        state.isLoading = false;
        state.initialData = [];
        state.errors = action.error.message;
      });
  },
});

export default initialSlice.reducer;
