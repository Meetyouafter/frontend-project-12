import axios from 'axios';

const INITIAL_DATA_URL = '/api/v1/data';

const getChannelData = (token) => axios
  .get(INITIAL_DATA_URL, { headers: { Authorization: `Bearer ${token}` } });

const patchCurrentChannel = (channelId, token) => axios
  .patch(INITIAL_DATA_URL, { currentChannelId: channelId }, { headers: { Authorization: `Bearer ${token}` } });

const InitialServise = { getChannelData, patchCurrentChannel };

export default InitialServise;
