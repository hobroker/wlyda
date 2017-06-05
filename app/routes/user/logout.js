const router = require("../../router");
const User = require('../../models/user');
const jwt = require("../../helpers/jwt");

router.get('/user/logout', async function (ctx, next) {
    // check if is already logged in
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
