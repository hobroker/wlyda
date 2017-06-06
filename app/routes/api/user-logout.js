/**
 * @api {get} /user/logout User Login
 * @apiName UserLogout
 * @apiGroup User
 *
 * @apiSuccess {Boolean} errors If there are errors
 * @apiSuccessExample Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} User's not logged in
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors":true,
 *      "message":"You're not logged in"
 *    }
 */

const router = require("../../router");
const jwt = require("../../helpers/jwt");

router.get('/user/logout', async function (ctx, next) {
	// check if is logged in
	if (ctx.cookies.get('user')) {
		ctx.cookies.set('user', '');
		ctx.response.redirect('/')
	} else {
		ctx.throw(403, JSON.stringify({
			errors: true,
			message: "You're not logged in"
		}))
	}
});
