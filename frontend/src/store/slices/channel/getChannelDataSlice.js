import { createAsyncThunk } from '@reduxjs/toolkit';
import ChannelServise from '../../../api/channels';

const getChannelDataSlice = createAsyncThunk(
  'channels',
  async (thunkApi) => {
    try {
      const response = await ChannelServise.getChannelData();
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      console.log(message)
      return thunkApi.rejectWithValue(message);
    }
  },
);

export default getChannelDataSlice;
