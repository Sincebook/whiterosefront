const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app: any) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://whiterose.cf.since88.cn',
        })
    );
};