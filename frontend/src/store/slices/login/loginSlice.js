/* eslint-disable import/no-named-as-default */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import postLogin from './postLogin';

const initialState = {
  userData: null,
  error: null,
  isLoading: true,
};

const loginSlice = createSlice({
  name: 'postLogin',
  initialState,
  extraReducers: {
    [postLogin.pending]: (state) => {
      state.userData = null;
      state.error = null;
      state.isLoading = true;
    },
    [postLogin.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    [postLogin.rejected]: (state, action) => {
      state.userData = null;
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default loginSlice.reducer;
