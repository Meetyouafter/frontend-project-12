const wsConnect = (host) => ({ type: 'WS_CONNECT', host });

const socketMiddleware = () => {
  const socket = null;

  const onOpen = (store) => (event) => {
    console.log('websocket open', event.target.url);
    store.dispatch(wsConnect(event.target.url));
  };
};
