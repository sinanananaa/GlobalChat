import chatRoutes from './Chat';

const api = () => {
  app.use('/api/chats/', chatRoutes);
};

export default api;