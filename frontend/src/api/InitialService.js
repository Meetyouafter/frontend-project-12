import axios from 'axios';

const INITIAL_DATA_URL = '/api/v1/data';

const getChannelData = (token) => axios
  .get(INITIAL_DATA_URL, { headers: { Authorization: `Bearer ${token}` } });

const InitialService = { getChannelData };

export default InitialService;
