import chatRoutes from './Chat';

const api = (app) => {
  app.use('/api/chats/', chatRoutes);
};

export default api;