/**
 * @api {get} /user/logout User Login
 * @apiName UserLogout
 * @apiGroup User
 *
 * @apiSuccessExample Success
 *    HTTP/1.1 200 OK
 */

const router = require("../../router");

router.get('/user/logout', async function (ctx, next) {
	ctx.logout();
	ctx.response.redirect('/')
});
