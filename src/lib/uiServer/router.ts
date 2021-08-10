import Router from "koa-router";
import storage from "../../common/storage";

export const setupRouter = (router: Router) => {
  router.get("/", (ctx) => {
    return (ctx as any).render("value", {
      rules: storage.getJsonRules(),
      text: storage.getTextRules(),
    });
  });
  router.put("/rules", (ctx) => {
    storage.put(ctx.request.body.body);
    ctx.status = 200;
  });
  router.delete("/rules", (ctx) => {
    storage.delete(ctx.query as any);
    ctx.status = 200;
  });
};
