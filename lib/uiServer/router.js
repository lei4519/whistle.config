const storage = require('../../common/storage')
module.exports = (router) => {
  router.get('/', (ctx) => {
    return ctx.render('value', {rules: storage.getJsonRules(), text: storage.getTextRules()})
  })
  router.put('/rules', (ctx) => {
    storage.put(ctx.request.body.body)
    ctx.status = 200
  })
  router.delete('/rules', (ctx) => {
    storage.delete(ctx.query)
    ctx.status = 200
  })
};
