const storage = require('../storage')
module.exports = (router) => {
  router.get('/', (ctx) => {
    return ctx.render('value', {rules: storage.getJsonRules()})
  })
  router.put('/config', (ctx) => {
    storage.put(ctx.request.body.body)
    ctx.status = 200
  })
  router.delete('/config', (ctx) => {
    console.log('config delete rev');
    storage.delete(ctx.query)
    ctx.status = 200
  })
};
