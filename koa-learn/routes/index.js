const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  global.console.log('---- index');
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})


router.get('/testAsync', async (ctx) => {
  console.log('start', new Date().getTime());
  const a = await new Promise((suc, fail) => {
    setTimeout(function () {
      console.log('doing', new Date().getTime());
      suc('a')
    }, 3000)
  })

  console.log('end', new Date().getTime())
  ctx.body = {
    a,
  }
})

module.exports = router
