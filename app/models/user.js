const knex = require('../helpers/db');
const md5 = require('md5');

class User {
	constructor(data) {
		this.name = data.name;
		this.email = data.email;
		this.password = data.password;
		this.hashedPassword = md5(data.password);
	}

	static login(data) {
		return knex('user')
			.select('*')
			.where('email', data.email)
			.where('password', md5(data.password))
			.first()
	}

	save() {
		return knex('user')
			.insert({
				name: this.name,
				email: this.email,
				password: this.hashedPassword
			})
			.returning('*')
			.get(0);
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