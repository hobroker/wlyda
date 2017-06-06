const knex = require('knex')({
	client: 'pg',
	connection: {
		host: 'localhost',
		user: 'postgres',
		password: '123qwe',
		database: 'wlyda'
	},
	searchPath: 'knex,public'
});

module.exports = knex;