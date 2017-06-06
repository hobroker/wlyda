const router = require("../router");
const data = require("../helpers/render-data");
const knex = require('../helpers/db');

const Article = require('../models/article');
var jwt = require("../helpers/jwt.js");


router.get('/', async function (ctx, next) {

	console.log(ctx.isAuthenticated());

	let articles = await Article.list();

	if (ctx.cookies.get('user')) {
		data.user = jwt.decode(ctx.cookies.get('user'));

		articles = await Article.list().map(async article => {
			let user = jwt.decode(ctx.cookies.get('user'));
			//check if user liked/disliked
			let like = await knex('like').select('type')
				.where('article_id', article.id)
				.where('user_id', user.id)
				.first();
			if (like === undefined) like = {};
			article.likes.user = {
				up: like.type === 'up' || undefined,
				down: like.type === 'down' || undefined
			};
			return article;
		});
	}

	await ctx.render('pages/index', await data(ctx, {articles}))
});
