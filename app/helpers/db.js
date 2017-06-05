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

/*knex.select('*').from('user').then(function (users) {
 console.log(JSON.stringify(users))
 });*/

module.exports = knex;