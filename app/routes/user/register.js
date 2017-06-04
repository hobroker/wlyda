const router = require("../../router");

const knex = require('../../db');

router.get('register', '/user/register', async function (ctx, next) {
	await ctx.render('pages/users', {
		name: 'grfg'
	})
});


router.post('/user/register', async function (ctx, next) {

	var data = ctx.request;
	console.log(data);

	ctx.body = {}

});

