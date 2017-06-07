const knex = require('../helpers/knex');
const like = require("./like.js");

class Article {

	static list() {
		return knex('article').map(async article => {
			article.likes = await like.get4Article(article.id);
			return article
		});
	}

	static list2() {
		return knex('article_list')
	}

}

module.exports = Article;