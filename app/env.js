const env = {
    state: 'dev', // dev | prod,
    pg_connection: {
        host: 'localhost',
        user: 'postgres',
        password: '123qwe',
        database: 'wlyda'
    },
    jwt: {
        "secret": "lorem",
        "expiresIn": 36000
    },
};

Object.keys(env).forEach(key => {
    if (process.env[key] === undefined)
        process.env[key] = env[key];
});