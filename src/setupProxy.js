const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/', 
    createProxyMiddleware({
      target: 'https://apiuat.paisalo.in:4015',
      changeOrigin: true,
      secure: false,
    })
  );
};
