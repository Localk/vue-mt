const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  // 设置cookie
  ctx.cookies.set('uid',new Date().getTime());
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
    cookie:ctx.cookies.get('uid')
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
