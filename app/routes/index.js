const router = require("../router");
const data = require("../helpers/render-data");
const knex = require('../helpers/knex');

const Article = require('../models/article');

router.get('/', async function (ctx, next) {
	console.log('authenticated = ' + ctx.isAuthenticated());
	let articles = await Article.list();

	if (ctx.isAuthenticated()) {
		data.user = await ctx.state.user;

		articles = await Article.list().map(async article => {
			let user = data.user;

			//check if user liked/disliked
			let like = await knex('like').select('type')
				.where('article_id', article.id)
				.where('user_id', user.id)
				.first();
			if (like)
				article.likes.user = {
					up: like.type === 'up' || undefined,
					down: like.type === 'down' || undefined
				};
			return article;
		});
	}

	await ctx.render('pages/index', await data(ctx, {articles}))
});
