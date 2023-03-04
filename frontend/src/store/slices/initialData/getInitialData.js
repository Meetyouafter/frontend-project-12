/* eslint-disable no-param-reassign */
import { createAsyncThunk } from '@reduxjs/toolkit';
import InitialServise from '../../../api/initialData';

const getInitialData = createAsyncThunk(
  'api/v1/data',
  async () => {
    const response = await InitialServise.getChannelData();
    return response.data;
  },
);

export default getInitialData;
