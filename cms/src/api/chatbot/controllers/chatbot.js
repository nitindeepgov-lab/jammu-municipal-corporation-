'use strict';

module.exports = {
  async query(ctx) {
    try {
      const { text, history } = ctx.request.body;
      if (!text) {
        return ctx.badRequest('Missing text parameter');
      }

      const chatbotService = strapi.service('api::chatbot.chatbot');
      const response = await chatbotService.processQuery(text, history || []);

      ctx.send(response);
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
