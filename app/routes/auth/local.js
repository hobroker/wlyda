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
 *      "password": "123qwe"
 *    }
 *
 * @apiSuccessExample Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} User's already logged in
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors":true,
 *      "message":"Already logged in"
 *    }
 *
 * @apiErrorExample {json} Password not supplied
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors":true,
 *      "message":"Password is required"
 *    }
 *
 * @apiErrorExample {json} Email not supplied
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors":true,
 *      "message":"Email is required"
 *    }
 *
 * @apiErrorExample {json} Incorrent email/password
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors":true,
 *      "message":"Incorrent email/password"
 *    }
 */

const router = require("../../router");

const passport = require('../../helpers/passport');

router.post('/auth/local', passport.authenticate('local', {
	successRedirect: '/auth/success',
	failureRedirect: '/auth/error'
}));

router.get('/auth/success', function (ctx, next) {
	ctx.body = '';
});

router.get('/auth/error', function (ctx, next) {
	ctx.throw(403, JSON.stringify({
		errors: true,
		message: 'Incorrect email/password'
	}))
});