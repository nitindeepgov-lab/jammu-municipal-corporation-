module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/chatbot/query',
      handler: 'chatbot.query',
      config: {
        auth: false,
      },
    },
  ],
};
