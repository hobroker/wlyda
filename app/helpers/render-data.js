module.exports = async function (ctx, data = {}) {
	data.title = "Wlyda";
	if (ctx.isAuthenticated()) {
		data.current_user = await ctx.state.user;
	}
	return data;
};
