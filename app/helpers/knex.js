const pg_connection = require('../env.json').PG_CONNECTION;

module.exports = require('knex')({
	client: 'pg',
	connection: pg_connection,
	searchPath: 'knex,public'
});