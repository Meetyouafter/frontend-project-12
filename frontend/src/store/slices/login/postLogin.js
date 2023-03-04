import { createAsyncThunk } from '@reduxjs/toolkit';
import LoginServise from '../../../api/login';

const postLogin = createAsyncThunk(
  '/api/v1/login',
  async (data, thunkAPI) => {
    try {
      const result = await LoginServise.postLoginData(data);
      return result.data;
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export default postLogin;
