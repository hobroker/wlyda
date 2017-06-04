const router = require('koa-router')();

router
	.get('/', async function (ctx, next) {
		await ctx.render('pages/index', {
			name: Math.random()
		})
	})
	.get('/users', async function (ctx, next) {
		await ctx.render('pages/users', {
			name: 'grfg'
		})
	});

module.exports = router;