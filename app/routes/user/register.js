const router = require("../../router");
const User = require('../../models/user');
var jwt = require("../../helpers/jwt.js");

router.get('register', '/user/register', async function (ctx, next) {
    await ctx.render('pages/users', {
        name: 'something'
    })
});

const validate = async function (ctx, next) {

    // check if is already logged in
    if (ctx.cookies.get('user')) {
        ctx.throw(403, JSON.stringify({
            errors: true,
            message: 'Already logged in'
        }))
    }

    ctx.checkBody('name').notEmpty('Name is required');
    ctx.checkBody('email')
        .notEmpty("Email is required")
        .isEmail('Invalid email');
    ctx.checkBody('password').notEmpty('Password is required');

    await ctx.checkBody('email').uniqueEmail("This email is already used");

    if (ctx.errors) {
        ctx.throw(JSON.stringify({
            errors: ctx.errors
        }), 400);
        return;
    }

    await next();
};

router.post('/user/register', validate, async function (ctx, next) {
    let data = ctx.request.body;

    let user = new User({
        name: data.name,
        email: data.email,
        password: data.password
    });

    await user.save();

    if (user) {
        ctx.cookies.set('user', jwt.encode(user.clean()));
        ctx.body = {
            errors: false
        };
    } else {
        ctx.throw(500);
    }
});
