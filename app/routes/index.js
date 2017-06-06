const router = require("../router");
const data = require("../helpers/render-data");

const Article = require('../models/article');


router.get('/', async function (ctx, next) {
	let articles = await Article.list();
	console.log(articles)

	await ctx.render('pages/index', await data(ctx, {
		articles
	}))
});