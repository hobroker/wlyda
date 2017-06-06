const app = new (require('koa'))();
const views = require('koa-views');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('./helpers/passport');

require('koa-validate')(app);

const router = require('./router');

require('./views/handlebars');
require('./helpers/db');

app.keys = ['lol'];

app.proxy = true;

app
	.use(views(__dirname + '/views', {
		extension: 'hbs',
		map: {hbs: 'handlebars'}
	}))
	.use(session({}, app))
	.use(bodyParser())
	.use(passport.initialize())
	.use(passport.session())
	.use(router.routes())
	.use(router.allowedMethods())
;

app.use(serve(__dirname + '/../public'));

app.listen(3001);

console.log("Listening on :3001");
