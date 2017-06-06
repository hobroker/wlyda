const knex = require('../helpers/db');
const like = require("./like.js");

class Article {

	static  list() {
		return knex('article').map(async article => {
			article.likes = await like.get4Article(article.id);
			return article
		});
	}

}

module.exports = Article;