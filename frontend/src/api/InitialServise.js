import axios from 'axios';

const INITIAL_DATA_URL = '/api/v1/data';

const getChannelData = (token) => axios
  .get(INITIAL_DATA_URL, { headers: { Authorization: `Bearer ${token}` } });

const InitialServise = { getChannelData };

export default InitialServise;
