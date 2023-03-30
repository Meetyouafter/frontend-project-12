const getActiveChannelName = (channelsData, activeChannelId) => {
  const activeChannelName = channelsData
    .filter((channel) => channel.id === activeChannelId)
    .map((channel) => channel.name);
  return activeChannelName;
};

export default getActiveChannelName;
