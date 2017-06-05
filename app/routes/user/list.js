const router = require("../../router");

const user = require('../../models/user');

router.get('register', '/user/list', async function (ctx, next) {
	ctx.body = await user.list();
});