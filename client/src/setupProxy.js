const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/home', {
            target: 'http://localhost:3001',
            changeOrigin: true
        })
    )
};