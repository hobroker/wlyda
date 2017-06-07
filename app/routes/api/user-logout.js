/**
 * @api {get} /user/logout User Logout
 * @apiVersion 0.1.0
 * @apiName UserLogout
 * @apiGroup User
 *
 * @apiSuccessExample Success
 *    HTTP/1.1 302 Found
 */

const router = require("../../router");

router.get('/user/logout', async function (ctx, next) {
	ctx.logout();
	ctx.response.redirect('/')
});
