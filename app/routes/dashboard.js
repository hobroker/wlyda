const router = require("../router");
const data = require("../helpers/render-data");

var User = require("../models/user");


router.get('/dashboard', User.isLoggedIn, async function (ctx, next) {
	let users = await User.list();
	await ctx.render('pages/dashboard', await data(ctx, {
		users
	}))
});