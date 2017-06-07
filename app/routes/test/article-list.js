const router = require("../../router");
var Article = require("../../models/article");


router.get('/article/list', async function (ctx, next) {
	ctx.body = {
		errors: false,
		data: await Article.list2()
	}

});
