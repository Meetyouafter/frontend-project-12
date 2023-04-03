import { createAsyncThunk } from '@reduxjs/toolkit';
import InitialServise from '../../../api/InitialServise';

const getInitialData = createAsyncThunk(
  'api/v1/data',
  async (token) => {
    const response = await InitialServise.getChannelData(token);
    return response.data;
  },
);

export default getInitialData;
