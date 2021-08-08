const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const onerror = require('koa-onerror');
const path = require('path');
const router = require('koa-router')();
const setupRouter = require('./router');
const hbs = require('koa-hbs');

module.exports = (server /* , options */) => {
  const app = new Koa();
  app.proxy = true;
  app.silent = true;
  onerror(app);
  setupRouter(router);
  app.use(
    hbs.middleware({
      viewPath: path.join(__dirname, '../../views'),
    }),
  );
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
  server.on('request', app.callback());
};
