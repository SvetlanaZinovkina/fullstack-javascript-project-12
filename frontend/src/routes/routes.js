const routes = {
  path: () => '/api/v1',
  loginPath: () => '/api/v1/login',
  signupPath: () => '/api/v1/signup',
  getChannelsPath: () => '/api/v1/channels',
  addChannelPath: () => '/api/v1/channels',
  editChannelPath: (id) => `/api/v1/channels/${id}`,
  removeChannelPath: (id) => `/api/v1/channels/${id}`,
  getMessagesPath: () => '/api/v1/messages',
  addMessagePath: () => '/api/v1/messages',
  editMessagePath: (id) => `/api/v1/messages/${id}`,
  removeMessagePath: (id) => `/api/v1/messages/${id}`,
};

export default routes;
