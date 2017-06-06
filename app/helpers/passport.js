const passport = require('koa-passport');
const User = require('../models/user');

passport.serializeUser(function (user, done) {
	done(null, user.id)
});

passport.deserializeUser(async function (id, done) {
	let user = User.getById(id);
	done(null, user)
});

const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
		clientID: '156063051540029',
		clientSecret: '9bfe51800bb117e74dace76f323cbf72',
		callbackURL: 'http://localhost:3001/auth/facebook/callback',
		profileFields: ['emails', 'displayName']
	}, async function (token, tokenSecret, profile, done) {
		let user = new User({
			name: profile.displayName,
			email: profile.emails[0].value,
			password: '123',
			facebook_id: profile.id
		});
		user = await user.save();
		done(null, user);
	}
));

module.exports = passport;

