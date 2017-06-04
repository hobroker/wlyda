const glob = require("glob");
const fs = require("fs");
const router = require('koa-router')();

router.get('/', async function (ctx, next) {
	await ctx.render('pages/index', {
		title: 'Wlyda'
	})
});

glob(__dirname + '/routes/**/*', function (err, res) {
	if (err)
		return;
	res.forEach(item => {
		if (!fs.lstatSync(item).isDirectory())
			require(item)
	})
});

module.exports = router;

