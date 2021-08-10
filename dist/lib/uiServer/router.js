"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRouter = void 0;
const storage_1 = __importDefault(require("../../common/storage"));
const setupRouter = (router) => {
    router.get("/", (ctx) => {
        return ctx.render("value", {
            rules: storage_1.default.getJsonRules(),
            text: storage_1.default.getTextRules(),
        });
    });
    router.put("/rules", (ctx) => {
        storage_1.default.put(ctx.request.body.body);
        ctx.status = 200;
    });
    router.delete("/rules", (ctx) => {
        storage_1.default.delete(ctx.query);
        ctx.status = 200;
    });
};
exports.setupRouter = setupRouter;
