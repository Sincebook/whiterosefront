const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://whiterose.cf.since88.cn',
      changeOrigin: true,
      ws: true
    })
  );
};
