const jwt = require('jsonwebtoken');

const config = {
	"secret": "lol",
	"expiresIn": 36000
};

exports.encode = (data) => {
	return jwt.sign(data, config.secret, {
		expiresIn: config.expiresIn
	});
};

exports.decode = (token) => {
	return jwt.decode(token, config.secret);
};
