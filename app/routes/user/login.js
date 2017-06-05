const router = require("../../router");
const User = require('../../models/user');
const jwt = require("../../helpers/jwt");

const validate = async function (ctx, next) {

    // check if is already logged in
    if (ctx.cookies.get('user')) {
        ctx.throw(403, JSON.stringify({
            errors: true,
            message: 'Already logged in'
        }))
    }

    ctx.checkBody('email')
        .notEmpty("Email is required")
        .isEmail('Invalid email');
    ctx.checkBody('password').notEmpty('Password is required');

    if (ctx.errors) {
        ctx.throw(JSON.stringify({
            errors: true,
            message: ctx.errors.map(error => error[Object.keys(error)[0]]).join('\n')
        }), 400);
        return;
    }

    await next();
};

router.post('/user/login', validate, async function (ctx, next) {
    let data = ctx.request.body;

    // find user
    let user = await User.login({
        email: data.email,
        password: data.password
    });

    if (user) {
        // save cookies
        ctx.cookies.set('user', jwt.encode(user));
        ctx.body = {
            errors: false
        };
    } else {
        ctx.throw(403, JSON.stringify({
            errors: true,
            message: 'Incorrent email/password'
        }))
    }

});
