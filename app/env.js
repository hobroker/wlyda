const env = {
    state: 'dev'
};

Object.keys(env).forEach(key => {
    if (process.env[key] === undefined)
        process.env[key] = env[key];
});