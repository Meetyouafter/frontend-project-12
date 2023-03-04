import axios from 'axios';

const INITIAL_DATA_URL = '/api/v1/data';

const token = (JSON.parse((localStorage.getItem('token'))));

const getChannelData = () => axios
  .get(INITIAL_DATA_URL, { headers: { Authorization: `Bearer ${token}` } });

const InitialServise = { getChannelData };

export default InitialServise;
