/**
 * @api {post} /auth/facebook Facebook authentication
 * @apiName FacebookAuth
 * @apiGroup User
 *
 * @apiSuccessExample Success
 *    HTTP/1.1 302 Found
 *
 */

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

