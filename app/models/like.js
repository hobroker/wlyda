const knex = require('../helpers/db');

class Like {

	static list() {
		return knex('like');
	}

	static async set(data) {

		// remove existing like
		await knex('like').del()
			.where('article_id', data.article_id)
			.where('user_id', data.user_id);

		//add the new like
		return knex('like').insert({
				article_id: data.article_id,
				user_id: data.user_id,
				type: data.type
			})
			.returning('*')
			.get(0);
	}

	static async get4Article(article_id) {
		let up = await knex('like')
			.where('article_id', article_id)
			.where('type', 'up')
			.count()
			.get(0);
		let down = await  knex('like')
			.where('article_id', article_id)
			.where('type', 'down')
			.count()
			.get(0);
		return {
			up: up.count,
			down: down.count
		}
	}


}

module.exports = Like;