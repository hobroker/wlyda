const knex = require('../helpers/knex');
const md5 = require('md5');

class User {
	constructor(data) {
		this.id = data.id || null;
		this.name = data.name;
		this.email = data.email;
		this.password = data.password;
		this.hashedPassword = md5(data.password);
		this.facebook_id = data.facebook_id;
	}

	static login(data) {
		return knex('user')
			.select('*')
			.where('email', data.email)
			.where('password', md5(data.password))
			.first()
	}

	insert() {
		return knex('user')
			.insert({
				name: this.name,
				email: this.email,
				password: this.hashedPassword,
				facebook_id: this.facebook_id
			})
			.returning('*')
			.get(0);
	}

	update() {
		return knex('user')
			.update({
				name: this.name,
				email: this.email,
				facebook_id: this.facebook_id
			})
			.where('id', this.id)
	}

	// get only db fields
	clean() {
		return {
			name: this.name,
			email: this.email,
			password: this.password
		}
	}

	static list() {
		return knex('user');
	}

	static getById(id) {
		return knex('user')
			.select('*')
			.where('id', id)
			.first()
	}

	static async isLoggedIn(ctx, next) {
		next = next || (() => {
			});
		if (ctx.isAuthenticated()) {
			await next();
		} else {
			ctx.redirect('/');
		}
	}

	static findByEmail(email) {
		return knex('user')
			.select('*')
			.where('email', email)
			.first()
	}
}

User.Validator = require('koa-validate').Validator;

User.Validator.prototype.uniqueEmail = function (message) {
	return knex('user')
		.select('id').where('email', this.value)
		.first()
		.then((row) => {
			if (row) this.addError(message);
		});
};

module.exports = User;