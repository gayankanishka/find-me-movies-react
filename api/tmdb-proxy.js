require('dotenv').config();
const fastify = require('fastify');
const proxy = require('fastify-http-proxy');

const app = fastify({
  logger: true
});

app.register(require('fastify-rate-limit'), {
  max: 100,
  timeWindow: '1 minute'
});

app.register(proxy, {
  upstream: process.env.REACT_APP_TMDB_BASE_URL,
  prefix: '/api',
  replyOptions: {
    rewriteRequestHeaders: (originalReq, headers) => ({
      ...headers,
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
    })
  }
});

export default async (req, res) => {
  await app.ready();
  app.server.emit('request', req, res);
};
