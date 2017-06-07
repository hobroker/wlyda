/**
 * @api {post} /user/register User Register
 * @apiVersion 0.1.0
 * @apiName UserRegister
 * @apiGroup User
 *
 * @apiParam {String} name User's name
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 *
 * @apiParamExample {json} Input
 *    {
 *      "name": "John",
 *      "email": "test@test.com",
 *      "password": "123qwe"
 *    }
 *
 * @apiSuccessExample Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} User's already logged in
 *    HTTP/1.1 403 Bad Request
 *    {
 *      "errors":true,
 *      "message":"Already logged in"
 *    }
 *
 * @apiErrorExample {json} Email is already used
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors":true,
 *      "message":"This email is already used"
 *    }
 *
 * @apiErrorExample {json} Email not supplied
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors":true,
 *      "message": "Email is required"
 *    }
 *
 * @apiErrorExample {json} Name not supplied
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors":true,
 *      "message": "Name is required"
 *    }
 *
 *
 * @apiErrorExample {json} Password not supplied
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors":true,
 *      "message": "Password is required"
 *    }
 *
 */

const router = require("../../router");
const User = require('../../models/user');

router.get('register', '/user/register', async function (ctx, next) {
	await ctx.render('pages/users', {
		name: 'something'
	})
});

const validate = async function (ctx, next) {

	// check if is already logged in
	if (ctx.isAuthenticated()) {
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

	if (!ctx.errors)
		await ctx.checkBody('email').uniqueEmail("This email is already used");

	if (ctx.errors) {
		ctx.throw(JSON.stringify({
			errors: true,
			message: ctx.errors.map(error => error[Object.keys(error)[0]]).join('\n')
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

	await user.insert();

	if (user) {
		ctx.body = '';
	} else {
		ctx.throw(500);
	}
});
