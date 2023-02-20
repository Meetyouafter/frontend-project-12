import axios from 'axios';

const CHANELL_DATA_URL = '/api/v1/data';

const getChannelData = () => axios
  .get(CHANELL_DATA_URL, { headers: { Authorization: `Bearer ${localStorage.token}` } });

const ChannelServise = { getChannelData };

export default ChannelServise;
