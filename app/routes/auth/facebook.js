const router = require("../../router");
const passport = require("koa-passport");

router.get('/auth/facebook',
	passport.authenticate('facebook', {scope: ['email']})
);

router.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/'
	})
);

