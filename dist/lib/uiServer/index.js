"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const path_1 = __importDefault(require("path"));
const koa_router_1 = __importDefault(require("koa-router"));
const router_1 = require("./router");
const koa_hbs_1 = __importDefault(require("koa-hbs"));
exports.default = (server) => {
    const app = new koa_1.default();
    const router = new koa_router_1.default();
    app.proxy = true;
    app.silent = true;
    router_1.setupRouter(router);
    app.use(koa_hbs_1.default.middleware({
        viewPath: path_1.default.join(__dirname, "views"),
    }));
    app.use(koa_bodyparser_1.default());
    app.use(router.routes());
    app.use(router.allowedMethods());
    server.on("request", app.callback());
};
