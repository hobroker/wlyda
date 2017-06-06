const passport = require('koa-passport');
const User = require('../models/user');
const fb_api = require('../env.json').FACEBOOK_API;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser(function (user, done) {
	done(null, user.id)
});

passport.deserializeUser(async function (id, done) {
	let user = User.getById(id);
	done(null, user)
});

passport.use(
	new FacebookStrategy(fb_api, async function (token, tokenSecret, profile, done) {
			let user = new User({
				name: profile.displayName,
				email: profile.emails[0].value,
				password: '123',
				facebook_id: profile.id
			});
			user = await user.save();
			done(null, user);
		}
	)
);

passport.use(
	new LocalStrategy(function (username, password, done) {
		console.log(username, password);
		done(null, user)
	})
);

module.exports = passport;

