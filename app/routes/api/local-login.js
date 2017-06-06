/**
 * @api {post} /user/login User Login
 * @apiName UserLogin
 * @apiGroup User
 *
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 *
 * @apiParamExample {json} Input
 *    {
 *      "email": "test@test.com",
 *      "password": "123"
 *    }
 *
 * @apiSuccessExample Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Incorrect email/password
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "errors":true,
 *      "message":"Incorrect email/password"
 *    }
 */

const router = require("../../router");

const passport = require('../../helpers/passport');

router.post('/auth/local', passport.authenticate('local', {failureRedirect: '/auth/error'}),
	async function (ctx, next) {
		if (ctx.isAuthenticated())
			ctx.body = '';
		else
			ctx.throw(401, JSON.stringify({
				errors: true,
				message: 'Incorrect email/password'
			}))
	}
);

router.get('/auth/error', function (ctx, next) {
	ctx.throw(403, JSON.stringify({
		errors: true,
		message: 'Incorrect email/password'
	}))
});