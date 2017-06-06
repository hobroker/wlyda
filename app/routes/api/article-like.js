/**
 * @api {post} /article/like
 * @apiName ArticleLike
 * @apiGroup Article
 *
 * @apiParam {String} article_id Article ID
 * @apiParam {String} type Like type: up/down
 *
 * @apiParamExample {json} Input
 *    {
 *      "article_id": "1",
 *      "type": "up"
 *    }
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "errors":false,
 *      "data":{
 *          "up":"2",
 *          "down":"0"
 *      }
 *    }
 *
 * @apiErrorExample {json} User's not logged in
 *    HTTP/1.1 403 Bad Request
 *    {
 *      "errors": true,
 *      "message":"You're not logged in"
 *    }
 *
 * @apiErrorExample {json} Article ID not supplied
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors":true,
 *      "message": "Article ID is required"
 *    }

 *
 * @apiErrorExample {json} Like type not supplied
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "errors":true,
 *      "message": "Like type is required"
 *    }

 *
 */

const router = require("../../router");
const Article = require('../../models/article');
const like = require('../../models/like');
const jwt = require("../../helpers/jwt");

const validate = async function (ctx, next) {

	// check if not logged in
	if (!ctx.cookies.get('user')) {
		ctx.throw(403, JSON.stringify({
			errors: true,
			message: 'You\'re not logged in'
		}))
	}

	ctx.checkBody('article_id').notEmpty("Article ID is required");
	ctx.checkBody('type').notEmpty('Like type is required');

	if (ctx.errors) {
		ctx.throw(JSON.stringify({
			errors: true,
			message: ctx.errors.map(error => error[Object.keys(error)[0]]).join('\n')
		}), 400);
		return;
	}

	await next();
};

router.post('/article/like', validate, async function (ctx, next) {
	let data = ctx.request.body;

	data.user_id = jwt.decode(ctx.cookies.get('user')).id;

	await like.set(data);

	ctx.body = {
		errors: false,
		data: await like.get4Article(data.article_id)
	}

});
