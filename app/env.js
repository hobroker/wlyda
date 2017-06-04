const env = {
	state: 'dev', // dev | prod,
	pg_connection: {
		host: 'localhost',
		user: 'postgres',
		password: '123qwe',
		database: 'wlyda'
	}
};

Object.keys(env).forEach(key => {
	if (process.env[key] === undefined)
		process.env[key] = env[key];
});