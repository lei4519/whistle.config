import Koa from "koa";
import bodyParser from "koa-bodyparser";
import path from "path";
import Router from "koa-router";
import { setupRouter } from "./router";
import hbs from "koa-hbs";
import { EventEmitter } from "stream";

export default (server: EventEmitter /* , options */) => {
  const app = new Koa();
  const router = new Router();
  app.proxy = true;
  app.silent = true;

  setupRouter(router);

  app.use(
    hbs.middleware({
      viewPath: path.join(__dirname, "views"),
    })
  );
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());

  server.on("request", app.callback());
};
