const router = require("../router");
const data = require("../helpers/render-data");

router.get('/', async function (ctx, next) {
    await ctx.render('pages/index', await data(ctx))
});