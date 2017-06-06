const passport = require('koa-passport');
const User = require('../models/user');
const fb_api = require('../env.json').FACEBOOK_API;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
	done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.getById(id);
		done(null, user)
	} catch (err) {
		done(err)
	}
});

passport.use(new FacebookStrategy(fb_api,
	async (token, tokenSecret, profile, done) => {
		let email = profile.emails[0].value;
		let user = new User(await User.findByEmail(email));
		if (user && !user.facebook_id) {
			user.facebook_id = profile.id;
			await user.update();
		} else if (!user.facebook_id) {
			user = new User({
				name: profile.displayName,
				email,
				password: '123',
				facebook_id: profile.id
			});
			user = await user.insert();
		}
		done(null, user);
	}
));

passport.use(new LocalStrategy(
	async (email, password, done) => {
		let user = await User.login({email, password});
		if (user) {
			done(null, user)
		} else {
			done(null, false)
		}
	}
));

module.exports = passport;

